/*
*/
describe('Filter', function () {

    beforeEach(module('filters.matchbox'));

    var filter;

    beforeEach(inject(function (_$filter_) {
        filter = _$filter_;
    }));


    describe('gmt', function () {
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

        beforeEach(function () {
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

        it('should return empty string for empty string', function () {
            expect(underTest('')).toEqual('');
        });

        it('should return empty string for unsupported status', function () {
            expect(underTest('fake_value')).toEqual('');
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
    });


    describe('concordance', function () {
        var underTest;

        beforeEach(function () {
            underTest = filter('concordance');
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

        it('should return empty string for empty string', function () {
            expect(underTest('')).toEqual('');
        });

        it('should return empty string for unsupported status', function () {
            expect(underTest('fake_value')).toEqual('');
        });

        it('should return "green" for yes', function () {
            expect(underTest('yes')).toEqual('green');
        });

        it('should return "green" for YES', function () {
            expect(underTest('YES')).toEqual('green');
        });
    });


    describe('assayStatus', function () {
        var underTest;

        beforeEach(function () {
            underTest = filter('assayStatus');
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

        it('should return empty string for empty string', function () {
            expect(underTest('')).toEqual('');
        });

        it('should return empty string for unsupported status', function () {
            expect(underTest('fake_value')).toEqual('');
        });

        it('should return "green" for POSITIVE', function () {
            expect(underTest('POSITIVE')).toEqual('green');
        });

        it('should return "green" for positive', function () {
            expect(underTest('positive')).toEqual('green');
        });

        it('should return "red" for NEGATIVE', function () {
            expect(underTest('NEGATIVE')).toEqual('red');
        });
    });


    describe('status', function () {
        var underTest;

        beforeEach(function () {
            underTest = filter('status');
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

        it('should return empty string for empty string', function () {
            expect(underTest('')).toEqual('');
        });

        it('should return empty string for unsupported status', function () {
            expect(underTest('fake_value')).toEqual('');
        });

        it('should return "green" for REGISTRATION', function () {
            expect(underTest('REGISTRATION')).toEqual('blue');
        });

        it('should return "green" for registration', function () {
            expect(underTest('registration')).toEqual('blue');
        });

        it('should return "purple" for PENDING_APPROVAL', function () {
            expect(underTest('PENDING_APPROVAL')).toEqual('purple');
        });

        it('should return "purple" for REJOIN_REQUESTED', function () {
            expect(underTest('REJOIN_REQUESTED')).toEqual('purple');
        });

        it('should return "red" for OFF_TRIAL_NO_TA_AVAILABLE', function () {
            expect(underTest('OFF_TRIAL_NO_TA_AVAILABLE')).toEqual('red');
        });

        it('should return "red" for OFF_TRIAL_NOT_CONSENTED', function () {
            expect(underTest('OFF_TRIAL_NOT_CONSENTED')).toEqual('red');
        });

        it('should return "red" for OFF_TRIAL', function () {
            expect(underTest('OFF_TRIAL')).toEqual('red');
        });

        it('should return "red" for OFF_TRIAL_DECEASED', function () {
            expect(underTest('OFF_TRIAL_DECEASED')).toEqual('red');
        });

        it('should return "green" for ON_TREATMENT_ARM', function () {
            expect(underTest('ON_TREATMENT_ARM')).toEqual('green');
        });

    });


    describe('irsample', function () {
        var underTest;

        beforeEach(function () {
            underTest = filter('irsample');
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

        it('should return empty string for empty string', function () {
            expect(underTest('')).toEqual('');
        });

        it('should return empty string for unsupported status', function () {
            expect(underTest('fake_value')).toEqual('');
        });

        it('should return "green" for PASSED', function () {
            expect(underTest('PASSED')).toEqual('green');
        });

        it('should return "green" for passed', function () {
            expect(underTest('passed')).toEqual('green');
        });

        it('should return "red" for FAILED', function () {
            expect(underTest('FAILED')).toEqual('red');
        });
    });

    describe('titlecase', function () {
        var underTest;

        beforeEach(function () {
            underTest = filter('titlecase');
        });

        it('should convert to Title Case', function () {
            var result;

            result = underTest('i am a test');
            expect(result).toEqual('I Am a Test');

            result = underTest('I AM A TEST');
            expect(result).toEqual('I Am a Test');

            result = underTest('');
            expect(result).toEqual('');

            result = underTest();
            expect(result).toEqual('');

            result = underTest(10);
            expect(result).toEqual('10');

            result = underTest(true);
            expect(result).toEqual('True');

            result = underTest(false);
            expect(result).toEqual('False');

            result = underTest(null);
            expect(result).toEqual('');
        });
    });

});