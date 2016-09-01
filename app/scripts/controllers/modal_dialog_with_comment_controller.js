(function () {

    angular.module('matchbox')
        .controller('ModalDialogWithCommentController', ModalDialogWithCommentController);

    function ModalDialogWithCommentController($scope, $uibModalInstance, comment, title, message, enabled) {
        $scope.comment = comment;
        $scope.title = title;
        $scope.message = message;
        $scope.enabled = enabled;
        $scope.isValid = false;

        $scope.ok = function () {
            if (!isValid)
                return;
            $uibModalInstance.close($scope.comment.trim());
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        $scope.$watch('comment', function(newValue, oldValue, scope) {
            $scope.isValid = validate();
        });

        function validate() {
            return $scope.comment && ($scope.comment + '').trim().length > 0
        }
    }

} ());
