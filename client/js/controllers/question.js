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
      
      $scope.question = Question.findById({id:$stateParams.id, 
      filter:{
        include:['researcher']
      }});
    }
    

  ])
  .controller('AnswerForm', ['$scope', 'Answer', '$rootScope', function($scope, Answer, $rootScope){
     $scope.template = { name: 'answer-form.html', url: 'views/answer-form.html'};
  }
   ])
   .controller('AddAnswerController',['$scope', '$stateParams','$rootScope', 'Answer', '$state',
  function ($scope, $rootScope, $stateParams, Answer, $state){
    $scope.action = 'Add';
    
    $scope.submitAnswer = function(){
      Answer
        .create({
          ans: $scope.answer.ans,
          date: Date.now(),
          questionId:'564a1c2851e15fc00bf0bc3a',
          researcherId: $rootScope.currentUser.id
        })
        .$promise
        .then(function() {
          alert('Answered');
          //$state.go('all-questions');
        });
    }
  }])
  .controller('MyQuestionsController', ['$scope', '$rootScope', 'Question',
  function ($scope, $rootScope, Question){
    $scope.questions = Question.find({
      filter:{
        where:{
          researcherId: $rootScope.currentUser.id
        },
        include: ['researcher']
      }
    })
   }])
  .controller('AddQuestionController', ['$scope', '$rootScope', 'Question','$state',
  function ($scope, $rootScope, Question, $state){
    $scope.action = 'Add';
    
    $scope.submitQuestion = function(){
      Question
        .create({
          title: $scope.question.title,
          que: $scope.question.que,
          date: Date.now(),
          researcherId: $rootScope.currentUser.id
        })
        .$promise
        .then(function() {
          $state.go('all-questions');
        });
    }
  }]);
  ;
  // 
  //
  // 
  // 