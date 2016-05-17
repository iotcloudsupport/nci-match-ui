(function () {
    "use strict";

    angular
        .module('matchbox')
        .directive('patientTimeline', patientTimeline);
        
    /**
     * patientTimeline
     */
    function patientTimeline($compile, $http, $templateCache, $log) {
        var directive = this;
        
        var baseUrl = '/views/templates/patient_timeline_';
        
        var templateMap = {
            'biopsy.assay': baseUrl + 'biopsy_assay.html',
            'biopsy.variantReport': baseUrl + 'biopsy_variantReport.html',
            'biopsy.pathology': baseUrl + 'biopsy_pathology.html',
            'assignment': baseUrl + 'assignment.html',
            'patient': baseUrl + 'patient.html',
            'user': baseUrl + 'user.html',
            'system': baseUrl + 'system.html'
        };
        
        var getTemplateLoader = function(type) {
            if (type in templateMap) {
                var url = templateMap[type];
                return $http.get(baseUrl + 'user.html', {cache: $templateCache});
            } else {
                $log.error('patient-timeline directive: invalid timeline type "' + type + '"');
            }
        }
        
        var defaultTemplate = '<div><p>Invalid Timeline Type "{{ timelineEvent.type }}"</p><p>{{ timelineEvent }}</p></div>';

        var linker = function(scope, element, attrs) {
            var loader = getTemplateLoader(scope.type);
            
            if (!loader) {
                element.html(defaultTemplate);
                element.replaceWith($compile(element.html())(scope));
                return;
            }

            var promise = loader.success(function(html) {
                element.html(html);
            }).then(function (response) {
                element.replaceWith($compile(element.html())(scope));
            });
        }
        
        return {
            restrict: 'E',
            scope: {
                timelineEvent: '='
            },
            link: linker
        }
    }
    
} ());
