/*
 * jquery.flot.tooltip
 * 
 * description: easy-to-use tooltips for Flot charts
 * version: 0.5 alpha
 * author: Krzysztof Urbas @krzysu [myviews.pl]
 * website: https://github.com/krzysu/flot.tooltip
 * 
 * build on 2012-12-29
 * released under MIT License, 2012
*/

(function ($) {

    var FlotTooltip = {

        // plugin options, default values
        defaultOptions: {
            tooltip: false,
            tooltipOpts: {
                content: "%s | X: %x | Y: %y.2", //%s -> series label, %x -> X value, %y -> Y value, %x.2 -> precision of X value, %p -> percent
                dateFormat: "%y-%0m-%0d",
                shifts: {
                    x: 10,
                    y: 20
                },
                defaultTheme: true
            }
        },

        // variables
        tipPosition: {x: 0, y: 0},

        // main plugin function
        init: function(plot) {
            
            var that = FlotTooltip;

            plot.hooks.bindEvents.push(function (plot, eventHolder) {

                // get plot options            
                that.plotOptions = plot.getOptions();

                // if not enabled return
                if (that.plotOptions.tooltip === false || typeof that.plotOptions.tooltip === 'undefined') return;

                // shortcut to access tooltip options
                that.tooltipOptions = that.plotOptions.tooltipOpts;

                // create tooltip DOM element
                var $tip = that.getDomElement();
                
                // bind event
                $( plot.getPlaceholder() ).bind("plothover", function (event, pos, item) {
                    if (item) {                    
                        var tipText;
                        var content = that.tooltipOptions.content;

                        if(that.plotOptions.xaxis.mode === "time" || that.plotOptions.xaxes[0].mode === "time") {
                            tipText = that.stringFormat(content, item, that.timestampToDate);
                        }
                        else {
                            tipText = that.stringFormat(content, item);                        
                        }
                        
                        $tip.html( tipText )
                            .css({
                                left: that.tipPosition.x + that.tooltipOptions.shifts.x,
                                top: that.tipPosition.y + that.tooltipOptions.shifts.y
                            })
                            .show();
                    }
                    else {
                        $tip.hide().html('');
                    }
                });
                
                eventHolder.mousemove(that.onMouseMove);
            });
        },

        /**
         * get or create tooltip DOM element 
         * @return jQuery object
         */
        getDomElement: function() {
            var $tip;

            if( $('#flotTip').length > 0 ){
                $tip = $('#flotTip');
            }
            else {
                $tip = $('<div />').attr('id', 'flotTip');
                $tip.appendTo('body').hide().css({position: 'absolute'});
            
                if(this.tooltipOptions.defaultTheme) {
                    $tip.css({
                        'background': '#fff',
                        'z-index': '100',
                        'padding': '0.4em 0.6em',
                        'border-radius': '0.5em',
                        'font-size': '0.8em',
                        'border': '1px solid #111'
                    });
                }
            }

            return $tip;
        },

        updateTooltipPosition: function(pos) {
            this.tipPosition.x = pos.x;
            this.tipPosition.y = pos.y;
        },
        
        onMouseMove: function(e) {
                        
            var pos = {x: 0, y: 0};

            pos.x = e.pageX;
            pos.y = e.pageY;

            FlotTooltip.updateTooltipPosition(pos);
        },
        
        timestampToDate: function(tmst) {

            var theDate = new Date(tmst);
            
            return $.plot.formatDate(theDate, FlotTooltip.tooltipOptions.dateFormat);
        },
        
        stringFormat: function(content, item, fnct) {
        
            var percentPattern = /%p\.{0,1}(\d{0,})/;
            var seriesPattern = /%s/;
            var xPattern = /%x\.{0,1}(\d{0,})/;
            var yPattern = /%y\.{0,1}(\d{0,})/;
            
            //percent match
            if( typeof (item.series.percent) !== 'undefined' ) {
                content = this.adjustValPrecision(percentPattern, content, item.series.percent);
            }
            //series match
            if( typeof(item.series.label) !== 'undefined' ) {
                content = content.replace(seriesPattern, item.series.label);
            }
            // xVal match
            if( typeof(fnct) === 'function' ) {
                content = content.replace(xPattern, fnct(item.series.data[item.dataIndex][0]) );
            }
            else if( typeof item.series.data[item.dataIndex][0] === 'number' ) {
                content = this.adjustValPrecision(xPattern, content, item.series.data[item.dataIndex][0]);
            }
            // yVal match
            if( typeof item.series.data[item.dataIndex][1] === 'number' ) {
                content = this.adjustValPrecision(yPattern, content, item.series.data[item.dataIndex][1]);
            }

            return content;
        },
        
        adjustValPrecision: function(pattern, content, value) {
        
            var precision;
            if( content.match(pattern) !== 'null' ) {
                if(RegExp.$1 !== '') {
                    precision = RegExp.$1;
                    value = value.toFixed(precision);
                }
                content = content.replace(pattern, value);
            }
        
            return content;
        }
    };

    // define Flot plugin
    $.plot.plugins.push({
        init: FlotTooltip.init,
        options: FlotTooltip.defaultOptions,
        name: 'tooltip',
        version: '0.5'
    });

})(jQuery);
