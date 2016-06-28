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

        /*
        To get the zero records message, add to above type: 'oLanguage': {"sEmptyTable": "There are no SNV inclusions"}
         */

        $scope.test = '';

        $scope.information = {
            name: 'EAY131-A',
            description: 'Dasatinib in DDR2 activating mutations',
            currentVersion: '2016-03-17',
            genes: 'DDR2',
            patientsAssigned: '0',
            currentStatus: 'OPEN',
            drug: 'AZD9291 (781254)'
        };

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

        //$scope.versions = [];

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
                snvsInclusion: [
                    {
                        "identifier": "COSM1256700",
                        "gene_name": "EBFRA",
                        "levelOfEvidence": "2",
                        "chromosome": "chr7",
                        "position": "5522678451",
                        "reference": "G",
                        "alternative": "A",
                        "litRefs": [
                            {
                                "litRef": "26051236"
                            }
                        ],
                        "protein": "p.G719A",
                        "totNumPtsWithVariant": "1",
                        "ptsWithVariantOnArm": "1",
                        "pctPtsWithVarOnArmOfTotPtsWithVar": "20%",
                        "inclusion": true,
                        "exclusion": false
                    },
                    {
                        "identifier": "COSM125678",
                        "gene_name": "EBFRA",
                        "levelOfEvidence": "2",
                        "chromosome": "chr7",
                        "position": "5522678455",
                        "reference": "C",
                        "alternative": "T",
                        "litRefs": [
                            {
                                "litRef": "26051236"
                            },
                            {
                                "litRef": "19692684"
                            }
                        ],
                        "protein": "p.G719A",
                        "totNumPtsWithVariant": "0",
                        "ptsWithVariantOnArm": "0",
                        "pctPtsWithVarOnArmOfTotPtsWithVar": "0%",
                        "inclusion": true,
                        "exclusion": false
                    },
                    {
                        "identifier": "COSM99995",
                        "gene_name": "EBFRA",
                        "levelOfEvidence": "1",
                        "chromosome": "chr7",
                        "position": "5522678457",
                        "reference": "C",
                        "alternative": "T",
                        "litRefs": [
                            {
                                "litRef": "26051236"
                            }
                        ],
                        "protein": "p.G719A",
                        "totNumPtsWithVariant": "0",
                        "ptsWithVariantOnArm": "0",
                        "pctPtsWithVarOnArmOfTotPtsWithVar": "0%",
                        "inclusion": true,
                        "exclusion": false
                    },
                    {
                        "identifier": "COSM9999000",
                        "gene_name": "EBFRA",
                        "levelOfEvidence": "1",
                        "chromosome": "chr7",
                        "position": "5522678459",
                        "reference": "C",
                        "alternative": "T",
                        "litRefs": [
                            {
                                "litRef": "26051236"
                            },
                            {
                                "litRef": "19692684"
                            }
                        ],
                        "protein": "p.G719A",
                        "totNumPtsWithVariant": "2",
                        "ptsWithVariantOnArm": "1",
                        "pctPtsWithVarOnArmOfTotPtsWithVar": "20%",
                        "inclusion": true,
                        "exclusion": false
                    }
                ],
                snvsExclusion: [
                    {
                        "identifier": "COSM746",
                        "gene_name": "PIK3CA",
                        "levelOfEvidence": "3",
                        "chromosome": "chr7",
                        "position": "5522678453",
                        "reference": "C",
                        "alternative": "T",
                        "litRefs": [
                            {
                                "litRef": "21266528"
                            }
                        ],
                        "protein": "p.G719A",
                        "inclusion": false,
                        "exclusion": true
                    },
                    {
                        "identifier": "COSM757",
                        "gene_name": "PIK3CA",
                        "levelOfEvidence": "2",
                        "chromosome": "chr7",
                        "position": "178927980",
                        "reference": "G",
                        "alternative": "A",
                        "litRefs": [
                            {
                                "litRef": "17376864"
                            },
                            {
                                "litRef": "22949682"
                            }

                        ],
                        "protein": "p.G719A",
                        "inclusion": false,
                        "exclusion": true
                    }
                ],
                indelsInclusion: [
                    {
                        "identifier": "COSM746",
                        "gene_name": "ALK",
                        "levelOfEvidence": "3",
                        "chromosome": "chr7",
                        "position": "5522678453",
                        "reference": "C",
                        "alternative": "T",
                        "litRefs": [
                            {
                                "litRef": "21266528"
                            }
                        ],
                        "protein": "p.G719A",
                        "totNumPtsWithVariant": "0",
                        "ptsWithVariantOnArm": "0",
                        "pctPtsWithVarOnArmOfTotPtsWithVar": "0%",
                        "inclusion": false,
                        "exclusion": true
                    },
                    {
                        "identifier": "COSM763",
                        "gene_name": "ALK",
                        "levelOfEvidence": "2",
                        "chromosome": "chr7",
                        "position": "552267845",
                        "reference": "G",
                        "alternative": "A",
                        "litRefs": [
                            {
                                "litRef": "17376864"
                            }
                        ],
                        "protein": "p.G719A",
                        "totNumPtsWithVariant": "2",
                        "ptsWithVariantOnArm": "1",
                        "pctPtsWithVarOnArmOfTotPtsWithVar": "20%",
                        "inclusion": false,
                        "exclusion": true
                    },
                    {
                        "identifier": "COSM765",
                        "gene_name": "ALK",
                        "levelOfEvidence": "2",
                        "chromosome": "chr7",
                        "position": "552267845",
                        "reference": "G",
                        "alternative": "A",
                        "litRefs": [
                            {
                                "litRef": "17376864"
                            }
                        ],
                        "protein": "p.G719A",
                        "totNumPtsWithVariant": "2",
                        "ptsWithVariantOnArm": "1",
                        "pctPtsWithVarOnArmOfTotPtsWithVar": "20%",
                        "inclusion": false,
                        "exclusion": true
                    }
                ],
                indelsExclusion: [],
                cnvsInclusion: [
                    {
                        "gene_name": "ERBB2",
                        "levelOfEvidence": "1",
                        "chromosome": "chr17",
                        "position": "37856492",
                        "litRefs": [
                            {
                                "litRef": "19692684"
                            }
                        ],
                        "protein": "ERBB2 Amplification",
                        "totNumPtsWithVariant": "0",
                        "ptsWithVariantOnArm": "0",
                        "pctPtsWithVarOnArmOfTotPtsWithVar": "-",
                        "inclusion": true,
                        "exclusion": false
                    }
                ],
                cnvsExclusion: [
                    {
                        "gene_name": "ERBB661",
                        "levelOfEvidence": "1",
                        "chromosome": "chr17",
                        "position": "3785648800",
                        "litRefs": [
                            {
                                "litRef": "26051236"
                            }
                        ],
                        "protein": "ERBB661 Amplification",
                        "inclusion": false,
                        "exclusion": true
                    }
                ],
                geneFusionsInclusion: [],
                geneFusionsExclusion: [],
                nhrsInclusion: [
                    {
                        "oncomineVariantClass": "-",
                        "gene_name": "EGFR",
                        "levelOfEvidence" : "1",
                        "function": "nonframeshiftinsertion",
                        "litRefs": [
                            {
                                "litRef": "26051236"
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
                        "gene_name": "EBFRA",
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
                        "gene_name": "ABBC",
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
                        "gene_name": "ALK",
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
                snvsInclusion: [
                    {
                        "id": "COSM776",
                        "gene_name": "PIK3CA",
                        "levelOfEvidence": "1",
                        "chromosome": "chr7",
                        "position": "22120714",
                        "reference": "C",
                        "alternative": "T",
                        "litRefs": [
                            {
                                "litRef": "26051236"
                            }
                        ],
                        "protein": "p.G719A",
                        "totNumPtsWithVariant": "0",
                        "ptsWithVariantOnArm": "0",
                        "pctPtsWithVarOnArmOfTotPtsWithVar": "0%",
                        "inclusion": true,
                        "exclusion": false
                    },
                    {
                        "id": "COSM776",
                        "gene_name": "PIK3CA",
                        "levelOfEvidence": "1",
                        "chromosome": "chr7",
                        "position": "5522678459",
                        "reference": "C",
                        "alternative": "T",
                        "litRefs": [
                            {
                                "litRef": "17376964"
                            },
                            {
                                "litRef": "17376963"
                            }
                        ],
                        "protein": "p.G719A",
                        "totNumPtsWithVariant": "2",
                        "ptsWithVariantOnArm": "1",
                        "pctPtsWithVarOnArmOfTotPtsWithVar": "20%",
                        "inclusion": true,
                        "exclusion": false
                    }
                ],
                snvsExclusion: [
                    {
                        "id": "COSM774",
                        "gene_name": "PIK3CA",
                        "levelOfEvidence": "3",
                        "chromosome": "chr7",
                        "position": "5522678453",
                        "reference": "C",
                        "alternative": "T",
                        "litRefs": [
                            {
                                "litRef": "17376866"
                            }
                        ],
                        "protein": "p.G719A",
                        "inclusion": false,
                        "exclusion": true
                    }
                ],
                indelsInclusion: [],
                indelsExclusion: [
                    {
                        "id": "COSM111112345",
                        "gene_name": "EBFRA",
                        "levelOfEvidence": "3",
                        "chromosome": "chr7",
                        "position": "5522678453",
                        "reference": "C",
                        "alternative": "T",
                        "litRefs": [
                            {
                                "litRef": "19692684"
                            }
                        ],
                        "protein": "p.G719A",
                        "inclusion": false,
                        "exclusion": true
                    },
                    {
                        "id": "COSM000012567",
                        "gene_name": "EBFRA",
                        "levelOfEvidence": "2",
                        "chromosome": "chr7",
                        "position": "552267845",
                        "reference": "G",
                        "alternative": "A",
                        "litRefs": [
                            {
                                "litRef": "26051236"
                            }
                        ],
                        "protein": "p.G719A",
                        "inclusion": false,
                        "exclusion": true
                    }
                ],
                cnvsInclusion: [],
                cnvsExclusion: [],
                geneFusionsInclusion: [
                    {
                        "id": "EML4-ALK.E13A20.COSF1062",
                        "gene_name": "ALK",
                        "levelOfEvidence": "1",
                        "litRefs": [
                            {
                                "litRef": "23724913"
                            }
                        ],
                        "totNumPtsWithVariant": "0",
                        "ptsWithVariantOnArm": "0",
                        "pctPtsWithVarOnArmOfTotPtsWithVar": "-",
                        "inclusion": true,
                        "exclusion": false

                    },
                    {
                        "id": "EML4-ALK.E13A20.COSF1065",
                        "gene_name": "ALK",
                        "levelOfEvidence": "1",
                        "litRefs": [
                            {
                                "litRef": "26051236"
                            },
                            {
                                "litRef": "19692684"
                            }
                        ],
                        "totNumPtsWithVariant": "0",
                        "ptsWithVariantOnArm": "0",
                        "pctPtsWithVarOnArmOfTotPtsWithVar": "-",
                        "inclusion": true,
                        "exclusion": false
                    },
                    {
                        "id": "EML4-ALK.E13A20.COSF1762",
                        "gene_name": "ALK",
                        "levelOfEvidence": "1",
                        "litRefs": [
                            {
                                "litRef": "26051236"
                            },
                            {
                                "litRef": "19692684"
                            }
                        ],
                        "totNumPtsWithVariant": "0",
                        "ptsWithVariantOnArm": "0",
                        "pctPtsWithVarOnArmOfTotPtsWithVar": "-",
                        "inclusion": true,
                        "exclusion": false
                    }
                ],
                geneFusionsExclusion: [
                    {
                        "id": "EML4-ALK.EBA17",
                        "gene_name": "ALK",
                        "levelOfEvidence": "1",
                        "litRefs": [
                            {
                                "litRef": "234566"
                            }
                        ],
                        "inclusion": false,
                        "exclusion": true
                    }
                ],
                nhrsInclusion: [
                    {
                        "oncomineVariantClass": "-",
                        "gene_name": "EGFR",
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
                        "gene_name": "EBFRA",
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
                        "gene_name": "ABBC",
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
                        "gene_name": "ALK",
                        "result": "NEGATIVE",
                        "variantAssociation": "EMPTY",
                        "levelOfEvidence": "1",
                        "inclusion": false,
                        "exclusion": true
                    }
                ]
            }
        ];

        $scope.selectedVersion = $scope.versions[0];

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

        function changeHeight() {
            document.getElementById("diseasePieChartContainer").style["height"] = window.innerWidth/3.2 + "px";
            document.getElementById("patientPieChartContainer").style["height"] = window.innerWidth/3.2 + "px";
        }

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

        $scope.patients = [
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
        ];

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

        $scope.setInclusionExclusion = function(variantName, variant) {
            if (isInclusion(variant, variant.inclusion) === true) {
                $scope[ variantName + 'sInclusion' ].push(variant);
            } else {
                $scope[ variantName + 'sExclusion' ].push(variant);
            }
        };

        $scope.setupSnvIndel = function(variantName, value) {
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
        
        $scope.loadPatientsForTa = function(ta) {
          treatmentArmApi
              .getPatientsForTa(ta)
              .then(function (d) {
                  console.log(d.data);
              });
        };

        function setTADrug(drugsArray) {
            var drugString = '';
            drugString = drugsArray[0].name + ' (' + drugsArray[0].drug_id + ')';
            if (drugsArray.length > 1) {
                drugString = drugString + ', ' + drugsArray[1].name + ' (' + drugsArray[1].drug_id + ')';
            }
            return drugString;
        }

        $scope.loadTreatmentArmDetails = function(ta) {
            treatmentArmApi
            .getTreatmentArmDetails(ta)
                .then(function (d) {
                    console.log(d.data);
                    /*angular.forEach(d.data, function(value) {
                        console.log('value');
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

                            var nonSequencingAssays = [];

                            angular.forEach(value.exclusion_drugs, function(value) {
                                var exclusionDrug = {};
                                //angular.forEach(value.drugs, function(value) {
                                    exclusionDrug.id = value.drug_id;
                                    exclusionDrug.name = value.name;
                                    exclusionDrugs.push(exclusionDrug);
                                //});
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
                            angular.forEach(value.treatment_arm_drugs, function(value) {
                                var inclusionDrug = {};
                                inclusionDrug.id = value.drug_id;
                                inclusionDrug.name = value.name;
                            });

                            var treatmentArmDrug = '';
                            if (value.treatment_arm_drugs !== null && value.treatment_arm_drugs !== undefined) {
                                treatmentArmDrug = setTADrug(value.treatment_arm_drugs);
                            }
                            $scope.information.drug = treatmentArmDrug;

                            angular.forEach(value.pten_results, function(value) {
                               var nonSequencingAssay = {};
                                nonSequencingAssay.assay = value.assay;
                                nonSequencingAssay.gene = value.gene_name;
                                nonSequencingAssay.result = value.pten_ihc_result;
                                nonSequencingAssay.variantAssociation = value.pten_variant;
                                nonSequencingAssay.levelOfEvidence = value.level_of_evidence;
                                nonSequencingAssays.push(nonSequencingAssay);
                            });

                            if (value.variant_report !== undefined) {
                                angular.forEach(value.variant_report.single_nucleotide_variants, function(value) {
                                    $scope.setupSnvIndel('snv', value);
                                });
                                angular.forEach(value.variant_report.indels, function(value) {
                                    $scope.setupSnvIndel('indel', value);
                                });
                                angular.forEach(value.variant_report.copy_number_variants, function(value) {
                                    var cnv = {};
                                    cnv = setupGeneLoe(cnv, value);
                                    cnv.chrom = value.chromosome; //
                                    cnv.position = value.position;
                                    cnv.protein = value.description; //
                                    cnv.litRefs = setupLit(value.public_med_ids);
                                    $scope.setInclusionExclusion('cnv', value);
                                });
                                angular.forEach(value.variant_report.gene_fusions, function(value) {
                                    var gf = {};
                                    gf.id = value.identifier;
                                    gf = setupGeneLoe(gf, value);
                                    gf.litRefs = setupLit(value.public_med_ids);
                                    $scope.setInclusionExclusion('gf', value);
                                });
                                angular.forEach(value.variant_report.non_hotspot_rules, function(value) {
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
                            version.latest = 'This is the latest version.';
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
                            $scope.information.currentVersion = $scope.versions[0].name;

                            /*var nextVersion = {};
                            nextVersion.text = '2015-12-20';
                            nextVersion.latest = 'This is not the latest version.';
                            nextVersion.exclusionaryDiseases = exclusionDiseases;
                            nextVersion.exclusionaryDrugs = exclusionDrugs;
                            nextVersion.inclusionaryDrugs = inclusionDrugs;
                            nextVersion.snvsInclusion = $scope.snvsInclusion;
                            nextVersion.snvsExclusion = $scope.snvsExclusion;
                            nextVersion.indelsInclusion = $scope.indelsInclusion;
                            nextVersion.indelsExclusion = $scope.indelsExclusion;
                            nextVersion.cnvsInclusion = $scope.cnvsInclusion;
                            nextVersion.cnvsExclusion = $scope.cnvsExclusion;
                            nextVersion.geneFusionsInclusion = $scope.gfsInclusion;
                            nextVersion.geneFusionsExclusion = $scope.gfsExclusion;
                            nextVersion.nhrsInclusion = $scope.nhrsInclusion;
                            nextVersion.nhrsExclusion = $scope.nhrsExclusion;
                            nextVersion.nonSequencingAssays = nonSequencingAssays;
                            nextVersion.versionHistory = $scope.versionHistoryClosed;
                            $scope.versions.push(nextVersion);*/
                        /*}

                    });*/
                        
                    $scope.test = "test";
                    $scope.selectedVersion = $scope.versions[0];
                    console.log($scope.selectedVersion);
                })
                .then (function() {
                    $scope.inExclusionType = 'inclusion';
                    setInExclusion();
                    changeHeight();
                    $(window).on("resize.doResize", function() {
                        $scope.$apply(function() {
                            changeHeight();
                        });
                    });
                });
        };

    });