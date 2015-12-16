/**
 * Created by hendrikssonm on 11/12/15.
 */
/**
 * ReportCtrl - controller
 */
function makeLoadReportTable(report) {
    reportTable ="";
    var json2d = [];

    $.each(report, function (key, value) {
        var link = "-";
        var displayname = "-";
        var description = "-";

        link = value.name;
        description = value.description;
        displayname = value.displayname;

        var LinkJson = "http://localhost:4567/downloadReportFile?name=" + link + "&type=json";
        var LinkCsv = "http://localhost:4567/downloadReportFile?name=" + link + "&type=csv";
        var LinkExcel = "http://localhost:4567/downloadReportFile?name=" + link + "&type=excel";

        var generatedLinkJson = '<a class="btn btn-success" type="button" href="' + LinkJson +  '">' +
            '<i class="fa fa-file-code-o fa-lg"></i> <b>JSON</b> </a>';
        var generatedLinkCsv = '<a class="btn btn-warning" type="button" href="' + LinkCsv +  '">' +
            '<i class="fa fa-file-text-o fa-lg"></i> <b>CSV</b> </a>';
        var generatedLinkExcel = '<a class="btn btn-primary" type="button" href="' + LinkExcel +  '">' +
            '<i class="fa fa-file-excel-o fa-lg"></i> <b>EXCEL</b> </a>';

        var LinkArray = generatedLinkJson + " " + generatedLinkCsv + " " + generatedLinkExcel;

        json2d.push([displayname, description, LinkArray]);
    });

    var curTable = $('#readyreports').dataTable( {
        'data': json2d,
        responsive: true,
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
        'language' : { 'zeroRecords': 'There are no report links.' }
    });
}

//Controller
var loadCtrl = angular.module('loadCtrl',[]);


function loadGeneratorData($scope, restCallService) {
    $scope.generateLoadReportLinks = function (id) {
        restCallService.async(id)
            .then(function (d) {
                $scope.data = d;

                var array = [];
                $.each($scope.data, function (key, value) {
                    var dataname = "-";
                    var displayname = "-";
                    var description = "-";

                    if(value != null){
                        dataname = value.name;
                        displayname = value.displayName;
                        description = value.description;
                    }

                    array.push({
                        name: dataname,
                        description: description,
                        dataname: dataname,
                        displayname: displayname
                    });
                });

                makeLoadReportTable(array);
                //makeBioTable($scope.data);
            });
    }
}

angular
    .module('inspinia')
    .controller('loadCtrl', loadGeneratorData)
