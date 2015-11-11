module.exports = function(Researcher) {
	// 'create' after remote hoook to send email confirmation when the user is registered
	// Researcher.afterRemote('create', function(context, user){
	// 	console.log('>>researcher.afterRemote triggered');
	// 	var Email = Researcher.app.Email;
	// 	var emailDs = Researcher.app.dataSources.emailDs
	// 	Email.send({
	// 		to: user.email,
	// 		from:  emailDs.transports[0].auth.user,
	// 		subject: 'Registered succesffuly',
	// 		text: 'You are now registered to AQuery'
	// 		
	// 	}, function (err) {
	// 		if (err) throw err;
	// 		console.log('> email sent successfully');
	// 		//next();
	// 	});
	// });
// operation hook: after save which runs after successful model creation
	Researcher.observe('after save', function(ctx, next){
		console.log('saved Email:', ctx.instance.email);
		var app = Researcher.app;
		var Email = app.models.Email;
		//var emailDs = Researcher.app.dataSources.emailDs;
		
		Email.send({
			to: ctx.instance.email,
			from: 'noreply.aquery@gmail.com',// emailDs.transports[0].auth.user,
			subject: 'Registered succesffuly',
			text: 'Welcome to AQuery, a place where you can rest your curiosity!!!'
			
		}, function (err) {
			if (err) throw err;
			console.log('> email sent successfully');
			next();
		});
	});
};
