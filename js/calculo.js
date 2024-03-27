const inputPeso = document.querySelector("#peso");
const inputAltura = document.querySelector("#altura");
const buttonClick = document.querySelector("#boton1");

const parametrosCalcular = {
	peso: " ",
	altura: " ",
};

inputPeso.addEventListener("input", (event) => {
	parametrosCalcular.peso = parseFloat(event.target.value);
});
inputAltura.addEventListener("input", (event) => {
	parametrosCalcular.altura = parseFloat(event.target.value);
});

buttonClick.addEventListener("click", () => {
	let peso = parseFloat(inputPeso.value);
	let altura = parseFloat(inputAltura.value);
	let IMC = peso / altura ** 2;

	const container = document.querySelector("#servicios-div-1");
	const span = document.createElement("span");
	if (!isNaN(IMC) && peso !== 0 && altura !== 0) {
		Swal.fire({
			title: `Tu IMC es de: ${IMC.toFixed(2)}`,
			imageUrl: "https://storage.googleapis.com/ilerna_media-cloud/2018/11/FgSbCE1c-imc-rangos.png",
			imageWidth: 600,
			imageHeight: 400,
			imageAlt: "planilla de valores al realizar el calculo de IMC con el rango del resultado",
		});
	} else {
		Swal.fire({
			icon: "error",
			title: "Oops...",
			text: "Los datos son invalidos",
			confirmButtonText: `<i class="fa fa-thumbs-up"></i> Volver a intentar!`,
		});
	}
});