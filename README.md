jquery.flot.tooltip
===================
#### tooltip plugin for wonderful Flot plotting library ####

Check http://code.google.com/p/flot/ for Flot details.

This is version 0.2 so it may have some issues. It was not fully tested.
Works also with Time series data and supports Date formatting in the same way as Flot itself.
Flot Tooltip can be easily customized with CSS. Just do what you want with `#flotTip` in your stylesheet.

See the `example.html` and `example_series.html` files and source code of plugin for details of how to use it.

Changelog
---------
What's new in 0.2?
-   many series support with series name on the tooltip
-   date and time formatting can be defined when in time mode (using internal plot function)
-   tooltip position shift can be defined

Important!
----------
You need to set hoverable to true if you want this tooltip plugin to work.

	grid: {
		hoverable: true 
	}

Options
-------

	tooltip: 			boolean 		//default `false`, set to `true` to turn on this plugin
	tooltipOpts: {
		xValText: 		string 			//default `X: `, you can change text displayed on tooltip related to X value of hovered item
		yValText: 		string 			//default `Y: `, the same as above but regarding Y value
		series:			boolean 		//show series name in tooltip (if exists)? default `true`
		dateFormat: 	formatstring 	//default: `%y-%0m-%0d` but you can use the same specifiers as in Flot, for time mode data
		shifts: { 						//shift tooltip position regarding mouse pointer, negative values are ok
			x: 			int
			y: 			int
		}
	}
	
* * *
Copyright (c) 2011 Krzysztof Urbas (@krzysu).
jquery.flot.tooltip is available under the MIT license.