const DX = 60;
const DY = 30;
const WIDTH = 200;
const HEIGHT = 360;
const MARGIN = 5;

// points toward which we'll be directing our jewels
const TARGETS = {
	bottom: { x: DX + WIDTH / 2, y: DY + HEIGHT - MARGIN },
	bottleneck: { x: DX + WIDTH / 2, y: DY + HEIGHT / 2},
	upper_center: { x: DX + WIDTH / 2, y: DY + WIDTH / 4 },
	lower_center: { x: DX + WIDTH / 2, y: DY + 3 * WIDTH / 4 },
};

const default_options = {
	count: 100, 			// number of jewels
	fill: "#BB0000",		// see Wicked Witch, Gryffindor house points, etc.
	radius: 3,				// radius of the particles
	alpha_max: 0.85,		// ideally this shouldn't need to be modified except by super-users
	alpha_min: 0.15			// ditto
};

// Debugging helpers. Should all be false in production
var DEBUG = {
	drawTargets: false,			// draw yellow circles around the attraction points in `TARGETS`
	showBoundingPolygon: false,	// show the bounding polygon for the jewels so that they don't puncture the glass
	tickOnClick: true,			// advance the simulation with `.tick()` while clicking anywhere on the hourglass
	tickToStart: false,			// whether to start the simulation right away or force one to click through it
	autoStart: true,			// whether to skip the initial animation
	showConsole: true			// whether to suppress `console.log`
};

var PLAYING = false;

var polygon = [[160,385],[169.99783325195312,384.8216552734375],[179.97950744628906,384.2312316894531],[189.9171142578125,383.1285095214844],[199.76194763183594,381.3863220214844],[209.42999267578125,378.8451232910156],[218.77999877929688,375.3147888183594],[227.5870361328125,370.5967102050781],[235.53392028808594,364.5469055175781],[242.26528930664062,357.17138671875],[247.52120971679688,348.68023681640625],[251.25006103515625,339.41302490234375],[253.58839416503906,329.6977844238281],[254.7565460205078,319.77099609375],[254.9285125732422,309.77777099609375],[253.0956268310547,299.9741516113281],[248.96331787109375,290.8913269042969],[243.1056365966797,282.8018493652344],[236.13121032714844,275.6439514160156],[228.47378540039062,269.216796875],[220.4088592529297,263.3062438964844],[212.11558532714844,257.7192077636719],[203.7249298095703,252.27894592285156],[195.3548126220703,246.80728149414062],[187.14418029785156,241.1002960205078],[179.31021118164062,234.89004516601562],[172.27536010742188,227.79791259765625],[166.9674530029297,219.3641815185547],[165.00279235839844,209.63514709472656],[167.18026733398438,199.9451904296875],[172.5508270263672,191.54861450195312],[179.60275268554688,184.4730682373047],[187.44851684570312,178.2777557373047],[195.6724090576172,172.58995056152344],[204.057861328125,167.14181518554688],[212.4646759033203,161.72657775878906],[220.77369689941406,156.16302490234375],[228.8504638671875,150.26870727539062],[236.51011657714844,143.84442138671875],[243.4658660888672,136.66891479492188],[249.26547241210938,128.53868103027344],[253.2840576171875,119.406005859375],[254.96173095703125,109.57486724853516],[254.71630859375,99.58204650878906],[253.4949951171875,89.66168212890625],[251.09974670410156,79.96043395996094],[247.30686950683594,70.71940612792969],[241.97979736328125,62.272945404052734],[235.1770782470703,54.96343994140625],[227.168212890625,48.995887756347656],[218.31460571289062,44.36547088623047],[208.93359375,40.91802978515625],[199.24661254882812,38.449562072753906],[189.39122009277344,36.76732635498047],[179.44839477539062,35.711788177490234],[169.46475219726562,35.15603256225586],[159.46649169921875,35.00056457519531],[149.4689483642578,35.194786071777344],[139.48809814453125,35.7987174987793],[129.55194091796875,36.91450881958008],[119.70989990234375,38.67224884033203],[110.04771423339844,41.23563003540039],[100.71070861816406,44.79970169067383],[91.93060302734375,49.56721496582031],[84.03350830078125,55.68132019042969],[77.37850189208984,63.125389099121094],[72.21649932861328,71.67403411865234],[68.5816879272461,80.97871398925781],[66.32288360595703,90.71302795410156],[65.21314239501953,100.64671325683594],[65.0982894897461,110.6401596069336],[67.04029083251953,120.42250061035156],[71.2803726196289,129.45542907714844],[77.23090362548828,137.47705078125],[84.27986145019531,144.56178283691406],[91.99526977539062,150.9193572998047],[100.10437774658203,156.76925659179688],[108.42982482910156,162.30833435058594],[116.83990478515625,167.7184600830078],[125.2157974243164,173.1811981201172],[133.4116668701172,178.9091339111328],[141.19789123535156,185.1783905029297],[148.1245880126953,192.37466430664062],[153.23294067382812,200.92897033691406],[154.9893341064453,210.70205688476562],[152.6051788330078,220.34022521972656],[147.060546875,228.6249237060547],[139.92001342773438,235.61245727539062],[132.03753662109375,241.76168823242188],[123.80534362792969,247.43771362304688],[115.4288558959961,252.89964294433594],[107.04302215576172,258.3472900390625],[98.76537322998047,263.9573974609375],[90.73030853271484,269.908203125],[83.1238021850586,276.3952331542969],[76.23509216308594,283.6349792480469],[70.51840209960938,291.8236389160156],[66.59719848632812,300.99847412109375],[65.02245330810547,310.8466491699219],[65.31916809082031,320.8384094238281],[66.60186004638672,330.7507629394531],[69.07901000976562,340.4311828613281],[72.9673080444336,349.63226318359375],[78.38758087158203,358.01910400390625],[85.2643814086914,365.2593994140625],[93.32048797607422,371.1636047363281],[102.19942474365234,375.74578857421875],[111.59251403808594,379.1608581542969],[121.28500366210938,381.60784912109375],[131.1429443359375,383.2745666503906],[141.08717346191406,384.3168640136719],[151.0715789794922,384.8589172363281],[160,385]];

var hourglass = function(id, options) {
	options = Object.assign(default_options, options);

	// number of jewels that have passed the midpoint
	var jewel_count = {
		upper: options.count,
		lower: 0
	};

	var svg = d3.select("svg");

	// var polygon = computePathPoints(d3.select("#bounding_polygon").node(), 10);

	// generate the node objects
	var nodes = d3.range(options.count).map(function(i) {
		var node = {
			id: i,
			r: options.radius,
			confined: true, 				// whether this particle is confined to the upper chamber
			floor: DY + HEIGHT / 2 - 5,		// maximum Y value. This starts in the middle such that we can control the flow
			x: TARGETS.upper_center.x + (Math.random() - 0.5) * 50,
			y: TARGETS.upper_center.y + (Math.random() - 0.5) * 50
	  	};
	  	return node;
	});

	// make jewels -- the "physical" nodes in the svg object
	var jewels = svg.selectAll("circle")
		.data(nodes)
		.enter().append("circle")
		.attr("r", options.radius)
		.attr("class", "jewel")
		// .style("fill", options.fill)
		.attr("id", function(d) {
			return "jewel_" + d.id;
		});

	// connect physical jewels to data objects for convenience
	nodes.forEach(node => {
		node.jewel = svg.select("#jewel_" + node.id);
	});

	var x = d3.forceX(TARGETS.bottom.x).strength(0.012);
	var y = d3.forceY(TARGETS.bottom.y).strength(function(d) {
		if (d.confined) {
			return PLAYING ? 0.01 : 0.015;
		}
		return 0.075;		
	});

	var simulation = d3.forceSimulation(nodes)
		.nodes(nodes)
		.alpha(options.alpha_max)
		.alphaMin(options.alpha_min)
		.force("collide", d3.forceCollide(3).iterations(3))
		// .force("collisions", getCollisions(5))
		.force("x", x)
		.force('isInsideGlass', isInsideGlass)
		.on("tick", ticked);

	simulation.force("y", y);

	function ticked() {
		console.log("tick");

		var alpha = simulation.alpha();
		var outOfBoundsCount = 0;

		jewels.each(function(d, i, t) {
			d.jewel.attr("cx", function(d) { return d.x; }).attr("cy", function(d) { return d.y; });

			// re-check if inBounds
			var point = [d.x, d.y];

			d.isInBounds = d3.polygonContains(polygon, point);

			d.jewel.classed("outOfBounds", !d.isInBounds);

			outOfBoundsCount += d.isInBounds? 0 : 1;

			if (d.cementMe) {
				// d.fx = d.x -= d.vx;
				// d.fy = d.y -= d.vy;
				// d.fx = d.x;
				// d.fy = d.y;
				// d.jewel.classed("fixed", true);
				d.cementMe = false;
				// d.cemented = true;
			}			
		});

		if (DEBUG.showConsole) {
			console.log("(alpha is", alpha, "and outOfBounds count is", outOfBoundsCount);
		}
	}

	if (DEBUG.tickToStart) {
		simulation.stop();
		ticked();
	}

	if (DEBUG.autoStart) {
		simulation.stop();
		for (var c = 0; c < 50; c += 1) {
			simulation.tick();
		}
		ticked();
	}

	if (DEBUG.tickOnClick) {
		svg.selectAll(".horizontal").on("click", function() {
			simulation.tick();
			ticked();
		});
	}
	
	if (DEBUG.showBoundingPolygon) {
		svg.select("#bounding_polygon").style("fill-opacity", 0.3).style("stroke-width", "1px");
	}

	if (DEBUG.drawTargets) {
		Object.keys(TARGETS).forEach(key => {
			svg.append("circle")
				.attr("cx", TARGETS[key].x)
				.attr("cy", TARGETS[key].y)
				.attr("r", 5)
				.attr("class", "target");
		});

		var line = d3.line().x(d => { return d[0]; }).y(d => { return d[1]; });
	}


	// test whether a node is in the right chamber (as determined by node.constraint)
	// if not, move it toward the center of the chamber (as determined by node.correctionPoint)
	function isInsideGlass(alpha) {
		// for (var i = 0, n = nodes.length, node, k = alpha * 0.05; i < n; ++i) {
		for (var i = 0, n = nodes.length, node; i < n; ++i) {
			var node = nodes[i];
			var peek = { x: node.x + node.vx, y: node.y + node.vy };

			if (peek.y > node.floor) {
				// console.log("Subtracting", node.vy, "from", node.y);
				peek.y = node.y;
				node.y = node.y - node.vy;
				node.cementMe = true;			
			}

			var point = [peek.x, peek.y];

			node.isInBounds = d3.polygonContains(polygon, point);

			if (!node.isInBounds) {
				if (node.x < TARGETS.upper_center.x) {
					node.x += Math.abs(node.vx);
				} else {
					node.x -= Math.abs(node.vx);
				}

				node.y -= node.vy;
			}
		}
	}

	function releasejewel() {
		jewel_count.lower += 1;
		jewel_count.upper -= 1;

		var closest = simulation.find(TARGETS.bottleneck.x, TARGETS.bottleneck.y, 100);

		// closest.jewel.classed("falling", true);
		// delete closest.fx;
		// delete closest.fy;

		closest.confined = false;
		PLAYING = true;
		simulation.force("y", y)

		// for (var c = 0; c < 150; c += 1) {
		// 	simulation.tick();
		// }
		// ticked();

		closest.floor = TARGETS.floor;
		simulation.alpha(options.alpha_max);
		simulation.restart();
	}

	return {
		releaseOne: function() {
			releasejewel();
		},
		releaseN: function(N, duration) {
			duration = duration || 1;
			duration = Math.max(duration, N);

			var interval = duration / N;

			var count = 0;

			var timer = setInterval(function() {
				releasejewel();
				count += 1;
				if (count === N) {
					clearTimeout(timer);
				}
			}, interval);
		}
	}
}

function computePathPoints(pathObj, resolution) {
	var length = pathObj.getTotalLength();
	var points = [];
	for (var c = 0; c < length; c += resolution) {
		let point = pathObj.getPointAtLength(c);
		points.push([ point.x, point.y ]);
	}
	var point = pathObj.getPointAtLength(length);
	points.push([ point.x, point.y ]);
	console.log(JSON.stringify(points));
	return points;
}
