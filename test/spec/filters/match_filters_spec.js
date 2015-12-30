describe('Filter: filters.matchbox', function () {

    // load the matchbox filters module
    beforeEach(module('filters.matchbox'));

    var $filter;

    // Initialize the filter
    beforeEach(function () {
        inject(function (_$filter_) {
            $filter = _$filter_;
        });
    });

    it('should return a dash for a undefined value', function () {
        var toGMT = $filter('toGMT');
        expect(toGMT(undefined)).toEqual('-');
    });

    it('should return a dash for a null value', function () {
        var toGMT = $filter('toGMT');
        expect(toGMT(null)).toEqual('-');
    });

    it('should return a dash for a non-number value', function () {
        var toGMT = $filter('toGMT');
        expect(toGMT('1234')).toEqual('-');
    });

    it('should return a formatted GMT date', function() {
        var toGMT = $filter('toGMT');
        expect(toGMT(1327303085000)).toEqual('January 23, 2012 7:18 AM GMT');
    });

});