var async = require('async');
module.exports = function (app) {
	//data source
	var mongoDs = app.dataSources.mongoDs;
	
	//create all models one after the other 
	
	createResearchers( function(err, researchers){
		async.waterfall([
			function(callback){
				createQuestions(researchers, callback);
			},
			function(questions, callback){
				createAnswers(questions, researchers, callback);
			}], function(err, result){
			if(err) throw err;
			console.log('models created successfully!!');
		})
	})
	

	//create researchers
	function createResearchers(cb) {
		mongoDs.automigrate('Researcher', function (err) {
			if (err) return cb(err);
			var Researcher = app.models.Researcher;
			Researcher.create([
				{ email: 'foo@bar.com', password: 'foobar', username:'FooBar'},
				{ email: 'john@doe.com', password: 'johndoe', username:'John'},
				{ email: 'jane@doe.com', password: 'janedoe', username:'Jane'}
			], cb);
		});
	}
	//create questions
	function createQuestions(researchers, cb) {
		mongoDs.automigrate('Question', function (err) {
			if (err) return cb(err);
			var Question = app.models.Question;
			Question.create([
				{ title:'Whoaa Loopback?', que: 'What is Loopback ?', date: Date.now(), researcherId: researchers[0].id },
				{ title:'What is Node', que: 'Why is everyone talkinga bout Node.js?', date: Date.now(), researcherId: researchers[1].id },
				{ title:'What is express?', que: 'Does it really help ?', date: Date.now(), researcherId: researchers[0].id },
				{ title:'How to use Email model', que: 'how to use Email model to send emails using Loopback?', date: Date.now(), researcherId: researchers[2].id }
			], cb);

		})
	}

	function createAnswers(questions, researchers, cb) {
		mongoDs.automigrate('Answer', function (err) {
			if (err) return cb(err);
			var Answer = app.models.Answer;
			Answer.create([
				{ ans: 'LoopBack is a highly-extensible, open-source Node.js framework', date: Date.now(), questionId: questions[0].id, researcherId: researchers[0].id },
				{ ans: 'Node.js is an open-source, cross-platform runtime environment for developing server-side web applications', date: Date.now(), questionId: questions[1].id, researcherId: researchers[1].id },
				{ ans: 'Express is a framework for developing Node apps', date: Date.now(), questionId: questions[2].id, researcherId: researchers[0].id },
				{ ans: 'Used to set up models and create REST APIs in minutes', date: Date.now(), questionId: questions[0].id, researcherId: researchers[2].id }

			], cb);

		});
	}


};

