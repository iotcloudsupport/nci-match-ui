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
            };
            
            vm.shownId = vm.id;
            vm.attrs = '{ patient_id: vm.id }';
            switch(vm.text) {
                case 'surgical_event':
                    vm.attrs = '{ patient_id: vm.id, section: vm.text, molecular_id: vm.mid, analysis_id: vm.aid }';
                    vm.shownId = vm.seid;
                    break;
                case 'tissue_variant_report':
                    vm.attrs = '{ patient_id: vm.id, section: vm.text, molecular_id: vm.mid, analysis_id: vm.aid }';
                    vm.shownId = vm.aid;
                    break;
                case 'blood_variant_report':
                    vm.attrs = '{ patient_id: vm.id, section: vm.text, molecular_id: vm.mid, analysis_id: vm.aid }';
                    vm.shownId = vm.mid;
                    break;
                case 'assignment_report':
                    vm.attrs = '{ patient_id: vm.id, section: vm.text, molecular_id: vm.mid, analysis_id: vm.aid }';
                    vm.shownId = vm.aid;
                    break;
                case 'patient_assignment':
                    vm.shownId = vm.id;
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
        //var template = '<span ng-if="vm.hasData()" ui-sref="patient({patient_id: vm.id})">{{vm.id}}</span>';
        var template = '<span class="ta-title">\
                    \
                    <span ng-if="vm.hasData() && vm.noUrl" style="color:{{vm.getTextColor()}}">\
                        <span class="ta-name" style="color:{{vm.getTextColor()}}">{{vm.id}}</span>\
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
                /*name: '<',
                 stratum: '<',
                 version: '<',
                 noUrl: '<',
                 textColor: '<',*/
                id: '<',
                text: '<',
                mid: '<',
                aid: '<',
                seid: '<'
            }
        }
    }

} ());