(function () {
    'use strict';

    angular.module('d3', ['d3module', 'ui.bootstrap'])
        // .directive('d3Popover', d3Popover)
        .directive('d3CnvChart', cnvChart);

    cnvChart.$inject = ['d3service', '$log', '$timeout', '$http', '$window', 'matchApi'];

    function d3Popover($scope, $sce) {

        console.log("----> RUN")

        $scope.dynamicPopover = {
            content: 'Hello, World!',
            templateUrl: 'myPopoverTemplate.html',
            title: 'Title'
        };

        $scope.placement = {
            options: [
                'top',
                'top-left',
                'top-right',
                'bottom',
                'bottom-left',
                'bottom-right',
                'left',
                'left-top',
                'left-bottom',
                'right',
                'right-top',
                'right-bottom'
            ],
            selected: 'top'
        };

        $scope.htmlPopover = $sce.trustAsHtml('<b style="color: red">I can</b> have <div class="label label-success">HTML</div> content');
    }

    function cnvChart(d3Service, $log, $timeout, $http, $window, matchApi) {
        return {
            restrict: 'EA',
            scope: {},
            link: link
        }

        function link(scope, iElement, iAttrs) {
            var tooltip = d3.select("body")
                .append("div")
                .attr("class", "tooltip")
                .style("opacity", 0)

                .style("position", "absolute")

                .style("width", "140px")
                .style("height", "28px")
                .style("padding", "2px")
                // .style("background", "lightsteelblue")
                .style("border", "1px")
                .style("text-align", "left")
                .style("font-size", "12px");

            scope.text = iAttrs["d3CnvChart"];
            scope.chartDataUrl = iAttrs["chartDataUrl"];

            // on window resize, re-render d3 canvas
            $window.onresize = function () {
                return scope.$apply();
            };

            scope.$watch(
                function () {
                    return angular.element($window)[0].innerWidth;
                }, function () {
                    return scope.render(scope);
                }
            );

            scope.render = function (scope) {
                d3Service.d3().then(function (d3) {
                    $timeout(function () {

                        d3Service.boxify(d3);

                        var margin = { top: 45, right: 55, bottom: 100, left: 50 }; //TODO: move to driective's paramaters

                        var color = function (d) {
                            return (d === 1 ? 'red' : (d === 2 ? 'green' : 'teal'))
                        };

                        var mouseOver = function (d) {
                            return (d === 1 ? 'red' : (d === 2 ? 'green' : 'teal'))
                        };

                        function execute() {
                            $log.debug('Loading CNV data from ' + scope.chartDataUrl);
                            matchApi
                                .loadCnvChartData(scope.chartDataUrl)
                                .then(draw, handleError);
                        }

                        function handleError(error) {
                            $log.error('Error while loading CNV chart data. Fallback to mock data.');
                            $log.error(error);
                            matchApi
                                .cnvChartData(scope.text)
                                .then(draw, function(error){
                                    $log.error('Unable to load mock data', error);
                                });
                        }

                        function draw(response) {
                            var data = response.data;
                            var genes = [];
                            var previous = 0;
                            var chromosomes = [];
                            var geneslot = [];
                            var screenwidth = $(iElement).parent().width();
                            var labels = true; // show the text labels beside individual boxplots?
                            //var margin = {top: 45, right: 55, bottom: 100, left: 50};
                            var width = screenwidth - margin.left - margin.right;
                            var height = 400 - margin.top - margin.bottom;
                            var min = 0;
                            var lowest = data.parsedVCFGenes[0].values[0];
                            var max = 0;
                            var color = "";
                            var highest = 0;
                            var mapd = data.mapd;
                            var cellularity = data.cellularity;
                            var filename = data.filename;
                            var d3data = [];
                            var tvcVersion = data.tvcVersion;

                            var tsg_genes = [];

                            //Generate gene values for processing
                            $.each(data.parsedVCFGenes, function (index, value) {
                                var tsg = value.tsgGene;
                                var cp = value.rawCopyNumber;
                                var gene = value.gene;
                                var chr = value.chromosome;
                                var pos = value.position;
                                var cis = value.cis;

                                if (tsg === true) {
                                    tsg_genes.push(gene)
                                }

                                var gene_chrom = [gene, chr, pos, cp, cis[0], cis[1]];
                                genes.push(gene_chrom);
                            });

                            // Running the Genes
                            for (var i = 0; i < genes.length; i++) {
                                d3data[i] = [];
                                d3data[i][0] = [genes[i][0], genes[i][1]];
                                d3data[i][1] = [0]; //put in a dummy 0 to avoid empty data for non-matched genes
                            }

                            for (var i = 0; i < data.parsedVCFGenes.length; i++) {
                                var currentGene = data.parsedVCFGenes[i].gene;
                                for (var geneMatchCounter = 0; geneMatchCounter < d3data.length; geneMatchCounter++) {
                                    if (d3data[geneMatchCounter][0][0] === currentGene) { // add values to the row that has the matching gene already
                                        d3data[geneMatchCounter][1].pop(); // throw out dummy data
                                        for (var j = 0; j < data.parsedVCFGenes[i].values.length; j++) {
                                            d3data[geneMatchCounter][1].push(data.parsedVCFGenes[i].values[j]);
                                            if (data.parsedVCFGenes[i].values[j] > highest) { highest = data.parsedVCFGenes[i].values[j] }
                                            if (data.parsedVCFGenes[i].values[j] < lowest) { lowest = data.parsedVCFGenes[i].values[j] }
                                        }
                                        break;
                                    }
                                }
                            }

                            //Count same chromosmes
                            var obj = {};
                            for (var i = 0, j = genes.length; i < j; i++) {
                                obj[genes[i][1]] = (obj[genes[i][1]] || 0) + 1;
                            }

                            // Running the Genes
                            //Customize height and placement of horizontal lines based on highest mapped element
                            var rank = 7; //Rank for MAX values
                            max = +highest + +lowest; //make range gap above the highest the same as below the lowest
                            if (max <= rank) {
                                max = max + (7.5 - max);
                            }

                            if (max < 5) {
                                height = 400 - margin.top - margin.bottom;
                                color = 'yellow';
                            } else if (max < rank) {
                                height = 500 - margin.top - margin.bottom;
                                color = 'green';
                            } else if (max < 9) {
                                height = 600 - margin.top - margin.bottom;
                                color = 'purple';
                            } else {
                                height = 700 - margin.top - margin.bottom;
                            }

                            var line1 = (height - (height / max)) + margin.top;
                            var line2 = (height - ((height / max) * 2)) + margin.top;
                            var line7 = (height - ((height / max) * rank)) + margin.top;


                            //Build the box
                            var chart = d3.box()
                                .whiskers(iqr(1.5))
                                .height(height)
                                .domain([min, max])
                                .showLabels(labels);

                            // remove all previous items before render
                            d3.select(iElement[0]).selectAll("*").remove();

                            var svg = d3.select(iElement[0])
                                .append("svg")
                                .attr("id", "dbox")
                                .attr("width", width + margin.left + margin.right)
                                .attr("height", height + margin.top + margin.bottom)
                                .attr("class", "box")

                                .append("g")
                                .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
                                ;

                            var pad = 0.3;
                            var lin = 0.6;

                            // the x-axis Gene
                            var x = d3.scale.ordinal()
                                .domain(d3data.map(function (d) {
                                    return d[0]
                                }))
                                .rangeBands([0, width], 0.6, 0.3);

                            var xAxis = d3.svg.axis()
                                .scale(x)
                                .orient("bottom")
                                .tickSize(1);

                            // the y-axis Copy Number
                            var y = d3.scale.linear()
                                .domain([min, max])
                                .range([height + margin.top, 0 + margin.top]);

                            var yAxis = d3.svg.axis()
                                .scale(y)
                                .orient("left")
                                .tickSize(1);

                            var prevchr = "";
                            var px = "";
                            var arrayx = [];

                            // draw the boxplots
                            svg.selectAll(".box")
                                .data(d3data)
                                .enter().append("g")
                                //.style("fill", "red")
                                .attr("transform", function (d) {
                                    return "translate(" + x(d[0]) + "," + margin.top + ")";
                                })
                                .attr("id", function (d) {
                                    var id = d[0][0];
                                    return id;
                                })
                                .attr("x", function (d) {
                                    var lx;
                                    var t = d3.transform(d3.select(this).attr("transform")),
                                        lx = t.translate[0];
                                    if (px !== d[0][1]) {
                                        px = d[0][1];
                                        arrayx.push([px, lx]);
                                    }
                                })
                                .attr("data", function (d) {
                                    var data = d[0][1];

                                    if (prevchr !== data) {
                                        prevchr = data;
                                        return "start_" + data;
                                    }
                                    else {
                                        return data;
                                    }
                                })
                                .call(chart.width(x.rangeBand()))
                                .on('mouseover', function(d) {
                                    var label = jQuery.makeArray( d[0] );
                                    var header = label[0];
                                    var chr = label[1];
                                    var color = "darkgreen";

                                    var array = jQuery.makeArray( d[1] );
                                    var cn = array[0];
                                    var ci05 = array[1];
                                    var ci95 = array[2];

                                    if(jQuery.inArray(header, tsg_genes) !== -1){color='crimson';}

                                    tooltip.transition().duration(0)
                                    tooltip.html(
                                        '<ul class="list-group no-bullets" style="background-color: white;">' +
                                                '<li class="nav-header navbar-light">' +
                                                '<a style="color:white; padding: 10px; background-color: ' + color + ' ">' + header + '</a>' +
                                                '</li>' +
                                            '<li class="list-group-item" style="width:100%;">CHR: ' + chr + '</li>' +
                                            '<li class="list-group-item" style="width:100%;">CN: ' + cn + '</li>' +
                                            '<li class="list-group-item" style="width:100%;">CI 5%: ' + ci05 + '</li>' +
                                            '<li class="list-group-item" style="width:100%;">CI 95%: ' + ci95 + '</li>' +
                                        '</ul>'
                                    )
                                        .style("opacity", 1)
                                        .style("left", (d3.event.pageX - 75) + "px")
                                        .style("top", (d3.event.pageY - 250) + "px");
                                })
                                .on("mouseout", function(d) {
                                    tooltip.transition().duration(0)
                                        .style("opacity", 0);
                                });

                            //Set cnv chart location and render position
                            var svg_height = height + 200;
                            var svg_width = width + 100;

                                //responsive SVG needs these 2 attributes and no width and height attr
                            svg.attr("viewBox", "0 0 " + svg_width + " " + svg_height)
                                //class to make it responsive
                                .classed("svg-content-responsive", true);

                            //Hover overs
                            $.each(genes, function (index, value) {
                                var gname = value;
                                var tid = "t_" + value[0];
                                var lid = "l_" + value[0];
                                var mainid = value[0];
                                var chr = value[1].substring(3, value[1].length);
                                var pos = value[2];
                                var cn = value[3];
                                var tmp = value[4];
                                var ci05 = tmp.substring(tmp.indexOf(':')+1, tmp.length);
                                tmp = value[5];
                                var ci95 = tmp.substring(tmp.indexOf(':')+1, tmp.length);
                                var info, line;
                                var tl = [];
                                var label = "";

                                //Is gene red gene?
                                if ($.inArray(mainid, tsg_genes) !== -1) {
                                    d3.selectAll("g").select("#" + mainid)
                                        .select('rect')
                                        .style("fill", "Crimson");
                                }
                                else {
                                    d3.selectAll("g").select("#" + mainid)
                                        .select('rect')
                                        .style("fill", "Green");
                                }

                                //// when the input range changes update the circle
                                d3.select("#" + mainid).on("click", function () {

                                    if ($.inArray(mainid, tsg_genes) !== -1) {
                                        label = '<span class="label label-danger">' + mainid + '</span>';
                                    }
                                    else {
                                        label = '<span class="label label-primary">' + mainid + '</span>';
                                    }
                                    var dir = 'auto top';
                                    var locY = d3.select(this).select("rect").attr("y");
                                    var t = d3.transform(d3.select(this).attr("transform"));
                                    var locX = t.translate[0];

                                    console.log("START TIP")
                                    $(this).popover("show");

                                });

                                // when the input range changes update the circle
                                // d3.select("#" + mainid).on("mouseout", function () {
                                //     $(this).popover('destroy');
                                // });
                            });

                            // add a title
                            svg.append("text")
                                .attr("x", (width / 2))
                                .attr("y", 0 + (margin.top / 2))
                                .attr("text-anchor", "middle")
                                .style("font-size", "15px")
                                .text(" MAPD:" + mapd + " Cellularity:" + cellularity + " TorrentVariantCaller Version: " + tvcVersion);

                            // draw y axis Copy Number
                            svg.append("g")
                                .attr("class", "y axis")
                                .call(yAxis)
                                .append("text") // and text1
                                .attr("transform", "rotate(-90)")
                                .attr("y", -45)
                                .attr("x", -Math.abs(height / 2 + margin.top))
                                .attr("dy", ".71em")
                                .style("text-anchor", "middle")
                                .style("font-size", "16px")
                                .text("Copy Number");

                            // draw x axis  Gene
                            svg.append("g")
                                .attr("class", "x axis")
                                .attr("transform", "translate(0," + (height + margin.top) + ")")
                                .call(xAxis)
                                .selectAll("text")
                                .style("text-anchor", "end")
                                .style("font-size", "9px")
                                .attr("dx", "-.8em")
                                .attr("dy", "-.35em")
                                .attr("transform", function (d) {
                                    return "rotate(-90)"
                                })
                                .text(function (d) {
                                    return d[0];
                                });

                            // draw horizontal line at 2 for grouping clarity
                            svg.append("svg:line")
                                .attr("class", 'd3-dp-line')
                                .attr("x1", 0)
                                .attr("y1", line2)
                                .attr("x2", width)
                                .attr("y2", line2)
                                .style("stroke-dasharray", ("3, 3"))
                                .style("stroke-opacity", 0.9)
                                .style("stroke", "red");

                            // draw horizontal line at 1 for bounds
                            svg.append("svg:line")
                                .attr("class", 'd3-dp-line')
                                .attr("x1", 0)
                                .attr("y1", line1)
                                .attr("x2", width)
                                .attr("y2", line1)
                                .style("stroke-opacity", 0.9)
                                .style("stroke", "blue");

                            // draw horizontal line at 4 for bounds
                            svg.append("svg:line")
                                .attr("class", 'd3-dp-line')
                                .attr("x1", 0)
                                .attr("y1", line7)
                                .attr("x2", width)
                                .attr("y2", line7)
                                .style("stroke-opacity", 0.9)
                                .style("stroke", "red");

                            // the legend
                            var colors = { "Tumor suppressor genes": "Crimson", "Oncogenes": "Green" };

                            var keys = []
                            var color = d3.scale.category10();
                            for (var key in colors) { keys.push(key); }

                            var legend = svg.selectAll(".legend")
                                .data(keys.slice())
                                .enter().append("g")
                                .attr("class", "legend")
                                .attr("transform", function (d, i) { return "translate(0," + i * 20 + ")"; });

                            legend.append("rect")
                                .attr("x", width - 18)
                                .attr("y", -25)
                                .attr("width", 18)
                                .attr("height", 18)
                                .style("fill", function (d) { return colors[d]; });

                            legend.append("text")
                                .attr("x", width - 24)
                                .attr("y", -18)
                                .attr("dy", ".35em")
                                .style("text-anchor", "end")
                                .style({
                                    'text-anchor': 'end',
                                    'visibility': 'visible',
                                    'font-size': '14px',
                                    'font-weight': 'bold',
                                    'fill': 'black'
                                })
                                .text(function (d) { return d });

                            // Running the Genes name on x-axis
                            var wscale = width / d3data.length;
                            var group = "";
                            var location = "";
                            var prevLocation = 0;
                            for (var i = 0; i < genes.length; i++) {
                                location = (wscale * (i * 1));
                                if (group !== genes[i][1]) {
                                    group = genes[i][1];

                                    drawVertLine(prevLocation, group);
                                    prevLocation += 1;
                                }
                            }

                            // Returns a function to compute the interquartile range.
                            function iqr(k) {

                                return function (d, i) {
                                    var q1 = d.quartiles[0],
                                        q3 = d.quartiles[2],
                                        iqr = (q3 - q1) * k,
                                        i = -1,
                                        j = d.length;
                                    while (d[++i] < q1 - iqr);
                                    while (d[--j] > q3 + iqr);

                                    return [i, j];
                                };
                            }

                            //Gene value on horizontal x-axis
                            function drawVertLine(label, group) {
                                var vline;
                                if (label === 0) { label = ""; }

                                //Read chr value
                                if(group.indexOf("chr") == 0){
                                    geneslot.push(group.substr(3, group.length));
                                }
                                else{
                                    geneslot.push(group);
                                }

                                $.each(arrayx, function (index, value) {

                                    if (value[0] === group) {
                                        vline = value[1] - 5;
                                    }
                                });

                                var slots = geneslot.length;
                                var keys = Object.keys(obj).length;

                                if (label === 0) {
                                    label = "";
                                    location = 0;
                                    label = geneslot[0];
                                }
                                else {
                                    label = geneslot[geneslot.length - 2];
                                    location = (previous + (vline - previous));

                                    if (typeof label !== 'undefined') {

                                        svg.append("svg:line")
                                            .attr("class", 'd3-dp-line')
                                            .attr("x1", location)
                                            .attr("y1", (margin.top))
                                            .attr("x2", location)
                                            .attr("y2", (height + margin.top))
                                            .style("stroke-dasharray", ("3, 3"))
                                            .style("stroke-opacity", 0.9)
                                            .style("stroke-width", 1)
                                            .style("stroke", "grey");

                                        svg.append("text")
                                            .attr("x", previous + ((location - previous) / 2))
                                            .attr("y", height + (margin.top) - 2)
                                            .attr("text-anchor", "middle")
                                            .style("font-size", "14px")
                                            .style("fill", "red")
                                            .text(label);
                                    }
                                }

                                //Check the last value
                                if (slots === keys) {
                                    label = geneslot[geneslot.length - 1];
                                    location = (previous + (vline - previous)) + 10;

                                    svg.append("text")
                                        .attr("x", location)
                                        .attr("y", height + (margin.top) - 2)
                                        .attr("text-anchor", "middle")
                                        .style("font-size", "14px")
                                        .style("fill", "red")
                                        .text(label);
                                }
                                previous = location;
                            }
                        }

                        // popoverexecute();

                        execute();

                    }, 100);
                });
            };
        }

        // function alink(scope, iElement, iAttrs) {
        //     scope.text = iAttrs["d3Popover"];
        //
        //     console.log("START--> " + JSON.stringify(scope.text))
        //     // return scope.text;
        //
        // }

        // function linkSample(scope, iElement, iAttrs) {
        //     d3Service.d3().then(function (d3) {
        //         $timeout(function () {
        //
        //             var svg = d3.select(iElement[0])
        //                 .append("svg")
        //                 .attr("width", "100%");
        //
        //             // on window resize, re-render d3 canvas
        //             $window.onresize = function () {
        //                 return scope.$apply();
        //             };
        //
        //             scope.$watch(function () {
        //                 return angular.element($window)[0].innerWidth;
        //             }, function () {
        //                 return scope.render(scope.data);
        //             }
        //             );
        //
        //             scope.$watch(function () {
        //                 return iElement.offset().top
        //             }, function (pos) {
        //                 $log.debug(pos)
        //                 // if (outOfBorder) {
        //                 //   $log.debug('invisible')
        //                 // } else {
        //                 //   $log.debug('visible')
        //                 // }
        //             });
        //
        //             scope.$watch(function () {
        //                 return iElement.offset().left
        //             }, function (pos) {
        //                 $log.debug(pos)
        //                 // if (outOfBorder) {
        //                 //   $log.debug('invisible')
        //                 // } else {
        //                 //   $log.debug('visible')
        //                 // }
        //             });
        //
        //             // watch for data changes and re-render
        //             scope.$watch('data', function (newVals, oldVals) {
        //                 return scope.render(newVals);
        //             }, true);
        //
        //             // define render function
        //             scope.render = function (data) {
        //                 if (iElement.offset().top <= 0 || iElement.offset().left <= 0)
        //                     return;
        //
        //                 // remove all previous items before render
        //                 svg.selectAll("*").remove();
        //
        //                 // setup variables
        //                 var width, height, max;
        //                 width = d3.select(iElement[0])[0][0].offsetWidth - 20;
        //                 // 20 is for margins and can be changed
        //                 height = scope.data.length * 35;
        //                 // 35 = 30(bar height) + 5(margin between bars)
        //                 max = 98;
        //                 // this can also be found dynamically when the data is not static
        //                 // max = Math.max.apply(Math, _.map(data, ((val)-> val.count)))
        //
        //                 // set the height based on the calculations above
        //                 svg.attr('height', height);
        //
        //                 //create the rectangles for the bar chart
        //                 svg.selectAll("rect")
        //                     .data(data)
        //                     .enter()
        //                     .append("rect")
        //                     .on("click", function (d, i) { return scope.onClick({ item: d }); })
        //                     .attr("height", 30) // height of each bar
        //                     .attr("width", 0) // initial width of 0 for transition
        //                     .attr("x", 10) // half of the 20 side margin specified above
        //                     .attr("y", function (d, i) {
        //                         return i * 35;
        //                     }) // height + margin between bars
        //                     .transition()
        //                     .duration(400) // time of duration
        //                     .attr("width", function (d) {
        //                         return d.score / (max / width);
        //                     }); // width based on scale
        //
        //                 svg.selectAll("text")
        //                     .data(data)
        //                     .enter()
        //                     .append("text")
        //                     .attr("fill", "#fff")
        //                     .attr("y", function (d, i) { return i * 35 + 22; })
        //                     .attr("x", 15)
        //                     .text(function (d) { return d[scope.label]; });
        //
        //             };
        //
        //         }, 100);
        //
        //     })
        // }

    }



} ());
