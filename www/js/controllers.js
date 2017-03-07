angular.module('starter.controllers', ['ionic', 'pouchdb','ngCordova.plugins.file','ionic-modal-select'])


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
.controller('CreationPatientCtrl', function ($scope,$stateParams) {
   $scope.go = function ( path ) {
    $location.path( path );
  };
})

.controller('PatientCtrl', function ($scope,$http, $stateParams) {
  $scope.patients =[];
  $http.get('data/patient.json').success(function(data){
    $scope.patients = data;

  });
//  console.log($stateParams);
  $scope.stateParams={};
  $scope.stateParams=$stateParams;
  $scope.intitule=["ID:","Facteur:","Nom:","Prenom:",
  "Adresse:","Email","Telephone:",
  "Date de Naissance:","Lieu de Naissance:"," Notes Importantes"];

})

.controller('PatientsCtrl',function($scope,$http,$ionicFilterBar){
  $scope.patients =[];
  $http.get('data/patient.json').success(function(data){
    $scope.patients = data;
    console.log($scope.patients);
  });
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
  $http.get('data/medic.json').success(function(data){
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
  $http.post('http://localhost/PGS/PGS_WEB/update.php', data, config)
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

.controller('StockCtrl', function ($scope,$http, $stateParams) {
  $scope.stocks =[];
  $http.get('data/medic.json').success(function(data){
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

.controller('PlaylistCtrl', function ($scope, $stateParams) {})

.controller('PharmacieCtrl',function($scope,$http, $ionicPopup, $cordovaFile){
  var stocks = [];
  var panier = $scope.panier=[];
  var select =[];
  var stocksint = [];
  $http.get('data/medic.json').success(function(data){
    $scope.stocks = data;
    console.log(data);
    stocks =data;
    console.log(stocks);
  })
  $scope.search = function(newValue){
    console.log(newValue);
    $scope.select = newValue;
    ajouter();
  }
var ajouter = function(){
    for (var i = 0; i < panier.length; i++) {
      if(panier[i].id_medic === select.id_medic){
        return;
      }
    }
    console.log($scope.select != null);
    if($scope.select != null){
          /*var confirmPopup = $ionicPopup.confirm({
            title: 'Consume Ice Cream',
            template: 'Are you sure you want to eat this ice cream?'
          });

          confirmPopup.then(function(res) {
            if(res) {
              console.log('You are sure');
            } else {
              console.log('You are not sure');
            }
          });*/
          //alert($scope.select.nomM+" est sous ordonnance.\n Il faut ouvrir un dossier patient.");
        $scope.select.quantite--;
        $scope.select.nb = 1;
        $scope.panier.push($scope.select);
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
  $scope.vider = function(){
    $scope.panier =[];
  }
  $scope.valider = function(){
    var ord =0;
    for (var i = 0; i < $scope.panier.length; i++)
    {
      if ($scope.panier[i].sous_ordonnance=="oui")
      {
        alert($scope.panier[i].nomM+" est sous ordonnance.\n Il faut ouvrir un dossier patient.");
        ord =1;
      }
    }
      if (ord==0)
      {
    var modifs =[];
    for (var i = 0; i < $scope.panier.length; i++) {
      var modif = {
        "quantite":0,
        "id_medic":0,
        "id_lot":0
      };
      modif.quantite = $scope.panier[i].nb;
      modif.id_medic= $scope.panier[i].id_medic;
      //modif.id_lot = $scope.panier[i].id_lot;
      modifs[i] = modif;
    }
    var j=0;
    for ( var i=0;i<$scope.stocks.length;i++)
    {
      console.log($scope.stocks[i].quantite);
      if ($scope.stocks[i].quantite>0)
      {
        stocksint[j] = $scope.stocks[j];
        j++;
      }
      else {
        j--;
      }
    }
    $scope.stocks = stocksint;
    console.log($scope.stocks);
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
      /*var alertPopup = $ionicPopup.alert({
      title: 'Echec',
      template: error
    });
    alertPopup.then(function(res) {
  });
  console.log(error); //error mappings are listed in the documentation
  */
});
}
};
});

/*.controller('registerLogin', function ($scope, $ionicPopup, $ionicListDelegate, pouchCollection)) {
var dbName = 'login-storage';
$scope.logs = pouchCollection(dbName);

$scope.newLog = function(loginData){

}


}*/
