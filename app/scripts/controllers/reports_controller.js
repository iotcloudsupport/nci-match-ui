angular.module('reports.matchbox',[])
    .controller('ReportsController', function( $scope, $http, matchConfig ) {

        $scope.reportList = []

        $scope.loadReportList = function() {
            $http.get(matchConfig.reportApiBaseUrl + '/reportList')
                .success(function (data) {
                    $.each(data, function( key, value ) {
                        $scope.reportList.push({
                            'name': value.name,
                            'displayName': value.displayName,
                            'description': value.description,
                            'excelHref': matchConfig.reportApiBaseUrl + '/downloadReportFile?name=' + value.name + '&type=excel',
                            'jsonHref': matchConfig.reportApiBaseUrl + '/downloadReportFile?name=' + value.name + '&type=json',
                            'csvHref': matchConfig.reportApiBaseUrl + '/downloadReportFile?name=' + value.name + '&type=csv'
                        });
                    });
                })
                .error(function (data, status, header, config) {
                    console.log(data + '|' + status + '|' + header + '|' + config);
                });
        }

    });