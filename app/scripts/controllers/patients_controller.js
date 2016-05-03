angular.module('patients.matchbox',[])
    .controller('PatientsController', function($scope,
                                               DTOptionsBuilder,
                                               DTColumnDefBuilder,
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
                    
                    // angular.forEach(d.data, function (value, key) {
                    //     var treatmentArmId = '-';
                    //     var treatmentArmVersion = '-';
                    //     var treatmentArm = null;
                    //     if (value.currentTreatmentArm &&
                    //         value.currentTreatmentArm.id &&
                    //         value.currentTreatmentArm.version) {
                    //         treatmentArmId = value.currentTreatmentArm.id;
                    //         treatmentArmVersion =  value.currentTreatmentArm.version;
                    //         treatmentArm = value.currentTreatmentArm.id + ' (' + treatmentArmVersion + ')'
                    //     }
                    //     $scope.patientList.push({
                    //         'patientSequenceNumber': value.patientSequenceNumber,
                    //         'currentStatus': value.currentStatus,
                    //         'currentStepNumber': value.currentStepNumber,
                    //         'diseases': value.diseases,
                    //         'currentTreatmentArmId': treatmentArmId,
                    //         'currentTreatmentArmVersion': treatmentArmVersion,
                    //         'currentTreatmentArm': treatmentArm,
                    //         'registrationDate': value.registrationDate,
                    //         'offTrialDate': value.offTrialDate
                    //     });
                    // });
                });
        };
    });
