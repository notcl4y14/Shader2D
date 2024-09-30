const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

const image = new Image();
image.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Optical_grey_squares_orange_brown.svg/800px-Optical_grey_squares_orange_brown.svg.png";
image.crossOrigin = "";

document.getElementById("button-compile").onclick = () =>
	draw();

document.getElementById("resize-canvas").onclick = () => {
	const width = document.getElementById("canvas-width").value;
	const height = document.getElementById("canvas-height").value;

	canvas.width = width;
	canvas.height = height;
}

function draw() {
	/**/ const totalLast = performance.now();

	// Clearing the canvas and drawing the image
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.drawImage(image, 0, 0, canvas.width, canvas.height);
	
	const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
	
	// Loading shader code
	const shaderCode = document.getElementById("shader-code").value;
	
	// Creating shader and compiling its code
	const shader = new Shader();
	shader.code = shaderCode;
	shader.compile();
	
	/**/ const shaderLast = performance.now();

	shader.bind("random", Math.random());
	
	// Applying shaders to the imageData
	shader.apply(imageData, imageData.data.length);

	shader.unbind();
	
	/**/ const shaderNow = performance.now();
	
	// Putting the result onto the canvas
	context.putImageData(imageData, 0, 0);
	
	/**/ const totalNow = performance.now();

	// Calculating range between times
	const totalDelta = totalNow - totalLast;
	const shaderDelta = shaderNow - shaderLast;
	const str = `Total time: ${Math.round(totalDelta)}  ms; Shader time: ${Math.round(shaderDelta)} ms`;
	document.getElementById("total-time").innerHTML = str;
}

draw();