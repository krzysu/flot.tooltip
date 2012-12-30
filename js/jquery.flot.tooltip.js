/*
 * jquery.flot.tooltip
 * 
 * description: easy-to-use tooltips for Flot charts
 * version: 0.5
 * author: Krzysztof Urbas @krzysu [myviews.pl]
 * website: https://github.com/krzysu/flot.tooltip
 * 
 * build on 2012-12-30
 * released under MIT License, 2012
*/

(function ($) {

    var FlotTooltip = {

        // plugin options, default values
        defaultOptions: {
            tooltip: false,
            tooltipOpts: {
                content: "%s | X: %x | Y: %y",
                // allowed templates are:
                // %s -> series label,
                // %x -> X value,
                // %y -> Y value,
                // %x.2 -> precision of X value,
                // %p -> percent
                xDateFormat: null,
                yDateFormat: null,
                shifts: {
                    x: 10,
                    y: 20
                },
                defaultTheme: true,

                // callbacks
                onHover: function(flotItem, $tooltipEl) {}
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
                        
                        // convert tooltip content template to real tipText
                        tipText = that.stringFormat(that.tooltipOptions.content, item);
                        
                        $tip.html( tipText )
                            .css({
                                left: that.tipPosition.x + that.tooltipOptions.shifts.x,
                                top: that.tipPosition.y + that.tooltipOptions.shifts.y
                            })
                            .show();
                    
                        // run callback
                        if(typeof that.tooltipOptions.onHover === 'function') {
                            that.tooltipOptions.onHover(item, $tip);
                        }
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

        /**
         * watch mouse position and update tooltip position
         */
        onMouseMove: function(e) {
                        
            var pos = {x: 0, y: 0};

            pos.x = e.pageX;
            pos.y = e.pageY;

            FlotTooltip.updateTooltipPosition(pos);
        },

        updateTooltipPosition: function(pos) {
            this.tipPosition.x = pos.x;
            this.tipPosition.y = pos.y;
        },
        
        /**
         * core function, create tooltip content
         * @param  {string} content - template with tooltip content
         * @param  {object} item - Flot item
         * @return {string} real tooltip content for current item
         */
        stringFormat: function(content, item) {
        
            var percentPattern = /%p\.{0,1}(\d{0,})/;
            var seriesPattern = /%s/;
            var xPattern = /%x\.{0,1}(\d{0,})/;
            var yPattern = /%y\.{0,1}(\d{0,})/;

            // percent match for pie charts
            if( typeof (item.series.percent) !== 'undefined' ) {
                content = this.adjustValPrecision(percentPattern, content, item.series.percent);
            }
            
            // series match
            if( typeof(item.series.label) !== 'undefined' ) {
                content = content.replace(seriesPattern, item.series.label);
            }

            // time mode axes with custom dateFormat
            if(this.isTimeMode('xaxis', item) && this.isXDateFormat(item)) {
                content = content.replace(xPattern, this.timestampToDate(item.series.data[item.dataIndex][0], this.tooltipOptions.xDateFormat));
            }

            if(this.isTimeMode('yaxis', item) && this.isYDateFormat(item)) {
                content = content.replace(yPattern, this.timestampToDate(item.series.data[item.dataIndex][1], this.tooltipOptions.yDateFormat));
            }

            // set precision if defined
            if( typeof item.series.data[item.dataIndex][0] === 'number' ) {
                content = this.adjustValPrecision(xPattern, content, item.series.data[item.dataIndex][0]);
            }
            if( typeof item.series.data[item.dataIndex][1] === 'number' ) {
                content = this.adjustValPrecision(yPattern, content, item.series.data[item.dataIndex][1]);
            }

            // if no value customization, use tickFormatter by default
            if(typeof item.series.xaxis.tickFormatter !== 'undefined') {
                content = content.replace(xPattern, item.series.xaxis.tickFormatter(item.series.data[item.dataIndex][0], item.series.xaxis));
            }
            if(typeof item.series.yaxis.tickFormatter !== 'undefined') {
                content = content.replace(yPattern, item.series.yaxis.tickFormatter(item.series.data[item.dataIndex][1], item.series.yaxis));
            }

            return content;
        },

        // helpers just for readability
        isTimeMode: function(axisName, item) {
            return (typeof item.series[axisName].options.mode !== 'undefined' && item.series[axisName].options.mode === 'time');
        },

        isXDateFormat: function(item) {
            return (typeof this.tooltipOptions.xDateFormat !== 'undefined' && this.tooltipOptions.xDateFormat !== null);
        },

        isYDateFormat: function(item) {
            return (typeof this.tooltipOptions.yDateFormat !== 'undefined' && this.tooltipOptions.yDateFormat !== null);
        },

        // 
        timestampToDate: function(tmst, dateFormat) {
            var theDate = new Date(tmst);
            return $.plot.formatDate(theDate, dateFormat);
        },
        
        // 
        adjustValPrecision: function(pattern, content, value) {
        
            var precision;
            if( content.match(pattern) !== 'null' ) {
                if(RegExp.$1 !== '') {
                    precision = RegExp.$1;
                    value = value.toFixed(precision);

                    // only replace content if precision exists
                    content = content.replace(pattern, value);
                }
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
