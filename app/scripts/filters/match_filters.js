(function () {
    "use strict";

    angular.module('filters.matchbox', [])
        .filter('gmt', gmt)
        .filter('status', status)
        .filter('analysisStatus', analysisStatus)
        .filter('assayStatus', assayStatus)
        .filter('concordance', concordance)
        .filter('irsample', irsample)
        .filter('taStatus', taStatus);

    function isNotString(text) {
        return typeof text !== "string";
    }

    function colorFilter(value, map) {
        if (isNotString(value))
            return '';

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
            return colorFilter(text, { 'PASSED': 'blue', 'FAILED': 'red' });
        };
    }

    function taStatus() {
        return function(text) {
            console.log('in taStatus');
            console.log(text);
            return colorFilter(text, {'PENDING': 'orange', 'READY': 'blue', 'OPEN':'green', 'CLOSED': 'red', default: 'purple'});
        };
    }
} ());