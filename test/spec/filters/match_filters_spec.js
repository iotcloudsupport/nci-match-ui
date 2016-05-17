/*
*/
describe('Filter', function () {

    beforeEach(module('filters.matchbox'));

    var filter;

    beforeEach(inject(function (_$filter_) {
        filter = _$filter_;
    }));

    xdescribe('gmt', function () {
        it('should return a dash for a undefined value', function () {
            var toGMT = filter('gmt');
            expect(toGMT(undefined)).toEqual('-');
        });

        it('should return a dash for a null value', function () {
            var toGMT = filter('gmt');
            expect(toGMT(null)).toEqual('-');
        });

        it('should return a dash for a non-number value', function () {
            var toGMT = filter('gmt');
            expect(toGMT('1234')).toEqual('-');
        });

        it('should return a formatted GMT date', function () {
            var toGMT = filter('gmt');
            expect(toGMT(1327303085000)).toEqual('January 23, 2012 7:18 AM GMT');
        });
    });
   

    describe('analysisStatus', function () {
        var underTest;
        
        beforeEach(function() {
            underTest = filter('analysisStatus');    
        });
        
        it('should return empty string for undefined', function () {
            expect(underTest(undefined)).toEqual('');
        });
        
        it('should return empty string for null', function () {
            expect(underTest(null)).toEqual('');
        });
        
        it('should return empty string for object', function () {
            expect(underTest({})).toEqual('');
        });
        
        it('should return empty string for array', function () {
            expect(underTest([])).toEqual('');
        });
        
        it('should return empty string for number', function () {
            expect(underTest(0)).toEqual('');
        });
        
        it('should return empty string for Date', function () {
            expect(underTest(new Date())).toEqual('');
        });
         
        it('should return empty string for unsupported status', function () {
            expect(underTest('')).toEqual('');
        });
               
        it('should return "green" for confirmed', function () {
            expect(underTest('confirmed')).toEqual('green');
        });
        
        it('should return "green" for CONFIRMED', function () {
            expect(underTest('CONFIRMED')).toEqual('green');
        });
                
        it('should return "orange" for PENDING', function () {
            expect(underTest('PENDING')).toEqual('orange');
        });
                 
        it('should return "red" for REJECTED', function () {
            expect(underTest('REJECTED')).toEqual('red');
        });
               
        // it('should return a dash for a null value', function () {
        //     expect(underTest(null)).toEqual('-');
        // });

        // it('should return a dash for a non-number value', function () {
        //     expect(underTest('1234')).toEqual('-');
        // });

        // it('should return a formatted GMT date', function () {
        //     expect(underTest(1327303085000)).toEqual('January 23, 2012 7:18 AM GMT');
        // });
    });
    
});