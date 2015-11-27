/**
 * Created by hendrikssonm on 11/25/15.
 */
//angular
//    .module('sample', [])
//    .provider('sample', function() {
//        'use strict';
//
//        var value = 'Default Value';
//
//        this.setValue = function(val) {
//            value = val;
//        };
//
//        this.$get = function() {
//
//            var getValue = function() {
//                return value;
//            };
//
//            var throwValue = function() {
//                throw new Error(value);
//            };
//
//            return {
//                getValue: getValue,
//                throwValue: throwValue
//            };
//
//        };
//
//    });

var todoApp = angular.module('todoApp',[]);

todoApp.controller('TodoController', function($scope, notesFactory) {
    $scope.notes = notesFactory.get();
    $scope.createNote = function() {
        notesFactory.put($scope.note);
        $scope.note = '';
        $scope.notes = notesFactory.get();
    }
});

