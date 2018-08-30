var hourglass = hourglass || {};

hourglass.outline = function(container_id, width, height) {
	var Engine = Matter.Engine,
		Render = Matter.Render,
		Runner = Matter.Runner,
		Composites = Matter.Composites,
		Common = Matter.Common,
		World = Matter.World,
		Svg = Matter.Svg,
		Bodies = Matter.Bodies;

	// create engine
	var engine = Engine.create(),
		world = engine.world;

	// create renderer
	var render = Render.create({
		element: document.getElementById(container_id),
		engine: engine,
		options: {
			width: width,
			height: height
		}
	});

	Render.run(render);

	// create runner
	var runner = Runner.create();
	Runner.run(runner, engine);

	// add bodies
	var terrain;
    var vertexSets = [[]];

    var p = document.querySelector("#hourglass_shape path");
    var d = p.getTotalLength();
    var point = p.getPointAtLength(0);
    var pathStr = "M" + point.x + "," + point.y;


    for (var x = 1; x <= d; x += 5) {
    	point = p.getPointAtLength(x);
    	pathStr += "L" + point.x + "," + point.y;
        vertexSets[0].push({ x: point.x, y: point.y });
    }


    p.setAttribute("d", pathStr);

	terrain = Bodies.fromVertices(width, height, vertexSets, {
		isStatic: true,
		render: {
        	fillStyle: '#FF0000',
			strokeStyle: '#404040',
			lineWidth: 1
		}
	}, true);    


}

