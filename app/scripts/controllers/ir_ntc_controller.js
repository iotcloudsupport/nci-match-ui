angular.module('irntc.matchbox',['ui.bootstrap', 'cgPrompt', 'ui.router'])
    .controller('NtcController', function( $scope, $http, $window, $stateParams, DTOptionsBuilder, prompt, irNtcQualityApi) {

        angular.element(document).ready(function () {
            $('.equal-height-panels .panel').matchHeight();
        });

        $scope.dtOptions = DTOptionsBuilder.newOptions()
            .withDisplayLength(5);

        this.dtColumnDefs = [];

        this.dtInstance = {};

        $scope.singleNucleotideVariantsList = [];
        $scope.indelsList = [];
        $scope.copyNumberVariantsList = [];
        $scope.geneFusionsList = [];
        $scope.barData = {};
        $scope.armNames = [];
        $scope.armValues = [];

        //Mocks
        $scope.singleNucleotideVariantsList = [{"type":"snv","metadata":{"id":"38781871-ebc3-4df7-b4d3-c89c124363c2","comment":null},"publicMedIds":null,"geneName":"","chromosome":"chr3","position":"178916946","identifier":"COSM12580","reference":"G","alternative":"C","filter":"PASS","description":null,"protein":"p.Lys111Asn","transcript":"NM_006218.2","hgvs":"c.333G>C","location":"exonic","readDepth":1403,"rare":false,"alleleFrequency":0.138275,"flowAlternativeAlleleObservationCount":"194","flowReferenceAlleleObservations":"1209","referenceAlleleObservations":1405,"alternativeAlleleObservationCount":0,"variantClass":null,"levelOfEvidence":null,"inclusion":true,"armSpecific":false,"gene":"PIK3CA","oncominevariantclass":"Hotspot","exon":"2","function":"missense","proteinMatch":null,"confirmed":false,"matchingId":"COSM12580"},{"type":"snv","metadata":{"id":"cb33b736-1101-4c22-8b21-66c4bad7f7ca","comment":null},"publicMedIds":null,"geneName":"","chromosome":"chr13","position":"32968850","identifier":".","reference":"C","alternative":"A","filter":"PASS","description":null,"protein":"p.Ser3094Ter","transcript":"NM_000059.3","hgvs":"c.9281C>A","location":"exonic","readDepth":1432,"rare":false,"alleleFrequency":0.244413,"flowAlternativeAlleleObservationCount":"350","flowReferenceAlleleObservations":"1082","referenceAlleleObservations":1079,"alternativeAlleleObservationCount":350,"variantClass":null,"levelOfEvidence":null,"inclusion":true,"armSpecific":false,"gene":"BRCA2","oncominevariantclass":"Deleterious","exon":"25","function":"nonsense","proteinMatch":null,"confirmed":false,"matchingId":"."},{"type":"snv","metadata":{"id":"2dae6bbe-caf5-4d2a-8f81-35ba9f85f0e8","comment":null},"publicMedIds":null,"geneName":"","chromosome":"chr7","position":"140453136","identifier":"COSM476","reference":"A","alternative":"T","filter":"PASS","description":null,"protein":"p.Val600Glu","transcript":"NM_004333.4","hgvs":"c.1799T>A","location":"exonic","readDepth":1866,"rare":false,"alleleFrequency":0.237406,"flowAlternativeAlleleObservationCount":"443","flowReferenceAlleleObservations":"1423","referenceAlleleObservations":1875,"alternativeAlleleObservationCount":0,"variantClass":null,"levelOfEvidence":null,"inclusion":true,"armSpecific":false,"gene":"BRAF","oncominevariantclass":"Hotspot","exon":"15","function":"missense","proteinMatch":null,"confirmed":false,"matchingId":"COSM476"}];
        $scope.indelsList = [{"type":"id","metadata":{"id":"f89e170d-f64e-4d9a-be7f-eb38497ed8ec","comment":null},"publicMedIds":null,"geneName":"","chromosome":"chr13","position":"48916816","identifier":".","reference":"ACTT","alternative":"-","filter":"PASS","description":null,"protein":"p.Thr116fs","transcript":"NM_000321.2","hgvs":"c.346_349delACTT","location":"exonic","readDepth":1187,"rare":false,"alleleFrequency":0.221567,"flowAlternativeAlleleObservationCount":"263","flowReferenceAlleleObservations":"924","referenceAlleleObservations":898,"alternativeAlleleObservationCount":261,"variantClass":null,"levelOfEvidence":null,"inclusion":true,"armSpecific":false,"gene":"RB1","oncominevariantclass":"Deleterious","exon":"3","function":"frameshiftDeletion","proteinMatch":null,"confirmed":false,"matchingId":"."},{"type":"id","metadata":{"id":"3c4d6ebe-b92f-4359-8f61-1ee7886e3aee","comment":null},"publicMedIds":null,"geneName":"","chromosome":"chr17","position":"7574003","identifier":".","reference":"G","alternative":"-","filter":"PASS","description":null,"protein":"p.Arg342fs","transcript":"NM_000546.5","hgvs":"c.1024_1024delC","location":"exonic","readDepth":1261,"rare":false,"alleleFrequency":0.171293,"flowAlternativeAlleleObservationCount":"216","flowReferenceAlleleObservations":"1045","referenceAlleleObservations":1037,"alternativeAlleleObservationCount":215,"variantClass":null,"levelOfEvidence":null,"inclusion":true,"armSpecific":false,"gene":"TP53","oncominevariantclass":"Deleterious","exon":"10","function":"frameshiftDeletion","proteinMatch":null,"confirmed":false,"matchingId":"."},{"type":"id","metadata":{"id":"bc315edc-8267-4ff5-b4b2-5ce79732093e","comment":null},"publicMedIds":null,"geneName":"","chromosome":"chr10","position":"89717716","identifier":".","reference":"-","alternative":"A","filter":"PASS","description":null,"protein":"p.Pro248fs","transcript":"NM_000314.4","hgvs":"c.740_741insA","location":"exonic","readDepth":1239,"rare":false,"alleleFrequency":0.230831,"flowAlternativeAlleleObservationCount":"286","flowReferenceAlleleObservations":"953","referenceAlleleObservations":951,"alternativeAlleleObservationCount":284,"variantClass":null,"levelOfEvidence":null,"inclusion":true,"armSpecific":false,"gene":"PTEN","oncominevariantclass":"Deleterious","exon":"7","function":"frameshiftInsertion","proteinMatch":null,"confirmed":false,"matchingId":"."}]
        $scope.copyNumberVariantsList = [{"type":"cnv","metadata":{"id":"1a69685f-c109-42b5-84aa-7387e29a6bcc","comment":null},"publicMedIds":null,"geneName":"","chromosome":"chr17","position":"37845133","identifier":"ERBB2","reference":"G","alternative":"<CNV>","filter":"PASS","description":null,"protein":null,"transcript":null,"hgvs":"","location":"","readDepth":null,"rare":false,"alleleFrequency":null,"flowAlternativeAlleleObservationCount":"","flowReferenceAlleleObservations":"","referenceAlleleObservations":null,"alternativeAlleleObservationCount":null,"variantClass":null,"levelOfEvidence":null,"inclusion":true,"armSpecific":false,"gene":"ERBB2","oncominevariantclass":"Amplification","exon":"","function":"","proteinMatch":null,"confirmed":false,"refCopyNumber":2,"rawCopyNumber":16.2,"copyNumber":16.2,"confidenceInterval95percent":17.0665,"confidenceInterval5percent":15.3775,"matchingId":"ERBB2"},{"type":"cnv","metadata":{"id":"2b8fc68e-5e8a-4685-82fd-54319551f83a","comment":null},"publicMedIds":null,"geneName":"","chromosome":"chr17","position":"57974717","identifier":"RPS6KB1","reference":"T","alternative":"<CNV>","filter":"PASS","description":null,"protein":null,"transcript":null,"hgvs":"","location":"","readDepth":null,"rare":false,"alleleFrequency":null,"flowAlternativeAlleleObservationCount":"","flowReferenceAlleleObservations":"","referenceAlleleObservations":null,"alternativeAlleleObservationCount":null,"variantClass":null,"levelOfEvidence":null,"inclusion":true,"armSpecific":false,"gene":"RPS6KB1","oncominevariantclass":"Amplification","exon":"","function":"","proteinMatch":null,"confirmed":false,"refCopyNumber":2,"rawCopyNumber":8.6,"copyNumber":8.6,"confidenceInterval95percent":9.16673,"confidenceInterval5percent":8.06831,"matchingId":"RPS6KB1"},{"type":"cnv","metadata":{"id":"1c8014d1-5ef1-4dfb-a053-c3f5cdb78126","comment":null},"publicMedIds":null,"geneName":"","chromosome":"chr20","position":"52184148","identifier":"ZNF217","reference":"G","alternative":"<CNV>","filter":"PASS","description":null,"protein":null,"transcript":null,"hgvs":"","location":"","readDepth":null,"rare":false,"alleleFrequency":null,"flowAlternativeAlleleObservationCount":"","flowReferenceAlleleObservations":"","referenceAlleleObservations":null,"alternativeAlleleObservationCount":null,"variantClass":null,"levelOfEvidence":null,"inclusion":true,"armSpecific":false,"gene":"ZNF217","oncominevariantclass":"Amplification","exon":"","function":"","proteinMatch":null,"confirmed":false,"refCopyNumber":2,"rawCopyNumber":12.5,"copyNumber":12.5,"confidenceInterval95percent":13.3237,"confidenceInterval5percent":11.7272,"matchingId":"ZNF217"}]
        $scope.geneFusionsList = [{"type":"gf","metadata":{"id":"aea26ca8-0cf5-4248-bb09-bb29283677b5","comment":null},"publicMedIds":null,"geneName":"EML4","chromosome":"chr2","position":"42491871","identifier":"EML4-ALK.E6aA20.AB374361_1","reference":"G","alternative":"G]chr2:29446394]","filter":"PASS","description":null,"protein":null,"transcript":null,"hgvs":"","location":"","readDepth":73149,"rare":false,"alleleFrequency":null,"flowAlternativeAlleleObservationCount":"","flowReferenceAlleleObservations":"","referenceAlleleObservations":null,"alternativeAlleleObservationCount":null,"variantClass":null,"levelOfEvidence":null,"inclusion":true,"armSpecific":false,"gene":"EML4","oncominevariantclass":"Fusion","exon":"6","function":"","proteinMatch":null,"confirmed":false,"fusionIdentity":null,"matchingId":"EML4-ALK.E6aA20.AB374361_1"},{"type":"gf","metadata":{"id":"33f7c8eb-81c9-47af-a3ef-7d9b00b13046","comment":null},"publicMedIds":null,"geneName":"ALK","chromosome":"chr2","position":"29446394","identifier":"EML4-ALK.E6aA20.AB374361_2","reference":"A","alternative":"]chr2:42491871]A","filter":"PASS","description":null,"protein":null,"transcript":null,"hgvs":"","location":"","readDepth":73149,"rare":false,"alleleFrequency":null,"flowAlternativeAlleleObservationCount":"","flowReferenceAlleleObservations":"","referenceAlleleObservations":null,"alternativeAlleleObservationCount":null,"variantClass":null,"levelOfEvidence":null,"inclusion":true,"armSpecific":false,"gene":"ALK","oncominevariantclass":"Fusion","exon":"20","function":"","proteinMatch":null,"confirmed":false,"fusionIdentity":null,"matchingId":"EML4-ALK.E6aA20.AB374361_2"},{"type":"gf","metadata":{"id":"89fcff5c-69ee-41e7-a362-73a9e8fa4905","comment":null},"publicMedIds":null,"geneName":"EML4","chromosome":"chr2","position":"42492091","identifier":"EML4-ALK.E6bA20.AB374362_1","reference":"G","alternative":"G]chr2:29446394]","filter":"PASS","description":null,"protein":null,"transcript":null,"hgvs":"","location":"","readDepth":16372,"rare":false,"alleleFrequency":null,"flowAlternativeAlleleObservationCount":"","flowReferenceAlleleObservations":"","referenceAlleleObservations":null,"alternativeAlleleObservationCount":null,"variantClass":null,"levelOfEvidence":null,"inclusion":true,"armSpecific":false,"gene":"EML4","oncominevariantclass":"Fusion","exon":"6","function":"","proteinMatch":null,"confirmed":false,"fusionIdentity":null,"matchingId":"EML4-ALK.E6bA20.AB374362_1"},{"type":"gf","metadata":{"id":"2d87fd81-2fb7-434f-94e2-dd49be243a5a","comment":null},"publicMedIds":null,"geneName":"ALK","chromosome":"chr2","position":"29446394","identifier":"EML4-ALK.E6bA20.AB374362_2","reference":"A","alternative":"]chr2:42492091]A","filter":"PASS","description":null,"protein":null,"transcript":null,"hgvs":"","location":"","readDepth":16372,"rare":false,"alleleFrequency":null,"flowAlternativeAlleleObservationCount":"","flowReferenceAlleleObservations":"","referenceAlleleObservations":null,"alternativeAlleleObservationCount":null,"variantClass":null,"levelOfEvidence":null,"inclusion":true,"armSpecific":false,"gene":"ALK","oncominevariantclass":"Fusion","exon":"20","function":"","proteinMatch":null,"confirmed":false,"fusionIdentity":null,"matchingId":"EML4-ALK.E6bA20.AB374362_2"}]

        $scope.branch = $stateParams.branch;

        this.barOptions = {
            scaleBeginAtZero: true,
            scaleShowGridLines: true,
            scaleGridLineColor: "rgba(0,0,0,.05)",
            scaleGridLineWidth: 1,
            barShowStroke: true,
            barStrokeWidth: 2,
            barValueSpacing: 5,
            barDatasetSpacing: 1
        };

        $scope.openCosmicGene = function (id) {
            $window.open("http://cancer.sanger.ac.uk/cosmic/gene/overview?ln=" + id.toLowerCase(), "_blank");
            $window.focus();

        };

        $scope.openCosmicId = function (id) {
            id = id.substring(4, id.length)
            $window.open("http://cancer.sanger.ac.uk/cosmic/gene/overview?ln=" + id.toLowerCase(), "_blank");
            $window.focus();

        };

        $scope.openCosmicFusionId = function (id) {

            // $window.open("http://cancer.sanger.ac.uk/cosmic/gene/overview?ln=" + id.toLowerCase(), "_blank", "toolbar=yes, scrollbars=yes, resizable=yes, top=300, left=300, width=600, height=400");
            $window.open("http://cancer.sanger.ac.uk/cosmic/gene/overview?ln=" + id.toLowerCase(), "_blank");
            $window.focus();

        };
        //Svg for samples
        $scope.loadSvgGeneList = function () {
            svgApi
                .getSvgGene($stateParams.sampleId)
                .then(function (d) {
                    $window.d3BoxVersion5(d.data);
                });
        };
        //Svg for ntc
        $scope.loadSvgNtcList = function () {
            svgApi
                .getSvgNtc()
                .then(function (d) {
                    $window.d3BoxVersion5(d.data);
                });
        };

        var posts = undefined;
        $scope.loadNtcUnfilteredReportList = function () {
            irNtcQualityApi
                .loadNtcUnfilteredReportList()
                .then(function (d) {
                    posts = d.data;

                    // alert(JSON.stringify(d.data))


                    // $scope.armValues.push(posts.position);

                    // $scope.singleNucleotideVariantsList = posts.singleNucleotideVariants;
                    // $scope.indelsList = posts.indels;
                    // $scope.copyNumberVariantsList = posts.copyNumberVariants;
                    // $scope.geneFusionsList = posts.geneFusions;
                    // alert(posts.indels[0].position)

                    $scope.armNames.push(posts.singleNucleotideVariants[0].chromosome);
                    $scope.armValues.push(posts.singleNucleotideVariants[0].position);
                    $scope.armNames.push(posts.indels[0].chromosome);
                    $scope.armValues.push(posts.indels[0].position);
                    $scope.armNames.push(posts.copyNumberVariants[0].chromosome);
                    $scope.armValues.push(posts.copyNumberVariants[0].position);
                    $scope.armNames.push(posts.geneFusions[0].chromosome);
                    $scope.armValues.push(posts.geneFusions[0].position);

                });
            };

        $scope.loadSampleBreakups = function() {

            // var ctx = document.getElementById("irSampleCanvas").getContext("2d");
            // ctx.canvas.width = 300;
            // ctx.canvas.height = 300;

            var prepareData = {
                series: [5, 3, 4]
            }

            this.pieData = prepareData;

            pieNames = [
                'EAY131-QQQ'
                , 'EAY131-BEEE'
                , 'EAY131-HRRR'
            ];

            $scope.flotPieData = {
                labels: pieNames,
                datasets: [
                    {
                        label: "Accrual Dataset",
                        fillColor: "#1c84c6",
                        strokeColor: "rgba(320,220,220,0.8)",
                        highlightFill: "#33c6c8", //"rgba(220,220,220,0.75)",
                        highlightStroke: "rgba(320,220,220,1)",
                        data: prepareData
                    }
                ]
            };


            // armNames = [
            //     'EAY131-QQQ'
            //     , 'EAY131-BEEE'
            //     , 'EAY131-HRRR'
            //     , 'EAY131-U'
            //     , 'EAY131-E'
            //     , 'EAY131-D'
            //     , 'EAY131-F'
            //     , 'EAY131-G'
            //     , 'EAY131-T'
            //     , 'EAY131-Q'
            // ];
            // armValues = [6, 3, 2, 2, 1,1,2,3,1,1];



            $scope.barData = {
                labels: $scope.armNames,
                datasets: [
                    {
                        label: "Accrual Dataset",
                        fillColor: "Indigo",
                        strokeColor: "rgba(220,220,220,0.8)",
                        highlightFill: "#23c6c8", //"rgba(220,220,220,0.75)",
                        highlightStroke: "rgba(220,220,220,1)",
                        data: $scope.armValues
                    }
                ]
            };


            // alert(JSON.stringify($scope.barData))

        };

        $scope.loadPieChart = function(site) {

            aMoiLabels = ['0 Sample Ng', '1 Sample Pos', '2 Patient', '3 aMOI', '4 Drug', '5+ Gene'];
            if(site==='mocha') {
                aMoiValues = [4, 35, 45, 9, 6, 21]; //[4, 10, 14, 6, 10, 16]; //[45, 21, 4, 35, 9, 6];
            }
            else{
                aMoiValues = [1, 45, 15, 1, 8, 61];
            }
            aMoiHighlight = "#000088"; //"#dedede";

            $scope.pieData = [
                {
                    value: aMoiValues[0],
                    color: "#23c6c8",
                    highlight: aMoiHighlight,
                    label: aMoiLabels[0]
                },
                {
                    value: aMoiValues[1],
                    color: "#1c84c6",
                    highlight: aMoiHighlight,
                    label: aMoiLabels[1]
                },
                {
                    value: aMoiValues[2],
                    color: "#18a689", //"#ab0102",
                    highlight: aMoiHighlight,
                    label: aMoiLabels[2]
                },
                {
                    value: aMoiValues[3],
                    color: "#f8ac59",
                    highlight: aMoiHighlight,
                    label: aMoiLabels[3]
                },
                {
                    value: aMoiValues[4],
                    color: "#707070",
                    highlight: aMoiHighlight,
                    label: aMoiLabels[4]
                },
                {
                    value: aMoiValues[5],
                    color: "#cfcfcf",
                    highlight: aMoiHighlight,
                    label: aMoiLabels[5]
                }
            ];
        }

    });
