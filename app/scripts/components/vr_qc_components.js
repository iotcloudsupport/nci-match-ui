(function () {
    "use strict";

    function VrFiltered($scope, $element, $attrs, $log, arrayTools, $filter) {
        var ctrl = this;

        ctrl.gridOptions = {};
        ctrl.filterOptions = [
            '1',
            '2',
            '3'
        ];

        ctrl.$onInit = function() {
            ctrl.gridOptions = {
                data: ctrl.items,
                sort: {
                    predicate: 'identifier',
                    direction: 'asc'
                },
                searchableProps: ctrl.getSearchableProps(),
                customFilters: {
                    filterAll: function (items, value, predicate) {
                        return items.filter(function (item) {
                            return arrayTools.itemHasValue(item, value, 
                                $scope.gridOptions.searchableProps, $scope.gridOptions.ngColumnFilters, $filter);
                        });
                    }
                }
            };
        };

        ctrl.getSearchableProps = function() {
            return [];
        }
    }

    angular.module('matchbox').component('vrQcSnvMnvIndel', {
        templateUrl: 'views/templates/variant_report/vr_qc_snv_mnv_indel.html',
        controller: VrFiltered,
        bindings: {
            gridId: '<',
            items: '<'
        }
    });

}());
