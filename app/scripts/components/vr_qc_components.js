(function () {
    "use strict";

    function VrQcController($scope, $element, $attrs, $log, arrayTools, $filter, matchApi) {
        var ctrl = this;

        ctrl.isLoading = true;
        ctrl.filterValues = {};
        ctrl.gridActions = {};

        ctrl.gridOptions = {
            data: [],
            sort: {
                predicate: 'identifier',
                direction: 'asc'
            },
            ngColumnFilters: [],
            searchableProps: [
                'identifier',
                'chromosome',
                'position',
                'cds_reference',
                'cds_alternative',
                'ocp_reference',
                'ocp_alternative',
                'strand',
                'allele_frequency',
                'func_gene',
                'oncomine_variant_class',
                'exon',
                'function',
                'hgvs',
                'read_depth',
                'transcript',
                'protein'
            ],
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

        function loadQcTable() {
            matchApi
                .loadQc_Table(ctrl.url)
                .then(loadQcList, handleQcLoadError);
        }

        function loadQcList(data) {
            ctrl.isLoading = false;
            ctrl.gridOptions.data = processFilterColumn(data.data.copy_number_variants);
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
            url: '<'
        }
    });

} ());
