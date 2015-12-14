/**
 * Created by hendrikssonm on 12/11/15.
 */

//HTTP PATIENT CONTROLLER TEST
angular.module('biopsySequenceListApp', [])
    .controller('biopsySequenceTableController', function biopsySequenceTableController($scope, $http) {
        var getbiopsySequenceTableControllerData = function getbiopsySequenceTableControllerData() {
            $http.get('http://localhost:8080/match/common/rs/getBasicPatientsData', {
                params: {  }
            }).success(function(data, status, headers, config) {
                $scope.biopsySequences = data.Search;
            }).error(function(data, status, headers, config) {
                $scope.biopsySequences = [];
            });
        };

        /* On Load */
        $scope.biopsySequences = [
            {
                    "biopsies":[
                    {
                        "biopsySequenceNumber":"T-15-000013",
                        "specimenReceivedDate":"2015-08-21T14:57:16.077Z",
                        "ptenOrderDate":"2015-08-21T22:11:56.002Z",
                        "ptenResultDate":"2015-08-26T16:09:44.177Z",
                        "specimenFailureDate":"2015-08-26T17:13:20.072Z",
                        "pathologyReviewdate":"-",
                        "samples":[
                        ]
                    }
                ],
                    "patientSequenceNumber":"10001"
            },
            {
                "biopsies":[
                    {
                        "biopsySequenceNumber":"T-15-000048",
                        "specimenReceivedDate":"2015-09-09T14:09:06.027Z",
                        "ptenOrderDate":"2015-09-09T20:32:48.082Z",
                        "ptenResultDate":"2015-09-14T20:18:31.503Z",
                        "specimenFailureDate":"-",
                        "pathologyReviewdate":"2015-09-14T20:18:31.503Z",
                        "samples":[
                        ]
                    }
                ],
                "patientSequenceNumber":"10024"
            }
            ];

        $scope.keyword = '';
        //Start describes
        getbiopsySequenceTableControllerData();

    });

//Describes
describe('biopsySequenceTableController', function() {
    beforeEach(module('biopsySequenceListApp'));

    var httpData = [{
        "biopsies":[
            {
                "biopsySequenceNumber":"T-15-000013",
                "specimenReceivedDate":"2015-08-21T14:57:16.077Z",
                "ptenOrderDate":"2015-08-21T22:11:56.002Z",
                "ptenResultDate":"2015-08-26T16:09:44.177Z",
                "specimenFailureDate":"2015-08-26T17:13:20.072Z",
                "pathologyReviewdate":"-",
                "samples":[
                ]
            }
        ],
        "patientSequenceNumber":"10001"
    },
        {
            "biopsies":[
                {
                    "biopsySequenceNumber":"T-15-000048",
                    "specimenReceivedDate":"2015-09-09T14:09:06.027Z",
                    "ptenOrderDate":"2015-09-09T20:32:48.082Z",
                    "ptenResultDate":"2015-09-14T20:18:31.503Z",
                    "specimenFailureDate":"-",
                    "pathologyReviewdate":"2015-09-14T20:18:31.503Z",
                    "samples":[
                    ]
                }
            ],
            "patientSequenceNumber":"10024"
        }];

    //*** STAR CONDITION TESTS ***//
    //Load
    beforeEach(inject(function(_$controller_, _$httpBackend_) {
        $controller = _$controller_;
        $scope = {};
        $httpBackend = _$httpBackend_;
        $httpBackend.whenGET('http://localhost:8080/match/common/rs/getBasicbiopsySequences').respond({
            Search: httpData
        });
    }));
    //Load report without parameters
    it('should load PATIENT report', function () {
        var testbiopsySequenceTableController = $controller('biopsySequenceTableController', { $scope: $scope });
        //$httpBackend.flush();
        expect($scope.biopsySequences).toEqual(httpData);
    });




});









