var redraw, renderer;
var known_nodes = [];

/* only do all this when document has finished loading (needed for RaphaelJS) */
window.onload = function() {

	 var i = 0;
    redraw = function() {

    var width = $(document).width() - 30;
    var height = $(document).height() - 250;       

	 document.getElementById('canvas').innerHTML = '';
    var g = new Graph();
    var layouter = new Graph.Layout.Spring(g);
	 delete renderer;
    renderer = new Graph.Renderer.Raphael('canvas', g, width, height);

	   st = {
        "directed": true,
        "label" : "Label",
        "label-style" : {
                "font-size": 20
            }
        };

		g.clear();
		var data = document.getElementById("input_data").value;
		var rows = data.split("\n");
		i = 0;
		for (row in rows)
		{
			if (row.length > 0)
			{
				var referrals = rows[row].split(",");
				if (referrals.length == 2)
				{
					var source = referrals[0].trim();
					var referral = referrals[1].trim();				
					if (known_nodes[source] == undefined)
					{
						g.addNode(source);
					}
					if (known_nodes[source] == undefined)
					{
						g.addNode(referral);
					}
					known_nodes[source] = 1;
					known_nodes[referral] = 1;
					g.addEdge(source, referral, {directed:true});
				}
			}
		}

        layouter.layout();
        renderer.draw();
    };
	 window.onresize = redraw;
 	 redraw();
};
