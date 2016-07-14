(function () {
    "use strict";

    angular
        .module('matchbox')
        .directive('checkBoxWithConfirm', checkBoxWithConfirm);

    function checkBoxWithConfirm($uibModal) {
        var controller = function () {
            var vm = this;

            vm.toggle = function (comment) {
                vm.isChecked = !vm.isChecked;
                vm.comment = comment;
            };

            vm.confirm = function () {
                if (typeof vm.promptOnlyIf !== 'undefined') {
                    var promptIf = !!vm.promptOnlyIf;
                    var isChecked = !!vm.isChecked;

                    if (isChecked !== promptIf) {
                        vm.toggle(null);
                        return;
                    }
                }

                var modalInstance = $uibModal.open({
                    templateUrl: 'views/templates/modal_dialog_with_comment.html',
                    controller: 'ModalDialogWithCommentController',
                    resolve: {
                        comment: function () {
                            return vm.comment;
                        },
                        title: function () {
                            return vm.confirmTitle;
                        },
                        message: function () {
                            return vm.confirmMessage;
                        },
                        enabled: function () {
                            return vm.enabled;
                        }
                    }
                });

                modalInstance.result.then(function (comment) {
                    vm.toggle(comment);
                });
            };
        };

        /*jshint multistr: true */
        var template = '<div class="stacked-container">\
                    <div class="stacked-front">\
                        <button type="input" ng-click="vm.confirm()" ng-disabled="!vm.enabled"></button>\
                    </div>\
                    <div class="stacked-back">\
                        <input type="checkbox" tabindex="-1" ng-checked="vm.isChecked" ng-disabled="!vm.enabled">\
                    </div>\
                </div>';

        return {
            bindToController: {
                confirmTitle: '@confirmTitle',
                confirmMessage: '@confirmMessage',
                isChecked: '=',
                reason: '=',
                promptOnlyIf: '=',
                comment: '=',
                enabled: '='
            },
            restrict: 'A',
            template: template,
            controller: controller,
            controllerAs: 'vm',
            scope: {}
        }
    }

} ());
