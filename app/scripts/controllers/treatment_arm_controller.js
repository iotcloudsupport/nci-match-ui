angular.module('treatment-arm.matchbox',[])
    .controller('TreatmentArmController', function( $scope, $window, DTOptionsBuilder, DTColumnDefBuilder, treatmentArmApi) {

        this.dtOptions = DTOptionsBuilder.newOptions()
            .withOption('paging', false)
            .withOption('info', false);

        this.dtColumnDefs = [];
        this.dtInstance = {};

        this.activeChoice = 'inclusion';

        this.ddOptions = DTOptionsBuilder.newOptions()
            .withOption('paging', false)
            .withOption('info', false)
            .withOption('bFilter', false);

        this.altColumnDefs = [
            DTColumnDefBuilder.newColumnDef(4).withOption('createdCell', createpubmedlinks)
        ];

        function createpubmedlinks(td, cellData,  rowData, row, col) {
            console.log(td);
            console.log(cellData);
            console.log(rowData);
            console.log(row);
            console.log(col);
            
            $(td).html('<a onClick="openPubMed()">' + cellData + '</a>');
        };

        $scope.openPubMed = function(data) {
            $window.open("http://www.ncbi.nlm.nih.gov/pubmed/?term="+data, 'lit', "width=600, height=400");

        };

        $scope.openGene = function(data) {
            $window.open('http://cancer.sanger.ac.uk/cosmic/gene/overview?ln='+data.toLowerCase(), 'cosmic', 'width=500,height=400');
        };

        $scope.openId = function(cosmicId) {
            var cid = "";
            var cia = [];

            if (cosmicId !== undefined && cosmicId !== null) {
                var tmp = cosmicId.indexOf("COSF");

                if(tmp > 0) {
                    cid = cosmicId.substring(tmp, cosmicId.length);
                    cia = cid.split("COSF");
                    var fid =  cia[1].split(".");
                    $window.open('http://cancer.sanger.ac.uk/cosmic/fusion/summary?id='+fid[0], 'cosmic', 'width=500,height=400');
                } else {
                    var tmp = cosmicId.indexOf("COSM");

                    if(tmp != -1) {
                        cid = cosmicId.substring(tmp, cosmicId.length);
                        cia = cid.split("COSM");
                        var fid =  cia[1].split(".");
                        $window.open("http://cancer.sanger.ac.uk/cosmic/mutation/overview?id="+fid[0], "cosmic", 'width=500,height=400');
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
                color: "#ab0102",
                psns: "202re, 211re, 252re, 255re, 304re"
            }
        ];

        $scope.diseasePieDataset = [
            {
                label: "Endocrine cancer, NOS",
                data: 3,
                color: "#707070",
                psns: "215re, 205re, 203re"
            },
            {
                label: "Glioblastoma multiforme",
                data: 6,
                color: "#cfcfcf",
                psns: "201re,  206re, 252re, 255re, 302re, 202re"
            },
            {
                label: "Head & neck cancer, NOS",
                data: 4,
                color: "#23c6c8",
                psns: "202re, 211re, 312re, 304re"
            },
            {
                label: "Retinoblastoma",
                data: 2,
                color: "#1c84c6",
                psns: "201re,  206re, 252re, 255re, 302re, 202re"
            },
            {
                label: "Skin Cancer, NOS",
                data: 7,
                color: "#ab0102",
                psns: "202re, 211re, 312re, 304re"
            },
            {
                label: "Breast Cancer, NOS",
                data: 10,
                color: "#f8ac59",
                psns: "201re,  206re, 252re, 255re, 302re, 202re"
            },
            {
                label: "Bone cancer, NOS",
                data: 4,
                color: "#707070",
                psns: "202re, 211re, 312re, 304re"
            },
            {
                label: "Chrondrosarcoma",
                data: 2,
                color: "#cfcfcf",
                psns: "201re,  206re, 252re, 255re, 302re, 202re"
            },
            {
                label: "Diffuse brainstem glioma",
                data: 7,
                color: "#23c6c8",
                psns: "202re, 211re, 312re, 304re"
            },
            {
                label: "Anaplastic astrocytoma",
                data: 10,
                color: "#1c84c6",
                psns: "201re,  206re, 252re, 255re, 302re, 202re"
            },
            {
                label: "Endocrine cancer, NOS",
                data: 4,
                color: "#ab0102",
                psns: "202re, 211re, 312re, 304re"
            }
        ];

        function setupTooltip(label, xval, yval) {
            return label + "<br>------------------------------------------<br>Patients: " + yval;
        }

        $scope.pieOptions = {
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
                container: '#legendContainer'
            }
        };

        $scope.diseasePieOptions = {
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
                    console.log(label);
                    console.log(yval);
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
                container: '#diseaseLegendContainer'
            }
        };

        $scope.indelsInclusion = [];

        $scope.indelsExclusion =
            [
                {
                    "Indel": {
                        "id": "COSM111112345",
                        "gene": "EBFRA",
                        "levelOfEvidence": "3",
                        "chrom": "chr7",
                        "position": "5522678453",
                        "reference": "C",
                        "alternative": "T",
                        "litRefs": [
                            {
                                "litRef": "19692684"
                            }
                        ],
                        "protein": "p.G719A",
                        "totNumPtsWithVariant": "0",
                        "ptsWithVariantOnArm": "0",
                        "pctPtsWithVarOnArmOfTotPtsWithVar": "0%",
                        "inclusion": false,
                        "exclusion": true
                    },
                },
                {
                    "Indel": {
                        "id": "COSM000012567",
                        "gene": "EBFRA",
                        "levelOfEvidence": "2",
                        "chrom": "chr7",
                        "position": "552267845",
                        "reference": "G",
                        "alternative": "A",
                        "litRefs": [
                            {
                                "litRef": "26051236"
                            }
                        ],
                        "protein": "p.G719A",
                        "totNumPtsWithVariant": "2",
                        "ptsWithVariantOnArm": "1",
                        "pctPtsWithVarOnArmOfTotPtsWithVar": "20%",
                        "inclusion": false,
                        "exclusion": true
                    },
                }
            ];

        $scope.snvsInclusion =
            [
                {
                    "SNV": {
                        "id": "COSM1256700",
                        "gene": "EBFRA",
                        "levelOfEvidence": "2",
                        "chrom": "chr7",
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
                },
                {
                    "SNV": {
                        "id": "COSM125678",
                        "gene": "EBFRA",
                        "levelOfEvidence": "2",
                        "chrom": "chr7",
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
                },
                {
                    "SNV": {
                        "id": "COSM99995",
                        "gene": "EBFRA",
                        "levelOfEvidence": "1",
                        "chrom": "chr7",
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
                },
                {
                    "SNV": {
                        "id": "COSM9999000",
                        "gene": "EBFRA",
                        "levelOfEvidence": "1",
                        "chrom": "chr7",
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
                    },
                }
            ];

        $scope.snvsExclusion =
            [
                {
                    "SNV": {
                        "id": "COSM746",
                        "gene": "PIK3CA",
                        "levelOfEvidence": "3",
                        "chrom": "chr7",
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
                },
                {
                    "SNV": {
                        "id": "COSM757",
                        "gene": "PIK3CA",
                        "levelOfEvidence": "2",
                        "chrom": "chr7",
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
                    },
                }
            ];

        $scope.cnvsInclusion = [
            {
                "CNV": {
                    "gene": "ERBB2",
                    "levelOfEvidence": "1",
                    "chrom": "chr17",
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
                },
            }
        ];

        $scope.cnvsExclusion = [
            {
                "CNV": {
                    "gene": "ERBB661",
                    "levelOfEvidence": "1",
                    "chrom": "chr17",
                    "position": "3785648800",
                    "litRefs": [
                        {
                            "litRef": "26051236"
                        }
                    ],
                    "protein": "ERBB661 Amplification",
                    "inclusion": false,
                    "exclusion": true
                },
            }
        ];


        $scope.geneFusionsInclusion = [
            {
                "GF": {
                    "id": "EML4-ALK.E13A20.COSF1062",
                    "gene": "ALK",
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
            },
            {
                "GF": {
                    "id": "EML4-ALK.E13A20.COSF1065",
                    "gene": "ALK",
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
            },
            {
                "GF": {
                    "id": "EML4-ALK.E13A20.COSF1762",
                    "gene": "ALK",
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
            }
        ];

        $scope.geneFusionsExclusion = [
            {
                "GF": {
                    "id": "EML4-ALK.EBA17",
                    "gene": "ALK",
                    "levelOfEvidence": "1",
                    "litRefs": [
                        {
                            "litRef": "234566"
                        }
                    ],
                    "inclusion": false,
                    "exclusion": true
                },
            }
        ];

        $scope.nhrsInclusion = [
            {
                "NHR": {
                    "oncomineVariantClass": "-",
                    "gene": "EGFR",
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
                },
            },
            {
                "NHR": {
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
                },
            }

        ];

        $scope.nhrsExclusion = [];

        $scope.exclusionaryDrugs = [
            {
                "ExclDrug": {
                    "id": "750691",
                    "name": "Afatinib"
                },
            },
            {
                "ExclDrug": {
                    "id": "781254",
                    "name": "AZD9291"
                },
            },
            {
                "ExclDrug": {
                    "id": "749005",
                    "name": "Crizotinib"
                }
            }
        ];

        $scope.exclusionaryDiseases = [
            {
                "ExclDisease": {
                    "ctepCategory": "Non-Small Cell Lung Cancer",
                    "ctepTerm": "Lung adenocarcinoma",
                    "medraCode": "10025032"
                },
            },
            {
                "ExclDisease": {
                    "ctepCategory": "Small Cell Lung Cancer",
                    "ctepTerm": "Small Cell Lung Cancer",
                    "medraCode": "10041071"
                },
            }
        ];


        $scope.nonSequencingAssaysInclusion = [
            {
                "NsAssay": {
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
            },
            {
                "NsAssay": {
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
                },
            }
        ];

        $scope.nonSequencingAssaysExclusion = [
            {
                "NsAssay": {
                    "assay": "IHC",
                    "gene": "ALK",
                    "result": "NEGATIVE",
                    "variantAssociation": "EMPTY",
                    "levelOfEvidence": "1",
                    "inclusion": false,
                    "exclusion": true
                },
            }
        ];

        $scope.exclusionCriteria = [
            {
                "ExclCrit": {
                    "id": "10034",
                    "description": "Test criteria 1"
                },
            },
            {
                "ExclCrit": {
                    "id": "19005",
                    "description": "Test criteria 2"
                }
            }
        ];

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
                },
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
                },
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

        $scope.flotBarOptions = {
            series: {
                bars: {
                    show: true,
                    barWidth: 0.4,
                    fill: true,
                    fillColor: {
                        colors: [
                            {
                                opacity: 0.8
                            },
                            {
                                opacity: 0.8
                            }
                        ]
                    }
                }
            },
            xaxis: {
                tickDecimals: 0
            },
            colors: ["#bababa"],
            grid: {
                color: "#999999",
                hoverable: true,
                clickable: true,
                tickColor: "#D4D4D4",
                borderWidth: 2
            },
            legend: {
                show: false
            },
            tooltip: true,
            tooltipOpts: {
                content: "x: %x, y: %y"
            }
        };



    });