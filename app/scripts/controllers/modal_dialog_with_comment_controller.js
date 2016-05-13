(function () {

    angular.module('matchbox')
        .controller('ModalDialogWithCommentController', ModalDialogWithCommentController);

    function ModalDialogWithCommentController($scope, $uibModalInstance, comment) {
        $scope.comment = comment;

        $scope.ok = function () {
            $uibModalInstance.close($scope.comment);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }

} ());
