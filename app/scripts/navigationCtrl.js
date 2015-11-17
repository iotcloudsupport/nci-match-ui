//
//angular
//    .module('inspinia')
//    .controller('NavCtrl', function($scope, $location) {
//    $scope.isActive = function(route) {
//        return route === $location.path();
//    };
//});


/**
 * Created by hendrikssonm on 11/12/15.
 */
/**
 * navCtrl - controller
 */

//function navCtrl($scope, $location)
//{
//    $scope.isActive = function (viewLocation) {
//        return viewLocation === $location.path();
//    };
//}
//var app = angular.module("app", []);
//app.controller("activeCtrl", function ($scope) {
//    $scope.data = {};
//    $scope.data.isVisible = true;
//});


//var app = angular.module("app", []);
//app.controller("activeCtrl", function ($scope) {
//    $scope.data = {};
//    $scope.data.case = true;
//});


//var activeCtrl = angular.module('activeCtrl',[]);
//    function activeLink($scope) {
//
//    alert("pop")
//
//    $scope.activeTemplate='views/common/reportboard1.html'
//}

//$scope.nav = function(path) {
//    $scope.filePath = path;
//};

var navCtrl = angular.module('navCtrl',[]);
function toLink($scope) {

    $scope.linkSite = function(path) {
        $scope.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };

    }
}

var activeCtrl = angular.module("activeCtrl", []);
function activeLink($scope) {

    $scope.activateLink = function (id) {
        //$scope.activeTemplate='views/common/dashboard.html'

        $scope.data = {};

        $scope.pFilter = id;

    };
}





angular
    .module('inspinia')
    .controller('navCtrl', toLink)
    .controller('activeCtrl', activeLink)
    //.controller('ctrlB', function($scope) {
    //    $scope.v = "Hello from controller B";
    //});