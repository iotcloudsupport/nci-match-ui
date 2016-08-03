(function () {
    angular.module('matchbox.dashboard', [])
        .controller('DashboardController', DashboardController);

    function DashboardController($scope, matchApi, store, DTOptionsBuilder, sharedCliaProperties, arrayTools) {
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

        $scope.top_5_arms = [];
        $scope.top_5_arm_labels = [];
        $scope.top_5_arm_counts = [];
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
        $scope.loadTreatmentArmAccrualData = loadTreatmentArmAccrualData;
        $scope.setCanvasHeight = setCanvasHeight;
        $scope.loadSequencedAndConfirmedChartData = loadSequencedAndConfirmedChartData;
        $scope.loadTissueVariantReportsList = loadTissueVariantReportsList;
        $scope.loadBloodVariantReportsList = loadBloodVariantReportsList;
        $scope.loadPatientPendingAssignmentReportsList = loadPatientPendingAssignmentReportsList;
        $scope.loadDashboardData = loadDashboardData;

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
                });
        }

        function loadTreatmentArmAccrualData() {
            matchApi
                .loadTreatmentArmAccrual()
                .then(function (d) {
                    $scope.top_5_arms = d.data.arms;
                    angular.forEach($scope.top_5_arms, function(value) {
                        $scope.top_5_arm_labels.push(value.name + " (" + value.stratum + ")");
                        $scope.top_5_arm_counts.push(value.patients);
                    });
                    $scope.barData = {
                        labels: $scope.top_5_arm_labels, //d.data.arm_names,
                        datasets: [
                            {
                                label: "Accrual Dataset",
                                fillColor: "#1c84c6",
                                strokeColor: "rgba(220,220,220,0.8)",
                                highlightFill: "#23c6c8", //"rgba(220,220,220,0.75)",
                                highlightStroke: "rgba(220,220,220,1)",
                                data: $scope.top_5_arm_counts //d.data.arm_values
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
                    };
                });
            
        }

        function loadSequencedAndConfirmedChartData() {
            matchApi
                .loadSequencedAndConfirmedChartData()
                .then(function (d) {
                    var stats = d.data;
                    
                    var aMoiLabels = [
                        '<span class="chart-legend-digit">0</span> aMOI', 
                        '<span class="chart-legend-digit">1</span> aMOI', 
                        '<span class="chart-legend-digit">2</span> aMOI', 
                        '<span class="chart-legend-digit">3</span> aMOI', 
                        '<span class="chart-legend-digit">4</span> aMOI', 
                        '<span class="chart-legend-digit">5+</span> aMOI'
                        ];
                    var aMoiHighlight = "#000088";

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
                        legendTemplate: '<ul class="dashboard donut-chart-legend"><% for (var i=0; i<segments.length; i++) {%><i class="fa fa-square" style="color: <%=segments[i].fillColor%>" ></i> <%if(segments[i].label){%><%=segments[i].label%> : <strong><%=segments[i].value%> patients</strong> <%}%><br><%}%></ul>'
                    };

                    $scope.donutData = [
                        {
                            value: stats.patients_with_0_amois,
                            color: "#23c6c8",
                            highlight: aMoiHighlight,
                            label: aMoiLabels[0]
                        },
                        {
                            value: stats.patients_with_1_amois,
                            color: "#1c84c6",
                            highlight: aMoiHighlight,
                            label: aMoiLabels[1]
                        },
                        {
                            value: stats.patients_with_2_amois,
                            color: "#18a689", //"#ab0102",
                            highlight: aMoiHighlight,
                            label: aMoiLabels[2]
                        },
                        {
                            value: stats.patients_with_3_amois,
                            color: "#f8ac59",
                            highlight: aMoiHighlight,
                            label: aMoiLabels[3]
                        },
                        {
                            value: stats.patients_with_4_amois,
                            color: "#707070",
                            highlight: aMoiHighlight,
                            label: aMoiLabels[4]
                        },
                        {
                            value: stats.patients_with_5_or_more_amois,
                            color: "#cfcfcf",
                            highlight: aMoiHighlight,
                            label: aMoiLabels[5]
                        }
                    ]; 
                });

        }
        
        function loadTissueVariantReportsList() {
            matchApi
                .loadTissueVariantReportsList()
                .then(function (d) {
                    $scope.pendingTissueVariantReportList = d.data;
                    arrayTools.forEach($scope.pendingTissueVariantReportList, function(element) {
                        calculateDaysPending(element, 'status_date');
                    });
                });
        }

        function calculateDaysPending(element, dateAttr) {
            var dateValue = element[dateAttr];
            if (dateValue) {
                var now = moment();
                var dateValueMoment = moment(dateValue);
                var diff = dateValueMoment.diff(now, "DD/MM/YYYY HH:mm:ss");
                element.days_pending = moment.duration(diff).days();
            } else {
                element.days_pending = '-';
            }
        }

        function loadBloodVariantReportsList() {
            matchApi
                .loadBloodVariantReportsList()
                .then(function(d) {
                    $scope.pendingBloodVariantReportList = d.data;
                    arrayTools.forEach($scope.pendingTissueVariantReportList, function(element) {
                        calculateDaysPending(element, 'status_date');
                    });
                });
        }

        function loadPatientPendingAssignmentReportsList() {
            matchApi
                .loadPatientPendingAssignmentReportsList()
                .then(function(d) {
                    $scope.pendingAssignmentReportList = d.data;
                    arrayTools.forEach($scope.pendingTissueVariantReportList, function(element) {
                        calculateDaysPending(element, 'status_date');
                    });
                });
        }

        function loadDashboardData() {
            loadTissueVariantReportsList();
            loadBloodVariantReportsList();
            loadPatientPendingAssignmentReportsList();
            loadDashboardStatisticsData();
        }
    }

} ());