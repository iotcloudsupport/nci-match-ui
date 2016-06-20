(function () {

    angular.module('patients.matchbox', [])
        .controller('PatientsController', PatientsController);

    function PatientsController($scope,
        DTOptionsBuilder,
        patientApi) {

        this.dtOptions = DTOptionsBuilder.newOptions()
            .withDisplayLength(100);

        this.dtColumnDefs = [];

        this.dtInstance = {};

        $scope.patientList = [];

        $scope.setupScope = setupScope;

        $scope.loadPatientList = function () {
            patientApi
                .loadPatientList()
                .then(setupScope);
        };

        function setupScope(data) {
            $scope.patientList = data;
        }
    }

} ());
