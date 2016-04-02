;(function () {
    'use strict';

    angular.module('riceBookApp', ['ngRoute', 'ngResource', 'puElasticInput', 'monospaced.elastic', 'angular-img-cropper'])
        .config(config)
        .constant('apiURL', 'https://webdev-dummy.herokuapp.com');

    config.$inject = ["$routeProvider"];
    function config($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'app/login/login.html',
                controller: 'LoginCtrl',
                controllerAs: 'vm'
            })

            .when('/main', {
                templateUrl: 'app/main.html',
                controller: 'MainPageCtrl',
                controllerAs: 'vm'
            })

            .when('/profile', {
                templateUrl: 'app/profile/profile.html',
                controller: 'ProfileCtrl',
                controllerAs: 'vm'
            })

            .otherwise({
                redirectTo: '/'
            });
    }
})();