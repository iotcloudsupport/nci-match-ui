(function () {
    angular.module('matchbox.dashboard', [])
        .controller('DashboardController', DashboardController);

    function DashboardController($scope, matchApi, store, DTOptionsBuilder, sharedCliaProperties, arrayTools, dateTools) {
        $scope.lastUpdated = (new Date()).getTime();
        $scope.name = 'MATCHBox User';
        $scope.name = setName();

        $scope.numberOfPatients = '?';
        $scope.numberOfScreenedPatients = '?';
        $scope.numberOfPatientsWithTreatment = '?';
        $scope.numberOfPendingAssignmentReports = '?';
        $scope.numberOfPendingTissueVariantReports = '?';
        $scope.numberOfPendingBloodVariantReports = '?';

        $scope.pendingTissueVariantReportList = [];
        $scope.pendingBloodVariantReportList = [];
        $scope.pendingAssignmentReportList = [];

        $scope.patientStatistics = {};

        $scope.now = new Date();

        $scope.message = [
            'Patient Registration',
            'Tissue Specimen Received',
            'Tissue Specimen Failure',
            'New Treatment Arm',
            'Treatment Arm Open',
            'Treatment Arm Closed',
            'Blood Specimen Received'
        ];

        $scope.days_pending_range = {
            "upper_bound_green": 8,
            "upper_bound_yellow": 14
        };

        $scope.hours_pending_range = {
            "upper_bound_green": 8,
            "upper_bound_yellow": 14
        };

        $scope.gridOptions = {
            data: [], //required parameter - array with data 
            //optional parameter - start sort options 
            sort: {
                predicate: 'companyName',
                direction: 'asc'
            }
        };

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
            'order': [7, 'desc']
        };

        $scope.loadDashboardStatisticsData = loadDashboardStatisticsData;
        $scope.setCanvasHeight = setCanvasHeight;
        $scope.loadSequencedAndConfirmedChartData = loadSequencedAndConfirmedChartData;
        $scope.loadTissueVariantReportsList = loadTissueVariantReportsList;
        $scope.loadBloodVariantReportsList = loadBloodVariantReportsList;
        $scope.loadPatientPendingAssignmentReportsList = loadPatientPendingAssignmentReportsList;
        $scope.loadDashboardData = loadDashboardData;

        var aMoiLabels = [
            '0 aMOI',
            '1 aMOI',
            '2 aMOI',
            '3 aMOI',
            '4 aMOI',
            '5+ aMOI'
        ];
        var aMoiHighlight = "#000088";

        // $scope.donutOptions = {
        //     segmentShowStroke: true,
        //     segmentStrokeColor: "#fff",
        //     segmentStrokeWidth: 2,
        //     percentageInnerCutout: 45, // This is 0 for Pie charts
        //     animationSteps: 100,
        //     animationEasing: "easeOutBounce",
        //     animateRotate: true,
        //     animateScale: false,
        //     responsive: true,
        //     legendTemplate: '<ul class="dashboard donut-chart-legend">' +
        //     '<% for (var i=0; i<segments.length; i++) {%>' +
        //     '<i class="fa fa-square" style="color: <%=segments[i].fillColor%>" ></i> ' +
        //     '<%if(segments[i].label){%><%=segments[i].label%> : <strong><%=segments[i].value%> patients</strong> <%}%>' +
        //     '<br><%}%>' +
        //     '</ul>'
        // };

        $scope.donutOptions = {
            segmentShowStroke: true,
            segmentStrokeColor: "#fff",
            segmentStrokeWidth: 2,
            percentageInnerCutout: 45, // This is 0 for Pie charts
            animationSteps: 100,
            animationEasing: "easeOutBounce",
            animateRotate: true,
            animateScale: false,
            responsive: true,
            legendTemplate: false
        };

        Chart.defaults.global.legend = false;

        $scope.donutData = [
            {
                value: 0,
                color: "#23c6c8",
                highlight: aMoiHighlight,
                label: aMoiLabels[0]
            },
            {
                value: 0,
                color: "#1c84c6",
                highlight: aMoiHighlight,
                label: aMoiLabels[1]
            },
            {
                value: 0,
                color: "#18a689", //"#ab0102",
                highlight: aMoiHighlight,
                label: aMoiLabels[2]
            },
            {
                value: 0,
                color: "#f8ac59",
                highlight: aMoiHighlight,
                label: aMoiLabels[3]
            },
            {
                value: 0,
                color: "#707070",
                highlight: aMoiHighlight,
                label: aMoiLabels[4]
            },
            {
                value: 0,
                color: "#cfcfcf",
                highlight: aMoiHighlight,
                label: aMoiLabels[5]
            }
        ];

        $scope.clialab = function (id) {
            sharedCliaProperties.setProperty(id);
        };

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

        function setCanvasHeight(elementName, heightVal) {
            var ctx = $(elementName)[0].getContext('2d');
            ctx.canvas.height = heightVal;
        }

        function loadDashboardStatisticsData() {
            matchApi
                .loadDashboardStatistics()
                .then(function (d) {
                    $scope.patientStatistics = angular.copy(d.data);
                    setupTreatmentArmAccrualData($scope.patientStatistics.treatment_arm_accrual);
                });
        }

        function setupTreatmentArmAccrualData(treatment_arm_accrual) {
            var top_5_arm_labels = [];
            var top_5_arm_counts = [];

            angular.forEach(treatment_arm_accrual, function (value) {
                top_5_arm_labels.push(value.name + " (" + value.stratum_id + ")");
                top_5_arm_counts.push(value.patients);
            });

            if (top_5_arm_counts.length < 1) {
                top_5_arm_labels.push("There are no Treatment Arms with Patients assigned.");
                top_5_arm_counts.push(0);
            }
            $scope.barData = {
                labels: top_5_arm_labels,
                datasets: [
                    {
                        label: "Accrual Dataset",
                        fillColor: "#1c84c6",
                        strokeColor: "rgba(220,220,220,0.8)",
                        highlightFill: "#23c6c8", //"rgba(220,220,220,0.75)",
                        highlightStroke: "rgba(220,220,220,1)",
                        data: top_5_arm_counts
                    }
                ]
            };

            $scope.barOptions = {
                scaleBeginAtZero: true,
                scaleShowGridLines: true,
                scaleGridLineColor: "rgba(0,0,0,.05)",
                scaleGridLineWidth: 1,
                barShowStroke: true,
                barStrokeWidth: 2,
                barValueSpacing: 5,
                barDatasetSpacing: 1
            }
        }

        $scope.amoi_0 = 0;
        $scope.amoi_1 = 0;
        $scope.amoi_2 = 0;
        $scope.amoi_3 = 0;
        $scope.amoi_4 = 0;
        $scope.amoi_5 = 0



        function loadSequencedAndConfirmedChartData() {
            matchApi
                .loadSequencedAndConfirmedChartData()
                .then(function (d) {
                    var stats = d.data;
                    $scope.donutData[0].value = Number(stats.patients_with_0_amois);
                    $scope.amoi_0 = $scope.donutData[0].value;
                    $scope.donutData[1].value = Number(stats.patients_with_1_amois);
                    $scope.amoi_1 = $scope.donutData[1].value;
                    $scope.donutData[2].value = Number(stats.patients_with_2_amois);
                    $scope.amoi_2 = $scope.donutData[2].value;
                    $scope.donutData[3].value = Number(stats.patients_with_3_amois);
                    $scope.amoi_3 = $scope.donutData[3].value;
                    $scope.donutData[4].value = Number(stats.patients_with_4_amois);
                    $scope.amoi_4 = $scope.donutData[4].value;
                    $scope.donutData[5].value = Number(stats.patients_with_5_or_more_amois);
                    $scope.amoi_5 = $scope.donutData[5].value;
                });
        }

        function loadTissueVariantReportsList() {

            $scope.gridOptions = {
                data: [], //required parameter - array with data 
                //optional parameter - start sort options 
                sort: {
                    predicate: 'companyName',
                    direction: 'asc'
                }
            };
            
            matchApi
                .loadTissueVariantReportsList()
                .then(function (d) {
                    $scope.gridOptions.data = d.data;
                    $scope.pendingTissueVariantReportList = d.data;
                    arrayTools.forEach($scope.pendingTissueVariantReportList, function (element) {
                        var days_pending  = dateTools.calculateDaysPending(element, 'status_date');
                        element.days_pending  = days_pending || days_pending === 0 ? days_pending : '-';
                    });
                });
        }

        function loadBloodVariantReportsList() {
            matchApi
                .loadBloodVariantReportsList()
                .then(function (d) {
                    $scope.pendingBloodVariantReportList = d.data;
                    arrayTools.forEach($scope.pendingBloodVariantReportList, function (element) {
                        var days_pending  = dateTools.calculateDaysPending(element, 'status_date');
                        element.days_pending  = days_pending || days_pending === 0 ? days_pending : '-';
                    });
                });
        }

        function loadPatientPendingAssignmentReportsList() {
            matchApi
                .loadPatientPendingAssignmentReportsList()
                .then(function (d) {
                    $scope.pendingAssignmentReportList = d.data;
                    arrayTools.forEach($scope.pendingAssignmentReportList, function (element) {
                        var hours_pending  = dateTools.calculateHoursPending(element, 'status_date');
                        element.hours_pending  = hours_pending || hours_pending === 0 ? hours_pending : '-';
                    });
                });
        }

        function loadDashboardData() {
            loadSequencedAndConfirmedChartData();
            loadTissueVariantReportsList();
            loadBloodVariantReportsList();
            loadPatientPendingAssignmentReportsList();
            loadDashboardStatisticsData();
        }
    }

} ());