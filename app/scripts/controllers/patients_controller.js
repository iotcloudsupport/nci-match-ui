angular.module('patients.matchbox',[])
    .controller('PatientsController', function($scope,
                                               DTOptionsBuilder,
                                               matchApiMock) {
        
        this.dtOptions = DTOptionsBuilder.newOptions()
            .withDisplayLength(100);

        this.dtColumnDefs = [];

        this.dtInstance = {};

        $scope.patientList = [];

        $scope.loadPatientList = function () {
            matchApiMock
                .getPatientListData()
                .then(function (d) {
                    $scope.patientList = d;
                });
        };
    });
