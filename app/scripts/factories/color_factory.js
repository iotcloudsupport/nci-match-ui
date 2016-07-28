(function () {
    "use strict";

    angular.module('matchbox.colors', [])
        .factory('colorFactory', colorFactory);

    function colorFactory() {
        var factory = this;

        factory.colors = [
            "#1c84c6",
            "#23c6c8",
            "#f8ac59",
            "#1ab394",
            "#707070",
            "#1c84c6",
            "#23c6c8",
            "#f8ac59",
            "#1ab394",
            "#707070"
        ];

        return {
            getColor: getColor,
            getColors: getColors
        }

        function getColor(colorIndex) {
            var index;
            if (colorIndex >= factory.colors.lentgh) {
                index = colorIndex % factory.colors.lentgh;
            } else {
                index = colorIndex;
            }
            return factory.colors[index];
        }

        function getColors(numberOfColors) {
            var index;
            if (numberOfColors >= factory.colors.lentgh) {
                var repeatNumber = Math.floor(numberOfColors / factory.colors.lentgh);
                var remained = numberOfColors % factory.colors.lentgh;
                var colors = [];
                for (var i = 0; i < repeatNumber; i++) {
                    colors = colors.concat(factory.colors);
                }
                colors = colors.concat(factory.colors.slice(0, remained - 1));
                return colors;
            } else {
                return factory.colors.slice(0, numberOfColors - 1);
            }
        }
    }
} ());
