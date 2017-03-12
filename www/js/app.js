// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers','jett.ionic.filter.bar'])

.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

        .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })

    .state('app.stocks', {
        url: '/stocks',
        views: {
            'menuContent': {
                templateUrl: 'templates/stocks.html',
                controller: 'StocksCtrl'
            }
        }
    })

    .state('app.medicament', {
        url: '/stocks/:stockTitle',
        views: {
            'menuContent': {
                templateUrl: 'templates/stock.html',
                controller: 'StockCtrl'
            }
        }
    })

    .state('app.patients', {
        url: '/patients',
        views: {
            'menuContent': {
                templateUrl: 'templates/patients.html',
                controller: 'PatientsCtrl'
            }
        }
    })
    .state('app.patient', {
        url: '/patients/:patientTitle',
        views: {
            'menuContent': {
                templateUrl: 'templates/patient.html',
                controller: 'PatientCtrl'
            }
        }
    })
    .state('app.creation_patient', {
        url: '/creation_patient',
        views: {
            'menuContent': {
                templateUrl: 'templates/creation_patient.html',
                controller: 'CreationPatientCtrl'
            }
        }
    })

    .state('app.accueil', {
        url: '/accueil',
        views: {
            'menuContent': {
                templateUrl: 'templates/accueil.html',
                controller: 'AccueilCtrl'
            }
        }
    })
    .state('app.pharmacie', {
        url: '/pharmacie',
        views: {
            'menuContent': {
                templateUrl: 'templates/pharmacie.html',
                controller: 'PharmacieCtrl'
            }
        }
    })
    .state('app.alert', {
        url: '/alert',
        views: {
            'menuContent': {
                templateUrl: 'templates/alert.html',
                  controller: 'AlertCtrl'
            }
        }
    });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/accueil');
});
