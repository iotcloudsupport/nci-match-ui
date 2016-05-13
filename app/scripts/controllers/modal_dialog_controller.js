(function () {

    angular.module('matchbox')
        .controller('ModalDialogController', ModalDialogController);

    function ModalDialogController($scope, $uibModalInstance, comment) {
        $scope.comment = comment;

        $scope.ok = function () {
            $uibModalInstance.close($scope.comment);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }

} ());
