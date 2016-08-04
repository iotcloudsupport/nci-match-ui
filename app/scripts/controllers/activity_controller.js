(function () {
    angular.module('matchbox.common', [])
        .controller('ActivityController', ActivityController);

    function ActivityController(matchApi, $stateParams, $log) {
        var vm = this; 

        vm.data = [];
        vm.loadData = loadData;
        vm.maxItems = null;

        function loadData(maxItems) {
            vm.maxItems = maxItems;
            matchApi
                .loadActivity($stateParams.patient_id)
                .then(setupScope, handleActivityLoadError);
        }

        function handleActivityLoadError(e) {
            $log.error(e);
            return;
        }
        
        function setupScope(data) {
            vm.data = [];

            var now = moment();
            var previousStep = null;

            var limit = vm.maxItems ? Math.min(data.data.length, vm.maxItems) : data.data.length;

            for (var i = 0; i < limit; i++) {
                var timelineEvent = angular.copy(data.data[i]);
                vm.data.push(timelineEvent);
                var eventDateMoment = moment(timelineEvent.event_date);
                var diff = eventDateMoment.diff(now, "DD/MM/YYYY HH:mm:ss");
                timelineEvent.from_now = moment.duration(diff).humanize(true);

                if (previousStep && previousStep !== (timelineEvent.event_data.step || '_')) {
                    timelineEvent.isStepChanging = true;
                    previousStep = timelineEvent.event_data.step;
                }

                if (!previousStep) {
                    previousStep = timelineEvent.event_data.step || '_';
                }
            }
        }

    }

} ());