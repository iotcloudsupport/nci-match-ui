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
        };
    })
    .controller('DashboardPendingReviewController', function( $scope, DTOptionsBuilder, DTColumnDefBuilder, matchApi, workflowApi, reportApi ) {
        this.dtOptions = DTOptionsBuilder.newOptions()
            .withDisplayLength(25);
        this.dtOptions = DTOptionsBuilder.newOptions()
            .withOption('bPaginate', false)
        this.dtOptions = DTOptionsBuilder.newOptions()
            .withOption('bLengthChange', false);

        this.dtColumnDefs = [];
        this.dtInstance = {};

        $scope.pendingVariantReportList = [];
        $scope.pendingAssignmentReportList = [];
        $scope.concordancePatientList = [];
        $scope.rejoinRequestedPatientList = [];

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
        };

        $scope.loadRejoinRequestedPatientsList = function() {
            workflowApi
                .getRejoinRequested()
                .then(function(d) {
                    angular.forEach(d.data, function(value) {
                        patientSequenceNumber = value.patientSequenceNumber;
                        latestTrigger = value.patientRejoinTriggers[value.patientRejoinTriggers.length - 1];
                        if (! angular.isDefined(latestTrigger.dateRejoined)) {
                            treatmentArmList = [];
                            angular.forEach(latestTrigger.eligibleArms, function(eligibleArm) {
                                treatmentArmList.push(eligibleArm.treatmentArmId + ' (' + eligibleArm.treatmentArmVersion + ')')
                            });
                            $scope.rejoinRequestedPatientList.push({
                                'patientSequenceNumber': patientSequenceNumber,
                                'treatmentArm': treatmentArmList.join(', '),
                                'dateScanned': latestTrigger.dateScanned,
                                'dateSentToECOG': latestTrigger.dateSentToECOG
                            });
                        }
                    });
                });
        };
    })
    .controller('DashboardActivityFeedController', function( $scope, DTOptionsBuilder, DTColumnDefBuilder, matchApi, reportApi ) {
        this.dtOptions = DTOptionsBuilder.newOptions()
            .withDisplayLength(25);
        this.dtOptions = DTOptionsBuilder.newOptions()
            .withOption('bLengthChange', false);

        this.dtColumnDefs = [];
        this.dtInstance = {};

        $scope.activityList = [];

        $scope.icons = [
            'fa fa-heartbeat fa-4x',
            'fa fa-cogs fa-4x',
            'fa fa-database fa-4x',
            'fa fa-envelope fa-4x',
            'fa fa-users fa-4x',
            'fa fa-car fa-4x',
            'fa fa-thumbs-up fa-4x',
            'fa fa-life-ring fa-4x',
            'fa fa-anchor fa-4x',
            'fa fa-exclamation-triangle fa-4x'
        ];

        $scope.message = [
            'Working progress ..',
            'System rerun',
            'DB issue ..',
            'Mail expected',
            'Users be aware',
            'Car broke down',
            'Great work',
            'Support needed',
            'Solid ground',
            'Watch out'
        ];

        $scope.status = [
            'btn-danger',
            'btn-success',
            'btn-default',
            'btn-warning',
            'btn-priority'
        ];

        $scope.loadActivityList = function() {
            reportApi
            .getActivityFeedList()
            .then(function(d) {
                angular.forEach(d.data, function (value) {
                    console.log(value);
                    $scope.num = (Math.ceil(Math.random() * 9));
                    $scope.icon = (Math.ceil(Math.random() * 5));
                    $scope.time = value.timestamp;
                    $scope.age = value.age;
                    $scope.message = value.message;
                    $scope.actor = value.actor;

                    if($scope.activityList.length < $scope.num) {
                        var feedTemplate = {
                            "pic": $scope.icons[$scope.num],
                            "status": $scope.status[$scope.icon],
                            "messages": $scope.message,
                            "time": $scope.time,
                            "age": $scope.age,
                            "actor": $scope.actor,
                            "displayName": $scope.message[$scope.num],
                            "description": "Delayed DB configuration"
                        };
                        $scope.activityList.push(feedTemplate);
                    }
                });
            });
        };
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

        $scope.setCanvasHeight = function() {
            // Need a better way to set the height of the canvas
            var ctx = $('#treatmentArmAccrualCanvas')[0].getContext('2d');
            ctx.canvas.height = 100;
        }

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
    })
    .controller('DashboardChartJsDonutController', function( $scope, reportApi ) {
        this.donutOptions = {
            segmentShowStroke: true,
            segmentStrokeColor: "#fff",
            segmentStrokeWidth: 2,
            percentageInnerCutout: 45, // This is 0 for Pie charts
            animationSteps: 100,
            animationEasing: "easeOutBounce",
            animateRotate: true,
            animateScale: false,
            responsive: true,
        };

        $scope.setCanvasHeight = function() {
            // Need a better way to set the height of the canvas
            var ctx = $('#amoiCanvas')[0].getContext('2d');
            ctx.canvas.height = 200;
        }

        $scope.loadChartjsDonutChart = function() {
            aMoiLabels = ['0 aMOI', '1 aMOI', '2 aMOI', '3 aMOI', '4 aMOI', '5+ aMOI'];
            aMoiValues = [4, 35, 45, 9, 6, 21]; //[4, 10, 14, 6, 10, 16]; //[45, 21, 4, 35, 9, 6];
            aMoiHighlight = "#000088"; //"#dedede";

            $scope.donutData = [
            {
                value: aMoiValues[0],
                color: "#23c6c8",
                highlight: aMoiHighlight,
                label: aMoiLabels[0]
            },
            {
                value: aMoiValues[1],
                color: "#1c84c6",
                highlight: aMoiHighlight,
                label: aMoiLabels[1]
            },
            {
                value: aMoiValues[2],
                color: "#ab0102",
                highlight: aMoiHighlight,
                label: aMoiLabels[2]
            },
            {
                value: aMoiValues[3],
                color: "#f8ac59",
                highlight: aMoiHighlight,
                label: aMoiLabels[3]
            },
            {
                value: aMoiValues[4],
                color: "#707070",
                highlight: aMoiHighlight,
                label: aMoiLabels[4]
            },
            {
                value: aMoiValues[5],
                color: "#cfcfcf",
                highlight: aMoiHighlight,
                label: aMoiLabels[5]
            }
            ];
        }
    })
;
