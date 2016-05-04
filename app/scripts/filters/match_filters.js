// (function () {
    "use strict";

    // angular.module('filters.matchbox', [])
    //     .filter('gmt', gmt)
    //     .filter('status', status)
    //     .filter('analysisStatus', analysisStatus)
    //     .filter('assayStatus', assayStatus)
    //     .filter('concordance', concordance);

    angular.module('filters.matchbox', [])
    .filter('gmt', function() {
        return function (date) {
            if (angular.isDefined(date) && angular.isNumber(date)) {
                return moment.unix(date / 1000).utc().format('LLL') + ' GMT';
            } else {
                return '-';
            }
        }
    })

    .filter('concordance', function() {
        return function(text) {
            if (!text || typeof text !== "string")
                return '';
            
            text = text.toUpperCase();
            
            if (text === 'YES') {
                return 'green';
            } else {
                return '';
            }
        }
    })

    .filter('analysisStatus', function() {
        return function (text) {
            if (!text || typeof text !== "string")
                return '';
            
            text = text.toUpperCase();
            
            if (text === 'CONFIRMED') {
                return 'green';
            }
            if (text === 'PENDING') {
                return 'orange';
            }
            else if (text === 'REJECTED') {
                return 'red';
            }
            else {
                return '';
            }
        }
    })

    .filter('assayStatus', function() {
        return function (text) {
            if (!text || typeof text !== "string")
                return '';
            
            text = text.toUpperCase();
            
            if (text === 'POSITIVE') {
                return 'green';
            }
            else if (text === 'NEGATIVE') {
                return 'red';
            }
            else {
                return '';
            }
        }
    })
        
    .filter('status˛', function() {
        return function (text) {
            if (!text || typeof text !== "string")
                return '';
            
            text = text.toUpperCase();
                        
            if (text === 'REGISTRATION') {
                return 'blue';
            }
            else if (text === 'PENDING_APPROVAL' ||
                text === 'REJOIN_REQUESTED') {
                return 'purple';
            }
            else if (text === 'OFF_TRIAL_NO_TA_AVAILABLE' ||
                text === 'OFF_TRIAL_NOT_CONSENTED' ||
                text === 'OFF_TRIAL' ||
                text === 'OFF_TRIAL_DECEASED') {
                return 'red';
            }
            else if (text === 'ON_TREATMENT_ARM') {
                return 'green';
            }
            else {
                return '';
            }
        };
    })
// })();