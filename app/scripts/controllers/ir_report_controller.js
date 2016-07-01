angular.module('iradmin.matchbox',['ui.bootstrap', 'cgPrompt', 'ui.router'])
    .controller('IrAdminController',
        function( $scope, $http, $window, $stateParams, DTOptionsBuilder, irAdminApi, prompt, $uibModal, $filter) {

        angular.element(document).ready(function () {
            $('.equal-height-panels .panel').matchHeight();
        });

        $scope.dtOptions = DTOptionsBuilder.newOptions()
            .withDisplayLength(5);

        $scope.dtOptions = DTOptionsBuilder.newOptions()
            .withOption('bLengthChange', false);

        $scope.dtOptions = DTOptionsBuilder.newOptions()
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
            $scope.barlegend = 'Weekly Positive Control Status';

        $scope.branch = $stateParams.branch;

           

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
            $scope.positiveControlList2 = [{"variantType":"SNV","geneName":"PIK3CA","chromosome":"chr3","position":"178916946","identifier":"COSM12880","reference":"G","alternative":"C","protein":"p.Lys111Asn","hgvs":"c.333G>C","purpose":null,"function":null,"hasMatchingVariant":"false"},{"variantType":"SNV","geneName":"BRAF","chromosome":"chr7","position":"140453136","identifier":"COSM476","reference":"A","alternative":"T","protein":"p.V600E","hgvs":"c.1799T>A","purpose":"Substitution","function":"missense","hasMatchingVariant":"true"},{"variantType":"SNV","geneName":"BRCA2","chromosome":"chr13","position":"32968850","identifier":".","reference":"C","alternative":"A","protein":"p.Ser3094Ter","hgvs":"c.9281C>A","purpose":null,"function":null,"hasMatchingVariant":"true"},{"variantType":"Indel","geneName":"PTEN","chromosome":"chr10","position":"89717716","identifier":".","reference":"-","alternative":"A","protein":"p.Pro248fs","hgvs":"c.741_742insA","purpose":null,"function":null,"hasMatchingVariant":"true"},{"variantType":"Indels","purpose":"CNV","function":null,"hasMatchingVariant":"true"},{"variantType":"CNV","geneName":"RPS6KB1","chromosome":"chr17","position":null,"identifier":null,"reference":null,"alternative":null,"protein":null,"hgvs":null,"purpose":null,"function":null,"hasMatchingVariant":"true"},{"variantType":"CNV","geneName":"ZNF217","chromosome":"chr20","position":null,"identifier":null,"reference":null,"alternative":null,"protein":null,"hgvs":null,"purpose":null,"function":null,"hasMatchingVariant":"true"},{"variantType":"Fusion","geneName":"ALK","chromosome":null,"position":null,"identifier":"AB374361","reference":null,"alternative":"EML4-ALK.E6aA20","protein":null,"hgvs":"EML4-ALK","purpose":"Fusion","function":null,"hasMatchingVariant":"false"},{"variantType":"Fusion","geneName":"ALK","chromosome":null,"position":null,"identifier":"AB374362","reference":null,"alternative":"EML4-ALK.E6bA20","protein":null,"hgvs":"EML4-ALK","purpose":"Fusion","function":null,"hasMatchingVariant":"true"}];

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



            //Mocks
            $scope.indelsList = [{"type":"snv","metadata":{"id":"38781871-ebc3-4df7-b4d3-c89c124363c2","comment":null},"publicMedIds":null,"geneName":"","chromosome":"chr3","position":"178916946","identifier":"COSM12580","reference":"G","alternative":"C","filter":"PASS","description":null,"protein":"p.Lys111Asn","transcript":"NM_006218.2","hgvs":"c.333G>C","location":"exonic","readDepth":1403,"rare":false,"alleleFrequency":0.138275,"flowAlternativeAlleleObservationCount":"194","flowReferenceAlleleObservations":"1209","referenceAlleleObservations":1405,"alternativeAlleleObservationCount":0,"variantClass":null,"levelOfEvidence":null,"inclusion":true,"armSpecific":false,"gene":"PIK3CA","oncominevariantclass":"Hotspot","exon":"2","function":"missense","proteinMatch":null,"confirmed":false,"matchingId":"COSM12580"},{"type":"snv","metadata":{"id":"cb33b736-1101-4c22-8b21-66c4bad7f7ca","comment":null},"publicMedIds":null,"geneName":"","chromosome":"chr13","position":"32968850","identifier":".","reference":"C","alternative":"A","filter":"PASS","description":null,"protein":"p.Ser3094Ter","transcript":"NM_000059.3","hgvs":"c.9281C>A","location":"exonic","readDepth":1432,"rare":false,"alleleFrequency":0.244413,"flowAlternativeAlleleObservationCount":"350","flowReferenceAlleleObservations":"1082","referenceAlleleObservations":1079,"alternativeAlleleObservationCount":350,"variantClass":null,"levelOfEvidence":null,"inclusion":true,"armSpecific":false,"gene":"BRCA2","oncominevariantclass":"Deleterious","exon":"25","function":"nonsense","proteinMatch":null,"confirmed":false,"matchingId":"."},{"type":"snv","metadata":{"id":"2dae6bbe-caf5-4d2a-8f81-35ba9f85f0e8","comment":null},"publicMedIds":null,"geneName":"","chromosome":"chr7","position":"140453136","identifier":"COSM476","reference":"A","alternative":"T","filter":"PASS","description":null,"protein":"p.Val600Glu","transcript":"NM_004333.4","hgvs":"c.1799T>A","location":"exonic","readDepth":1866,"rare":false,"alleleFrequency":0.237406,"flowAlternativeAlleleObservationCount":"443","flowReferenceAlleleObservations":"1423","referenceAlleleObservations":1875,"alternativeAlleleObservationCount":0,"variantClass":null,"levelOfEvidence":null,"inclusion":true,"armSpecific":false,"gene":"BRAF","oncominevariantclass":"Hotspot","exon":"15","function":"missense","proteinMatch":null,"confirmed":false,"matchingId":"COSM476"},
                {"type":"id","metadata":{"id":"f89e170d-f64e-4d9a-be7f-eb38497ed8ec","comment":null},"publicMedIds":null,"geneName":"","chromosome":"chr13","position":"48916816","identifier":".","reference":"ACTT","alternative":"-","filter":"PASS","description":null,"protein":"p.Thr116fs","transcript":"NM_000321.2","hgvs":"c.346_349delACTT","location":"exonic","readDepth":1187,"rare":false,"alleleFrequency":0.221567,"flowAlternativeAlleleObservationCount":"263","flowReferenceAlleleObservations":"924","referenceAlleleObservations":898,"alternativeAlleleObservationCount":261,"variantClass":null,"levelOfEvidence":null,"inclusion":true,"armSpecific":false,"gene":"RB1","oncominevariantclass":"Deleterious","exon":"3","function":"frameshiftDeletion","proteinMatch":null,"confirmed":false,"matchingId":"."},{"type":"id","metadata":{"id":"3c4d6ebe-b92f-4359-8f61-1ee7886e3aee","comment":null},"publicMedIds":null,"geneName":"","chromosome":"chr17","position":"7574003","identifier":".","reference":"G","alternative":"-","filter":"PASS","description":null,"protein":"p.Arg342fs","transcript":"NM_000546.5","hgvs":"c.1024_1024delC","location":"exonic","readDepth":1261,"rare":false,"alleleFrequency":0.171293,"flowAlternativeAlleleObservationCount":"216","flowReferenceAlleleObservations":"1045","referenceAlleleObservations":1037,"alternativeAlleleObservationCount":215,"variantClass":null,"levelOfEvidence":null,"inclusion":true,"armSpecific":false,"gene":"TP53","oncominevariantclass":"Deleterious","exon":"10","function":"frameshiftDeletion","proteinMatch":null,"confirmed":false,"matchingId":"."},{"type":"id","metadata":{"id":"bc315edc-8267-4ff5-b4b2-5ce79732093e","comment":null},"publicMedIds":null,"geneName":"","chromosome":"chr10","position":"89717716","identifier":".","reference":"-","alternative":"A","filter":"PASS","description":null,"protein":"p.Pro248fs","transcript":"NM_000314.4","hgvs":"c.740_741insA","location":"exonic","readDepth":1239,"rare":false,"alleleFrequency":0.230831,"flowAlternativeAlleleObservationCount":"286","flowReferenceAlleleObservations":"953","referenceAlleleObservations":951,"alternativeAlleleObservationCount":284,"variantClass":null,"levelOfEvidence":null,"inclusion":true,"armSpecific":false,"gene":"PTEN","oncominevariantclass":"Deleterious","exon":"7","function":"frameshiftInsertion","proteinMatch":null,"confirmed":false,"matchingId":"."},
                {"type":"cnv","metadata":{"id":"1a69685f-c109-42b5-84aa-7387e29a6bcc","comment":null},"publicMedIds":null,"geneName":"","chromosome":"chr17","position":"37845133","identifier":"ERBB2","reference":"G","alternative":"<CNV>","filter":"PASS","description":null,"protein":null,"transcript":null,"hgvs":"","location":"","readDepth":null,"rare":false,"alleleFrequency":null,"flowAlternativeAlleleObservationCount":"","flowReferenceAlleleObservations":"","referenceAlleleObservations":null,"alternativeAlleleObservationCount":null,"variantClass":null,"levelOfEvidence":null,"inclusion":true,"armSpecific":false,"gene":"ERBB2","oncominevariantclass":"Amplification","exon":"","function":"","proteinMatch":null,"confirmed":false,"refCopyNumber":2,"rawCopyNumber":16.2,"copyNumber":16.2,"confidenceInterval95percent":17.0665,"confidenceInterval5percent":15.3775,"matchingId":"ERBB2"},{"type":"cnv","metadata":{"id":"2b8fc68e-5e8a-4685-82fd-54319551f83a","comment":null},"publicMedIds":null,"geneName":"","chromosome":"chr17","position":"57974717","identifier":"RPS6KB1","reference":"T","alternative":"<CNV>","filter":"PASS","description":null,"protein":null,"transcript":null,"hgvs":"","location":"","readDepth":null,"rare":false,"alleleFrequency":null,"flowAlternativeAlleleObservationCount":"","flowReferenceAlleleObservations":"","referenceAlleleObservations":null,"alternativeAlleleObservationCount":null,"variantClass":null,"levelOfEvidence":null,"inclusion":true,"armSpecific":false,"gene":"RPS6KB1","oncominevariantclass":"Amplification","exon":"","function":"","proteinMatch":null,"confirmed":false,"refCopyNumber":2,"rawCopyNumber":8.6,"copyNumber":8.6,"confidenceInterval95percent":9.16673,"confidenceInterval5percent":8.06831,"matchingId":"RPS6KB1"},{"type":"cnv","metadata":{"id":"1c8014d1-5ef1-4dfb-a053-c3f5cdb78126","comment":null},"publicMedIds":null,"geneName":"","chromosome":"chr20","position":"52184148","identifier":"ZNF217","reference":"G","alternative":"<CNV>","filter":"PASS","description":null,"protein":null,"transcript":null,"hgvs":"","location":"","readDepth":null,"rare":false,"alleleFrequency":null,"flowAlternativeAlleleObservationCount":"","flowReferenceAlleleObservations":"","referenceAlleleObservations":null,"alternativeAlleleObservationCount":null,"variantClass":null,"levelOfEvidence":null,"inclusion":true,"armSpecific":false,"gene":"ZNF217","oncominevariantclass":"Amplification","exon":"","function":"","proteinMatch":null,"confirmed":false,"refCopyNumber":2,"rawCopyNumber":12.5,"copyNumber":12.5,"confidenceInterval95percent":13.3237,"confidenceInterval5percent":11.7272,"matchingId":"ZNF217"}

            ];
            $scope.singleNucleotideVariantsList = [{"type":"id","metadata":{"id":"f89e170d-f64e-4d9a-be7f-eb38497ed8ec","comment":null},"publicMedIds":null,"geneName":"","chromosome":"chr13","position":"48916816","identifier":".","reference":"ACTT","alternative":"-","filter":"PASS","description":null,"protein":"p.Thr116fs","transcript":"NM_000321.2","hgvs":"c.346_349delACTT","location":"exonic","readDepth":1187,"rare":false,"alleleFrequency":0.221567,"flowAlternativeAlleleObservationCount":"263","flowReferenceAlleleObservations":"924","referenceAlleleObservations":898,"alternativeAlleleObservationCount":261,"variantClass":null,"levelOfEvidence":null,"inclusion":true,"armSpecific":false,"gene":"RB1","oncominevariantclass":"Deleterious","exon":"3","function":"frameshiftDeletion","proteinMatch":null,"confirmed":false,"matchingId":"."},{"type":"id","metadata":{"id":"3c4d6ebe-b92f-4359-8f61-1ee7886e3aee","comment":null},"publicMedIds":null,"geneName":"","chromosome":"chr17","position":"7574003","identifier":".","reference":"G","alternative":"-","filter":"PASS","description":null,"protein":"p.Arg342fs","transcript":"NM_000546.5","hgvs":"c.1024_1024delC","location":"exonic","readDepth":1261,"rare":false,"alleleFrequency":0.171293,"flowAlternativeAlleleObservationCount":"216","flowReferenceAlleleObservations":"1045","referenceAlleleObservations":1037,"alternativeAlleleObservationCount":215,"variantClass":null,"levelOfEvidence":null,"inclusion":true,"armSpecific":false,"gene":"TP53","oncominevariantclass":"Deleterious","exon":"10","function":"frameshiftDeletion","proteinMatch":null,"confirmed":false,"matchingId":"."},{"type":"id","metadata":{"id":"bc315edc-8267-4ff5-b4b2-5ce79732093e","comment":null},"publicMedIds":null,"geneName":"","chromosome":"chr10","position":"89717716","identifier":".","reference":"-","alternative":"A","filter":"PASS","description":null,"protein":"p.Pro248fs","transcript":"NM_000314.4","hgvs":"c.740_741insA","location":"exonic","readDepth":1239,"rare":false,"alleleFrequency":0.230831,"flowAlternativeAlleleObservationCount":"286","flowReferenceAlleleObservations":"953","referenceAlleleObservations":951,"alternativeAlleleObservationCount":284,"variantClass":null,"levelOfEvidence":null,"inclusion":true,"armSpecific":false,"gene":"PTEN","oncominevariantclass":"Deleterious","exon":"7","function":"frameshiftInsertion","proteinMatch":null,"confirmed":false,"matchingId":"."}]
            $scope.copyNumberVariantsList = [{"type":"cnv","metadata":{"id":"1a69685f-c109-42b5-84aa-7387e29a6bcc","comment":null},"publicMedIds":null,"geneName":"","chromosome":"chr17","position":"37845133","identifier":"ERBB2","reference":"G","alternative":"<CNV>","filter":"PASS","description":null,"protein":null,"transcript":null,"hgvs":"","location":"","readDepth":null,"rare":false,"alleleFrequency":null,"flowAlternativeAlleleObservationCount":"","flowReferenceAlleleObservations":"","referenceAlleleObservations":null,"alternativeAlleleObservationCount":null,"variantClass":null,"levelOfEvidence":null,"inclusion":true,"armSpecific":false,"gene":"ERBB2","oncominevariantclass":"Amplification","exon":"","function":"","proteinMatch":null,"confirmed":false,"refCopyNumber":2,"rawCopyNumber":16.2,"copyNumber":16.2,"confidenceInterval95percent":17.0665,"confidenceInterval5percent":15.3775,"matchingId":"ERBB2"},{"type":"cnv","metadata":{"id":"2b8fc68e-5e8a-4685-82fd-54319551f83a","comment":null},"publicMedIds":null,"geneName":"","chromosome":"chr17","position":"57974717","identifier":"RPS6KB1","reference":"T","alternative":"<CNV>","filter":"PASS","description":null,"protein":null,"transcript":null,"hgvs":"","location":"","readDepth":null,"rare":false,"alleleFrequency":null,"flowAlternativeAlleleObservationCount":"","flowReferenceAlleleObservations":"","referenceAlleleObservations":null,"alternativeAlleleObservationCount":null,"variantClass":null,"levelOfEvidence":null,"inclusion":true,"armSpecific":false,"gene":"RPS6KB1","oncominevariantclass":"Amplification","exon":"","function":"","proteinMatch":null,"confirmed":false,"refCopyNumber":2,"rawCopyNumber":8.6,"copyNumber":8.6,"confidenceInterval95percent":9.16673,"confidenceInterval5percent":8.06831,"matchingId":"RPS6KB1"},{"type":"cnv","metadata":{"id":"1c8014d1-5ef1-4dfb-a053-c3f5cdb78126","comment":null},"publicMedIds":null,"geneName":"","chromosome":"chr20","position":"52184148","identifier":"ZNF217","reference":"G","alternative":"<CNV>","filter":"PASS","description":null,"protein":null,"transcript":null,"hgvs":"","location":"","readDepth":null,"rare":false,"alleleFrequency":null,"flowAlternativeAlleleObservationCount":"","flowReferenceAlleleObservations":"","referenceAlleleObservations":null,"alternativeAlleleObservationCount":null,"variantClass":null,"levelOfEvidence":null,"inclusion":true,"armSpecific":false,"gene":"ZNF217","oncominevariantclass":"Amplification","exon":"","function":"","proteinMatch":null,"confirmed":false,"refCopyNumber":2,"rawCopyNumber":12.5,"copyNumber":12.5,"confidenceInterval95percent":13.3237,"confidenceInterval5percent":11.7272,"matchingId":"ZNF217"}]
            $scope.geneFusionsList = [{"type":"gf","metadata":{"id":"aea26ca8-0cf5-4248-bb09-bb29283677b5","comment":null},"publicMedIds":null,"geneName":"EML4","chromosome":"chr2","position":"42491871","identifier":"EML4-ALK.E6aA20.AB374361_1","reference":"G","alternative":"G]chr2:29446394]","filter":"PASS","description":null,"protein":null,"transcript":null,"hgvs":"","location":"","readDepth":73149,"rare":false,"alleleFrequency":null,"flowAlternativeAlleleObservationCount":"","flowReferenceAlleleObservations":"","referenceAlleleObservations":null,"alternativeAlleleObservationCount":null,"variantClass":null,"levelOfEvidence":null,"inclusion":true,"armSpecific":false,"gene":"EML4","oncominevariantclass":"Fusion","exon":"6","function":"","proteinMatch":null,"confirmed":false,"fusionIdentity":null,"matchingId":"EML4-ALK.E6aA20.AB374361_1"},{"type":"gf","metadata":{"id":"33f7c8eb-81c9-47af-a3ef-7d9b00b13046","comment":null},"publicMedIds":null,"geneName":"ALK","chromosome":"chr2","position":"29446394","identifier":"EML4-ALK.E6aA20.AB374361_2","reference":"A","alternative":"]chr2:42491871]A","filter":"PASS","description":null,"protein":null,"transcript":null,"hgvs":"","location":"","readDepth":73149,"rare":false,"alleleFrequency":null,"flowAlternativeAlleleObservationCount":"","flowReferenceAlleleObservations":"","referenceAlleleObservations":null,"alternativeAlleleObservationCount":null,"variantClass":null,"levelOfEvidence":null,"inclusion":true,"armSpecific":false,"gene":"ALK","oncominevariantclass":"Fusion","exon":"20","function":"","proteinMatch":null,"confirmed":false,"fusionIdentity":null,"matchingId":"EML4-ALK.E6aA20.AB374361_2"},{"type":"gf","metadata":{"id":"89fcff5c-69ee-41e7-a362-73a9e8fa4905","comment":null},"publicMedIds":null,"geneName":"EML4","chromosome":"chr2","position":"42492091","identifier":"EML4-ALK.E6bA20.AB374362_1","reference":"G","alternative":"G]chr2:29446394]","filter":"PASS","description":null,"protein":null,"transcript":null,"hgvs":"","location":"","readDepth":16372,"rare":false,"alleleFrequency":null,"flowAlternativeAlleleObservationCount":"","flowReferenceAlleleObservations":"","referenceAlleleObservations":null,"alternativeAlleleObservationCount":null,"variantClass":null,"levelOfEvidence":null,"inclusion":true,"armSpecific":false,"gene":"EML4","oncominevariantclass":"Fusion","exon":"6","function":"","proteinMatch":null,"confirmed":false,"fusionIdentity":null,"matchingId":"EML4-ALK.E6bA20.AB374362_1"},{"type":"gf","metadata":{"id":"2d87fd81-2fb7-434f-94e2-dd49be243a5a","comment":null},"publicMedIds":null,"geneName":"ALK","chromosome":"chr2","position":"29446394","identifier":"EML4-ALK.E6bA20.AB374362_2","reference":"A","alternative":"]chr2:42492091]A","filter":"PASS","description":null,"protein":null,"transcript":null,"hgvs":"","location":"","readDepth":16372,"rare":false,"alleleFrequency":null,"flowAlternativeAlleleObservationCount":"","flowReferenceAlleleObservations":"","referenceAlleleObservations":null,"alternativeAlleleObservationCount":null,"variantClass":null,"levelOfEvidence":null,"inclusion":true,"armSpecific":false,"gene":"ALK","oncominevariantclass":"Fusion","exon":"20","function":"","proteinMatch":null,"confirmed":false,"fusionIdentity":null,"matchingId":"EML4-ALK.E6bA20.AB374362_2"}]


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

            // $scope.getMDACC = getMDACC;
            // $scope.getMOCHA = getMOCHA;

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

                // alert(JSON.stringify($scope.positiveListMDCC))
                // alert(JSON.stringify($scope.negativeListMDCC))


            });
        };

        $scope.showPositiveControlConfirmation = function (id) {

        prompt({
            "title": "Do you want to continue?",
            "message": "Warning! Once this action has been submitted it cannot be undone. Please enter your site pin to confirm. ",
            "input": true,
            "label": "PIN",
            "value": ""
        }).then(function(result){
            var items = {};
            var d = $filter('filter')($scope.tokenIpAddress, id);
            items.confirmation = result;
            items.ipAddress = d[0].siteIpAddress;
            irAdminApi
                .generatePositiveControlToken(items)
                .then(
                    function () {
                        irAdminApi
                            .loadSampleControlsList()
                            .then(function (d) {
                                //Clean tables
                                $scope.positiveListMocha = [];
                                $scope.positiveListMDCC = [];
                                $scope.negativeListMocha = [];
                                $scope.negativeListMDCC = [];
                                $scope.tokenIpAddress = [];

                                $scope.populateData(d);
                            });
                    },
                function(response) { // optional
                });
            });
        };


        $scope.showNoTemplateControlConfirmation = function (id) {
            prompt({
                "title": "Do you want to continue?",
                "message": "Warning! Once this action has been submitted it cannot be undone. Please enter your site pin to confirm. ",
                "input": true,
                "label": "PIN",
                "value": ""
            }).then(function(result){
                var items = {};
                var d = $filter('filter')($scope.tokenIpAddress, id);
                items.confirmation = result;
                items.ipAddress = d[0].siteIpAddress;
                irAdminApi
                    .generateNoTemplateControlToken(items)
                    .then(
                        function () {
                            irAdminApi
                                .loadSampleControlsList()
                                .then(function (d) {
                                    //Clean tables
                                    $scope.positiveListMocha = [];
                                    $scope.positiveListMDCC = [];
                                    $scope.negativeListMocha = [];
                                    $scope.negativeListMDCC = [];
                                    $scope.tokenIpAddress = [];

                                    $scope.populateData(d);
                                });
                        },
                        function(response) { // optional
                        });
            });
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

            $scope.loadHeartMoChaBeatList = function () {
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

                            if(value.location === "MoCha") {

                                // alert(value.location)

                                // $scope.moChaList.push({
                                //     'timer': timer,
                                //     'time': time,
                                //     'hostName': value.hostName,
                                //     'ipAddress': value.ipAddress,
                                //     'externalIpAddress': value.externalIpAddress,
                                //     'status': value.status,
                                //     'lastContactDate': value.lastContactDate,
                                //     'dbReport': value.dbReport,
                                //     'dataFile': value.dataFile,
                                //     'logFile': value.logFile,
                                //     'location': value.location,
                                //     'dbReportPath': dbreport,
                                //     'dataFilePath': datafile,
                                //     'logFilePath': logfile
                                // });
                            }
                            else if(value.location === "MDACC") {

                                // alert(value.location)

                                // $scope.mdAccList.push({
                                //     'timer': timer,
                                //     'time': time,
                                //     'hostName': value.hostName,
                                //     'ipAddress': value.ipAddress,
                                //     'externalIpAddress': value.externalIpAddress,
                                //     'status': value.status,
                                //     'lastContactDate': value.lastContactDate,
                                //     'dbReport': value.dbReport,
                                //     'dataFile': value.dataFile,
                                //     'logFile': value.logFile,
                                //     'location': value.location,
                                //     'dbReportPath': dbreport,
                                //     'dataFilePath': datafile,
                                //     'logFilePath': logfile
                                // });
                            }
                        });
                    });
            };


            $scope.openPositives = function(id) {

                if(id === 1){
                    $scope.positiveControlList = [{"variantType":"SNV","geneName":"PIK3CA","chromosome":"chr3","position":"178916946","identifier":"COSM12580","reference":"G","alternative":"C","protein":"p.Lys111Asn","hgvs":"c.333G>C","purpose":null,"function":null,"hasMatchingVariant":"true"},{"variantType":"SNV","geneName":"BRAF","chromosome":"chr7","position":"140453136","identifier":"COSM476","reference":"A","alternative":"T","protein":"p.V600E","hgvs":"c.1799T>A","purpose":"Substitution","function":"missense","hasMatchingVariant":"false"},{"variantType":"SNV","geneName":"BRCA2","chromosome":"chr13","position":"32968850","identifier":".","reference":"C","alternative":"A","protein":"p.Ser3094Ter","hgvs":"c.9281C>A","purpose":null,"function":null,"hasMatchingVariant":"true"},{"variantType":"Indel","geneName":"PTEN","chromosome":"chr10","position":"89717716","identifier":".","reference":"-","alternative":"A","protein":"p.Pro248fs","hgvs":"c.741_742insA","purpose":null,"function":null,"hasMatchingVariant":"false"},{"variantType":"Indels","purpose":"CNV","function":null,"hasMatchingVariant":"true"},{"variantType":"CNV","geneName":"RPS6KB1","chromosome":"chr17","position":null,"identifier":null,"reference":null,"alternative":null,"protein":null,"hgvs":null,"purpose":null,"function":null,"hasMatchingVariant":"true"},{"variantType":"CNV","geneName":"ZNF217","chromosome":"chr20","position":null,"identifier":null,"reference":null,"alternative":null,"protein":null,"hgvs":null,"purpose":null,"function":null,"hasMatchingVariant":"true"},{"variantType":"Fusion","geneName":"ALK","chromosome":null,"position":null,"identifier":"AB374361","reference":null,"alternative":"EML4-ALK.E6aA20","protein":null,"hgvs":"EML4-ALK","purpose":"Fusion","function":null,"hasMatchingVariant":"true"},{"variantType":"Fusion","geneName":"ALK","chromosome":null,"position":null,"identifier":"AB374362","reference":null,"alternative":"EML4-ALK.E6bA20","protein":null,"hgvs":"EML4-ALK","purpose":"Fusion","function":null,"hasMatchingVariant":"true"}];


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
                }
                else{
                    $scope.positiveControlList = [{"variantType":"SNV","geneName":"PIK3CA","chromosome":"chr3","position":"178916946","identifier":"COSM12880","reference":"G","alternative":"C","protein":"p.Lys111Asn","hgvs":"c.333G>C","purpose":null,"function":null,"hasMatchingVariant":"true"},{"variantType":"SNV","geneName":"BRAF","chromosome":"chr7","position":"140453136","identifier":"COSM476","reference":"A","alternative":"T","protein":"p.V600E","hgvs":"c.1799T>A","purpose":"Substitution","function":"missense","hasMatchingVariant":"true"},{"variantType":"SNV","geneName":"BRCA2","chromosome":"chr13","position":"32968850","identifier":".","reference":"C","alternative":"A","protein":"p.Ser3094Ter","hgvs":"c.9281C>A","purpose":null,"function":null,"hasMatchingVariant":"true"},{"variantType":"Indel","geneName":"PTEN","chromosome":"chr10","position":"89717716","identifier":".","reference":"-","alternative":"A","protein":"p.Pro248fs","hgvs":"c.741_742insA","purpose":null,"function":null,"hasMatchingVariant":"false"},{"variantType":"Indels","purpose":"CNV","function":null,"hasMatchingVariant":"false"},{"variantType":"CNV","geneName":"RPS6KB1","chromosome":"chr17","position":null,"identifier":null,"reference":null,"alternative":null,"protein":null,"hgvs":null,"purpose":null,"function":null,"hasMatchingVariant":"true"},{"variantType":"CNV","geneName":"ZNF217","chromosome":"chr20","position":null,"identifier":null,"reference":null,"alternative":null,"protein":null,"hgvs":null,"purpose":null,"function":null,"hasMatchingVariant":"true"},{"variantType":"Fusion","geneName":"ALK","chromosome":null,"position":null,"identifier":"AB374361","reference":null,"alternative":"EML4-ALK.E6aA20","protein":null,"hgvs":"EML4-ALK","purpose":"Fusion","function":null,"hasMatchingVariant":"false"},{"variantType":"Fusion","geneName":"ALK","chromosome":null,"position":null,"identifier":"AB374362","reference":null,"alternative":"EML4-ALK.E6bA20","protein":null,"hgvs":"EML4-ALK","purpose":"Fusion","function":null,"hasMatchingVariant":"true"}];


                    $scope.negativeVariantsList.push({
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
                }

                $scope.positives = 'mocha';

            };

            $scope.openMDAPositives = function() {
                $scope.positives = 'mdacc';

            };

            $scope.openMDAPositives1 = function() {
                $scope.positives = 'mdacc1';

            };

            $scope.openPositives1 = function() {
                $scope.positives = 'mocha1';

            };

            $scope.closePositives = function() {
                $scope.positives = 'undefined';

            };

            $scope.openNegatives = function() {

                $scope.negatives = 'mocha';

            };

            $scope.openMDANegatives = function() {

                $scope.negatives = 'mdacc';

            };

            $scope.openNegatives1 = function() {
                $scope.negatives = 'mocha1';

            };

            $scope.closeNegatives = function() {
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



                aMoiLabels = ['Positive Control Failed', 'Positive Control Success', 'Not Generated'];
                ntcMoiLabels = ['Ntc Control Failed', 'Ntc Control Success', 'Ntc Not Generated'];
                if(site==='mocha') {
                    aMoiValues = [10, 15, 75]; //[4, 10, 14, 6, 10, 16]; //[45, 21, 4, 35, 9, 6];
                    ntcMoiValues = [10, 26, 4]; //[4, 10, 14, 6, 10, 16]; //[45, 21, 4, 35, 9, 6];
                }
                else{
                    aMoiValues = [8, 25, 67];
                    ntcMoiValues = [1, 18, 2];
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
                    }
                    // {
                    //     value: aMoiValues[3],
                    //     color: "#f8ac59",
                    //     highlight: aMoiHighlight,
                    //     label: aMoiLabels[3]
                    // },
                    // {
                    //     value: aMoiValues[4],
                    //     color: "#707070",
                    //     highlight: aMoiHighlight,
                    //     label: aMoiLabels[4]
                    // },
                    // {
                    //     value: aMoiValues[5],
                    //     color: "#cfcfcf",
                    //     highlight: aMoiHighlight,
                    //     label: aMoiLabels[5]
                    // }
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
                        color: "green",
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
                        color: "green",
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

                // svgApi
                //     .getSvgGene('SampleControl_MoCha_2')
                //     .then(function (d) {
                //
                //         alert(JSON.stringify(d.data))

                $window.histogramPlot();
                $window.circosPlot();
                $window.piePlot();
                        // $window.d3BoxVersion5(d.data);

            };

            // $scope.setCanvasHeight = function(elementName, heightVal) {
            //     alert(heightVal)
            //     var ctx = $(elementName)[0].getContext('2d');
            //     ctx.canvas.height = heightVal;
            // }

            $scope.loadSampleBreakups = function() {
                $scope.barlegend = "Weekly Positive Control Status"

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
                            strokeColor: "rgba(220,220,220,0.8)",
                            highlightFill: "#23c6c8", //"rgba(220,220,220,0.75)",
                            highlightStroke: "rgba(220,220,220,1)",
                            segmentShowStroke : false,
                            animateScale : true,
                            data: prepareData
                        }
                    ]
                };

                    armNames = [
                        'Mon.'
                        , 'Tue.'
                        , ' Wed.'
                        , 'Thu.'
                        , 'Fri.'
                        // , 'Protein'
                        // , 'Funk Gene'
                        // , 'Variant Type/Snv'
                        // , 'Variant Type/Id'
                        // , 'Read Depth Snv'
                        // , 'Read Depth Indel'
                        // , 'Transcript Snv'
                        // , 'Transcript Indel'
                    ];
                    armValues = [16, 13, 2, 24, 28];
                    armValues1 = [2, 3, 4, 5, 2];
                    // armValues2 = [10, 0.5, 73, 0, 3];

                    mdaccNames = [
                        'Mon.'
                        , 'Tue.'
                        , ' Wed.'
                        , 'Thu.'
                        , 'Fri.'
                    ];

                mdaccValues = [12, 55, 2, 33, 11];
                mdaccValues1 = [44, 7, 71, 9, 2];
                // mdaccValues = [10, 0.5, 73, 0, 3];

                    // mdaccValues = [1, 8, 3, 8, 1, 1, 9, 1, 1, 31, 28, 12, 31];


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
                            fillColor: 'darkred',
                            strokeColor: 'rgba(151,187,205,1)',
                            pointColor: 'rgba(151,187,205,1)',
                            highlightFill: "#23c6c8", //"rgba(220,220,220,0.75)",
                            highlightStroke: "rgba(220,220,220,1)",
                            data: armValues1
                        }
                        // {
                        //     fillColor: 'orange',
                        //     strokeColor: 'rgba(151,187,205,1)',
                        //     pointColor: 'rgba(151,187,205,1)',
                        //     highlightFill: "#23c6c8", //"rgba(220,220,220,0.75)",
                        //     highlightStroke: "rgba(220,220,220,1)",
                        //     data: armValues2
                        // }
                    ]
                };

                $scope.barDataMDACC = {
                    labels: mdaccNames,
                    datasets: [
                        {
                            label: "Accrual Dataset",
                            fillColor: "Indigo",
                            strokeColor: "rgba(220,220,220,0.8)",
                            highlightFill: "#23c6c8", //"rgba(220,220,220,0.75)",
                            highlightStroke: "rgba(220,220,220,1)",
                            data: mdaccValues
                        },
                        {
                            fillColor: 'darkred',
                            strokeColor: 'rgba(151,187,205,1)',
                            pointColor: 'rgba(151,187,205,1)',
                            highlightFill: "#23c6c8", //"rgba(220,220,220,0.75)",
                            highlightStroke: "rgba(220,220,220,1)",
                            data: mdaccValues1
                        }
                    ]
                };


                // alert(JSON.stringify($scope.barData))

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
