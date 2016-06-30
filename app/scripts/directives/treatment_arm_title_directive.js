(function () {
    "use strict";

    angular
        .module('matchbox')
        .directive('treatmentArmTitle', treatmentArmTitle);

    function treatmentArmTitle($uibModal) {
        var controller = function () {
            var vm = this;
        };

        var template = '<span class="ta-title">\
                    <a ng-if="vm.ta" href="#/treatment-arm/{{vm.ta.name}}">\
                        <span class="ta-name">{{vm.ta.name}}</span> (<span class="ta-stratum">{{vm.ta.stratum}}</span>, <span class="ta-version">{{vm.ta.version}})</span>\
                    </a>\
                    <span ng-if="!vm.ta">-</span>\
                </span>';

        return {
            bindToController: true,
            restrict: 'EA',
            template: template,
            controller: controller,
            controllerAs: 'vm',
            scope: {
                ta: '='
            }
        }
    }

} ());
