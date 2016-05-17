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
                return $http.get(url, {cache: $templateCache});
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
                timelineEvent: '=',
                type: '='
            },
            link: linker
        }
    }
    
} ());
