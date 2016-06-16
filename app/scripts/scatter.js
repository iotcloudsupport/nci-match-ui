/**
 * Created by hendrikssonm on 6/8/16.
 */

var parseTime = "";


function histogramPlot(){

    var n = 4, // number of layers
        m = 38, // number of samples per layer
        stack = d3.layout.stack(),
        layers = stack(d3.range(n).map(function() { return bumpLayer(m, .1); })),
        yGroupMax = d3.max(layers, function(layer) { return d3.max(layer, function(d) { return d.y; }); }),
        yStackMax = d3.max(layers, function(layer) { return d3.max(layer, function(d) { return d.y0 + d.y; }); });

    var margin = {top: 150, right: 0, bottom: 30, left: 30},
        width = 900 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    var svg_height = height + 200;
    var svg_width = width + 100;

    var x = d3.scale.ordinal()
        .domain(d3.range(m))
        .rangeRoundBands([0, width], .08);

    var y = d3.scale.linear()
        .domain([0, yStackMax])
        .range([height, 0]);

    var color = d3.scale.linear()
        .domain([0, n - 1])
        .range(["#aad", "#556"]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .tickSize(0)
        .tickPadding(6)
        .orient("bottom");

    //Render the svg box to correct browser changes
    d3.select("svg#scatterBox")
        //responsive SVG needs these 2 attributes and no width and height attr
        .attr("viewBox", "0 0 " + svg_width + " " + svg_height)
        //class to make it responsive
        .classed("svg-content-responsive", true);

    var svg = d3.select("#scatterBox")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var layer = svg.selectAll(".layer")
        .data(layers)
        .enter().append("g")
        .attr("class", "layer")
        .style("fill", function(d, i) { return color(i); });

    var rect = layer.selectAll("rect")
        .data(function(d) { return d; })
        .enter().append("rect")
        .attr("x", function(d) { return x(d.x); })
        .attr("y", height)
        .attr("width", x.rangeBand())
        .attr("height", 0);

    rect.transition()
        .delay(function(d, i) { return i * 10; })
        .attr("y", function(d) { return y(d.y0 + d.y); })
        .attr("height", function(d) { return y(d.y0) - y(d.y0 + d.y); });

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    d3.selectAll("input").on("change", change);


    //// when the input range changes update the circle
    d3.select("#scatterBox").on("mouseover", function() {
        // if($.inArray(mainid, tsg_genes) !== -1){
        //     label = '<span class="label label-danger">d</span>';
        // }
        // else{
        //     label = '<span class="label label-success">a</span>';
        // }
        var dir = 'top';
        var locY = d3.select(this).select("rect").attr("y");
        var t = d3.transform(d3.select(this).attr("transform"));
        var locX = t.translate[0];

        // $(this).popover({
        //     trigger: 'hover',
        //     html: 'true',
        //     title: function(){
        //         return "TEST";
        //     },
        //     placement: dir,
        //     position: [locX, locY],
        //     container: 'body',
        //     content: function(){
        //         return  '<ul class="list-group">' +
        //             '<li class="list-group-item" style="width:100%;">TEST</li>'
        //             // '<li class="list-group-item" style="width:100%;">' + cn + '</li>' +
        //             // '<li class="list-group-item" style="width:100%;">CI 5%: ' + ci05 + '</li>' +
        //             // '<li class="list-group-item" style="width:100%;">CI 95%: ' + ci95 + '</li>' +
        //
        //
        //             '</ul>';
        //     }
        // });
        // $(this).popover("show");
    });



    var timeout = setTimeout(function() {
        d3.select("input[value=\"grouped\"]").property("checked", true).each(change);
    }, 2000);

    function change() {
        clearTimeout(timeout);
        if (this.value === "grouped") transitionGrouped();
        else transitionStacked();
    }

    function transitionGrouped() {
        y.domain([0, yGroupMax]);

        rect.transition()
            .duration(500)
            .delay(function(d, i) { return i * 10; })
            .attr("x", function(d, i, j) { return x(d.x) + x.rangeBand() / n * j; })
            .attr("width", x.rangeBand() / n)
            .transition()
            .attr("y", function(d) { return y(d.y); })
            .attr("height", function(d) { return height - y(d.y); });
    }

    function transitionStacked() {
        y.domain([0, yStackMax]);

        rect.transition()
            .duration(500)
            .delay(function(d, i) { return i * 10; })
            .attr("y", function(d) { return y(d.y0 + d.y); })
            .attr("height", function(d) { return y(d.y0) - y(d.y0 + d.y); })
            .transition()
            .attr("x", function(d) { return x(d.x); })
            .attr("width", x.rangeBand());
    }

// Inspired by Lee Byron's test data generator.
    function bumpLayer(n, o) {

        function bump(a) {
            var x = 1 / (.1 + Math.random()),
                y = 2 * Math.random() - .5,
                z = 10 / (.1 + Math.random());
            for (var i = 0; i < n; i++) {
                var w = (i / n - y) * z;
                a[i] += x * Math.exp(-w * w);
            }
        }

        var a = [], i;
        for (i = 0; i < n; ++i) a[i] = o + o * Math.random();
        for (i = 0; i < 5; ++i) bump(a);
        return a.map(function(d, i) { return {x: i, y: Math.max(0, d)}; });
    }

}


function samplePlot(data){

    // alert(JSON.stringify(data))

    var n = 4, // number of layers
        m = 38, // number of samples per layer
        stack = d3.layout.stack(),
        layers = stack(d3.range(n).map(function() { return bumpLayer(m, .1); })),
        yGroupMax = d3.max(layers, function(layer) { return d3.max(layer, function(d) { return d.y; }); }),
        yStackMax = d3.max(layers, function(layer) { return d3.max(layer, function(d) { return d.y0 + d.y; }); });

    var margin = {top: 150, right: 0, bottom: 30, left: 30},
        width = 900 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    var svg_height = height + 200;
    var svg_width = width + 100;

    var x = d3.scale.ordinal()
        .domain(d3.range(m))
        .rangeRoundBands([0, width], .08);

    var y = d3.scale.linear()
        .domain([0, yStackMax])
        .range([height, 0]);

    var color = d3.scale.linear()
        .domain([0, n - 1])
        .range(["#aad", "#556"]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .tickSize(0)
        .tickPadding(6)
        .orient("bottom");

    //Render the svg box to correct browser changes
    d3.select("svg#scatterBox")
        //responsive SVG needs these 2 attributes and no width and height attr
        .attr("viewBox", "0 0 " + svg_width + " " + svg_height)
        //class to make it responsive
        .classed("svg-content-responsive", true);

    var svg = d3.select("#scatterBox")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var layer = svg.selectAll(".layer")
        .data(layers)
        .enter().append("g")
        .attr("class", "layer")
        .style("fill", function(d, i) { return color(i); });

    var rect = layer.selectAll("rect")
        .data(function(d) { return d; })
        .enter().append("rect")
        .attr("x", function(d) { return x(d.x); })
        .attr("y", height)
        .attr("width", x.rangeBand())
        .attr("height", 0);

    rect.transition()
        .delay(function(d, i) { return i * 10; })
        .attr("y", function(d) { return y(d.y0 + d.y); })
        .attr("height", function(d) { return y(d.y0) - y(d.y0 + d.y); });

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    d3.selectAll("input").on("change", change);


    //// when the input range changes update the circle
    d3.select("#scatterBox").on("mouseover", function() {
        // if($.inArray(mainid, tsg_genes) !== -1){
        //     label = '<span class="label label-danger">d</span>';
        // }
        // else{
        //     label = '<span class="label label-success">a</span>';
        // }
        var dir = 'top';
        var locY = d3.select(this).select("rect").attr("y");
        var t = d3.transform(d3.select(this).attr("transform"));
        var locX = t.translate[0];

        // $(this).popover({
        //     trigger: 'hover',
        //     html: 'true',
        //     title: function(){
        //         return "TEST";
        //     },
        //     placement: dir,
        //     position: [locX, locY],
        //     container: 'body',
        //     content: function(){
        //         return  '<ul class="list-group">' +
        //             '<li class="list-group-item" style="width:100%;">TEST</li>'
        //             // '<li class="list-group-item" style="width:100%;">' + cn + '</li>' +
        //             // '<li class="list-group-item" style="width:100%;">CI 5%: ' + ci05 + '</li>' +
        //             // '<li class="list-group-item" style="width:100%;">CI 95%: ' + ci95 + '</li>' +
        //
        //
        //             '</ul>';
        //     }
        // });
        // $(this).popover("show");
    });



    var timeout = setTimeout(function() {
        d3.select("input[value=\"grouped\"]").property("checked", true).each(change);
    }, 2000);

    function change() {
        clearTimeout(timeout);
        if (this.value === "grouped") transitionGrouped();
        else transitionStacked();
    }

    function transitionGrouped() {
        y.domain([0, yGroupMax]);

        rect.transition()
            .duration(500)
            .delay(function(d, i) { return i * 10; })
            .attr("x", function(d, i, j) { return x(d.x) + x.rangeBand() / n * j; })
            .attr("width", x.rangeBand() / n)
            .transition()
            .attr("y", function(d) { return y(d.y); })
            .attr("height", function(d) { return height - y(d.y); });
    }

    function transitionStacked() {
        y.domain([0, yStackMax]);

        rect.transition()
            .duration(500)
            .delay(function(d, i) { return i * 10; })
            .attr("y", function(d) { return y(d.y0 + d.y); })
            .attr("height", function(d) { return y(d.y0) - y(d.y0 + d.y); })
            .transition()
            .attr("x", function(d) { return x(d.x); })
            .attr("width", x.rangeBand());
    }

// Inspired by Lee Byron's test data generator.
    function bumpLayer(n, o) {

        function bump(a) {
            var x = 1 / (.1 + Math.random()),
                y = 2 * Math.random() - .5,
                z = 10 / (.1 + Math.random());
            for (var i = 0; i < n; i++) {
                var w = (i / n - y) * z;
                a[i] += x * Math.exp(-w * w);
            }
        }

        var a = [], i;
        for (i = 0; i < n; ++i) a[i] = o + o * Math.random();
        for (i = 0; i < 5; ++i) bump(a);
        return a.map(function(d, i) { return {x: i, y: Math.max(0, d)}; });
    }

}


function piePlot(){


    var w = 350;
    var h = 350;
    var r = h/2;
    var color = d3.scale.category20c();

    var svg_height = h + 20;
    var svg_width = w + 20;

    var data = [
        {"label":"Category A", "value":20},
        {"label":"Category B", "value":50},
        {"label":"Category C", "value":30},
        {"label":"Category A", "value":20},
        {"label":"Category B", "value":50},
        {"label":"Category C", "value":30},
        {"label":"Category A", "value":20},
        {"label":"Category B", "value":50},
        {"label":"Category C", "value":15}];

    //Render the svg box to correct browser changes
    d3.select("svg#pieBox")
        //responsive SVG needs these 2 attributes and no width and height attr
        .attr("viewBox", "0 0 " + svg_width + " " + svg_height)
        //class to make it responsive
        .classed("svg-content-responsive", true);

    var vis = d3.select('#pieBox')
        .append("svg:svg")
        .data([data])
        .attr("width", w)
        .attr("height", h)
        .append("svg:g")
        .attr("transform", "translate(" + r + "," + r + ")")
        .attr("viewBox", "0 0 300 300");

    var pie = d3.layout.pie()
        .value(function(d){return d.value;});

// declare an arc generator function
    var arc = d3.svg.arc().outerRadius(r);
    var arcOver = d3.svg.arc()
        .outerRadius(r + 2);

// select paths, use arc generator to draw
    var arcs = vis.selectAll("g.slice")
        .data(pie)
        .enter()
        .append("svg:g")
        .attr("class", "slice");

    arcs.append("svg:path")
        .attr("fill", function(d, i){
            return color(i);
        })
        .attr("d", function (d) {
            // log the result of the arc generator to show how cool it is :)
            console.log(arc(d));
            return arc(d);
        })
        .on("mouseenter", function(d) {
            d3.select(this)
                .attr("stroke","white")
                .transition()
                .duration(1000)
                .attr("d", arcOver)
                .attr("stroke-width",6);
        })
        .on("mouseleave", function(d) {
            d3.select(this).transition()
                .attr("d", arc)
                .attr("stroke","none");
        });

    // g.append("path")
    //     .attr("d", arc)
    //     .style("fill", function(d) { return d.data.color; })
    //     .append('title')
    //     .text(function(d){return d.data.value})

    //// when the input range changes update the circle
    // d3.select("#pieBox").on("mouseover", function() {
    //
    //     alert("pop")
    //     // if($.inArray(mainid, tsg_genes) !== -1){
    //     //     label = '<span class="label label-danger">'+mainid+'</span>';
    //     // }
    //     // else{
    //     //     label = '<span class="label label-success">'+mainid+'</span>';
    //     // }
    //     var dir = 'top';
    //     var locY = d3.select(this).select("rect").attr("y");
    //     var t = d3.transform(d3.select(this).attr("transform"));
    //     var locX = t.translate[0];
    //
    //     $(this).popover({
    //         trigger: 'hover',
    //         html: 'true',
    //         title: function(){
    //             return label;
    //         },
    //         placement: dir,
    //         container: 'body',
    //         content: function(){
    //             return  '<ul class="list-group">' +
    //                 '<li class="list-group-item" style="width:100%;">TEST</li>'
    //                 // '<li class="list-group-item" style="width:100%;">' + cn + '</li>' +
    //                 // '<li class="list-group-item" style="width:100%;">CI 5%: ' + ci05 + '</li>' +
    //                 // '<li class="list-group-item" style="width:100%;">CI 95%: ' + ci95 + '</li>' +
    //
    //
    //                 '</ul>';
    //         }
    //     });
    //     $(this).popover("show");
    // });

}


function circosPlot(){

// From http://mkweb.bcgsc.ca/circos/guide/tables/
    var matrix = [
        [11975,  5871, 8916, 2868],
        [ 1951, 10048, 2060, 6171],
        [ 8010, 16145, 8090, 8045],
        [ 1013,   990,  940, 6907]
    ];

    var chord = d3.layout.chord()
        .padding(.05)
        .sortSubgroups(d3.descending)
        .matrix(matrix);

    var width = 260,
        height = 200,
        innerRadius = Math.min(width, height) * .41,
        outerRadius = innerRadius * 1.1;

    var fill = d3.scale.ordinal()
        .domain(d3.range(4))
        .range(["#000000", "#FFDD89", "#957244", "#F26223"]);

    var svg = d3.select("#circosBox")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    svg.append("g").selectAll("path")
        .data(chord.groups)
        .enter().append("path")
        .style("fill", function(d) { return fill(d.index); })
        .style("stroke", function(d) { return fill(d.index); })
        .attr("d", d3.svg.arc().innerRadius(innerRadius).outerRadius(outerRadius))
        .on("mouseover", fade(.1))
        .on("mouseout", fade(1));

    var ticks = svg.append("g").selectAll("g")
        .data(chord.groups)
        .enter().append("g").selectAll("g")
        .data(groupTicks)
        .enter().append("g")
        .attr("transform", function(d) {
            return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")"
                + "translate(" + outerRadius + ",0)";
        });

    ticks.append("line")
        .attr("x1", 1)
        .attr("y1", 0)
        .attr("x2", 5)
        .attr("y2", 0)
        .style("stroke", "#000");

    ticks.append("text")
        .attr("x", 8)
        .attr("dy", ".35em")
        .attr("transform", function(d) { return d.angle > Math.PI ? "rotate(180)translate(-16)" : null; })
        .style("text-anchor", function(d) { return d.angle > Math.PI ? "end" : null; })
        .text(function(d) { return d.label; });

    svg.append("g")
        .attr("class", "chord")
        .selectAll("path")
        .data(chord.chords)
        .enter().append("path")
        .attr("d", d3.svg.chord().radius(innerRadius))
        .style("fill", function(d) { return fill(d.target.index); })
        .style("opacity", 1);

// Returns an array of tick angles and labels, given a group.
    function groupTicks(d) {
        var k = (d.endAngle - d.startAngle) / d.value;
        return d3.range(0, d.value, 1000).map(function(v, i) {
            return {
                angle: v * k + d.startAngle,
                label: i % 5 ? null : v / 1000 + "k"
            };
        });
    }

// Returns an event handler for fading a given chord group.
    function fade(opacity) {
        return function(g, i) {
            svg.selectAll(".chord path")
                .filter(function(d) { return d.source.index != i && d.target.index != i; })
                .transition()
                .style("opacity", opacity);
        };
    }
}





// function piePlot2(){
//
//     var width = 260,
//         height = 200,
//         radius = Math.min(width, height) / 2;
//
//     var color = d3.scale.ordinal()
//         .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
//
//     var arc = d3.svg.arc()
//         .outerRadius(radius - 10)
//         .innerRadius(0);
//
//     var labelArc = d3.svg.arc()
//         .outerRadius(radius - 40)
//         .innerRadius(radius - 40);
//
//     var pie = d3.layout.pie()
//         .sort(null)
//         .value(function(d) { return d.population; });
//
//     var svg = d3.select("#pieBox")
//         .append("svg")
//         .attr("width", width)
//         .attr("height", height)
//         .append("g")
//         .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
//
//     d3.csv("scripts/tweets.csv", type, function(error, data) {
//         if (error) throw error;
//
//         var g = svg.selectAll(".arc")
//             .data(pie(data))
//             .enter().append("g")
//             .attr("class", "arc");
//
//         g.append("path")
//             .attr("d", arc)
//             .style("fill", function(d) { return color(d.data.age); });
//
//         g.append("text")
//             .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
//             .attr("dy", ".35em")
//             .text(function(d) { return d.data.age; });
//     });
//
//     function type(d) {
//         d.population = +d.population;
//         return d;
//     }
//
// }




// function piePlot3(){
//
//     var w = 300,                        //width
//         h = 300,                            //height
//         r = 100,                            //radius
//         color = d3.scale.category20c();     //builtin range of colors
//
//     data = [{"label":"one", "value":20},
//         {"label":"two", "value":50},
//         {"label":"three", "value":30}];
//
//     var vis = d3.select("#pieBox")
//         .append("svg:svg")              //create the SVG element inside the <body>
//         .data([data])                   //associate our data with the document
//         .attr("width", w)           //set the width and height of our visualization (these will be attributes of the <svg> tag
//         .attr("height", h)
//         .append("svg:g")                //make a group to hold our pie chart
//         .attr("transform", "translate(" + r + "," + r + ")");   //move the center of the pie chart from 0, 0 to radius, radius
//
//     var arc = d3.svg.arc()              //this will create <path> elements for us using arc data
//         .outerRadius(r);
//
//     var pie = d3.layout.pie()           //this will create arc data for us given a list of values
//         .value(function(d) { return d.value; });    //we must tell it out to access the value of each element in our data array
//
//     var arcs = vis.selectAll("g.slice")     //this selects all <g> elements with class slice (there aren't any yet)
//         .data(pie)                          //associate the generated pie data (an array of arcs, each having startAngle, endAngle and value properties)
//         .enter()                            //this will create <g> elements for every "extra" data element that should be associated with a selection. The result is creating a <g> for every object in the data array
//         .append("svg:g")                //create a group to hold each slice (we will have a <path> and a <text> element associated with each slice)
//         .attr("class", "slice");    //allow us to style things in the slices (like text)
//
//     arcs.append("svg:path")
//         .attr("fill", function(d, i) { return color(i); } ) //set the color for each slice to be chosen from the color function defined above
//         .attr("d", arc);                                    //this creates the actual SVG path using the associated data (pie) with the arc drawing function
//
//     arcs.append("svg:text")                                     //add a label to each slice
//         .attr("transform", function(d) {                    //set the label's origin to the center of the arc
//             //we have to make sure to set these before calling arc.centroid
//             d.innerRadius = 0;
//             d.outerRadius = r;
//             return "translate(" + arc.centroid(d) + ")";        //this gives us a pair of coordinates like [50, 50]
//         })
//         .attr("text-anchor", "middle")                          //center the text on it's origin
//         .text(function(d, i) { return data[i].value; });      //get the label from our original data array
//
//
// }

// *** Version 5 *** //
// function scatterPlot() {
//
//
//      parseTime = d3.time.format.utc("%H:%M").parse,
//         midnight = parseTime("00:00");
//
//     var margin = {top: 30, right: 30, bottom: 30, left: 30},
//         width = 960 - margin.left - margin.right,
//         height = 500 - margin.top - margin.bottom;
//
//     var x = d3.time.scale.utc()
//         .domain([midnight, d3.time.day.utc.offset(midnight, 1)])
//         .range([0, width]);
//
//     var y = d3.scale.linear()
//         .range([height, 0]);
//
//     var svg = d3.select("#scatterBox")
//         .append("svg")
//         .attr("width", width + margin.left + margin.right)
//         .attr("height", height + margin.top + margin.bottom)
//         .attr("class", "box")
//         .append("g")
//         .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
//
//
//     d3.csv("scripts/tweets.csv", type, function (error, data) {
//
//         // alert(JSON.stringify(data))
//
//         if (error) throw error;
//
//         y.domain([0, d3.max(data, function (d) {
//
//
//             return d.rate;
//         })]);
//
//         svg.append("g")
//             .attr("class", "axis axis--x")
//             .attr("transform", "translate(0," + height + ")")
//             .call(d3.svg.axis()
//                 .scale(x)
//                 .orient("bottom")
//                 .tickFormat(d3.time.format.utc("%I %p")));
//
//         svg.append("g")
//             .attr("class", "dots")
//             .selectAll("path")
//             .data(data)
//             .enter().append("path")
//             .attr("transform", function (d) {
//                 return "translate(" + x(d.time) + "," + y(d.rate) + ")";
//             })
//             .attr("d", d3.svg.symbol()
//                 .size(40));
//
//         var tick = svg.append("g")
//             .attr("class", "axis axis--y")
//             .call(d3.svg.axis()
//                 .scale(y)
//                 .tickSize(-width)
//                 .orient("left"))
//             .select(".tick:last-of-type");
//
//         var title = tick.append("text")
//             .attr("dy", ".32em")
//             .text("tweets per hour");
//
//         tick.select("line")
//             .attr("x1", title.node().getBBox().width + 6);
//     });
// }


// function parseTime() {
//     var parseTime = d3.time.format.utc("%H:%M").parse,
//         midnight = parseTime("00:00");
// }

function type(d) {


    d.rate = +d.count / 327 * 60; // January 8 to November 30



    d.time = parseTime(d.time);

    // alert(JSON.stringify(d.time))

    d.time.setUTCHours((d.time.getUTCHours() + 24 - 7) % 24);



    return d;
}