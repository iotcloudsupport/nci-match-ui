/**
 * Created by hendrikssonm on 11/12/15.
 */
/**
 * treatmentArmCtrl - controller
 */
var tasSelected = [];

function makeTreatmentArms2d(treatmentArms) {
    var json2d = [];
    $.each(treatmentArms, function( key, value ) {
        if (tasSelected.length === 0 || tasSelected.indexOf(value.treatmentArmId) >= 0) {
            var dateOpened = '';
            var dateDown = '';
            var dateCreated = '';
            if (value.dateOpened != undefined && value.dateOpened != null) {
                dateOpened = moment.unix(value.dateOpened/1000).utc().format('LLL') + ' GMT';
            }
            // if TA has been suspended and closed, only show closed
            if (value.dateSuspended != undefined && value.dateSuspended != null) {
                dateDown = moment.unix(value.dateSuspended/1000).utc().format('LLL') + ' GMT';
            }
            if (value.dateClosed != undefined && value.dateClosed != null) {
                dateDown = moment.unix(value.dateClosed/1000).utc().format('LLL') + ' GMT';
            }
            if (value.dateCreated != undefined && value.dateCreated != null) {
                dateCreated = moment.unix(value.dateCreated/1000).utc().format('LLL') + ' GMT';
            }

            var treatmentArmId = (value.treatmentArmId !== undefined || value.treatmentArmId !== null) ? value.treatmentArmId : null;

            var treatmetIdLink = "<a class='report-link' href='treatmentArmsDetails.html?treatmentArmId=" +
                treatmentArmId + "&treatmentArmsList=true'>" +
                "<i class='fa fa-medkit'></i> " + treatmentArmId + "</a>";

            json2d.push([
                treatmetIdLink,
                value.treatmentArmName,
                value.currentPatients,
                value.formerPatients,
                value.notEnrolledPatients,
                value.pendingPatients,
                value.treatmentArmStatus,
                dateCreated,
                dateOpened,
                dateDown
            ]);
        }
    });

    var curTable = $('#treatment-arms').dataTable( {
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
        'language' : { 'zeroRecords': 'There are no treatment arms.' }
    });
}


var treatmentarmCtrl = angular.module('treatmentarmCtrl',[]);

function treatmentarmTable($scope, $http) {

    var URL = "http://localhost:8080/match/common/rs/getBasicTreatmentArms";

    $scope.loadTAData = function () {
        $http.get(URL)
            .success(function (data) {
                angular.forEach(data, function() {
                    makeTreatmentArms2d(data);
                });
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
    .controller('treatmentarmCtrl', treatmentarmTable)