module.exports = function (Answer) {

	Answer.observe('after save', function (ctx, next) {
		var qid = ctx.instance.questionId
		var app = Answer.app;
		var Email = app.models.Email;
		var user = ctx.instance.user;
		//var emailDs = Researcher.app.dataSources.emailDs;
		 
		//get question title/description from Question model
		var Question = app.models.Question;
		Question.findById(qid, function (err, instance) {
			if (err) return err;
			sendEmail(instance, user, Email, function (err, res) {
				if (err) throw err;
				console.log('> email sent successfully');
				next();
			});

		});

		
		//send email
		// Email.send({
		// 	to: 'noreply.aquery@gmail.com',//ctx.instance.email,
		// 	from: 'noreply.aquery@gmail.com',// emailDs.transports[0].auth.user,
		// 	subject: 'Notification: AQuery',
		// 	text: msg
		// 	
		// }, function (err) {
		// 	if (err) throw err;
		// 	console.log('> email sent successfully');
		// 	next();
		// });
	});

	function sendEmail(instance, user, Email, cb) {

		Email.send({
			to: 'noreply.aquery@gmail.com',//ctx.instance.email,
			from: 'noreply.aquery@gmail.com',// emailDs.transports[0].auth.user,
			subject: 'Notification: AQuery',
			text: 'You have a new answer for:' + instance.que + ' on AQuery'

		}, cb);
	}

};

