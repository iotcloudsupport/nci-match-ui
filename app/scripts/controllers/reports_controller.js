angular.module('reports.matchbox',[])
    .controller('ReportsController', function(httpReports,$scope,matchConfig) {
        $scope.reportList = [];
        $scope.clearData = function() {
            $scope.reportList = [];
        };
        $scope.loadReportList = function() {
        // Call the async method and then do stuff with what is returned inside our own then function
        httpReports
            .async()
            .then(function(d) {

                $.each(d.data, function( key, value ) {
                var name = "-";
                var displayName = "-";
                var description = "-";
                    name = value.name;
                    displayName = value.displayName;
                    description = value.description;
                    $scope.reportList.push({
                        'name': name,
                        'displayName': displayName,
                        'description': description,
                        'excelHref': matchConfig.reportApiBaseUrl
                        + '/downloadReportFile?name=' + name + '&type=excel',
                        'jsonHref': matchConfig.reportApiBaseUrl
                        + '/downloadReportFile?name=' + name + '&type=json',
                        'csvHref': matchConfig.reportApiBaseUrl
                        + '/downloadReportFile?name=' + name + '&type=csv'
                    });
                });
            });
        };
    });
