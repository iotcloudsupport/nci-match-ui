angular.module('dashboard.matchbox',[])
    .controller('DashboardController', function($scope,
                                                DTOptionsBuilder,
                                                DTColumnDefBuilder,
                                                patientsWithPendingVariantReportService,
                                                patientsWithPendingAssignmentReportService,
                                                patientsInLimboService) {
        this.dtOptions = DTOptionsBuilder.newOptions()
            .withDisplayLength(10)
            .withOption('bFilter', true)
            .withOption('bAutoWidth', false)
            .withOption('bInfo', false)
            .withOption('bPaginate', true)
            .withOption('paging', true)
            .withOption('bLengthChange', false)
        ;
        this.dtColumnDefs = [];
        this.dtInstance = {};

        this.dtColumnDefs = [
            DTColumnDefBuilder.newColumnDef(0).notVisible()
        ];

        $scope.store = {};

        $scope.dashboardList = [];

        $scope.loadPatientVariantReportsList = function() {
            patientsWithPendingVariantReportService
                .getPatientVariantReports()
                .then(function(d) {
                    $scope.dashboardList = d.data;
                });
        },
        $scope.loadPatientPendingAssignmentReportsList = function() {
            patientsWithPendingAssignmentReportService
                .getPatientPendingAssignmentReports()
                .then(function(d) {

                    //alert(JSON.stringify(d.data))

                    $scope.dashboardList = d.data;
                });
        }
        $scope.loadLimboPatientsList = function() {
            patientsInLimboService
                .getPatientInLimboReports()
                .then(function(d) {
                    $scope.dashboardList = d.data;
                });
        };
});
