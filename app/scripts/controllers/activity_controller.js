(function () {
    angular.module('matchbox.common', [])
        .controller('ActivityController', ActivityController);

    function ActivityController($scope, matchApi, $stateParams, $log, $interval) {
        var vm = this;

        vm.data = [];
        vm.startLoading = startLoading;
        vm.maxItems = null;
        vm.pollingInterval = 10000;
        vm.lastUpdated = moment().format('LTS');
        vm.intervalPromise = null;

        $scope.$on('$destroy', function () {
            stop();
        });

        function stop() {
            $interval.cancel(vm.intervalPromise);
        }

        function poll() {
            vm.intervalPromise = $interval(function () {
                loadData();
            }, vm.pollingInterval);
        }

        function startLoading(maxItems) {
            vm.maxItems = maxItems;
            loadData();
            poll();
        }

        function loadData() {
            vm.lastUpdated = moment().format('LTS');
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