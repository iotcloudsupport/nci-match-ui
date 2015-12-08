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

$('#parameterslist').multiselect();

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
    //var URL = "http://localhost:4567/geneList";

    $scope.generateReportLinks = function () {

        $http
            .get(URL)
            .success(function (data, status, headers, config) {

                $.each(data, function (key, value) {
                    var dataname = "-";
                    var displayname = "-";
                    var description = "-";

                    if(value != null){
                        description = value.description;

                        if(typeof value.params !== 'undefined'){
                            dataname = value.params[0].name;
                            displayname = value.params[0].displayName;
                        }
                    }


                    //injectParam(value);
                    array.push({
                        name: key,
                        id: value,
                        description: description,
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

    //http://localhost:4567/patientList
    //http://localhost:4567/treatmentArmIdList
    //http://localhost:4567/variantList

    $scope.reportSelect = function (param) {
        var pname = "-";
        var pdata = [];
        var pdisplayName = "-";
        var pdataName = "-";
        var p$$hashKey = "-";
        var selectedarray = [];
        var namesarray = [];
        var URL = "";
            $('#parameterValidationErrorMessage').hide();

        if(param.selectedReport == "geneSummaryReport" ||
            param.selectedReport == "patientsByGeneName") {
            //geneSummaryReport
            //patientsByGeneName
            URL = "http://localhost:4567/geneList";
        }
        else if(param.selectedReport == "treatmentArmSummaryReport" ||
            param.selectedReport == "diseaseCoverageByTreatmentArm") {
            //treatmentArmSummaryReport
            //diseaseCoverageByTreatmentArm
            URL = "http://localhost:4567/treatmentArmIdList";
        }
        else if(param.selectedReport == "variantSummaryReport" ||
            param.selectedReport == "qualifyingVariantSummaryReport") {
            //variantSummaryReport
            //qualifyingVariantSummaryReport
            URL = "http://localhost:4567/variantList";
        }
        else if(param.selectedReport == "patientEligibleArmsNoTiebreaker") {
            //patientEligibleArmsNoTiebreaker
            URL = "http://localhost:4567/patientList";
        }
        else{
            //$scope.selectedreport = selectedarray;
            //$scope.selected = $scope.selectedreport[0];

            namesarray.push({
                name: '-',
                id: '-'
            });
            $scope.namelist = namesarray;
            return;
        }

        $http
            .get(URL)
            .success(function (data, status, headers, config) {

                $.each(data, function (key, value) {
                    var dataname = "-";
                    var displayname = "-";

                    //var inx = '<input type="checkbox" >' + value + '</input>';
                    var inx = value ;

                    //if(value != null){
                    //    dataname = value[0].name;
                    //    displayname = value[0].displayName;
                    //}
                    ////injectParam(value);
                    namesarray.push({
                        name: key,
                        id: inx
                    });
                });
                $scope.namelist = namesarray;

                //$scope.namelist = $scope.nameslist[0];
            })
            .error(function (data, status, header, config) {
                $scope.ResponseDetails = "Data: " + data +
                    "<br />status: " + status +
                    "<br />headers: " + JSON.stringify(header) +
                    "<br />config: " + JSON.stringify(config)
                ;
            });

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

    //Select parameter
    $scope.selectedNamesList = function (param) {
        var selectedparameter = param.selectedParameter;
        var parametername = [];

        return;
    };

    //Select parameter
    $scope.generateReport = function (param) {
        var reportname = "-";
        var reportparams = "-";
        var inputparameters,URL;

        if(param.length !== undefined){
            parameters = param.reportParameters;
            reportname = parameters.pname;
            reportparams = parameters.pdataName;

             inputparameters = $scope.rootFolders;
             URL = "http://localhost:4567/generateReport?name=" + reportname
                + "&" + reportparams
                + "=" + inputparameters;

        }
        else{
            URL = "http://localhost:4567/generateReport?name=" + param.reportParameters
        }

        //var inputparameters = $scope.rootFolders;
        //var URL = "http://localhost:4567/generateReport?name=" + reportname
        //    + "&" + reportparams
        //    + "=" + inputparameters;




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
