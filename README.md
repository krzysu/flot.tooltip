# jquery.flot.tooltip
__tooltip plugin for wonderful Flot plotting library__

For information about Flot library [go here](http://www.flotcharts.org/).

Works also with Time series data and supports Date formatting in the same way as Flot itself.
You can fully define content of tip (with values precision) and you can use HTML tags too.
Flot Tooltip can be easily customized with CSS. Just do what you want with `#flotTip` in your stylesheet.

Check `examples` folder for details of how to use it.


## How to use
Download and include on your page __after__ main jquery.flot library:

-   [download uncompressed flot.tooltip](https://raw.github.com/krzysu/flot.tooltip/master/js/jquery.flot.tooltip.js)
-   [download minified flot.tooltip](https://raw.github.com/krzysu/flot.tooltip/master/js/jquery.flot.tooltip.min.js)

__Important!__ You need to set flot option `hoverable` to `true` if you want flot.tooltip plugin to work.

    grid: {
      hoverable: true 
    }

### Plugin Options (latest version)

In comments there are default values  

    tooltip:            boolean                 //false
    tooltipOpts: {
        content:        string or function      //"%s | X: %x | Y: %y"
        xDateFormat:    string                  //null
        yDateFormat:    string                  //null
        shifts: { 
            x:          int                     //10
            y:          int                     //20
        },
        defaultTheme:   boolean                 //true
        onHover:        function(flotItem, $tooltipEl)
    }


-   `tooltip` : set to `true` to turn on this plugin (if `grid.hoverable` is also set to `true`)
-   `content` : content of your tooltip, HTML tags are also allowed; use `%s` for series label, `%x` for X value, `%y` for Y value and `%p` for percentage value (useful with pie charts using flot.pie plugin)  
	With `%x`, `%y` and `%p` values you can also use `.precision`, for example `%x.2` means that value of X will be rounded to 2 digits after the decimal point.   
  If no precision or dateFormat is set then plugin uses tickFormatter to format values displayed on tooltip.  
  If you require even more control over how the tooltip is generated you can pass a callback `function(label, xval, yval)` that must return a string with the format described. 
-   `xDateFormat` : you can use the same specifiers as in Flot, for time mode data
-   `yDateFormat` : you can use the same specifiers as in Flot, for time mode data
-   `shifts` : shift tooltip position regarding mouse pointer for `x` and `y`, negative values are ok
-   `defaultTheme` : plugin have default theme build-in but here you can switch it off and adjust look of tip styling `#flotTip` in your CSS
-   `onHover` : callback that allows you i.e. change color of the border of the tooltip according to the currently hovered serie

Depreciated in v0.5:
-   `dateFormat`

Depreciated in v0.3:

-   `xValText` : you can change text displayed on tooltip related to X value of hovered item
-   `yValText` : the same as above but regarding Y value
-   `series` : determine if name of series should be displayed in tooltip (if label exists)

## For developers/contributors

In v0.5 I added [grunt.js](http://gruntjs.com/) as easy to use build tool. During development you should work with `js/jquery.flot.tooltip.source.js` file. You can have `grunt watch` running or run `grunt build` every time you want.

## Changelog

### What's new in v0.6 or v0.6.1?

-   nothing from user perspective :) 
-   another refactoring, `FlotTooltip` object structure changed to allow many instances to fix issue #13 (regression after v0.5 refactoring)

### v0.5.1

-   `content` can be a function (thx to [@fmsf](https://github.com/fmsf) for pull request)

### v0.5

-   refactoring + fixed few issues (#7 and #11)
-   `dateFormat` option replaced with `xDateFormat` and `yDateFormat` to support both axes
-   changed string formatter logic:
    -   if any axis has `mode == time` then format value according to axis date format (if defined) or tick format
    -   if value has set precision, use it
    -   in the end use tick formatter for the axis

### v0.4.4

-   add jquery.flot.pie plugin support, you can display percentage value on tooltip (thx to [@ismyrnow](https://github.com/ismyrnow) for pull request)

### v0.4.3

-   add jquery.flot.stack plugin support, values in tooltip are now displayed correctly (issue #3)

### v0.4.2

-   tooltip is appended to `body`, not `placeholder` of graph
-   changed default values of tip's shifts
-   time is formatted when first axis of flot's multi-axes is in time mode (issue #2) (full multi-axes support maybe in the future)
-   `#flotTip` container is initialized only if it does not exist (see new multiple-axes example and re-initialize plot)

### v0.4.1

-   default theme with new option to disable it if you like to add your own styles

### v0.4

Now you can easily set precision of values displayed on tip thanks to enhanced _string formatter_.
Just put your desired precision after value in format like this `%x.precision`, 
where _precision_ is a number of digits to appear after the decimal point. It uses `number.toFixed(precision)` function internally.

What is more _string formatter_ was rewritten and now is RegExp based.

#### Examples:

    content: "value of X is %x.1 and value of Y is %y.4 and they belong to '%s' series"
    content: "<h4>%s</h4><ul><li>X is %x</li><li>Y is %y.2</li></ul>"

### v0.3

I'd like to introduce _string formatter_. Now you can easily define how content of your flot.tooltip should look like.
You can also use HTML tags!

Just use new option called `content`. The following specifiers are supported:

-   `%x`: for X value
-   `%y`: for Y value
-   `%s`: for series label

From now on also minified version is available.

### v0.2 ###

-   many series support with series name on the tooltip
-   date and time formatting can be defined when in time mode (using internal plot function)
-   tooltip position shift can be defined


## Contributors

-   [@ismyrnow](https://github.com/ismyrnow) - add jquery.flot.pie plugin support
-   [@fmsf](https://github.com/fmsf) - `content` can be a function
-   [@pdelanauze](https://github.com/pdelanauze) - upgrade to gruntjs v0.4 + memory usage optimization
-   [@grrowl](https://github.com/grrowl) - fix tooltip position for touch devices
-   [@Athanasius](https://github.com/Athanasius) - fix issue #17, Tooltip is outside the window
-   [@erezmazor](https://github.com/erezmazor) - added label to the signature of content function to allow for fully custom label drawing


* * *
Copyright (c) 2011-2013 Krzysztof Urbas (@krzysu).

__jquery.flot.tooltip__ is available under the MIT license.
