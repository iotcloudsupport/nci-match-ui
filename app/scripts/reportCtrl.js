/**
 * Created by hendrikssonm on 11/12/15.
 */
/**
 * ReportCtrl - controller
 */
var reportTable ="";

function makeReportTable(report) {
    var json2d = [];
    var dateint =  report.createdDate;
    var link = report.name;
    var status = report.status;
    var message = report.message;
    var reportdate = moment.unix(dateint/1000).utc().format('LLL') + ' GMT';
    var generatedLinkJson = "http://localhost:4567/downloadReportFile?name=" + link + "&createdDate=" + dateint + "&type=json" + message;
    var generatedLinkCsv = "http://localhost:4567/downloadReportFile?name=" + link + "&createdDate=" + dateint + "&type=csv" + message;
    var generatedLinkExcel = "http://localhost:4567/downloadReportFile?name=" + link + "&createdDate=" + dateint + "&type=excel" + message;

    var r = $.now();
    var generatedUrl = '<div id="r-' + r + '">' +
        '<a href="' + generatedLinkJson + '"> <b>JSON</b> ' +
        '<i class="fa fa-file-code-o fa-lg"> </i> ' +
            link +
        '</a></div>';

    var LinkJson = "http://localhost:4567/downloadReportFile?name=" + link + "&createdDate=" + dateint + "&type=json" + message;
    var LinkCsv = "http://localhost:4567/downloadReportFile?name=" + link + "&createdDate=" + dateint + "&type=csv" + message;
    var LinkExcel = "http://localhost:4567/downloadReportFile?name=" + link + "&createdDate=" + dateint + "&type=excel" + message;

    var generatedLinkJson = '<a class="btn btn-success" type="button" href="' + LinkJson +  '">' +
        '<b>JSON</b> <i class="fa fa-file-code-o fa-lg"></i> ' + link + '</a>';
    var generatedLinkCsv = '<a class="btn btn-warning" type="button" href="' + LinkCsv +  '">' +
        '<b>CSV</b> <i class="fa fa-file-text-o fa-lg"></i> ' + link + '</a>';
    var generatedLinkExcel = '<a class="btn btn-primary" type="button" href="' + LinkExcel +  '">' +
        '<b>EXCEL</b> <i class="fa fa-file-excel-o fa-lg"></i> ' + link + '</a>'

    var LinkArray = generatedLinkJson + " " + generatedLinkCsv + " " + generatedLinkExcel;

    $('#json-' + r).attr('checked','checked');

    //json2d.push([reportdate, LinkArray, typeFormat, typearray]);
    json2d.push([reportdate, LinkArray]);

    //Build Datatable and add new rows
    if(reportTable.length == 0) {
        reportTable = $('#reports').dataTable({
            'data': json2d,
            'bAutoWidth': false,
            'bFilter': true,
            'bSearchable': true,
            'bInfo': false,
            'bPaginate': true,
            'bDestroy': true,
            'aaSorting': [],
            'iDisplayLength': 100,
            'order': [[0, "asc"]],
            'language': {'zeroRecords': 'There are no report links.'},
            'createdRow': function (row, data, index) {
                //$('td', row).eq(1).addClass(determinePatientStatusColor(data[1]));
            }
        });
    }
    else{
        reportTable.dataTable().fnAddData(json2d);
    }
}

//Modules
var reportCtrl = angular.module('reportCtrl',[]);
var loadCtrl = angular.module('loadCtrl',[]);
var myService = angular.module('myService',[]);
var serviceParam = angular.module('serviceParam',[]);

function serviceReport() {
    var array = [];

    var myService = {
        mySharedObject:{
            myText:'abc'
        },
        updateObject: function() {
            myService.mySharedObject.myText = 'def';
        }
    };
    return myService;
}

function injectParam(param) {
    var array = [];
    var serviceParam = {
        mySharedObject:{
            myText:param
        },
        updateObject: function() {
            serviceParam.mySharedObject.myText = param;
        }
    };

    //serviceParam.mySharedObject.myText = param;
    return serviceParam;
}

// #load the generatble reports
function loadGeneratorData($scope, $http) {
    var array = [];
    var URL = "http://localhost:4567/reportList";

    $scope.generateReportLinks = function () {

        $http
            .get(URL)
            .success(function (data, status, headers, config) {

                $.each(data, function (key, value) {
                    var dataname = "-";
                    var displayname = "-";

                    if(value != null){
                        dataname = value[0].name;
                        displayname = value[0].displayName;
                    }
                    //injectParam(value);
                    array.push({
                        name: key,
                        id: value,
                        dataname: dataname,
                        displayname: displayname
                        });
                });
                $scope.templates = array;
                $scope.template = $scope.templates[0];
            })
            .error(function (data, status, header, config) {
                $scope.ResponseDetails = "Data: " + data +
                    "<br />status: " + status +
                    "<br />headers: " + JSON.stringify(header) +
                    "<br />config: " + JSON.stringify(config)
                ;
            });
    };

    $scope.reportSelect = function (param) {
        var pname = "-";
        var pdata = [];
        var pdisplayName = "-";
        var pdataName = "-";
        var p$$hashKey = "-";
        var selectedarray = [];
        $('#parameterValidationErrorMessage').hide();

        selected = param.selectedReport;
        pname = selected.name;
        p$$hashKey = selected.$$hashKey;
        if(selected.id != null){
            pdata = selected.id;
            pdataName = pdata[0].name;
            pdisplayName = pdata[0].displayName;
        }

        selectedarray.push({
            pname: pname,
            p$$hashKey: p$$hashKey,
            pdataName: pdataName,
            pdisplayName: pdisplayName
        });

        $scope.selectedreport = selectedarray;
        $scope.selected = $scope.selectedreport[0];
    };


    $scope.selectedReportOfList = function (param) {

        var reportname = "-";
        var reportparams = "-";

        //var selected = [];
        parameters = param.reportParameters;

        if(parameters != null){
            reportname = parameters.pname;
            reportparams = parameters.pdataName;
        }

        var inputparameters = $scope.rootFolders;
        var URL = "http://localhost:4567/generateReport?name=" + reportname
            + "&" + reportparams
            + "=" + inputparameters;

        $http.get(URL)
            .success(function (data, status, headers, config) {
                makeReportTable(data);
            })
            .error(function (data, status, header, config) {
                $('#parameterValidationErrorMessage').show();
                document.getElementById("parameterLostErrorMessage").textContent=data.message;
                $scope.ResponseDetails = "Data: " + data +
                    "<br />status: " + status +
                    "<br />headers: " + JSON.stringify(header) +
                    "<br />config: " + JSON.stringify(config);
            });
        };
    }

angular
    .module('inspinia')
    .controller('loadCtrl', loadGeneratorData)
    //.controller('radioCtrl', radioParameter)

    //.directive('loadCtrlParam', enterParameter)

    //Factory
    .factory('myService', serviceReport)
    .factory('serviceParam', injectParam)

.controller('MyCtrl', ['$scope', 'myService', function($scope, myService) {
        $scope.myText = myService.mySharedObject.myText;
        $scope.updateObject = myService.updateObject;
        $scope.myService = myService;
        $scope.mySharedObject =  myService.mySharedObject;

    }]
    )
