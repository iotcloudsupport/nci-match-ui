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
                return vm || vm.name || vm.version || vm.stratum;
            };
        };

        /*jshint multistr: true */
        var template = '<span class="ta-title">\
                    <span ng-if="vm.noUrl">\
                        <span class="ta-name">{{vm.ta.name || vm.name}}</span> (<span class="ta-stratum">{{vm.ta.stratum||vm.stratum}}</span><span ng-if="{{vm.ta.version||vm.version}}" class="ta-version">, {{vm.ta.version||vm.version}}</span>)\
                    </span>\
                    <a ng-if="!vm.noUrl" ng-if="vm.hasData()" ui-sref="treatment-arm({ name: vm.ta.name||vm.name, stratum: vm.ta.stratum||vm.stratum, version: vm.ta.version||vm.version } )">\
                        <span class="ta-name">{{vm.ta.name || vm.name}}</span> (<span class="ta-stratum">{{vm.ta.stratum||vm.stratum}}</span><span ng-if="{{vm.ta.version||vm.version}}" class="ta-version">, {{vm.ta.version||vm.version}}</span>)\
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
                ta: '=',
                name: '=',
                stratum: '=',
                version: '=',
                noUrl: '='
            }
        }
    }

} ());
