(function () {
    "use strict";

    function VrQcController($scope, $element, $attrs, $log, arrayTools, $filter, matchApi) {
        var ctrl = this;

        ctrl.isLoading = true;
        ctrl.filterValues = {};
        ctrl.gridActions = {};

        ctrl.searchablePropArray = getSearchableProps();

        ctrl.gridOptions = {
            data: [],
            sort: {
                predicate: 'identifier',
                direction: 'asc'
            },
            ngColumnFilters: [],
            searchableProps: ctrl.searchablePropArray,
            customFilters: {
                filterAll: function (items, value, predicate) {
                    return items.filter(function (item) {
                        return arrayTools.itemHasValue(item, value,
                            ctrl.gridOptions.searchableProps, ctrl.gridOptions.ngColumnFilters, $filter);
                    });
                }
            }
        };

        ctrl.$onChanges = function (changes) {
            if (changes.url) {
                loadQcTable();
            }
        };

        ctrl.$onInit = function () {
            loadQcTable();
        };

        function getSearchableProps() {
            if (!ctrl.searchableProps)
                return [];

            return ctrl.searchableProps.split('|');
        }

        function loadQcTable() {
            matchApi
                .loadQc_Table(ctrl.url)
                .then(loadQcList, handleQcLoadError);
        }

        function loadQcList(data) {
            ctrl.isLoading = false;
            ctrl.gridOptions.data = processFilterColumn(data.data[ctrl.fileSection]);
        }

        function handleQcLoadError(error) {
            ctrl.isLoading = false;
            $log.error('Error while loading QC data');
            $log.error(error);
        }

        function processFilterColumn(data) {
            if (!data)
                return data;

            for (var i = 0; i < data.length; i++) {
                var element = data[i];
                if ('filter' in element) {
                    element._filter_col = element.filter;
                    if (!(element.filter in ctrl.filterValues)) {
                        ctrl.filterValues[element.filter] = element.filter;
                    }
                }
            }

            return data;
        }
    }

    angular.module('matchbox').component('vrQcSnvMnvIndel', {
        templateUrl: 'views/templates/variant_report/vr_qc_snv_mnv_indel.html',
        controller: VrQcController,
        bindings: {
            gridId: '<',
            url: '<',
            searchableProps: '@',
            fileSection: '@'
        }           
    });

    angular.module('matchbox').component('vrQcCnv', {
        templateUrl: 'views/templates/variant_report/vr_qc_cnv.html',
        controller: VrQcController,
        bindings: {
            gridId: '<',
            url: '<',
            searchableProps: '@',
            fileSection: '@'
        }
    });

    angular.module('matchbox').component('vrQcGf', {
        templateUrl: 'views/templates/variant_report/vr_qc_gf.html',
        controller: VrQcController,
        bindings: {
            gridId: '<',
            url: '<',
            searchableProps: '@',
            fileSection: '@'
        }
    });

} ());
