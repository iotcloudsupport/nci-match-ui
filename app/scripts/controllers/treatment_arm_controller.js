(function () {
    angular.module('treatment-arm.matchbox', [])
        .controller('TreatmentArmController', TreatmentArmController);

    function TreatmentArmController($scope,
        $window,
        $stateParams,
        DTOptionsBuilder,
        DTColumnDefBuilder,
        treatmentArmApi,
        matchApiMock,
        $log) {

        this.dtOptions = {
            'info': false,
            'paging': false
        };

        this.ddOptions = {
            'info': false,
            'paging': false,
            'bFilter': false
        };

        /*
         To get the zero records message, add to above type: 'oLanguage': {"sEmptyTable": "There are no SNV inclusions"}
         */

        $scope.loadTreatmentArmDetails = loadTreatmentArmDetails;
        $scope.loadPatients = loadPatients;

        $scope.patients = [];

        $scope.tooltipContent = {
            psn: 'Patient ID',
            loe: 'Level Of Evidence',
            chr: 'Chromosome',
            pos: 'Position',
            ref: 'Reference',
            alt: 'Alternative',
            lit: 'Lit Ref'
        };

        $scope.drugsDiseases = [
            {}
        ];

        $scope.versionHistory = {
            versionStatus: 'OPEN',
            history: [
                { status: 'OPEN', date: 'March 17, 2016 10:10PM GMT' }
            ]
        };

        $scope.versionHistoryClosed = {
            versionStatus: 'CLOSED',
            history: [
                { status: 'OPEN', date: 'December 02, 2016 4:00AM GMT' },
                { status: 'SUSPENDED', date: 'December 20, 2015 10:10PM GMT' },
                { status: 'CLOSED', date: 'February 20, 2016 9:00PM GMT' }
            ]
        };

        $scope.versions = [];

        $scope.setInExclusionType = setInExclusionType;
        $scope.getInExclusionTypeClass = getInExclusionTypeClass;

        function setInExclusionType(inExclusionType) {
            if ($scope.inExclusionType === inExclusionType) {
                return;
            }

            $scope.inExclusionType = inExclusionType;
            setInExclusion();
        }

        function getInExclusionTypeClass(inExclusionType) {
            return $scope.inExclusionType === inExclusionType ? 'active' : '';
        }

        function setInExclusion() {
            $scope.inExclusion = $scope.version;
        }

        $scope.openPubMed = function (data) {
            $window.open("http://www.ncbi.nlm.nih.gov/pubmed/?term=" + data, '_blank');

        };

        $scope.openGene = function (data) {
            $window.open('http://cancer.sanger.ac.uk/cosmic/gene/overview?ln=' + data.toLowerCase(), '_blank');
        };

        function parseCosmicAndOpenLink(cosmicId, tmp, splitString, linkString) {
            var cid = cosmicId.substring(tmp, cosmicId.length);
            var cia = cid.split(splitString);
            var fid = cia[1].split(".");
            $window.open(linkString + fid[0], '_blank');
        }

        $scope.openId = function (cosmicId) {
            if (cosmicId !== undefined && cosmicId !== null) {
                var tmp = cosmicId.indexOf("COSF");
                if (tmp > 0) {
                    parseCosmicAndOpenLink(cosmicId, tmp, "COSF", 'http://cancer.sanger.ac.uk/cosmic/fusion/summary?id=');
                } else {
                    tmp = cosmicId.indexOf("COSM");
                    if (tmp !== -1) {
                        parseCosmicAndOpenLink(cosmicId, tmp, "COSM", 'http://cancer.sanger.ac.uk/cosmic/mutation/overview?id=');
                    }
                }
            }
        };

        function changeHeight() {
            document.getElementById("diseasePieChartContainer").style["height"] = window.innerWidth / 3.2 + "px";
            document.getElementById("patientPieChartContainer").style["height"] = window.innerWidth / 3.2 + "px";
        }

        function setupTooltip(label, xval, yval) {
            return label + "<br>------------------------------------------<br>Patients: " + yval;
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

        $scope.diseasePieOptions = setupPieChartOptions('#diseaseLegendContainer');

        function setupLit(pubmed_ids) {
            var litRefs = [];
            angular.forEach(pubmed_ids, function (value) {
                //litRefs.push({"litRef": value});
                litRefs.push(value);
            });
            return litRefs;
        }

        function setupGeneLoe(variant, retData) {
            variant.gene = retData.gene_name;
            variant.levelOfEvidence = retData.level_of_evidence;
            return variant;
        }

        function isInclusion(variant, inclusionVal) {
            if (inclusionVal === true) {
                variant.inclusion = true;
                variant.exclusion = false;
                return true;
            } else {
                variant.inclusion = false;
                variant.exclusion = true;
                return false;
            }
        }

        $scope.setInclusionExclusion = function (variantName, variant) {
            if (isInclusion(variant, variant.inclusion) === true) {
                $scope[variantName + 'sInclusion'].push(variant);
            } else {
                $scope[variantName + 'sExclusion'].push(variant);
            }
        };

        $scope.setupSnvIndel = function (variantName, value) {
            var variant = {};
            variant.identifier = value.identifier;
            variant = setupGeneLoe(variant, value);
            variant.position = value.position;
            variant.alternative = value.alternative;
            variant.chromosome = value.chromosome;
            variant.protein = value.description;
            variant.reference = value.reference;
            variant.litRefs = setupLit(value.public_med_ids);
            $scope.setInclusionExclusion(variantName, value);
        };

        $scope.snvsInclusion = [];
        $scope.snvsExclusion = [];
        $scope.indelsInclusion = [];
        $scope.indelsExclusion = [];
        $scope.cnvsInclusion = [];
        $scope.cnvsExclusion = [];
        $scope.gfsInclusion = [];
        $scope.gfsExclusion = [];
        $scope.nhrsInclusion = [];
        $scope.nhrsExclusion = [];

        $scope.extraVersion = {};

        function loadTreatmentArmDetails() {
            $log.info('Loading Treatment Arm', $stateParams.name, $stateParams.stratum, $stateParams.version);
            
            matchApiMock
                .loadTreatmentArmDetails($stateParams.name, $stateParams.stratum)
                .then(setupScope, handleError);
        }

        function loadPatients() {
            matchApiMock
                .loadPatientsForTa($stateParams.name, $stateParams.stratum)
                .then(function (d) {
                    $scope.patients = [];
                    angular.copy(d.data, $scope.patients);
                });
        }

        function handleError(e) {
            $log.error(e);
            $log.info('Error while retriving data from the service. Transferring back to Treatment Arm list');
            $state.transitionTo('treatment-arms');
            return;
        }

        function setupScope(data) {
            if (!data || !data.data) {
                $log.error('The web service didn\'t send Treatment Arm data. Transferring back to Treatment Arm list');
                $state.transitionTo('treatment-arms');
            }

            loadPatients();

            $scope.name = $stateParams.name;
            $scope.version = $stateParams.version;
            $scope.stratum = $stateParams.stratum;

            $scope.patient_id = $stateParams.patient_id;
            var scopeData = [];
            angular.copy(data.data, scopeData);
            $scope.versions = scopeData;
            $scope.currentVersion = $scope.versions[0];

            setupFinal(); 
        }

        function setupFinal() {
            $scope.inExclusionType = 'inclusion';
            setInExclusion();
            changeHeight();
            $log.debug($scope.inExclusionType);
            $(window).on("resize.doResize", function () {
                $scope.$apply(function () {
                    changeHeight();
                });
            });
        }

        function onVersionSelected(selected) {
            $log.debug('Selected version: ' + selected);
        }

        function loadTreatmentArmDetailsOld() {
            $log.info('Loading Treatment Arm', $stateParams.name, $stateParams.stratum);
            matchApiMock
                .loadTreatmentArmDetails($stateParams.name, $stateParams.stratum) //$stateParams.treatmentArmId
                .then(function (d) {
                    var versionCount = 0;
                    angular.forEach(d.data, function (value) {
                        $log.debug('value');
                        $log.debug(value);
                        if (value !== [] && value !== null && value !== undefined) {
                            var nonSequencingAssays = [];

                            angular.forEach(value.pten_results, function (value) {
                                var nonSequencingAssay = {};
                                nonSequencingAssay.assay = value.assay;
                                nonSequencingAssay.gene = value.gene_name;
                                nonSequencingAssay.result = value.pten_ihc_result;
                                nonSequencingAssay.variantAssociation = value.pten_variant;
                                nonSequencingAssay.levelOfEvidence = value.level_of_evidence;
                                nonSequencingAssays.push(nonSequencingAssay);
                            });

                            if (value.variant_report !== undefined) {
                                angular.forEach(value.variant_report.single_nucleotide_variants, function (value) {
                                    $scope.setupSnvIndel('snv', value);
                                });
                                angular.forEach(value.variant_report.indels, function (value) {
                                    $scope.setupSnvIndel('indel', value);
                                });
                                angular.forEach(value.variant_report.copy_number_variants, function (value) {
                                    var cnv = {};
                                    cnv = setupGeneLoe(cnv, value);
                                    cnv.chrom = value.chromosome; //
                                    cnv.position = value.position;
                                    cnv.protein = value.description; //
                                    cnv.litRefs = setupLit(value.public_med_ids);
                                    $scope.setInclusionExclusion('cnv', value);
                                });
                                angular.forEach(value.variant_report.gene_fusions, function (value) {
                                    var gf = {};
                                    gf.id = value.identifier;
                                    gf = setupGeneLoe(gf, value);
                                    gf.litRefs = setupLit(value.public_med_ids);
                                    $scope.setInclusionExclusion('gf', value);
                                });
                                angular.forEach(value.variant_report.non_hotspot_rules, function (value) {
                                    var nhr = {};
                                    nhr.exon = value.exon;
                                    nhr.function = value.function;
                                    nhr = setupGeneLoe(nhr, value);
                                    nhr.oncomineVariantClass = value.oncominevariantclass; //
                                    nhr.proteinRegex = value.protein_match; //
                                    nhr.litRefs = setupLit(value.public_med_ids);
                                    $scope.setInclusionExclusion('nhr', value);
                                });
                            }

                            var version = {};
                            version.text = value.version;
                            if (versionCount === 0) {
                                version.latest = 'This is the latest version.';
                            } else {
                                version.latest = 'This is not the latest version.';
                            }

                            version.exclusionaryDiseases = exclusionDiseases;
                            version.exclusionaryDrugs = exclusionDrugs;
                            //version.inclusionaryDrugs = inclusionDrugs;
                            version.snvsInclusion = $scope.snvsInclusion;
                            version.snvsExclusion = $scope.snvsExclusion;
                            version.indelsInclusion = $scope.indelsInclusion;
                            version.indelsExclusion = $scope.indelsExclusion;
                            version.cnvsInclusion = $scope.cnvsInclusion;
                            version.cnvsExclusion = $scope.cnvsExclusion;
                            version.geneFusionsInclusion = $scope.gfsInclusion;
                            version.geneFusionsExclusion = $scope.gfsExclusion;
                            version.nhrsInclusion = $scope.nhrsInclusion;
                            version.nhrsExclusion = $scope.nhrsExclusion;
                            version.nonSequencingAssays = nonSequencingAssays;
                            version.versionHistory = $scope.versionHistory;
                            $scope.versions.push(version);
                            versionCount = versionCount + 1;
                            $scope.information.version = $scope.versions[0].name;
                            $log.debug('versions');
                            $log.debug($scope.versions);

                            $scope.selectedVersion = $scope.versions[0];
                            $log.debug('sel vsn');
                            $log.debug($scope.selectedVersion);

                        }


                    });


                })
                .then(function () {
                    $scope.inExclusionType = 'inclusion';
                    setInExclusion();
                    changeHeight();
                    $log.debug($scope.inExclusionType);
                    $(window).on("resize.doResize", function () {
                        $scope.$apply(function () {
                            changeHeight();
                        });
                    });
                });

            //}

        }
    }

} ());