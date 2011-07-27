jquery.flot.tooltip
===================
#### tooltip plugin for wonderful Flot plotting library ####

Check http://code.google.com/p/flot/ for Flot details.

Works also with Time series data and supports Date formatting in the same way as Flot itself.
You can fully define content of tip and you can use HTML tags too.
Flot Tooltip can be easily customized with CSS. Just do what you want with `#flotTip` in your stylesheet.

See the `example.html` and `example_series.html` files and source code of plugin for details of how to use it.

Changelog
---------

### What's new in v0.3? ###

I'd like to introduce 'string formatter'. Now you can easily define how content of your flot.tooltip should look like.
You can also use HTML tags!

Just use new option called `content`. The following specifiers are supported:

-   `%x`: for X value
-   `%y`: for Y value
-   `%s`: for series label

Also minified version is available.

#### Examples: ####

	content: "value of X is %x and value of Y is %y and they belong to %s series"
	
	
	content: "<h4>%s</h4><ul><li>X is %x</li><li>Y is %y</li></ul>"

### v0.2 ###

-   many series support with series name on the tooltip
-   date and time formatting can be defined when in time mode (using internal plot function)
-   tooltip position shift can be defined

Important!
----------
You need to set hoverable to true if you want this tooltip plugin to work.

	grid: {
		hoverable: true 
	}

Plugin Options (v0.3)
-------
In comments there are default values

	tooltip: 			boolean 		//false
	tooltipOpts: {
		content:		string			//"%s | X: %x | Y: %y"
		dateFormat: 	formatstring 	//"%y-%0m-%0d"
		shifts: { 
			x: 			int				//25
			y: 			int				//25
		}
	}

	
-   `tooltip` : set to `true` to turn on this plugin (if `grid.hoverable` is also set to `true`)
-	`content` : content of your tooltip, HTML tags are also allowed; use %s as series label, %x as X value, %y as Y value
-   `dateFormat` : you can use the same specifiers as in Flot, for time mode data
-   `shifts` : shift tooltip position regarding mouse pointer for `x` and `y`, negative values are ok

Depreciated in v0.3:

-   `xValText` : you can change text displayed on tooltip related to X value of hovered item
-   `yValText` : the same as above but regarding Y value
-   `series` : determine if name of series should be displayed in tooltip (if label exists)
	
* * *
Copyright (c) 2011 Krzysztof Urbas (@krzysu).

jquery.flot.tooltip is available under the MIT license.