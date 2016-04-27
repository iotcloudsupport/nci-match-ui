angular.module('treatment-arm.matchbox',[])
    .controller('TreatmentArmController', function( $scope, DTOptionsBuilder, DTColumnDefBuilder, treatmentArmApi) {

        /*this.dtOptions = DTOptionsBuilder.newOptions()
            .withDisplayLength(25);
        this.dtOptions = DTOptionsBuilder.newOptions()
            .withOption('lengthChange', false);*/

        this.dtOptions = DTOptionsBuilder.newOptions()
            .withOption('paging', false)
            .withOption('info', false);

       /*this.dtOptions = DTOptionsBuilder.newOptions()
            .withOption('ordering', false);*/
        /*this.dtOptions = DTOptionsBuilder.newOptions()
            .withOption('info', false);*/

        this.dtColumnDefs = [];
        this.dtInstance = {};

        this.activeChoice = 'inclusion';

        /*
         .controller('DashboardActivityFeedController', function( $scope, DTOptionsBuilder, DTColumnDefBuilder, matchApi, reportApi ) {
         this.dtOptions = DTOptionsBuilder.newOptions()
         .withDisplayLength(25);
         this.dtOptions = DTOptionsBuilder.newOptions()
         .withOption('bLengthChange', false);

         this.dtColumnDefs = [];
         this.dtInstance = {};

         $scope.activityList = [];
         */

        $scope.pieDataset = [
            {
                label: "ON_TREATMENT_ARM",
                data: 5,
                color: "#1c84c6", //color: "#bababa",
                psns: "215re, 203re, 312re"
            },
            {
                label: "PENDING_APPROVAL",
                data: 3,
                color: "#23c6c8", //color: "#9933FF",
                psns: "201re, 302re"
            },
            {
                label: "FORMERLY_ON_TREATMENT_ARM",
                data: 2,
                color: "#f8ac59", //color: "#f8c706",
                psns: "205re, 206re"
            },
            {
                label: "NOT_ELIGIBLE",
                data: 1,
                color: "#ab0102", //color: "#00bd07",
                psns: "202re, 211re, 252re, 255re, 304re"
            }
        ];

        $scope.diseasePieDataset = [
            {
                label: "Endocrine cancer, NOS", //--215re, 205re, 203re",
                data: 3,
                color: "#707070", //"#1c84c6",
                psns: "215re, 205re, 203re"
            },
            {
                label: "Glioblastoma multiforme", //--201re,  206re, 252re, 255re, 302re, 202re",
                data: 6,
                color: "#cfcfcf", //"#f8ac59",
                psns: "201re,  206re, 252re, 255re, 302re, 202re"
            },
            {
                label: "Head & neck cancer, NOS", //--202re, 211re, 312re, 304re",
                data: 4,
                color: "#23c6c8", //"#23c6c8",
                psns: "202re, 211re, 312re, 304re"
            },
            {
                label: "Retinoblastoma", //--201re,  206re, 252re, 255re, 302re, 202re",
                data: 2,
                color: "#1c84c6", //"#62c2ff",
                psns: "201re,  206re, 252re, 255re, 302re, 202re"
            },
            {
                label: "Skin Cancer, NOS", //--202re, 211re, 312re, 304re",
                data: 7,
                color: "#ab0102", //"#f8ce9f",
                psns: "202re, 211re, 312re, 304re"
            },
            {
                label: "Breast Cancer, NOS", //--201re,  206re, 252re, 255re, 302re, 202re",
                data: 10,
                color: "#f8ac59", //"#7dc3c8",
                psns: "201re,  206re, 252re, 255re, 302re, 202re"
            },
            {
                label: "Bone cancer, NOS", //--202re, 211re, 312re, 304re",
                data: 4,
                color: "#707070", //"#29516b",
                psns: "202re, 211re, 312re, 304re"
            },
            {
                label: "Chrondrosarcoma", //--201re,  206re, 252re, 255re, 302re, 202re",
                data: 2,
                color: "#cfcfcf", //"#8c6231",
                psns: "201re,  206re, 252re, 255re, 302re, 202re"
            },
            {
                label: "Diffuse brainstem glioma", //--202re, 211re, 312re, 304re",
                data: 7,
                color: "#23c6c8", //"#0D4B4c",
                psns: "202re, 211re, 312re, 304re"
            },
            {
                label: "Anaplastic astrocytoma", //--201re,  206re, 252re, 255re, 302re, 202re",
                data: 10,
                color: "#1c84c6", //"#1A7585",
                psns: "201re,  206re, 252re, 255re, 302re, 202re"
            },
            {
                label: "Endocrine cancer, NOS", //--202re, 211re, 312re, 304re",
                data: 4,
                color: "#ab0102", //"#23c6c8",
                psns: "202re, 211re, 312re, 304re"
            }

        ];

        function setupTooltip(label, xval, yval) {
            /*
             var retString = label;
             var pos = retString.search("--");
             return retString.substring(0, pos);
             */
            //var pos = label.search("--");
            //return label.substring(0, pos) + "<br><span>----------------------------------</span><br>" + label.substring(pos+2);
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
                //content: "%p.0%, %s",
                content: function(label, xval, yval) {
                    //console.log(label);
                    //console.log(yval);
                    //console.log($scope.diseasePieDataset[0].psns);
                    return setupTooltip(label, xval, yval);
                    //return "%p.0%, %s " + "test" + psns;
                },
                shifts: {
                    x: 20,
                    y: 0
                },
                defaultTheme: true
            },
            legend: {
                show: true,
                //position: "nw"
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
                //content: "%p.0%, %s",
                content: function(label, xval, yval) {
                    console.log(label);
                    console.log(yval);
                    return setupTooltip(label, xval, yval);
                    //return "%p.0%, %s " + "test" + psns;
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

        $scope.indels =
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
                        "litRef": "2348587",
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
                        "litRef": "2348587",
                        "protein": "p.G719A",
                        "totNumPtsWithVariant": "2",
                        "ptsWithVariantOnArm": "1",
                        "pctPtsWithVarOnArmOfTotPtsWithVar": "20%",
                        "inclusion": false,
                        "exclusion": true
                    },
                },
                {
                    "Indel": {
                        "id": "COSM1256700",
                        "gene": "EBFRA",
                        "levelOfEvidence": "2",
                        "chrom": "chr7",
                        "position": "5522678451",
                        "reference": "G",
                        "alternative": "A",
                        "litRef": "2348587",
                        "protein": "p.G719A",
                        "totNumPtsWithVariant": "1",
                        "ptsWithVariantOnArm": "1",
                        "pctPtsWithVarOnArmOfTotPtsWithVar": "20%",
                        "inclusion": true,
                        "exclusion": false
                    },
                },
                {
                    "Indel": {
                        "id": "COSM125678",
                        "gene": "EBFRA",
                        "levelOfEvidence": "2",
                        "chrom": "chr7",
                        "position": "5522678455",
                        "reference": "C",
                        "alternative": "T",
                        "litRef": "2348587",
                        "protein": "p.G719A",
                        "totNumPtsWithVariant": "0",
                        "ptsWithVariantOnArm": "0",
                        "pctPtsWithVarOnArmOfTotPtsWithVar": "0%",
                        "inclusion": true,
                        "exclusion": false
                    },
                },
                {
                    "Indel": {
                        "id": "COSM99995",
                        "gene": "EBFRA",
                        "levelOfEvidence": "1",
                        "chrom": "chr7",
                        "position": "5522678457",
                        "reference": "C",
                        "alternative": "T",
                        "litRef": "2348587",
                        "protein": "p.G719A",
                        "totNumPtsWithVariant": "0",
                        "ptsWithVariantOnArm": "0",
                        "pctPtsWithVarOnArmOfTotPtsWithVar": "0%",
                        "inclusion": true,
                        "exclusion": false
                    },
                },
                {
                    "Indel": {
                        "id": "COSM9999000",
                        "gene": "EBFRA",
                        "levelOfEvidence": "1",
                        "chrom": "chr7",
                        "position": "5522678459",
                        "reference": "C",
                        "alternative": "T",
                        "litRef": "2348587",
                        "protein": "p.G719A",
                        "totNumPtsWithVariant": "2",
                        "ptsWithVariantOnArm": "1",
                        "pctPtsWithVarOnArmOfTotPtsWithVar": "20%",
                        "inclusion": true,
                        "exclusion": false
                    },
                }
            ];

        $scope.snvs =
            [
                {
                    "SNV": {
                        "id": "COSM111112345",
                        "gene": "EBFRA",
                        "levelOfEvidence": "3",
                        "chrom": "chr7",
                        "position": "5522678453",
                        "reference": "C",
                        "alternative": "T",
                        "litRef": "2348587",
                        "protein": "p.G719A",
                        "totNumPtsWithVariant": "0",
                        "ptsWithVariantOnArm": "0",
                        "pctPtsWithVarOnArmOfTotPtsWithVar": "0%",
                        "inclusion": false,
                        "exclusion": true
                    },
                },
                {
                    "SNV": {
                        "id": "COSM000012567",
                        "gene": "EBFRA",
                        "levelOfEvidence": "2",
                        "chrom": "chr7",
                        "position": "552267845",
                        "reference": "G",
                        "alternative": "A",
                        "litRef": "2348587",
                        "protein": "p.G719A",
                        "totNumPtsWithVariant": "2",
                        "ptsWithVariantOnArm": "1",
                        "pctPtsWithVarOnArmOfTotPtsWithVar": "20%",
                        "inclusion": false,
                        "exclusion": true
                    },
                },
                {
                    "SNV": {
                        "id": "COSM1256700",
                        "gene": "EBFRA",
                        "levelOfEvidence": "2",
                        "chrom": "chr7",
                        "position": "5522678451",
                        "reference": "G",
                        "alternative": "A",
                        "litRef": "2348587",
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
                        "litRef": "2348587",
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
                        "litRef": "2348587",
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
                        "litRef": "2348587",
                        "protein": "p.G719A",
                        "totNumPtsWithVariant": "2",
                        "ptsWithVariantOnArm": "1",
                        "pctPtsWithVarOnArmOfTotPtsWithVar": "20%",
                        "inclusion": true,
                        "exclusion": false
                    },
                }
            ];

        $scope.cnvs = [
            {
                "CNV": {
                    "gene": "ERBB2",
                    "levelOfEvidence": "1",
                    "chrom": "chr17",
                    "position": "37856492",
                    "litRef": "3798106",
                    "protein": "ERBB2 Amplification",
                    "totNumPtsWithVariant": "0",
                    "ptsWithVariantOnArm": "0",
                    "pctPtsWithVarOnArmOfTotPtsWithVar": "-",
                    "inclusion": true,
                    "exclusion": false
                },
            },
            {
                "CNV": {
                    "gene": "ERBB661",
                    "levelOfEvidence": "1",
                    "chrom": "chr17",
                    "position": "3785648800",
                    "litRef": "379810671",
                    "protein": "ERBB661 Amplification",
                    "totNumPtsWithVariant": "0",
                    "ptsWithVariantOnArm": "0",
                    "pctPtsWithVarOnArmOfTotPtsWithVar": "-",
                    "inclusion": false,
                    "exclusion": true
                },
            }
        ];


        $scope.geneFusions = [
            {
                "GF": {
                    "id": "EML4-ALK.E13A20.COSF1062",
                    "gene": "ALK",
                    "levelOfEvidence": "1",
                    "litRef": "12345545",
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
                    "litRef": "12345545",
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
                    "litRef": "12345545",
                    "totNumPtsWithVariant": "0",
                    "ptsWithVariantOnArm": "0",
                    "pctPtsWithVarOnArmOfTotPtsWithVar": "-",
                    "inclusion": true,
                    "exclusion": false
                },
            },
            {
                "GF": {
                    "id": "EML4-ALK.EBA17",
                    "gene": "ALK",
                    "levelOfEvidence": "1",
                    "litRef": "234566",
                    "totNumPtsWithVariant": "0",
                    "ptsWithVariantOnArm": "0",
                    "pctPtsWithVarOnArmOfTotPtsWithVar": "-",
                    "inclusion": false,
                    "exclusion": true
                },
            }
        ];

        $scope.nhrs = [
            {
                "NHR": {
                    "oncomineVariantClass": "-",
                    "gene": "EGFR",
                    "levelOfEvidence" : "1",
                    "function": "nonframeshiftinsertion",
                    "litRef": "5525915",
                    "variantDescription": "-",
                    "exon": "19",
                    "proteinRegex": "-",
                    "inclusion": true,
                    "exclusion": false
                },
            }

        ];

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


        $scope.nonSequencingAssays = [
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
            },
            {
                "NsAssay": {
                    "assay": "IHC",
                    "gene": "XYZ",
                    "result": "NEGATIVE",
                    "variantAssociation": "EMPTY",
                    "levelOfEvidence": "1",
                    "totNumPtsWithGene": "0",
                    "ptsWithGeneOnArm": "0",
                    "pctPtsWithGeneOnArmOfTotPtsWithGene": "0%",
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

        /**
         * Bar Chart data
         */
        $scope.flotChartData = [
            {
                label: "bar",
                data: [
                    [0, 10],
                    [1, 34],
                    [2, 25],
                    [3, 19],
                    [4, 34],
                    [5, 32]
                ]
            }
        ];






            $scope.horizontalData = {
                labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                series: [
                    [5, 4, 3, 7, 5, 10, 3],
                    [3, 2, 9, 5, 4, 6, 4]
                ]
            };

            $scope.horizontalOptions = {
                seriesBarDistance: 10,
                reverseData: true,
                horizontalBars: true,
                axisY: {
                    offset: 70
                }
            };




    });