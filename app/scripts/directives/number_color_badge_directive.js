(function () {
    "use strict";

    angular
        .module('matchbox')
        .directive('numberColorBadge', numberColorBadge);

    function numberColorBadge($log) {
        var controller = function () {
            var vm = this;

            vm.getLabelClass = function() {
                if (!vm.value && vm.value !== 0) {
                    return '';
                }

                if (vm.value < (vm.yellowThreshold || 0)) {
                    return 'label-primary';
                } else if (vm.value < (vm.redThreshold || 0)) {
                    return 'label-warning';
                } else {
                    return 'label-danger';
                }
            }
        };

        /*jshint multistr: true */
        var template = '<span class="label {{vm.getLabelClass()}}">{{vm.value}}</span>';

        return {
            bindToController: true,
            restrict: 'EA',
            template: template,
            controller: controller,
            controllerAs: 'vm',
            scope: {
                value: '<',
                yellowThreshold: '<',
                redThreshold: '<'
            }
        }
    }

} ());
