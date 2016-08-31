(function () {
    angular.module('matchbox.treatment-arm', ['ui.bootstrap', 'cgPrompt', 'ui.router', 'datatables', 'ngResource'])
        .controller('TreatmentArmController', TreatmentArmController);

    function TreatmentArmController(
        $scope,
        $window,
        $stateParams,
        $state,
        DTOptionsBuilder,
        DTColumnDefBuilder,
        matchApi,
        colorFactory,
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

        /*var vm = this;
            vm.dtInstances = [];
            vm.dtOptions = DTOptionsBuilder.newOptions()
                .withOption('info', false);
            vm.dtOptions = DTOptionsBuilder.newOptions()
                .withOption('paging', false);

            vm.ddOptions = DTOptionsBuilder.newOptions()
                .withOption('info', false);
            vm.ddOptions = DTOptionsBuilder.newOptions()
                .withOption('paging', false);
            vm.ddOptions = DTOptionsBuilder.newOptions()
                .withOption('bFilter', false);*/

        /*
         To get the zero records message, add to above type: 'oLanguage': {"sEmptyTable": "There are no SNV inclusions"}
         */

        $scope.loadTreatmentArmDetails = loadTreatmentArmDetails;
        $scope.loadPatients = loadPatients;
        $scope.openId = openId;
        $scope.onVersionSelected = onVersionSelected;

        $scope.versions = [];
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

        $scope.versionHistory = [];
        
        $scope.gridActions = {};

        $scope.allPatientsDataGridOptions = {};
        $scope.exclusionaryDiseasesGridOptions = {};
        $scope.inclusionaryDiseasesGridOptions = {};
        $scope.exclusionaryDrugsGridOptions = {};
        $scope.snvsMnvsIndelsGridOptions = {};
        $scope.cnvsGridOptions = {};
        $scope.geneFusionsGridOptions = {};

        activate();

        function activate() {
            setupGridOptions();
        }

        function setupGridOptions() {
            $scope.allPatientsDataGridOptions = {
                data: [],
                ngColumnFilters: {
                    //"date": "utc",
                    "dateSelected": "utc",
                    "dateOnArm": "utc",
                    "dateOffArm": "utc"

                },
                sort: {
                    //predicate: 'days_pending',
                    //direction: 'desc' date selected
                },
                searchableProps: [
                    'slot',
                    'patient_id',
                    'treatmentArmVersion',
                    'patientAssignmentStatusOutcome',
                    'dateSelected',
                    'dateOffArm',
                    'timeOnArm',
                    'step',
                    'diseases',
                    'reason'
                ],
                customFilters: {
                    filterAll: function (items, value, predicate) {
                        return items.filter(function (item) {
                            return arrayTools.itemHasValue(item, value,
                                $scope.allPatientsDataGridOptions.searchableProps, $scope.allPatientsDataGridOptions.ngColumnFilters, $filter);
                        });
                    }
                }
            };
            $scope.exclusionaryDiseasesGridOptions = {
                data: [],
                ngColumnFilters: {

                },
                sort: {
                    predicate: 'short_name',
                    direction: 'asc'
                },
                searchableProps: [
                    'disease_code',
                    'short_name',
                    'ctep_category'
                ],
                customFilters: {
                    filterAll: function (items, value, predicate) {
                        return items.filter(function (item) {
                            return arrayTools.itemHasValue(item, value,
                                $scope.exclusionaryDiseasesGridOptions.searchableProps, $scope.exclusionaryDiseasesGridOptions.ngColumnFilters, $filter);
                        });
                    }
                }
            }
            $scope.inclusionaryDiseasesGridOptions = {
                data: [],
                ngColumnFilters: {

                },
                sort: {
                    predicate: 'short_name',
                    direction: 'asc'
                },
                searchableProps: [
                    'disease_code',
                    'short_name',
                    'ctep_category'
                ],
                customFilters: {
                    filterAll: function (items, value, predicate) {
                        return items.filter(function (item) {
                            return arrayTools.itemHasValue(item, value,
                                $scope.inclusionaryDiseasesGridOptions.searchableProps, $scope.inclusionaryDiseasesGridOptions.ngColumnFilters, $filter);
                        });
                    }
                }
            }
            $scope.exclusionaryDrugsGridOptions = {
                data: [],
                ngColumnFilters: {

                },
                sort: {
                    predicate: 'drug_id',
                    direction: 'asc'
                },
                searchableProps: [
                    'drug_id',
                    'name'
                ],
                customFilters: {
                    filterAll: function (items, value, predicate) {
                        return items.filter(function (item) {
                            return arrayTools.itemHasValue(item, value,
                                $scope.exclusionaryDrugsGridOptions.searchableProps, $scope.exclusionaryDrugsGridOptions.ngColumnFilters, $filter);
                        });
                    }
                }
            }
            $scope.snvsMnvsIndelsGridOptions = {
                data: [],
                ngColumnFilters: {
                    //"date": "utc",

                },
                sort: {
                    //predicate: 'days_pending',
                    //direction: 'desc' date selected
                    predicate: 'identifier',
                    direction: 'asc'
                },
                searchableProps: [
                    'identifier',
                    'chromosome',
                    'position',
                    'cds_reference',
                    'cds_alternative',
                    'ocp_reference',
                    'ocp_alternative',
                    'strand',
                    'level_of_evidence',
                    'num_patients_with_variant',
                    'num_patients_with_variant_on_arm',
                    'percent_patients_with_variant_on_arm'
                ],
                customFilters: {
                    filterAll: function (items, value, predicate) {
                        return items.filter(function (item) {
                            return arrayTools.itemHasValue(item, value,
                                $scope.snvsMnvsIndelsGridOptions.searchableProps, $scope.snvsMnvsIndelsGridOptions.ngColumnFilters, $filter);
                        });
                    }
                }
            };
            $scope.cnvsGridOptions = {
                data: [],
                ngColumnFilters: {
                    //"date": "utc",

                },
                sort: {
                    //predicate: 'days_pending',
                    //direction: 'desc' date selected
                    predicate: 'gene',
                    direction: 'asc'
                },
                searchableProps: [
                    'gene',
                    'chromosome',
                    'position',
                    'level_of_evidence',
                    'num_patients_with_variant',
                    'num_patients_with_variant_on_arm',
                    'percent_patients_with_variant_on_arm'
                ],
                customFilters: {
                    filterAll: function (items, value, predicate) {
                        return items.filter(function (item) {
                            return arrayTools.itemHasValue(item, value,
                                $scope.cnvsGridOptions.searchableProps, $scope.cnvs.ngColumnFilters, $filter);
                        });
                    }
                }
            };
            $scope.geneFusionsGridOptions = {
                data: [],
                ngColumnFilters: {
                    //"date": "utc",

                },
                sort: {
                    //predicate: 'days_pending',
                    //direction: 'desc' date selected
                    predicate: 'identifier',
                    direction: 'asc'
                },
                searchableProps: [
                    'identifier',
                    'level_of_evidence',
                    'num_patients_with_variant',
                    'num_patients_with_variant_on_arm',
                    'percent_patients_with_variant_on_arm'
                ],
                customFilters: {
                    filterAll: function (items, value, predicate) {
                        return items.filter(function (item) {
                            return arrayTools.itemHasValue(item, value,
                                $scope.geneFusionsGridOptions.searchableProps, $scope.geneFusionsGridOptions.ngColumnFilters, $filter);
                        });
                    }
                }
            };
        }

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

        function openId(cosmicId) {
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

            matchApi
                .loadTreatmentArmDetails($stateParams.name, $stateParams.stratum)
                .then(setupScope, handleError);
        }

        function loadPatients() {
            matchApi
                .loadPatientsForTa($stateParams.name, $stateParams.stratum)
                .then(function (d) {
                    $scope.patients = [];
                    angular.copy(d.data, $scope.patients);
                    setupCharts();
                });
        }

        function handleError(e) {
            $log.error(e);
            $log.info('Error while retriving data from the service. Transferring back to Treatment Arm list');
            $state.transitionTo('treatment-arms');
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
            $scope.currentVersion.latest = 'This is the latest version.'; //need to set $scope.exclusionaryDiseasesGridOptions with currentVersion.exclusion_diseases ... and other disease tables also
            setupHistory();
            setupRulesExlcusionInclusionLists();
            setupFinal();
        }

        function setupHistory() {
            $scope.versionHistory = [];

            if (!$scope.versions)
                return;

            for (var i = 0; i < $scope.versions.length; i++) {
                var version = $scope.versions[i];

                if (!version.status_log)
                    continue;

                angular.forEach(version.status_log, function(key, value) {
                    var historyItem = {};
                    historyItem.version = version.version;
                    historyItem.status = key;
                    var gmtDate = new Date(value * 1000);
                    historyItem.date = gmtDate.toGMTString();
                    $scope.versionHistory.push(historyItem);
                });
            }            
        }

        function setupRulesExlcusionInclusionLists() {
            for (var i = 0; i < $scope.versions.length; i++) {
                var version = $scope.versions[i];
                setupCriteriaList(version.variant_report.snvs_and_indels, version, 'snvsInclusion', 'snvsExclusion');
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

            if (!sourceArray) {
                return;
            }

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

            var statistics = calculateStatistics();
            $scope.patientPieChartDataset = createChartData(statistics.statuses);
            $scope.diseasePieChartDataset = createChartData(statistics.diseases);
        }

        function calculateStatistics() {
            var statistics = { statuses: {}, diseases: {} };

            for (var i = 0; i < $scope.patients.length; i++) {
                var patient = $scope.patients[i];

                if (patient.patientAssignmentStatusOutcome in statistics.statuses) {
                    statistics.statuses[patient.patientAssignmentStatusOutcome] = 1 + statistics.statuses[patient.patientAssignmentStatusOutcome];
                } else {
                    statistics.statuses[patient.patientAssignmentStatusOutcome] = 1;
                }

                if (patient.diseases in statistics.diseases) {
                    statistics.diseases[patient.diseases] = 1 + statistics.diseases[patient.diseases];
                } else {
                    statistics.diseases[patient.diseases] = 1;
                }
            }

            return statistics;
        }

        function createChartData(statistics) {
            var chartData = [];
            var colorIndex = 0;
            angular.forEach(statistics, function (value, key) {
                this.push({ label: key, data: value, color: colorFactory.getColor(colorIndex++) });
            }, chartData);
            return chartData;
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
            $(window).on("resize.doResize", function () {
                $scope.$apply(function () {
                    changeHeight();
                });
            });
        }

        function onVersionSelected(selected) {
            $log.debug('Selected version: ' + selected);
            $scope.currentVersion = selected;
        }
    }

} ());