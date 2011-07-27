/*
 * jquery.flot.tooltip
 * desc: create tooltip with values of hovered point on the graph, support many series and time mode
 * version: 0.3
 * author: Krzysztof Urbas @krzysu [myviews.pl]
 * website: https://github.com/krzysu/flot.tooltip
 * 
 * released under MIT License, 2011
*/

(function ($) {
    var options = {
		tooltip: false, //boolean
		tooltipOpts: {
			content: "%s | X: %x | Y: %y", //%s -> series label, %x -> X value, %y -> Y value
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
		};
		
		function onMouseMove(e) {
            
			var pos = {x: 0, y: 0};
            var offset = plot.offset();
            
			pos.x = e.pageX - offset.left;
			pos.y = e.pageY - offset.top;
			
			updateTooltipPosition(pos);
        };
		
		function timestampToDate(tmst) {

			var theDate = new Date(tmst);
			
			return $.plot.formatDate(theDate, opts.tooltipOpts.dateFormat);
		};
		
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
					
					var tipText;

					if(opts.xaxis.mode === "time") {
						tipText = stringFormat(to.content, item, timestampToDate);
					}
					else {
						tipText = stringFormat(to.content, item);						
					}
					
					$tip.html( tipText ).css({left: tipPosition.x + to.shifts.x, top: tipPosition.y + to.shifts.y}).show();
				}
				else {
					$tip.hide();
				}
			});
			
            eventHolder.mousemove(onMouseMove);
        });
		
		function stringFormat(content, item, fnct) {
		
			var r = [];
			var escape = false;
			var length = content.length;
			var c;

			for (var i = 0; i < length; ++i) {
				c = content.charAt(i);
				
				if (escape) {
					switch (c) {
						case 'x': {
							if( typeof(fnct) === 'function' ) c = fnct(item.datapoint[0]);
							else c = item.datapoint[0]; 
							break;
						}
						case 'y': {
							c = item.datapoint[1];
							break;
						}
						case 's': {
							if( typeof(item.series.label) !== 'undefined' ) c = item.series.label;
							else c = '';
							break;
						}
					}
					r.push(c);
					escape = false;
				}
				else {
					if (c == "%") escape = true;
					else r.push(c);
				}
			}
			return r.join("");
		};
    }
    
    $.plot.plugins.push({
        init: init,
        options: options,
        name: 'tooltip',
        version: '0.2'
    });
})(jQuery);
