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

        it('should return "green" for REGISTRATION_ERROR', function () {
            expect(underTest('REGISTRATION_ERROR')).toEqual('blue');
        });

        it('should return "blue" for PROGRESSION', function () {
            expect(underTest('PROGRESSION')).toEqual('blue');
        });

        it(' should return "blue" for "OFF_TRIAL_NO_TA_AVAILABLE"', function () {
            expect(underTest('OFF_TRIAL_NO_TA_AVAILABLE')).toEqual('blue');
        });

        it(' should return "blue" for "TOXICITY"', function () {
            expect(underTest('TOXICITY')).toEqual('blue');
        });

        it(' should return "blue" for "ON_TREATMENT_ARM"', function () {
            expect(underTest('ON_TREATMENT_ARM')).toEqual('blue');
        });

        it(' should return "blue" for "OFF_STUDY_NOT_CONSENTED"', function () {
            expect(underTest('OFF_STUDY_NOT_CONSENTED')).toEqual('blue');
        });

        it(' should return "blue" for "NOT_ELIGIBLE"', function () {
            expect(underTest('NOT_ELIGIBLE')).toEqual('blue');
        });

        it(' should return "blue" for "TREATMENT_ARM_SUSPENDED"', function () {
            expect(underTest('TREATMENT_ARM_SUSPENDED')).toEqual('blue');
        });

        it(' should return "blue" for "TREATMENT_ARM_CLOSED"', function () {
            expect(underTest('TREATMENT_ARM_CLOSED')).toEqual('blue');
        });

        it(' should return "blue" for "REGIMENT_COMPLETED"', function () {
            expect(underTest('REGIMENT_COMPLETED')).toEqual('blue');
        });

        it(' should return "purple" for "TISSUE_SPECIMEN_RECEIVED"', function () {
            expect(underTest('TISSUE_SPECIMEN_RECEIVED')).toEqual('purple');
        });

        it(' should return "purple" for "TISSUE_SPECIMEN_FAILURE"', function () {
            expect(underTest('TISSUE_SPECIMEN_FAILURE')).toEqual('purple');
        });

        it(' should return "purple" for "BLOOD_SPECIMEN_RECEIVED"', function () {
            expect(underTest('BLOOD_SPECIMEN_RECEIVED')).toEqual('purple');
        });

        it(' should return "purple" for "BLOOD_NECLEIC_ACID_SHIPPED"', function () {
            expect(underTest('BLOOD_NECLEIC_ACID_SHIPPED')).toEqual('purple');
        });

        it(' should return "purple" for "TISSUE_NUCLEIC_ACID_SHIPPED"', function () {
            expect(underTest('TISSUE_NUCLEIC_ACID_SHIPPED')).toEqual('purple');
        });

        it(' should return "purple" for "TISSUE_SLIDE_SPECIMEN_SHIPPED"', function () {
            expect(underTest('TISSUE_SLIDE_SPECIMEN_SHIPPED')).toEqual('purple');
        });

        it(' should return "red" for "ORDER_X_IHC"', function () {
            expect(underTest('ORDER_X_IHC')).toEqual('red');
        });

        it(' should return "red" for "RESULT_X_IHC"', function () {
            expect(underTest('RESULT_X_IHC')).toEqual('red');
        });

        it(' should return "red" for "PATHOLOGY_REVIEW"', function () {
            expect(underTest('PATHOLOGY_REVIEW')).toEqual('red');
        });

        it(' should return "green" for "TISSUE_VARIANT_REPORT_RECEIVED"', function () {
            expect(underTest('TISSUE_VARIANT_REPORT_RECEIVED')).toEqual('green');
        });

        it(' should return "green" for "TISSUE_VARIANT_REPORT_CONFIRMED"', function () {
            expect(underTest('TISSUE_VARIANT_REPORT_CONFIRMED')).toEqual('green');
        });

        it(' should return "green" for "TISSUE_VARIANT_REPORT_REJECTED"', function () {
            expect(underTest('TISSUE_VARIANT_REPORT_REJECTED')).toEqual('green');
        });

        it(' should return "green" for "TISSUE_NUCLEIC_ACID_FAILURE"', function () {
            expect(underTest('TISSUE_NUCLEIC_ACID_FAILURE')).toEqual('green');
        });

        it(' should return "green" for "RUNNING_RULES"', function () {
            expect(underTest('RUNNING_RULES')).toEqual('green');
        });

        it(' should return "green" for "AWAITING_PATIENT_DATA"', function () {
            expect(underTest('AWAITING_PATIENT_DATA')).toEqual('green');
        });

        it(' should return "green" for "AWAITING_TREATMENT_ARMS_STATUS"', function () {
            expect(underTest('AWAITING_TREATMENT_ARMS_STATUS')).toEqual('green');
        });

        it(' should return "green" for "RETRIEVING_RULES_ASSIGNMENT"', function () {
            expect(underTest('RETRIEVING_RULES_ASSIGNMENT')).toEqual('green');
        });

        it(' should return "green" for "COMPASSIONATE_CARE"', function () {
            expect(underTest('COMPASSIONATE_CARE')).toEqual('green');
        });

        it(' should return "green" for "PENDING_INFORMATICS_REVIEW"', function () {
            expect(underTest('PENDING_INFORMATICS_REVIEW')).toEqual('green');
        });

        it(' should return "green" for "COMPLETED_MDA_DATA_SET"', function () {
            expect(underTest('COMPLETED_MDA_DATA_SET')).toEqual('green');
        });

        it(' should return "green" for "PENDING_APPROVAL"', function () {
            expect(underTest('PENDING_APPROVAL')).toEqual('green');
        });

        it(' should return "green" for "PENDING_CONFIRMATION"', function () {
            expect(underTest('PENDING_CONFIRMATION')).toEqual('green');
        });

        it(' should return "green" for "BLOOD_VARIANT_REPORT_RECEIVED"', function () {
            expect(underTest('BLOOD_VARIANT_REPORT_RECEIVED')).toEqual('green');
        });

        it(' should return "green" for "BLOOD_VARIANT_REPORT_CONFIRMED"', function () {
            expect(underTest('BLOOD_VARIANT_REPORT_CONFIRMED')).toEqual('green');
        });

        it(' should return "green" for "BLOOD_VARIANT_REPORT_REJECTED"', function () {
            expect(underTest('BLOOD_VARIANT_REPORT_REJECTED')).toEqual('green');
        });

        it(' should return "green" for "BLOOD_NUCLEIC_ACID_FAILURE"', function () {
            expect(underTest('BLOOD_NUCLEIC_ACID_FAILURE')).toEqual('green');
        });

        it(' should return "blue" for "OFF_TRIAL"', function () {
            expect(underTest('OFF_TRIAL')).toEqual('blue');
        });

        it(' should return "blue" for "OFF_STUDY"', function () {
            expect(underTest('OFF_STUDY')).toEqual('blue');
        });

        it(' should return "blue" for "OFF_TRIAL_DECEASED"', function () {
            expect(underTest('OFF_TRIAL_DECEASED')).toEqual('blue');
        });

        it(' should return "green" for "NO_PED_MATCH_AVAILABLE"', function () {
            expect(underTest('NO_PED_MATCH_AVAILABLE')).toEqual('green');
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


    describe('utc', function () {
        it('should return a dash for a undefined value', function () {
            var toUtc = filter('utc');
            expect(toUtc(undefined)).toEqual('-');
        });

        it('should return a dash for a null value', function () {
            var toUtc = filter('utc');
            expect(toUtc(null)).toEqual('-');
        });

        it('should return a dash for an empty string', function () {
            var toUtc = filter('utc');
            expect(toUtc('')).toEqual('-');
        });

        it('should return a dash for a non-number value', function () {
            var toUtc = filter('utc');
            expect(toUtc('1234')).toEqual('-');
        });

        it('should return an incorrectly formatted GMT date', function () {
            var toUtc = filter('utc');
            expect(toUtc('016-02-19T23:52:24+00:00')).toEqual('-');
        });

        it('should return a correctly formatted GMT date', function () {
            var toUtc = filter('utc');
            expect(toUtc(1327303085000)).toEqual('January 23, 2012 7:18 AM GMT');
        });
    });

});