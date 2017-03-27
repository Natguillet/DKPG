angular.module('starter.controllers', ['ionic','ngCordova.plugins.file','ionic-modal-select','ngCordova','ngStorage'])


.controller('AppCtrl', function ($http,StorageService,$rootScope,$scope, $ionicModal, $timeout) {

  //initialisation
  console.log(StorageService.getUser());


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
  console.log("ok");
  $scope.patientData = {};
   $scope.go = function ( path ) {
    $location.path( path );
  };
  $scope.doPatient = function () {
    console.log('Doing login',$scope.patientData);
  };
})

.controller('AccueilCtrl', function ($rootScope,$http,$scope,StorageService) {
  $scope.data = {};

    $scope.submit = function(){
      StorageService.removeAll();
        var link = 'http://192.168.43.112/api2.php';
        var linkPatient ='http://192.168.43.112/api3.php';
        console.log($scope.data.username);

        $http.post(link, {username : $scope.data.username}).then(function (res){
            $scope.response = res.data;
            console.log($scope.response.length);
            for (var i = 0; i < $scope.response.length; i++) {
              StorageService.pushMedic($scope.response[i]);
            }
            StorageService.setUser($scope.data.username);
        });
        $http.post(linkPatient, {username : $scope.data.username}).then(function (res){
            $scope.response = res.data;
            console.log($scope.response.length);
            for (var i = 0; i < $scope.response.length; i++) {
              StorageService.pushPatient($scope.response[i]);
            }
        });
    };
})

.controller('PatientCtrl', function (StorageService,$scope,$http, $stateParams) {
  $scope.patients = StorageService.getAllPatient();;

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
  $scope.patients =StorageService.getAllPatient();
  })

.controller('StocksCtrl',function($rootScope,$scope,$http,$ionicFilterBar,StorageService){
  $rootScope.stocks = StorageService.getAllMedic();
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

.controller('AlertCtrl',function($scope,$http,StorageService){
  $scope.listModif = StorageService.getAllModif();
  $scope.listCommande = StorageService.getAllCommande();
  $scope.data = {};

    $scope.alert = function(){
        var link = 'http://192.168.43.112/update.php';
        $http.post(link, {type : $scope.listModif[0].type,quantite:$scope.listModif[0].quantite,id_medic:$scope.listModif[0].id_medic,id_lot:$scope.listModif[0].id_lot}).then(function (res){
            $scope.response = res.data;
            console.log(res.data);
            StorageService.remove($scope.listModif[0]);
        });
    };

})

.controller('StockCtrl', function ($scope,$http, $stateParams,StorageService) {
  $scope.stocks = StorageService.getAllMedic();
  //  console.log($stateParams);
  $scope.stateParams={};
  $scope.stateParams=$stateParams;
  $scope.intitule=["Nom du Médicament:","Prix:","Sous Ordonnance ?","Quantité:",
  "Dosage:","Date de péremption:","Quantité de dispensation:","Forme:",
  "Nom DCI:","ID du médicament:","Unité de prescription:",
  "Unité de dispensation:","Unité de conditionnement:","ID du lot",
  "Code Barre:","Nom de l'utilisateur:","Prénom de l'utilisateur","Mot de passe de l'utilisateur:","Nom du groupe régional","ID de l'utilisateur"];
  //meme ordre que le JSON
  //id quantité nomM
  //prix dosage quantitedispboite
  //...
  console.log($scope.stateParams);
})

.controller('PharmacieCtrl',function($rootScope,$scope,$http, $ionicPopup, $cordovaFile,StorageService){
  $scope.medics = StorageService.getAllMedic();
  $scope.listModif = StorageService.getAllModif();
  var panier = $scope.panier=[];
  var select =$scope.select =[];
  $rootScope.stocks = StorageService.getAllMedic();

  $scope.search = function(newValue){
    $rootScope.stocks = StorageService.getAllMedic();
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
        "quantite":0,
        "id_medic":0,
        "id_lot":0,
        "type":"retrait"
      };
      modif.quantite = $scope.panier[i].nb;
      modif.id_medic= $scope.panier[i].id_medic;
      modif.id_lot = $scope.panier[i].id_lot;
      modifs[i] = modif;
      StorageService.pushModif(modif);
    }
    console.log($scope.stocks);
    panier = $scope.panier = [];
    $scope.listModif = StorageService.getAllModif();
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
/*  $scope.commande = {};
  $scope.things = StorageService.getAll();
  var panier = $scope.panier=[];
  var select =$scope.select =[];
  $rootScope.stocks = StorageService.getAllMedic();*/
  $scope.commande = {};
  $scope.medics = StorageService.getAllMedic();
  $scope.listModif = StorageService.getAllModif();
  var panier = $scope.panier=[];
  var select =$scope.select =[];
  $rootScope.stocks = StorageService.getAllMedic();

  $scope.supprimer = function(medic){
    var index = $scope.panier.indexOf(medic);
    $scope.panier[index].quantite += $scope.panier[index].nb;
    $scope.panier.splice($scope.panier.indexOf(medic),1);
  }
  $scope.vider = function(){
    var commandes = [];
    for (var i=0;i<$scope.panier.length;i++)
    {
    $scope.com = {
      "id_medic":"",
      "quantite":0,
      "type":"commande"
    }
    $scope.com.id_medic=$scope.panier[i].id_medic;
    $scope.com.quantite = $scope.panier[i].quantite;
    console.log($scope.com);
    StorageService.pushModif($scope.com);
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
      for (var i = 0; i < $scope.panier.length; i++) {
        if(panier[i].id_medic === medic.id_medic){
          return;
        }
      }
      if(medic != null){
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
  user: [],
  medics:[],
  patients:[],
  modifs:[],
  commandes:[]
});
var _setMedic = function (index,medic) {
  $localStorage.medics[index] = medic;
};
var _getMedic = function (index) {
  return $localStorage.medics[index];
}
var _pushMedic = function (medic) {
  $localStorage.medics.push(medic);
}
var _getAllMedic = function () {
  return $localStorage.medics;
}
var _setPatient = function(index,patient){
  $localStorage.patients[index]=patient;
}
var _getPatient = function(index){
  return $localStorage.patients[index];
}
var _getAllPatient = function(){
  return $localStorage.patients;
}
var _pushPatient = function(patient){
  $localStorage.patients.push(patient);
}
var _getUser = function(){
  return $localStorage.user[0];
}
var _setUser = function (user) {
  $localStorage.user[0]=user;
}
var _pushUser = function(user){
  if($localStorage.user.length == 0) $localStorage.user.push(user);
}
var _getAllModif = function() {
  return $localStorage.modifs;
}
var _pushModif = function(modif){
  $localStorage.modifs.push(modif);
}
var _getAllCommande = function() {
  return $localStorage.commandes;
}
var _pushCommande = function(commande){
  $localStorage.commandes.push(commande);
}
var _remove = function (thing) {
  $localStorage.modifs.splice($localStorage.modifs.indexOf(thing), 1);
}
var _removeAll = function(){
  $localStorage.medics =[];
  $localStorage.patients =[];
  $localStorage.modifs = [];
  $localStorage.commandes = [];
  $localStorage.user = [];
}
return {
    setMedic:_setMedic,
    getMedic:_getMedic,
    pushMedic:_pushMedic,
    getAllMedic:_getAllMedic,
    setPatient:_setPatient,
    getPatient:_getPatient,
    getAllPatient:_getAllPatient,
    pushPatient:_pushPatient,
    getUser:_getUser,
    setUser:_setUser,
    pushUser:_pushUser,
    pushModif:_pushModif,
    pushCommande:_pushCommande,
    getAllCommande:_getAllCommande,
    getAllModif:_getAllModif,
    remove:_remove,
    removeAll:_removeAll
  };
})

;
