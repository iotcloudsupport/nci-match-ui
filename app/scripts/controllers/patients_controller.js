(function () {

    angular.module('matchbox.patients', [])
        .controller('PatientsController', PatientsController);

    function PatientsController($scope,
        DTOptionsBuilder,
        matchApiMock,
        $log) {

        this.dtOptions = DTOptionsBuilder.newOptions().withDisplayLength(100);
        this.dtColumnDefs = [];
        this.dtInstance = {};

        $scope.patientList = [];

        $scope.loadPatientList = function () {
            matchApiMock
                .loadPatientList()
                .then(setupScope);
        };

        function setupScope(data) {
            $scope.patientList = data.data;
        }
    }

} ());
