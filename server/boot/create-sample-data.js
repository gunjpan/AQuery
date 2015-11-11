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
				{ email: 'foo@bar.com', password: 'foobar' },
				{ email: 'john@doe.com', password: 'johndoe' },
				{ email: 'jane@doe.com', password: 'janedoe' }
			], cb);
		});
	}
	//create questions
	function createQuestions(researchers, cb) {
		mongoDs.automigrate('Question', function (err) {
			if (err) return cb(err);
			var Question = app.models.Question;
			Question.create([
				{ que: 'loerieom ioermpuier ?', date: Date.now(), researcherId: researchers[0].id },
				{ que: 'loerieom ioermpuier ?', date: Date.now(), researcherId: researchers[1].id },
				{ que: 'loerieom ioermpuier ?', date: Date.now(), researcherId: researchers[0].id },
				{ que: 'loerieom ioermpuier ?', date: Date.now(), researcherId: researchers[2].id }
			], cb);

		})
	}

	function createAnswers(questions, researchers, cb) {
		mongoDs.automigrate('Answer', function (err) {
			if (err) return cb(err);
			var Answer = app.models.Answer;
			Answer.create([
				{ ans: 'dora dora dora dora', date: Date.now(), questionId: questions[0].id, researcherId: researchers[0].id },
				{ ans: 'dora dora dora dora', date: Date.now(), questionId: questions[1].id, researcherId: researchers[1].id },
				{ ans: 'dora dora dora dora', date: Date.now(), questionId: questions[2].id, researcherId: researchers[0].id },
				{ ans: 'dora dora dora dora', date: Date.now(), questionId: questions[0].id, researcherId: researchers[2].id }

			], cb);

		});
	}


};

