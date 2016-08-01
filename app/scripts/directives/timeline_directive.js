(function () {
    "use strict";

    angular
        .module('matchbox')
        .directive('timeLine', timeLine);

    /**
     * timeLine
     */
    function timeLine($compile, $http, $templateCache, $log) {
        var baseUrl = '/views/templates/timeline/';

        // $scope.getIcon = function () {
        //     switch ($scope.event_type) {
        //         case 'assay':
        //             return 'fa-flask';

        //         case 'specimen':
        //             return 'fa-truck';

        //         case 'user':
        //         case 'pathology_status':
        //             return 'fa-user-md';

        //         case 'assignment_report':
        //         case 'treatment_arm':
        //             return 'fa-medkit';

        //         case 'variant_report':
        //             return 'fa-bar-chart';

        //         case 'patient':
        //             return 'fa-user';

        //         case 'generic':
        //         default:
        //             return 'fa-clock-o';
        //     }
        // }

        var templateMap = {
            'assay.normal': baseUrl + 'assay.html',
            'assay.narrow': baseUrl + 'assay_narrow.html',
            'specimen.normal': baseUrl + 'specimen.html',
            'specimen.narrow': baseUrl + 'specimen_narrow.html',

            'variant_report.normal': baseUrl + 'variant_report.html',
            'variant_report.narrow': baseUrl + 'variant_report_narrow.html',
            'pathology_status.normal': baseUrl + 'pathology_status.html',
            'pathology_status.narrow': baseUrl + 'pathology_status_narrow.html',
            'assignment_report.normal': baseUrl + 'assignment_report.html',
            'assignment_report.narrow': baseUrl + 'assignment_report_narrow.html',
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
                $log.error('timeLine directive: invalid timeLine type "' + type + '"');
            }
        };

        var defaultTemplate = '<div><p>Invalid TimeLine Type "{{ timelineEvent.type }}"</p><p>{{ timelineEvent }}</p></div>';

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
