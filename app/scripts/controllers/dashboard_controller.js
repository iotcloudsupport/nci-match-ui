(function () {
    angular.module('dashboard.matchbox', [])
        .controller('DashboardController', DashboardController);

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

        $scope.activityList = [];

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

        $scope.loadDashboardStatisticsData = loadDashboardStatisticsData;
        $scope.loadTreatmentArmAccrualData = loadTreatmentArmAccrualData;
        $scope.setCanvasHeight = setCanvasHeight;
        $scope.loadChartjsDonutChartData = loadChartjsDonutChartData;
        $scope.loadTissueVariantReportsList = loadTissueVariantReportsList;
        $scope.loadBloodVariantReportsList = loadBloodVariantReportsList;
        $scope.loadPatientPendingAssignmentReportsList = loadPatientPendingAssignmentReportsList;
        $scope.loadActivityList = loadActivityList;

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
                    $scope.numberOfPendingAssignmentReports = d.data.number_of_pending_assignment_reports;
                    $scope.numberOfPendingTissueVariantReports = d.data.number_of_pending_tissue_variant_reports;
                    $scope.numberOfPendingBloodVariantReports = d.data.number_of_pending_blood_variant_reports;
                });
        };

        function loadTreatmentArmAccrualData() {
            matchApiMock
                .loadTreatmentArmAccrual()
                .then(function (d) {
                    $scope.barData = {
                        labels: d.data.arm_names,
                        datasets: [
                            {
                                label: "Accrual Dataset",
                                fillColor: "#1c84c6",
                                strokeColor: "rgba(220,220,220,0.8)",
                                highlightFill: "#23c6c8", //"rgba(220,220,220,0.75)",
                                highlightStroke: "rgba(220,220,220,1)",
                                data: d.data.arm_values
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
                        responsive: true //,
                        //legendTemplate: '<ul><% for (var i=0; i<segments.length; i++) {%><i class="fa fa-square" style="color: <%=segments[i].fillColor%>" ></i> <%if(segments[i].label){%><%=segments[i].label%> : <%=segments[i].value%> patients <%}%><br><%}%></ul>'
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

        function setupActivityList(listSize, entryMax) {
            for (var i = 0; i < entryMax; i++) {
                $scope.activityList.push($scope.activityListData[listSize + i]);
                //console.log($scope.activityList);

            }
            //console.log($scope.activityList);
        }

        function loadActivityList() {
            /*$scope.activityListData = [
                {
                    "pic": $scope.icons[4],
                    "status": "activity-feed-icon",
                    "patient_id": '100025',
                    "time": 1421175969643,
                    "age": '3m',
                    "displayName": $scope.message[0]
                },
                {
                    "pic": $scope.icons[2],
                    "status": "activity-feed-icon",
                    "patient_id": '',
                    "treatment_arm": { "name": "APEC1621-A", "version": "2016-03-17", "stratum": "STR1" },
                    "time": 1421175969643,
                    "age": '3m',
                    "displayName": $scope.message[4]
                },
                {
                    "pic": $scope.icons[3],
                    "status": "activity-feed-icon",
                    "patient_id": '100025',
                    "molecular_id": 'MOL001_1',
                    "surgical_event_id": 'SUREVT002',
                    "time": 1421171969643,
                    "age": '5m',
                    "displayName": $scope.message[1]
                },
                {
                    "pic": $scope.icons[2],
                    "status": "activity-feed-icon",
                    "patient_id": '',
                    "treatment_arm": { "name": "APEC1621-Z", "version": "2016-03-17", "stratum": "STR1" },
                    "time": 1421169969643,
                    "age": '5m',
                    "displayName": $scope.message[5]
                },
                {
                    "pic": $scope.icons[3],
                    "status": "activity-feed-icon",
                    "patientId": '100136',
                    "molecular_id": 'MOL001_1',
                    "surgical_event_id": 'SUREVT002',
                    "time": 1421165969643,
                    "age": '18m',
                    "displayName": $scope.message[1]
                },
                {
                    "pic": $scope.icons[1],
                    "status": "activity-feed-icon",
                    "patient_id": '100025',
                    "molecular_id": 'MOL001_1',
                    "surgical_event_id": 'SUREVT002',
                    "time": 1421162969643,
                    "age": '5h',
                    "displayName": $scope.message[2]
                },
                {
                    "pic": $scope.icons[2],
                    "status": "activity-feed-icon",
                    "patient_id": '',
                    "treatment_arm": { "name": "APEC1621-A", "version": "2016-03-17", "stratum": "STR1" },
                    "time": 1421162969643,
                    "age": '5h',
                    "displayName": $scope.message[3]
                },
                {
                    "pic": $scope.icons[3],
                    "status": "activity-feed-icon",
                    "patient_id": '100025',
                    "molecular_id": 'MOL001_1',
                    "surgical_event_id": 'SUREVT002',
                    "time": 1421160969643,
                    "age": '6d',
                    "displayName": $scope.message[6]
                },
                {
                    "pic": $scope.icons[4],
                    "status": "activity-feed-icon",
                    "patientId": '100025',
                    "time": 1421155768643,
                    "age": '1y',
                    "displayName": $scope.message[0]
                },
                {
                    "pic": $scope.icons[1],
                    "status": "activity-feed-icon",
                    "patientId": '100025',
                    "molecular_id": 'MOL001_1',
                    "surgical_event_id": '125',
                    "time": 1421162969643,
                    "age": '5h',
                    "displayName": $scope.message[2]
                },
                {
                    "pic": $scope.icons[3],
                    "status": "activity-feed-icon",
                    "patient_id": '100025',
                    "molecular_id": 'MOL001_1',
                    "surgical_event_id": 'SUREVT002',
                    "time": 1421160969643,
                    "age": '6d',
                    "displayName": $scope.message[6]
                },
                {
                    "pic": $scope.icons[4],
                    "status": "activity-feed-icon",
                    "patient_id": '100025',
                    "surgical_event_id": 'SUREVT002',
                    "time": 1421155768643,
                    "age": '1y',
                    "displayName": $scope.message[0]
                },
                {
                    "pic": $scope.icons[4],
                    "status": "activity-feed-icon",
                    "patient_id": '100025',
                    "surgical_event_id": 'SUREVT002',
                    "time": 1421155768643,
                    "age": '1y',
                    "displayName": $scope.message[0]
                }
            ];*/





            matchApiMock
                .loadActivityList()
                .then(function(d) {
                    console.log(d);
                    $scope.activityListData = d.data;
                    var listSize = $scope.activityList.length;
                    setupActivityList(listSize, 10);
                });
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
        }

    }


} ());