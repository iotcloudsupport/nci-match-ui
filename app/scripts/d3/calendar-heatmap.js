'use strict';

/* globals d3 */

angular.module('matchbox.calendar-heatmap', []).
    directive('calendarHeatmap', ['$window', function ($window) {

    return {
      restrict: 'E',
      scope: {
        data: '=',
        color: '=?',
        overview: '=?',
        handler: '=?'
      },
      replace: true,
      template: '<div class="calendar-heatmap"></div>',
      link: function (scope, element) {

        // Defaults
        var gutter = 5;
        var item_gutter = 1;
        var width = 1000;
        var height = 200;
        var item_size = 10;
        var label_padding = 40;
        var max_block_height = 20;
        var transition_duration = 500;
        var in_transition = false;

        // Tooltip defaults
        var tooltip_width = 250;
        var tooltip_padding = 15;

        // Initialize current overview type and history
        scope.overview = scope.overview || 'year';
        scope.history = ['year'];
        scope.selected = {};

        // Initialize svg element
        var svg = d3.select(element[0])
          .append('svg')
          .attr('class', 'svg');

        // Initialize main svg elements
        var items = svg.append('g');
        var labels = svg.append('g');
        var buttons = svg.append('g');

        // Add tooltip to the same element as main svg
        var tooltip = d3.select(element[0]).append('div')
          .attr('class', 'heatmap-tooltip')
          .style('opacity', 0);

        scope.$watch(function () {
          return element[0].clientWidth;
        }, function ( w ) {
          if ( !w ) { return; }
          width = w < 1000 ? 1000 : w;
          item_size = ((width - label_padding) / (moment().subtract(1, 'year').weeksInYear() - moment().subtract(1, 'year').week() + moment().week() + 1) - gutter);
          height = label_padding + 7 * (item_size + gutter);
          svg.attr({'width': width, 'height': height});
          if ( !!scope.data && !!scope.data[0].summary ) {
            scope.drawChart();
          }
        });

        angular.element($window).bind('resize', function () {
          scope.$apply();
        });

        // Watch for data availability
        scope.$watch('data', function (data) {

          if ( !data ) { return; }

          // Get daily summary if that was not provided
          if ( !data[0].summary ) {
            data.map(function (d) {
              var summary = d.details.reduce( function(uniques, project) {
                if ( !uniques[project.name] ) {
                  uniques[project.name] = {
                    'value': project.value,
                    'status': project.status,
                    'mid': project.mid
                  };
                } else {
                  uniques[project.name].value += project.value;
                }
                return uniques;
              }, {});

              var unsorted_summary = Object.keys(summary).map(function (key) {
                return {
                  'name': key,
                  'value': summary[key].value,
                  'status': summary[key].status,
                  'mid': summary[key].mid
                };
              });

              d.summary = unsorted_summary.sort(function (a, b) {
                return b.value - a.value;
              });
              return d;
            });
          }

          // Draw the chart
          scope.drawChart();
        });


        /**
         * Draw the chart based on the current overview type
         */
        scope.drawChart = function (type) {

          if ( !scope.data ) { return; }

          if ( scope.overview === 'year' ) {
            scope.drawYearOverview();
          } else if ( scope.overview === 'month' ) {
            scope.drawMonthOverview();
          } else if ( scope.overview === 'week' ) {
            scope.drawWeekOverview();
          } else if ( scope.overview === 'day' ) {
            scope.drawDayOverview();
          }

        };


        /**
         * Draw year overview
         */
        scope.drawYearOverview = function () {
          // Add current overview to the history
          if ( scope.history[scope.history.length-1] !== scope.overview ) {
            scope.history.push(scope.overview);
          }

          var first_date = moment(scope.data[0].date);
          var max_value = d3.max(scope.data, function (d) {
            return d.total;
          });

          // var color = d3.scale.linear()
          //   .range(['#ffffff', scope.color || '#ff4500'])
          //   .domain([-0.15 * max_value, max_value]);


          var color = d3.scale.linear()
              .range(['lightpink', 'red'])
              .domain([-0.15 * max_value, max_value]);

          var ntc_color = d3.scale.linear()
              .range(['palegreen', 'green'])
              .domain([-0.15 * max_value, max_value]);


          // var color = d3.scale.linear()
          //     .range(['green', 'red'])
          //     .domain([-0.05 * max_value, max_value]);


          // d3.scale.linear().domain([0, max_area]).range(['beige', 'red']);


          var calcItemX = function (d) {
            var date = moment(d.date);
            var week_num = date.week() - first_date.week() + (first_date.weeksInYear() * (date.weekYear() - first_date.weekYear()));
            return week_num * (item_size + gutter) + label_padding;
          };
          var calcItemY = function (d) {
            return label_padding + moment(d.date).weekday() * (item_size + gutter);
          };
          var calcItemSize = function (d) {
            if ( max_value <= 0 ) { return item_size; }
            return item_size * 0.75 + (item_size * d.total / max_value) * 0.25;
          };

          items.selectAll('.item-circle').remove();
          items.selectAll('.item-circle')
            .data(scope.data)
            .enter()
            .append('rect')
            .attr('class', 'item item-circle')
            .style('opacity', 0)
            .style('cursor', 'pointer')
            .attr('x', function (d) {
              return calcItemX(d) + (item_size - calcItemSize(d)) / 2;
            })
            .attr('y', function (d) {
              return calcItemY(d) + (item_size - calcItemSize(d)) / 2;
            })
            .attr('rx', function (d) {
              return calcItemSize(d);
            })
            .attr('ry', function (d) {
              return calcItemSize(d);
            })
            .attr('width', function (d) {
              return calcItemSize(d);
            })
            .attr('height', function (d) {
              return calcItemSize(d);
            })
            .attr('fill', function (d) {
              var mid = "positive";

              angular.forEach(d.summary, function (value) {
                mid = value.mid;
              });

              if(mid == 'Ntc'){
                return ( d.total > 0 ) ? ntc_color(d.total) : 'transparent';
              }
              else {
                return ( d.total > 0 ) ? color(d.total) : 'transparent';
              }

            })
              // .html(function (d) {
              //   var month = getMonth(d.toLocaleDateString("en-us", {month: "short"}));
              //   return '<a href="javascript: void(0)" target="_self" onClick="heatmapMonthPost(' + month + ')" style="text-decoration: underline"> ' + d.toLocaleDateString("en-us", {month: "short"}) + '</a>'
              // })
            .on('click', function (d) {
              var name = "";

              angular.forEach(d.details, function (value) {
                name = value.name;
              });

              if ( in_transition ) { return; }

              // Don't transition if there is no data to show
              if ( d.total === 0 ) { return; }

              in_transition = true;

              // Set selected date to the one clicked on
              scope.selected = d;

              // Hide tooltip
              scope.hideTooltip();

              // Remove all year overview related items and labels
              scope.removeYearOverview();

              // Redraw the chart
              scope.overview = 'day';
              scope.drawChart();

              return heatmapSinglePost(name.toString());

            })
            .on('mouseover', function (d) {

              if ( in_transition ) { return; }

              // Pulsating animation
              var circle = d3.select(this);
              (function repeat() {
                circle = circle.transition()
                  .duration(transition_duration)
                  .ease('ease-in')
                  .attr('x', function (d) {
                    return calcItemX(d) - (item_size * 1.1 - item_size) / 2;
                  })
                  .attr('y', function (d) {
                    return calcItemY(d) - (item_size * 1.1 - item_size) / 2;
                  })
                  .attr('width', item_size * 1.1)
                  .attr('height', item_size * 1.1)
                  .transition()
                  .duration(transition_duration)
                  .ease('ease-in')
                  .attr('x', function (d) {
                    return calcItemX(d) + (item_size - calcItemSize(d)) / 2;
                  })
                  .attr('y', function (d) {
                    return calcItemY(d) + (item_size - calcItemSize(d)) / 2;
                  })
                  .attr('width', function (d) {
                    return calcItemSize(d);
                  })
                  .attr('height', function (d) {
                    return calcItemSize(d);
                  })
                  .each('end', repeat);
              })();

              // Construct tooltip
              var tooltip_html = '';
              tooltip_html += '<div class="header"><strong>' + (d.total ? scope.formatTime(d.total) : 'No time') + ' tracked</strong></div>';
              tooltip_html += '<div>on ' + moment(d.date).format('dddd, MMM Do YYYY') + '</div><br>';
              // console.log("status-->" + JSON.stringify(d[0]))

              // Add summary to the tooltip
              angular.forEach(d.summary, function (d) {

                tooltip_html += '<div><span><strong>' + d.name + ' | Sample Run Time: ' + '</strong></span>';
                tooltip_html += '<span>' + scope.formatTime(d.value) + '</span>'
                tooltip_html += '<span>' + ' | Status: ' + d.status + '</span></div>';
              });

              // Calculate tooltip position
              var x = calcItemX(d) + item_size;
              if ( width - x < (tooltip_width + tooltip_padding * 3) ) {
                x -= tooltip_width + tooltip_padding * 2;
              }
              var y = calcItemY(d) + item_size;

              // Show tooltip
              tooltip.html(tooltip_html)
                .style('left', x + 'px')
                .style('top', y + 'px')
                .transition()
                  .duration(transition_duration / 2)
                  .ease('ease-in')
                  .style('opacity', 1);
            })
            .on('mouseout', function () {
              if ( in_transition ) { return; }

              // Set circle radius back to what it's supposed to be
              d3.select(this).transition()
                .duration(transition_duration / 2)
                .ease('ease-in')
                .attr('x', function (d) {
                  return calcItemX(d) + (item_size - calcItemSize(d)) / 2;
                })
                .attr('y', function (d) {
                  return calcItemY(d) + (item_size - calcItemSize(d)) / 2;
                })
                .attr('width', function (d) {
                  return calcItemSize(d);
                })
                .attr('height', function (d) {
                  return calcItemSize(d);
                });

              // Hide tooltip
              scope.hideTooltip();
            })
            .transition()
              .delay( function () {
                return (Math.cos(Math.PI * Math.random()) + 1) * transition_duration;
              })
              .duration(function () {
                return transition_duration;
              })
              .ease('ease-in')
              .style('opacity', 1)
              .call(function (transition, callback) {
                if ( transition.empty() ) {
                  callback();
                }
                var n = 0;
                transition
                  .each(function() { ++n; })
                  .each('end', function() {
                    if ( !--n ) {
                      callback.apply(this, arguments);
                    }
                  });
                }, function() {
                  in_transition = false;
                });

          function getMonth(monthStr){
            var d = new Date(monthStr);
            // var month_names_short = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            // return month_names_short[d.getMonth()];

            return d.getMonth();

            // return new Date(monthStr+'-1-01').getMonth() + 1;
          }

          // Add month labels
          var today = moment().endOf('day');
          var today_year_ago = moment().startOf('day').subtract(1, 'year');
          var month_labels = d3.time.months(today_year_ago.startOf('month'), today);
          var monthScale = d3.scale.linear()
            .range([0, width])
            .domain([0, month_labels.length]);
          labels.selectAll('.label-month').remove();
          labels.selectAll('.label-month')
            .data(month_labels)
            .enter()
            .append('text')
            .attr('class', 'label label-month')
            .attr('font-size', function () {
              return Math.floor(label_padding / 3) + 'px';
            })
            .html(function (d) {
              var month = getMonth(d);
              var month_names_short = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
              var month_short = month_names_short[d.getMonth()];

              var m = parseInt(month) + 1
                // var month = getMonth(d.toLocaleDateString("en-us", {month: "short"}));
                return '<a href="javascript: void(0)" target="_self" onClick="heatmapMonthPost(' + m + ')" style="text-decoration: underline"> ' + month_short + '</a>'
            })

              // .attr("xlink:href": d.toLocaleDateString('en-us', {month: 'short'}))

            // .text(function (d) {
            //   return d.toLocaleDateString('en-us', {month: 'short'});
            // })


            .attr('x', function (d, i) {
              return monthScale(i) + (monthScale(i) - monthScale(i-1)) / 2;
            })
            .attr('y', label_padding / 2)
            .on('mouseenter', function (d) {
              if ( in_transition ) { return; }

              var selected_month = moment(d);
              items.selectAll('.item-circle')
                .transition()
                .duration(transition_duration)
                .ease('ease-in')
                .style('opacity', function (d) {
                  return moment(d.date).isSame(selected_month, 'month') ? 1 : 0.1;
                });
            })
            .on('mouseout', function () {
              if ( in_transition ) { return; }

              items.selectAll('.item-circle')
                .transition()
                .duration(transition_duration)
                .ease('ease-in')
                .style('opacity', 1);
            })
            .on('click', function (d) {
              if ( in_transition ) { return; }

              in_transition = true;

              // Set selected month to the one clicked on
              scope.selected = {date: d};

              // Hide tooltip
              scope.hideTooltip();

              // Remove all year overview related items and labels
              scope.removeYearOverview();

              // Redraw the chart
              scope.overview = 'month';
              scope.drawChart();
            });

          // Add day labels
          var day_labels = d3.time.days(moment().startOf('week'), moment().endOf('week'));
          var dayScale = d3.scale.ordinal()
            .rangeRoundBands([label_padding, height])
            .domain(day_labels.map(function (d) {
              return moment(d).weekday();
            }));
          labels.selectAll('.label-day').remove();
          labels.selectAll('.label-day')
            .data(day_labels)
            .enter()
            .append('text')
            .attr('class', 'label label-day')
            .attr('x', label_padding / 3)
            .attr('y', function (d, i) {
              return dayScale(i) + dayScale.rangeBand() / 1.75;
            })
            .style('text-anchor', 'left')
            .attr('font-size', function () {
              return Math.floor(label_padding / 3) + 'px';
            })
            .html(function (d) {

              // console.log(moment(d).format('ddd'))
              // var day = moment(d).format('dddd')[0];

              var day = moment(d).format('ddd');


              return '<a href="javascript: void(0)" target="_self" onClick="heatmapWeekDayPost(' + day + ')" style="text-decoration: underline"> ' + day + '</a>'
            })
            // .text(function (d) {
            //   return moment(d).format('dddd')[0];
            // })
            .on('mouseenter', function (d) {
              if ( in_transition ) { return; }

              var selected_day = moment(d);
              items.selectAll('.item-circle')
                .transition()
                .duration(transition_duration)
                .ease('ease-in')
                .style('opacity', function (d) {
                  return (moment(d.date).day() === selected_day.day()) ? 1 : 0.1;
                });
            })
            .on('mouseout', function () {
              if ( in_transition ) { return; }

              items.selectAll('.item-circle')
                .transition()
                .duration(transition_duration)
                .ease('ease-in')
                .style('opacity', 1);
            });
        };


        /**
         * Draw month overview
         */
        scope.drawMonthOverview = function () {
          // Add current overview to the history
          if ( scope.history[scope.history.length-1] !== scope.overview ) {
            scope.history.push(scope.overview);
          }

          // Define beginning and end of the month
          var start_of_month = moment(scope.selected.date).startOf('month');
          var end_of_month = moment(scope.selected.date).endOf('month');

          // Filter data down to the selected month
          var month_data = scope.data.filter(function (d) {
            return start_of_month <= moment(d.date) && moment(d.date) < end_of_month;
          });
          var max_value = d3.max(month_data, function (d) {
            return d3.max(d.summary, function (d) {
              return d.value;
            });
          });

          // Define day labels and axis
          var day_labels = d3.time.days(moment().startOf('week'), moment().endOf('week'));
          var dayScale = d3.scale.ordinal()
            .rangeRoundBands([label_padding, height])
            .domain(day_labels.map(function (d) {
              return moment(d).weekday();
            }));

          // Define week labels and axis
          var week_labels = [start_of_month.week()];
          while ( start_of_month.week() !== end_of_month.week() ) {
            week_labels.push(start_of_month.add(1, 'week').week());
          }
          var weekScale = d3.scale.ordinal()
            .rangeRoundBands([label_padding, width], 0.05)
            .domain(week_labels);

          // Add month data items to the overview
          items.selectAll('.item-block-month').remove();
          var item_block = items.selectAll('.item-block-month')
            .data(month_data)
            .enter()
            .append('g')
            .attr('class', 'item item-block-month')
            .attr('width', function () {
              return (width - label_padding) / week_labels.length - gutter * 5;
            })
            .attr('height', function () {
              return Math.min(dayScale.rangeBand(), max_block_height);
            })
            .attr('transform', function (d) {
              return 'translate(' + weekScale(moment(d.date).week()) + ',' + ((dayScale(moment(d.date).weekday()) + dayScale.rangeBand() / 1.75) - 15)+ ')';
            })
            .attr('total', function (d) {
              return d.total;
            })
            .attr('date', function (d) {
              return d.date;
            })
            .attr('offset', 0)
            .on('click', function (d) {
              if ( in_transition ) { return; }

              // Don't transition if there is no data to show
              if ( d.total === 0 ) { return; }

              in_transition = true;

              // Set selected date to the one clicked on
              scope.selected = d;

              // Hide tooltip
              scope.hideTooltip();

              // Remove all month overview related items and labels
              scope.removeMonthOverview();

              // Redraw the chart
              scope.overview = 'day';
              scope.drawChart();
            });

          var item_width = (width - label_padding) / week_labels.length - gutter * 5;
          var itemScale = d3.scale.linear()
            .rangeRound([0, item_width]);

          item_block.selectAll('.item-block-rect')
            .data(function (d) {
              return d.summary;
            })
            .enter()
            .append('rect')
            .attr('class', 'item item-block-rect')
            .attr('x', function (d) {
              var total = parseInt(d3.select(this.parentNode).attr('total'));
              var offset = parseInt(d3.select(this.parentNode).attr('offset'));
              itemScale.domain([0, total]);
              d3.select(this.parentNode).attr('offset', offset + itemScale(d.value));
              return offset;
            })
            .attr('width', function (d) {
              var total = parseInt(d3.select(this.parentNode).attr('total'));
              itemScale.domain([0, total]);
              return itemScale(d.value) - item_gutter;
            })
            .attr('height', function () {
              return Math.min(dayScale.rangeBand(), max_block_height);
            })
            .attr('fill', function (d) {
              var c = '#cd2327';
              scope.color = c;

              angular.forEach(d, function (value) {
                if(value === 'Ntc'){
                  c = '#2E8B57';
                  scope.color = c;
                }
              });

              var color = d3.scale.linear()
                .range(['#ffffff', scope.color || c])
                .domain([-0.15 * max_value, max_value]);

              return color(d.value) || '#ff4500';

            })
            .style('opacity', 0)
            .on('mouseover', function(d) {
              if ( in_transition ) { return; }

              // Get date from the parent node
              var date = new Date(d3.select(this.parentNode).attr('date'));

              // Construct tooltip
              var tooltip_html = '';
              tooltip_html += '<div class="header"><strong>' + d.name + '</strong></div><br>';
              tooltip_html += '<div><strong>' + (d.value ? scope.formatTime(d.value) : 'No time') + ' tracked</strong></div>';
              tooltip_html += '<div>on ' + moment(date).format('dddd, MMM Do YYYY') + '</div>';

              // Calculate tooltip position
              var x = weekScale(moment(date).week()) + tooltip_padding;
              while ( width - x < (tooltip_width + tooltip_padding * 3) ) {
                x -= 10;
              }
              var y = dayScale(moment(date).weekday()) + tooltip_padding * 2;

              // Show tooltip
              tooltip.html(tooltip_html)
                .style('left', x + 'px')
                .style('top', y + 'px')
                .transition()
                  .duration(transition_duration / 2)
                  .ease('ease-in')
                  .style('opacity', 1);
            })
            .on('mouseout', function () {
              if ( in_transition ) { return; }
              scope.hideTooltip();
            })
            .transition()
              .delay(function () {
                return (Math.cos(Math.PI * Math.random()) + 1) * transition_duration;
              })
              .duration(function () {
                return transition_duration;
              })
              .ease('ease-in')
              .style('opacity', 1)
              .call(function (transition, callback) {
                if ( transition.empty() ) {
                  callback();
                }
                var n = 0;
                transition
                  .each(function() { ++n; })
                  .each('end', function() {
                    if ( !--n ) {
                      callback.apply(this, arguments);
                    }
                  });
                }, function() {
                  in_transition = false;
                });

          // Add week labels
          labels.selectAll('.label-week').remove();
          labels.selectAll('.label-week')
            .data(week_labels)
            .enter()
            .append('text')
            .attr('class', 'label label-week')
            .attr('font-size', function () {
              return Math.floor(label_padding / 3) + 'px';
            })
            .text(function (week_nr) {
              return 'Week ' + week_nr;
            })
            .attr('x', function (d) {
              return weekScale(d);
            })
            .attr('y', label_padding / 2)
            .on('mouseenter', function (week_nr) {
              if ( in_transition ) { return; }

              items.selectAll('.item-block-month')
                .transition()
                .duration(transition_duration)
                .ease('ease-in')
                .style('opacity', function (d) {
                  return ( moment(d.date).week() === week_nr ) ? 1 : 0.1;
                });
            })
            .on('mouseout', function () {
              if ( in_transition ) { return; }

              items.selectAll('.item-block-month')
                .transition()
                .duration(transition_duration)
                .ease('ease-in')
                .style('opacity', 1);
            })
            .on('click', function (d) {
              if ( in_transition ) { return; }

              in_transition = true;

              // Set selected month to the one clicked on
              scope.selected = {date: moment(scope.selected.date).week(d)};

              // Hide tooltip
              scope.hideTooltip();

              // Remove all year overview related items and labels
              scope.removeMonthOverview();

              // Redraw the chart
              scope.overview = 'week';
              scope.drawChart();
            });


          // Add day labels
          labels.selectAll('.label-day').remove();
          labels.selectAll('.label-day')
            .data(day_labels)
            .enter()
            .append('text')
            .attr('class', 'label label-day')
            .attr('x', label_padding / 3)
            .attr('y', function (d, i) {
              return dayScale(i) + dayScale.rangeBand() / 1.75;
            })
            .style('text-anchor', 'left')
            .attr('font-size', function () {
              return Math.floor(label_padding / 3) + 'px';
            })
            .text(function (d) {
              return moment(d).format('dddd')[0];
            })
            .on('mouseenter', function (d) {
              if ( in_transition ) { return; }

              var selected_day = moment(d);
              items.selectAll('.item-block-month')
                .transition()
                .duration(transition_duration)
                .ease('ease-in')
                .style('opacity', function (d) {
                  return (moment(d.date).day() === selected_day.day()) ? 1 : 0.1;
                });
            })
            .on('mouseout', function () {
              if ( in_transition ) { return; }

              items.selectAll('.item-block-month')
                .transition()
                .duration(transition_duration)
                .ease('ease-in')
                .style('opacity', 1);
            });

          // Add button to switch back to year overview
          scope.drawButton();
        };


        /**
         * Draw week overview
         */
        scope.drawWeekOverview = function () {
          // Add current overview to the history
          if ( scope.history[scope.history.length-1] !== scope.overview ) {
            scope.history.push(scope.overview);
          }

          // Define beginning and end of the week
          var start_of_week = moment(scope.selected.date).startOf('week');
          var end_of_week = moment(scope.selected.date).endOf('week');

          // Filter data down to the selected week
          var week_data = scope.data.filter(function (d) {
            return start_of_week <= moment(d.date) && moment(d.date) < end_of_week;
          });
          var max_value = d3.max(week_data, function (d) {
            return d3.max(d.summary, function (d) {
              return d.value;
            });
          });

          // Define day labels and axis
          var day_labels = d3.time.days(moment().startOf('week'), moment().endOf('week'));
          var dayScale = d3.scale.ordinal()
            .rangeRoundBands([label_padding, height])
            .domain(day_labels.map(function (d) {
              return moment(d).weekday();
            }));

          // Define week labels and axis
          var week_labels = [start_of_week.week()];
          while ( start_of_week.week() !== end_of_week.week() ) {
            week_labels.push(start_of_week.add(1, 'week').week());
          }
          var weekScale = d3.scale.ordinal()
            .rangeRoundBands([label_padding, width], 0.01)
            .domain(week_labels);

          // Add week data items to the overview
          items.selectAll('.item-block-week').remove();
          var item_block = items.selectAll('.item-block-week')
            .data(week_data)
            .enter()
            .append('g')
            .attr('class', 'item item-block-week')
            .attr('width', function () {
              return (width - label_padding) / week_labels.length - gutter * 5;
            })
            .attr('height', function () {
              return Math.min(dayScale.rangeBand(), max_block_height);
            })
            .attr('transform', function (d) {
              return 'translate(' + weekScale(moment(d.date).week()) + ',' + ((dayScale(moment(d.date).weekday()) + dayScale.rangeBand() / 1.75) - 15)+ ')';
            })
            .attr('total', function (d) {
              return d.total;
            })
            .attr('date', function (d) {
              return d.date;
            })
            .attr('offset', 0)
            .on('click', function (d) {
              if ( in_transition ) { return; }

              // Don't transition if there is no data to show
              if ( d.total === 0 ) { return; }

              in_transition = true;

              // Set selected date to the one clicked on
              scope.selected = d;

              // Hide tooltip
              scope.hideTooltip();

              // Remove all week overview related items and labels
              scope.removeWeekOverview();

              // Redraw the chart
              scope.overview = 'day';
              scope.drawChart();
            });

          var item_width = (width - label_padding) / week_labels.length - gutter * 5;
          var itemScale = d3.scale.linear()
            .rangeRound([0, item_width]);

          item_block.selectAll('.item-block-rect')
            .data(function (d) {
              return d.summary;
            })
            .enter()
            .append('rect')
            .attr('class', 'item item-block-rect')
            .attr('x', function (d) {
              var total = parseInt(d3.select(this.parentNode).attr('total'));
              var offset = parseInt(d3.select(this.parentNode).attr('offset'));
              itemScale.domain([0, total]);
              d3.select(this.parentNode).attr('offset', offset + itemScale(d.value));
              return offset;
            })
            .attr('width', function (d) {
              var total = parseInt(d3.select(this.parentNode).attr('total'));
              itemScale.domain([0, total]);
              return itemScale(d.value) - item_gutter;
            })
            .attr('height', function () {
              return Math.min(dayScale.rangeBand(), max_block_height);
            })
            .attr('fill', function (d) {
              var color = d3.scale.linear()
                .range(['#ffffff', scope.color || '#ff4500'])
                .domain([-0.15 * max_value, max_value]);
              return color(d.value) || '#ff4500';
            })
            .style('opacity', 0)
            .on('mouseover', function(d) {
              if ( in_transition ) { return; }

              // Get date from the parent node
              var date = new Date(d3.select(this.parentNode).attr('date'));

              // Construct tooltip
              var tooltip_html = '';
              tooltip_html += '<div class="header"><strong>' + d.name + '</strong></div><br>';
              tooltip_html += '<div><strong>' + (d.value ? scope.formatTime(d.value) : 'No time') + ' tracked</strong></div>';
              tooltip_html += '<div>on ' + moment(date).format('dddd, MMM Do YYYY') + '</div>';

              // Calculate tooltip position
              var total = parseInt(d3.select(this.parentNode).attr('total'));
              itemScale.domain([0, total]);
              var x = parseInt(d3.select(this).attr('x')) + itemScale(d.value) / 4 + tooltip_width / 4;
              while ( width - x < (tooltip_width + tooltip_padding * 3) ) {
                x -= 10;
              }
              var y = dayScale(moment(date).weekday()) + tooltip_padding * 1.5;

              // Show tooltip
              tooltip.html(tooltip_html)
                .style('left', x + 'px')
                .style('top', y + 'px')
                .transition()
                  .duration(transition_duration / 2)
                  .ease('ease-in')
                  .style('opacity', 1);
            })
            .on('mouseout', function () {
              if ( in_transition ) { return; }
              scope.hideTooltip();
            })
            .transition()
              .delay(function () {
                return (Math.cos(Math.PI * Math.random()) + 1) * transition_duration;
              })
              .duration(function () {
                return transition_duration;
              })
              .ease('ease-in')
              .style('opacity', 1)
              .call(function (transition, callback) {
                if ( transition.empty() ) {
                  callback();
                }
                var n = 0;
                transition
                  .each(function() { ++n; })
                  .each('end', function() {
                    if ( !--n ) {
                      callback.apply(this, arguments);
                    }
                  });
                }, function() {
                  in_transition = false;
                });

          // Add week labels
          labels.selectAll('.label-week').remove();
          labels.selectAll('.label-week')
            .data(week_labels)
            .enter()
            .append('text')
            .attr('class', 'label label-week')
            .attr('font-size', function () {
              return Math.floor(label_padding / 3) + 'px';
            })
            .text(function (week_nr) {
              return 'Week ' + week_nr;
            })
            .attr('x', function (d) {
              return weekScale(d);
            })
            .attr('y', label_padding / 2)
            .on('mouseenter', function (week_nr) {
              if ( in_transition ) { return; }

              items.selectAll('.item-block-week')
                .transition()
                .duration(transition_duration)
                .ease('ease-in')
                .style('opacity', function (d) {
                  return ( moment(d.date).week() === week_nr ) ? 1 : 0.1;
                });
            })
            .on('mouseout', function () {
              if ( in_transition ) { return; }

              items.selectAll('.item-block-week')
                .transition()
                .duration(transition_duration)
                .ease('ease-in')
                .style('opacity', 1);
            });

          // Add day labels
          labels.selectAll('.label-day').remove();
          labels.selectAll('.label-day')
            .data(day_labels)
            .enter()
            .append('text')
            .attr('class', 'label label-day')
            .attr('x', label_padding / 3)
            .attr('y', function (d, i) {
              return dayScale(i) + dayScale.rangeBand() / 1.75;
            })
            .style('text-anchor', 'left')
            .attr('font-size', function () {
              return Math.floor(label_padding / 3) + 'px';
            })
            .text(function (d) {
              return moment(d).format('dddd')[0];
            })
            .on('mouseenter', function (d) {
              if ( in_transition ) { return; }

              var selected_day = moment(d);
              items.selectAll('.item-block-week')
                .transition()
                .duration(transition_duration)
                .ease('ease-in')
                .style('opacity', function (d) {
                  return (moment(d.date).day() === selected_day.day()) ? 1 : 0.1;
                });
            })
            .on('mouseout', function () {
              if ( in_transition ) { return; }

              items.selectAll('.item-block-week')
                .transition()
                .duration(transition_duration)
                .ease('ease-in')
                .style('opacity', 1);
            });

          // Add button to switch back to year overview
          scope.drawButton();
        };


        /**
         * Draw day overview
         */
        scope.drawDayOverview = function () {
          // Add current overview to the history
          if ( scope.history[scope.history.length-1] !== scope.overview ) {
            scope.history.push(scope.overview);
          }

          // Initialize selected date to today if it was not set
          if ( !Object.keys(scope.selected).length ) {
              scope.selected = scope.data[scope.data.length - 1];
          }

          var project_labels = scope.selected.summary.map(function (project) {
            return project.name;
          });
          var projectScale = d3.scale.ordinal()
            .rangeRoundBands([label_padding, height])
            .domain(project_labels);

          var itemScale = d3.time.scale()
            .range([label_padding*2, width])
            .domain([moment(scope.selected.date).startOf('day'), moment(scope.selected.date).endOf('day')]);
          items.selectAll('.item-block').remove();
          items.selectAll('.item-block')
            .data(scope.selected.details)
            .enter()
            .append('rect')
            .attr('class', 'item item-block')
            .attr('x', function (d) {
              return itemScale(moment(d.date));
            })
            .attr('y', function (d) {
              return (projectScale(d.name) + projectScale.rangeBand() / 2) - 15;
            })
            .attr('width', function (d) {
              var end = itemScale(d3.time.second.offset(moment(d.date), d.value));
              return end - itemScale(moment(d.date));
            })
            .attr('height', function () {
              return Math.min(projectScale.rangeBand(), max_block_height);
            })
            .attr('fill', function (d) {
              var c = '#cd2327';
              scope.color = c;

              angular.forEach(d, function (value) {
                if(value === 'Ntc'){
                  c = '#2E8B57';
                  scope.color = c;
                }
              });
              return scope.color || c ;
            })
            .style('opacity', 0)
            .on('mouseover', function(d) {
              if ( in_transition ) { return; }

              // Construct tooltip
              var tooltip_html = '';
              tooltip_html += '<div class="header"><strong>' + d.name + '</strong><div><br>';
              tooltip_html += '<div><strong>' + (d.value ? scope.formatTime(d.value) : 'No time') + ' tracked</strong></div>';
              tooltip_html += '<div>on ' + moment(d.date).format('dddd, MMM Do YYYY HH:mm') + '</div>';

              // Calculate tooltip position
              var x = d.value * 100 / (60 * 60 * 24) + itemScale(moment(d.date));
              while ( width - x < (tooltip_width + tooltip_padding * 3) ) {
                x -= 10;
              }
              var y = projectScale(d.name) + projectScale.rangeBand() / 2 + tooltip_padding / 2;

              // Show tooltip
              tooltip.html(tooltip_html)
                .style('left', x + 'px')
                .style('top', y + 'px')
                .transition()
                  .duration(transition_duration / 2)
                  .ease('ease-in')
                  .style('opacity', 1);
            })
            .on('mouseout', function () {
              if ( in_transition ) { return; }
              scope.hideTooltip();
            })
            .on('click', function (d) {
              if ( scope.handler ) {
                scope.handler(d);
              }
            })
            .transition()
              .delay(function () {
                return (Math.cos(Math.PI * Math.random()) + 1) * transition_duration;
              })
              .duration(function () {
                return transition_duration;
              })
              .ease('ease-in')
              .style('opacity', 0.5)
              .call(function (transition, callback) {
                if ( transition.empty() ) {
                  callback();
                }
                var n = 0;
                transition
                  .each(function() { ++n; })
                  .each('end', function() {
                    if ( !--n ) {
                      callback.apply(this, arguments);
                    }
                  });
                }, function() {
                  in_transition = false;
                });

          // Add time labels
          var timeLabels = d3.time.hours(moment(scope.selected.date).startOf('day'), moment(scope.selected.date).endOf('day'));
          var timeScale = d3.time.scale()
            .range([label_padding*2, width])
            .domain([0, timeLabels.length]);
          labels.selectAll('.label-time').remove();
          labels.selectAll('.label-time')
            .data(timeLabels)
            .enter()
            .append('text')
            .attr('class', 'label label-time')
            .attr('font-size', function () {
              return Math.floor(label_padding / 3) + 'px';
            })
            .text(function (d) {
              return moment(d).format('HH:mm');
            })
            .attr('x', function (d, i) {
              return timeScale(i);
            })
            .attr('y', label_padding / 2)
            .on('mouseenter', function (d) {
              if ( in_transition ) { return; }

              var selected = itemScale(moment(d));
              items.selectAll('.item-block')
                .transition()
                .duration(transition_duration)
                .ease('ease-in')
                .style('opacity', function (d) {
                  var start = itemScale(moment(d.date));
                  var end = itemScale(moment(d.date).add(d.value, 'seconds'));
                  return ( selected >= start && selected <= end ) ? 1 : 0.1;
                });
            })
            .on('mouseout', function () {
              if ( in_transition ) { return; }

              items.selectAll('.item-block')
                .transition()
                .duration(transition_duration)
                .ease('ease-in')
                .style('opacity', 0.5);
            });

          // Add project labels
          labels.selectAll('.label-project').remove();
          labels.selectAll('.label-project')
            .data(project_labels)
            .enter()
            .append('text')
            .attr('class', 'label label-project')
            .attr('x', gutter)
            .attr('y', function (d) {
              return projectScale(d) + projectScale.rangeBand() / 2;
            })
            .attr('min-height', function () {
              return projectScale.rangeBand();
            })
            .style('text-anchor', 'left')
            .attr('font-size', function () {
              return Math.floor(label_padding / 3) + 'px';
            })
            .text(function (d) {
              return d;
            })
            .each(function () {
              var obj = d3.select(this),
                text_length = obj.node().getComputedTextLength(),
                text = obj.text();
              while (text_length > (label_padding * 1.5) && text.length > 0) {
                text = text.slice(0, -1);
                obj.text(text + '...');
                text_length = obj.node().getComputedTextLength();
              }
            })
            .on('mouseenter', function (project) {
              if ( in_transition ) { return; }

              items.selectAll('.item-block')
                .transition()
                .duration(transition_duration)
                .ease('ease-in')
                .style('opacity', function (d) {
                  return (d.name === project) ? 1 : 0.1;
                });
            })
            .on('mouseout', function () {
              if ( in_transition ) { return; }

              items.selectAll('.item-block')
                .transition()
                .duration(transition_duration)
                .ease('ease-in')
                .style('opacity', 0.5);
            });

          // Add button to switch back to year overview
          scope.drawButton();
        };


        /**
         * Draw the button for navigation purposes
         */
        scope.drawButton = function () {
          buttons.selectAll('.button').remove();
          var button = buttons.append('g')
            .attr('class', 'button button-back')
            .style('opacity', 0)
            .on('click', function () {
              if ( in_transition ) { return; }

              // Set transition boolean
              in_transition = true;

              // Clean the canvas from whichever overview type was on
              if ( scope.overview === 'month' ) {
                scope.removeMonthOverview();
              } else if ( scope.overview === 'week' ) {
                scope.removeWeekOverview();
              } else if ( scope.overview === 'day' ) {
                scope.removeDayOverview();
              }

              // Redraw the chart
              scope.history.pop();
              scope.overview = scope.history.pop();
              scope.drawChart();
            });
          button.append('circle')
            .attr('cx', label_padding / 2)
            .attr('cy', label_padding / 2.5)
            .attr('r', item_size / 2.5);
          button.append('text')
            .attr('x', label_padding / 2)
            .attr('y', label_padding / 2.75)
            .attr('dy', function () {
              return Math.floor(width / 100) / 3;
            })
            .attr('font-size', function () {
              return Math.floor(label_padding / 3) + 'px';
            })
            .html('&#x2190;');
          button.transition()
            .duration(transition_duration)
            .ease('ease-in')
            .style('opacity', 1)
            .style('cursor', 'pointer');
        };


        /**
         * Transition and remove items and labels related to year overview
         */
        scope.removeYearOverview = function () {
          items.selectAll('.item-circle')
            .transition()
            .duration(transition_duration)
            .ease('ease')
            .style('opacity', 0)
            .remove();
          labels.selectAll('.label-day').remove();
          labels.selectAll('.label-month').remove();
        };


        /**
         * Transition and remove items and labels related to month overview
         */
        scope.removeMonthOverview = function () {
          items.selectAll('.item-block-month').selectAll('.item-block-rect')
            .transition()
            .duration(transition_duration)
            .ease('ease-in')
            .style('opacity', 0)
            .attr('x', function (d, i) {
              return ( i % 2 === 0) ? -width/3 : width/3;
            })
            .remove();
          labels.selectAll('.label-day').remove();
          labels.selectAll('.label-week').remove();
          scope.hideBackButton();
        };


        /**
         * Transition and remove items and labels related to week overview
         */
        scope.removeWeekOverview = function () {
          items.selectAll('.item-block-week').selectAll('.item-block-rect')
            .transition()
            .duration(transition_duration)
            .ease('ease-in')
            .style('opacity', 0)
            .attr('x', function (d, i) {
              return ( i % 2 === 0) ? -width/3 : width/3;
            })
            .remove();
          labels.selectAll('.label-day').remove();
          labels.selectAll('.label-week').remove();
          scope.hideBackButton();
        };


        /**
         * Transition and remove items and labels related to daily overview
         */
        scope.removeDayOverview = function () {
          items.selectAll('.item-block')
            .transition()
            .duration(transition_duration)
            .ease('ease-in')
            .style('opacity', 0)
            .attr('x', function (d, i) {
              return ( i % 2 === 0) ? -width/3 : width/3;
            })
            .remove();
          labels.selectAll('.label-time').remove();
          labels.selectAll('.label-project').remove();
          scope.hideBackButton();
        };


        /**
         * Helper function to hide the tooltip
         */
        scope.hideTooltip = function () {
          tooltip.transition()
            .duration(transition_duration / 2)
            .ease('ease-in')
            .style('opacity', 0);
        };


        /**
         * Helper function to hide the back button
         */
        scope.hideBackButton = function () {
          buttons.selectAll('.button')
            .transition()
            .duration(transition_duration)
            .ease('ease')
            .style('opacity', 0)
            .remove();
        };


        /**
         * Helper function to convert seconds to a human readable format
         * @param seconds Integer
         */
        scope.formatTime = function (seconds) {
          var sec_num = parseInt(seconds, 10);
          var hours = Math.floor(sec_num / 3600);
          var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
          var time = '';
          if ( hours > 0 ) {
            time += hours === 1 ? '1 hour ' : hours + ' hours ';
          }
          if ( minutes > 0 ) {
            time += minutes === 1 ? '1 minute' : minutes + ' minutes';
          }
          if ( hours === 0 && minutes === 0 ) {
            time = seconds + ' seconds';
          }
          return time;
        };
      }
    };
}]);
