angular.module('molecular-sequences.matchbox',[])
    .controller('MolecularSequencesController', function( $scope, DTOptionsBuilder, DTColumnDefBuilder, matchApi ) {
        this.dtOptions = DTOptionsBuilder.newOptions()
            .withDisplayLength(100);
        this.dtColumnDefs = [];
        this.dtInstance = {};

        $scope.molecularSequencesList = [];
        $scope.sites = {
            'mgh': 0,
            'yale': 0,
            'mocha': 0,
            'mda': 0,
            'total': 0
        }

        $scope.loadMolecularSequencesList = function() {
            matchApi
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
                                        if (value.lab === 'MGH') $scope.sites.mgh++;
                                        if (value.lab === 'Yale') $scope.sites.yale++;
                                        if (value.lab === 'MoCha') $scope.sites.mocha++;
                                        if (value.lab === 'MDACC') $scope.sites.mda++;
                                    });
                                }
                            });
                        }
                    });
                    var total = $scope.sites.mgh + $scope.sites.yale + $scope.sites.mocha + $scope.sites.mda;
                    $scope.sites.total = (total === 0) ? 1 : total;
                });
        };
    });