angular.module('molecular-sequences.matchbox',[])
    .controller('MolecularSequencesController', function( $scope, $http, matchConfig, DTOptionsBuilder, DTColumnDefBuilder, molecularSequenceService ) {
        this.dtOptions = DTOptionsBuilder.newOptions()
            .withDisplayLength(100);
        this.dtColumnDefs = [];
        this.dtInstance = {};

        $scope.molecularSequencesList = [];

        $scope.loadMolecularSequencesList = function() {
            molecularSequenceService
                .getMolecularSequenceList()
                .then(function(d) {
                    angular.forEach(d.data, function(value, key) {
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
                });
        };
    });