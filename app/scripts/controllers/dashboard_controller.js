angular.module('dashboard.matchbox',[])
    .controller('DashboardStatisticsController', function( $scope, workflowApi, store ) {
        $scope.lastUpdated = (new Date()).getTime();
        $scope.name = 'MATCHBox User';
        $scope.name = setName();

        $scope.numberOfPatients = '?';
        $scope.numberOfScreenedPatients = '?';
        $scope.numberOfPatientsWithTreatment = '?';
        $scope.numberOfPendingAssignmentReports = '?';
        $scope.numberOfPendingTissueVariantReports = '?';
        $scope.numberOfPendingBloodVariantReports = '?';

        function setName() {
            var name;
            var profile = store.get('profile');
            if (profile.user_metadata && profile.user_metadata.firstName) {
                name = profile.user_metadata.firstName;
            } else if (profile.email) {
                name = profile.email;
            } else {
                name = 'MATCHBox User';
            }
            return name;
        }

        $scope.loadDashboardStatistics = function() {
            workflowApi
                .getDashboardStatistcs()
                .then(function(d) {
                    $scope.numberOfPatients = d.data.number_of_patients;
                    $scope.numberOfScreenedPatients = d.data.number_of_screened_patients;
                    $scope.numberOfPatientsWithTreatment = d.data.number_of_patients_with_treatment;
                    $scope.numberOfPendingAssignmentReports = d.data.number_of_pending_assignment_reports;
                    $scope.numberOfPendingTissueVariantReports = d.data.number_of_pending_tissue_variant_reports;
                    $scope.numberOfPendingBloodVariantReports = d.data.number_of_pending_blood_variant_reports;
                });
        };

        $scope.numberOfPatients = 45;
        $scope.numberOfScreenedPatients = 17;
        $scope.numberOfPatientsWithTreatment = 2;
        $scope.numberOfPendingVariantReports = 5;
        $scope.numberOfPendingAssignmentReports = 1;
        $scope.numberOfPendingTissueVariantReports = 1;
        $scope.numberOfPendingBloodVariantReports = 1;
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

        this.ddOptions = {
            'info': false,
            'paging': false,
            'bFilter': false,
            'order': [6, 'desc']
        };

        $scope.pendingAssignmentReportList = [];
        $scope.pendingTissueVariantReportList = [];
        $scope.pendingBloodVariantReportList = [];

        $scope.pendingTissueVariantReportsMockData = [
            {
                'patient_id': '100099',
                'molecular_id': 'MSN1245',
                'analysis_id': 'AT5678',
                'clia_lab': 'MoCha',
                'specimen_received_date': 1421162969643,
                'variant_report_received_date': 1421162969643,
                'days_pending': '3'

            },
            {
                'patient_id': '100065',
                'molecular_id': 'MSN12345',
                'analysis_id': 'AT5682',
                'clia_lab': 'MDA',
                'specimen_received_date': 1421163069643,
                'variant_report_received_date': 1421163269643,
                'days_pending': '3'

            }
        ];

        $scope.pendingBloodVariantReportsMockData = [
            {
                'patient_id': '100099',
                'molecular_id': 'MSN1245',
                'analysis_id': 'AT5678',
                'clia_lab': 'MoCha',
                'specimen_received_date': 1421162969643,
                'variant_report_received_date': 1421162969643,
                'days_pending': '1'

            },
            {
                'patient_id': '100065',
                'molecular_id': 'MSN12345',
                'analysis_id': 'AT5682',
                'clia_lab': 'MDA',
                'specimen_received_date': 1421163069643,
                'variant_report_received_date': 1421163269643,
                'days_pending': '3'

            },
            {
                'patient_id': '100099',
                'molecular_id': 'MSN1245',
                'analysis_id': 'AT5678',
                'clia_lab': 'MoCha',
                'specimen_received_date': 1421162969643,
                'variant_report_received_date': 1421162969643,
                'days_pending': '8'

            },
            {
                'patient_id': '100065',
                'molecular_id': 'MSN12345',
                'analysis_id': 'AT5682',
                'clia_lab': 'MDA',
                'specimen_received_date': 1421163069643,
                'variant_report_received_date': 1421163269643,
                'days_pending': '15'

            }
        ];

        $scope.pendingAssignmentReportsMockData = [
            {
                'patient_id': '100136',
                'molecular_id': 'MSN124577',
                'analysis_id': 'AT5690',
                'assignment_date': 1423162969643,
                'hours_pending': '3'

            }
        ];

        $scope.loadPatientPendingAssignmentReportsList = function() {
            /*matchApi
                .getPatientPendingAssignmentReports()
                .then(function(d) {
                    $scope.pendingAssignmentReportList = d.data;
                });*/
            angular.forEach($scope.pendingAssignmentReportsMockData, function(value) {
                var assignmentReport = {};
                assignmentReport.patient_id = value.patient_id;
                assignmentReport.molecular_id = value.molecular_id;
                assignmentReport.analysis_id = value.analysis_id;
                assignmentReport.assignment_date = value.assignment_date;
                assignmentReport.hours_pending = value.hours_pending;
                $scope.pendingAssignmentReportList.push(assignmentReport);
            });
        };
        
        $scope.loadTissueVariantReportsList = function() {
            /*matchApi
                .getTissueVariantReports()
                .then(function(d) {
                    $scope.pendingTissueVariantReportList = d.data;
                });*/
            angular.forEach($scope.pendingTissueVariantReportsMockData, function(value) {
                var tissueReport = {};
                tissueReport.patient_id = value.patient_id;
                tissueReport.molecular_id = value.molecular_id;
                tissueReport.analysis_id = value.analysis_id;
                tissueReport.clia_lab = value.clia_lab;
                tissueReport.specimen_received_date = value.specimen_received_date;
                tissueReport.variant_report_received_date = value.variant_report_received_date;
                tissueReport.days_pending = value.days_pending;
                $scope.pendingTissueVariantReportList.push(tissueReport);
            });
        };
        
        $scope.loadBloodVariantReportsList = function() {
            /*matchApi
                .getBloodVariantReports()
                .then(function(d) {
                    $scope.pendingBloodVariantReportList = d.data;
                });*/
            angular.forEach($scope.pendingBloodVariantReportsMockData, function(value) {
                var bloodReport = {};
                bloodReport.patient_id = value.patient_id;
                bloodReport.molecular_id = value.molecular_id;
                bloodReport.analysis_id = value.analysis_id;
                bloodReport.clia_lab = value.clia_lab;
                bloodReport.specimen_received_date = value.specimen_received_date;
                bloodReport.variant_report_received_date = value.variant_report_received_date;
                bloodReport.days_pending = value.days_pending;
                $scope.pendingBloodVariantReportList.push(bloodReport);
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
            'fa fa-heartbeat fa-2x',
            'fa fa-bar-chart fa-2x',
            'fa fa-medkit fa-2x',
            'fa fa-truck fa-2x',
            'fa fa-user fa-2x',
            'fa fa-thumbs-up fa-2x',
            'fa fa-exclamation-triangle fa-2x'
        ];

        $scope.message = [
            'Patient Registration',
            'Tissue Specimen Received',
            'Tissue Specimen Failure',
            'New Treatment Arm',
            'Treatment Arm Open',
            'Treatment Arm Closed',
            'Blood Specimen Received'
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
            {
                "pic": $scope.icons[4],
                "status": "activity-feed-icon",
                "patientId": '100099',
                "treatmentArmId": '',
                "molecularId": '',
                "biopsySequenceNumber": '',
                "surgicalEventId": '',
                "time": 1421175969643,
                "age": '3m',
                "displayName": $scope.message[0]
            },
            {
                "pic": $scope.icons[2],
                "status": "activity-feed-icon",
                "patientId": '',
                "treatmentArmId": 'APEC1621-A',
                "version": "2016-03-17",
                "molecularId": '',
                "biopsySequenceNumber": '',
                "surgicalEventId": '',
                "time": 1421175969643,
                "age": '3m',
                "displayName": $scope.message[4]
            },
            {
                "pic": $scope.icons[3],
                "status": "activity-feed-icon",
                "patientId": '100065',
                "treatmentArmId": '',
                "molecularId": 'MSN12349',
                "biopsySequenceNumber": 'AT111',
                "surgicalEventId": '125',
                "time": 1421171969643,
                "age": '5m',
                "displayName": $scope.message[1]
            },
            {
                "pic": $scope.icons[2],
                "status": "activity-feed-icon",
                "patientId": '',
                "treatmentArmId": 'APEC1621-Z',
                "molecularId": '',
                "biopsySequenceNumber": '',
                "surgicalEventId": '',
                "time": 1421169969643,
                "age": '5m',
                "displayName": $scope.message[5]
            },
            {
                "pic": $scope.icons[3],
                "status": "activity-feed-icon",
                "patientId": '100136',
                "treatmentArmId": '',
                "molecularId": 'MSN12349',
                "biopsySequenceNumber": 'AT108',
                "surgicalEventId": '125',
                "time": 1421165969643,
                "age": '18m',
                "displayName": $scope.message[1]
            },
            {
                "pic": $scope.icons[1],
                "status": "activity-feed-icon",
                "patientId": '100065',
                "treatmentArmId": '',
                "molecularId": 'MSN12340',
                "surgicalEventId": '125',
                "biopsySequenceNumber": 'AT105',
                "time": 1421162969643,
                "age": '5h',
                "displayName": $scope.message[2]
            },
            {
                "pic": $scope.icons[2],
                "status": "activity-feed-icon",
                "patientId": '',
                "treatmentArmId": 'APEC1621-A',
                "version": "2016-03-17",
                "molecularId": '',
                "biopsySequenceNumber": '',
                "surgicalEventId": '',
                "time": 1421162969643,
                "age": '5h',
                "displayName": $scope.message[3]
            },
            {
                "pic": $scope.icons[3],
                "status": "activity-feed-icon",
                "patientId": '100065',
                "treatmentArmId": '',
                "molecularId": 'MSN12340',
                "biopsySequenceNumber": 'AT105',
                "surgicalEventId": '125',
                "time": 1421160969643,
                "age": '6d',
                "displayName": $scope.message[6]
            },
            {
                "pic": $scope.icons[4],
                "status": "activity-feed-icon",
                "patientId": '100136',
                "treatmentArmId": '',
                "molecularId": '',
                "biopsySequenceNumber": '',
                "surgicalEventId": '',
                "time": 1421155768643,
                "age": '1y',
                "displayName": $scope.message[0]
            },
            {
                "pic": $scope.icons[1],
                "status": "activity-feed-icon",
                "patientId": '100136',
                "treatmentArmId": '',
                "molecularId": 'MSN12330',
                "biopsySequenceNumber": 'AT101',
                "surgicalEventId": '125',
                "time": 1421162969643,
                "age": '5h',
                "displayName": $scope.message[2]
            },
            {
                "pic": $scope.icons[3],
                "status": "activity-feed-icon",
                "patientId": '100065',
                "treatmentArmId": '',
                "molecularId": 'MSN12330',
                "biopsySequenceNumber": 'AT101',
                "surgicalEventId": '125',
                "time": 1421160969643,
                "age": '6d',
                "displayName": $scope.message[6]
            },
            {
                "pic": $scope.icons[4],
                "status": "activity-feed-icon",
                "patientId": '100065',
                "treatmentArmId": '',
                "molecularId": '',
                "biopsySequenceNumber": '',
                "surgicalEventId": '125',
                "time": 1421155768643,
                "age": '1y',
                "displayName": $scope.message[0]
            },
            {
                "pic": $scope.icons[4],
                "status": "activity-feed-icon",
                "patientId": '100065',
                "treatmentArmId": '',
                "molecularId": '',
                "biopsySequenceNumber": '',
                "surgicalEventId": '125',
                "time": 1421155768643,
                "age": '1y',
                "displayName": $scope.message[0]
            }
        ];

        function setupActivityList(listSize, entryMax) {
            for (var i = 0; i < entryMax; i++) {
                $scope.activityList.push($scope.activityListData[listSize + i]);
                //console.log($scope.activityList);
                
            }
            //console.log($scope.activityList);
        }

        /*$scope.loadActivityList = function() {
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
        };*/

        $scope.loadActivityList = function() {
            var listSize = $scope.activityList.length;
            setupActivityList(listSize, 10);
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

            armNames = ['APEC1621-Q', 'APEC1621-B', 'APEC1621-H', 'APEC1621-U', 'APEC1621-E'];
            armValues = [6, 3, 2, 2, 1];

            $scope.barData = {
                labels: armNames,
                datasets: [
                    {
                        label: "Accrual Dataset",
                        fillColor: "#1c84c6",
                        strokeColor: "rgba(220,220,220,0.8)",
                        highlightFill: "#23c6c8", //"rgba(220,220,220,0.75)",
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
                color: "#18a689", //"#ab0102",
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
