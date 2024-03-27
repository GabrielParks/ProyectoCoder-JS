const userLogin = document.querySelector("#username");
const buttonLogin = document.querySelector("#loginButton");
const messagesContainer = document.querySelector("#loginMessage");
const logoutButton = document.querySelector("#logoutButton");
const viewCarrito = document.querySelector("#carrito");
const textoAlt = document.querySelector("#textoAlt");

const productos = [];
const carrito = [];
let username = "";

const userActive = localStorage.getItem("username");
const carritoGuardadoEnLocal = JSON.parse(localStorage.getItem("carrito"));
if (userActive || username) {
  mostrarMensaje(userActive);
  messagesContainer.innerHTML = `Bienvenido/a, ${userActive}!`;
}
if (userActive && carritoGuardadoEnLocal) {
  mostrarCarritoDesdeLocalStorage();
}

userLogin.addEventListener("input", () => {
  username = userLogin.value;
});

buttonLogin.addEventListener("click", () => {
  username = userLogin.value;
  localStorage.setItem("username", username);
  userLogin.value = "";
  mostrarMensaje(username);
  Swal.fire({
    position: "center",
    icon: "success",
    title: "Sesion iniciada correctamente!",
    showCloseButton: true,
  });
});

logoutButton.addEventListener("click", () => {
  localStorage.removeItem("username");
  viewCarrito.classList.add("hidden");
  textoAlt.classList.remove("hidden");
  cerrarSesion();
});

function mostrarMensaje(username) {
  userLogin.classList.add("hidden");
  buttonLogin.classList.add("hidden");
  viewCarrito.classList.remove("hidden");
  messagesContainer.innerHTML = `Bienvenido/a, ${username}!`;
  logoutButton.classList.remove("hidden");
  textoAlt.classList.add("hidden");
}

function cerrarSesion() {
  messagesContainer.innerHTML = "Sesión cerrada";
  logoutButton.classList.add("hidden");
  userLogin.classList.remove("hidden");
  buttonLogin.classList.remove("hidden");
  localStorage.removeItem("carrito");
}

class Articulo {
  constructor(nombre, precio, volumen, cantidad, imagen) {
    this.nombre = nombre;
    this.precio = parseFloat(precio.replace("$", ""));
    this.volumen = volumen;
    this.cantidad = cantidad;
    this.imagen = imagen;
  }
}

productos.push(new Articulo("Proteina", "$ 2000", "XL", 8, "./images/proteina.jpeg"));
productos.push(new Articulo("Creatinina", "$ 1500", "L", 5, "./images/creatina.jpeg"));
productos.push(new Articulo("Aminoacidos", "$ 3000", "XXL", 10, "./images/aminoacidos.jpeg"));
productos.push(new Articulo("Proteina de Suero", "$ 4000", "S", 3, "./images/proteina_de_suero.jpeg"));

function mostrarProductos() {
  const galeria = document.querySelector("#galeria");
  productos.forEach((producto) => {
    let card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
		<img src="${producto.imagen}">
		<h4><b>${producto.nombre}</b></h4>
		<p> Precio: <b>$${formatoDinero(producto.precio)}</b></p>
		<p> Tamaño: <b>${producto.volumen}</b></p>
		<p> Cantidad: <b>${producto.cantidad}</b></p>
		`;

    let agregarAlCarritoBtn = document.createElement("button");
    agregarAlCarritoBtn.textContent = "Agregar al carrito";
    agregarAlCarritoBtn.classList.add("btn-carrito");
    agregarAlCarritoBtn.addEventListener("click", () =>
      agregarAlCarrito(producto)
    );
    card.appendChild(agregarAlCarritoBtn);

    galeria.appendChild(card);
  });
}
mostrarProductos();

const urlApi = `./archivo.json`;
fetch(urlApi)
	.then((respuesta) => {
    	return respuesta.json();
  	})
  	.then((data) => {
    	console.log(data);
    	const container = document.querySelector("#galeriaApi");

    data.forEach((remera) => {
    	console.log(remera.nombre, remera.precio);
    	const div = document.createElement("div");
    	div.classList.add("card");
    	div.innerHTML = `
            <img src="${remera.foto}"/>
            <h4>${remera.nombre}</h4>
            <p>Precio: <b>$${remera.precio}</b></p>
            <p>Talle: <b>${remera.talles}</b></p>
            `;

    	let agregarAlCarritoBtn = document.createElement("button");
    	agregarAlCarritoBtn.textContent = "Agregar al carrito";
    	agregarAlCarritoBtn.classList.add("btn-carrito");
    	agregarAlCarritoBtn.addEventListener("click", () =>
        agregarAlCarrito(remera)
    	);

    	div.appendChild(agregarAlCarritoBtn);

    	container.appendChild(div);
    });
  })
  .catch((error) => {
    console.log(error);
  });

function agregarAlCarrito(producto) {
  if (username || userActive) {
    carrito.push(producto);
    mostrarCarrito();
    mostrarTotalCarrito();
    guardarCarritoEnLocalStorage();
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Debes Iniciar Sesion",
      confirmButtonText: `<i class="fa fa-thumbs-up"></i> Volver a intentar!`,
    });
  }
}

function mostrarCarrito() {
  const listaCarrito = document.getElementById("listaCarrito");
  listaCarrito.innerHTML = "";

  carrito.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.nombre} - Precio: $${formatoDinero(item.precio)}`;
    listaCarrito.appendChild(li);

    const botonEliminar = document.createElement("button");
    botonEliminar.textContent = "Eliminar";
    botonEliminar.classList.add("btn-carrito");
    botonEliminar.addEventListener("click", () => eliminarDelCarrito(item));
    li.appendChild(botonEliminar);

    listaCarrito.appendChild(li);
  });
}

function eliminarDelCarrito(item) {
  const index = carrito.indexOf(item);
  if (index !== -1) {
    carrito.splice(index, 1);
    mostrarCarrito();
    mostrarTotalCarrito();
    guardarCarritoEnLocalStorage();
    console.log(`Se eliminó "${item.nombre}" del carrito.`);
  }
}

function mostrarCarritoDesdeLocalStorage() {
  const carritoGuardado = localStorage.getItem("carrito");
  carrito.push(...(carritoGuardado ? JSON.parse(carritoGuardado) : []));

  listaCarrito.innerHTML = "";

  carrito.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.nombre} - Precio: $${formatoDinero(item.precio)}`;
    listaCarrito.appendChild(li);

    const botonEliminar = document.createElement("button");
    botonEliminar.textContent = "Eliminar";
    botonEliminar.classList.add("btn-carrito");
    botonEliminar.addEventListener("click", () => eliminarDelCarrito(item));
    li.appendChild(botonEliminar);

    listaCarrito.appendChild(li);
  });
}

function guardarCarritoEnLocalStorage() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function mostrarTotalCarrito() {
  const totalCarritoElement = document.getElementById("totalCarrito");
  totalCarritoElement.classList.add("carrito");
  const totalCarrito = carrito.reduce((total, item) => total + item.precio, 0);
  totalCarritoElement.textContent = `Total: $${formatoDinero(totalCarrito)}`;
}
function formatoDinero(valor) {
  return valor.toFixed(2);
}
