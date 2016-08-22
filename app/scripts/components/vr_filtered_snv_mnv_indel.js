(function () {
    "use strict";

    function VrFilteredSnvMnvIndel($scope, $element, $attrs, $log, $uibModal) {
        var ctrl = this;

        ctrl.gridOptions = {};

        ctrl.$onInit = function() {
            ctrl.gridOptions = {
                data: ctrl.items
            };
        };

        ctrl.editComment = function(variant, isEnabled) {
            $log.debug('Variant = ' + variant);

            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'views/templates/modal_dialog_with_comment.html',
                controller: 'ModalDialogWithCommentController',
                resolve: {
                    comment: function () {
                        return variant.comment;
                    },
                    title: function () {
                        return 'Confirmation Change Comments';
                    },
                    message: function () {
                        return isEnabled ? 'Please enter a reason:' : '';
                    },
                    enabled: function () {
                        return isEnabled;
                    }
                }
            });

            modalInstance.result.then(function (comment) {
                variant.comment = comment;
            });
        };

        ctrl.onItemConfirmed = function(item) {
            if (ctrl.onVariantConfirmed) {
                ctrl.onVariantConfirmed({variant:item});
            }
        }
    }

    angular.module('matchbox').component('vrFilteredSnvMnvIndel', {
        templateUrl: 'views/templates/variant_report/vr_filtered_snv_mnv_indel.html',
        controller: VrFilteredSnvMnvIndel,
        bindings: {
            gridId: '<',
            items: '<',
            isEditable: '<',
            onVariantConfirmed: '&'
        }
    });

}());
