class Shader {

	#code;
	#function;
	#binds = {};

	set code (value) {
		this.#code = value;
	}

	set function (value) {
		this.#function = value;
	}

	bind (name, value) {
		this.#binds[name] = value;
	}

	unbind () {
		this.#binds = {};
	}

	compile () {
		if (this.#code == null) {
			console.error("Can't compile the code since it's not loaded");
			return false;
		}

		const code = this.#code + ";return main";

		this.#function = new Function("input", "output", code);
		return true;
	}

	apply (imageData, dataLength) {
		
		let index = 0;
		const data = imageData.data;

		while (index != dataLength) {
			const color = [
				data[index],
				data[index + 1],
				data[index + 2],
				data[index + 3]
			];

			const pixelIndex = index / 4;

			const input = {
				PixelColor: color,
				PixelIndex: pixelIndex,
				ResWidth: imageData.width,
				ResHeight: imageData.height,
				...this.#binds
			};
			const output = input;

			this.#function(input, output)();

			data[index] = output.PixelColor[0];
			data[index + 1] = output.PixelColor[1];
			data[index + 2] = output.PixelColor[2];
			data[index + 3] = output.PixelColor[3];

			index += 4;
		}

	}
	
}