angular.module('reports.matchbox',[])
    .controller('ReportsController', function($scope, matchConfig, DTOptionsBuilder, DTColumnDefBuilder, reportService) {

        $scope.reportList = [];

        $scope.init = function() {
            $scope.dtOptions = DTOptionsBuilder.newOptions();
            $scope.dtColumnDefs = [
                DTColumnDefBuilder.newColumnDef(2).notSortable()
            ];
            $scope.dtInstance = {};

            reportService
                .getReportList()
                .then(function(d) {
                    $.each(d.data, function( key, value ) {
                        $scope.reportList .push({
                            name: value.name,
                            displayName: value.displayName,
                            description: value.description,
                            excelHref: matchConfig.reportApiBaseUrl + '/downloadReportFile?name=' + value.name + '&type=excel',
                            jsonHref: matchConfig.reportApiBaseUrl + '/downloadReportFile?name=' + value.name + '&type=json',
                            csvHref: matchConfig.reportApiBaseUrl + '/downloadReportFile?name=' + value.name + '&type=csv'
                        });
                    });
                });
        }

    });
