(function () {

    angular.module('http.matchbox', [])
        .factory('matchApiMock', function ($http, matchConfig, $q, $log) {
            return {
                getPatientDetailsData: function (patientSequenceNumberParam) {
                    $log.debug('Loading Patient ' + patientSequenceNumberParam);

                    var deferred = $q.defer();

                    var data = {};
                    
                    data.patient = {
                        patientSequenceNumber: 100065,
                        gender: 'Male',
                        ethnicity: 'White',
                        currentStep: 1,
                        status: 'REGISTRATION',
                        concordance: 'Yes',
                        diseases: [
                            { name: 'Invasive breast cancer', medDraCode: 1000961 }
                        ],
                        treatmentArm: 'EAY131-B',
                        assignment: { id: 123, reason: 'The patient arm match on variant indetifier [ABC, EDF]' },
                        drugs: ['Drug 1', 'Drug 2', 'Drug 3'],
                        documents: [
                            { url: 'url1', title: 'Document 1' },
                            { url: 'url2', title: 'Document 2' },
                            { url: 'url3', title: 'Document 3' }
                        ],
                        steps: [
                            {
                                stepNumber: 0,
                                subSteps: [
                                    {
                                        status: 'REGISTRATION',
                                        treatmentArm: 'EAY131-B',
                                        variantReport: 'reportLink',
                                        assignmentReport: 'reportLink',
                                        statusDate: 'Sep 29, 2015, 9:00 PM'
                                    },
                                    {
                                        status: 'PENDING APPROVAL',
                                        treatmentArm: 'EAY131-B',
                                        variantReport: 'reportLink',
                                        assignmentReport: 'reportLink',
                                        statusDate: 'Sep 30, 2015, 9:00 PM'
                                    },
                                    {
                                        status: 'ON_TREATMENT_ARM',
                                        treatmentArm: 'EAY131-B',
                                        variantReport: 'reportLink',
                                        assignmentReport: 'reportLink',
                                        statusDate: 'Oct 1, 2015, 9:00 PM'
                                    }
                                ]
                            }
                        ]
                    }

                    data.treatmentArms={};
                    
                    data.treatmentArms.noMatchList = [
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

                    data.treatmentArms.recordBasedExclusionList = [
                        { treatmentArm: 'EAY131-Q', treatmentArmVersion: '2015-08-06', treatmentArmTitle: 'EAY131-U (2015-08-06)', reason: 'The patient excluded from this arm because of invasive breast carcinoma.' }
                    ];

                    data.treatmentArms.selectedList = [
                        { treatmentArm: 'EAY131-B', treatmentArmVersion: '2015-08-06', treatmentArmTitle: 'EAY131-U (2015-08-06)', reason: 'The patient and treatment match on variand identifier [ABSF, DEDF].' }
                    ];

                    data.timeline = [
                        { dateTime: '6:00 am', timeLineType: 'analysisReceived', analysis: { msn: 'MSN1234_v1...345', status: 'CONFIRMED' } },
                        { dateTime: 'Sep 1 2015', timeLineType: 'nucleicAcidSendout', sendout: { msn: 'MSN1234', trackingNumber: '978345698734554' } },
                        { dateTime: 'Sep 11 2015', timeLineType: 'specimentReceived', specimen: {} },
                        { dateTime: 'Sep 11 2015', timeLineType: 'patientRegistration', patientRegistration: {} }
                    ];

                    data.assayHistory = [
                        { gene: 'PTEN', orderedDate: 'Sep 14, 2015, 4:07 PM GMT', resultDate: 'Sep 15, 2015, 7:47 PM GMT', result: 'POSITIVE' },
                        { gene: 'MLH1', orderedDate: 'Sep 14, 2015, 4:07 PM GMT', resultDate: 'Sep 15, 2015, 7:47 PM GMT', result: 'POSITIVE' },
                        { gene: 'MSCH2', orderedDate: 'Sep 14, 2015, 4:07 PM GMT', resultDate: 'Sep 15, 2015, 7:47 PM GMT', result: 'POSITIVE' },
                        { gene: 'RB', orderedDate: 'Sep 14, 2015, 4:07 PM GMT', resultDate: 'Sep 15, 2015, 7:47 PM GMT', result: 'NEGATIVE' }
                    ];

                    data.sendouts = [
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

                    data.biopsy = {
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

                    data.variantReports = {
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

                    data.variantReportOptions = [
                        { text: 'MSN-000078', value: 'Msn1' },
                        { text: 'MSN-000079', value: 'Msn2' },
                        { text: 'MSN-000082', value: 'Msn3' }
                    ];

                    data.variantReportOption = { text: 'MSN-000078', value: 'Msn1' };

                    data.assignmentReport = {
                        assays: [
                            { gene: 'MSH2', result: 'Not Applicable', comment: 'Biopsy received prior to bimarker launch date' },
                            { gene: 'PTENs', result: 'POSITIVE', comment: '-' },
                            { gene: 'MLH1', result: 'Not Applicable', comment: 'Biopsy received prior to bimarker launch date' },
                            { gene: 'RB', result: 'Not Applicable', comment: 'Biopsy received prior to bimarker launch date' }
                        ]
                    };

                    data.biopsyReport = { text: 'T-15-000078', value: 'Version1' };

                    data.biopsyReports = [
                        { text: 'T-15-000078', value: 'Version1' },
                        { text: 'T-15-000079', value: 'Version2' },
                        { text: 'T-15-000082', value: 'Version3' }
                    ];

                    deferred.resolve(data);
                    return deferred.promise;
                },
                getPatientListData: function (psn) {
                    var deferred = $q.defer();

                    var data = [
                        {
                            patientSequenceNumber: 100065,
                            gender: 'Male',
                            ethnicity: 'White',
                            status: 'REGISTRATION',
                            treatmentArm: 'EAY131-A',
                            step: 0,
                            registrationDate: 1441165873572,
                            diseases: 'Disease 1'
                        },
                        {
                            patientSequenceNumber: 100087,
                            gender: 'Female',
                            ethnicity: 'White',
                            status: 'PENDING',
                            treatmentArm: 'EAY131-B',
                            step: 1,
                            registrationDate: 1430165873572,
                            diseases: 'Disease 3'
                        },
                        {
                            patientSequenceNumber: 100099,
                            gender: 'Male',
                            ethnicity: 'Hispanic',
                            status: 'ON_TREATMENT_ARM',
                            treatmentArm: 'EAY131-C',
                            step: 2,
                            registrationDate: 1440765873572,
                            offTrialDate: 1440165878572,
                            diseases: 'Disease 3'
                        }
                    ];

                    deferred.resolve(data);
                    return deferred.promise;
                }
            };
        });
} ());
