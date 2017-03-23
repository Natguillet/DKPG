angular.module('starter.controllers', ['ionic', 'pouchdb','ngCordova.plugins.file','ionic-modal-select','ngCordova','ngStorage'])


.controller('AppCtrl', function ($http,StorageService,$rootScope,$scope, $ionicModal, $timeout) {

  //initialisation
  console.log(StorageService.getAll());
  if(StorageService.getAll().length === 0)
  {
    $http.get('data/medic.json').success(function(data){
      $rootScope.stocks = data;
      console.log(data);
      StorageService.setMedic(data);
    })
    $http.get('data/patient.json').success(function(data){
      $scope.patients = data;
      console.log(data);
      StorageService.setPatient(data);
    })
  }


  //SUPPRIMER TOUTE LA DATA
/*var datas =StorageService.getAll();
StorageService.remove(datas[0],1);
console.log(datas)*/


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

.controller('AccueilCtrl', function ($http,$scope) {
  $scope.data = {};

    $scope.submit = function(){
        var link = 'http://localhost/api.php';

        $http.post(link, {nom : $scope.data.username}).then(function (res){
            $scope.response = res.data;
        });
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
  /*
  $scope.takePicture = function (options) {
    console.log("ok");
     var options = {
        quality : 75,
        targetWidth: 200,
        targetHeight: 200,
        sourceType: 1
     };

     $cordovaCamera.getPicture(options).then(function(imageData) {
        $scope.picture = imageData;;
     }, function(err) {
        console.log(err);
     });

  };
*/
$scope.takePicture = function() {
       var options = {
           quality : 75,
           destinationType : Camera.DestinationType.DATA_URL,
           sourceType : Camera.PictureSourceType.CAMERA,
           allowEdit : true,
           encodingType: Camera.EncodingType.JPEG,
           targetWidth: 300,
           targetHeight: 300,
           popoverOptions: CameraPopoverOptions,
           saveToPhotoAlbum: false
       };

       $cordovaCamera.getPicture(options).then(function(imageData) {
           $scope.imgURI = "data:image/jpeg;base64," + imageData;
       }, function(err) {
           // An error occured. Show a message to the user
       });
   }

})

.factory('Camera', function($q) {

return {
  getPicture: function(options) {
     var q = $q.defer();

     navigator.camera.getPicture(function(result) {
        q.resolve(result);
     }, function(err) {
        q.reject(err);
     }, options);

     return q.promise;
  }
}

})

.controller('PatientsCtrl',function($scope,$http,$ionicFilterBar,StorageService){
  $scope.things = StorageService.getAll();
  $scope.patients =[];
  $http.get('data/patient.json').success(function(data){
    $scope.patients = data;
    console.log($scope.patients);
    if ($scope.things[1] == null) {
      StorageService.add(data);
    }
  });
  })

.controller('StocksCtrl',function($rootScope,$scope,$http,$ionicFilterBar,StorageService){
  $rootScope.stocks = StorageService.getMedic();
  $scope.showFilterBar = function () {
    var filterBarInstance = $ionicFilterBar.show({
      cancelText: "<i class='ion-ios-close-outline'></i>",
      items: $rootScope.stocks,
      filterProperties: ['nomM'],
      update: function (filteredItems, filterText) {
        $rootScope.stocks = filteredItems;
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

.controller('StockCtrl', function ($scope,$http, $stateParams,StorageService) {
  $scope.stocks = StorageService.getMedic();
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

.controller('PharmacieCtrl',function($rootScope,$scope,$http, $ionicPopup, $cordovaFile,StorageService){
  $scope.things = StorageService.getAll();
  var panier = $scope.panier=[];
  var select =$scope.select =[];
  $rootScope.stocks = StorageService.getMedic();

  $scope.search = function(newValue){
    console.log(newValue);
    $scope.select = newValue;
    for (var i = 0; i < $scope.select.length; i++) {
      ajouter($scope.select[i]);
    }
  }
var ajouter = function(medic){
    for (var i = 0; i < panier.length; i++) {
      if(panier[i].id_medic === medic.id_medic){
        return;
      }
    }
    if(medic != null){
        medic.quantite--;
        medic.nb = 1;
        $scope.panier.push(medic);
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
        "id_modif":0,
        "quantite":0,
        "id_medic":0,
        "id_lot":0
      };
      modif.quantite = $scope.panier[i].nb;
      modif.id_medic= $scope.panier[i].id_medic;
      modif.id_lot = $scope.panier[i].id_lot;
      modifs[i] = modif;
    }
    console.log($scope.stocks);
    panier = $scope.panier = [];
    console.log(modifs);
    StorageService.add(modifs);
    //Mise à jour des médicements
    for (var i = 0; i < modifs.length; i++) {
      for (var j = 0; j < $rootScope.stocks.length; j++) {
        if(modifs[i].id_medic === $rootScope.stocks[j].id_medic){
          $rootScope.stocks[j].quantite -= modifs[i].quantite;
        }
      }
    }
    console.log($rootScope.stocks);
  }
};


$scope.showConfirm = function(medic) {
  console.log("ok");
  var confirmPopup = $ionicPopup.confirm({
    title: 'Consume Ice Cream',
    template: 'Voulez-vous vraiment supprimer ce medicament'
  });
  confirmPopup.then(function(res) {
    if(res) {
      console.log('You are sure');
      $scope.supprimer(medic);
    } else {
      console.log('You are not sure');
    }
  });
};


  $scope.remove = function (thing) {
    StorageService.remove(thing);
  };

})

.controller('CommandeCtrl', function ($scope, $stateParams,$ionicPopup,StorageService,$rootScope,$cordovaFile) {
  $scope.commande = {};
  $scope.things = StorageService.getAll();
  var panier = $scope.panier=[];
  var select =$scope.select =[];
  $rootScope.stocks = StorageService.getMedic();

  $scope.supprimer = function(medic){
    var index = $scope.panier.indexOf(medic);
    $scope.panier[index].quantite += $scope.panier[index].nb;
    $scope.panier.splice($scope.panier.indexOf(medic),1);
  };
  $scope.vider = function(){
    var commandes = [];
    for (var i=0;i<$scope.panier.length;i++)
    {
    $scope.com = {
      "nomM":"",
      "quantite":0
    }
    $scope.com.nomM=$scope.panier[i].nomM;
    $scope.com.quantite = $scope.commande.quantite;
    console.log($scope.com);
  }
    $scope.panier =[];
  }

  $scope.search = function(newValue){
    console.log(newValue);
    $scope.select = newValue;
    for (var i = 0; i < $scope.select.length; i++) {
      ajouter($scope.select[i]);
    }
  }

  var ajouter = function(medic){
      for (var i = 0; i < panier.length; i++) {
        if(panier[i].id_medic === medic.id_medic){
          return;
        }
      }
      if(medic != null){
          medic.quantite--;
          medic.nb = 1;
          $scope.panier.push(medic);
      }
    };

    $scope.supprimer = function(medic){
      var index = $scope.panier.indexOf(medic);
      $scope.panier[index].quantite += $scope.panier[index].nb;
      $scope.panier.splice($scope.panier.indexOf(medic),1);
    };

  $scope.showConfirmsup = function() {
    console.log("ok");
    var confirmPopup = $ionicPopup.confirm({
      title: 'Consume Ice Cream',
      template: 'Voulez-vous vraiment annuler la commande ?'
    });
    confirmPopup.then(function(res) {
      if(res) {
        console.log('You are sure');
        $scope.vider();
        //$scope.supprimer();
      } else {
        console.log('You are not sure');
      }
    });
  };

  $scope.showConfirmval = function() {
    /*
    var panierC = "";
    console.log($scope.commande);
    for (var i=0;i<panier.length;i++)
    {
      console.log("ok");
      var panierC = panierC + panier[i].nomM + ":";
    }
    */
    var confirmPopup = $ionicPopup.confirm({
      title: 'Consume Ice Cream',
      template: 'Voulez-vous vraiment commander ces médicaments ?'
    });
    confirmPopup.then(function(res) {
      if(res) {
        $scope.vider();
        console.log('You are sure');
        //$scope.supprimer();
      } else {
        console.log('You are not sure');
      }
    });
  };
})
// create a new factory
.factory ('StorageService', function ($localStorage) {
  $localStorage = $localStorage.$default({
  things: []
});
var _getAll = function () {
  return $localStorage.things;
};
var _add = function (thing) {
  $localStorage.things.push(thing);
}
var _remove = function (thing) {
  $localStorage.things.splice($localStorage.things.indexOf(thing), 1);
}
var _setMedic = function(thing){
  $localStorage.things[0] = thing;
}
var _setPatient = function(thing){
  $localStorage.things[1] = thing;
}
var _getMedic = function(){
  return $localStorage.things[0];
}
var _getPatient = function(){
  return $localStorage.things[1];
}
return {
    getAll: _getAll,
    add: _add,
    remove: _remove,
    getMedic: _getMedic,
    getPatient: _getPatient,
    setMedic: _setMedic,
    setPatient: _setPatient
  };
})
;


/*.controller('registerLogin', function ($scope, $ionicPopup, $ionicListDelegate, pouchCollection)) {
var dbName = 'login-storage';
$scope.logs = pouchCollection(dbName);

$scope.newLog = function(loginData){

}


}*/
