angular.module('filters.matchbox', [])
    .filter('gmt', function() {
        return function(date) {
            if (angular.isDefined(date) && angular.isNumber(date)) {
                return moment.unix(date / 1000).utc().format('LLL') + ' GMT';
            } else {
                return '-';
            }
        };
    })
    .filter('status', function() {
        return function (text) {
            if(text === 'REGISTRATION') {
                return 'blue';
            }
            else if(text === 'PENDING_APPROVAL' ||
                text === 'REJOIN_REQUESTED') {
                return 'purple';
            }
            else if(text === 'OFF_TRIAL_NO_TA_AVAILABLE' ||
                text === 'OFF_TRIAL_NOT_CONSENTED' ||
                text === 'OFF_TRIAL' ||
                text === 'OFF_TRIAL_DECEASED') {
                return 'red';
            }
            else if(text === 'ON_TREATMENT_ARM') {
                return 'green';
            }
            else{
                return 'gray';
            }



        };
    });
