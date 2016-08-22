(function () {
    angular
        .module('matchbox.treatment-arms',[])
        .controller('TreatmentArmsController', TreatmentArmsController);

    function TreatmentArmsController (
        $scope,
        arrayTools,
        matchApi,
        $filter) {

        setupGrids();

        $scope.treatmentArmList = [];

        $scope.loadTreatmentArmList = function() {
            matchApi
                .loadTreatmentArmList()
                .then(function (d) {
                    $scope.treatmentArmList = d.data;
                    $scope.gridOptions.data = d.data;
                });
        };

        function setupGrids() {
            $scope.gridOptions = {
                data: [],
                ngColumnFilters: {
                    "date_opened": "utc",
                    "date_suspended_or_closed": "utc"
                },
                sort: {
                    predicate: 'name',
                    direction: 'asc'
                },
                searchableProps: [
                    'name',
                    'current_patients',
                    'former_patients',
                    'not_enrolled_patients',
                    'pending_patients',
                    'treatment_arm_status',
                    'date_opened',
                    'date_closed'
                ],
                customFilters: {
                    filterAll: function (items, value, predicate) {
                        return items.filter(function (item) {
                            return arrayTools.itemHasValue(
                                item,
                                value,
                                $scope.gridOptions.searchableProps,
                                $scope.gridOptions.ngColumnFilters,
                                $filter);
                        });
                    }
                }
            };
        }
    }
} ());