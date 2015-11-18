/**
 * Created by hendrikssonm on 11/12/15.
 */
/**
 * ReportCtrl - controller
 */

var reportCtrl = angular.module('reportCtrl',[]);

function handleReport($scope, $http) {

    $scope.reportData = {
        items: [{

        }]
    };

    var URL = "http://localhost:4567/generateReport?name=screenVsEnrolled";

    $scope.loadReportData = function () {
        $http.get(URL)
            .success(function (data, status, headers, config) {
                $scope.json = "btn-default";
                $scope.pdf = "btn-default";
                $scope.csv = "btn-default";

                var generateDate = moment.unix(data.createdDate/1000).utc().format('LLL') + ' GMT';

                $scope.reportData.items.push({
                    format: 'json',
                    name: data.name,
                    dt: generateDate
                });
            })
            .error(function (data, status, header, config) {
                $scope.ResponseDetails = "Data: " + data +
                    "<br />status: " + status +
                    "<br />headers: " + jsonFilter(header) +
                    "<br />config: " + jsonFilter(config);
            });
    };
}

angular
    .module('inspinia')
    .controller('reportCtrl', handleReport)