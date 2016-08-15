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
                            for (var i = 0; i < $scope.treatmentArmList.length; i++) {
                                var ta = $scope.treatmentArmList[i];
                                if (ta.current_patients !== undefined && ta.current_patients !== null) {
                                    ta.current_patients = Math.floor(ta.current_patients);
                                }
                                if (ta.former_patients !== undefined && ta.former_patients !== null) {
                                    ta.former_patients = Math.floor(ta.former_patients);
                                }
                                if (ta.not_enrolled_patients !== undefined && ta.not_enrolled_patients !== null) {
                                    ta.not_enrolled_patients = Math.floor(ta.not_enrolled_patients);
                                }
                                if (ta.pending_patients !== undefined && ta.pending_patients !== null) {
                                    ta.pending_patients = Math.floor(ta.pending_patients);
                                }
                            }
                        });
                };
            }
} ());