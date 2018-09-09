# D3 Hourglass

Run an hour glass using D3's [force layout](https://github.com/d3/d3-force) and [`.polygonContains`](https://github.com/d3/d3-polygon) function.

## Setup

	var hg = hourglass.default("#hourglass_demo", {
		count: 100,
		color: "green"
	});

## Build from source

	npm install
	npm run build
	npm run minify

## Sources and Inspirations

By default, the hourglass has red grains. (cf. _Oz, The Wizard Of_, _Potter, Harry_)

![The Wicked Witch of the West](img/WickedWitch.jpg)
![Gryffindor House Points](img/HarryPotter.png)

The SVG is based on this [Creative Commons hourglass](http://www.clker.com/clipart-gold-hour-glass.html)

## To Do

+ Fill out documentation
+ Consider custom collisions
+ For "release all," monitor `alpha` value vs. number of completions

# LICENSE
MIT