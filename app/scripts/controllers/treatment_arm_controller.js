(function () {
    angular.module('treatment-arm.matchbox', [])
        .controller('TreatmentArmController', TreatmentArmController);

    function TreatmentArmController($scope,
        $window,
        $stateParams,
        $state,
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
        $scope.openId = openId;

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

        $scope.patientPieChartOptions = {};
        $scope.patientPieChartDataset = [];

        $scope.diseasePieChartOptions = {};
        $scope.diseasePieChartDataset = [];

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

        function openId (cosmicId) {
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
        }

        function changeHeight() {
            document.getElementById("diseasePieChartContainer").style["height"] = window.innerWidth / 3.2 + "px";
            document.getElementById("patientPieChartContainer").style["height"] = window.innerWidth / 3.2 + "px";
        }

        function setupTooltip(label, xval, yval) {
            return label + "<br>------------------------------------------<br>Patients: " + yval;
        }

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

            $scope.name = $stateParams.name;
            $scope.version = $stateParams.version;
            $scope.stratum = $stateParams.stratum;

            loadPatients();

            var scopeData = [];
            angular.copy(data.data, scopeData);
            $scope.versions = scopeData;
            $scope.currentVersion = $scope.versions[0];
            $scope.currentVersion.latest = 'This is the latest version.';

            setupRulesExlcusionInclusionLists();
            setupCharts();
           // setupFinal();
        }

        function setupRulesExlcusionInclusionLists() {
            for (var i = 0; i < $scope.versions.length; i++) {
                var version = $scope.versions[i];

                setupCriteriaList(version.variant_report.single_nucleotide_variants, version, 'snvsInclusion', 'snvsExclusion');
                setupCriteriaList(version.variant_report.indels, version, 'indelsInclusion', 'indelsExclusion');
                setupCriteriaList(version.variant_report.copy_number_variants, version, 'cnvsInclusion', 'cnvsExclusion');
                setupCriteriaList(version.variant_report.gene_fusions, version, 'geneFusionsInclusion', 'geneFusionsExclusion');
                setupCriteriaList(version.variant_report.non_hotspot_rules, version, 'nhrsInclusion', 'nhrsExclusion');
            }
        }

        function setupCriteriaList(sourceArray, version, inclusionArrayName, exclusionArrayName) {
            inclusionList = [];
            exclusionList = [];

            version[inclusionArrayName] = inclusionList;
            version[exclusionArrayName] = exclusionList;

            for (var i = 0; i < sourceArray.length; i++) {
                var row = sourceArray[i];
                if (row.inclusion) {
                    inclusionList.push(angular.copy(row));
                }
                else {
                    exclusionList.push(angular.copy(row));
                }
            }
        }

        function setupCharts() {
            $scope.patientPieChartOptions = createPieChartOptions('#legendContainer');
            $scope.diseasePieChartOptions = createPieChartOptions('#diseaseLegendContainer');

            $scope.patientPieChartDataset = $scope.currentVersion.pie_dataset;
            $scope.diseasePieChartDataset = $scope.currentVersion.disease_pie_dataset;
        }

        function createPieChartOptions(htmlContainer) {
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
    }

} ());