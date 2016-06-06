describe('Controller: Patient Details Controller', function () {

    'use strict'

    function getTestData() {

        var data = {};

        data.patient = {
            patientSequenceNumber: 100065,
            gender: 'Male',
            ethnicity: 'White',
            currentStep: 1,
            status: 'REGISTRATION',
            concordance: 'Yes',
            disease: {
                name: 'Invasive Breast Carcinoma',
                ctepCategory: 'Breast Neoplasm',
                ctepSubCategory: 'Breast Cancer - Invasive<',
                ctepTerm: 'Invasive Breast Carcinoma',
                medDraCode: '1000961'
            },
            treatmentArm: 'EAY131-B',
            assignment: {id: 123, reason: 'The patient arm match on variant indetifier [ABC, EDF]'},
            drugs: ['Aspirin', 'Motrin', 'Vitamin D']
        }

        data.treatmentArms = {};

        data.treatmentArms.noMatchList = [
            {
                treatmentArm: 'EAY131-U',
                treatmentArmVersion: '2015-08-06',
                treatmentArmTitle: 'EAY131-U (2015-08-06)',
                reason: 'The patient contains no matching variant.'
            },
            {
                treatmentArm: 'EAY131-F',
                treatmentArmVersion: '2015-08-06',
                treatmentArmTitle: 'EAY131-U (2015-08-06)',
                reason: 'The patient contains no matching variant.'
            },
            {
                treatmentArm: 'EAY131-F',
                treatmentArmVersion: '2015-08-06',
                treatmentArmTitle: 'EAY131-U (2015-08-06)',
                reason: 'The patient contains no matching variant.'
            },
            {
                treatmentArm: 'EAY131-F',
                treatmentArmVersion: '2015-08-06',
                treatmentArmTitle: 'EAY131-U (2015-08-06)',
                reason: 'The patient contains no matching variant.'
            },
            {
                treatmentArm: 'EAY131-G',
                treatmentArmVersion: '2015-08-06',
                treatmentArmTitle: 'EAY131-U (2015-08-06)',
                reason: 'The patient contains no matching variant.'
            },
            {
                treatmentArm: 'EAY131-H',
                treatmentArmVersion: '2015-08-06',
                treatmentArmTitle: 'EAY131-U (2015-08-06)',
                reason: 'The patient contains no matching variant.'
            },
            {
                treatmentArm: 'EAY131-R',
                treatmentArmVersion: '2015-08-06',
                treatmentArmTitle: 'EAY131-U (2015-08-06)',
                reason: 'The patient contains no matching variant.'
            },
            {
                treatmentArm: 'EAY131-E',
                treatmentArmVersion: '2015-08-06',
                treatmentArmTitle: 'EAY131-U (2015-08-06)',
                reason: 'The patient contains no matching variant.'
            },
            {
                treatmentArm: 'EAY131-A',
                treatmentArmVersion: '2015-08-06',
                treatmentArmTitle: 'EAY131-U (2015-08-06)',
                reason: 'The patient contains no matching variant.'
            },
            {
                treatmentArm: 'EAY131-V',
                treatmentArmVersion: '2015-08-06',
                treatmentArmTitle: 'EAY131-U (2015-08-06)',
                reason: 'The patient contains no matching variant.'
            }
        ];

        data.treatmentArms.recordBasedExclusionList = [
            {
                treatmentArm: 'EAY131-Q',
                treatmentArmVersion: '2015-08-06',
                treatmentArmTitle: 'EAY131-U (2015-08-06)',
                reason: 'The patient excluded from this arm because of invasive breast carcinoma.'
            }
        ];

        data.treatmentArms.selectedList = [
            {
                treatmentArm: 'EAY131-B',
                treatmentArmVersion: '2015-08-06',
                treatmentArmTitle: 'EAY131-U (2015-08-06)',
                reason: 'The patient and treatment match on variand identifier [ABSF, DEDF].'
            }
        ];

        data.timeline = [
            {
                type: 'assignment',
                dateTime: 'Sep 17, 2015, 10:00 AM GMT',
                fromNow: '12 days ago',
                status: 'Pending',
                biopsySequenceNumber: 'B-987456',
                molecularSequenceNumber: 'MSN-1245',
                analysisId: 'A-T-5678'
            },
            {
                type: 'biopsy.pathology',
                dateTime: 'Sep 17, 2015, 10:00 AM GMT',
                fromNow: '2 days ago',
                status: 'Confirmed',
                comment: 'Agreement on pathology'
            },
            {
                type: 'biopsy.variantReport',
                dateTime: 'Sep 17, 2015, 10:00 AM GMT',
                fromNow: '4 hours ago',
                status: 'Pending',
                molecularSequenceNumber: 'MSN-1245',
                analysisId: 'A-T-5678',
                location: 'MGH',
                totalMoiCount: 1,
                totalAmoiCount: 0
            },
            {
                type: 'biopsy.assay',
                dateTime: 'Sep 17, 2015, 10:00 AM GMT',
                fromNow: '2 hours ago',
                gene: 'MLH1',
                status: 'Ordered',
                biopsySequenceNumber: 'B-987456',
                trackingNumber: 'ZT2329875234985'
            },
            {
                type: 'patient',
                dateTime: 'Sep 17, 2015, 10:00 AM GMT',
                fromNow: '14 days ago',
                status: 'Registration',
                location: 'MGH',
                step: '2.0'
            },
            {
                type: 'user',
                dateTime: '10:00 AM GMT',
                fromNow: '20 says ago',
                status: 'upload.patientdocument',
                user: 'Rick',
                details: 'File "Biopsy Result" uploaded',
                fileUrl: 'http://blah.com/biopsy_result_1234.dat'
            },
            {
                type: 'system',
                dateTime: 'Sep 17, 2015, 10:00 AM GMT',
                fromNow: '2 says ago',
                status: 'Error',
                details: 'Unable to process patient biopsy message. Please contact techincal support.'
            }
        ];

        data.assayHistory = [
            {
                gene: 'PTEN',
                orderedDate: 'Sep 14, 2015, 4:07 PM GMT',
                resultDate: 'Sep 15, 2015, 7:47 PM GMT',
                result: 'POSITIVE'
            },
            {
                gene: 'MLH1',
                orderedDate: 'Sep 14, 2015, 4:07 PM GMT',
                resultDate: 'Sep 15, 2015, 7:47 PM GMT',
                result: 'POSITIVE'
            },
            {
                gene: 'MSH2',
                orderedDate: 'Sep 14, 2015, 4:07 PM GMT',
                resultDate: 'Sep 15, 2015, 7:47 PM GMT',
                result: 'POSITIVE'
            },
            {
                gene: 'RB',
                orderedDate: 'Sep 14, 2015, 4:07 PM GMT',
                resultDate: 'Sep 15, 2015, 7:47 PM GMT',
                result: 'NEGATIVE'
            }
        ];

        data.sendouts = [
            {
                msn: 'MSN1234',
                trackingNumber: '456745758776',
                destinationDate: 'Sep 14, 2015, 4:07 PM GMT',
                dnaConcordance: 11.2,
                dnaVolume: 10,
                reportedDate: 'Sep 15, 2015, 6:07 PM GMT',
                comments: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
                analyses: [
                    {
                        analysisId: 'MSN1234_v1_23453...jher4',
                        status: 'Confirmed',
                        fileReceivedDate: 'Sep 17, 2015, 2:07 PM GMT',
                        confirmedRejectedDateLabel: 'Confirmed Date',
                        confirmedRejectedDate: 'Sep 19, 2015, 8:10 PM GMT'
                    },
                    {
                        analysisId: 'MSN1234_v2_2rer53...yher4',
                        status: 'Rejected',
                        fileReceivedDate: 'Sep 17, 2015, 2:07 PM GMT',
                        confirmedRejectedDateLabel: 'Rejected Date',
                        confirmedRejectedDate: 'Sep 19, 2015, 8:10 PM GMT'
                    }
                ]
            },
            {
                msn: 'MSN5678',
                trackingNumber: '675867856677',
                destinationDate: 'Sep 16, 2015, 7:37 PM GMT',
                dnaConcordance: 10.2,
                dnaVolume: 9,
                reportedDate: 'Sep 17, 2015, 10:00 AM GMT',
                analyses: [
                    {
                        analysisId: 'MSN5678_v1_676...tyyrt4',
                        status: 'Rejected',
                        fileReceivedDate: 'Sep 18, 2015, 1:08 PM GMT',
                        confirmedRejectedDateLabel: 'Rejected Date',
                        confirmedRejectedDate: 'Sep 20, 2015, 2:10 PM GMT'
                    }
                ]
            }
        ];

        data.currentSendout = data.sendouts[data.sendouts.length - 1];
        data.currentSendout.currentAnalisys = data.currentSendout.analyses[data.currentSendout.analyses.length - 1];

        data.biopsyReport = {text: 'T-15-000078', value: 'Version1'};

        data.biopsyReports = [
            {text: 'T-15-000078', value: 'Version1'},
            {text: 'T-15-000079', value: 'Version2'},
            {text: 'T-15-000082', value: 'Version3'}
        ];

        data.biopsy = {
            specimen: {
                collectionDate: 'August 26, 2015 2:57 PM GMT',
                receivedDate: 'August 26, 2015 2:57 PM GMT',
                failureDate: '-'
            },
            pathology: {status: 'Agreement on pathology', receivedDate: 'August 26, 2015 2:57 PM GMT', comment: '-'},

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
                    comment: 'Wrong sample',
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
                {title: 'Total Number of aMOIs', count: 3},
                {title: 'Total Number of MOIs', count: 3},
                {title: 'Total Number of confirmed aMOIs', count: 3},
                {title: 'Total Number of confirmed MOIs', count: 3}
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
                confirmedRejectedDateLabel: 'Confirmed Date',
                confirmedRejectedDate: 'Sep 30, 2015 10:00 PM GMT',
                status: 'PENDING'
            },
            tumorTissueNormal: {
                molecularSequenceNumber: 'MSN12345',
                biopsySequenceNumber: 'T-15-000078',
                totalVariants: 3,
                cellularity: 1,
                analysisId: 'MSN12345_V1_kdjf3893_ksjd_34iu34sf',
                fileReceivedDate: 'Sep 29, 2015 9:00 PM GMT',
                confirmedRejectedDateLabel: 'Confirmed Date',
                confirmedRejectedDate: 'Sep 30, 2015 10:00 PM GMT',
                status: 'PENDING',
                showActions: true
            },
            bloodQc: {
                molecularSequenceNumber: 'MSN67890',
                biopsySequenceNumber: 'T-15-000044',
                totalVariants: 3,
                cellularity: 1.1,
                analysisId: 'MSN67890_Ve_kErerj8893_ksjd_34iu34sf',
                fileReceivedDate: 'Oct 1, 2015 9:00 PM GMT'
            },
            bloodNormal: {
                molecularSequenceNumber: 'MSN67890',
                biopsySequenceNumber: 'T-15-000044',
                totalVariants: 3,
                cellularity: 1.1,
                analysisId: 'MSN67890_Ve_kErerj8893_ksjd_34iu34sf',
                fileReceivedDate: 'Oct 1, 2015 9:00 PM GMT'
            }
        };

        data.variantReportOptions = [
            {text: 'MSN-000078', value: 'Msn1'},
            {text: 'MSN-000079', value: 'Msn2'},
            {text: 'MSN-000082', value: 'Msn3'}
        ];

        data.variantReportOption = {text: 'MSN-000078', value: 'Msn1'};

        data.assignmentReport = {
            generatedDate: 'Sep 29, 2015 9:00 PM GMT',
            confirmedDate: 'Sep 30, 2015 10:00 PM GMT',
            sentToCogDate: '-',
            receivedFromCogDate: '-',
            biopsySequenceNumber: 'T-15-000078',
            molecularSequenceNumber: 'MSN34534',
            analysisId: 'MSN34534_v2_kjdf3-kejrt-3425-mnb34ert34f',
            variantReportaMOIs: [
                {title: '[COSM12344]', url: ''},
                {title: 'p.S310Y', url: ''},
                {title: 'CISM23423', url: ''}
            ],

            assays: [
                {gene: 'MSH2', result: 'Not Applicable', comment: 'Biopsy received prior to bimarker launch date'},
                {gene: 'PTENs', result: 'POSITIVE', comment: '-'},
                {gene: 'MLH1', result: 'Not Applicable', comment: 'Biopsy received prior to bimarker launch date'},
                {gene: 'RB', result: 'Not Applicable', comment: 'Biopsy received prior to bimarker launch date'}
            ]
        };

        data.patientDocuments = [
            {name: 'Document 1', uploadedDate: 'Oct 2, 1956 10:00 PM GMT', user: 'James Bond'},
            {name: 'Document 2', uploadedDate: 'Aug 5, 1967 10:00 PM GMT', user: 'James Bond'},
            {name: 'X-File A23FSD34', uploadedDate: 'Jan 1, 1996 10:00 PM GMT', user: 'Fox Mulder'}
        ];


        data.confirmTitle = 'Confirmation Changed';
        data.confirmMessage = 'Please enter a reason:';
        data.biopsySampleLabel = 'Latest';

        return data;
    }

    beforeEach(module(
        'config.matchbox',
        'patient.matchbox',
        'http.matchbox',
        'ui.bootstrap',
        'cgPrompt'));

    var $scope;
    var matchApiMock;
    var ctrl;
    var $stateParams;
    var $log;
    var $q;
    var testData = getTestData();
    var deferred;
    var prompt;
    //
    // beforeEach(function() {
    //     module(function($provide) {
    //         $provide.value('$scope', {
    //             showPrompt: function() {
    //                 return {
    //                     then: function(callback) {
    //                         return callback(data);
    //                     }
    //                 }
    //             }
    //         });
    //     });
    // });

    beforeEach(inject(function (_$rootScope_, _$controller_, _matchApiMock_, _$log_, _$q_, _prompt_) {
        deferred = _$q_.defer();
        $stateParams = {patientSequenceNumber: 100065};
        $log = _$log_;
        $q = _$q_;
        matchApiMock = _matchApiMock_;
        $scope = _$rootScope_.$new();
        prompt = _prompt_;

        ctrl = _$controller_('PatientController', {
            $scope: $scope,
            DTOptionsBuilder: {
                newOptions: function () {
                    return {
                        withDisplayLength: function (length) {
                            return 100;
                        }
                    };
                }
            },
            matchApiMock: matchApiMock,
            $stateParams: $stateParams,
            $log: $log,
            prompt: prompt,
            $uibModal: null
        });

        deferred.resolve(testData);
        spyOn(_matchApiMock_, 'loadPatient').and.returnValue(deferred.promise);
        $scope.loadPatientData();
        $scope.$apply(); // This forces Angular to resolve promises
    }));

    describe('General', function () {
        it('should call api load method', function () {
            expect(matchApiMock.loadPatient).toHaveBeenCalled();
        });

        it('should have dtOptions defined', function () {
            expect(ctrl.dtOptions).toBeDefined();
        });

        it('should call warning dialog and log when user agreed', function () {
            deferred.resolve(true);

            spyOn($scope, 'showPrompt').and.returnValue(deferred.promise).and.callThrough();

            $scope.showWarning('Test Title', 'Test Message');
            $scope.$apply();

            //expect($scope.showPrompt).toHaveBeenCalled();
            //expect($scope.warningResult).toBe(true);
        });

        it('should call warning dialog and log when user disagreed', function () {
            var testValue = 'User Agreed';
            deferred.resolve(testValue);
            spyOn($scope, 'showPrompt').and.returnValue(deferred.promise).and.callThrough();
            $scope.showWarning('Test Title', 'Test Message');
            $scope.$apply();
            expect($scope.warningResult).toBe(false);
        });
    });

    describe('Header', function () {
        it('should have correct Patient Id', function () {
            expect($scope.patient.patientSequenceNumber).toBe(100065);
        });

        it('should have correct confirmation dialog params', function () {
            expect($scope.confirmTitle).toBe('Confirmation Changed');
            expect($scope.confirmMessage).toBe('Please enter a reason:');
        });
    });

    describe('Summary Tab', function () {
        it('should have timeline items', function () {
            expect($scope.timeline).toBeDefined();
            expect($scope.timeline.length).toBeGreaterThan(0);
        });
    });

    describe('Biopsy Tab', function () {
        it('should not change report type when the same value is supplied', function () {
            var previousValue = $scope.variantReportType;
            $scope.setVariantReportType(previousValue);
            expect($scope.variantReportType).toEqual(previousValue);
            expect($scope.getVariantReportTypeClass(previousValue)).toEqual('active');
        });

        it('should not change report type to a different value', function () {
            var previousValue = $scope.variantReportType;
            var newValue = 'blood';
            $scope.setVariantReportType(newValue);
            expect($scope.variantReportType).toEqual(newValue);
            expect($scope.getVariantReportTypeClass(previousValue)).toEqual('');
        });

        it('should not change report mode when the same value is supplied', function () {
            var previousValue = $scope.variantReportMode;
            $scope.setVariantReportMode(previousValue);
            expect($scope.variantReportMode).toEqual(previousValue);
            expect($scope.getVariantReportModeClass(previousValue)).toEqual('active');
        });

        it('should not change report mode to a different value', function () {
            var previousValue = $scope.variantReportMode;
            var newValue = 'qc';
            $scope.setVariantReportMode(newValue);
            expect($scope.variantReportMode).toEqual(newValue);
            expect($scope.getVariantReportModeClass(previousValue)).toEqual('');
        });
    });

    describe('Variant Report Tab', function () {

    });

    describe('Assignment Report Tab', function () {

    });

    describe('Documents Tab', function () {

    });

});