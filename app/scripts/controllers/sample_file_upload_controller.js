(function () {

    angular.module('matchbox')
        .controller('SampleFileUploadController', SampleFileUploadController);

    function SampleFileUploadController($scope, $uibModalInstance) {
        $scope.anasisysId = '';

        $scope.ok = function () {
            $uibModalInstance.close($scope.anasisysId);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }

} ());
