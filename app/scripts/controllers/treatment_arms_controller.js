(function () {
    angular
        .module('matchbox.treatment-arms',[])
        .controller('TreatmentArmsController', TreatmentArmsController);

    function TreatmentArmsController (
        $scope,
        matchApi) {

        $scope.dtOptions = {
            'info': false,
            'paging': false
        };

        $scope.dtColumnDefs = [];
        $scope.dtInstance = {};

        $scope.treatmentArmList = [];

        $scope.displayTreatmentArmList = function() {
            matchApi
                .loadTreatmentArmList()
                .then(function (d) {
                    $scope.treatmentArmList = d.data;
                    angular.forEach($scope.treatmentArmList, function(ta, index) {
                        ta.current_patients = formatNumber(ta.current_patients);
                        ta.former_patients = formatNumber(ta.former_patients);
                        ta.not_enrolled_patients = formatNumber(ta.not_enrolled_patients);
                        ta.pending_patients = formatNumber(ta.pending_patients);
                        ta.pending_patients = formatNumber(ta.pending_patients);
                    });
                });
        };

        formatNumber = function(value) {
            if (angular.isUndefined(value) || value === null || !angular.isNumber(value)) return '?';
            return Math.floor(value);
        }
    }
} ());