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

        ctrl.$onInit = function () {
            ctrl.gridOptions = {
                data: ctrl.items,
                sort: {
                    predicate: 'identifier',
                    direction: 'asc'
                },
                customFilters: {
                    filterAll: function (items, value, predicate) {
                        return items.filter(function (item) {
                            return arrayTools.itemHasValue(item, value,
                                ctrl.gridOptions.searchableProps, ctrl.gridOptions.ngColumnFilters, $filter);
                        });
                    }
                }
            };

            $log.debug('Initialized with ' + ctrl.gridOptions.data.length);
        };

        ctrl.getSearchableProps = function () {
            return [];
        }

        ctrl.$onChanges = function (changes) {
            if (changes.items) {
                ctrl.gridOptions.data = changes.items.currentValue;
                $log.debug('Initialized with ' + ctrl.gridOptions.data.length);
            }
        };
    }

    angular.module('matchbox').component('vrQcSnvMnvIndel', {
        templateUrl: 'views/templates/variant_report/vr_qc_snv_mnv_indel.html',
        controller: VrFiltered,
        bindings: {
            gridId: '<',
            items: '<'
        }
    });

} ());
