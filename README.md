# jquery.flot.tooltip #
__tooltip plugin for wonderful Flot plotting library__

Check http://code.google.com/p/flot/ for Flot details.

Works also with Time series data and supports Date formatting in the same way as Flot itself.
You can fully define content of tip (with values precision) and you can use HTML tags too.
Flot Tooltip can be easily customized with CSS. Just do what you want with `#flotTip` in your stylesheet.

See the `example.html` and `example_series.html` files and source code of plugin for details of how to use it.

## Changelog ##

### What's new in v0.4? ###

Now you can easily set precision of values displayed on tip thanks to enhanced _string formatter_.
Just put your desired precision after value in format like this `%x.precision`, 
where _precision_ is a number of digits to appear after the decimal point. It uses `number.toFixed(precision)` function internally.

What is more _string formatter_ was rewritten and now is RegExp based.

#### Examples: ####

	content: "value of X is %x.1 and value of Y is %y.4 and they belong to '%s' series"
	content: "<h4>%s</h4><ul><li>X is %x</li><li>Y is %y.2</li></ul>"

### v0.3 ###

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

## Important! ##

You need to set hoverable to true if you want this tooltip plugin to work.

	grid: {
		hoverable: true 
	}

## Plugin Options (v0.4) ##

In comments there are default values

	tooltip: 			boolean 		//false
	tooltipOpts: {
		content:		string			//"%s | X: %x | Y: %y.2"
		dateFormat: 	string		 	//"%y-%0m-%0d"
		shifts: { 
			x: 			int				//25
			y: 			int				//25
		}
	}

	
-   `tooltip` : set to `true` to turn on this plugin (if `grid.hoverable` is also set to `true`)
-	`content` : content of your tooltip, HTML tags are also allowed; use `%s` as series label, `%x` as X value, `%y` as Y value. 
	With `%x` and `%y` values you can also use `.precision`, for example `%x.2` means that value of X will be rounded to 2 digits after the decimal point.
-   `dateFormat` : you can use the same specifiers as in Flot, for time mode data
-   `shifts` : shift tooltip position regarding mouse pointer for `x` and `y`, negative values are ok

Depreciated in v0.3:

-   `xValText` : you can change text displayed on tooltip related to X value of hovered item
-   `yValText` : the same as above but regarding Y value
-   `series` : determine if name of series should be displayed in tooltip (if label exists)
	
* * *
Copyright (c) 2011 Krzysztof Urbas (@krzysu).

__jquery.flot.tooltip__ is available under the MIT license.