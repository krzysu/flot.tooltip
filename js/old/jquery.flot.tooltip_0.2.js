/*
 * jquery.flot.tooltip
 * desc: create tooltip with values of hovered point on the graph, support many series and time mode
 * version: 0.2
 * author: Krzysztof Urbas @krzysu [myviews.pl]
 * website: https://github.com/krzysu/flot.tooltip
 * 
 * released under MIT License, 2011
*/

(function ($) {
    var options = {
		tooltip: false, //boolean
		tooltipOpts: {
			xValText: 'X: ',
			yValText: 'Y: ',
			series: true,
			dateFormat: "%y-%0m-%0d",
			shifts: {
				x: 25,
				y: 25
			}
		}
	};

    function init(plot) {

		var tipPosition = {x: 0, y: 0};
		var opts = plot.getOptions();
		
		function updateTooltipPosition(pos) {
			tipPosition.x = pos.x;
			tipPosition.y = pos.y;
		}
		
		function onMouseMove(e) {
            
			var pos = {x: 0, y: 0};
            var offset = plot.offset();
            
			pos.x = e.pageX - offset.left;
			pos.y = e.pageY - offset.top;
			
			updateTooltipPosition(pos);
        }
		
		function timestampToDate(tmst) {

			var theDate = new Date(tmst);
			
			return $.plot.formatDate(theDate, opts.tooltipOpts.dateFormat);
		}
		
		plot.hooks.bindEvents.push(function (plot, eventHolder) {
            
			var to = opts.tooltipOpts;
			
			if (opts.tooltip === false) {
				return;
			}

			var placeholder = plot.getPlaceholder();
			var $tip = $('<div />').attr('id', 'flotTip');
			$tip.appendTo(placeholder).hide().css({position: 'absolute'});
			
			$(placeholder).bind("plothover", function (event, pos, item) {
				if (item) {
					var tipText = '';
					
					if( typeof(item.series.label) !== 'undefined' && to.series === true ) {
						tipText = item.series.label + ": ";
					}

					if(opts.xaxis.mode === "time") {
						tipText += to.xValText + timestampToDate(item.datapoint[0]) + " " + to.yValText + item.datapoint[1];
					}
					else {
						tipText += to.xValText + item.datapoint[0] + " " + to.yValText + item.datapoint[1];		
					}
					
					$tip.text( tipText ).css({left: tipPosition.x + to.shifts.x, top: tipPosition.y + to.shifts.y}).show();
				}
				else {
					$tip.hide();
				}
			});
			
            eventHolder.mousemove(onMouseMove);
        });
		
    }
    
    $.plot.plugins.push({
        init: init,
        options: options,
        name: 'tooltip',
        version: '0.2'
    });
})(jQuery);
