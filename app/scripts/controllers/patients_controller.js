(function () {

    angular.module('matchbox.patients', [])
        .controller('PatientsController', PatientsController);

    function PatientsController($scope,
        matchApi,
        $log,
        arrayTools,
        $filter) {

        activate();

        $scope.gridActions = {};

        function activate() {
            setupGrids();
        }

        function setupGrids() {
            $scope.gridOptions = {
                data: [],
                ngColumnFilters: {
                    "registration_date": "utc",
                    "off_trial_date": "utc"
                },
                sort: {
                    predicate: 'patient_id',
                    direction: 'asc'
                },
                searchableProps: [
                    'patient_id',
                    'current_status',
                    'current_step_number',
                    'disease_list',
                    'registration_date',
                    'off_trial_date',
                    'treatment_arm_title'
                ],
                customFilters: {
                    filterAll: function (items, value, predicate) {
                        return items.filter(function (item) {
                            return arrayTools.itemHasValue(item, value, 
                                $scope.gridOptions.searchableProps, $scope.gridOptions.ngColumnFilters, $filter);
                        });
                    }
                }
            };
        }

        $scope.loadPatientList = function () {
            matchApi
                .loadPatientList()
                .then(setupScope);
        };

        function setupScope(data) {
            $scope.gridOptions.data = data.data;

            for (var i = 0; i < $scope.gridOptions.data.length; i++) {
                var item = $scope.gridOptions.data[i];
                if (item.current_assignment && item.current_assignment.assignment_logic && item.current_assignment.assignment_logic.length) {
                    for (var j = 0; j < item.current_assignment.assignment_logic.length; j++) {
                        var logic = item.current_assignment.assignment_logic[j];
                        if (logic.reasonCategory === 'SELECTED') {
                            item.treatment_arm_name = logic.treatmentArmName;
                            item.treatment_arm_version = logic.treatmentArmVersion;
                            item.treatment_arm_stratum_id = logic.treatmentArmStratumId;
                        }
                    }

                    if (item.diseases && item.diseases.length) {
                        item.disease_list = item.diseases.map(function(x) { return x.disease_name }).join(', ');
                    }
                }
            }
        }
    }

} ());
