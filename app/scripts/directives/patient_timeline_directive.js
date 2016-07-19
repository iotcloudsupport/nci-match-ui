(function () {
    "use strict";

    angular
        .module('matchbox')
        .directive('patientTimeline', patientTimeline);

    /**
     * patientTimeline
     */
    function patientTimeline($compile, $http, $templateCache, $log) {
        var baseUrl = '/views/templates/patient_timeline_';

        /* sample data
        
        { type: 'biopsy.assay', dateTime: 'Sep 17, 2015, 10:00 AM GMT', gene: 'MLH1', status: 'Ordered', biopsySequenceNumber: 'B-987456' },
        { type: 'biopsy.variantReport', dateTime: 'Sep 17, 2015, 10:00 AM GMT', status: 'Pending', molecularSequenceNumber: 'MSN-1245', analysisId: 'A-T-5678', location: 'MGH', totalMoiCount: 1, totalAmoiCount: 0 },
        { type: 'biopsy.pathology', dateTime: 'Sep 17, 2015, 10:00 AM GMT', status: 'Confirmed', comment: 'Agreement on pathology' },
        { type: 'assignment', dateTime: 'Sep 17, 2015, 10:00 AM GMT', status: 'Pending', biopsySequenceNumber: 'B-987456', molecularSequenceNumber: 'MSN-1245', analysisId: 'A-T-5678'},
        { type: 'patient', dateTime: 'Sep 17, 2015, 10:00 AM GMT', status: 'Registration', location: 'MGH' },
        { type: 'user', user:'Rick',  dateTime: 'Sep 17, 2015, 10:00 AM GMT', status:'upload.patientdocument', details:'Document Upload' },
        { type: 'system', dateTime: 'Sep 17, 2015, 10:00 AM GMT', status: 'error', details: 'Unable to process patient biopsy message. Please contact techincal support.' }
        
        */

        var templateMap = {
            'biopsy.assay.normal': baseUrl + 'biopsy_assay.html',
            'biopsy.assay.narrow': baseUrl + 'biopsy_assay_narrow.html',
            'biopsy.assay_order.normal': baseUrl + 'biopsy_assay_order.html',
            'biopsy.assay_order.narrow': baseUrl + 'biopsy_assay_order_narrow.html',
            'biopsy.assay_received.normal': baseUrl + 'biopsy_assay_received.html',
            'biopsy.assay_received.narrow': baseUrl + 'biopsy_assay_received_narrow.html',
            'biopsy.variant_report_received.normal': baseUrl + 'biopsy_variant_report_received.html',
            'biopsy.variant_report_received.narrow': baseUrl + 'biopsy_variant_report_received_narrow.html',
            'biopsy.variant_report_shipped.normal': baseUrl + 'biopsy_variant_report_shipped.html',
            'biopsy.variant_report_shipped.narrow': baseUrl + 'biopsy_variant_report_shipped_narrow.html',
            'biopsy.pathology.normal': baseUrl + 'biopsy_pathology.html',
            'biopsy.pathology.narrow': baseUrl + 'biopsy_pathology_narrow.html',
            'assignment.normal': baseUrl + 'assignment.html',
            'assignment.narrow': baseUrl + 'assignment_narrow.html',
            'patient.normal': baseUrl + 'patient.html',
            'patient.narrow': baseUrl + 'patient_narrow.html',
            'user.normal': baseUrl + 'user.html',
            'user.narrow': baseUrl + 'user_narrow.html',
            'system.normal': baseUrl + 'system.html',
            'system.narrow': baseUrl + 'system_narrow.html',
            'treatment_arm.normal': baseUrl + 'treatment_arm.html',
            'treatment_arm.narrow': baseUrl + 'treatment_arm_narrow.html',
            'generic.normal': baseUrl + 'generic.html',
            'generic.narrow': baseUrl + 'generic_narrow.html'
        };

        var getTemplateLoader = function (type, layout) {
            var key = type + '.' + (layout ? layout : 'normal');
            if (key in templateMap) {
                var url = templateMap[key];
                return $http.get(url, { cache: $templateCache });
            } else {
                $log.error('patient-timeline directive: invalid timeline type "' + type + '"');
            }
        };

        var defaultTemplate = '<div><p>Invalid Timeline Type "{{ timelineEvent.type }}"</p><p>{{ timelineEvent }}</p></div>';

        var linker = function (scope, element, attrs) {
            var loader = getTemplateLoader(scope.type, scope.layout);

            if (!loader) {
                element.html(defaultTemplate);
                element.replaceWith($compile(element.html())(scope));
                return;
            }

            var promise = loader.success(function (html) {
                element.html(html);
            }).then(function (response) {
                element.replaceWith($compile(element.html())(scope));
            });
        };

        return {
            restrict: 'E',
            scope: {
                timelineEvent: '<',
                type: '<',
                isStepChanging: '<',
                layout: '<'
            },
            link: linker
        }
    }

} ());
