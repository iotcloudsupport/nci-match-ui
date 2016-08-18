(function () {
    "use strict";

    function VrFilteredReportController($scope, $element, $attrs, $log) {
        var ctrl = this;

        ctrl.confirmTitle = '';
        ctrl.confirmMessage = '';

        ctrl.gridOptions = {};

        ctrl.$onInit = function() {
            ctrl.gridOptions = {
                data: ctrl.items
            };
            $log.debug('Initialized VR with ' + ctrl.gridData.data.length);
        };

        ctrl.onItemConfirmed = function (item) {
            ctrl.onItemConfirmed(item);
        };
    }

    angular.module('matchbox').component('variantReportFiltered', {
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
