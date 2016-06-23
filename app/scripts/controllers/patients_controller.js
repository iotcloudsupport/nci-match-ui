(function () {

    angular.module('patients.matchbox', [])
        .controller('PatientsController', PatientsController);

    function PatientsController($scope,
        DTOptionsBuilder,
        matchApiMock,
        $log) {

        this.dtOptions = DTOptionsBuilder.newOptions()
            .withDisplayLength(100);

        this.dtColumnDefs = [];

        this.dtInstance = {};

        $scope.patientList = [];

        // $scope.setupScope = setupScope;

        $scope.loadPatientList = function () {
            matchApiMock
                .loadPatientList()
                .then(setupScope);
        };

        function setupScope(data) {
            $scope.patientList = data.data;
            $log.debug($scope.patientList);
        }
    }

} ());
