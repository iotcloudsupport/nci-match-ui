(function () {
    angular.module('matchbox.dashboard', [])
        .controller('DashboardController', DashboardController);

    function DashboardController(
            $scope, 
            matchApi, 
            store, 
            sharedCliaProperties, 
            arrayTools, 
            dateTools,
            $filter,
            $location,
            $anchorScroll) {

        $scope.numberOfPatients = '?';
        $scope.numberOfScreenedPatients = '?';
        $scope.numberOfPatientsWithTreatment = '?';
        $scope.numberOfPendingAssignmentReports = '?';
        $scope.numberOfPendingTissueVariantReports = '?';
        $scope.numberOfPendingBloodVariantReports = '?';

        $scope.pendingAssignmentReportList = [];

        $scope.pendingTissueVariantReportGridActions = {};
        $scope.pendingBloodVariantReportGridActions = {};
        $scope.pendingAssignmentReportGridActions = {};        

        $scope.pendingTissueVariantReportGridOptions = {};
        $scope.pendingBloodVariantReportGridOptions = {};
        $scope.pendingAssignmentReportGridOptions = {};        

        $scope.patientStatistics = {};

        $scope.days_pending_range = {
            "upper_bound_green": 8,
            "upper_bound_yellow": 14
        };

        $scope.hours_pending_range = {
            "upper_bound_green": 8,
            "upper_bound_yellow": 14
        };

        $scope.loadDashboardStatisticsData = loadDashboardStatisticsData;
        $scope.setCanvasHeight = setCanvasHeight;
        $scope.setCanvasSize = setCanvasSize;
        $scope.loadSequencedAndConfirmedChartData = loadSequencedAndConfirmedChartData;
        $scope.loadTissueVariantReportsList = loadTissueVariantReportsList;
        $scope.loadBloodVariantReportsList = loadBloodVariantReportsList;
        $scope.loadPendingAssignmentReportsList = loadPendingAssignmentReportsList;
        $scope.loadDashboardData = loadDashboardData;
        $scope.goto = goto;

        var aMoiLabels = [
            '0 aMOI',
            '1 aMOI',
            '2 aMOI',
            '3 aMOI',
            '4 aMOI',
            '5+ aMOI'
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
            legendTemplate: false
        };

        Chart.defaults.global.legend = false;

        activate();

        function activate() {
            setupGridOptions();
        }

        function setupGridOptions() {
            $scope.pendingTissueVariantReportGridOptions = {
                data: [],
                ngColumnFilters: {
                    "specimen_received_date": "utc", 
                    "variant_report_received_date": "utc"
                },
                sort: {
                    predicate: 'days_pending',
                    direction: 'desc'
                },
                searchableProps: [
                    'patient_id',
                    'molecular_id',
                    'analysis_id',
                    'clia_lab',
                    'specimen_received_date',
                    'variant_report_received_date',
                    'days_pending'
                ],
                customFilters: {
                    filterAll: function (items, value, predicate) {
                        return items.filter(function (item) {
                            return arrayTools.itemHasValue(item, value, 
                                $scope.pendingTissueVariantReportGridOptions.searchableProps, $scope.pendingTissueVariantReportGridOptions.ngColumnFilters, $filter);
                        });
                    }
                }
            };

            $scope.pendingBloodVariantReportGridOptions = {
                data: [],
                ngColumnFilters: {
                    "specimen_received_date": "utc", 
                    "variant_report_received_date": "utc"
                },
                sort: {
                    predicate: 'days_pending',
                    direction: 'desc'
                },
                searchableProps: [
                    'patient_id',
                    'molecular_id',
                    'analysis_id',
                    'clia_lab',
                    'specimen_received_date',
                    'variant_report_received_date',
                    'days_pending'
                ],
                customFilters: {
                    filterAll: function (items, value, predicate) {
                        return items.filter(function (item) {
                            return arrayTools.itemHasValue(item, value, 
                                $scope.pendingBloodVariantReportGridOptions.searchableProps, $scope.pendingBloodVariantReportGridOptions.ngColumnFilters, $filter);
                        });
                    }
                }
            };

            $scope.pendingAssignmentReportGridOptions = {
                data: [],
                ngColumnFilters: {
                    "assigned_date": "utc"
                },
                sort: {
                    predicate: 'hours_pending',
                    direction: 'desc'
                },
                searchableProps: [
                    'patient_id',
                    'molecular_id',
                    'analysis_id',
                    'disease',
                    'assigned_date',
                    'hours_pending',
                    'treatment_arm_title'
                ],
                customFilters: {
                    filterAll: function (items, value, predicate) {
                        return items.filter(function (item) {
                            return arrayTools.itemHasValue(item, value, 
                                $scope.pendingAssignmentReportGridOptions.searchableProps, $scope.pendingAssignmentReportGridOptions.ngColumnFilters, $filter);
                        });
                    }
                }
            };
        }

        function loadTissueVariantReportsList() {
            matchApi
                .loadTissueVariantReportsList()
                .then(function (d) {
                    $scope.pendingTissueVariantReportGridOptions.data = d.data;
                    calculateDaysPending($scope.pendingTissueVariantReportGridOptions.data);
                });
        }

        function loadBloodVariantReportsList() {
            matchApi
                .loadBloodVariantReportsList()
                .then(function (d) {
                    $scope.pendingBloodVariantReportGridOptions.data = d.data;
                    calculateDaysPending($scope.pendingBloodVariantReportGridOptions.data);
                });
        }

        function loadPendingAssignmentReportsList() {
            matchApi
                .loadPendingAssignmentReportsList()
                .then(function (d) {
                    $scope.pendingAssignmentReportGridOptions.data = d.data;
                    calculateHoursPending($scope.pendingAssignmentReportGridOptions.data);
                });
        }

        function calculateDaysPending(data) {
            arrayTools.forEach(data, function (element) {
                var days_pending = dateTools.calculateDaysPending(element, 'status_date');
                element.days_pending = days_pending || days_pending === 0 ? days_pending : '-';
            });
        }

        function calculateHoursPending(data) {
            arrayTools.forEach(data, function (element) {
                var hours_pending = dateTools.calculateHoursPending(element, 'status_date');
                element.hours_pending = hours_pending || hours_pending === 0 ? hours_pending : '-';
            });
        }

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

        function setCanvasHeight(elementName, heightVal) {
            var ctx = $(elementName)[0].getContext('2d');
            ctx.canvas.height = heightVal;
        }

        function setCanvasSize(elementName, heightVal, widthVal) {
            var ctx = $(elementName)[0].getContext('2d');
            ctx.canvas.height = heightVal;
            ctx.canvas.width = widthVal;
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

treatment_arm_accrual = [
        {
            "name": "TA123",
            "stratum_id": "STR7",
            "patients": "10"
        },
        {
            "name": "TA345",
            "stratum_id": "STR7",
            "patients": "10"
        },
        {
            "name": "TA567",
            "stratum_id": "STR7",
            "patients": "10"
        }
    ];

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

        function loadDashboardData() {
            loadSequencedAndConfirmedChartData();
            loadTissueVariantReportsList();
            loadBloodVariantReportsList();
            loadPendingAssignmentReportsList();
            loadDashboardStatisticsData();
        }

        function goto(section) {
            $location.hash(section);
            $anchorScroll();
        }
    }

} ());