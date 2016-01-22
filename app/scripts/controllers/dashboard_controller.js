angular.module('dashboard.matchbox',[])
    .controller('DashboardStatisticsController', function( $scope, workflowApi ) {
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
    .controller('DashboardPendingReviewController', function( $scope, DTOptionsBuilder, DTColumnDefBuilder, matchApi, reportApi ) {
        this.dtOptions = DTOptionsBuilder.newOptions()
            .withDisplayLength(25);
        this.dtOptions = DTOptionsBuilder.newOptions()
            .withOption('bLengthChange', false);

        this.dtColumnDefs = [];
        this.dtInstance = {};

        $scope.pendingVariantReportList = [];
        $scope.pendingAssignmentReportList = [];
        $scope.concordancePatientList = [];

        $scope.loadPatientVariantReportsList = function() {
            matchApi
                .getPatientVariantReports()
                .then(function(d) {
                    $scope.pendingVariantReportList = d.data;
                });
        }

        $scope.loadPatientPendingAssignmentReportsList = function() {
            matchApi
                .getPatientPendingAssignmentReports()
                .then(function(d) {
                    $scope.pendingAssignmentReportList = d.data;
                });
        }

        $scope.loadLimboPatientsList = function() {
            reportApi
                .getPatientInLimboReports()
                .then(function(d) {

                    angular.forEach(d.data, function (value) {

                        var patientSequenceNumber = value.psn;
                        var biopsySequenceNumber = value.bsn;
                        var molecularSequenceNumber = value.msn;
                        var jobName = value.job_name;
                        var currentPatientStatus = value.currentPatientStatus;

                        var variantReportLink =  "patientId=" + patientSequenceNumber +
                            "&biopsySequenceNumber=" + biopsySequenceNumber +
                            "&molecularSequenceNumber=" + molecularSequenceNumber +
                            "&jobName=" + jobName +
                            "&status=" + currentPatientStatus + "'";

                        var concordanceTemplate = {
                            'psn': patientSequenceNumber,
                            'msn': molecularSequenceNumber,
                            'variantReport': variantReportLink,
                            'concordance': value.concordance,
                            'date_verified': value.date_verified
                        };

                        $scope.concordancePatientList.push(concordanceTemplate);
                    });
                });
        }


    })
    .controller('DashboardSequencedConfirmedController', function( $scope, reportApi) {
        $scope.loadSequencedConfirmedDonutChart = function() {
            $scope.sequencedConfirmedModel = [
                {label: "0 aMOI", value: 1},
                {label: "1 aMOI", value: 6},
                {label: "2 aMOI", value: 3},
                {label: "3 aMOI", value: 5},
                {label: "4 aMOI", value: 0},
                {label: "5+ aMOI", value: 2}
            ];
        }
    })
    .controller('DashboardTreatmentArmAccrualController', function( $scope ) {
        this.barOptions = {
            scaleBeginAtZero: true,
            scaleShowGridLines: true,
            scaleGridLineColor: "rgba(0,0,0,.05)",
            scaleGridLineWidth: 1,
            barShowStroke: true,
            barStrokeWidth: 2,
            barValueSpacing: 5,
            barDatasetSpacing: 1
        };

        $scope.loadTreatmentArmAccrual = function() {
            // TODO: Invoke the backend rest service and populate
            // the armNames and armValues variable.

            armNames = ['EAY131-Q', 'EAY131-B', 'EAY131-H', 'EAY131-U', 'EAY131-E'];
            armValues = [6, 3, 2, 2, 1];

            $scope.barData = {
                labels: armNames,
                datasets: [
                    {
                        label: "Accural Dataset",
                        fillColor: "rgba(151,187,205,0.5)",
                        strokeColor: "rgba(220,220,220,0.8)",
                        highlightFill: "rgba(220,220,220,0.75)",
                        highlightStroke: "rgba(220,220,220,1)",
                        data: armValues
                    }
                ]
            };
        }
    });
