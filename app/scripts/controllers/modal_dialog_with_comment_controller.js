(function () {

    angular.module('matchbox')
        .controller('ModalDialogWithCommentController', ModalDialogWithCommentController);

    function ModalDialogWithCommentController($scope, $uibModalInstance, comment, title, message) {
        $scope.comment = comment;
        $scope.title = title;
        $scope.message = message;

        $scope.ok = function () {
            $uibModalInstance.close($scope.comment);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }

} ());
