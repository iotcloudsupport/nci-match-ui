(function () {

    angular.module('matchbox.treatment-arms',[])
        .controller('TreatmentArmsController', TreatmentArmsController);


            function TreatmentArmsController (
                $scope,
                DTOptionsBuilder,
                treatmentArmApi,
                matchApiMock,
                $stateParams) {

                this.dtOptions = {
                    'info': false,
                    'paging': false
                };
                this.dtColumnDefs = [];
                this.dtInstance = {};

                $scope.treatmentArmList = [];

                $scope.displayTreatmentArmList = function () {
                    matchApiMock
                        .loadTreatmentArmList()
                        .then(function (d) {
                            $scope.treatmentArmList = d.data;
                        });
                    /*treatmentArmApi
                        .getTreatmentArms()
                        .then(function (d) {
                            $scope.treatmentArmList = d.data;
                            console.log(d);
                            console.log(d.data);
                        });*/
                };
            }
} ());