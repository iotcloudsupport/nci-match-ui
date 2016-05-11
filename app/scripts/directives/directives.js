(function () {
    "use strict";

    /**
     * pageTitle - Directive for set Page title - mata title
     */
    function pageTitle($rootScope, $timeout) {
        return {
            link: function (scope, element) {
                var listener = function (event, toState, toParams, fromState, fromParams) {
                    // Default title - load on Dashboard 1
                    var title = 'MATCHBox';
                    // Create your own title pattern
                    if (toState.data && toState.data.pageTitle) title = 'MATCHBox | ' + toState.data.pageTitle;
                    $timeout(function () {
                        element.text(title);
                    });
                };
                $rootScope.$on('$stateChangeStart', listener);
            }
        }
    }

    /**
     * sideNavigation - Directive for run metsiMenu on sidebar navigation
     */
    function sideNavigation($timeout) {
        return {
            restrict: 'A',
            link: function (scope, element) {
                // Call the metsiMenu plugin and plug it to sidebar navigation
                $timeout(function () {
                    element.metisMenu();
                });
            }
        }
    }

    /**
     * iboxTools - Directive for iBox tools elements in right corner of ibox
     */
    function iboxTools($timeout) {
        return {
            restrict: 'A',
            scope: true,
            templateUrl: 'views/common/ibox_tools.html',
            controller: function ($scope, $element) {
                // Function for collapse ibox
                $scope.showhide = function () {
                    var ibox = $element.closest('div.ibox');
                    var icon = $element.find('i:first');
                    var content = ibox.find('div.ibox-content');
                    content.slideToggle(200);
                    // Toggle icon from up to down
                    icon.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
                    ibox.toggleClass('').toggleClass('border-bottom');
                    $timeout(function () {
                        ibox.resize();
                        ibox.find('[id^=map-]').resize();
                    }, 50);
                },
                    // Function for close ibox
                    $scope.closebox = function () {
                        var ibox = $element.closest('div.ibox');
                        ibox.remove();
                    }
            }
        }
    }

    /**
     * minimalizaSidebar - Directive for minimalize sidebar
     */
    function minimalizaSidebar($timeout) {
        return {
            restrict: 'A',
            template: '<a class="navbar-minimalize minimalize-styl-2 btn btn-primary " href="" ng-click="minimalize()"><i class="fa fa-bars"></i></a>',
            controller: function ($scope, $element) {
                $scope.minimalize = function () {
                    $("body").toggleClass("mini-navbar");
                    if (!$('body').hasClass('mini-navbar') || $('body').hasClass('body-small')) {
                        // Hide menu in order to smoothly turn on when maximize menu
                        $('#side-menu').hide();
                        // For smoothly turn on menu
                        setTimeout(
                            function () {
                                $('#side-menu').fadeIn(500);
                            }, 100);
                    } else if ($('body').hasClass('fixed-sidebar')) {
                        $('#side-menu').hide();
                        setTimeout(
                            function () {
                                $('#side-menu').fadeIn(500);
                            }, 300);
                    } else {
                        // Remove all inline style from jquery fadeIn function to reset menu state
                        $('#side-menu').removeAttr('style');
                    }
                }
            }
        }
    }

    /**
     * collapseToggle - Directive for collapse toggle elements in right corner of ibox
     */
    function collapseToggle($timeout) {
        return {
            restrict: 'A',
            scope: true,
            template: '<div class="ibox-tools ibox-tools-with-h3-title dropdown" dropdown><a ng-click="showhide()"> <i class="fa fa-chevron-up"></i></a></div>',
            controller: function ($scope, $element) {
                // Function for collapse ibox
                $scope.showhide = function () {
                    var ibox = $element.closest('div.ibox');
                    var icon = $element.find('i:first');
                    var content = ibox.find('div.ibox-content');
                    content.slideToggle(200);
                    // Toggle icon from up to down
                    icon.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
                    ibox.toggleClass('').toggleClass('border-bottom');
                    $timeout(function () {
                        ibox.resize();
                        ibox.find('[id^=map-]').resize();
                    }, 50);
                }
            }
        }
    }

    function checkBoxWithConfirm(prompt) {
        var controller = function (prompt) {
            var vm = this;

            vm.toggle = function (comment) {
                vm.isChecked = !vm.isChecked;
                vm.comment = comment;

                // console.log('Directive controller isChecked = ' + vm.isChecked);
                // console.log('vm.onCommentEntered = ', vm.onCommentEntered);

                if (vm.onCommentEntered && typeof vm.onCommentEntered === 'function' && comment !== null) {
                    // console.log('Directive.onCommentEntered called with ' + comment);
                    try {
                        vm.onCommentEntered(comment);                    
                    } catch(error)
                    {
                        if (typeof error === 'object' && 'message' in error && error.message.startsWith('Cannot use \'in\' operator to search for')) {
                            console.log('Ignored AngularJS error. ' + error);
                        }
                    }
                }
            };

            vm.confirm = function () {
                if (typeof vm.promptOnlyIf !== 'undefined') {
                    // console.log('vm.promptOnlyIf = ' + vm.promptOnlyIf);
                    // console.log('vm.isChecked = ' + vm.isChecked);
                    
                    var promptIf = !!vm.promptOnlyIf;

                    if (!!vm.isChecked !== promptIf) {
                        vm.toggle(null);
                        return;
                    }
                }
                
                prompt({
                    title: vm.confirmTitle,
                    message: vm.confirmMessage,
                    input: true
                }).then(vm.toggle);
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
                promptOnlyIf: '='
            }
        }
    }

    /**
     *
     * Pass all functions into module
     */
    angular
        .module('matchbox')
        .directive('pageTitle', pageTitle)
        .directive('sideNavigation', sideNavigation)
        .directive('iboxTools', iboxTools)
        .directive('minimalizaSidebar', minimalizaSidebar)
        .directive('collapseToggle', collapseToggle)
        .directive('checkBoxWithConfirm', checkBoxWithConfirm)

})();
