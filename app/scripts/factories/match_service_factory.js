/**
 * Created by hendrikssonm on 7/26/16.
 */
angular.module('matchbox.service', [])
    .service('sharedCliaProperties', function () {
        var property = 'mocha';

        return {
            getProperty: function () {
                return property;
            },
            setProperty: function(value) {
                property = value;
            }
        };
    })
    .service('sharedCliaArray', function () {
        var array = [];

        return {
            getProperty: function () {
                return array;
            },
            setProperty: function(value) {
                array = value;
            }
        };
    });