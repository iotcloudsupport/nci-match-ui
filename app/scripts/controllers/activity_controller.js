// (function () {

//     angular.module('activity.matchbox', [])
//         .controller('ActivityController', ActivityController);

//     function ActivityController($scope,
//         matchApiMock,
//         $stateParams,
//         $log) {

//         $scope.activity = [];
//         $scope.loadData = loadData;

//         function loadData() {
//             matchApiMock
//                 .loadActivity($stateParams.patient_id)
//                 .then(setupScope, handleActivityLoadError);
//         }

//         function handleActivityLoadError(e) {
//             $log.error(e);
//             return;
//         }
        
//         function setupScope(data) {
//             $scope.activity = [];
//             angular.copy(data.data, $scope.activity);

//             var now = moment();
//             var previousStep = null;

//             for (var i = 0; i < $scope.activity.length; i++) {
//                 var timelineEvent = $scope.activity[i];
//                 var eventDateMoment = moment(timelineEvent.event_date);
//                 var diff = eventDateMoment.diff(now, "DD/MM/YYYY HH:mm:ss");
//                 timelineEvent.from_now = moment.duration(diff).humanize(true);

//                 if (previousStep && previousStep !== timelineEvent.step) {
//                     timelineEvent.isStepChanging = true;
//                     previousStep = timelineEvent.step;
//                 }

//                 if (!previousStep) {
//                     previousStep = timelineEvent.step;
//                 }
//             }
//         }
//     }

// } ());
