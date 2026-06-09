let carrito = [];
let favoritos = 0;

/* =========================
   CARRITO
========================= */

function agregarCarrito(nombre, precio, imagen){

    const productoExistente = carrito.find(item => item.nombre === nombre);

    if(productoExistente){
        productoExistente.cantidad++;
    } else {
        carrito.push({
            nombre,
            precio,
            imagen,
            cantidad: 1
        });
    }

    actualizarCarrito();

    if (typeof Swal !== "undefined") {
        Swal.fire({
            icon: "success",
            title: "Añadido al carrito",
            text: nombre,
            background: "#111",
            color: "#fff",
            confirmButtonText: "Entendido",
            confirmButtonColor: "#dba01f"
        });
    }
}

function actualizarCarrito(){

    const lista = document.getElementById("listaCarrito");
    const contador = document.getElementById("contador");
    const subtotal = document.getElementById("subtotal");

    if(lista) lista.innerHTML = "";

    let total = 0;
    let cantidadTotal = 0;

    carrito.forEach((producto, index) => {

        total += producto.precio * producto.cantidad;
        cantidadTotal += producto.cantidad;

        if(lista){
            lista.innerHTML += `
            <div class="item-carrito">

                <img src="${producto.imagen}" width="70">

                <div>
                    <h4>${producto.nombre}</h4>
                    <p>Bs. ${producto.precio}</p>
                </div>

                <div>
                    <button onclick="cambiarCantidad(${index},-1)">-</button>
                    ${producto.cantidad}
                    <button onclick="cambiarCantidad(${index},1)">+</button>
                </div>

            </div>
            `;
        }
    });

    if(contador) contador.textContent = cantidadTotal;
    if(subtotal) subtotal.textContent = total;
}

function cambiarCantidad(index, cambio){

    carrito[index].cantidad += cambio;

    if(carrito[index].cantidad <= 0){
        carrito.splice(index,1);
    }

    actualizarCarrito();
}

function abrirCarrito(){
    const panel = document.getElementById("panelCarrito");
    if(panel) panel.classList.add("activo");
}

function cerrarCarrito(){
    const panel = document.getElementById("panelCarrito");
    if(panel) panel.classList.remove("activo");
}

function tramitarCompra(){

    if(carrito.length === 0){

        if (typeof Swal !== "undefined") {
            Swal.fire({
                icon: "error",
                title: "Carrito vacío",
                text: "Agrega productos antes de comprar",
                background: "#111",
                color: "#fff",
                confirmButtonText: "Entendido",
                confirmButtonColor: "#ff7a18"
            });
        }

        return;
    }

    window.location.href = "formulario_compra.html";
}


/* =========================
   FAVORITOS (CORREGIDO Y SEGURO)
========================= */

function favorito(elemento){

    if(!elemento) return;

    const seActivo = !elemento.classList.contains("activo");

    elemento.classList.toggle("activo");

    if(seActivo){
        elemento.innerHTML = "♥";
        favoritos++;

        Swal.fire({
            icon: "success",
            title: "Favorito",
            text: "Se agregó a tus favoritos",
            timer: 1200,
            showConfirmButton: false,
            background: "#000",
            color: "#fff"
        });
    } 
    else {
        elemento.innerHTML = "♡";
        favoritos--;

        if(favoritos < 0) favoritos = 0;
    }

    const contadorFav = document.getElementById("contadorFavoritos");
    if(contadorFav){
        contadorFav.textContent = favoritos;
    }
}

/* =========================
FILTRO Y BUSCADOR (SEGURO)
========================= */

function filtrar(categoria){

    const productos = document.querySelectorAll(".producto");

    productos.forEach(producto => {

        if(categoria === "todos"){
            producto.style.display = "block";
        }
        else if(producto.classList.contains(categoria)){
            producto.style.display = "block";
        }
        else{
            producto.style.display = "none";
        }
    });
}

const buscador = document.getElementById("busqueda");

if(buscador){

    buscador.addEventListener("keyup", () => {

        const texto = buscador.value.toLowerCase();
        const productos = document.querySelectorAll(".producto");

        productos.forEach(producto => {

            const nombreEl = producto.querySelector("h3");

            const nombre = nombreEl ? nombreEl.textContent.toLowerCase() : "";

            producto.style.display =
                nombre.includes(texto) ? "block" : "none";
        });
    });
}


/* =========================
 MODAL
========================= */

function mostrarDetalle(titulo, precio, descripcion){

    const t = document.getElementById("tituloModal");
    const p = document.getElementById("precioModal");
    const d = document.getElementById("descripcionModal");
    const m = document.getElementById("modal");

    if(t) t.textContent = titulo;
    if(p) p.textContent = precio;
    if(d) d.textContent = descripcion;
    if(m) m.style.display = "block";
}

function cerrarModal(){

    const m = document.getElementById("modal");
    if(m) m.style.display = "none";
}