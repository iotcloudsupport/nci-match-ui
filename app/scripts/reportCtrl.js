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
    var generatedLink = "http://localhost:4567/downloadReportFile?name=" + link + "&createdDate=" + dateint + "&type=" + message;
    var generatedUrl = '<a href="' + generatedLink + '">' + link + '</a>';

    alert(JSON.stringify(report))

    json2d.push([reportdate,'<a href="' + generatedLink + '">' + generatedUrl + '</a>','<a href="#">JSON</a>']);

    //Build Datatable and add new rows
    if(reportTable.length == 0) {
        reportTable = $('#reports').dataTable({
            'data': json2d,
            'bAutoWidth': true,
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


    //return json2d;
}

//Modules
var DataController1 = angular.module('DataController1',[]);
//var sharedData = angular.module('sharedData',[]);
var generateCtrl = angular.module('generateCtrl',[]);
var myApp = angular.module("myApp", []);

var reportCtrl = angular.module('reportCtrl',[]);
var loadCtrlParam = angular.module('loadCtrlParam',[]);
var loadCtrl = angular.module('loadCtrl',[]);
var myService = angular.module('myService',[]);
var serviceParam = angular.module('serviceParam',[]);
var SharedDataService = angular.module('SharedDataService',[]);



//********************
//angular.factory("sharedData", function() {
//    var _data = {
//        name: "david manske"
//    };
//    return {
//        data: _data
//    };
//});
//
//angular.controller("firstController", function ($scope, sharedData) {
//    $scope.data = sharedData.data;
//});
//
//angular.controller("secondController", function ($scope, sharedData) {
//    $scope.data = sharedData.data;
//});
//**********************



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

//function sharedData($scope,selectedarray) {
//    $scope.selectedreport = selectedarray;
//}


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
                + " = " + inputparameters;

            $http.get(URL)
                .success(function (data, status, headers, config) {
                    makeReportTable(data);
                })
                .error(function (data, status, header, config) {
                    $scope.ResponseDetails = "Data: " + data +
                        "<br />status: " + status +
                        "<br />headers: " + JSON.stringify(header) +
                        "<br />config: " + JSON.stringify(config);
                });
        };
    //};
    }


// #load the generatble reports
//function enterParameter($scope, $http) {
//
//    //Directive
//    $scope.parameterSet = function () {
//
//        return function (scope, element, attrs) {
//            element.bind("keydown keypress", function (event) {
//                if (event.which === 13) {
//                    scope.$apply(function () {
//                        scope.$eval(attrs.myEnter);
//                    });
//
//                    event.preventDefault();
//                }
//            });
//        };
//
//    }
//}



angular
    .module('inspinia')
    .controller('loadCtrl', loadGeneratorData)

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
