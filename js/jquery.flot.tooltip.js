/*
	Flot Tooltip plugin
	by Krzysztof Urbas @krzysu [myviews.pl] 2011

*/

(function ($) {
    var options = {
		tooltip: false, //boolean
		tooltipOpts: {
			xValText: 'X: ',
			yValText: 'Y: '
		}
    };

    function init(plot) {

		var tipPosition = {x: 0, y: 0};
		var tipShifts = {x: 0, y: 25};
		
		function updateTooltipPosition(pos) {
			tipPosition.x = pos.x;
			tipPosition.y = pos.y;
		}
		
		function onMouseMove(e) {
            
			var pos = {x: 0, y: 0};
            var offset = plot.offset();
            
			pos.x = e.pageX - offset.left + tipShifts.x;
			pos.y = e.pageY - offset.top + tipShifts.y;
			
			updateTooltipPosition(pos);
        }
		
		function timestampToDate(tmst) {

			var theDate = new Date(tmst);
			var year = theDate.getFullYear(); 
			var month = theDate.getMonth() + 1;
			var day = theDate.getDate();
		
			
			var dateStr = year + '-' + month + '-' + day;
			return dateStr;
		}
		
		plot.hooks.bindEvents.push(function (plot, eventHolder) {
            
			var opts = plot.getOptions();
			
			if (opts.tooltip === false) {
				return;
			}

			var placeholder = plot.getPlaceholder();
			var $tip = $('<div />').attr('id', 'flotTip');
			$tip.appendTo(placeholder).hide().css({position: 'absolute'});
			
			$(placeholder).bind("plothover", function (event, pos, item) {
				if (item) {
					var tipText = '';
					
					if(opts.xaxis.mode === "time") {
						tipText = opts.tooltipOpts.xValText + timestampToDate(item.datapoint[0]) + " " + opts.tooltipOpts.yValText + item.datapoint[1];
					}
					else {
						tipText = opts.tooltipOpts.xValText + item.datapoint[0] + " " + opts.tooltipOpts.yValText + item.datapoint[1];		
					}
					
					$tip.text( tipText ).css({left: tipPosition.x, top: tipPosition.y}).show();
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
        version: '0.1'
    });
})(jQuery);
