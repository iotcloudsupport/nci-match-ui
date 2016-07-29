(function () {
    "use strict";

    angular
        .module('matchbox')
        .directive('timeline', timeline);

    /**
     * timeline
     */
    function timeline($scope, $compile, $http, $templateCache, $log) {
        var baseUrl = '/views/templates/timeline_';

        $scope.getIcon = function () {
            switch ($scope.event_type) {
                case 'assay_result_received':
                    return 'fa-flask';

                case 'specimen_received':
                case 'specimen_shipped':
                    return 'fa-bar-chart';

                case 'user':
                case 'pathology_status':
                    return 'fa-user-md';

                case 'assignment_report_pending':
                case 'assignment_report_confirmed':
                case 'treatment_arm':
                    return 'fa-medkit';

                case 'variant_report_received':
                case 'variant_report_confirmed':
                    return 'fa-bar-chart';

                case 'patient':
                    return 'fa-user';

                case 'generic':
                default:
                    return 'fa-clock-o';
            }
        }

        var templateMap = {
            'assay_result_received.normal': baseUrl + 'assay_result_received.html',
            'assay_result_received.narrow': baseUrl + 'assay_result_received_narrow.html',
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
                return $http.get(url, { cache: $templateCache });
            } else {
                $log.error('timeline directive: invalid timeline type "' + type + '"');
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
