const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

const image = new Image();
image.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Optical_grey_squares_orange_brown.svg/800px-Optical_grey_squares_orange_brown.svg.png";
image.crossOrigin = "";

document.getElementById("button-compile-apply").onclick = () => {
	draw();
}

function draw() {
	const totalLast = performance.now();

	context.clearRect(0, 0, canvas.width, canvas.height);
	context.drawImage(image, 0, 0, 200, 200);
	
	const imageData = context.getImageData(0, 0, 200, 200);
	
	// const shaderCode = "\
	// function main() {\
	// 	output.PixelColor[0] = input.PixelColor[0] + output.PixelX;\
	// }";
	const shaderCode = document.getElementById("shader-code").value;
	
	const shader = new Shader();
	shader.code = shaderCode;
	shader.compile();
	
	const shaderLast = performance.now();
	shader.apply(imageData, imageData.data.length);
	const shaderNow = performance.now();
	
	context.putImageData(imageData, 0, 0);
	
	const totalNow = performance.now();

	const totalDelta = totalNow - totalLast;
	const shaderDelta = shaderNow - shaderLast;
	document.getElementById("total-time").innerHTML = "Total time: " + Math.round(totalDelta) + " ms; Shader time: " + Math.round(shaderDelta) + " ms";
}

draw();