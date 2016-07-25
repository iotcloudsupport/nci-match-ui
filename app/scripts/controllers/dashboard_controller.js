(function () {
    angular.module('dashboard.matchbox', [])
        .controller('DashboardController', DashboardController)
        .controller('ActivityController', ActivityController);

    function DashboardController($scope, matchApiMock, store, DTOptionsBuilder) { //workflowApi
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
        $scope.loadChartjsDonutChartData = loadChartjsDonutChartData;
        $scope.loadTissueVariantReportsList = loadTissueVariantReportsList;
        $scope.loadBloodVariantReportsList = loadBloodVariantReportsList;
        $scope.loadPatientPendingAssignmentReportsList = loadPatientPendingAssignmentReportsList;
        $scope.loadDashboardData = loadDashboardData;

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
            matchApiMock
                .loadDashboardStatistics()
                    .then(function (d) {
                        $scope.numberOfPatients = d.data.number_of_patients;
                        $scope.numberOfScreenedPatients = d.data.number_of_screened_patients;
                        $scope.numberOfPatientsWithTreatment = d.data.number_of_patients_with_treatment;
                    });
        }

        function loadTreatmentArmAccrualData() {
            matchApiMock
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

        function loadChartjsDonutChartData() {
            matchApiMock
                .loadChartjsDonutChart()
                .then(function (d) {
                    var aMoiValues = d.data.aMoiValues;
                    var aMoiLabels = ['0 aMOI', '1 aMOI', '2 aMOI', '3 aMOI', '4 aMOI', '5+ aMOI'];
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
                        legendTemplate: '<ul><% for (var i=0; i<segments.length; i++) {%><i class="fa fa-square" style="color: <%=segments[i].fillColor%>" ></i> <%if(segments[i].label){%><%=segments[i].label%> : <%=segments[i].value%> patients <%}%><br><%}%></ul>'
                    };


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
                });

        }
        
        function loadTissueVariantReportsList() {
            matchApiMock
                .loadTissueVariantReportsList()
                .then(function (d) {
                    $scope.pendingTissueVariantReportList = d.data;
                });
        }

        function loadBloodVariantReportsList() {
            matchApiMock
                .loadBloodVariantReportsList()
                .then(function(d) {
                    $scope.pendingBloodVariantReportList = d.data;
                });
        }

        function loadPatientPendingAssignmentReportsList() {
            matchApiMock
                .loadPatientPendingAssignmentReportsList()
                .then(function(d) {
                    $scope.pendingAssignmentReportList = d.data;
                });
            
        }

        function loadDashboardData() {
            loadTissueVariantReportsList();
            loadBloodVariantReportsList();
            loadPatientPendingAssignmentReportsList();
            loadDashboardStatisticsData();
        }
    }

    function ActivityController(matchApiMock, $stateParams, $log) {
        var vm = this; 

        vm.data = [];
        vm.loadData = loadData;
        vm.maxItems = 10;

        function loadData() {
            matchApiMock
                .loadActivity($stateParams.patient_id)
                .then(setupScope, handleActivityLoadError);
        }

        function handleActivityLoadError(e) {
            $log.error(e);
            return;
        }
        
        function setupScope(data) {
            vm.data = [];
            angular.copy(data.data, vm.data);

            var now = moment();
            var previousStep = null;

            for (var i = 0; i < vm.data.length && i < vm.maxItems; i++) {
                var timelineEvent = angular.copy(data.data[i]);
                vm.data.push(timelineEvent);
                var eventDateMoment = moment(timelineEvent.event_date);
                var diff = eventDateMoment.diff(now, "DD/MM/YYYY HH:mm:ss");
                timelineEvent.from_now = moment.duration(diff).humanize(true);

                if (previousStep && previousStep !== timelineEvent.step) {
                    timelineEvent.isStepChanging = true;
                    previousStep = timelineEvent.step;
                }

                if (!previousStep) {
                    previousStep = timelineEvent.step;
                }
            }
        }
        


    }

} ());