(function () {
    "use strict";

    angular.module('filters.matchbox', [])
        .filter('gmt', gmt)
        .filter('status', status)
        .filter('analysisStatus', analysisStatus)
        .filter('assayStatus', assayStatus)
        .filter('concordance', concordance)
        .filter('irsample', irsample)
        .filter('taStatus', taStatus)
        .filter('titlecase', titlecase);

    function isNotString(text) {
        return typeof text !== "string";
    }

    function colorFilter(value, map) {
        if (isNotString(value)) {
            return '';
        }

        value = value.toUpperCase();

        if (value in map) {
            return map[value];
        } else {
            return '';
        }
    }

    function gmt() {
        return function (date) {
            if (angular.isDefined(date) && angular.isNumber(date)) {
                return moment.unix(date / 1000).utc().format('LLL') + ' GMT';
            } else {
                return '-';
            }
        };
    }

    function concordance() {
        return function (text) {
            return colorFilter(text, { 'YES': 'green' });
        }
    }

    function analysisStatus() {
        return function (text) {
            return colorFilter(text, { 'CONFIRMED': 'green', 'PENDING': 'orange', 'REJECTED': 'red' });
        };
    }

    function assayStatus() {
        return function (text) {
            return colorFilter(text, { 'POSITIVE': 'green', 'NEGATIVE': 'red' });
        };
    }

    function status() {
        return function (text) {
            return colorFilter(text,
                {
                    'REGISTRATION': 'blue',
                    'PENDING_APPROVAL': 'purple',
                    'REJOIN_REQUESTED': 'purple',
                    'OFF_TRIAL_NO_TA_AVAILABLE': 'red',
                    'OFF_TRIAL_NOT_CONSENTED': 'red',
                    'OFF_TRIAL': 'red',
                    'OFF_TRIAL_DECEASED': 'red',
                    'ON_TREATMENT_ARM': 'green'
                });
        };
    }

    function irsample() {
        return function (text) {
            return colorFilter(text, { 'PASSED': 'green', 'FAILED': 'red', 'TRUE': '#C3FDB8' });
        };
    }

    function taStatus() {
        return function (text) {
            return colorFilter(text, { 'PENDING': 'orange', 'READY': 'blue', 'OPEN': 'green', 'CLOSED': 'red', default: 'purple' });
        };
    }


    function titlecase() {
        return function (input) {
            var smallWords = /^(a|an|and|as|at|but|by|en|for|if|in|nor|of|on|or|per|the|to|vs?\.?|via)$/i;

            if (input === undefined) {
                return '';
            }

            input = input.toLowerCase();
            return input.replace(/[A-Za-z0-9\u00C0-\u00FF]+[^\s-]*/g, function (match, index, title) {
                if (index > 0 && index + match.length !== title.length &&
                    match.search(smallWords) > -1 && title.charAt(index - 2) !== ":" &&
                    (title.charAt(index + match.length) !== '-' || title.charAt(index - 1) === '-') &&
                    title.charAt(index - 1).search(/[^\s-]/) < 0) {
                    return match.toLowerCase();
                }

                if (match.substr(1).search(/[A-Z]|\../) > -1) {
                    return match;
                }

                return match.charAt(0).toUpperCase() + match.substr(1);
            });
        }
    }

} ());