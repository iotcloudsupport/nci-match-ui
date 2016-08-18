(function () {
    "use strict";

    angular
        .module('matchbox')
        .directive('trackingLink', trackingLink);

    function trackingLink($log) {
        var controller = function () {
            var vm = this;

            vm.carriers = {
                fedex: { url: 'http://www.fedex.com/Tracking?action=track&tracknumbers={trackingNumber}' },
                ups: { url: 'http://wwwapps.ups.com/WebTracking/track?track=yes&trackNums;={trackingNumber}'},
                usps: { url: 'https://tools.usps.com/go/TrackConfirmAction_input?qtc_tLabels1={trackingNumber}' },
                lasership: { url: 'http://www.lasership.com/track/LSXXXXXXXX' },
                dhl: { url: 'http://track.dhl-usa.com/TrackByNbr.asp?ShipmentNumber=XXXXXXXXXXXXXXXXX' }
            };

            vm.getTrackingUrl = function() {
                if (vm.carrier in vm.carriers) {
                    return vm.carriers[vm.carrier].url.replace(/{trackingNumber}/g, vm.trackingNumber);
                } else {
                    $log.error('Invalid carrier ' + vm.carrier);
                    return '#';
                }
            }
        };

        /*jshint multistr: true */
        var template = '<span ng-if="vm.trackingNumber">\
            <a href="{{vm.getTrackingUrl()}}" target="_blank">{{vm.trackingNumber}}</a>\
            </span>\
            <span ng-if="!vm.trackingNumber"> - </span>';

        return {
            bindToController: true,
            restrict: 'EA',
            template: template,
            controller: controller,
            controllerAs: 'vm',
            scope: {
                trackingNumber: '<',
                carrier: '<'
            }
        }
    }

} ());
