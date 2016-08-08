(function () {
    "use strict";

    angular.module('matchbox.filters', [])
        .filter('gmt', gmt)
        .filter('patientStatus', patientStatus)
        .filter('analysisStatus', analysisStatus)
        .filter('assayStatus', assayStatus)
        .filter('concordance', concordance)
        .filter('irsample', irsample)
        .filter('taStatus', taStatus)
        .filter('utc', utc)
        .filter('titlecase', titlecase)
        .filter('dashify', dashify)
        .filter('sampleBreak', sampleBreak);

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

    function utc() {
        return function (date) {
            if (date === null || date === '' || date === '-') {
                return '-';
            }

            if (angular.isDefined(date)) {
                var utcDate = moment.utc(date).utc().format('LLL');
                if (utcDate === 'Invalid date') {
                    return '-';
                } else {
                    return utcDate + ' GMT';
                }
            } else {
                return '-';
            }
        };
    }

    function concordance() {
        return function (text) {
            return colorFilter(text, { 'YES': 'green' });
        };
    }

    function analysisStatus() {
        return function (text) {
            return colorFilter(text, { 'CONFIRMED': 'green', 'PENDING': 'orange', 'REJECTED': 'red' });
        };
    }

    function assayStatus() {
        return function (text) {
            return colorFilter(text, { 'POSITIVE': 'green', 'NEGATIVE': 'red', 'INDETERMINATE': 'blue' });
        };
    }

    function patientStatus() {
        return function (text) {
            return colorFilter(text,
                {
                    'REGISTRATION': 'blue',
                    'REGISTRATION_ERROR': 'blue',
                    'PROGRESSION': 'blue',
                    'OFF_TRIAL_NO_TA_AVAILABLE': 'blue',
                    'TOXICITY': 'blue',
                    'ON_TREATMENT_ARM': 'blue',
                    'OFF_STUDY_NOT_CONSENTED': 'blue',
                    'NOT_ELIGIBLE': 'blue',
                    'TREATMENT_ARM_SUSPENDED': 'blue',
                    'TREATMENT_ARM_CLOSED': 'blue',
                    'REGIMENT_COMPLETED': 'blue',
                    'TISSUE_SPECIMEN_RECEIVED': 'purple',
                    'TISSUE_SPECIMEN_FAILURE': 'purple',
                    'BLOOD_SPECIMEN_RECEIVED': 'purple',
                    'BLOOD_NECLEIC_ACID_SHIPPED': 'purple',
                    'TISSUE_NUCLEIC_ACID_SHIPPED': 'purple',
                    'TISSUE_SLIDE_SPECIMEN_SHIPPED': 'purple',
                    'ORDER_X_IHC': 'red',
                    'RESULT_X_IHC': 'red',
                    'PATHOLOGY_REVIEW': 'red',
                    'TISSUE_VARIANT_REPORT_RECEIVED': 'green',
                    'TISSUE_VARIANT_REPORT_CONFIRMED': 'green',
                    'TISSUE_VARIANT_REPORT_REJECTED': 'green',
                    'TISSUE_NUCLEIC_ACID_FAILURE': 'green',
                    'RUNNING_RULES': 'green',
                    'AWAITING_PATIENT_DATA': 'green',
                    'AWAITING_TREATMENT_ARMS_STATUS': 'green',
                    'RETRIEVING_RULES_ASSIGNMENT': 'green',
                    'COMPASSIONATE_CARE': 'green',
                    'PENDING_INFORMATICS_REVIEW': 'green',
                    'COMPLETED_MDA_DATA_SET': 'green',
                    'PENDING_APPROVAL': 'green',
                    'PENDING_CONFIRMATION': 'green',
                    'BLOOD_VARIANT_REPORT_RECEIVED': 'green',
                    'BLOOD_VARIANT_REPORT_CONFIRMED': 'green',
                    'BLOOD_VARIANT_REPORT_REJECTED': 'green',
                    'BLOOD_NUCLEIC_ACID_FAILURE': 'green',
                    'OFF_TRIAL': 'blue',
                    'OFF_STUDY': 'blue',
                    'OFF_TRIAL_DECEASED': 'blue',
                    'NO_PED_MATCH_AVAILABLE': 'green'
                });
        };
    }

    function irsample() {
        return function (text) {
            return colorFilter(text, { 'PASSED': 'green', 'FAILED': 'red', 'TRUE': '#C3FDB8', 'FAILING': 'red', 'CONNECTED': 'green', 'WAITING': 'orange' });
        };
    }

    function taStatus() {
        return function (text) {
            return colorFilter(text, { 'SUSPENDED': 'blue', 'OPEN': 'green', 'CLOSED': 'red', default: 'purple' });
        };
    }

    function titlecase() {
        return function (input) {
            var smallWords = /^(a|an|and|as|at|but|by|en|for|if|in|nor|of|on|or|per|the|to|vs?\.?|via)$/i;

            if (input === undefined || input === null) {
                return '';
            }

            input = ('' + input).toLowerCase();
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

    function dashify() {
        return function (text) {
            return text ? text : '-';
        };
    }


    function sampleBreak() {
        return function (data, id) {

            var arrayToReturn = [];
            for (var i=0; i<data.length; i++){

                if (data[i].molecular_id.substring(0,id.length) !== id) {
                    arrayToReturn.push(data[i]);
                }
            }
            

            return arrayToReturn;
        };
    };

} ());