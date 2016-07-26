(function () {
    "use strict";

    angular
        .module('matchbox')
        .directive('patientTitle', patientTitle);

    /**
     * Expects an object with the following properties:
     *   patientId
     *   molecularId
     *   analysisId
     *   surgicalEventId
     */
    function patientTitle($uibModal, $log) {
        var controller = function () {
            var vm = this;

            vm.hasData = function() {
                return true;
            };

            vm.getTextColor = function() {
                return vm.textColor ? vm.textColor : 'color:inherit';
            };

            vm.shownId = vm.patientId;
            vm.attrs = '{ patient_id: vm.patientId }';
            switch(vm.text) {
                case 'surgical_event':
                    vm.attrs = '{ patient_id: vm.patientId, section: vm.text, surgical_event_id: vm.surgicalEventId }';
                    vm.shownId = vm.surgicalEventId;
                    break;
                case 'tissue_variant_report':
                    console.log('in tissue variant report');
                    console.log(vm);
                    vm.attrs = '{ patient_id: vm.patientId, section: vm.text, molecular_id: vm.molecularId, analysis_id: vm.analysisId }';
                    vm.shownId = vm.analysisId;
                    break;
                case 'blood_variant_report':
                    vm.attrs = '{ patient_id: vm.patientId, section: vm.text, molecular_id: vm.molecularId, analysis_id: vm.analysisId }';
                    vm.shownId = vm.molecularId;
                    break;
                case 'assignment_report':
                    vm.attrs = '{ patient_id: vm.patientId, section: vm.text, molecular_id: vm.molecularId, analysis_id: vm.analysisId }';
                    vm.shownId = vm.analysisId;
                    break;
                case 'patient_assignment':
                    vm.shownId = vm.patientId;
                    break;
                default:
                    break;
            }

        };

        /*
         <a ui-sref="patient({ patient_id: patient.patient_id, section: 'surgical_event', molecular_id: patient.molecular_id, analysis_id: patient.analysis_id })">{{ patient.molecular_id | dashify }}</a>
         <a ui-sref="patient({ patient_id: patient.patient_id, section: 'tissue_variant_report', molecular_id: patient.molecular_id, analysis_id: patient.analysis_id })">{{ patient.analysis_id | dashify }}</a>
         <a ui-sref="patient({ patient_id: vm.patientId, section: 'blood_variant_report', molecular_id: item.molecular_id, analysis_id: item.analysis_id })">{{ ::item.molecular_id }}</a>
         <a ui-sref="patient({ patient_id: vm.patientId, section: 'assignment_report', molecular_id: item.molecular_id, analysis_id: item.analysis_id })">{{ ::item.analysis_id }}</a>
         else just patient id
         */

        /*jshint multistr: true */
        var template = '<span class="ta-title">\
                    \
                    <span ng-if="vm.hasData() && vm.noUrl" style="color:{{vm.getTextColor()}}">\
                        <span class="ta-name" style="color:{{vm.getTextColor()}}">{{vm.patientId}}</span>\
                    </span>\
                    \
                    <a ng-if="vm.hasData() && !vm.noUrl" ui-sref="patient({{vm.attrs}})" style="color:{{vm.getTextColor()}}">\
                        <span class="ta-name" style="color:{{vm.getTextColor()}}">{{vm.shownId}}</span>\
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
                patientId: '<',
                molecularId: '<',
                analysisId: '<',
                surgicalEventId: '<'
            }
        }
    }

} ());