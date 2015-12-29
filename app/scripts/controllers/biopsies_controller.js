angular.module('biopsies.matchbox',[])
    .controller('BiopsiesController', function( $scope, $http, matchConfig, DTOptionsBuilder, DTColumnDefBuilder, biopsySequenceService ) {
        this.dtOptions = DTOptionsBuilder.newOptions()
            .withDisplayLength(100);
        this.dtColumnDefs = [];
        this.dtInstance = {};

        $scope.biopsiesList = [];

        $scope.loadBiopsiesList = function() {
            biopsySequenceService
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
                                    });
                                } else {
                                    $scope.biopsiesList.push(biopsyTemplate);
                                }
                            });
                        }
                    });
                });
        };
    });
