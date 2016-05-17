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

                if (vm.onCommentEntered && typeof vm.onCommentEntered === 'function' && comment !== null) {
                    try {
                        vm.onCommentEntered(comment);
                    } catch (error) {
                        if (typeof error === 'object' && 'message' in error && error.message.startsWith('Cannot use \'in\' operator to search for')) {
                            console.log('Ignored AngularJS error. ' + error);
                        }
                    }
                }
            };

            vm.confirm = function () {
                if (typeof vm.promptOnlyIf !== 'undefined') {
                    var promptIf = !!vm.promptOnlyIf;

                    if (!!vm.isChecked !== promptIf) {
                        vm.toggle(null);
                        return;
                    }
                }

                var modalInstance = $uibModal.open({
                    templateUrl: 'views/common/modal_dialog_with_comment.html',
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
                        }
                    }
                });

                modalInstance.result.then(function (comment) {
                    vm.toggle(comment);
                });
            };
        };

        var template = '<div class="stacked-container">\
                    <div class="stacked-front">\
                        <button type="input" ng-click="vm.confirm()"></button>\
                    </div>\
                    <div class="stacked-back">\
                        <input type="checkbox" tabindex="-1" ng-model="vm.isChecked">\
                    </div>\
                </div>';

        return {
            restrict: 'A',
            template: template,
            controller: controller,
            controllerAs: 'vm',
            bindToController: true,
            scope: {
                confirmTitle: '@confirmTitle',
                confirmMessage: '@confirmMessage',
                isChecked: '=',
                onCommentEntered: '&',
                promptOnlyIf: '=',
                updateObject: '='
            }
        }
    }

} ());
