(function () {

    angular.module('patient.matchbox', [])
        .controller('ModalDialogController', ModalDialogController);

    function ModalDialogController($scope, $uibModalInstance, items) {
        $scope.items = items;
        $scope.selected = {
            item: $scope.items[0]
        };

        $scope.ok = function () {
            $uibModalInstance.close($scope.selected.item);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }

} ());
