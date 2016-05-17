angular.module('treatment-arm.matchbox',[])
    .controller('TreatmentArmController', function( $scope, $window, DTOptionsBuilder, DTColumnDefBuilder, treatmentArmApi) {
        /*this.dtOptions = DTOptionsBuilder.newOptions()
            .withOption('info', false);
        this.dtOptions = DTOptionsBuilder.newOptions()
            .withOption('paging', false);
         */
        this.dtOptions = {
            'info': false,
            'paging':false
        }
        
        this.ddOptions = {
            'info': false,
            'paging': false,
            'bFilter': false
        }

    /*this.dtColumnDefs = [];
        this.activeChoice = 'inclusion';*/
        /*
        this.ddOptions = DTOptionsBuilder.newOptions()
            .withOption('paging', false)
            .withOption('info', false)
            .withOption('bFilter', false);

        this.altColumnDefs = [
            DTColumnDefBuilder.newColumnDef(4).withOption('createdCell', createpubmedlinks)
        ];*/

        $scope.test = '';

        $scope.information = {
            name: '',
            description: '',
            currentVersion: '',
            genes: '',
            patientsAssigned: 0,
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
                {status: 'OPEN', date: 'March 17, 2016 10:10PM GMT'},
            ]
        };

        $scope.versions = [];
        $scope.versionNames = [];

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
                snvsInclusion: [
                    {
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
                    }
                ],
                snvsExclusion: [
                    {
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
                    }
                ],
                indelsInclusion: [
                    {
                        "id": "COSM746",
                        "gene": "ALK",
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
                        "totNumPtsWithVariant": "0",
                        "ptsWithVariantOnArm": "0",
                        "pctPtsWithVarOnArmOfTotPtsWithVar": "0%",
                        "inclusion": false,
                        "exclusion": true
                    }
                ],
                indelsExclusion: [],
                cnvsInclusion: [
                    {
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
                    }
                ],
                cnvsExclusion: [
                    {
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
                    }
                ],
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
                snvsInclusion: [
                    {
                        "id": "COSM776",
                        "gene": "PIK3CA",
                        "levelOfEvidence": "1",
                        "chrom": "chr7",
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
                        "gene": "PIK3CA",
                        "levelOfEvidence": "1",
                        "chrom": "chr7",
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
                        "gene": "PIK3CA",
                        "levelOfEvidence": "3",
                        "chrom": "chr7",
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
                        "inclusion": false,
                        "exclusion": true
                    },
                    {
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
                        "inclusion": false,
                        "exclusion": true
                    }
                ],
                cnvsInclusion: [],
                cnvsExclusion: [],
                geneFusionsInclusion: [
                    {
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
                    {
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
                    {
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
                    }
                ],
                geneFusionsExclusion: [
                    {
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
                    }
                ],
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

/*
        function createpubmedlinks(td, cellData,  rowData, row, col) {
            $(td).html('<a onClick="openPubMed()">' + cellData + '</a>');
        };

        $scope.openPubMed = function(data) {
            $window.open("http://www.ncbi.nlm.nih.gov/pubmed/?term="+data, '_blank');

        };
*/
        $scope.openGene = function(data) {
            $window.open('http://cancer.sanger.ac.uk/cosmic/gene/overview?ln='+data.toLowerCase(), '_blank');
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
                    $window.open('http://cancer.sanger.ac.uk/cosmic/fusion/summary?id='+fid[0], '_blank');
                } else {
                    var tmp = cosmicId.indexOf("COSM");

                    if(tmp != -1) {
                        cid = cosmicId.substring(tmp, cosmicId.length);
                        cia = cid.split("COSM");
                        var fid =  cia[1].split(".");
                        $window.open("http://cancer.sanger.ac.uk/cosmic/mutation/overview?id="+fid[0], '_blank');
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
                    //console.log(label);
                    //console.log(yval);
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
    /*
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
        ];*/


         /*


         function loadPatientData() {
         matchApiMock
         .getPatientDetailsData($stateParams.patientSequenceNumber)
         .then(function (data) {
         $scope.patientSequenceNumber = $stateParams.patientSequenceNumber;

         $scope.patient = data.patient;
         $scope.treatmentArms = data.treatmentArms;
         $scope.timeline = data.timeline;
         $scope.assayHistory = data.assayHistory;
         $scope.sendouts = data.sendouts;
         $scope.biopsy = data.biopsy;
         $scope.variantReports = data.variantReports;
         $scope.variantReportOptions = data.variantReportOptions;
         $scope.variantReportOption = data.variantReportOption;
         $scope.assignmentReport = data.assignmentReport;
         $scope.biopsyReport = data.biopsyReport;
         $scope.biopsyReports = data.biopsyReports;
         $scope.patientDocuments = data.patientDocuments;
         })
         .then(function () {
         $scope.variantReportType = 'tumorTissue';
         $scope.variantReportMode = 'Normal';
         setVariantReport();
         });
         }
         */


        $scope.loadTreatmentArmDetails = function(ta) {
            treatmentArmApi
            .getTreatmentArmDetails(ta)
                .then(function (d) {
                    console.log(d.data);
                    angular.forEach(d.data, function(value) {
                        console.log(value);
                        console.log(value.data);
                        if (value.data !== null) {


                            $scope.information.currentStatus = value.data.treatment_arm_status;
                            $scope.test = "test";
                            $scope.information.name = value.data.name;
                            $scope.information.description = value.data.description;
                            $scope.information.genes = value.data.gene;
                            $scope.information.patientsAssigned = value.data.num_patients_assigned;

                            var exclusionDrugs = [];
                            var exclusionDiseases = [];
                            var exclusionDrug = {};

                            angular.forEach(value.data.exclusion_drugs, function(value) {
                                var exclusionDrug = {};
                                angular.forEach(value.drugs, function(value) {
                                    console.log('each drug');
                                    console.log(value);
                                    exclusionDrug.id = value.drug_id;
                                    exclusionDrug.name = value.name;
                                    exclusionDrugs.push(exclusionDrug);
                                });

                                //exclusionDrug.id = value.id;
                                //exclusionDrug.name = value.name;

                            });
                            console.log(exclusionDrugs);
                            angular.forEach(value.data.exclusion_diseases, function(value) {

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
                            if (value.data.variant_report !== undefined) {
                                angular.forEach(value.data.variant_report.single_nucleotide_variants, function(value) {
                                    var snv = {};
                                    snv.id = value.identifier;
                                    snv.gene = value.gene_name;
                                    snv.levelOfEvidence = value.level_of_evidence;
                                    snv.position = value.position;
                                    snv.alternative = value.alternative;
                                    snv.chrom = value.chromosome;
                                    snv.protein = value.description;
                                    snv.reference = value.reference;
                                    /*var litRefs = [];
                                    angular.forEach(value.public_med_ids, function(value) {
                                        litRefs.push({"litRef": value});
                                    });
                                    snv.litRefs = litRefs;
                                    console.log('litrefs');
                                    console.log(litRefs);*/
                                    if (value.inclusion === true) {
                                        snv.inclusion = true;
                                        snv.exclusion = false;
                                        snvsInclusion.push(snv);
                                    } else {
                                        snv.inclusion = false;
                                        snv.exclusion = true;
                                        snvsExclusion.push(snv);
                                    }

                                });
                                angular.forEach(value.data.variant_report.indels, function(value) {
                                    var indel = {};
                                    indel.id = value.identifier;
                                    indel.gene = value.gene_name;
                                    indel.levelOfEvidence = value.level_of_evidence;
                                    indel.position = value.position;
                                    indel.alternative = value.alternative; //
                                    indel.chrom = value.chromosome; //
                                    indel.protein = value.description; //
                                    indel.reference = value.reference;
                                    /*var litRefs = [];
                                     angular.forEach(value.public_med_ids, function(value) {
                                     litRefs.push({"litRef": value});
                                     });
                                     indel.litRefs = litRefs;
                                     console.log('litrefs');
                                     console.log(litRefs);*/
                                    if (value.inclusion === true) {
                                        indel.inclusion = true;
                                        indel.exclusion = false;
                                        indelsInclusion.push(indel);
                                    } else {
                                        indel.inclusion = false;
                                        indel.exclusion = true;
                                        indelsExclusion.push(indel);
                                    }

                                });
                                angular.forEach(value.data.variant_report.copy_number_variants, function(value) {
                                    var cnv = {};
                                    cnv.gene = value.gene_name;
                                    cnv.levelOfEvidence = value.level_of_evidence;
                                    cnv.chrom = value.chromosome; //
                                    cnv.position = value.position;
                                    cnv.protein = value.description; //

                                    /*var litRefs = [];
                                     angular.forEach(value.public_med_ids, function(value) {
                                     litRefs.push({"litRef": value});
                                     });
                                     cnv.litRefs = litRefs;
                                     console.log('litrefs');
                                     console.log(litRefs);*/
                                    if (value.inclusion === true) {
                                        cnv.inclusion = true;
                                        cnv.exclusion = false;
                                        cnvsInclusion.push(cnv);
                                    } else {
                                        cnv.inclusion = false;
                                        cnv.exclusion = true;
                                        cnvsExclusion.push(cnv);
                                    }

                                });
                                angular.forEach(value.data.variant_report.gene_fusions, function(value) {
                                    var gf = {};
                                    gf.id = value.identifier;
                                    gf.gene = value.gene_name;
                                    gf.levelOfEvidence = value.level_of_evidence;

                                    /*var litRefs = [];
                                     angular.forEach(value.public_med_ids, function(value) {
                                     litRefs.push({"litRef": value});
                                     });
                                     gf.litRefs = litRefs;
                                     console.log('litrefs');
                                     console.log(litRefs);*/
                                    if (value.inclusion === true) {
                                        gf.inclusion = true;
                                        gf.exclusion = false;
                                        geneFusionsInclusion.push(gf);
                                    } else {
                                        gf.inclusion = false;
                                        gf.exclusion = true;
                                        geneFusionsExclusion.push(gf);
                                    }

                                });
                                angular.forEach(value.data.variant_report.non_hotspot_rules, function(value) {
                                    var nhr = {};
                                    nhr.exon = value.exon;
                                    nhr.gene = value.gene;
                                    nhr.function = value.function;
                                    nhr.levelOfEvidence = value.level_of_evidence;
                                    nhr.oncomineVariantClass = value.oncominevariantclass; //
                                    nhr.proteinRegex = value.protein_match; //
                                    /*var litRefs = [];
                                     angular.forEach(value.public_med_ids, function(value) {
                                     litRefs.push({"litRef": value});
                                     });
                                     nhr.litRefs = litRefs;
                                     console.log('litrefs');
                                     console.log(litRefs);*/
                                    if (value.inclusion === true) {
                                        nhr.inclusion = true;
                                        nhr.exclusion = false;
                                        nhrsInclusion.push(nhr);
                                    } else {
                                        nhr.inclusion = false;
                                        nhr.exclusion = true;
                                        nhrsExclusion.push(nhr);
                                    }

                                });
                            }


                            var version = {};
                            version.name = value.data.version;
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
                            console.log('inclusion');
                            console.log(version.snvsInclusion);
                            console.log('exclusion');
                            console.log(version.snvsExclusion);
                            console.log('version');
                            console.log(version);
                            $scope.versions.push(version);
                            $scope.versionNames.push(value.data.version);
                            console.log($scope.versions);
                            $scope.information.currentVersion = $scope.versions[0].name;


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