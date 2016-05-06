(function() {

    angular.module('patient.matchbox', [])
        .controller('PatientController', PatientController);

    function PatientController($scope,
        DTOptionsBuilder,
        DTColumnDefBuilder,
        matchApiMock,
        $stateParams,
        $log,
        prompt) {

        this.dtOptions = DTOptionsBuilder.newOptions()
            .withDisplayLength(100);

        $scope.patientSequenceNumber = '';

        $scope.files = [];

        $scope.patient = {};
        $scope.treatmentArms = {
            noMatchList: [],
            recordBasedExclusionList: [],
            selectedList: []
        };

        $scope.setVariantReportType = setVariantReportType;
        $scope.setVariantReportMode = setVariantReportMode;
        $scope.getVariantReportTypeClass = getVariantReportTypeClass;
        $scope.getVariantReportModeClass = getVariantReportModeClass;
        $scope.confirm = confirm;
        $scope.doConfirm = doConfirm;

        $scope.loadPatientData = loadPatientData;

        function setVariantReportType(reportType) {
            if ($scope.variantReportType === reportType) {
                return;
            }

            $scope.variantReportType = reportType;
            setVariantReport();
        }

        function setVariantReportMode(reportMode) {
            if ($scope.variantReportMode === reportMode) {
                return;
            }

            $scope.variantReportMode = reportMode;
            setVariantReport();
        }

        function getVariantReportTypeClass(reportType) {
            return $scope.variantReportType === reportType ? 'btn-success' : 'btn-default';
        }

        function getVariantReportModeClass(reportMode) {
            return $scope.variantReportMode === reportMode ? 'btn-success' : 'btn-default';
        }

        function setVariantReport() {
            $scope.variantReport = $scope.variantReports[$scope.variantReportType + '' + $scope.variantReportMode];
        }

        function loadPatientData() {
            matchApiMock
                .getPatientDetailsData($stateParams.patientSequenceNumber)
                .then(function (d) {
                    $scope.patientSequenceNumber = $stateParams.patientSequenceNumber;
                    $scope.patient = d;

                    $scope.treatmentArms.noMatchList = [
                        { treatmentArm: 'EAY131-U', treatmentArmVersion: '2015-08-06', treatmentArmTitle: 'EAY131-U (2015-08-06)', reason: 'The patient contains no matching variant.' },
                        { treatmentArm: 'EAY131-F', treatmentArmVersion: '2015-08-06', treatmentArmTitle: 'EAY131-U (2015-08-06)', reason: 'The patient contains no matching variant.' },
                        { treatmentArm: 'EAY131-F', treatmentArmVersion: '2015-08-06', treatmentArmTitle: 'EAY131-U (2015-08-06)', reason: 'The patient contains no matching variant.' },
                        { treatmentArm: 'EAY131-F', treatmentArmVersion: '2015-08-06', treatmentArmTitle: 'EAY131-U (2015-08-06)', reason: 'The patient contains no matching variant.' },
                        { treatmentArm: 'EAY131-G', treatmentArmVersion: '2015-08-06', treatmentArmTitle: 'EAY131-U (2015-08-06)', reason: 'The patient contains no matching variant.' },
                        { treatmentArm: 'EAY131-H', treatmentArmVersion: '2015-08-06', treatmentArmTitle: 'EAY131-U (2015-08-06)', reason: 'The patient contains no matching variant.' },
                        { treatmentArm: 'EAY131-R', treatmentArmVersion: '2015-08-06', treatmentArmTitle: 'EAY131-U (2015-08-06)', reason: 'The patient contains no matching variant.' },
                        { treatmentArm: 'EAY131-E', treatmentArmVersion: '2015-08-06', treatmentArmTitle: 'EAY131-U (2015-08-06)', reason: 'The patient contains no matching variant.' },
                        { treatmentArm: 'EAY131-A', treatmentArmVersion: '2015-08-06', treatmentArmTitle: 'EAY131-U (2015-08-06)', reason: 'The patient contains no matching variant.' },
                        { treatmentArm: 'EAY131-V', treatmentArmVersion: '2015-08-06', treatmentArmTitle: 'EAY131-U (2015-08-06)', reason: 'The patient contains no matching variant.' }
                    ];

                    $scope.treatmentArms.recordBasedExclusionList = [
                        { treatmentArm: 'EAY131-Q', treatmentArmVersion: '2015-08-06', treatmentArmTitle: 'EAY131-U (2015-08-06)', reason: 'The patient excluded from this arm because of invasive breast carcinoma.' }
                    ];

                    $scope.treatmentArms.selectedList = [
                        { treatmentArm: 'EAY131-B', treatmentArmVersion: '2015-08-06', treatmentArmTitle: 'EAY131-U (2015-08-06)', reason: 'The patient and treatment match on variand identifier [ABSF, DEDF].' }
                    ];

                    $scope.timeline = [
                        { dateTime: '6:00 am', timeLineType: 'analysisReceived', analysis: { msn: 'MSN1234_v1...345', status: 'CONFIRMED' } },
                        { dateTime: 'Sep 1 2015', timeLineType: 'nucleicAcidSendout', sendout: { msn: 'MSN1234', trackingNumber: '978345698734554' } },
                        { dateTime: 'Sep 11 2015', timeLineType: 'specimentReceived', specimen: {} },
                        { dateTime: 'Sep 11 2015', timeLineType: 'patientRegistration', patientRegistration: {} }
                    ];

                    $scope.assayHistory = [
                        { gene: 'PTEN', orderedDate: 'Sep 14, 2015, 4:07 PM GMT', resultDate: 'Sep 15, 2015, 7:47 PM GMT', result: 'POSITIVE' },
                        { gene: 'MLH1', orderedDate: 'Sep 14, 2015, 4:07 PM GMT', resultDate: 'Sep 15, 2015, 7:47 PM GMT', result: 'POSITIVE' },
                        { gene: 'MSCH2', orderedDate: 'Sep 14, 2015, 4:07 PM GMT', resultDate: 'Sep 15, 2015, 7:47 PM GMT', result: 'POSITIVE' },
                        { gene: 'RB', orderedDate: 'Sep 14, 2015, 4:07 PM GMT', resultDate: 'Sep 15, 2015, 7:47 PM GMT', result: 'NEGATIVE' }
                    ];

                    $scope.sendouts = [
                        {
                            msn: 'MSN1234', trackingNumber: '456745758776', destinationDate: 'Sep 14, 2015, 4:07 PM GMT', dnaConcordance: 11.2, dnaVolume: 10, reportedDate: 'Sep 15, 2015, 6:07 PM GMT', comments: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
                            analyses: [
                                { analysisId: 'MSN1234_v1_23453...jher4', status: 'Confirmed', fileReceivedDate: 'Sep 17, 2015, 2:07 PM GMT', confirmedRejectedDateLabel: 'Confirmed Date', confirmedRejectedDate: 'Sep 19, 2015, 8:10 PM GMT' },
                                { analysisId: 'MSN1234_v2_2rer53...yher4', status: 'Rejected', fileReceivedDate: 'Sep 17, 2015, 2:07 PM GMT', confirmedRejectedDateLabel: 'Rejected Date', confirmedRejectedDate: 'Sep 19, 2015, 8:10 PM GMT' }
                            ]
                        },
                        {
                            msn: 'MSN5678', trackingNumber: '675867856677', destinationDate: 'Sep 16, 2015, 7:37 PM GMT', dnaConcordance: 10.2, dnaVolume: 9, reportedDate: 'Sep 17, 2015, 10:00 AM GMT',
                            analyses: [
                                { analysisId: 'MSN5678_v1_676...tyyrt4', status: 'Rejected', fileReceivedDate: 'Sep 18, 2015, 1:08 PM GMT', confirmedRejectedDateLabel: 'Rejected Date', confirmedRejectedDate: 'Sep 20, 2015, 2:10 PM GMT' }
                            ]
                        }
                    ];

                    $scope.biopsy = {
                        singleNucleitideVariants: [
                            {
                                confirm: true,
                                id: 'COSM123',
                                aMOI: 'CURRENT',
                                chrom: 'chr3',
                                position: '1234234',
                                reference: 'A',
                                alternative: 'C',
                                alleleFreq: '0.0344',
                                funcGene: 'PIK3CA',
                                oncomineVariantClass: 'Hotspot',
                                exon: '10',
                                funct: 'missense',
                                hGVS: 'c.234534>C',
                                readDepth: '648',
                                transcript: 'NM_0456345',
                                protein: 'p.Glu6565Ala'
                            },
                            {
                                confirm: true,
                                id: 'COSM4454',
                                aMOI: 'CURRENT',
                                chrom: 'chr26',
                                position: '767867',
                                reference: 'C',
                                alternative: 'A',
                                alleleFreq: '0.0676',
                                funcGene: 'PIK3CA',
                                oncomineVariantClass: 'Hotspot',
                                exon: '8',
                                funct: 'missense',
                                hGVS: 'c.567>C',
                                readDepth: '1233',
                                transcript: 'NM_098434',
                                protein: 'p.Ser6565Tyr'
                            },
                            {
                                confirm: false,
                                id: 'COS67878',
                                aMOI: 'CURRENT',
                                chrom: 'chr5',
                                position: '1234234',
                                reference: 'A',
                                alternative: 'C',
                                alleleFreq: '0.0344',
                                funcGene: 'PIK3CA',
                                oncomineVariantClass: 'Hotspot',
                                exon: '10',
                                funct: 'missense',
                                hGVS: 'c.234534>C',
                                readDepth: '648',
                                transcript: 'NM_0456345',
                                protein: 'p.Glu6565Ala'
                            }
                        ],
                        indels: [
                            {
                                confirm: true,
                                id: 'COSM123',
                                aMOI: 'CURRENT',
                                chrom: 'chr3',
                                position: '1234234',
                                reference: 'A',
                                alternative: 'C',
                                alleleFreq: '0.0344',
                                funcGene: 'PIK3CA',
                                oncomineVariantClass: 'Hotspot',
                                exon: '10',
                                funct: 'missense',
                                hGVS: 'c.234534>C',
                                readDepth: '648',
                                transcript: 'NM_0456345',
                                protein: 'p.Glu6565Ala'
                            }
                        ],
                        copyNumberVariants: [],
                        geneFusions: [],
                        moiSummary: [
                            { title: 'Total Number of aMOIs', count: 3 },
                            { title: 'Total Number of MOIs', count: 3 },
                            { title: 'Total Number of confirmed aMOIs', count: 3 },
                            { title: 'Total Number of confirmed MOIs', count: 3 }
                        ]
                    }

                    $scope.variantReports = {
                        tumorTissueQc: {
                            molecularSequenceNumber: 'MSN12345',
                            biopsySequenceNumber: 'T-15-000078',
                            totalVariants: 3,
                            cellularity: 1,
                            analysisId: 'MSN12345_V1_kdjf3893_ksjd_34iu34sf',
                            fileReceivedDate: 'Sep 29, 2015 9:00 PM GMT',
                            receivedRejectedDate: 'Sep 30, 2015 10:00 PM GMT',
                            status: 'PENDING'
                        },
                        tumorTissueNormal: {
                            molecularSequenceNumber: 'MSN12345',
                            biopsySequenceNumber: 'T-15-000078',
                            totalVariants: 3,
                            cellularity: 1,
                            analysisId: 'MSN12345_V1_kdjf3893_ksjd_34iu34sf',
                            fileReceivedDate: 'Sep 29, 2015 9:00 PM GMT',
                            receivedRejectedDate: 'Sep 30, 2015 10:00 PM GMT',
                            status: 'PENDING',
                            showActions: true
                        },
                        bloodQc: {
                            molecularSequenceNumber: 'MSN67890',
                            biopsySequenceNumber: 'T-15-000044',
                            totalVariants: 3,
                            cellularity: 1.1,
                            analysisId: 'MSN67890_Ve_kErerj8893_ksjd_34iu34sf',
                            fileReceivedDate: 'Oct 1, 2015 9:00 PM GMT',
                            receivedRejectedDate: 'Oct 2, 2015 10:00 PM GMT',
                            status: 'REJECTED'
                        },
                        bloodNormal: {
                            molecularSequenceNumber: 'MSN67890',
                            biopsySequenceNumber: 'T-15-000044',
                            totalVariants: 3,
                            cellularity: 1.1,
                            analysisId: 'MSN67890_Ve_kErerj8893_ksjd_34iu34sf',
                            fileReceivedDate: 'Oct 1, 2015 9:00 PM GMT',
                            receivedRejectedDate: 'Oct 2, 2015 10:00 PM GMT',
                            status: 'REJECTED'
                        }
                    };

                    $scope.assignmentReport = {
                        assays: [
                            { gene: 'MSH2', result: 'Not Applicable', comment: 'Biopsy received prior to bimarker launch date' },
                            { gene: 'PTENs', result: 'POSITIVE', comment: '-' },
                            { gene: 'MLH1', result: 'Not Applicable', comment: 'Biopsy received prior to bimarker launch date' },
                            { gene: 'RB', result: 'Not Applicable', comment: 'Biopsy received prior to bimarker launch date' }
                        ]
                    };
                })
                .then(function () {
                    $scope.variantReportType = 'tumorTissue';
                    $scope.variantReportMode = 'Normal';
                    setVariantReport();
                });
        }
        
        function doConfirm() {
            $log.debug('doConfirm');
        }
        
        function confirm(index, list, propertyName) {
            var item = list[index];
            
            if (typeof item !== 'object' || !item)
                return;
            
            if (!(propertyName in item))
                return;
            
            var previousValue = !!item[propertyName];
            $log.debug('previousValue: ' + previousValue);
            
            function success(name) {
                $log.debug('Confirmed: ' + name);
                $log.debug('item[propertyName] before: ' + item[propertyName]);
                item[propertyName] = !previousValue;
                $log.debug('item[propertyName] after: ' + item[propertyName]);
                $scope.$apply();
            }
            
            function failure() {
                $log.debug('Rejected');
                $log.debug('item[propertyName] before: ' + item[propertyName]);
                item[propertyName] = previousValue;
                $log.debug('item[propertyName] after: ' + item[propertyName]);
                $scope.$apply();
            }
            
            //ask the user for a string
            prompt({
                title: 'Confirmation Changed',
                message: 'Please enter a reson for removing the confirmation:',
                input: true
                //label: 'Reason',
                // value: 'Current name',
                // values: ['other', 'possible', 'names']
            }).then(success, failure);
        }
    }

}());
