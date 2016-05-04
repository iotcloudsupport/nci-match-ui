describe('Filter: GMT Filter', function () {

    beforeEach(module('filters.matchbox'));

    var filter;

    beforeEach(inject(function (_$filter_) {
        filter = _$filter_;
    }));


    it('should be defined', function () {
        var toGMT = filter('gmt');
        excect(toGMT).toBeDefined();
    });

    xit('should return a dash for a undefined value', function () {
        var toGMT = filter('gmt');
        expect(toGMT(undefined)).toEqual('-');
    });

    xit('should return a dash for a null value', function () {
        var toGMT = filter('gmt');
        expect(toGMT(null)).toEqual('-');
    });

    xit('should return a dash for a non-number value', function () {
        var toGMT = filter('gmt');
        expect(toGMT('1234')).toEqual('-');
    });

    xit('should return a formatted GMT date', function() {
        var toGMT = filter('gmt');
        expect(toGMT(1327303085000)).toEqual('January 23, 2012 7:18 AM GMT');
    });

});