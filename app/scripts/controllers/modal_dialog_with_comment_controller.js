(function () {

    angular.module('matchbox')
        .controller('ModalDialogWithCommentController', ModalDialogWithCommentController);

    function ModalDialogWithCommentController($scope, $uibModalInstance, comment, title, message, enabled, $log) {
        $scope.comment = comment;
        $scope.title = title;
        $scope.message = message;
        $scope.enabled = enabled;

        $log.debug('$scope.enabled = ' + $scope.enabled);

        $scope.ok = function () {
            $uibModalInstance.close($scope.comment);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }

} ());
