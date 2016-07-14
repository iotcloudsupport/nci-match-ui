(function () {
    "use strict";

    angular
        .module('matchbox')
        .directive('treatmentArmTitle', treatmentArmTitle);

    /**
     * Expects an object with the follwing properties:
     *   'name', 'stratum', ;version'
     */
    function treatmentArmTitle($uibModal, $log) {
        var controller = function () {
            var vm = this;
            vm.hasData = function() {
                return vm.name || vm.version || vm.stratum;
            };
        };

        /*jshint multistr: true */
        var template = '<span class="ta-title">\
                    \
                    <span ng-if="vm.hasData() && vm.noUrl">\
                        <span class="ta-name">{{vm.name}}</span> (<span class="ta-stratum">{{vm.stratum}}</span><span ng-if="vm.version" class="ta-version">, {{vm.version}}</span>)\
                    </span>\
                    \
                    <a ng-if="vm.hasData() && !vm.noUrl" ui-sref="treatment-arm({ name: vm.name, stratum: vm.stratum, version: vm.version } )">\
                        <span class="ta-name">{{vm.name}}</span> (<span class="ta-stratum">{{vm.stratum}}</span><span ng-if="vm.version" class="ta-version">, {{vm.version}}</span>)\
                    </a>\
                    <span ng-if="!vm.hasData()">-</span>\
                </span>';

        return {
            bindToController: true,
            restrict: 'EA',
            template: template,
            controller: controller,
            controllerAs: 'vm',
            scope: {
                name: '=',
                stratum: '=',
                version: '=',
                noUrl: '='
            }
        }
    }

} ());
