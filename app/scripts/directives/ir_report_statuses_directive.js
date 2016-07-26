angular.module('matchbox')
    .directive('passObject', function () {

        var baseUrl = '/views/templates/ir_report_statuses.html';

        return {
            restrict: 'E',
            scope: { obj: '=' },
            // template: '<div>Hello, {{obj.list}}!</div>'
            template: '<ul><li ng-repeat="prop in obj">{{ prop[0].ipAddress }}</li></ul>'
            // template: '<div>Hello, {{obj.prop}}!</div>'
        };
    })
    .directive('datatableWrapper', function ($timeout, $compile) {
        return {
            restrict: 'E',
            transclude: true,
            template: '<ng-transclude></ng-transclude>',
            link: link
        };

        function link(scope, element) {
            // Using $timeout service as a "hack" to trigger the callback function once everything is rendered
            $timeout(function () {
                // Compiling so that angular knows the button has a directive
                $compile(element.find('.custom-element'))(scope);
            }, 0, false);
        }
    })
    .directive('patienttableWrapper', function ($timeout, $compile) {
        return {
            restrict: 'E',
            transclude: true,
            template: '<ng-transclude></ng-transclude>',
            link: link
        };

        function link(scope, element) {
            // Using $timeout service as a "hack" to trigger the callback function once everything is rendered
            $timeout(function () {
                // Compiling so that angular knows the button has a directive
                $compile(element.find('.patient-element'))(scope);
            }, 0, false);
        }
    })
    .directive('customElement', function () {

        /*jshint multistr: true */
        var template = '<select width="100%" class="form-control pull-right" ng-model="confirmed" ng-change="confirmedFunc()" >\
        <option value="ALL" selected="selected">ALL</option>\
        <option value="PASS" >PASS</option>\
        <option value="NOCALL" >NOCALL</option>\
        <option value=".">.</option>\
        </select>';

        return {
            scope: {
                confirmed: '='
            },
            restrict: 'AE',
            template: template
        };
    })
    .directive('patientElement', function () {

        /*jshint multistr: true */
        var template = '<select width="100%" class="form-control pull-right" ng-model="patientconfirmed" ng-change="confirmedFunc()" >\
        <option value="ALL" selected="selected">ALL</option>\
        <option value="PASS" >PASS</option>\
        <option value="NOCALL" >NOCALL</option>\
        <option value=".">.</option>\
        </select>';

        return {
            scope: {
                confirmed: '='
            },
            restrict: 'AE',
            template: template
        };
    })
    .directive('customBtn', function () {

        return {
            restrict: 'C', // Notice the C for "class" restriction
            template: '<h1>Foobar</h1>'
        };
    });





