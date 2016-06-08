angular.module('dashboard.matchbox',[])
    .controller('DashboardStatisticsController', function( $scope, workflowApi ) {
        $scope.lastUpdated = (new Date()).getTime();
        $scope.name = 'MATCHBox User';
        $scope.numberOfPatients = '?';
        $scope.numberOfScreenedPatients = '?';
        $scope.numberOfPatientsWithTreatment = '?';
        $scope.numberOfPendingVariantReports = '?';
        $scope.numberOfPendingAssignmentReports = '?';
        $scope.numberOfPendingTissueVariantReports = '?';
        $scope.numberOfPendingBloodVariantReports = '?';

        $scope.loadDashboardStatistics = function() {
            workflowApi
                .getDashboardStatistcs()
                .then(function(d) {
                    $scope.numberOfPatients = d.data.number_of_patients;
                    $scope.numberOfScreenedPatients = d.data.number_of_screened_patients;
                    $scope.numberOfPatientsWithTreatment = d.data.number_of_patients_with_treatment;
                    $scope.numberOfPendingVariantReports = d.data.number_of_pending_variant_reports;
                    $scope.numberOfPendingAssignmentReports = d.data.number_of_pending_assignment_reports;
                    $scope.numberOfPendingTissueVariantReports = d.data.number_of_pending_tissue_variant_reports;
                    $scope.numberOfPendingBloodVariantReports = d.data.number_of_pending_blood_variant_reports;
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
        $scope.pendingTissueVariantReportsList = [];
        $scope.pendingBloodVariantReportsList = [];

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
        
        $scope.loadTissueVariantReportsList = function() {
            matchApi
                .getTissueVariantReports()
                .then(function(d) {
                    $scope.pendingTissueVariantReportsList = d.data;
                });
        }
        
        $scope.loadBloodVariantReportsList = function() {
            matchApi
                .getBloodVariantReports()
                .then(function(d) {
                    $scope.pendingBloodVariantReportsList = d.data;
                });
        }

    })
    .controller('DashboardActivityFeedController', function( $scope, DTOptionsBuilder, DTColumnDefBuilder, matchApi, reportApi ) {
        this.dtOptions = DTOptionsBuilder.newOptions()
            .withDisplayLength(25);
        this.dtOptions = DTOptionsBuilder.newOptions()
            .withOption('bLengthChange', false);

        this.dtColumnDefs = [];
        this.dtInstance = {};

        $scope.now = new Date();

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

        $scope.activityList = [];

        $scope.activityListData = [
            /*{
                "pic": $scope.icons[5],
                "status": $scope.status[1],
                "time": 1421175969643,
                "age": '3m',
                "displayName": $scope.message[2],
                "description": "Delayed DB configuration 1"
            },
            {
                "pic": $scope.icons[0],
                "status": $scope.status[0],
                "time": 1421171969643,
                "age": '5m',
                "displayName": $scope.message[1],
                "description": "Delayed DB configuration 2"
            },
            {
                "pic": $scope.icons[4],
                "status": $scope.status[2],
                "time": 1421169969643,
                "age": '5m',
                "displayName": $scope.message[2],
                "description": "Delayed DB configuration 3"
            },
            {
                "pic": $scope.icons[3],
                "status": $scope.status[4],
                "time": 1421165969643,
                "age": '18m',
                "displayName": $scope.message[1],
                "description": "Delayed DB configuration 4"
            },
            {
                "pic": $scope.icons[1],
                "status": $scope.status[3],
                "time": 1421162969643,
                "age": '5h',
                "displayName": $scope.message[2],
                "description": "Delayed DB configuration 5"
            },
            {
                "pic": $scope.icons[2],
                "status": $scope.status[1],
                "time": 1421160969643,
                "age": '6d',
                "displayName": $scope.message[1],
                "description": "Delayed DB configuration 6"
            },
            {
                "pic": $scope.icons[4],
                "status": $scope.status[3],
                "time": 1421155768643,
                "age": '1y',
                "displayName": $scope.message[0],
                "description": "Delayed DB configuration 7"
            },
            {
                "pic": $scope.icons[5],
                "status": $scope.status[3],
                "time": 1421162969643,
                "age": '5h',
                "displayName": $scope.message[2],
                "description": "Delayed DB configuration 8"
            },
            {
                "pic": $scope.icons[6],
                "status": $scope.status[1],
                "time": 1421160969643,
                "age": '6d',
                "displayName": $scope.message[1],
                "description": "Delayed DB configuration 9"
            },
            {
                "pic": $scope.icons[5],
                "status": $scope.status[3],
                "time": 1421155768643,
                "age": '1y',
                "displayName": $scope.message[0],
                "description": "Delayed DB configuration 10"
            },
            {
                "pic": $scope.icons[4],
                "status": $scope.status[3],
                "time": 1421155768643,
                "age": '1y',
                "displayName": $scope.message[0],
                "description": "Delayed DB configuration 11"
            }*/
        ];

        function setupActivityList(listSize, entryMax) {
            for (var i = 0; i < entryMax; i++) {
                $scope.activityList.push($scope.activityListData[listSize + i]);
            }
        }

        $scope.loadActivityList = function() {
            var listSize = $scope.activityList.length;
            var listSizeDifference = $scope.activityListData.length - listSize;
            var i;
            if (listSizeDifference > 5) {
                setupActivityList(listSize, 5);
                //make button active
            } else {
                // button greyed out
                if (listSizeDifference === 5) {
                    setupActivityList(listSize, 5);
                } else {
                    setupActivityList(listSize, listSizeDifference);
                }
            }
        };

        /*$scope.loadActivityList = function() {
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
        };*/
    })

    .controller('DashboardTreatmentArmAccrualChartController', function( $scope, reportApi ) {
        this.donutOptions = {
            segmentShowStroke: true,
            segmentStrokeColor: "#fff",
            segmentStrokeWidth: 2,
            percentageInnerCutout: 45, // This is 0 for Pie charts
            animationSteps: 100,
            animationEasing: "easeOutBounce",
            animateRotate: true,
            animateScale: false,
            responsive: true
        };

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
        
        $scope.setCanvasHeight = function(elementName, heightVal) {
            var ctx = $(elementName)[0].getContext('2d');
            ctx.canvas.height = heightVal;
        }

        $scope.loadTreatmentArmAccrual = function() {

            armNames = ['EAY131-Q', 'EAY131-B', 'EAY131-H', 'EAY131-U', 'EAY131-E'];
            armValues = [6, 3, 2, 2, 1];

            $scope.barData = {
                labels: armNames,
                datasets: [
                    {
                        label: "Accrual Dataset",
                        fillColor: "rgba(151,187,205,0.5)",
                        strokeColor: "rgba(220,220,220,0.8)",
                        highlightFill: "rgba(220,220,220,0.75)",
                        highlightStroke: "rgba(220,220,220,1)",
                        data: armValues
                    }
                ]
            };
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
