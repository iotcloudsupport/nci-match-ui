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

angular.module('scopeTable', []);
function tableLink($scope) {
    $scope.username = 'World';

    $scope.sayHello = function() {
        $scope.greeting = 'Hello ' + $scope.username + '!';
    };
};
    //.controller('MyController', ['$scope', function($scope) {
    //    $scope.username = 'World';
    //
    //    $scope.sayHello = function() {
    //        $scope.greeting = 'Hello ' + $scope.username + '!';
    //    };
    //}]);

//angular.module('tableCtrl', []);
//function tableLink($scope) {
//    $scope.tableLink = function (id, data) {
//        'use strict';
//            return {
//                template: '<table class="display table table-striped table-hover" id="my-data-table"></table>',
//                link: function postLink(scope, element, attrs) {
//                    $("#"+ id).dataTable(
//
//                        'data': data,
//                        'bAutoWidth' : false,
//                        'bFilter': true,
//                        'bSearchable':true,
//                        'bInfo':false,
//                        'bPaginate': true,
//                        'bDestroy': true,
//                        'aaSorting': [],
//                        'iDisplayLength': 100,
//                        'order' : [[0, "asc"]],
//                        "dom": 'T<"clear">lfrtip',
//                        'language' : { 'zeroRecords': 'There are no patients.'
//
//                    );
//                }
//            }
//        );
//    };
//}

angular
    .module('inspinia')
    .controller('navCtrl', toLink)
    .controller('activeCtrl', activeLink)
    .controller('tableCtrl', tableLink)
    //.directive('tableCtrl', tableLink)
