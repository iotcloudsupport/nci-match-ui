(function () {
    "use strict";

    angular
        .module('matchbox')
        .directive('patientTitle', patientTitle);

    /**
     * Expects an object with the follwing properties:
     *   'id' - patient_id
     *   'mid' - molecular_id
     *   'aid' - analysis_id
     */
    function patientTitle($uibModal, $log) {
        var controller = function () {
            var vm = this;

            vm.hasData = function() {
                return true;
            };

            vm.getTextColor = function() {
                return vm.textColor ? vm.textColor : 'color:inherit';
            }
        };

        /*jshint multistr: true */
        //var template = '<span ng-if="vm.hasData()" ui-sref="patient({patient_id: vm.id})">{{vm.id}}</span>';
        var template = '<span class="ta-title">\
                    \
                    <span ng-if="vm.hasData() && vm.noUrl" style="color:{{vm.getTextColor()}}">\
                        <span class="ta-name" style="color:{{vm.getTextColor()}}">{{vm.id}}</span>\
                    </span>\
                    \
                    <a ng-if="vm.hasData() && !vm.noUrl" ui-sref="patient({ patient_id: vm.id } )" style="color:{{vm.getTextColor()}}">\
                        <span class="ta-name" style="color:{{vm.getTextColor()}}">{{vm.id}}</span>\
                    </a>\
                    <span ng-if="!vm.hasData()">-</span>\
                </span>';

        return {
            bindToController: true,
            restrict: 'EA',
            template: template,
            controller: controller,
            controllerAs: 'vm',
            scope: {
                /*name: '<',
                stratum: '<',
                version: '<',
                noUrl: '<',
                textColor: '<',*/
                id: '<',
                mid: '<',
                aid: '<'
            }
        }
    }

} ());