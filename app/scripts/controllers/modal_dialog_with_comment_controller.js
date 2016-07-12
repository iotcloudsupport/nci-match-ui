(function () {

    angular.module('matchbox')
        .controller('ModalDialogWithCommentController', ModalDialogWithCommentController);

    function ModalDialogWithCommentController($scope, $uibModalInstance, comment, title, message, enabled) {
        $scope.comment = comment;
        $scope.title = title;
        $scope.message = message;
        $scope.enabled = enabled;

        $scope.ok = function () {
            $uibModalInstance.close($scope.comment);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }

} ());
