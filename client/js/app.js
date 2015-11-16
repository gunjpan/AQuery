angular
  .module('app', [
    'ui.router',
    'lbServices'
  ])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider,
      $urlRouterProvider) {
    $stateProvider
	  .state('add-question', {
        url: '/add-question',
        templateUrl: 'views/question-form.html',
        controller: 'AddQuestionController',
        authenticate: true
      })
      .state('all-questions', {
        url: '/all-questions',
        templateUrl: 'views/all-questions.html',
        controller: 'AllQuestionsController'
      })
      .state('question', {
        url: '/question/:id',
        templateUrl: 'views/question.html',
        controller: 'QuestionController'
      })
      .state('my-questions', {
        url: '/my-questions',
        templateUrl: 'views/my-questions.html',
        controller: 'MyQuestionsController',
        authenticate: true
      })
      .state('add-answer', {
        url: '/question/:id',
        templateUrl: 'views/answer-form.html',
        controller: 'YAnswerController',
        authenticate: true
      })
       .state('my-answers', {
        url: '/my-answers',
        templateUrl: 'views/my-answers.html',
        controller: 'MyAnswersController',
        authenticate: true
      })
      .state('edit-answer', {
        url: '/edit-answer/:id',
        templateUrl: 'views/answer-form.html',
        controller: 'EditAnswerController',
        authenticate: true
      })
	   .state('delete-answer', {
        url: '/delete-answer/:id',
        controller: 'DeleteAnswerController',
        authenticate: true
      })
      .state('forbidden', {
        url: '/forbidden',
        templateUrl: 'views/forbidden.html',
      })
      .state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'AuthLoginController'
      })
      .state('logout', {
        url: '/logout',
        controller: 'AuthLogoutController'
      })
      .state('sign-up', {
        url: '/sign-up',
        templateUrl: 'views/sign-up-form.html',
        controller: 'SignUpController',
      })
      .state('sign-up-success', {
        url: '/sign-up/success',
        templateUrl: 'views/sign-up-success.html'
      });
    $urlRouterProvider.otherwise('all-questions');
  }])
  .run(['$rootScope', '$state', function($rootScope, $state) {
    $rootScope.$on('$stateChangeStart', function(event, next) {
      // redirect to login page if not logged in
      if (next.authenticate && !$rootScope.currentUser) {
        event.preventDefault(); //prevent current page from loading
        $state.go('forbidden');
      }
    });
  }]);
