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
            'treatment_arm.normal': baseUrl + 'treatment_arm.html',
            'treatment_arm.narrow': baseUrl + 'treatment_arm_narrow.html',
            'generic.normal': baseUrl + 'generic.html',
            'generic.narrow': baseUrl + 'generic_narrow.html'
        };

        var getTemplateLoader = function (type, layout) {
            var key = type + '.' + (layout ? layout : 'normal');
            if (key in templateMap) {
                var url = templateMap[key];
                console.log('-----------');
                console.log(url);
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
