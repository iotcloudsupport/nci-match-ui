(function () {

    angular.module('treatment-arms.matchbox',[])
        .controller('TreatmentArmsController', TreatmentArmsController);


            function TreatmentArmsController (
                $scope,
                DTOptionsBuilder,
                treatmentArmApi,
                matchApiMock) {

                this.dtOptions = {
                    'info': false,
                    'paging': false
                };
                this.dtColumnDefs = [];
                this.dtInstance = {};

                $scope.treatmentArmList = [];

                $scope.displayTreatmentArmList = function () {
                    matchApiMock
                        .displayTreatmentArmList()
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