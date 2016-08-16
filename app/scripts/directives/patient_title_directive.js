(function () {
    "use strict";

    angular
        .module('matchbox')
        .directive('patientTitle', patientTitle);

    /**
     * Expects an object with the following properties:
     *   section - tells where to route to
     *   text - text to display in the feed message
     *   patientId
     *   molecularId
     *   analysisId
     *   surgicalEventId
     */
    function patientTitle($log) {
        var controller = function () {
            var vm = this;

            vm.hasData = function() {
                return true;
            };

            vm.getTextColor = function() {
                return vm.textColor ? vm.textColor : 'color:inherit';
            };

            vm.attrs = '{ patient_id: vm.patientId }';
            switch(vm.section) {
                case 'TISSUE':
                    vm.section = 'tissue_variant_report';
                    break;
                case 'BLOOD':
                    vm.section = 'blood_variant_report';
                    break;
                default:
                    break;
            }
            vm.attrs = '{ patient_id: vm.patientId, section: vm.section, surgical_event_id: vm.surgicalEventId, molecular_id: vm.molecularId, analysis_id: vm.analysisId }';

        };

        /*jshint multistr: true */
        var template = '<span class="ta-title">\
                    \
                    <span ng-if="vm.hasData() && vm.noUrl" style="color:{{vm.getTextColor()}}">\
                        <span class="ta-name" style="color:{{vm.getTextColor()}}">{{vm.text}}</span>\
                    </span>\
                    \
                    <a ng-if="vm.hasData() && !vm.noUrl" ui-sref="patient({{vm.attrs}})" style="color:{{vm.getTextColor()}}">\
                        <span class="ta-name" style="color:{{vm.getTextColor()}}">{{vm.text}}</span>\
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
                section: '<',
                text: '<',
                patientId: '<',
                molecularId: '<',
                analysisId: '<',
                surgicalEventId: '<',
                textColor: '<'
            }
        }
    }

} ());