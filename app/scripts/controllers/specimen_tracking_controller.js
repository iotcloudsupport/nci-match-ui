(function () {
    angular.module('specimen-tracking.matchbox',[])
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
        }

        updateSiteStatistics = function () {
            var total = $scope.sites.mocha.count + $scope.sites.mda.count;
            total = (total === 0) ? 1 : total;

            $scope.sites.mda.percent = Math.round(calculatePercent($scope.sites.mda.count, total));
            $scope.sites.mocha.percent = Math.round(calculatePercent($scope.sites.mocha.count, total));
            $scope.pieDataset[0].data = $scope.sites.mda.count;
            $scope.pieDataset[1].data = $scope.sites.mocha.count;
        }

        calculatePercent = function (numerator, denominator) {
            return (numerator / denominator) * 100;
        }
    }
}());


