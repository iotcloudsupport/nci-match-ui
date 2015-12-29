angular.module('reports.matchbox',[])
    .controller('ReportsController', function($scope, matchConfig, DTOptionsBuilder, DTColumnDefBuilder, reportService) {

        this.dtOptions = DTOptionsBuilder.newOptions()
            .withDisplayLength(25);
        this.dtColumnDefs = [
            DTColumnDefBuilder.newColumnDef(1).notSortable(),
            DTColumnDefBuilder.newColumnDef(2).notSortable()
        ];
        this.dtInstance = {};

        $scope.reportList = [];

        $scope.loadReportList = function() {
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
