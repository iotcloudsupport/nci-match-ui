describe('Factory: MATCH Config Factory', function () {

    beforeEach(module('config.matchbox'));

    var matchConfig;

    beforeEach(function () {
        inject(function (_matchConfig_) {
            matchConfig = _matchConfig_;
        });
    });

    it('should return "http://server:80/match" for the match api base url', function () {
        expect(matchConfig.matchApiBaseUrl).toEqual('http://server:80/match');
    });

    it('should return "http://server:80/reportapi" for the report api base url', function () {
        expect(matchConfig.reportApiBaseUrl).toEqual('http://server:80/reportapi');
    });

    it('should return "http://server:80/treatmentarmapi" for the treatment arm api base url', function () {
        expect(matchConfig.treatmentArmApiBaseUrl).toEqual('http://server:80/treatmentarmapi');
    });

    it('should return "http://server:80/lookupapi" for the lookup api base url', function () {
        expect(matchConfig.lookApiBaseUrl).toEqual('http://server:80/lookupapi');
    });

});