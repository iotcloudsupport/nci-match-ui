angular.module('dashboard.matchbox',[])
    .controller('DashboardStatisticsController', function($scope, workflowApi) {
        $scope.lastUpdated = (new Date()).getTime();
        $scope.name = 'MATCHBox User';
        $scope.numberOfPatients = '?';
        $scope.numberOfScreenedPatients = '?';
        $scope.numberOfPatientsWithTreatment = '?';
        $scope.numberOfPendingVariantReports = '?';
        $scope.numberOfPendingAssignmentReports = '?';

        $scope.loadDashboardStatistics = function() {
            workflowApi
                .getDashboardStatistcs()
                .then(function(d) {
                    $scope.numberOfPatients = d.data.number_of_patients;
                    $scope.numberOfScreenedPatients = d.data.number_of_screened_patients;
                    $scope.numberOfPatientsWithTreatment = d.data.number_of_patients_with_treatment;
                    $scope.numberOfPendingVariantReports = d.data.number_of_pending_variant_reports;
                    $scope.numberOfPendingAssignmentReports = d.data.number_of_pending_assignment_reports;
                });
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
