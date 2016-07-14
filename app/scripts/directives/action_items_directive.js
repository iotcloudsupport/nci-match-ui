(function () {
    "use strict";

    angular
        .module('matchbox')
        .directive('actionItems', actionItems);

    function actionItems($log) {
        var controller = function () {
            var vm = this;

            vm.getUrgencyClass = function(item) {
                if (item.days_pending < 8)
                    return 'info';
                else if (item.days_pending < 14)
                    return 'warning';
                else
                    return 'danger';
            };
        };

        return {
            bindToController: true,
            templateUrl: 'views/templates/action_items.html',
            restrict: 'EA',
            controller: controller,
            controllerAs: 'vm',
            scope: {
                items: '<',
                patientId: '<'
            }
        };
    }

} ());
