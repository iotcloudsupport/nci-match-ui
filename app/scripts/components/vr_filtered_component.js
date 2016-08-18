(function () {
    "use strict";

    function VrFilteredReportController($scope, $element, $attrs) {
        var ctrl = this;

        ctrl.confirmTitle = '';
        ctrl.confirmMessage = '';

        ctrl.gridOptions = {};

        ctrl.$onInit = function() {
            ctrl.gridOptions = {
                data: ctrl.gridData
            };
        };

        ctrl.onItemConfirmed = function (item) {
            ctrl.onItemConfirmed(item);
        };
    }

    angular.module('matchbox').component('vrFilteredReport', {
        templateUrl: 'views/templates/variant_report/vr_filtered_snv_mnv_indel_table.html',
        controller: VrFilteredReportController,
        bindings: {
            gridId: '<',
            items: '<',
            isEditable: '<',
            onItemConfirmed: '&'
        }
    });

}());
