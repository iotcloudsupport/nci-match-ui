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


var reportCtrl = angular.module('reportCtrl',[]);
var loadCtrl = angular.module('loadCtrl',[]);
var generateCtrl = angular.module('generateCtrl',[]);

var serviceCtrl = angular.module('serviceCtrl', [])
    .service('sharedProperties', function () {
        var property = 'First';

        return {
            getProperty: function () {
                return property;
            },
            setProperty: function(value) {
                property = value;
            }
        };
    });

var serviceCtrl = angular.module('serviceCtrl', [])
    .service('sharedProperties', function () {
        var property = 'First';

        return {
            getProperty: function () {
                return property;
            },
            setProperty: function(value) {
                property = value;
            }
        };
    });

function handleReport($scope, $http) {

    var URL = "http://localhost:4567/generateReport?name=screenVsEnrolled";

    $scope.loadReportData = function () {
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
}

// #load the generatble reports
function loadGeneratorData($scope, $http) {

    var URL = "http://localhost:4568/reportList";

    //$http({
    //    method: 'GET',
    //    url: URL,
    //    headers : {'Content-Type':'application/json; charset=UTF-8'}
    //}).then(function successCallback(response) {
    //    alert("---> "+response)
    //    // this callback will be called asynchronously
    //    // when the response is available
    //}, function errorCallback(response) {
    //
    //    alert(JSON.stringify(response))
    //    // called asynchronously if an error occurs
    //    // or server returns response with an error status.
    //});



    $scope.generateReportLinks = function () {

        $http
            .get(URL)
            .success(function (data, status, headers, config) {
                var array = [];

                alert("Data Found-- > " + JSON.stringify(data))

                $.each(data, function (key, value) {
                    array.push({
                        name: key + ' - ' + value,
                        id: value,
                        });
                });
                $scope.templates = array;
                $scope.template = $scope.templates[0];

            })
            .error(function (data, status, header, config) {


                alert("Error Found-- > " + JSON.stringify(config))

                $scope.ResponseDetails = "Data: " + data +
                    "<br />status: " + status +
                    "<br />headers: " + JSON.stringify(header) +
                    "<br />config: " + JSON.stringify(config)
                ;
            });
    };
}


angular
    .module('inspinia')
    .controller('generateCtrl', handleReport)
    .controller('loadCtrl', loadGeneratorData)