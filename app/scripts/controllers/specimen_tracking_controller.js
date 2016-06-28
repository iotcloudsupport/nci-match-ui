angular.module('specimen-tracking.matchbox',[])
    .controller('SpecimenTrackingController', function( $scope, $http, matchConfig, DTOptionsBuilder, DTColumnDefBuilder, matchApi ) {
        this.dtOptions = DTOptionsBuilder.newOptions()
            .withDisplayLength(100);
        this.dtColumnDefs = [];
        this.dtInstance = {};

        $scope.specimenTrackingList = [];
        $scope.sites = {
            'mgh': {
                'count': 0,
                'percent': 0
            },
            'yale': {
                'count': 0,
                'percent': 0
            },
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
                label: "SUCCESSES",
                data: 5,
                color: "#f8ac59",
                psns: "215re, 203re, 312re"
            },
            {
                label: "FAILURES",
                data: 2,
                color: "#707070",
                psns: "205re, 206re"
            }
        ];

        $scope.pieDataset2 = [
            {
                label: "MDA",
                data: 12,
                color: "#1ab394",
                psns: "215re, 203re, 312re"
            },
            {
                label: "Mocha",
                data: 15,
                color: "#1c84c6",
                psns: "205re, 206re"
            }
        ];

        //mda mocha "#1ab394" "#1c84c6"
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
                    content: function(label, xval, yval) {
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

        $scope.pieOptions2 = setupPieChartOptions('#legendContainer2');

        $scope.loadSpecimenTrackingList = function() {
            matchApi
                .getPatientSpecimentTrackingSummary()
                .then(function(d) {
                    angular.forEach(d.data, function (value, key) {
                        var patientSequenceNumber = value.patientSequenceNumber;
                        if (angular.isDefined(value.biopsies) && angular.isArray(value.biopsies)) {
                            angular.forEach(value.biopsies, function (value, key) {
                                var biopsyTemplate = {
                                    'patientSequenceNumber': patientSequenceNumber,
                                    'biopsySeqenuceNumber': value.biopsySequenceNumber,
                                    'molecular_id': '-',
                                    'lab': '-',
                                    'trackingNumber': '-',
                                    'specimenReceivedDate': value.specimenReceivedDate,
                                    'specimenFailureDate': value.specimenFailureDate,
                                    'ptenOrderDate': value.ptenOrderDate,
                                    'ptenResultDate': value.ptenResultDate,
                                    'pathologyReviewDate': value.pathologyReviewdate,
                                    'nucleicAcidSendoutDate': '-'
                                };

                                if (angular.isDefined(value.samples) && angular.isArray(value.samples)) {
                                    angular.forEach(value.samples, function (value, key) {
                                        biopsyWithSample = angular.copy(biopsyTemplate);
                                        biopsyWithSample.molecular_id = value.molecularSequenceNumber;
                                        biopsyWithSample.lab = value.lab;
                                        biopsyWithSample.trackingNumber = value.trackingNumber;
                                        biopsyWithSample.nucleicAcidSendoutDate = value.dnaShippedDate;
                                        $scope.specimenTrackingList.push(biopsyWithSample);

                                        if (value.lab === 'MGH') $scope.sites.mgh.count++;
                                        if (value.lab === 'Yale') $scope.sites.yale.count++;
                                        if (value.lab === 'MoCha') $scope.sites.mocha.count++;
                                        if (value.lab === 'MDACC') $scope.sites.mda.count++;
                                    });
                                } else {
                                    $scope.specimenTrackingList.push(biopsyTemplate);
                                }
                            });
                        }
                    });

                    updateSiteStatistics();
                });
        };

        updateSiteStatistics = function() {
            var total = $scope.sites.mgh.count + $scope.sites.yale.count + $scope.sites.mocha.count + $scope.sites.mda.count;
            total = (total === 0) ? 1 : total;

            $scope.sites.mgh.percent = calculatePercent($scope.sites.mgh.count, total);
            $scope.sites.yale.percent = calculatePercent($scope.sites.yale.count, total);
            $scope.sites.mda.percent = calculatePercent($scope.sites.mda.count, total);
            $scope.sites.mocha.percent = calculatePercent($scope.sites.mocha.count, total);
        }

        calculatePercent = function(numerator, denominator) {
            return (numerator / denominator) * 100;
        }
    });
