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
				{ title:'question 1', que: 'reasearcher 1: question 1 ?', date: Date.now(), researcherId: researchers[0].id },
				{ title:'question 2', que: 'researcher 2: question 2 ?', date: Date.now(), researcherId: researchers[1].id },
				{ title:'question 3', que: 'researcher 1: question 3 ?', date: Date.now(), researcherId: researchers[0].id },
				{ title:'question 4', que: 'researcher 3: question 4 ?', date: Date.now(), researcherId: researchers[2].id }
			], cb);

		})
	}

	function createAnswers(questions, researchers, cb) {
		mongoDs.automigrate('Answer', function (err) {
			if (err) return cb(err);
			var Answer = app.models.Answer;
			Answer.create([
				{ ans: 'ans for question:1', date: Date.now(), questionId: questions[0].id, researcherId: researchers[0].id },
				{ ans: 'ans for question:2', date: Date.now(), questionId: questions[1].id, researcherId: researchers[1].id },
				{ ans: 'ans for question:3', date: Date.now(), questionId: questions[2].id, researcherId: researchers[0].id },
				{ ans: 'ans for question:1', date: Date.now(), questionId: questions[0].id, researcherId: researchers[2].id }

			], cb);

		});
	}


};

