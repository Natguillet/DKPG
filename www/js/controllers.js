 angular.module('starter.controllers', ['ionic', 'pouchdb','ngCordova.plugins.file'])

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
<<<<<<< HEAD

.controller('AlertCtrl',function($scope,$http){
  var data =
  {
    'quantite': '2'
  }
  var config =
  {
  headers :
{
  'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
 }
   }
  $scope.alert = function(){
  $http.post('http://localhost/PGS/PGS_WEB/update2.php', data, config)
   .then(
       function(response){
         // success callback
         alert(data.quantite);
       },
       function(response){
         // failure callback
         alert("Pas ok");
       }
    );
  };
})
/*
   $scope.alert = function ($scope) {
    $http({
        url: 'http://localhost/PGS/PGS_WEB/update2.php',
        method: "POST",
        data: { 'message' : "coucou"}
    })
    .then(function(response) {
            // success
            alert("OK");
    },
    function(response) { // optional
            // failed
            alert("NONOK");
    });
};
})
*/
.controller('StockCtrl', function ($scope, $stateParams) {})
=======
.controller('StockCtrl', function ($scope,$http, $stateParams) {
  $scope.stocks =[];
  $http.get('data/medicjson.json').success(function(data){
    $scope.stocks = data;

  });

//  console.log($stateParams);
  $scope.stateParams={};
  $scope.stateParams=$stateParams;
  $scope.intitule=["ID:","Quantité:","Nom du médicament:","Prix:",
  "Dosage:","Quantité de dispensation dans une boite:","Nom DCI:",
  "Unité de prescription:","Forme:","Médicament sous ordonnance?",
  "Unité de dispensation:","Unité de conditionnement:","Quantité minimum 1:",
  "Quantité minimum 2:"];
  //meme ordre que le JSON
//id quantité nomM
//prix dosage quantitedispboite
//...
})
>>>>>>> 697f1ee6c20b569104ee0ff2937cc7982a42bc7a

.controller('PlaylistCtrl', function ($scope, $stateParams) {})

.controller('PharmacieCtrl',function($scope,$http, $ionicPopup,$cordovaFile){
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
      if($scope.panier[i].id === $scope.select.id){
        return;
      }
    }
    if($scope.select.length != 0){
      if($scope.select.sous_ordonnance === "oui"){
        var alertPopup = $ionicPopup.alert({
          title: 'Médicament avec ordonnance',
          template: 'Il faut ouvrir un dossier patient.'
        });
        alertPopup.then(function(res) {
          console.log('Thank you for not eating my delicious ice cream cone');
        });
        return;
      }
      $scope.select.quantite--;
      $scope.select.nb = 1;
      $scope.panier.push(select);
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
    var index = $scope.panier.indexOf(medic);
    $scope.panier[index].quantite += $scope.panier[index].nb;
    $scope.panier.splice($scope.panier.indexOf(medic),1);
  };
  $scope.condition = function(medic){
    return $scope.medic
  };
  $scope.valider = function(){
    var modifs =[];
    for (var i = 0; i < $scope.panier.length; i++) {
      var modif = {
        "quantite":0,
        "id_medic":0,
        "id_lot":0
      };
      modif.quantite = $scope.panier[i].nb;
      modif.id_medic= $scope.panier[i].id;
      //modif.id_lot = $scope.panier[i].id_lot;
      modifs[i] = modif;
    }
    panier = $scope.panier = [];
    console.log(JSON.stringify(modifs));
    var filename = 'modif.txt';
    $cordovaFile.createFile('cordova.file.dataDirectory', filename, JSON.stringify(modifs), true)
  .then(function (success) {
    // success
    console.log("Création réussite");
    var alertPopup = $ionicPopup.alert({
      title: 'GGGGGGG',
      template: 'OUIIIIIIIIII'
    });
    alertPopup.then(function(res) {
    });
  }, function (error) {
    var alertPopup = $ionicPopup.alert({
      title: 'Echec',
      template: error
    });
    alertPopup.then(function(res) {
    });
    console.log(error); //error mappings are listed in the documentation
  });
  };
});

/*.controller('registerLogin', function ($scope, $ionicPopup, $ionicListDelegate, pouchCollection)) {
var dbName = 'login-storage';
$scope.logs = pouchCollection(dbName);

$scope.newLog = function(loginData){

}


}*/
