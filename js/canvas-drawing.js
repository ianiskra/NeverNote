	// Retrieve the canvas ID
	canvasDiv = document.getElementById('canvas');
	let canvas = document.createElement('canvas');
	window.currentDrawingColor = '#000';

	// Variables for the mouse control
	window.paths = [];
	window.currentPath = null;
	window.currentLineJoin = "round";
	window.currentLineWidth = 5;


	// Size of Canvas
	canvas.setAttribute('width', '1000');
	canvas.setAttribute('height', '500');
	canvas.setAttribute('id', 'canvas');

	// Background of the Canvas
	canvas.style.backgroundColor = "#EEE";
	canvasDiv.appendChild(canvas);

	
	if(typeof G_vmlCanvasManger != 'undefined'){
		canvas = G_vmlCanvasManger.initElement(canvas);
	}

	// window.context = canvas.getContext("2d");

	// Fires when the user depresses the mouse button.
	$("#canvas").mousedown(function(e){

		window.currentPath = {
			x:[], 
			y:[], 
			strokeStyle: window.currentDrawingColor,
			lineWidth: window.currentLineWidth,
			lineJoin: window.currentLineJoin
		};

		window.paths.push(window.currentPath);

		addPoint(e.pageX, e.pageY);
		redraw(canvas);
	});

	$("#canvas").mousemove(function(e){

		if(window.currentPath != null){
			addPoint(e.pageX, e.pageY, true);
			redraw(canvas);
		}
	});

	// Fires when user releases the mouse button.
	$("#canvas").mouseup(function(e){
		window.currentPath = null;
	});

	// Won't resume painting without Click
	$("#canvas").mouseleave(function(e){
		
	});



	/* Functions */
	
	function addPoint(x, y){
		currentPath.x.push(x);
		currentPath.y.push(y);
	}

	// Clear Canvas
	function redraw(canvas){
		// console.log(window.paths);

		const context = canvas.getContext("2d");
		
		
		context.clearRect(0, 0, canvas.width, canvas.height);
		
		window.paths.forEach((path) => {
			console.log(path);
			context.strokeStyle = path.strokeStyle;
			context.lineWidth = path.lineWidth;
			context.lineJoin = path.lineJoin;

			
			context.beginPath();

			// Begining of Path
			context.moveTo(path.x[0], path.y[0]);
			
			for(let i = 1; i < path.x.length; i++){
				context.lineTo(path.x[i], path.y[i]);
			}
			
			context.moveTo(path.x[0], path.y[0]);
			context.closePath();
			context.stroke();
		});

		// As mouse click and drag is inside canvas
		// for(let i = 0; i < clickX.length; i++){
		// 	context.beginPath();

		// 	// Check for Click and Drag
		// 	if(clickDrag[i] && i){
		// 		context.moveTo(clickX[i-1], clickY[i-1]);
		// 	}
		// 	else{
		// 		context.moveTo(clickX[i]-1, clickY[i]);
		// 	}
		// 	context.lineTo(clickX[i], clickY[i]);
		// 	context.closePath();
		// 	context.strokeStyle = window.currentDrawingColor;
		// 	context.stroke();

		// }

	}

// Color Manipulation: https://medium.freecodecamp.org/learn-how-to-manipulate-the-dom-by-building-a-simple-javascript-color-game-1a3aec1d109a
