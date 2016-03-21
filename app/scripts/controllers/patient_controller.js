angular.module('patient.matchbox',[])
    .controller('PatientController', function( $scope, DTOptionsBuilder, DTColumnDefBuilder, matchApi, idService) {

        this.dtOptions = DTOptionsBuilder.newOptions()
            .withDisplayLength(100);
        this.dtColumnDefs = [
            DTColumnDefBuilder.newColumnDef(0)
                .withOption('type', 'html')
        ];
        this.dtInstance = {};

        $scope.patientDetailsList = [];
        $scope.patientId = [];

        $scope.loadPatientDetailsList = function(id) {

            alert("Load ID-->" + id)

            idService.addProduct(id);
        };

        $scope.loadPatientTableList = function() {
            var id = idService.getProducts();
            alert("ID--> " + id)
            //matchApi
            //    .getPatientDetailsData(id)
            //    .then(function(d) {
            //        $scope.patientList = d.data;
                //});
        };

    });


    //.controller('MyController', ['$scope', function($scope) {
    //    $scope.username = 'World';
    //
    //    $scope.sayHello = function() {
    //        $scope.greeting = 'Hello ' + $scope.username + '!';
    //    };
    //}]);

//angular.module('scopeExample', [])
//    .controller('MyController', ['$scope', function($scope) {
//        $scope.username = 'World';
//
//        $scope.sayHello = function() {
//            $scope.greeting = 'Hello ' + $scope.username + '!';
//        };
//    }]);