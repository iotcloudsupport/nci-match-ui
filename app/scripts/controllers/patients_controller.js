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
        }
    }

} ());
