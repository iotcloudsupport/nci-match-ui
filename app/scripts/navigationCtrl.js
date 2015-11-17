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


var navCtrl = angular.module('navCtrl',[]);

function toLink($scope) {

    $scope.linkSite = function(path) {
        $scope.isActive = function (viewLocation) {
            alert("pop")
            return viewLocation === $location.path();
        };

    }

    //alert($scope)

    //$scope.tpl = {};
    //$scope.tpl.contentUrl = '/views/common/reportboard1.html';
}

angular
    .module('inspinia')
    .controller('navCtrl', toLink)
    //.controller('ctrlB', function($scope) {
    //    $scope.v = "Hello from controller B";
    //});