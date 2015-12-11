/**
 * Created by hendrikssonm on 11/12/15.
 */
/**
 * molecularSequenceCtrl - controller
 */

function makeMsnTable(array) {
    var json2d = [];

    if (array !== null) {
        $.each(array, function (key, value) {
            var patientSequenceNumber = value.patientSequenceNumber;
            //Biopsies
            var biopsies = value.biopsies;
            //Get all Biopsies
            $.each(biopsies, function (nr, data) {

                var biopsySequenceNumber = (data.biopsySequenceNumber !== null
                && data.biopsySequenceNumber.length > 0) ? data.biopsySequenceNumber : "-";

                var ptenOrderDate = (data.ptenOrderDate !== null
                && data.ptenOrderDate.length > 0) ? data.ptenOrderDate : "-";

                var ptenResultDate = (data.ptenResultDate !== null
                && data.ptenResultDate.length > 0) ? data.ptenResultDate : "-";

                var specimenReceivedDate = (data.specimenReceivedDate !== null
                && data.specimenReceivedDate.length > 0) ? data.specimenReceivedDate : "-";

                var specimenFailureDate = (data.specimenFailureDate !== null
                && data.specimenFailureDate.length > 0) ? data.specimenFailureDate : "-";

                var pathologyReviewdate = (data.pathologyReviewdate !== null
                && data.pathologyReviewdate.length > 0) ? data.pathologyReviewdate : "-";

                var samples = data.samples;

                var patientDetailHref = "<a class='report-link' href='patientDetails.html?patientId=" + patientSequenceNumber + "'>" +
                    "<i class='fa fa-user'></i> " + patientSequenceNumber + "</a>";

                var biopsyDetailHref = "<a class='report-link' href='mdAndersonMessages.html?patientSequenceNumber=" + patientSequenceNumber +
                    "&biopsySequenceNumber=" + biopsySequenceNumber + "'>" +
                    "<i class='fa fa-tasks report-link'></i> " + biopsySequenceNumber + "</a>";

                ptenOrderDate = moment(ptenOrderDate).utc().format('MMMM D, YYYY h:mm A') + ' GMT';
                ptenResultDate = moment(ptenResultDate).utc().format('MMMM D, YYYY h:mm A') + ' GMT';
                specimenFailureDate = moment(specimenFailureDate).utc().format('MMMM D, YYYY h:mm A') + ' GMT';
                pathologyReviewdate = moment(pathologyReviewdate).utc().format('MMMM D, YYYY h:mm A') + ' GMT';

                //Samples are found -- loop
                if (samples.length > 0) {

                    $.each(samples, function (index, value) {
                        var molecularSequenceNumber = (value.molecularSequenceNumber !== null
                        && value.molecularSequenceNumber.length > 0) ? value.molecularSequenceNumber : "-";

                        if(molecularSequenceNumber !== '-') {
                            //Sample values
                            var lab = value.lab;
                            var dnaShippedDate = moment(value.dnaShippedDate).utc().format('MMMM D, YYYY h:mm A') + ' GMT';
                            var trackingNumber = value.trackingNumber;
                            //Build FedEx number link
                            var fedEx = '<a class="report-link" href="http://www.fedex.com/apps/fedextrack/?action=track&tracknumbers='
                                + trackingNumber +
                                '&locale=en_US&entry_code=us&language=english" target="_blank"><i class="fa fa-truck"></i> ' + trackingNumber + '</a>';
                            //Is track empty or local
                            var local = trackingNumber.indexOf("Local");
                            if (trackingNumber === '' || trackingNumber === 'Local' || trackingNumber === '-' || local > -1) {
                                fedEx = "Local";
                            }

                            var molecularDetailHref = "<a class='report-link' href='mdAndersonMessages.html?patientSequenceNumber=" + patientSequenceNumber +
                                "&biopsySequenceNumber=" + biopsySequenceNumber +
                                "&molecularSequenceNumber=" + molecularSequenceNumber +
                                "&history=open'>" +
                                "<i class='fa fa-share-alt report-link'></i> " + molecularSequenceNumber + "</a>";

                            json2d.push([
                                molecularDetailHref, patientDetailHref, biopsyDetailHref, lab, fedEx, dnaShippedDate
                            ]);
                        }
                    });
                }
            });
        });
    }

    var molecularTable = $('#molecular').dataTable( {
        'data': json2d,
        'bAutoWidth' : false,
        'bFilter': true,
        'bSearchable':true,
        'bInfo':false,
        'bPaginate': true,
        'bDestroy': true,
        'aaSorting': [],
        'iDisplayLength': 100,
        'order' : [[0, "asc"]],
        'language' : { 'zeroRecords': 'There are no molecular sequence.' }
    });
}

var molecularSequenceCtrl = angular.module('molecularSequenceCtrl',[]);

function molecularTable($scope, $http) {

    var URL = "http://localhost:4567/patientSpecimenTrackingSummary";

    $scope.loadMsnData = function () {
        $http.get(URL)
            .success(function (data) {
                    makeMsnTable(data);
            })
            .error(function (data, status, header, config) {
                $scope.ResponseDetails = "Data: " + data +
                    "<br />status: " + status +
                    "<br />headers: " + JSON.stringify(header) +
                    "<br />config: " + JSON.stringify(config);
            });
    };
}

angular
    .module('inspinia')
    .controller('molecularSequenceCtrl', molecularTable)