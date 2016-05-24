angular.module('treatment-arm.matchbox',[])
    .controller('TreatmentArmController', function( $scope, $window, DTOptionsBuilder, DTColumnDefBuilder, treatmentArmApi) {

        this.dtOptions = {
            'info': false,
            'paging':false
        };
        
        this.ddOptions = {
            'info': false,
            'paging': false,
            'bFilter': false
        };

        $scope.test = '';

        $scope.information = {
            name: '',
            description: '',
            currentVersion: '',
            genes: '',
            patientsAssigned: 3,
            currentStatus: '',
            drug: 'AZD9291 (781254)'
        };

        $scope.tooltipContent = {
            psn: 'Patient Sequence Number',
            loe: 'Level Of Evidence',
            chr: 'Chromosome',
            pos: 'Position',
            ref: 'Reference',
            alt: 'Alternative',
            lit: 'Lit Ref'
        };

        $scope.drugsDiseases = [
            {

            }
        ];
        
        $scope.versionHistory = {
            versionStatus: 'OPEN',
            history: [
                {status: 'PENDING', date: 'March 02, 2016 4:00AM GMT'},
                {status: 'READY', date: 'March 09, 2016 10:10PM GMT'},
                {status: 'OPEN', date: 'March 17, 2016 10:10PM GMT'}
            ]
        };
        
        $scope.versionHistoryClosed = {
            versionStatus: 'CLOSED',
            history: [
                {status: 'PENDING', date: 'December 02, 2016 4:00AM GMT'},
                {status: 'READY', date: 'December 09, 2016 10:10PM GMT'},
                {status: 'OPEN', date: 'December 20, 2015 10:10PM GMT'},
                {status: 'CLOSED', date: 'February 20, 2016 9:00PM GMT'}
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
            //$scope.inExclusion = $scope.variants[$scope.inExclusionType];
            $scope.inExclusion = $scope.currentVersion;
        }


        /*
        // It is important that the versions are populated in reverse order, starting with current version
        $scope.versions = [
            {
                name: '2016-03-17',
                versionStatus: 'OPEN',
                history: [
                    {status: 'PENDING', date: 'March 02, 2016 4:00AM GMT'},
                    {status: 'READY', date: 'March 09, 2016 10:10PM GMT'},
                    {status: 'OPEN', date: 'March 17, 2016 10:10PM GMT'},
                ],
                inclusionaryDrugs: [
                    {
                        "id": "750691",
                        "name": "Afatinib"
                    },
                    {
                        "id": "781254",
                        "name": "AZD9291"
                    },
                    {
                        "id": "749005",
                        "name": "Crizotinib"
                    }
                ],
                inclusionaryDiseases: [
                    {
                        "ctepCategory": "Small Cell Lung Cancer",
                        "ctepTerm": "Small Cell Lung Cancer",
                        "medraCode": "10041071"
                    }
                ],
                exclusionaryDrugs: [
                    {
                        "id": "781257",
                        "name": "AZZ0056731"
                    }
                ],
                exclusionaryDiseases: [
                    {
                        "ctepCategory": "Non-Small Cell Lung Cancer",
                        "ctepTerm": "Lung adenocarcinoma",
                        "medraCode": "10025032"
                    }
                ],
                snvsInclusion: [],
                snvsExclusion: [],
                indelsInclusion: [],
                indelsExclusion: [],
                cnvsInclusion: [],
                cnvsExclusion: [],
                geneFusionsInclusion: [],
                geneFusionsExclusion: [],
                nhrsInclusion: [],
                nhrsExclusion: [],
                nonSequencingAssaysInclusion: [
                    {
                        "assay": "IHC",
                        "gene": "EBFRA",
                        "result": "POSITIVE",
                        "variantAssociation": "PRESENT",
                        "levelOfEvidence": "1",
                        "totNumPtsWithGene": "0",
                        "ptsWithGeneOnArm": "0",
                        "pctPtsWithGeneOnArmOfTotPtsWithGene": "0%",
                        "inclusion": true,
                        "exclusion": false
                    },
                    {
                        "assay": "IHC",
                        "gene": "ABBC",
                        "result": "POSITIVE",
                        "variantAssociation": "ABSENT",
                        "levelOfEvidence": "1",
                        "totNumPtsWithGene": "0",
                        "ptsWithGeneOnArm": "0",
                        "pctPtsWithGeneOnArmOfTotPtsWithGene": "0%",
                        "inclusion": true,
                        "exclusion": false
                    }
                ],
                nonSequencingAssaysExclusion: [
                    {
                        "assay": "IHC",
                        "gene": "ALK",
                        "result": "NEGATIVE",
                        "variantAssociation": "EMPTY",
                        "levelOfEvidence": "1",
                        "inclusion": false,
                        "exclusion": true
                    }
                ]
            },
            {
                name: '2016-02-20',
                versionStatus: 'CLOSED',
                history: [
                    {status: 'PENDING', date: 'January 2, 2015 4:00AM GMT'},
                    {status: 'READY', date: 'January 9, 2016 10:10PM GMT'},
                    {status: 'OPEN', date: 'February 20, 2016 10:10PM GMT'},
                    {status: 'CLOSED', date: 'Febrary 28, 2016 9:15AM GMT'}
                ],
                inclusionaryDrugs: [
                    {
                        "id": "750691",
                        "name": "Afatinib"
                    },
                    {
                        "id": "781254",
                        "name": "AZD9291"
                    },
                    {
                        "id": "749005",
                        "name": "Crizotinib"
                    }
                ],
                inclusionaryDiseases: [
                    {
                        "ctepCategory": "Small Cell Lung Cancer",
                        "ctepTerm": "Small Cell Lung Cancer",
                        "medraCode": "10041071"
                    }
                ],
                exclusionaryDrugs: [
                    {
                        "id": "781257",
                        "name": "AZZ0056731"
                    }
                ],
                exclusionaryDiseases: [
                    {
                        "ctepCategory": "Non-Small Cell Lung Cancer",
                        "ctepTerm": "Lung adenocarcinoma",
                        "medraCode": "10025032"
                    }
                ],
                snvsInclusion: [],
                snvsExclusion: [],
                indelsInclusion: [],
                indelsExclusion: [],
                cnvsInclusion: [],
                cnvsExclusion: [],
                geneFusionsInclusion: [],
                geneFusionsExclusion: [],
                nhrsInclusion: [
                    {
                        "oncomineVariantClass": "-",
                        "gene": "EGFR",
                        "levelOfEvidence" : "1",
                        "function": "nonframeshiftinsertion",
                        "litRefs": [
                            {
                                "litRef": "26051236"
                            },
                            {
                                "litRef": "19692684"
                            }

                        ],
                        "variantDescription": "-",
                        "exon": "19",
                        "proteinRegex": "-",
                        "inclusion": true,
                        "exclusion": false
                    }
                ],
                nhrsExclusion: [],
                nonSequencingAssaysInclusion: [
                    {
                        "assay": "IHC",
                        "gene": "EBFRA",
                        "result": "POSITIVE",
                        "variantAssociation": "PRESENT",
                        "levelOfEvidence": "1",
                        "totNumPtsWithGene": "0",
                        "ptsWithGeneOnArm": "0",
                        "pctPtsWithGeneOnArmOfTotPtsWithGene": "0%",
                        "inclusion": true,
                        "exclusion": false
                    }
                ],
                nonSequencingAssaysExclusion: [
                    {
                        "assay": "IHC",
                        "gene": "ALK",
                        "result": "NEGATIVE",
                        "variantAssociation": "EMPTY",
                        "levelOfEvidence": "1",
                        "inclusion": false,
                        "exclusion": true
                    }
                ]
            }
        ]; */

        //$scope.selectedVersion = $scope.versions[0];

        $scope.openPubMed = function(data) {
            $window.open("http://www.ncbi.nlm.nih.gov/pubmed/?term="+data, '_blank');

        };

        $scope.openGene = function(data) {
            $window.open('http://cancer.sanger.ac.uk/cosmic/gene/overview?ln='+data.toLowerCase(), '_blank');
        };

        function parseCosmicAndOpenLink(cosmicId, tmp, splitString, linkString) {
            var cid = cosmicId.substring(tmp, cosmicId.length);
            var cia = cid.split(splitString);
            var fid =  cia[1].split(".");
            $window.open(linkString + fid[0], '_blank');
        }

        $scope.openId = function(cosmicId) {
            if (cosmicId !== undefined && cosmicId !== null) {
                var tmp = cosmicId.indexOf("COSF");
                if(tmp > 0) {
                    parseCosmicAndOpenLink(cosmicId, tmp, "COSF", 'http://cancer.sanger.ac.uk/cosmic/fusion/summary?id=');
                } else {
                    tmp = cosmicId.indexOf("COSM");
                    if(tmp !== -1) {
                        parseCosmicAndOpenLink(cosmicId, tmp, "COSM", 'http://cancer.sanger.ac.uk/cosmic/mutation/overview?id=');
                    }
                }
            }
        };

        $scope.pieDataset = [
            {
                label: "ON_TREATMENT_ARM",
                data: 5,
                color: "#1c84c6",
                psns: "215re, 203re, 312re"
            },
            {
                label: "PENDING_APPROVAL",
                data: 3,
                color: "#23c6c8",
                psns: "201re, 302re"
            },
            {
                label: "FORMERLY_ON_TREATMENT_ARM",
                data: 2,
                color: "#f8ac59",
                psns: "205re, 206re"
            },
            {
                label: "NOT_ELIGIBLE",
                data: 1,
                color: "#1ab394",
                psns: "202re, 211re, 252re, 255re, 304re"
            }
        ];

        $scope.diseasePieDataset = [
            {
                label: "Endocrine cancer, NOS",
                data: 3,
                color: "#1c84c6",
                psns: "215re, 205re, 203re"
            },
            {
                label: "Glioblastoma multiforme",
                data: 6,
                color: "#23c6c8",
                psns: "201re,  206re, 252re, 255re, 302re, 202re"
            },
            {
                label: "Head & neck cancer, NOS",
                data: 4,
                color: "#f8ac59",
                psns: "202re, 211re, 312re, 304re"
            },
            {
                label: "Retinoblastoma",
                data: 2,
                color: "#1ab394",
                psns: "201re,  206re, 252re, 255re, 302re, 202re"
            },
            {
                label: "Skin Cancer, NOS",
                data: 7,
                color: "#707070",
                psns: "202re, 211re, 312re, 304re"
            },
            {
                label: "Bone cancer, NOS",
                data: 4,
                color: "#1c84c6",
                psns: "202re, 211re, 312re, 304re"
            },
            {
                label: "Chrondrosarcoma",
                data: 2,
                color: "#23c6c8",
                psns: "201re,  206re, 252re, 255re, 302re, 202re"
            },
            {
                label: "Diffuse brainstem glioma",
                data: 7,
                color: "#f8ac59",
                psns: "202re, 211re, 312re, 304re"
            },
            {
                label: "Anaplastic astrocytoma",
                data: 10,
                color: "#1ab394",
                psns: "201re,  206re, 252re, 255re, 302re, 202re"
            },
            {
                label: "Endocrine cancer, NOS",
                data: 4,
                color: "#707070",
                psns: "202re, 211re, 312re, 304re"
            }
        ];

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

        $scope.diseasePieOptions = setupPieChartOptions('#diseaseLegendContainer');

        /*$scope.patients = [
            {
                "Patient": {
                    "slot": "-",
                    "patientSequenceNumber": "103re",
                    "treatmentArmVersion": "2015-08-05",
                    "patientAssignmentStatusOutcome": "OFF_TRIAL",
                    "assignmentLogic": "Assignment Details",
                    "variantReport": "Variant Report",
                    "dateSelected": "August 8, 2015  7:37 PM GMT",
                    "dateOnArm": "-",
                    "dateOffArm": "-",
                    "step": "0",
                    "diseases": "Skin cancer, NOS"
                }
            },
            {
                "Patient": {
                    "slot": "-",
                    "patientSequenceNumber": "105re",
                    "treatmentArmVersion": "2015-01-01",
                    "patientAssignmentStatusOutcome": "NOT_ELIGIBLE",
                    "assignmentLogic": "Assignment Details",
                    "variantReport": "Variant Report",
                    "dateSelected": "January 20, 2015  7:05 PM GMT",
                    "dateOnArm": "-",
                    "dateOffArm": "-",
                    "step": "0",
                    "diseases": "Chondrosarcoma"
                }
            },
            {
                "Patient": {
                    "slot": "1",
                    "patientSequenceNumber": "114re",
                    "treatmentArmVersion": "2015-08-05",
                    "patientAssignmentStatusOutcome": "ON_TREATMENT_ARM",
                    "assignmentLogic": "Assignment Details",
                    "variantReport": "Variant Report",
                    "dateSelected": "September 21, 2015  1:25 PM GMT",
                    "dateOnArm": "2015-09-22",
                    "dateOffArm": "-",
                    "step": "1",
                    "diseases": "Bone cancer, NOS"
                }
            }
        ];*/

        function setupLit(pubmed_ids) {
            var litRefs = [];
            angular.forEach(pubmed_ids, function(value) {
                litRefs.push({"litRef": value});
            });
            return litRefs;
        }

        function setupGeneLoe(variant, retData) {
            variant.gene = retData.gene_name;
            variant.levelOfEvidence = retData.level_of_evidence;
            return variant;
        }

        function setInclusion(variant, inclusionVal) {
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
        
        function setupSnvIndel(variant, value) {
            variant.id = value.identifier;
            variant = setupGeneLoe(variant, value);
            variant.position = value.position;
            variant.alternative = value.alternative;
            variant.chrom = value.chromosome;
            variant.protein = value.description;
            variant.reference = value.reference;
            variant.litRefs = setupLit(value.public_med_ids);
            return variant;
        }
        
        $scope.extraVersion = {};

        $scope.loadTreatmentArmDetails = function(ta) {
            treatmentArmApi
            .getTreatmentArmDetails(ta)
                .then(function (d) {
                    console.log(d.data);
                    angular.forEach(d.data, function(value) {
                        console.log(value);
                        if (value !== [] && value !== null && value !== undefined) {
                            $scope.information.currentStatus = value.treatment_arm_status;
                            $scope.test = "test";
                            $scope.information.name = value.name;
                            $scope.information.description = value.description;
                            $scope.information.genes = value.gene;
                            //$scope.information.patientsAssigned = value.num_patients_assigned;
                            var exclusionDrugs = [];
                            var exclusionDiseases = [];

                            angular.forEach(value.exclusion_drugs, function(value) {
                                var exclusionDrug = {};
                                angular.forEach(value.drugs, function(value) {
                                    exclusionDrug.id = value.drug_id;
                                    exclusionDrug.name = value.name;
                                    exclusionDrugs.push(exclusionDrug);
                                });
                                //exclusionDrug.id = value.id;
                                //exclusionDrug.name = value.name;
                            });
                            angular.forEach(value.exclusion_diseases, function(value) {

                                var exclusionDisease = {};
                                exclusionDisease.medraCode = value.medra_code;
                                exclusionDisease.ctepCategory = value.ctep_category;
                                exclusionDisease.ctepTerm = value.short_name;
                                exclusionDiseases.push(exclusionDisease);
                            });
                            var snvsInclusion = [];
                            var snvsExclusion = [];
                            var indelsInclusion = [];
                            var indelsExclusion = [];
                            var cnvsInclusion = [];
                            var cnvsExclusion = [];
                            var geneFusionsInclusion = [];
                            var geneFusionsExclusion = [];
                            var nhrsInclusion = [];
                            var nhrsExclusion = [];
                            if (value.variant_report !== undefined) {
                                angular.forEach(value.variant_report.single_nucleotide_variants, function(value) {
                                    var snv = {};
                                    snv = setupSnvIndel(snv, value);
                                    if (setInclusion(snv, value.inclusion) === true) {
                                        snvsInclusion.push(snv);
                                    } else {
                                        snvsExclusion.push(snv);
                                    }

                                });
                                angular.forEach(value.variant_report.indels, function(value) {
                                    var indel = {};
                                    indel = setupSnvIndel(indel, value);
                                    if (setInclusion(indel, value.inclusion) === true) {
                                        indelsInclusion.push(indel);
                                    } else {
                                        indelsExclusion.push(indel);
                                    }
                                });
                                angular.forEach(value.variant_report.copy_number_variants, function(value) {
                                    var cnv = {};
                                    cnv = setupGeneLoe(cnv, value);
                                    cnv.chrom = value.chromosome; //
                                    cnv.position = value.position;
                                    cnv.protein = value.description; //
                                    cnv.litRefs = setupLit(value.public_med_ids);
                                    if (setInclusion(cnv, value.inclusion) === true) {
                                        cnvsInclusion.push(cnv);
                                    } else {
                                        cnvsExclusion.push(cnv);
                                    }
                                });
                                angular.forEach(value.variant_report.gene_fusions, function(value) {
                                    var gf = {};
                                    gf.id = value.identifier;
                                    gf = setupGeneLoe(gf, value);
                                    gf.litRefs = setupLit(value.public_med_ids);
                                    if (setInclusion(gf, value.inclusion) === true) {
                                        geneFusionsInclusion.push(gf);
                                    } else {
                                        geneFusionsExclusion.push(gf);
                                    }
                                });
                                angular.forEach(value.variant_report.non_hotspot_rules, function(value) {
                                    var nhr = {};
                                    nhr.exon = value.exon;
                                    nhr.function = value.function;
                                    nhr = setupGeneLoe(nhr, value);
                                    nhr.oncomineVariantClass = value.oncominevariantclass; //
                                    nhr.proteinRegex = value.protein_match; //
                                    nhr.litRefs = setupLit(value.public_med_ids);
                                    if (setInclusion(nhr, value.inclusion) === true) {
                                        nhrsInclusion.push(nhr);
                                    } else {
                                        nhrsExclusion.push(nhr);
                                    }
                                });
                            }

                            var version = {};
                            version.text = value.version;
                            version.exclusionaryDiseases = exclusionDiseases;
                            version.exclusionaryDrugs = exclusionDrugs;
                            version.snvsInclusion = snvsInclusion;
                            version.snvsExclusion = snvsExclusion;
                            version.indelsInclusion = indelsInclusion;
                            version.indelsExclusion = indelsExclusion;
                            version.cnvsInclusion = cnvsInclusion;
                            version.cnvsExclusion = cnvsExclusion;
                            version.geneFusionsInclusion = geneFusionsInclusion;
                            version.geneFusionsExclusion = geneFusionsExclusion;
                            version.nhrsInclusion = nhrsInclusion;
                            version.nhrsExclusion = nhrsExclusion;
                            version.versionHistory = $scope.versionHistory;
                            $scope.versions.push(version);
                            $scope.information.currentVersion = $scope.versions[0].name;

                            var nextVersion = {};
                            nextVersion.text = '2015-12-20';
                            nextVersion.exclusionaryDiseases = exclusionDiseases;
                            nextVersion.exclusionaryDrugs = exclusionDrugs;
                            nextVersion.snvsInclusion = snvsInclusion;
                            nextVersion.snvsExclusion = snvsExclusion;
                            nextVersion.indelsInclusion = indelsInclusion;
                            nextVersion.indelsExclusion = indelsExclusion;
                            nextVersion.cnvsInclusion = cnvsInclusion;
                            nextVersion.cnvsExclusion = cnvsExclusion;
                            nextVersion.geneFusionsInclusion = geneFusionsInclusion;
                            nextVersion.geneFusionsExclusion = geneFusionsExclusion;
                            nextVersion.nhrsInclusion = nhrsInclusion;
                            nextVersion.nhrsExclusion = nhrsExclusion;
                            nextVersion.versionHistory = $scope.versionHistoryClosed;
                            $scope.versions.push(nextVersion);
                        }

                    });
                        
                    $scope.test = "test";
                    $scope.selectedVersion = $scope.versions[0];
                })
                .then (function() {
                    $scope.inExclusionType = 'inclusion';
                    setInExclusion();
                });
        };

    });