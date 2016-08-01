(function () {

    angular.module('matchbox.treatment-arms',[])
        .controller('TreatmentArmsController', TreatmentArmsController);


            function TreatmentArmsController (
                $scope,
                DTOptionsBuilder,
                matchApi,
                $stateParams) {

                this.dtOptions = {
                    'info': false,
                    'paging': false
                };
                this.dtColumnDefs = [];
                this.dtInstance = {};

                $scope.treatmentArmList = [];

                $scope.displayTreatmentArmList = function () {
                    matchApi
                        .loadTreatmentArmList()
                        .then(function (d) {
                            $scope.treatmentArmList = d.data;
                        });
                };
            }
} ());