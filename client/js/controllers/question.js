angular
  .module('app')
  .controller('AllQuestionsController', ['$scope', 'Question',
    function ($scope, Question) {
      $scope.questions = Question.find({
        filter: {
          include: [
            'researcher'
          ]
        }
      })
    }])
  .controller('QuestionController', ['$scope', '$stateParams', 'Answer','Question',
    function ($scope, $stateParams, Answer, Question) {
      $scope.answers = Answer.find({
        filter: {
          where: { questionId: $stateParams.id }
          ,include :['question', 'researcher']
        }
      });
      
      $scope.question = Question.findById({id:$stateParams.id });
      

    }

  ]);
  // 
  // .controller('AddQuestionController')
  // .controller('MyQuestionsController', function(){
  //   var id = $routeParamter?.id
  //   Question.findById( )  
  // });
  // 