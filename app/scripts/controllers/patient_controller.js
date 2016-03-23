angular.module('patient.matchbox',[])
    .controller('PatientController', function( $scope, DTOptionsBuilder,
                                               DTColumnDefBuilder, matchApi, $stateParams) {

        this.dtOptions = DTOptionsBuilder.newOptions()
            .withDisplayLength(100);
        $scope.Biopsy = {};

        $scope.patientDetailsList = [];

        $scope.loadPatientDetailsList = function () {

            //alert("patientSequenceNumber--> "+$stateParams.patientSequenceNumber)

            matchApi
                .getPatientDetailsData($stateParams.patientSequenceNumber)
                .then(function (d) {

                    //alert(JSON.stringify(d))
                    angular.forEach(d, function (value) {
                        var TA = '-';
                        var Biopsy = '-';
                        var Status = '-';

                        if (value.currentTreatmentArm !== null && (typeof value.currentTreatmentArm !== 'undefined')) {
                            TA = value.currentTreatmentArm.id;
                        }

                        if(value.formattedPatientHistoryRows !== null && (typeof value.formattedPatientHistoryRows !== 'undefined')) {
                            Status = value.formattedPatientHistoryRows[0].patientStatus;
                            $scope.Biopsy = value.formattedPatientHistoryRows[0].biopsies[0].biopsySequenceNumber;
                        }
                        $scope.patientDetailsList.push({
                            'patientStatus': Status,
                            'currentTreatmentArmId': TA,
                            'assignmentLogic': '-',
                            'variantReport': '-',
                            'statusDate': value.registrationDate,
                            'comments': 'ABCD',
                            'stepNumber': value.currentStepNumber,
                            'biopsyNumber' : $scope.Biopsy
                        });
                    });
                });
        };
    });
