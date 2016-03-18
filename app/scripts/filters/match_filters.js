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
    .filter('patientDetailsLink', function() {
        return function (patientSequenceNumber) {
            //return "<a class='report-link' href='patientDetails.html?patientId=" + patientSequenceNumber + "'>" +
            //    "<i class='fa fa-user'></i> " + patientSequenceNumber + "</a>";
            //<a ui-sref="index.patients"><i class="fa fa-group"></i>  Patients </a>

            return "patient-details?patientId=" + patientSequenceNumber;

        };
    })
    .filter('patientStatusColor', function() {
        return function (status) {
            if(status === 'REJOIN_REQUESTED') {
                return "class='status-purple'";
            }
        };
    });

    //.filter('REGISTRATION', function() {return 'label label-primary'};);