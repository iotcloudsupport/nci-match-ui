angular.module('filters.matchbox', [])
    .filter('gmt', function() {
        return function(date) {
            if (angular.isDefined(date) && angular.isNumber(date)) {
                return moment.unix(date / 1000).utc().format('LLL') + ' GMT';
            } else {
                return '-';
            }
        };
    });