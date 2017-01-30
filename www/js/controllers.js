angular.module('starter.controllers', ['ionic', 'pouchdb'])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function () {
        $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function () {
        $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function () {
        console.log('Doing login', $scope.loginData);

        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function () {
            $scope.closeLogin();
        }, 1000);
    };
})

.controller('PlaylistsCtrl', function ($scope) {
    $scope.playlists = [
        {
            title: 'Reggae',
            id: 1
        },
        {
            title: 'Chill',
            id: 2
        },
        {
            title: 'Dubstep',
            id: 3
        },
        {
            title: 'Indie',
            id: 4
        },
        {
            title: 'Rap',
            id: 5
        },
        {
            title: 'Cowbell',
            id: 6
        }
  ];
})
.controller('StocksCtrl',function($scope){
  console.log("stocksctrl");
  $scope.stocks=[

      {
          title: 'Doliprane',
          id: 1,
          nb:20,
          date:"20/11/16"
      },
      {
          title: 'Dolirhume',
          id: 2,
          nb:10,
          date:"20/12/17"
      }

    ];
})
.controller('StockCtrl', function ($scope, $stateParams) {})

.controller('PlaylistCtrl', function ($scope, $stateParams) {})

.controller('PharmacieCtrl',function($scope){
  var stocks = $scope.stocks=[

      {
          title: 'Doliprane',
          id: 1,
          nb:20,
          date:"20/11/16"
      },
      {
          title: 'Dolirhume',
          id: 2,
          nb:10,
          date:"20/12/17"
      }

    ];
    var panier = $scope.panier=[];
    var select =[];

    $scope.clearSearch = function() {
    $scope.search = '';
  };
  $scope.choixMedic = function(){
    console.log("salut");
    select =$scope.select = stocks[0];
  };
  $scope.ajouter = function(){
    console.log(panier);
    select.nb -=1;
    panier.push(select);
  };
});

/*.controller('registerLogin', function ($scope, $ionicPopup, $ionicListDelegate, pouchCollection)) {
    var dbName = 'login-storage';
    $scope.logs = pouchCollection(dbName);

$scope.newLog = function(loginData){

}


}*/
