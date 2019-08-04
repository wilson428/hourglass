var hourglass = hourglass || {};

hourglass.outline = function(container_id, width, height) {

    var vertexSets = [];

    var paths = document.querySelectorAll("#hourglass_shape path");

    var points = [];

    var INTERVAL = 10;

    function getPoints(id) {
    	var points = [];
    	var p = document.querySelector("#" + id);
	    var d = p.getTotalLength();

	    for (var x = 0; x <= d; x += INTERVAL) {
	    	point = p.getPointAtLength(x);
		    points.push(point);
	    }

    	point = p.getPointAtLength(d);
	    points.push(point);


	    return points;
    }

    // var last_point = all_points.slice(-1)[0];
    // console.log(last_point);
    // new_points.push(last_point);

    var all_points = [];

    // all_points = all_points.concat(getPoints("outline"));

    var new_points = getPoints("small_curve_nw");
    all_points = all_points.concat(new_points);
	
	new_points = getPoints("small_curve_ne").reverse();
    all_points = all_points.concat(new_points);

	new_points = getPoints("big_curve_ne");
    all_points = all_points.concat(new_points);

	new_points = getPoints("right_bend");
    all_points = all_points.concat(new_points);

	new_points = getPoints("big_curve_se").reverse();
    all_points = all_points.concat(new_points);

	new_points = getPoints("small_curve_se");
    all_points = all_points.concat(new_points);

	new_points = getPoints("small_curve_sw").reverse();
    all_points = all_points.concat(new_points);

	new_points = getPoints("big_curve_sw");
    all_points = all_points.concat(new_points);

	new_points = getPoints("left_bend").reverse();
    all_points = all_points.concat(new_points);

	new_points = getPoints("big_curve_nw").reverse();
    all_points = all_points.concat(new_points);

	new_points = getPoints("outline");
 //    all_points = all_points.concat(new_points);
	
	var newPathStr = "M" + all_points.map(d => { return d.x + "," + d.y; }).reverse().join(" ") + "M" + new_points.map(d => { return d.x + "," + d.y; }).join(" ");

	var newpath = document.createElementNS('http://www.w3.org/2000/svg',"path");  

	newpath.setAttributeNS(null, "d", newPathStr);
	newpath.setAttributeNS(null, "stroke", "url(#SVGID_11_)");
	newpath.setAttributeNS(null, "stroke-width", "5px");
	newpath.setAttributeNS(null, "fill", "rgba(0,0,255,0.3)");	

	var svg = document.querySelectorAll("#hourglass_shape");
	svg[0].appendChild(newpath);

	console.log(newPathStr)

}

