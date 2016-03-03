angular.module('biopsies.matchbox',[])
    .controller('BiopsiesController', function( $scope, $http, matchConfig, DTOptionsBuilder, DTColumnDefBuilder, matchApi ) {
        this.dtOptions = DTOptionsBuilder.newOptions()
            .withDisplayLength(100);
        this.dtColumnDefs = [];
        this.dtInstance = {};

        $scope.biopsiesList = [];
        $scope.sites = {
            'mgh': 0,
            'yale': 0,
            'mocha': 0,
            'mda': 0,
            'total': 0
        }

        $scope.loadBiopsiesList = function() {
            matchApi
                .getBiopsySequenceList()
                .then(function(d) {
                    angular.forEach(d.data, function (value, key) {
                        var patientSequenceNumber = value.patientSequenceNumber;
                        if (angular.isDefined(value.biopsies) && angular.isArray(value.biopsies)) {
                            angular.forEach(value.biopsies, function (value, key) {
                                var biopsyTemplate = {
                                    'patientSequenceNumber': patientSequenceNumber,
                                    'biopsySeqenuceNumber': value.biopsySequenceNumber,
                                    'molecularSequenceNumber': '-',
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
                                        biopsyWithSample.molecularSequenceNumber = value.molecularSequenceNumber;
                                        biopsyWithSample.lab = value.lab;
                                        biopsyWithSample.trackingNumber = value.trackingNumber;
                                        biopsyWithSample.nucleicAcidSendoutDate = value.dnaShippedDate;
                                        $scope.biopsiesList.push(biopsyWithSample);
                                        if (value.lab === 'MGH') $scope.sites.mgh++;
                                        if (value.lab === 'Yale') $scope.sites.yale++;
                                        if (value.lab === 'MoCha') $scope.sites.mocha++;
                                        if (value.lab === 'MDACC') $scope.sites.mda++;
                                    });
                                } else {
                                    $scope.biopsiesList.push(biopsyTemplate);
                                }
                            });
                        }
                    });

                    var total = $scope.sites.mgh + $scope.sites.yale + $scope.sites.mocha + $scope.sites.mda;
                    $scope.sites.total = (total === 0) ? 1 : total;
                });
        };
    });
