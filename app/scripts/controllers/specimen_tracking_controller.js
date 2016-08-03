(function () {
    angular.module('matchbox.specimen-tracking',[])
        .controller('SpecimenTrackingController', SpecimenTrackingController);

    function SpecimenTrackingController( $scope,
                                         $http,
                                         matchConfig,
                                         DTOptionsBuilder,
                                         matchApiMock,
                                         sharedCliaProperties) {

        this.dtOptions = DTOptionsBuilder.newOptions()
            .withDisplayLength(100);
        this.dtColumnDefs = [];
        this.dtInstance = {};

        this.ddOptions = {
            'info': false,
            'paging': false
        };

        $scope.clialab = function (id) {
            sharedCliaProperties.setProperty(id);
        };

        $scope.loadSpecimenTrackingList = loadSpecimenTrackingList;

        $scope.specimenTrackingList = [];

        $scope.sites = {
            'mda': {
                'count': 0,
                'percent': 0
            },
            'mocha': {
                'count': 0,
                'percent': 0
            }
        }

        $scope.pieDataset = [
            {
                label: "MDA",
                data: 0,
                color: "#1ab394"
            },
            {
                label: "Mocha",
                data: 0,
                color: "#1c84c6"
            }
        ];
        
        $scope.showHideRow = function() {
            
        }

        function setupTooltip(label, xval, yval) {
            return label + "<br>------------------------------------------<br>Assays: " + yval;
        }

        function setupPieChartOptions(htmlContainer) {
            return {
                series: {
                    pie: {
                        show: true
                    }
                },
                grid: {
                    hoverable: true
                },
                tooltip: true,
                tooltipOpts: {
                    content: function (label, xval, yval) {
                        return setupTooltip(label, xval, yval);
                    },
                    shifts: {
                        x: 20,
                        y: 0
                    },
                    defaultTheme: true
                },
                legend: {
                    show: true,
                    container: htmlContainer
                }
            };
        }

        $scope.pieOptions = setupPieChartOptions('#legendContainer');

        function setupSites() {
            angular.forEach($scope.specimenTrackingList, function(value) {
                var biopsy = value;
                angular.forEach(biopsy.assays, function() {
                    if (biopsy.site === 'MoCha') $scope.sites.mocha.count++;
                    if (biopsy.site === 'MDA') $scope.sites.mda.count++;
                });
            });
        }

        function loadSpecimenTrackingList() {
            matchApiMock
                .loadSpecimenTrackingList()
                .then(function (d) {
                    $scope.specimenTrackingList = d.data;
                })
                .then (setupSites)
                .then (updateSiteStatistics)
                .then(setupTrendAnalysisData)
        }

        updateSiteStatistics = function () {
            var total = $scope.sites.mocha.count + $scope.sites.mda.count;
            total = (total === 0) ? 1 : total;

            $scope.sites.mda.percent = Math.round(calculatePercent($scope.sites.mda.count, total));
            $scope.sites.mocha.percent = Math.round(calculatePercent($scope.sites.mocha.count, total));
            $scope.pieDataset[0].data = $scope.sites.mda.count;
            $scope.pieDataset[1].data = $scope.sites.mocha.count;
        }

        setupTrendAnalysisData = function() {
            angular.forEach($scope.specimenTrackingList, function(value) {
                console.log('value');
                console.log(value);
                console.log('collected_date');
                console.log(value.collected_date);
                //console.log(value.shipped_date - value.collected_date);
                //console.log(value.pathology_status_date - value.shipped_date);
                console.log(moment(value.collected_date).isValid());
                var start = moment(value.collected_date);
                var end = moment(value.shipped_date);
                var duration = moment.duration(end.diff(start));
                console.log(duration.asDays());
                $scope.chartData[0].data.push(1470069480018, 39);
            });
        }

        $scope.chartData = [
            {
                label: "Concordance Date",
                data: [
                    [1470059187808, 1.3],
                    [1470059230071, 1.0],
                    [1470059317984, 0.6],
                    [1470059480018, 2.1]/*,
                     [5, 30],
                     [6, 45],
                     [7, 34],
                     [8, 25],
                     [9, 19],
                     [10, 34],
                     [11, 32],
                     [12, 44]*/
                ]
            },
            {
                label: "Specimen Shipped Date",
                data: [
                    [1470059187808, 1.0],
                    [1470059230071, 0.7],
                    [1470059317984, 3.1],
                    [1470059480018, 1.5]/*,
                     [5, 32],
                     [6, 44],
                     [7, 34],
                     [8, 25],
                     [9, 19],
                     [10, 34],
                     [11, 32],
                     [12, 44]*/
                ]
            }

        ];

        calculatePercent = function (numerator, denominator) {
            return (numerator / denominator) * 100;
        }

        console.log((new Date()).getTime());
        /**
         * Line Chart Options
         */
        $scope.lineOptions = {
            series: {
                stack: true,
                lines: {
                    show: true,
                    lineWidth: 2,
                    fill: true,
                    fillColor: {
                        colors: [
                            {
                                opacity: 0.0
                            },
                            {
                                opacity: 0.0
                            }
                        ]
                    }
                }
            },
            xaxis: {
                //tickDecimals: 0
                mode: "time",
                timeformat: "%d-%b-%y %H:%M:%S",
                tickSize: [1, 'minute']
            },
            colors: ["#1ab394"],
            grid: {
                color: "#999999",
                hoverable: true,
                clickable: true,
                tickColor: "#D4D4D4",
                borderWidth: 0
            },
            legend: {
                show: true
            },
            tooltip: true,
            tooltipOpts: {
                content: "collected: %x, days elapsed: %y"
            }
        };


    }
}());


