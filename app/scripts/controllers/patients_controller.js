angular.module('patients.matchbox',[])
    .controller('PatientsController', function($scope, DTOptionsBuilder, DTColumnDefBuilder, matchApi, idService) {

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
                        if (value.currentTreatmentArm !== null) {
                            TA = value.currentTreatmentArm.id;
                        }
                        ;

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
        //.state('index.patient', {
        ////index/patient/10003
        //    url: '/index/:patient/:patientSequenceNumber',
        //    controller: function($scope, $stateParams) {
        //        alert("$stateParams --- "+$stateParams)
        //        // get the id
        //        $scope.id = $stateParams.partyID;
        //
        //        // get the location
        //        $scope.location = $stateParams.partyLocation;
        //    }
        //});


        //$scope.mouseenter = function(i){
        //    alert(JSON.stringify(i))
        //    $scope.myObj = {
        //        fontWeight: 'bold'
        //    };
        //};
        //
        //$scope.linkObj = {
        //    "color": "navy",
        //    "font-weight":"bold",
        //    "text-decoration":"underline",
        //    "background-color":"silver",
        //    "cursor":"pointer"
        //};
        //$scope.textObj = {
        //    "color": "navy",
        //    "font-weight":"normal",
        //    "cursor":"pointer"
        //};

        //$scope.changeColor = function(patient) {
        //    $scope.myObj = {color: '#'+patient.color};
        //    //$scope.myObj = {color: 'Orange'};
        //};

            //$scope.loadPatientDetailsList = function(id) {
            //
            //alert(id)
            //
            //idService.addProduct(id);
            //};
                    //$scope.patientList = d.data;
        //});
        //.controller('SelectedParameterController', function($scope, $state, $stateParams) {
        //    //..
        //    var foo = $stateParams.foo; //getting fooVal
        //    var bar = $stateParams.bar; //getting barVal
        //    //..
        //    $scope.state = $state.current
        //    $scope.params = $stateParams;
        //});



        //.controller('PatientsController', function( $scope, DTOptionsBuilder, DTColumnDefBuilder, matchApi ) {
        //
        //this.dtOptions = DTOptionsBuilder.newOptions()
        //    .withDisplayLength(100);
        //this.dtColumnDefs = [];
        //this.dtInstance = {};
        //
        //$scope.patientList = [];
        //
        //$scope.loadPatientList = function() {
        //    matchApi
        //        .getBasicPatientsData()
        //        .then(function(d) {
        //            //$scope.patientList = d.data;
        //            angular.forEach(d.data, function (value, key) {
        //                var treatmentArmId = '-';
        //                var treatmentArmVersion = '-';
        //                var treatmentArm = null;
        //                if (value.currentTreatmentArm &&
        //                    value.currentTreatmentArm.id &&
        //                    value.currentTreatmentArm.version) {
        //                    treatmentArmId = value.currentTreatmentArm.id;
        //                    treatmentArmVersion =  value.currentTreatmentArm.version;
        //                    treatmentArm = value.currentTreatmentArm.id + ' (' + treatmentArmVersion + ')'
        //                }
        //                $scope.patientList.push({
        //                    'patientSequenceNumber': value.patientSequenceNumber,
        //                    'currentStatus': value.currentStatus,
        //                    'currentStepNumber': value.currentStepNumber,
        //                    'diseases': value.diseases,
        //                    'currentTreatmentArmId': treatmentArmId,
        //                    'currentTreatmentArmVersion': treatmentArmVersion,
        //                    'currentTreatmentArm': treatmentArm,
        //                    'registrationDate': value.registrationDate,
        //                    'offTrialDate': value.offTrialDate
        //                });
        //            });
        //    });
        //
        //};

    //});