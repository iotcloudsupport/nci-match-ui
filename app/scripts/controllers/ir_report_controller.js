angular.module('iradmin.matchbox',['ui.bootstrap', 'cgPrompt', 'ui.router'])
    .controller('IrAdminController',
        function( $scope, $http, $window, $stateParams, DTOptionsBuilder, irAdminApi, $location, $anchorScroll, $timeout) {

        angular.element(document).ready(function () {
            $('.equal-height-panels .panel').matchHeight();
        });

            var vm = this;
            vm.dtOptions = DTOptionsBuilder.newOptions()
            .withDisplayLength(5);

            vm.dtOptions = DTOptionsBuilder.newOptions()
            .withOption('bLengthChange', false);

            vm.dtOptions = DTOptionsBuilder.newOptions()
            .withOption('searching', false);

        this.dtInstance = {};

        $scope.irList = [];
        $scope.moChaList = [];
        $scope.mdAccList = [];
        $scope.MDList = [];
        $scope.positiveListMocha = [];
        $scope.positiveListMDCC = [];
        $scope.negativeListMocha = [];
        $scope.negativeListMDCC = [];
        $scope.tokenIpAddress = [];
        $scope.positiveList = [];
        $scope.negativeList = [];

        $scope.singleNucleotideVariantsList = [];
        $scope.indelsList = [];
        $scope.copyNumberVariantsList = [];
        $scope.geneFusionsList = [];
        $scope.sitename = 'undefined';
        $scope.barlegend = 'Total Positive / Ntc Control Status';
        $scope.titleid = "";
        $scope.mochaList=[];
        $scope.mochaNtcList=[];
        $scope.mdaccList=[];
        $scope.mdaccNtcList=[];
        $scope.branch = $stateParams.branch;
        $scope.mid = "undefined";
        $scope.cellColor = "";



        if($scope.branch === 'mocha'){
            $scope.sitename = 'MoCha';

        }
        else {
            $scope.sitename = 'MDACC';
        }

        $scope.siteName = [];
        $scope.site = 'undefined';
            $scope.positives = 'undefined';
        $scope.barData = {};

            
            $scope.positiveControlList = [];
            $scope.negativeVariantsList = [];


            $scope.positiveControlList1 = [];
            $scope.negativeVariantsList1 = [];


            $scope.positiveControlList2 = [];
            $scope.positiveControlList2 = [{"variantType":"SNV","geneName":"PIK3CA","chromosome":"3","position":"178916946","identifier":"COSM12880","reference":"G","alternative":"C","protein":"p.Lys111Asn","hgvs":"c.333G>C","purpose":null,"function":null,"hasMatchingVariant":"false"},{"variantType":"SNV","geneName":"BRAF","chromosome":"7","position":"140453136","identifier":"COSM476","reference":"A","alternative":"T","protein":"p.V600E","hgvs":"c.1799T>A","purpose":"Substitution","function":"missense","hasMatchingVariant":"true"},{"variantType":"SNV","geneName":"BRCA2","chromosome":"chr13","position":"32968850","identifier":".","reference":"C","alternative":"A","protein":"p.Ser3094Ter","hgvs":"c.9281C>A","purpose":null,"function":null,"hasMatchingVariant":"true"},{"variantType":"Indel","geneName":"PTEN","chromosome":"chr10","position":"89717716","identifier":".","reference":"-","alternative":"A","protein":"p.Pro248fs","hgvs":"c.741_742insA","purpose":null,"function":null,"hasMatchingVariant":"true"},{"variantType":"Indels","purpose":"CNV","function":null,"hasMatchingVariant":"true"},{"variantType":"CNV","geneName":"RPS6KB1","chromosome":"chr17","position":null,"identifier":null,"reference":null,"alternative":null,"protein":null,"hgvs":null,"purpose":null,"function":null,"hasMatchingVariant":"true"},{"variantType":"CNV","geneName":"ZNF217","chromosome":"chr20","position":null,"identifier":null,"reference":null,"alternative":null,"protein":null,"hgvs":null,"purpose":null,"function":null,"hasMatchingVariant":"true"},{"variantType":"Fusion","geneName":"ALK","chromosome":null,"position":null,"identifier":"AB374361","reference":null,"alternative":"EML4-ALK.E6aA20","protein":null,"hgvs":"EML4-ALK","purpose":"Fusion","function":null,"hasMatchingVariant":"false"},{"variantType":"Fusion","geneName":"ALK","chromosome":null,"position":null,"identifier":"AB374362","reference":null,"alternative":"EML4-ALK.E6bA20","protein":null,"hgvs":"EML4-ALK","purpose":"Fusion","function":null,"hasMatchingVariant":"true"}];

            $scope.negativeVariantsList2 = [];
            $scope.negativeVariantsList2.push({
                'publicMedIds': '',
                'position': '112258',
                'geneName': "",
                'variantType':'Indel',
                'reference':'G',
                'alternative': 'C',
                'hgvs': 'c.887A',
                'protein': 'p.Emp186Gly',
                'function': 'missense'
            });


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
                var numericId = id.substring(id.indexOf("_") - 3, (id.length - 2));

                if (numericId !== null) {
                    $window.open("http://cancer.sanger.ac.uk/cosmic/gene/overview?ln=" + numericId.toLowerCase(), "_blank");
                }
                $window.focus();
            };


            //Mocks
            $scope.indelsList = [{"type":"snv","metadata":{"id":"38781871-ebc3-4df7-b4d3-c89c124363c2","comment":null},"publicMedIds":null,"geneName":"","chromosome":"3","position":"178916946","identifier":"COSM12580","reference":"G","alternative":"C","filter":"PASS","description":null,"protein":"p.Lys111Asn","transcript":"NM_006218.2","hgvs":"c.333G>C","location":"exonic","readDepth":1403,"rare":false,"alleleFrequency":0.138275,"flowAlternativeAlleleObservationCount":"194","flowReferenceAlleleObservations":"1209","referenceAlleleObservations":1405,"alternativeAlleleObservationCount":0,"variantClass":null,"levelOfEvidence":null,"inclusion":true,"armSpecific":false,"gene":"PIK3CA","oncominevariantclass":"Hotspot","exon":"2","function":"missense","proteinMatch":null,"confirmed":false,"matchingId":"COSM12580"},{"type":"snv","metadata":{"id":"cb33b736-1101-4c22-8b21-66c4bad7f7ca","comment":null},"publicMedIds":null,"geneName":"","chromosome":"chr13","position":"32968850","identifier":".","reference":"C","alternative":"A","filter":"PASS","description":null,"protein":"p.Ser3094Ter","transcript":"NM_000059.3","hgvs":"c.9281C>A","location":"exonic","readDepth":1432,"rare":false,"alleleFrequency":0.244413,"flowAlternativeAlleleObservationCount":"350","flowReferenceAlleleObservations":"1082","referenceAlleleObservations":1079,"alternativeAlleleObservationCount":350,"variantClass":null,"levelOfEvidence":null,"inclusion":true,"armSpecific":false,"gene":"BRCA2","oncominevariantclass":"Deleterious","exon":"25","function":"nonsense","proteinMatch":null,"confirmed":false,"matchingId":"."},{"type":"snv","metadata":{"id":"2dae6bbe-caf5-4d2a-8f81-35ba9f85f0e8","comment":null},"publicMedIds":null,"geneName":"","chromosome":"7","position":"140453136","identifier":"COSM476","reference":"A","alternative":"T","filter":"PASS","description":null,"protein":"p.Val600Glu","transcript":"NM_004333.4","hgvs":"c.1799T>A","location":"exonic","readDepth":1866,"rare":false,"alleleFrequency":0.237406,"flowAlternativeAlleleObservationCount":"443","flowReferenceAlleleObservations":"1423","referenceAlleleObservations":1875,"alternativeAlleleObservationCount":0,"variantClass":null,"levelOfEvidence":null,"inclusion":true,"armSpecific":false,"gene":"BRAF","oncominevariantclass":"Hotspot","exon":"15","function":"missense","proteinMatch":null,"confirmed":false,"matchingId":"COSM476"},
                {"type":"id","metadata":{"id":"f89e170d-f64e-4d9a-be7f-eb38497ed8ec","comment":null},"publicMedIds":null,"geneName":"","chromosome":"chr13","position":"48916816","identifier":".","reference":"ACTT","alternative":"-","filter":"PASS","description":null,"protein":"p.Thr116fs","transcript":"NM_000321.2","hgvs":"c.346_349delACTT","location":"exonic","readDepth":1187,"rare":false,"alleleFrequency":0.221567,"flowAlternativeAlleleObservationCount":"263","flowReferenceAlleleObservations":"924","referenceAlleleObservations":898,"alternativeAlleleObservationCount":261,"variantClass":null,"levelOfEvidence":null,"inclusion":true,"armSpecific":false,"gene":"RB1","oncominevariantclass":"Deleterious","exon":"3","function":"frameshiftDeletion","proteinMatch":null,"confirmed":false,"matchingId":"."},{"type":"id","metadata":{"id":"3c4d6ebe-b92f-4359-8f61-1ee7886e3aee","comment":null},"publicMedIds":null,"geneName":"","chromosome":"chr17","position":"7574003","identifier":".","reference":"G","alternative":"-","filter":"PASS","description":null,"protein":"p.Arg342fs","transcript":"NM_000546.5","hgvs":"c.1024_1024delC","location":"exonic","readDepth":1261,"rare":false,"alleleFrequency":0.171293,"flowAlternativeAlleleObservationCount":"216","flowReferenceAlleleObservations":"1045","referenceAlleleObservations":1037,"alternativeAlleleObservationCount":215,"variantClass":null,"levelOfEvidence":null,"inclusion":true,"armSpecific":false,"gene":"TP53","oncominevariantclass":"Deleterious","exon":"10","function":"frameshiftDeletion","proteinMatch":null,"confirmed":false,"matchingId":"."},{"type":"id","metadata":{"id":"bc315edc-8267-4ff5-b4b2-5ce79732093e","comment":null},"publicMedIds":null,"geneName":"","chromosome":"chr10","position":"89717716","identifier":".","reference":"-","alternative":"A","filter":"PASS","description":null,"protein":"p.Pro248fs","transcript":"NM_000314.4","hgvs":"c.740_741insA","location":"exonic","readDepth":1239,"rare":false,"alleleFrequency":0.230831,"flowAlternativeAlleleObservationCount":"286","flowReferenceAlleleObservations":"953","referenceAlleleObservations":951,"alternativeAlleleObservationCount":284,"variantClass":null,"levelOfEvidence":null,"inclusion":true,"armSpecific":false,"gene":"PTEN","oncominevariantclass":"Deleterious","exon":"7","function":"frameshiftInsertion","proteinMatch":null,"confirmed":false,"matchingId":"."},
                {"type":"cnv","metadata":{"id":"1a69685f-c109-42b5-84aa-7387e29a6bcc","comment":null},"publicMedIds":null,"geneName":"","chromosome":"chr17","position":"37845133","identifier":"ERBB2","reference":"G","alternative":"<CNV>","filter":"PASS","description":null,"protein":null,"transcript":null,"hgvs":"","location":"","readDepth":null,"rare":false,"alleleFrequency":null,"flowAlternativeAlleleObservationCount":"","flowReferenceAlleleObservations":"","referenceAlleleObservations":null,"alternativeAlleleObservationCount":null,"variantClass":null,"levelOfEvidence":null,"inclusion":true,"armSpecific":false,"gene":"ERBB2","oncominevariantclass":"Amplification","exon":"","function":"","proteinMatch":null,"confirmed":false,"refCopyNumber":2,"rawCopyNumber":16.2,"copyNumber":16.2,"confidenceInterval95percent":17.0665,"confidenceInterval5percent":15.3775,"matchingId":"ERBB2"},{"type":"cnv","metadata":{"id":"2b8fc68e-5e8a-4685-82fd-54319551f83a","comment":null},"publicMedIds":null,"geneName":"","chromosome":"chr17","position":"57974717","identifier":"RPS6KB1","reference":"T","alternative":"<CNV>","filter":"PASS","description":null,"protein":null,"transcript":null,"hgvs":"","location":"","readDepth":null,"rare":false,"alleleFrequency":null,"flowAlternativeAlleleObservationCount":"","flowReferenceAlleleObservations":"","referenceAlleleObservations":null,"alternativeAlleleObservationCount":null,"variantClass":null,"levelOfEvidence":null,"inclusion":true,"armSpecific":false,"gene":"RPS6KB1","oncominevariantclass":"Amplification","exon":"","function":"","proteinMatch":null,"confirmed":false,"refCopyNumber":2,"rawCopyNumber":8.6,"copyNumber":8.6,"confidenceInterval95percent":9.16673,"confidenceInterval5percent":8.06831,"matchingId":"RPS6KB1"},{"type":"cnv","metadata":{"id":"1c8014d1-5ef1-4dfb-a053-c3f5cdb78126","comment":null},"publicMedIds":null,"geneName":"","chromosome":"chr20","position":"52184148","identifier":"ZNF217","reference":"G","alternative":"<CNV>","filter":"PASS","description":null,"protein":null,"transcript":null,"hgvs":"","location":"","readDepth":null,"rare":false,"alleleFrequency":null,"flowAlternativeAlleleObservationCount":"","flowReferenceAlleleObservations":"","referenceAlleleObservations":null,"alternativeAlleleObservationCount":null,"variantClass":null,"levelOfEvidence":null,"inclusion":true,"armSpecific":false,"gene":"ZNF217","oncominevariantclass":"Amplification","exon":"","function":"","proteinMatch":null,"confirmed":false,"refCopyNumber":2,"rawCopyNumber":12.5,"copyNumber":12.5,"confidenceInterval95percent":13.3237,"confidenceInterval5percent":11.7272,"matchingId":"ZNF217"}

            ];
            // $scope.singleNucleotideVariantsList = [{"type":"id","metadata":{"id":"f89e170d-f64e-4d9a-be7f-eb38497ed8ec","comment":null},"publicMedIds":null,"geneName":"","chromosome":"chr13","position":"48916816","identifier":".","reference":"ACTT","alternative":"-","filter":"PASS","description":null,"protein":"p.Thr116fs","transcript":"NM_000321.2","hgvs":"c.346_349delACTT","location":"exonic","readDepth":1187,"rare":false,"alleleFrequency":0.221567,"flowAlternativeAlleleObservationCount":"263","flowReferenceAlleleObservations":"924","referenceAlleleObservations":898,"alternativeAlleleObservationCount":261,"variantClass":null,"levelOfEvidence":null,"inclusion":true,"armSpecific":false,"gene":"RB1","oncominevariantclass":"Deleterious","exon":"3","function":"frameshiftDeletion","proteinMatch":null,"confirmed":false,"matchingId":"."},{"type":"id","metadata":{"id":"3c4d6ebe-b92f-4359-8f61-1ee7886e3aee","comment":null},"publicMedIds":null,"geneName":"","chromosome":"chr17","position":"7574003","identifier":".","reference":"G","alternative":"-","filter":"PASS","description":null,"protein":"p.Arg342fs","transcript":"NM_000546.5","hgvs":"c.1024_1024delC","location":"exonic","readDepth":1261,"rare":false,"alleleFrequency":0.171293,"flowAlternativeAlleleObservationCount":"216","flowReferenceAlleleObservations":"1045","referenceAlleleObservations":1037,"alternativeAlleleObservationCount":215,"variantClass":null,"levelOfEvidence":null,"inclusion":true,"armSpecific":false,"gene":"TP53","oncominevariantclass":"Deleterious","exon":"10","function":"frameshiftDeletion","proteinMatch":null,"confirmed":false,"matchingId":"."},{"type":"id","metadata":{"id":"bc315edc-8267-4ff5-b4b2-5ce79732093e","comment":null},"publicMedIds":null,"geneName":"","chromosome":"chr10","position":"89717716","identifier":".","reference":"-","alternative":"A","filter":"PASS","description":null,"protein":"p.Pro248fs","transcript":"NM_000314.4","hgvs":"c.740_741insA","location":"exonic","readDepth":1239,"rare":false,"alleleFrequency":0.230831,"flowAlternativeAlleleObservationCount":"286","flowReferenceAlleleObservations":"953","referenceAlleleObservations":951,"alternativeAlleleObservationCount":284,"variantClass":null,"levelOfEvidence":null,"inclusion":true,"armSpecific":false,"gene":"PTEN","oncominevariantclass":"Deleterious","exon":"7","function":"frameshiftInsertion","proteinMatch":null,"confirmed":false,"matchingId":"."}]
            $scope.copyNumberVariantsList = [{"type":"cnv","metadata":{"id":"1a69685f-c109-42b5-84aa-7387e29a6bcc","comment":null},"publicMedIds":null,"geneName":"","chromosome":"chr17","position":"37845133","identifier":"ERBB2","reference":"G","alternative":"<CNV>","filter":"PASS","description":null,"protein":null,"transcript":null,"hgvs":"","location":"","readDepth":null,"rare":false,"alleleFrequency":null,"flowAlternativeAlleleObservationCount":"","flowReferenceAlleleObservations":"","referenceAlleleObservations":null,"alternativeAlleleObservationCount":null,"variantClass":null,"levelOfEvidence":null,"inclusion":true,"armSpecific":false,"gene":"ERBB2","oncominevariantclass":"Amplification","exon":"","function":"","proteinMatch":null,"confirmed":false,"refCopyNumber":2,"rawCopyNumber":16.2,"copyNumber":16.2,"confidenceInterval95percent":17.0665,"confidenceInterval5percent":15.3775,"matchingId":"ERBB2"},{"type":"cnv","metadata":{"id":"2b8fc68e-5e8a-4685-82fd-54319551f83a","comment":null},"publicMedIds":null,"geneName":"","chromosome":"chr17","position":"57974717","identifier":"RPS6KB1","reference":"T","alternative":"<CNV>","filter":"PASS","description":null,"protein":null,"transcript":null,"hgvs":"","location":"","readDepth":null,"rare":false,"alleleFrequency":null,"flowAlternativeAlleleObservationCount":"","flowReferenceAlleleObservations":"","referenceAlleleObservations":null,"alternativeAlleleObservationCount":null,"variantClass":null,"levelOfEvidence":null,"inclusion":true,"armSpecific":false,"gene":"RPS6KB1","oncominevariantclass":"Amplification","exon":"","function":"","proteinMatch":null,"confirmed":false,"refCopyNumber":2,"rawCopyNumber":8.6,"copyNumber":8.6,"confidenceInterval95percent":9.16673,"confidenceInterval5percent":8.06831,"matchingId":"RPS6KB1"},{"type":"cnv","metadata":{"id":"1c8014d1-5ef1-4dfb-a053-c3f5cdb78126","comment":null},"publicMedIds":null,"geneName":"","chromosome":"chr20","position":"52184148","identifier":"ZNF217","reference":"G","alternative":"<CNV>","filter":"PASS","description":null,"protein":null,"transcript":null,"hgvs":"","location":"","readDepth":null,"rare":false,"alleleFrequency":null,"flowAlternativeAlleleObservationCount":"","flowReferenceAlleleObservations":"","referenceAlleleObservations":null,"alternativeAlleleObservationCount":null,"variantClass":null,"levelOfEvidence":null,"inclusion":true,"armSpecific":false,"gene":"ZNF217","oncominevariantclass":"Amplification","exon":"","function":"","proteinMatch":null,"confirmed":false,"refCopyNumber":2,"rawCopyNumber":12.5,"copyNumber":12.5,"confidenceInterval95percent":13.3237,"confidenceInterval5percent":11.7272,"matchingId":"ZNF217"}]
            $scope.geneFusionsList = [{"type":"gf","metadata":{"id":"aea26ca8-0cf5-4248-bb09-bb29283677b5","comment":null},"publicMedIds":null,"geneName":"EML4","chromosome":"2","position":"42491871","identifier":"EML4-ALK.E6aA20.AB374361_1","reference":"G","alternative":"G]chr2:29446394]","filter":"PASS","description":null,"protein":null,"transcript":null,"hgvs":"","location":"","readDepth":73149,"rare":false,"alleleFrequency":null,"flowAlternativeAlleleObservationCount":"","flowReferenceAlleleObservations":"","referenceAlleleObservations":null,"alternativeAlleleObservationCount":null,"variantClass":null,"levelOfEvidence":null,"inclusion":true,"armSpecific":false,"gene":"EML4","oncominevariantclass":"Fusion","exon":"6","function":"","proteinMatch":null,"confirmed":false,"fusionIdentity":null,"matchingId":"EML4-ALK.E6aA20.AB374361_1"},{"type":"gf","metadata":{"id":"33f7c8eb-81c9-47af-a3ef-7d9b00b13046","comment":null},"publicMedIds":null,"geneName":"ALK","chromosome":"2","position":"29446394","identifier":"EML4-ALK.E6aA20.AB374361_2","reference":"A","alternative":"]chr2:42491871]A","filter":"PASS","description":null,"protein":null,"transcript":null,"hgvs":"","location":"","readDepth":73149,"rare":false,"alleleFrequency":null,"flowAlternativeAlleleObservationCount":"","flowReferenceAlleleObservations":"","referenceAlleleObservations":null,"alternativeAlleleObservationCount":null,"variantClass":null,"levelOfEvidence":null,"inclusion":true,"armSpecific":false,"gene":"ALK","oncominevariantclass":"Fusion","exon":"20","function":"","proteinMatch":null,"confirmed":false,"fusionIdentity":null,"matchingId":"EML4-ALK.E6aA20.AB374361_2"},{"type":"gf","metadata":{"id":"89fcff5c-69ee-41e7-a362-73a9e8fa4905","comment":null},"publicMedIds":null,"geneName":"EML4","chromosome":"2","position":"42492091","identifier":"EML4-ALK.E6bA20.AB374362_1","reference":"G","alternative":"G]chr2:29446394]","filter":"PASS","description":null,"protein":null,"transcript":null,"hgvs":"","location":"","readDepth":16372,"rare":false,"alleleFrequency":null,"flowAlternativeAlleleObservationCount":"","flowReferenceAlleleObservations":"","referenceAlleleObservations":null,"alternativeAlleleObservationCount":null,"variantClass":null,"levelOfEvidence":null,"inclusion":true,"armSpecific":false,"gene":"EML4","oncominevariantclass":"Fusion","exon":"6","function":"","proteinMatch":null,"confirmed":false,"fusionIdentity":null,"matchingId":"EML4-ALK.E6bA20.AB374362_1"},{"type":"gf","metadata":{"id":"2d87fd81-2fb7-434f-94e2-dd49be243a5a","comment":null},"publicMedIds":null,"geneName":"ALK","chromosome":"2","position":"29446394","identifier":"EML4-ALK.E6bA20.AB374362_2","reference":"A","alternative":"]chr2:42492091]A","filter":"PASS","description":null,"protein":null,"transcript":null,"hgvs":"","location":"","readDepth":16372,"rare":false,"alleleFrequency":null,"flowAlternativeAlleleObservationCount":"","flowReferenceAlleleObservations":"","referenceAlleleObservations":null,"alternativeAlleleObservationCount":null,"variantClass":null,"levelOfEvidence":null,"inclusion":true,"armSpecific":false,"gene":"ALK","oncominevariantclass":"Fusion","exon":"20","function":"","proteinMatch":null,"confirmed":false,"fusionIdentity":null,"matchingId":"EML4-ALK.E6bA20.AB374362_2"}]


            $scope.moChaList.push(
                {'ipAddress': '129.43.127.133', 'externalIpAddress': '129.43.127.133', 'host': 'NCI-MATCH-IR', 'status': 'CONNECTED', 'lastcon': 'June 21, 2016 5:50 PM GMT'}
                // {'ipAddress': '56 129.43.127.133', 'externalIpAddress': '1 129.43.127.133', 'host': 'NCIAS', 'status': 'WAITING'},
                // {'ipAddress': '12 129.43.127.133', 'externalIpAddress': '42 129.43.127.133', 'host': 'ip-172-31-24-10', 'status': 'FAILING'}
            );

            // $scope.moChaList.push(
            // {'ipAddress': '12 129.43.127.133', 'externalIpAddress': '3 129.43.127.133'},
            // {'ipAddress': '56 129.43.127.133', 'externalIpAddress': '1 129.43.127.133'},
            // {'ipAddress': '12 129.43.127.133', 'externalIpAddress': '42 129.43.127.133'}
            // );

            $scope.mdAccList.push(
            {'ipAddress': '129.43.127.133', 'externalIpAddress': '129.43.127.133', 'host': 'ip-D15889', 'status': 'CONNECTED', 'lastcon': 'July 1, 2016 5:50 PM GMT'}
            // {'ipAddress': '56 129.43.127.133', 'externalIpAddress': '1 129.43.127.133', 'host': 'NCIAS-D1427', 'status': 'CONNECTED'},
            // {'ipAddress': '12 129.43.127.133', 'externalIpAddress': '42 129.43.127.133', 'host': 'NCIAS-D1227', 'status': 'WAITING'}
            );


        $scope.mockListMDCC = [{"sampleSite":"MDACC","sampleId":"MDACC_1","sampleMsn":"NtcControl_MDACC_1","dateCreated":1466776298978,"dateReceived":1466776367227,"status":null}];


            $scope.setSampleType = setSampleType;


            function setSampleType(reportType) {

                $scope.positives = "undefined";
                $scope.negatives = "undefined";

                if(reportType === 'MoCha'){
                    $scope.branch = 'mocha';
                    $scope.sitename = 'MoCha';

                }
                else if(reportType === 'MDACC'){
                    $scope.branch = 'mdacc';
                    $scope.sitename = 'MDACC';
                }

                if ($scope.SampleType === reportType) {
                    return;
                }

                $scope.SampleType = reportType;
                // setVariantReport();
            }

        //
            $scope.barOptions = {
            scaleBeginAtZero: true,
            scaleShowGridLines: true,
            scaleGridLineColor: "rgba(0,0,0,.05)",
            scaleGridLineWidth: 1,
            barShowStroke: true,
            barStrokeWidth: 2,
            barValueSpacing: 5,
            barDatasetSpacing: 1
        };

            $scope.gotoBottom = function(id) {

                var tic = id + 'bottom';
                // set the location.hash to the id of
                // the element you wish to scroll to.

                $timeout(function() {
                    $location.hash(tic);
                    // $("body").animate({scrollTop: $location.offset().top}, "slow");
                    $anchorScroll();
                });
            };

        //Populate Data
        $scope.populateData = function(d) {

            angular.forEach(d.data, function (value,key) {
                if(value.siteName !== 'Unknown' && (value.siteName === 'MoCha'  || value.siteName === 'MDACC')) {
                    $scope.siteName.push(value.siteName);
                    $scope.site = value.siteName;
                    $scope.tokenIpAddress.push({ 'siteName': value.siteName, 'siteIpAddress': value.siteIpAddress });
                }

                var positivesets = value.sampleControls;
                var negativesets = value.ntcControls;

                //Positive sets
                angular.forEach(positivesets, function (v,k) {

                    if(v.site === 'MoCha') {

                        $scope.positiveListMocha.push({
                            'sampleSite': v.site,
                            'sampleId': v.id,
                            'sampleMsn': v.molecularSequenceNumber,
                            'dateCreated': v.dateCreated,
                            'dateReceived': v.dateReceived,
                            'status': v.status
                        });
                    }
                    else if(v.site === 'MDACC') {

                        $scope.positiveListMDCC.push({
                            'sampleSite': v.site,
                            'sampleId': v.id,
                            'sampleMsn': v.molecularSequenceNumber,
                            'dateCreated': v.dateCreated,
                            'dateReceived': v.dateReceived,
                            'status': v.status
                        });
                    }
                });

                //Negative sets
                angular.forEach(negativesets, function (v,k) {

                    if(v.site === 'MoCha') {

                        $scope.negativeListMocha.push({
                            'sampleSite': v.site,
                            'sampleId': v.id,
                            'sampleMsn': v.molecularSequenceNumber,
                            'dateCreated': v.dateCreated,
                            'dateReceived': v.dateReceived,
                            'status': v.status
                        });
                    }
                    else if(v.site === 'MDACC') {

                        $scope.negativeListMDCC.push({
                            'sampleSite': v.site,
                            'sampleId': v.id,
                            'sampleMsn': v.molecularSequenceNumber,
                            'dateCreated': v.dateCreated,
                            'dateReceived': v.dateReceived,
                            'status': v.status
                        });
                    }
                });
            });
        };


            //SNV
            function loadMoChaList(data) {
                $scope.mochaList = data;
            };
            $scope.loadMocha_Table = function () {

                var url ="data/sample_mocha_list.json";

                $.ajax({

                    type   :  "GET",
                    url      :   url,
                    contentType : "application/json",
                    dataType      : "json",
                    data            :  {},
                    success: function(data){
                        loadMoChaList(data);
                    },
                    error:function(jqXHR,textStatus,errorThrown){
                        alert("Error: "+textStatus.toString());
                    }
                });
            };
            function loadMoChaNtcList(data) {
                // alert(JSON.stringify(data))
                $scope.mochaNtcList = data;
            };
            $scope.loadMochaNtc_Table = function () {

                var url ="data/sample_mocha_ntc_list.json";

                $.ajax({

                    type   :  "GET",
                    url      :   url,
                    contentType : "application/json",
                    dataType      : "json",
                    data            :  {},
                    success: function(data){
                        loadMoChaNtcList(data);
                    },
                    error:function(jqXHR,textStatus,errorThrown){
                        alert("Error: "+textStatus.toString());
                    }
                });
            };

            function loadMDACCList(data) {
                $scope.mdaccList = data;
            };
            $scope.loadMDACC_Table = function () {

                var url ="data/sample_mdacc_list.json";

                $.ajax({

                    type   :  "GET",
                    url      :   url,
                    contentType : "application/json",
                    dataType      : "json",
                    data            :  {},
                    success: function(data){
                        loadMDACCList(data);
                    },
                    error:function(jqXHR,textStatus,errorThrown){
                        alert("Error: "+textStatus.toString());
                    }
                });
            };

            function loadMDACCNtcList(data) {
                $scope.mdaccNtcList = data;
            };
            $scope.loadMDACCNtc_Table = function () {

                var url ="data/sample_mdacc_ntc_list.json";

                $.ajax({

                    type   :  "GET",
                    url      :   url,
                    contentType : "application/json",
                    dataType      : "json",
                    data            :  {},
                    success: function(data){
                        loadMDACCNtcList(data);
                    },
                    error:function(jqXHR,textStatus,errorThrown){
                        alert("Error: "+textStatus.toString());
                    }
                });
            };

            $scope.date = new Date();

            $scope.generateMocha_Table = function () {

                var nr = $scope.mochaList.length + 2;
                var mol = "SampleControl_MoCha_" + nr;

                    $scope.mochaList.push({
                        "molecular_is": mol,
                        "variant_reports": "-",
                        "current_status": "-",
                        "date_created": $scope.date,
                        "date_received": "-"
                    });
            };

            $scope.generateNtcMocha_Table = function () {

                var nr = $scope.mochaNtcList.length + 2;
                var mol = "NtcControl_MoCha_" + nr;

                $scope.mochaNtcList.push({
                    "molecular_is": mol,
                    "variant_reports": "-",
                    "current_status": "-",
                    "date_created": "June 8, 2016 4:51 PM GMT",
                    "date_received": "-"
                });
            };

            $scope.generateMDACC_Table = function () {

                var nr = $scope.mdaccList.length + 1;
                var mol = "SampleControl_MDACC_" + nr;

                $scope.mdaccList.push({
                    "molecular_is": mol,
                    "variant_reports": "-",
                    "current_status": "-",
                    "date_created": "June 8, 2016 4:51 PM GMT",
                    "date_received": "-"
                });
            };

            $scope.generateNtcMDACC_Table = function () {

                var nr = $scope.mdaccNtcList.length + 1;
                var mol = "NtcControl_MDACC_" + nr;

                $scope.mdaccNtcList.push({
                    "molecular_is": mol,
                    "variant_reports": "-",
                    "current_status": "-",
                    "date_created": $scope.date,
                    "date_received": "-"
                });
            };


            $scope.showPositiveControlConfirmation = function (id) {
                //Clean tables
                $scope.positiveListMocha = [];
                $scope.positiveListMDCC = [];
                $scope.negativeListMocha = [];
                $scope.negativeListMDCC = [];
                $scope.tokenIpAddress = [];
                if(id === 'MoCha'){$scope.generateMocha_Table();}
                else {$scope.generateMDACC_Table();}

            };

            $scope.showNoTemplateControlConfirmation = function (id) {
                //Clean tables
                $scope.positiveListMocha = [];
                $scope.positiveListMDCC = [];
                $scope.negativeListMocha = [];
                $scope.negativeListMDCC = [];
                $scope.tokenIpAddress = [];
                if(id === 'MoCha'){$scope.generateNtcMocha_Table();}
                else {$scope.generateNtcMDACC_Table();}

            };


        $scope.loadHeartBeatList = function () {
            irAdminApi
                .loadHeartBeatList()
                .then(function (d) {
                    angular.forEach(d.data, function (value,key) {
                        var timer = ['fa fa-clock-o fa-2x', 'color:green'];
                        var time = "On time";

                        if (key === 2) {
                            timer = ['fa fa-warning fa-2x', 'color:orange'];
                            time = "1.5 hours ago";
                        }

                        if (key === 3) {
                            timer = ['fa fa-warning fa-2x', 'color:red'];
                            time = "8.5 hours ago";
                        }
                        // var dbreport = "https://matchbox.nci.nih.gov:8443/match/common/rs/getIrUploaderFile/dbReport?ipAddress="+value.externalIpAddress;
                        // var datafile = "https://matchbox.nci.nih.gov:8443/match/common/rs/getIrUploaderFile/dataFile?ipAddress="+value.externalIpAddress;
                        // var logfile = "https://matchbox.nci.nih.gov:8443/match/common/rs/getIrUploaderFile/logFile?ipAddress="+value.externalIpAddress;

                        var dbreport = "https://matchbox.nci.nih.gov:8443/match/common/rs/getIrUploaderFile/dbReport?ipAddress=129.43.127.133";
                        var datafile = "https://matchbox.nci.nih.gov:8443/match/common/rs/getIrUploaderFile/dataFile?ipAddress=129.43.127.133";
                        var logfile = "https://matchbox.nci.nih.gov:8443/match/common/rs/getIrUploaderFile/logFile?ipAddress=129.43.127.133";

                        if(value.location !== "Yale" &&  value.location !== "MGH") {

                            // alert(value.location)

                            $scope.irList.push({
                                'timer': timer,
                                'time': time,
                                'hostName': value.hostName,
                                'ipAddress': value.ipAddress,
                                'externalIpAddress': value.externalIpAddress,
                                'status': value.status,
                                'lastContactDate': value.lastContactDate,
                                'dbReport': value.dbReport,
                                'dataFile': value.dataFile,
                                'logFile': value.logFile,
                                'location': value.location,
                                'dbReportPath': dbreport,
                                'dataFilePath': datafile,
                                'logFilePath': logfile
                            });
                        }
                    });
                });
            };

            $scope.posDate = "undefined";
            $scope.tvarDate = "undefined";
            $scope.aid = "undefined";


            //SNV
            function loadPositivesList(data) {
                $scope.positiveControlList = data;
            };
            $scope.openPositives = function (id) {
                $scope.selectedRow = id;
                $scope.mid = id;
                var url = 'data/sample_positive_control_' + id.substring(id.length - 1, id.length) + '.json';
                $scope.positives = 'mocha';

                $scope.posDate = 'July 27, 2015 3:57 PM GMT';
                $scope.tvarDate = '18';
                $scope.aid = "1445_AA_FR";

                $scope.titleid = 'SampleControl_MoCha_2';

                $scope.negativeVariantsList = [{
                    'publicMedIds': '',
                    'position': '7578373',
                    'geneName': "",
                    'variantType':'Indel',
                    'reference':'G',
                    'alternative': 'C',
                    'hgvs': 'c.557A',
                    'protein': 'p.Asp186Gly',
                    'function': 'missense'
                }];

                // var url ="data/sample_positive_control.json";

                $.ajax({

                    type   :  "GET",
                    url      :   url,
                    contentType : "application/json",
                    dataType      : "json",
                    data            :  {},
                    success: function(data){
                        loadPositivesList(data);
                    },
                    error:function(jqXHR,textStatus,errorThrown){
                        alert("Error: "+textStatus.toString());
                    }
                });
            };




            $scope.openMDACCPositives = function(id) {
                $scope.selectedRow = id;
                $scope.mid = id;

                if(id === 'SampleControl_MDACC_1'){

                    $scope.positives = 'mdacc';

                    $scope.posDate = 'July 27, 2015 3:57 PM GMT';
                    $scope.tvarDate = '18';
                    $scope.aid = "1445_BB_FR";

                    $scope.titleid = 'SampleControl_MDACC_1';
                    $scope.positiveControlList = [{"variantType":"SNV","geneName":"PIK3CA","chromosome":"3","position":"178916946","identifier":"COSM12580","reference":"G","alternative":"C","protein":"p.Lys111Asn","hgvs":"c.333G>C","purpose":null,"function":null,"hasMatchingVariant":"true"},{"variantType":"SNV","geneName":"BRAF","chromosome":"7","position":"140453136","identifier":"COSM476","reference":"A","alternative":"T","protein":"p.V600E","hgvs":"c.1799T>A","purpose":"Substitution","function":"missense","hasMatchingVariant":"false"},{"variantType":"SNV","geneName":"BRCA2","chromosome":"chr13","position":"32968850","identifier":".","reference":"C","alternative":"A","protein":"p.Ser3094Ter","hgvs":"c.9281C>A","purpose":null,"function":null,"hasMatchingVariant":"true"},{"variantType":"Indel","geneName":"PTEN","chromosome":"chr10","position":"89717716","identifier":".","reference":"-","alternative":"A","protein":"p.Pro248fs","hgvs":"c.741_742insA","purpose":null,"function":null,"hasMatchingVariant":"false"},{"variantType":"Indels","purpose":"CNV","function":null,"hasMatchingVariant":"true"},{"variantType":"CNV","geneName":"RPS6KB1","chromosome":"chr17","position":null,"identifier":null,"reference":null,"alternative":null,"protein":null,"hgvs":null,"purpose":null,"function":null,"hasMatchingVariant":"true"},{"variantType":"CNV","geneName":"ZNF217","chromosome":"chr20","position":null,"identifier":null,"reference":null,"alternative":null,"protein":null,"hgvs":null,"purpose":null,"function":null,"hasMatchingVariant":"true"},{"variantType":"Fusion","geneName":"ALK","chromosome":null,"position":null,"identifier":"AB374361","reference":null,"alternative":"EML4-ALK.E6aA20","protein":null,"hgvs":"EML4-ALK","purpose":"Fusion","function":null,"hasMatchingVariant":"true"},{"variantType":"Fusion","geneName":"ALK","chromosome":null,"position":null,"identifier":"AB374362","reference":null,"alternative":"EML4-ALK.E6bA20","protein":null,"hgvs":"EML4-ALK","purpose":"Fusion","function":null,"hasMatchingVariant":"true"}];


                    $scope.negativeVariantsList = [{
                        'publicMedIds': '',
                        'position': '7578373',
                        'geneName': "",
                        'variantType':'Indel',
                        'reference':'G',
                        'alternative': 'C',
                        'hgvs': 'c.557A',
                        'protein': 'p.Asp186Gly',
                        'function': 'missense'
                    }];

                    return;

                }
                else if(id === 'SampleControl_MDACC_2') {

                    $scope.positives = 'mdacc';

                    $scope.titleid = 'SampleControl_MDACC_2';
                    $scope.posDate = 'July 31, 2015 3:57 PM GMT';
                    $scope.tvarDate = '8';
                    $scope.aid = "1448_BB_FR";
                    $scope.positiveControlList = [{"variantType":"SNV","geneName":"PIK3CA","chromosome":"3","position":"178916946","identifier":"COSM12880","reference":"G","alternative":"C","protein":"p.Lys111Asn","hgvs":"c.333G>C","purpose":null,"function":null,"hasMatchingVariant":"true"},{"variantType":"SNV","geneName":"BRAF","chromosome":"7","position":"140453136","identifier":"COSM476","reference":"A","alternative":"T","protein":"p.V600E","hgvs":"c.1799T>A","purpose":"Substitution","function":"missense","hasMatchingVariant":"true"},{"variantType":"SNV","geneName":"BRCA2","chromosome":"chr13","position":"32968850","identifier":".","reference":"C","alternative":"A","protein":"p.Ser3094Ter","hgvs":"c.9281C>A","purpose":null,"function":null,"hasMatchingVariant":"true"},{"variantType":"Indel","geneName":"PTEN","chromosome":"chr10","position":"89717716","identifier":".","reference":"-","alternative":"A","protein":"p.Pro248fs","hgvs":"c.741_742insA","purpose":null,"function":null,"hasMatchingVariant":"false"},{"variantType":"Indels","purpose":"CNV","function":null,"hasMatchingVariant":"false"},{"variantType":"CNV","geneName":"RPS6KB1","chromosome":"chr17","position":null,"identifier":null,"reference":null,"alternative":null,"protein":null,"hgvs":null,"purpose":null,"function":null,"hasMatchingVariant":"true"},{"variantType":"CNV","geneName":"ZNF217","chromosome":"chr20","position":null,"identifier":null,"reference":null,"alternative":null,"protein":null,"hgvs":null,"purpose":null,"function":null,"hasMatchingVariant":"true"},{"variantType":"Fusion","geneName":"ALK","chromosome":null,"position":null,"identifier":"AB374361","reference":null,"alternative":"EML4-ALK.E6aA20","protein":null,"hgvs":"EML4-ALK","purpose":"Fusion","function":null,"hasMatchingVariant":"false"},{"variantType":"Fusion","geneName":"ALK","chromosome":null,"position":null,"identifier":"AB374362","reference":null,"alternative":"EML4-ALK.E6bA20","protein":null,"hgvs":"EML4-ALK","purpose":"Fusion","function":null,"hasMatchingVariant":"true"}];


                    $scope.negativeVariantsList = [{
                        'publicMedIds': '',
                        'position': '112258',
                        'geneName': "",
                        'variantType':'Indel',
                        'reference':'G',
                        'alternative': 'C',
                        'hgvs': 'c.887A',
                        'protein': 'p.Emp186Gly',
                        'function': 'missense'
                        },
                        {
                            'publicMedIds': '',
                            'position': '55689',
                            'geneName': "G_12",
                            'variantType':'Indel',
                            'reference':'G',
                            'alternative': 'C',
                            'hgvs': 'c.997A',
                            'protein': 'p.Emp82wGly',
                            'function': 'missense'
                        }];


                }

            };
            
            
            $scope.openMDAPositives = function() {

                $scope.posDate = 'July 27, 2015 3:57 PM GMT';
                $scope.tvarDate = '18';

                $scope.titleid = 'SampleControl_MoCha_3';
                $scope.positiveControlList = [{"variantType":"SNV","geneName":"PIK3CA","chromosome":"3","position":"178916946","identifier":"COSM12580","reference":"G","alternative":"C","protein":"p.Lys111Asn","hgvs":"c.333G>C","purpose":null,"function":null,"hasMatchingVariant":"true"},{"variantType":"SNV","geneName":"BRAF","chromosome":"7","position":"140453136","identifier":"COSM476","reference":"A","alternative":"T","protein":"p.V600E","hgvs":"c.1799T>A","purpose":"Substitution","function":"missense","hasMatchingVariant":"false"},{"variantType":"SNV","geneName":"BRCA2","chromosome":"chr13","position":"32968850","identifier":".","reference":"C","alternative":"A","protein":"p.Ser3094Ter","hgvs":"c.9281C>A","purpose":null,"function":null,"hasMatchingVariant":"true"},{"variantType":"Indel","geneName":"PTEN","chromosome":"chr10","position":"89717716","identifier":".","reference":"-","alternative":"A","protein":"p.Pro248fs","hgvs":"c.741_742insA","purpose":null,"function":null,"hasMatchingVariant":"false"},{"variantType":"Indels","purpose":"CNV","function":null,"hasMatchingVariant":"true"},{"variantType":"CNV","geneName":"RPS6KB1","chromosome":"chr17","position":null,"identifier":null,"reference":null,"alternative":null,"protein":null,"hgvs":null,"purpose":null,"function":null,"hasMatchingVariant":"true"},{"variantType":"CNV","geneName":"ZNF217","chromosome":"chr20","position":null,"identifier":null,"reference":null,"alternative":null,"protein":null,"hgvs":null,"purpose":null,"function":null,"hasMatchingVariant":"true"},{"variantType":"Fusion","geneName":"ALK","chromosome":null,"position":null,"identifier":"AB374361","reference":null,"alternative":"EML4-ALK.E6aA20","protein":null,"hgvs":"EML4-ALK","purpose":"Fusion","function":null,"hasMatchingVariant":"true"},{"variantType":"Fusion","geneName":"ALK","chromosome":null,"position":null,"identifier":"AB374362","reference":null,"alternative":"EML4-ALK.E6bA20","protein":null,"hgvs":"EML4-ALK","purpose":"Fusion","function":null,"hasMatchingVariant":"true"}];


                $scope.negativeVariantsList.push({
                    'publicMedIds': '',
                    'position': '7578373',
                    'geneName': "",
                    'variantType':'Indel',
                    'reference':'G',
                    'alternative': 'C',
                    'hgvs': 'c.557A',
                    'protein': 'p.Asp186Gly',
                    'function': 'missense'
                });

                $scope.positives = 'mdacc';

            };

            $scope.openMDAPositives1 = function() {
                $scope.positives = 'mdacc1';

            };

            $scope.openPositives1 = function() {
                $scope.positives = 'mocha1';

            };

            $scope.closePositives = function() {
                $scope.selectedRow = "";
                $scope.positives = 'undefined';

            };

            function loadNegativesList(data) {
                $scope.indelsList = data;
            };

            $scope.openNegatives = function(id) {
                $scope.selectedRow = id;

                $scope.negatives = 'mocha';

                var url ="data/sample_ntc_mocha_control_1.json";

                $.ajax({

                    type   :  "GET",
                    url      :   url,
                    contentType : "application/json",
                    dataType      : "json",
                    data            :  {},
                    success: function(data){
                        loadNegativesList(data);
                    },
                    error:function(jqXHR,textStatus,errorThrown){
                        alert("Error: "+textStatus.toString());
                    }
                });



            };

            $scope.openMDANegatives = function(id) {
                $scope.selectedRow = id;
                $scope.sampleId = id;
                $scope.negatives = 'mdacc';

            };

            $scope.openNegatives1 = function() {
                $scope.negatives = 'mocha1';

            };

            $scope.closeNegatives = function() {
                $scope.selectedRow = "";
                $scope.negatives = 'undefined';

            };
            

            $scope.loadSampleControlsList = function () {
                irAdminApi
                    .loadSampleControlsList()
                    .then(function (d) {
                        $scope.populateData(d);
                    });
            };


            $scope.loadSampleMDACCControlsList = function () {

                irAdminApi
                    .loadSampleControlsList()
                    .then(function (d) {
                        $scope.populateData(d);

                    });
            };

            //Genrate Postive Token
            $scope.generatePositiveControlToken = function (items) {
                irAdminApi
                    .generatePositiveControlToken(items)
                    .then(function (d) {},
                    function(response) {});
            };

            //Genrate No Template Token
            $scope.generateNoTemplateControlToken = function (items) {
                irAdminApi
                    .generateNoTemplateControlToken(items)
                    .then(function (d) {},
                        function(response) {});
            };




            $scope.loadPieChart = function(site) {



                aMoiLabels = ['Failed', 'Success', 'Not Generated'];
                ntcMoiLabels = ['Failed', 'Success', 'Not Generated'];
                if(site==='mocha') {
                    aMoiValues = [15, 75, 10]; //[4, 10, 14, 6, 10, 16]; //[45, 21, 4, 35, 9, 6];
                    ntcMoiValues = [10, 26, 4]; //[4, 10, 14, 6, 10, 16]; //[45, 21, 4, 35, 9, 6];
                }
                else{
                    aMoiValues = [25, 67, 8];
                    ntcMoiValues = [1, 18, 2];
                }
                aMoiHighlight = "#000088"; //"#dedede";

                $scope.pieData = [
                    {
                        value: aMoiValues[0],
                        color: "darkred",
                        highlight: aMoiHighlight,
                        label: aMoiLabels[0]
                    },
                    {
                        value: aMoiValues[1],
                        color: "darkgreen",
                        highlight: aMoiHighlight,
                        label: aMoiLabels[1]
                    },
                    {
                        value: aMoiValues[2],
                        color: "#18a689", //"#ab0102",
                        highlight: aMoiHighlight,
                        label: aMoiLabels[2]
                    }

                ];


                $scope.ntcpieData = [
                    {
                        value: ntcMoiValues[0],
                        color: "orange",
                        highlight: aMoiHighlight,
                        label: ntcMoiLabels[0]
                    },
                    {
                        value: ntcMoiValues[1],
                        color: "navy",
                        highlight: aMoiHighlight,
                        label: ntcMoiLabels[1]
                    },
                    {
                        value: ntcMoiValues[2],
                        color: "indigo", //"#ab0102",
                        highlight: aMoiHighlight,
                        label: ntcMoiLabels[2]
                    }
            ];


                $scope.ntcMDApieData = [
                    {
                        value: ntcMoiValues[0],
                        color: "orange",
                        highlight: aMoiHighlight,
                        label: ntcMoiLabels[0]
                    },
                    {
                        value: ntcMoiValues[1],
                        color: "navy",
                        highlight: aMoiHighlight,
                        label: ntcMoiLabels[1]
                    },
                    {
                        value: ntcMoiValues[2],
                        color: "indigo", //"#ab0102",
                        highlight: aMoiHighlight,
                        label: ntcMoiLabels[2]
                    }
                ];

            }

            //Svg for samples
            $scope.loadScatterPlot = function () {

                $window.histogramPlot();
                $window.circosPlot();
                $window.piePlot();
                        // $window.d3BoxVersion5(d.data);

            };

            $scope.loadSampleBreakups = function() {
                $scope.barlegend = "Total Positive / Ntc Control Status";

                var prepareData = {
                    series: [5, 3, 4]
                }

                this.pieData = prepareData;

                pieNames = [
                    'EAY131-QQQ'
                    , 'EAY131-BEEE'
                    , 'EAY131-HRRR'
                ];

                var options = {
                    percentageInnerCutout: 40
                };

                $scope.flotPieData = {
                    labels: pieNames,
                    datasets: [
                        {
                            label: "Positive Controls",
                            fillColor: "#1c84c6",
                            strokeColor: "rgba(220,220,220,0.8)",
                            highlightFill: "#23c6c8", //"rgba(220,220,220,0.75)",
                            highlightStroke: "rgba(220,220,220,1)",
                            segmentShowStroke : false,
                            animateScale : true,
                            percentageInnerCutout: 95,
                            data: prepareData
                        }
                    ]
                };




                /**
                 * Options for Doughnut chart
                 */
                $scope.doughnutOptions = {
                    segmentShowStroke : true,
                    segmentStrokeColor : "#fff",
                    segmentStrokeWidth : 2,
                    percentageInnerCutout : 55, // This is 0 for Pie charts
                    animationSteps : 100,
                    animationEasing : "easeOutBounce",
                    animateRotate : true,
                    animateScale : false
                };

                    armNames = [
                        'Mon.'
                        , 'Tue.'
                        , ' Wed.'
                        , 'Thu.'
                        , 'Fri.'
                        , 'Sat.'
                        , 'Sun.'
                    ];
                    armValues = [16, 13, 2, 24, 28, 1, 0];
                    armValues1 = [2, 3, 4, 5, 2, 1, 0];
                    // armValues2 = [10, 0.5, 73, 0, 3];

                    armNamesYear = [
                        'Mon.'
                        , 'Tue.'
                        , ' Wed.'
                        , 'Thu.'
                        , 'Fri.'
                        , 'Sat.'
                        , 'Sun.'
                    ];
                    armValuesYear = [16, 13, 2, 24, 28, 1, 0];
                    armValuesYear1 = [2, 3, 4, 5, 2, 1, 0];
                    // armValues2 = [10, 0.5, 73, 0, 3];




                $scope.barData = {
                    labels: armNames,
                    datasets: [
                        {
                            // label: "<b style='color:darkgreen;'>Positive Controls</b>",
                            backgroundColor: 'darkgreen',
                            fillColor: 'darkgreen',
                            strokeColor: 'rgba(220,220,220,0.8)',
                            pointColor: 'darkgreen',
                            highlightFill: '#23c6c8', //"rgba(220,220,220,0.75)",
                            highlightStroke: 'rgba(220,220,220,1)',
                            data: armValues
                        },
                        {
                            // label: "<b style='color:navy;'>No Template Controls</b>",
                            backgroundColor: 'navy',
                            fillColor: 'navy',
                            strokeColor: 'rgba(151,187,205,1)',
                            pointColor: 'navy',
                            highlightFill: '#23c6c8', //'rgba(220,220,220,0.75)',
                            highlightStroke: 'rgba(220,220,220,1)',
                            data: armValues1
                        }

                    ]
                };

                mdaccNames = [
                    'Mon.'
                    , 'Tue.'
                    , ' Wed.'
                    , 'Thu.'
                    , 'Fri.'
                    , 'Sat.'
                    , 'Sun.'
                ];

                mdaccValues = [12, 15, 11, 21, 11, 1, 0];
                mdaccValues1 = [6, 7, 3, 9, 2, 1, 0];

                $scope.barDataMDACC = {
                    labels: mdaccNames,
                    datasets: [
                        {
                            // label: "<b style='color:darkgreen;'>Positive Controls</b>",
                            backgroundColor: 'darkgreen',
                            fillColor: "darkgreen",
                            strokeColor: "rgba(220,220,220,0.8)",
                            highlightFill: "#23c6c8", //"rgba(220,220,220,0.75)",
                            highlightStroke: "rgba(220,220,220,1)",
                            data: mdaccValues
                        },
                        {
                            // label: "<b style='color:navy;'>No Template Controls</b>",
                            backgroundColor: 'navy',
                            fillColor: 'navy',
                            strokeColor: 'rgba(151,187,205,1)',
                            pointColor: 'rgba(151,187,205,1)',
                            highlightFill: "#23c6c8", //"rgba(220,220,220,0.75)",
                            highlightStroke: "rgba(220,220,220,1)",
                            data: mdaccValues1
                        }
                    ]
                };
            };


            $scope.ntcBarChart = function(id){

                $scope.barlegend = "Weekly NTC Control Status"

                if(id === 'mocha'){

                    armNames = [
                        'Mon.'
                        , 'Tue.'
                        , ' Wed.'
                        , 'Thu.'
                        , 'Fri.'
                    ];
                    armValues = [4, 7, 3, 10, 1];
                    armValues1 = [3, 1, 1, 2, 3];

                    $scope.barData = {
                        labels: armNames,
                        datasets: [
                            {
                                label: "Accrual Dataset",
                                fillColor: "darkgreen",
                                strokeColor: "rgba(220,220,220,0.8)",
                                highlightFill: "#23c6c8", //"rgba(220,220,220,0.75)",
                                highlightStroke: "rgba(220,220,220,1)",
                                data: armValues
                            },
                            {
                                fillColor: 'orange',
                                strokeColor: 'rgba(151,187,205,1)',
                                pointColor: 'rgba(151,187,205,1)',
                                highlightFill: "#23c6c8", //"rgba(220,220,220,0.75)",
                                highlightStroke: "rgba(220,220,220,1)",
                                data: armValues1
                            }
                            ]};
                }
                else if (id === 'mdacc'){

                    armNames = [
                        'Mon.'
                        , 'Tue.'
                        , ' Wed.'
                        , 'Thu.'
                        , 'Fri.'
                    ];
                    armValues = [0, 0, 0, 1, 0];
                    armValues1 = [3, 1, 1, 2, 3];

                    $scope.barDataMDACC = {
                        labels: armNames,
                        datasets: [
                            {
                                label: "Accrual Dataset",
                                fillColor: "orange",
                                strokeColor: "rgba(220,220,220,0.8)",
                                highlightFill: "#23c6c8", //"rgba(220,220,220,0.75)",
                                highlightStroke: "rgba(220,220,220,1)",
                                data: armValues
                            },
                            {
                                fillColor: 'darkgreen',
                                strokeColor: 'rgba(151,187,205,1)',
                                pointColor: 'rgba(151,187,205,1)',
                                highlightFill: "#23c6c8", //"rgba(220,220,220,0.75)",
                                highlightStroke: "rgba(220,220,220,1)",
                                data: armValues1
                            }
                        ]};
                }

            };

    });
