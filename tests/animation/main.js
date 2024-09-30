const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

const image = new Image();
image.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Optical_grey_squares_orange_brown.svg/800px-Optical_grey_squares_orange_brown.svg.png";
image.crossOrigin = "";

const shader = new Shader();

let ticks = 0;

document.getElementById("button-compile").onclick = () =>
	compile();

function compile() {
	// Loading shader code
	const shaderCode = document.getElementById("shader-code").value;

	shader.code = shaderCode;
	shader.compile();
}

function draw() {
	ticks += 0.1;

	// Clearing the canvas and drawing the image
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.drawImage(image, 0, 0, 200, 200);

	const imageData = context.getImageData(0, 0, 200, 200);

	shader.bind("cos", Math.cos(ticks));

	// Applying shaders to the imageData
	shader.apply(imageData, imageData.data.length);

	shader.unbind();

	// Putting the result onto the canvas
	context.putImageData(imageData, 0, 0);

	requestAnimationFrame(draw);
}

compile();
draw();