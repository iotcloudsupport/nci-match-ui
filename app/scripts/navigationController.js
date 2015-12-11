/**
 * Created by hendrikssonm on 11/12/15.
 */
/**
 * navCtrl - controller
 */

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
        $scope.data = {};
        $scope.pFilter = id;
    };
}

angular
    .module('inspinia')
    .controller('navCtrl', toLink)
    .controller('activeCtrl', activeLink)
