angular.module('dashboard.matchbox',[])
    .controller('DashboardStatisticsController', function($scope) {
        $scope.lastUpdated = (new Date()).getTime();
        $scope.numberOfPatients = '?';
        $scope.numberOfScreenedPatients = '?';
        $scope.numberOfPatientsWithTreatment = '?';
        $scope.numberOfPendingVariantReports = '?';
        $scope.numberOfPendingAssignmentReports = '?';

        $scope.loadDashboardStatistics = function() {
            // TODO: Make call to API to retrieve statistics
            $scope.numberOfPatients = '798';
            $scope.numberOfScreenedPatients = '645';
            $scope.numberOfPatientsWithTreatment = '25';
            $scope.numberOfPendingVariantReports = '10';
            $scope.numberOfPendingAssignmentReports = '5';
        }
    })
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
