(function () {
    "use strict";

    angular
        .module('matchbox')
        .directive('cosmicLink', cosmicLink);

    function cosmicLink($log) {
        var controller = function () {
            var vm = this;

            vm.urls = {
                cosmicGene: { url: 'http://cancer.sanger.ac.uk/cosmic/gene/overview?ln={id}' },
                cosmicId: { url: 'http://cancer.sanger.ac.uk/cosmic/gene/overview?ln={id}'},
                cosmicFusionId: { url: 'http://cancer.sanger.ac.uk/cosmic/gene/overview?ln={id}' }
            };

            vm.getLinkUrl = function() {
                if (vm.linkType in vm.urls) {
                    return vm.urls[vm.linkType].url.replace(/{id}/g, vm.getLinkId());
                } else {
                    $log.error('Invalid link type ' + vm.linkType);
                    return '#';
                }
            }

            vm.getLinkId = function() {
                if (!vm.linkId) {
                    return '';
                }

                switch (vm.linkType) {
                    case 'cosmicGene': 
                        return vm.linkId;

                    case 'cosmicId': 
                        return vm.linkId.substring(4, vm.linkId.length);

                    case 'cosmicFusionId': 
                        var numericId = vm.linkId.substring(vm.linkId.indexOf("_") - 3, (vm.linkId.length - 2));
                        if (numericId!==null) {
                            return numericId;
                        } else {
                            $log.error('Invalid value for type Cusmin Fusion ID ' + vm.linkId);
                            return '';
                        }

                    default:
                        $log.error('Invalid link type ' + vm.linkType);
                        return '';
                }
            }
        };

        /*jshint multistr: true */
        var template = '<span><a href="{{vm.getLinkUrl()}}" target="_blank">{{vm.text | dashify}}</a></span>';
        
        return {
            bindToController: true,
            restrict: 'EA',
            template: template,
            controller: controller,
            controllerAs: 'vm',
            scope: {
                linkId: '<',
                linkType: '<',
                text: '<'
            }
        }
    }

} ());
