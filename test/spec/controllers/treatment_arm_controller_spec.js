
describe('Controller: Treatment Arm Controller', function () {

    beforeEach(module('config.matchbox', 'http.matchbox', 'treatment-arm.matchbox', 'angular-flot'));

    var treatmentArmCtrl,
        window,
        httpBackend,
        scope,
        stateParams;

    beforeEach(inject(function ($controller,
                                $rootScope,
                                _treatmentArmApi_,
                                $httpBackend,
                                $window,
                                _$compile_,
                                $document) {
        scope = $rootScope.$new();
        httpBackend = $httpBackend;
        window = $window;
        compile = _$compile_;
        document = $document;


        treatmentArmCtrl = $controller('TreatmentArmController', {
            $scope: scope,
            $window: window,
            DTOptionsBuilder: {
                newOptions: function () {
                    return {
                        withOption: function (paging) {},
                        withOption: function (info) {}
                    };
                }
            },
            DTColumnDefBuilder: null,
            treatmentArmApi: _treatmentArmApi_
        });
    }));

    function getElement() {
        var element = angular.element("<div id='diseasePieChartContainer' style='height:300px'></div>");
        compile(element)(scope);
        document.body.appendChild(element[0]);

        return element;
    }

    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it('should handle a data null response', function() {
        httpBackend.when('GET', 'http://server:80/treatmentarmapi/treatmentArms/EAY131-A')
            .respond([
                {
                    "data": null
                }
            ]);
        getElement();
        scope.loadTreatmentArmDetails('EAY131-A');
        httpBackend.flush();

        expect(scope.test).toBe('test');
    });

    it('should handle an undefined variant report', function() {
        httpBackend.when('GET', 'http://server:80/treatmentarmapi/treatmentArms/EAY131-A')
            .respond([
                {
                    "data": {
                        name: 'EAY131-A',
                        treatment_arm_status: 'OPEN',
                        exclusion_drugs: [
                            {
                                drugs: [
                                    {drug_id: "750691", name: "Afatinib"}
                                ]
                            },
                            {
                                drugs:
                                    [
                                        {drug_id: "781254", name: "Erlotinib"}
                                    ]
                            }
                        ],
                        exclusion_diseases: [
                            {
                                ctep_category: "Non-Small Cell Lung Cancer",
                                medra_code: "10058354",
                                short_name: "Bronchioloalveolar carcinoma"
                            }
                        ]
                    }
                }
            ]);

        scope.loadTreatmentArmDetails('EAY131-A');
        httpBackend.flush();

        expect(scope.test).toBe('test');
    });

    it('should populate the treatment details success response', function() {
        httpBackend.when('GET', 'http://server:80/treatmentarmapi/treatmentArms/EAY131-A')
            .respond([ {
                    name: 'EAY131-A',
                    treatment_arm_status: 'OPEN',
                    exclusion_drugs: [
                        {
                            drugs: [
                                {drug_id: "750691", name: "Afatinib"}
                            ]
                        },
                        {
                            drugs:
                                [
                                    {drug_id: "781254", name: "Erlotinib"}
                                ]
                        }
                    ],
                    exclusion_diseases: [
                        {
                            ctep_category: "Non-Small Cell Lung Cancer",
                            medra_code: "10058354",
                            short_name: "Bronchioloalveolar carcinoma"
                        }
                    ],
                    variant_report: {
                        single_nucleotide_variants: [
                            {
                                alternative: "G",
                                chromosome: "chr7",
                                description: "p.L858R",
                                gene_name: "EGFR",
                                identifier: "COSM6224",
                                inclusion: true,
                                level_of_evidence: "1.0",
                                public_med_ids: [
                                  "20573926",
                                    "1969284"
                                ],
                                position: "55259515",
                                reference: "T"
                            },
                            {
                                alternative: "G",
                                chromosome: "chr7",
                                description: "p.L858R",
                                gene_name: "EGFR",
                                identifier: "COSM00934",
                                inclusion: false,
                                level_of_evidence: "1.0",
                                position: "55259588",
                                reference: "T"
                            }
                        ],
                        indels: [
                            {
                                alternative: "C",
                                chromosome: "chr7",
                                description: "p.K734_E739del",
                                gene_name: "EGFR",
                                identifier: "COSM20649",
                                inclusion: true,
                                level_of_evidence: "1.0",
                                position: "55242462",
                                reference: "CAAGAATTGACA",
                            },
                            {
                                alternative: "C",
                                chromosome: "chr7",
                                description: "p.K734_E739del",
                                gene_name: "EGFR",
                                identifier: "COSF20649",
                                inclusion: false,
                                level_of_evidence: "1.0",
                                position: "55242462",
                                reference: "CAAGAATTGACA",
                            },
                            {
                                alternative: "C",
                                chromosome: "chr7",
                                description: "p.K734_E739del",
                                gene_name: "EGFR",
                                identifier: "20649",
                                inclusion: false,
                                level_of_evidence: "1.0",
                                position: "55242462",
                                reference: "CAAGAATTGACA",
                            }
                        ],
                        copy_number_variants: [
                            {
                                alternative: null,
                                chromosome: null,
                                description: "PIK3CA amplification",
                                gene_name: "PIK3CA",
                                identifier: "PIK3CA",
                                inclusion: true,
                                level_of_evidence: "3.0",
                                position: null,
                                reference: null
                            },
                            {
                                alternative: null,
                                chromosome: null,
                                description: "PIK3CA amplification",
                                gene_name: "PIK3CA",
                                identifier: "PIK3CA",
                                inclusion: false,
                                level_of_evidence: "3.0",
                                position: null,
                                reference: null
                            }
                        ],
                        gene_fusions: [
                            {
                                alternative: null,
                                chromosome: null,
                                description: "KIAA1569-BRAF.K15B11",
                                gene_name: "BRAF",
                                identifier: "KIAA1549-BRAF.K15B11",
                                inclusion: true,
                                level_of_evidence: "3.0",
                                position: null,
                                reference: null
                            },
                            {
                                alternative: null,
                                chromosome: null,
                                description: "KIAA1569-BRAF.K15B11",
                                gene_name: "BRAF",
                                identifier: "KIAA1549-BRAF.K15B11",
                                inclusion: false,
                                level_of_evidence: "3.0",
                                position: null,
                                reference: null
                            }
                        ],
                        non_hotspot_rules: [
                            {
                                exon: "20",
                                function: "nonframeshiftInsertion",
                                gene: "EGFR",
                                inclusion: true,
                                level_of_evidence: "2.0",
                                oncominevariantclass: null,
                                protein_match: null
                            },
                            {
                                exon: "20",
                                function: "nonframeshiftInsertion",
                                gene: "EGFR",
                                inclusion: false,
                                level_of_evidence: "2.0",
                                oncominevariantclass: null,
                                protein_match: null
                            }
                        ]
                    }
                }


            ]

            );

        scope.loadTreatmentArmDetails('EAY131-A');
        httpBackend.flush();

        expect(scope.test).toBe('test');
        expect(scope.information.name).toBe('EAY131-A');
        //expect(scope.treatmentArmList.length).toBe(2);
        //expect(scope.treatmentArmList[0].treatmentArmId).toBe('MB-S1');
        //expect(scope.treatmentArmList[1].treatmentArmId).toBe('MB-S2');
    });

    it('should not populate the treatment arm list on an error response', function() {
        httpBackend.when('GET', 'http://server:80/treatmentarmapi/treatmentArms/EAY131-A').respond(500);
        scope.loadTreatmentArmDetails('EAY131-A');
        httpBackend.flush();

        //expect(scope.treatmentArmList.length).toBe(0);
    });

    it('should not populate the treatment arm list on a null', function() {
        httpBackend.when('GET', 'http://server:80/treatmentarmapi/treatmentArms/EAY131-A')
            .respond(null);
        scope.loadTreatmentArmDetails('EAY131-A');
        httpBackend.flush();

        //expect(scope.treatmentArmList.length).toBe(0);
    });

    it('should get the inExclusionType', function() {
        expect(scope.getInExclusionTypeClass('inclusion')).toBe('');
    });

    it('should set the inExclusionType', function() {
        scope.setInExclusionType('active');
        scope.setInExclusionType('active');
    });

    it('should create the right links', function() {
        scope.openGene('EGFR');
        scope.openId('COSM746');
        scope.openPubMed('2109606');
    });


});

