(function () {
    angular.module('matchbox.specimen-tracking',['ui.bootstrap','cgPrompt', 'ui.router','datatables','ngResource'])
        .controller('SpecimenTrackingController', SpecimenTrackingController);

    function SpecimenTrackingController( $scope,
                                         $http,
                                         matchConfig,
                                         DTOptionsBuilder,
                                         matchApi,
                                         sharedCliaProperties) {

        this.dtOptions = DTOptionsBuilder
            .newOptions()
            .withOption('info', false);
        this.dtOptions = DTOptionsBuilder
            .newOptions()
            .withOption('paging', false);

        this.dtColumnDefs = [];
        this.dtInstance = {};

        $scope.clialab = function (id) {
            sharedCliaProperties.setProperty(id);
        };

        $scope.loadSpecimenTrackingList = loadSpecimenTrackingList;

        $scope.shipments = [];

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

        function loadSpecimenTrackingList() {
            matchApi
                .loadSpecimenTrackingList()
                .then(function (d) {
                    $scope.shipments = angular.copy(d.data);
                    setupSites();
                    updateSiteStatistics();
                    setupTrendAnalysisData();
                });
        }

        function setupSites() {
            angular.forEach($scope.shipments, function(value) {
                var shipment = value;
                angular.forEach(shipment.assays, function() {
                    if (shipment.destination && shipment.destination.toUpperCase() === 'MOCHA') 
                        $scope.sites.mocha.count++;
                    else if (shipment.destination && shipment.destination.toUpperCase() === 'MDA') 
                        $scope.sites.mda.count++;
                });
            });
        }

        function updateSiteStatistics() {
            var total = $scope.sites.mocha.count + $scope.sites.mda.count;
            total = (total === 0) ? 1 : total;

            $scope.sites.mda.percent = Math.round(calculatePercent($scope.sites.mda.count, total));
            $scope.sites.mocha.percent = Math.round(calculatePercent($scope.sites.mocha.count, total));
            $scope.pieDataset[0].data = $scope.sites.mda.count;
            $scope.pieDataset[1].data = $scope.sites.mocha.count;
        }

        function setupTrendAnalysisData() {
            angular.forEach($scope.shipments, function(value) {
                var start = moment(value.collected_date);
                var shipped = moment(value.shipped_date);
                var pathology = moment(value.pathology_status_date);
                var shippedDuration = moment.duration(shipped.diff(start)).asDays();
                var concordanceDuration = moment.duration(pathology.diff(shipped)).asDays();

                var chartDataItemShipped = [];
                var chartDataItemConcordance = [];

                //chartDataItem.push(start.toString());
                chartDataItemShipped.push(start.valueOf());
                chartDataItemShipped.push(shippedDuration);
                $scope.chartData[0].data.push(chartDataItemShipped);
                chartDataItemConcordance.push(start.valueOf());
                chartDataItemConcordance.push(concordanceDuration);
                $scope.chartData[1].data.push(chartDataItemConcordance);
            });

            var xLabel = $("<div style='position:absolute;text-align:center;font-size:12px;bottom:3px;left:0;right:0;'></div>").text("Specimen Collected Date").appendTo($('#trendChart'));
        }

        $scope.chartData = [
            {
                label: "Specimen Shipped",
                data: []
            },
            {
                label: "Concordance",
                data: []
            }

        ];

        calculatePercent = function (numerator, denominator) {
            return (numerator / denominator) * 100;
        }
        
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
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                //tickDecimals: 0
                mode: "time",
                timeformat: "%d-%b-%y"
                //tickSize: [1, 'minute']
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


