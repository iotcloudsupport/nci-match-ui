angular.module('biopsies.matchbox',[])
    .controller('BiopsiesController', function( $scope, $http, matchConfig ) {

        $scope.biopsiesList = []

        $scope.loadBiopsiesList = function() {
            $http.get(matchConfig.matchApiBaseUrl + '/common/rs/patientSpecimenTrackingSummary')
                .success(function (data) {
                    angular.forEach(data, function(value, key) {
                        var patientSequenceNumber = value.patientSequenceNumber;
                        if (angular.isDefined(value.biopsies) && angular.isArray(value.biopsies)) {
                            angular.forEach(value.biopsies, function(value, key) {
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
                                }

                                if (angular.isDefined(value.samples) && angular.isArray(value.samples)) {
                                    angular.forEach(value.samples, function(value, key) {
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
                })
                .error(function (data, status, header, config) {
                    console.log(data + '|' + status + '|' + header + '|' + config);
                });
        }

    });