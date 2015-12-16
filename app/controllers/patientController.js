/**
 * Created by hendrikssonm on 11/12/15.
 */
/**
 * PatientCtrl - controller
 */

function makePatients2d(patients) {
    var json2d = [];
    var treatmentArmHref = null;
    $.each(patients, function( key, value ) {
        var diseases = '-';
        var treatmentarm = '-';
        var treatmentArmVersion = '-';
        var registrationDate = moment.unix(value.registrationDate/1000).utc().format('LLL') + ' GMT';
        var offTrialDate = '-';
        var patientSequenceNumber = (value.patientSequenceNumber !== undefined && value.patientSequenceNumber !== null && value.patientSequenceNumber.length > 0) ? value.patientSequenceNumber : "-";

        if (value.diseases!=="") {
            diseases = value.diseases;
        }

        if (value.currentTreatmentArm!==null) {
            treatmentarm = value.currentTreatmentArm.id;
        }

        if (value.currentTreatmentArm != null){
            treatmentArmHref = "<a class='report-link' href='treatmentArmsDetails.html?patientList=true&treatmentArmId=" + treatmentarm;
            if (value.currentTreatmentArm.version !== undefined && value.currentTreatmentArm.version !== null) {
                treatmentArmVersion = value.currentTreatmentArm.version;
                treatmentArmHref += "&treatmentArmVersion=" + value.currentTreatmentArm.version;
            }
            treatmentArmHref += "'>" + "<i class='fa fa-medkit'></i> " + treatmentarm + "</a>";
        }
        else{
            treatmentArmHref = '-';
        }
        if (value.offTrialDate !== null && value.offTrialDate !== undefined) {
            offTrialDate = moment.unix(value.offTrialDate/1000).utc().format('LLL') + ' GMT';
        }

        var patientLink = "<a class='report-link' href='patientDetails.html?patientId=" + patientSequenceNumber + "'>" +
            "<i class='fa fa-user'></i> " + patientSequenceNumber + "</a>";

        json2d.push([patientLink, value.currentStatus, value.currentStepNumber, diseases, treatmentArmHref, treatmentArmVersion, registrationDate, offTrialDate]);
    });

    var curTable = $('#patients').dataTable( {
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
        "dom": 'T<"clear">lfrtip',
        'language' : { 'zeroRecords': 'There are no patients.' }
    });
}

//Controller
var patientCtrl = angular.module('myApp',[]);

function patientTable($scope, restCallService) {
    $scope.loadPatientData = function (id) {
        restCallService.async(id)
            .then(function (d) {
                $scope.data = d;
                makePatients2d($scope.data);
            });
    }
}

angular
    .module('inspinia')
    .controller('patientCtrl', patientTable)