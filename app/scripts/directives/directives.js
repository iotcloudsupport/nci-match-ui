(function () {
    "use strict";

    angular
        .module('matchbox')
        .directive('pageTitle', pageTitle)
        .directive('sideNavigation', sideNavigation)
        .directive('minimalizaSidebar', minimalizaSidebar)
        .directive('collapseToggleLeft', collapseToggleLeft)
        .directive('collapseToggleLeftClosed', collapseToggleLeftClosed)
        .directive('datatableSetup', datatableSetup);

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
        };
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
        };
    }

    /**
     * collapseToggleLeft - Directive for collapse toggle elements in right corner of ibox
     */
    function collapseToggleLeft($timeout) {
        return {
            restrict: 'A',
            scope: true,
            template: '<div class="ibox-tools ibox-tools-left-side dropdown" dropdown><a ng-click="showhide()"> <i class="fa fa-chevron-up"></i></a></div>',
            controller: function ($scope, $element) {
                // Function for collapse ibox
                $scope.showhide = function () {
                    var ibox = $element.closest('div.ibox');
                    var icon = $element.find('i:first');
                    var content = ibox.find('div.ibox-content');
                    content.slideToggle(200);
                    // Toggle icon from up to down
                    icon.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
                    $timeout(function () {
                        ibox.resize();
                        ibox.find('[id^=map-]').resize();
                    }, 50);
                };
            }
        };
    }

    function collapseToggleLeftClosed($timeout) {
        return {
            restrict: 'A',
            scope: true,
            template: '<div class="ibox-tools ibox-tools-left-side dropdown" dropdown ng-init="showhide()"><a ng-click="showhide()"> <i class="fa fa-chevron-up"></i></a></div>',
            controller: function ($scope, $element) {
                // Function for collapse ibox
                $scope.showhide = function () {
                    var ibox = $element.closest('div.ibox');
                    var icon = $element.find('i:first');
                    var content = ibox.find('div.ibox-content');
                    content.slideToggle(200);
                    // Toggle icon from up to down
                    icon.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
                    $timeout(function () {
                        ibox.resize();
                        ibox.find('[id^=map-]').resize();
                    }, 50);
                };
            }
        };
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
                };
            }
        };
    }


        function datatableSetup($timeout) {
            return {
                restrict: 'A',
                link: function(scope, element, attrs) {


                    console.log("Dadaaaaa --> " + JSON.stringify(element))

                    $timeout(function () {
                        element.dataTable();
                    });

                    // $timeout(function () {
                    //     console.log("Dadaaaaa")
                    //     // do something
                    // });
                }
            };
        };

} ());
