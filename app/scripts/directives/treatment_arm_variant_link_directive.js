(function () {
    "use strict";

    angular
        .module('matchbox')
        .directive('treatmentArmVariantLink', treatmentArmVariantLink);

    /**
     * Expects an object with the follwing properties:
     *   'name', 'stratum', ;version'
     */
    function treatmentArmVariantLink($log) {
        var controller = function () {
            var vm = this;

            vm.getInclusion = function(ta) {
                switch (ta.amoi_status) {
                    case 'prior_inclusion':
                    case 'current_inclusion':
                        return 'I';
                
                    case 'prior_exclusion':
                    case 'current_exclusion':
                        return 'E';
                
                    default:
                        $log.error('Invalid aMOI status ' + vm.amoi_status || '[unspecified]');
                        return '';
                }
            }

            vm.getDisplayText = function(ta) {
                switch (ta.amoi_status) {
                    case 'current_exclusion':
                    case 'current_inclusion':
                        return 'CURRENT';
                
                    case 'prior_inclusion':
                    case 'prior_exclusion':
                        return 'PRIOR';
                
                    default:
                        $log.error('Invalid aMOI status ' + vm.amoi_status || '[unspecified]');
                        return '';
                }
            }

            vm.getTextColor = function(ta) {
                switch (ta.amoi_status) {
                    case 'current_exclusion':
                    case 'current_inclusion':
                        return "green";
                
                    case 'prior_inclusion':
                    case 'prior_exclusion':
                        return "blue";
                
                    default:
                        $log.error('Invalid aMOI status ' + vm.amoi_status || '[unspecified]');
                        return '';
                }
            }

            vm.getTreatmentArmTitle = function(ta) {
                return ta.name + ' (' + ta.stratum + ', ' + ta.version + ')';
            }
        };

        /*jshint multistr: true */
        var template = 
        '<div ng-if="vm.isAmoi" class="ta-amoi-status">\
            <div ng-repeat="ta in vm.treatmentArms">\
                <treatment-arm-title name="ta.name" stratum="ta.stratum" version="ta.version" display-text="vm.getDisplayText(ta)" text-color="vm.getTextColor(ta)" data-placement="top" title="{{vm.getTreatmentArmTitle(ta)}}" onmouseenter="$(this).tooltip(\'show\')"></treatment-arm-title>\
                <sup>{{vm.getInclusion(ta)}}</sup>\
            </div>\
        </div>\
        <div ng-if="!vm.isAmoi" class="ta-amoi-status"> - </div>';

        return {
            bindToController: true,
            restrict: 'EA',
            template: template,
            controller: controller,
            controllerAs: 'vm',
            scope: {
                isAmoi: '<',
                treatmentArms: '<'
            }
        }
    }

} ());
