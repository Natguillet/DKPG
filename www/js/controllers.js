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
.controller('StocksCtrl',function($scope,$http,$ionicFilterBar){
  $scope.stocks =[];
  $http.get('data/medicjson.json').success(function(data){
    $scope.stocks = data;
    console.log($scope.stocks);
  });
  $scope.showFilterBar = function () {
    var filterBarInstance = $ionicFilterBar.show({
      cancelText: "<i class='ion-ios-close-outline'></i>",
      items: $scope.stocks,
      filterProperties: ['nomM'],
      update: function (filteredItems, filterText) {
        $scope.stocks = filteredItems;
      }
    });
  };
})
.controller('StockCtrl', function ($scope, $stateParams) {})

.controller('PlaylistCtrl', function ($scope, $stateParams) {})

.controller('PharmacieCtrl',function($scope,$http, $ionicPopup){
  var stocks = [];
  var panier = $scope.panier=[];
  var select =[];
  $http.get('data/medicjson.json').success(function(data){
    $scope.stocks = data;
    console.log(data);
    stocks =data;
    console.log(stocks);
  })


  $scope.clearSearch = function() {
    $scope.text = '';
  };
  $scope.choixMedic = function(){
    select =$scope.select = stocks[0];//Choix en dure d'un médicament
  };
  $scope.choixMedic2 = function(){
    select =$scope.select = stocks[2]; //Choix en dure d'un médicament
  };
  $scope.ajouter = function(){
    for (var i = 0; i < panier.length; i++) {
      if(panier[i].id === select.id){
        return;
      }
    }
    if(select.length != 0){
      if(select.sous_ordonnance === "oui"){
        var alertPopup = $ionicPopup.alert({
          title: 'Médicament avec ordonnance',
          template: 'Il faut ouvrir un dossier patient.'
        });
        alertPopup.then(function(res) {
          console.log('Thank you for not eating my delicious ice cream cone');
        });
        return;
      }
      console.log(panier);
      select.nb = 1;
      panier.push(select);
    }
  };
  $scope.plus = function(medic){
    if(medic.quantite>0){
      medic.nb++;
      medic.quantite--;
    }
    else{
      var alertPopup = $ionicPopup.alert({
        title: 'Plus de '+medic.nomM+' disponible',
        template: 'Une alerte sera crée apres validation.'
      });
      alertPopup.then(function(res) {
        console.log('Thank you for not eating my delicious ice cream cone');
      });
    }
  };
  $scope.moins = function(medic){
    if(medic.nb >1)
    {
      medic.nb--;
      medic.quantite++;
    }
  };
  $scope.supprimer = function(medic){
    $scope.panier.splice($scope.panier.indexOf(medic),1);
  };
  $scope.condition = function(medic){
    return $scope.medic
  };
  $scope.valider = function(){
    for (var i = 0; i < $scope.panier.length; i++) {
      delete $scope.panier[i].nb;
      for (var j = 0; j < $scope.stocks.length; j++) {
        if($scope.stocks[j].id === $scope.panier[i].id)$scope.stocks[j]=$scope.panier[i];
      }
    }
    $scope.panier = [];
    console.log($scope.stocks);
    var data = $scope.stocks;
    var filename = 'medicjson.json';
    if (typeof data === 'object') {
    data = JSON.stringify(data, undefined, 2);
  }
  };
});

/*.controller('registerLogin', function ($scope, $ionicPopup, $ionicListDelegate, pouchCollection)) {
var dbName = 'login-storage';
$scope.logs = pouchCollection(dbName);

$scope.newLog = function(loginData){

}


}*/
