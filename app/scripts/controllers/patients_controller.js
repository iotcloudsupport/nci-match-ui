(function () {

    angular.module('matchbox.patients', [])
        .controller('PatientsController', PatientsController);

    function PatientsController($scope,
        DTOptionsBuilder,
        matchApi,
        $log) {

        this.dtOptions = DTOptionsBuilder.newOptions().withDisplayLength(100);
        this.dtColumnDefs = [];
        this.dtInstance = {};

        $scope.patientList = [];

        $scope.loadPatientList = function () {
            matchApi
                .loadPatientList()
                .then(setupScope);
        };

        function setupScope(data) {
            $scope.patientList = data.data;
            for (var i = 0; i < $scope.patientList.length; i++) {
                var item = $scope.patientList[i];
                if (item.current_assignment && item.current_assignment.assignment_logic && item.current_assignment.assignment_logic.length) {
                    for (var j = 0; j < item.current_assignment.assignment_logic.length; j++) {
                        var logic = item.current_assignment.assignment_logic[j];
                        if (logic.reasonCategory === 'SELECTED') {
                            item.treatment_arm_name = logic.treatmentArmName;
                            item.treatment_arm_version = logic.treatmentArmVersion;
                            item.treatment_arm_stratum_id = logic.treatmentArmStratumId;
                        }
                    }
                }
            }
        }
    }

} ());
