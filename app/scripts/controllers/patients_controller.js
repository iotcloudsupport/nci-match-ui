angular.module('patients.matchbox',[])
    .controller('PatientsController', function($scope, DTOptionsBuilder,
                                               DTColumnDefBuilder, matchApi) {

        this.dtOptions = DTOptionsBuilder.newOptions()
            .withDisplayLength(100);

        this.dtColumnDefs = [];

        this.dtInstance = {};

        $scope.patientList = [];

        $scope.loadPatientList = function () {
            matchApi
                .getBasicPatientsData()
                .then(function (d) {

                    angular.forEach(d.data, function (value) {
                        var TA = '-';
                        if (value.currentTreatmentArm !== null && (typeof value.currentTreatmentArm !== 'undefined')) {
                            TA = value.currentTreatmentArm.id;
                        }
                        $scope.patientList.push({
                            'patientSequenceNumber': value.patientSequenceNumber,
                            'currentStatus': value.currentStatus,
                            'currentStepNumber': value.currentStepNumber,
                            'diseases': value.diseases,
                            'currentTreatmentArmId': TA,
                            'registrationDate': value.registrationDate,
                            'offTrialDate': value.offTrialDate
                        });
                    });
                });
        };
    });
