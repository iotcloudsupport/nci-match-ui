angular.module('molecular-sequences.matchbox',[])
    .controller('MolecularSequencesController', function( $scope, $http, matchConfig, DTOptionsBuilder, DTColumnDefBuilder ) {

        this.dtOptions = DTOptionsBuilder.newOptions()
            .withDisplayLength(100);
        this.dtColumnDefs = [];
        this.dtInstance = {};

        $scope.molecularSequencesList = []

        $scope.loadMolecularSequencesList = function() {
            $http.get(matchConfig.matchApiBaseUrl + '/common/rs/patientSpecimenTrackingSummary')
                .success(function (data) {
                    angular.forEach(data, function(value, key) {
                        var patientSequenceNumber = value.patientSequenceNumber;
                        if (angular.isDefined(value.biopsies) && angular.isArray(value.biopsies)) {
                            angular.forEach(value.biopsies, function (value, key) {
                                var biopsySequenceNumber = value.biopsySequenceNumber;
                                if (angular.isDefined(value.samples) && angular.isArray(value.samples)) {
                                    angular.forEach(value.samples, function (value, key) {
                                        $scope.molecularSequencesList.push({
                                            'molecularSequenceNumber': value.molecularSequenceNumber,
                                            'patientSequenceNumber': patientSequenceNumber,
                                            'biopsySeqenuceNumber': biopsySequenceNumber,
                                            'lab': value.lab,
                                            'trackingNumber': value.trackingNumber,
                                            'nucleicAcidSendoutDate': value.dnaShippedDate
                                        });
                                    });
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