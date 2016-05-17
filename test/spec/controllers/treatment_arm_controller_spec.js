
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
                                $window) {
        scope = $rootScope.$new();
        httpBackend = $httpBackend;
        window = $window;


        treatmentArmCtrl = $controller('TreatmentArmController', {
            $scope: scope,
            $window: window,
            DTOptionsBuilder: {
                newOptions: function () {
                    return {
                        withOption: function (paging) {
                            // This is a mock function of the DTOptionsBuilder
                        },
                        withOption: function (info) {
                            // This is a mock function of the DTOptionsBuilder
                        }
                    };
                }
            },
            DTColumnDefBuilder: null,
            treatmentArmApi: _treatmentArmApi_
        });
    }));

    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it('should populate the treatment details success response', function() {
        httpBackend.when('GET', 'http://server:80/treatmentarmapi/treatmentArms/EAY131-A')
            .respond([{
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
                        ]
                    }
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


});

