export class Productos {
    constructor() {
        this.productos = [];
        const productos = localStorage.getItem("productos");
        if (productos) {
            this.productos = JSON.parse(productos);
        }
    }
    guardarProducto(producto) {
        this.productos.push(producto);
        localStorage.setItem("productos", JSON.stringify(this.productos));
    }
    obtenerProductos() {
        return this.productos;
    }
    obtenerProducto(id) {
        const producto = this.productos.find((producto) => producto.id === id);
        return producto || null;
    }
    eliminarProducto(id) {
        this.productos = this.productos.filter((producto) => producto.id !== id);
        localStorage.setItem("productos", JSON.stringify(this.productos));
    }
    numeroProductos() {
        return this.productos.length + 1;
    }
    agregarProductoAlDOM(producto) {
        const container = document.getElementById("productos-container");
        if (container) {
            const card = document.createElement("div");
            card.className = "card";
            card.style.width = "18rem";
            card.id = `producto-${producto.id}`;
            card.innerHTML = `
        <img src="${producto.image}" class="card-img-top" alt="${producto.name}">
        <div class="card-body">
          <h5 class="card-title">${producto.name}</h5>
          <p class="card-text">${producto.description}</p>
          <p class="card-text">$${producto.price.toFixed(2)}</p>
              <button type="button" data-idE="${producto.id}"  class="btn btn-danger dynamic-btn">Eliminar</button>
      
      <button
      data-idEd="${producto.id}"
          id="editProductButton"
          type="button"
          class="btn btn-primary btn-edit"
          data-bs-toggle="modal"
          data-bs-target="#editProductModal"
        >
          Editar
        </button>  
      </div>
        
      `;
            container.appendChild(card);
        }
    }
    actualizarProducto(productoActualizado) {
        this.productos = this.productos.map((producto) => producto.id === productoActualizado.id ? productoActualizado : producto);
        localStorage.setItem("productos", JSON.stringify(this.productos));
        this.actualizarProductoEnDOM(productoActualizado);
    }
    actualizarProductoEnDOM(producto) {
        const card = document.getElementById(`producto-${producto.id}`);
        if (card) {
            const img = card.querySelector(".card-img-top");
            const title = card.querySelector(".card-title");
            const description = card.querySelector(".card-text");
            const priceElements = card.querySelectorAll(".card-text");
            if (img) {
                img.setAttribute("src", producto.image);
                img.setAttribute("alt", producto.name);
            }
            if (title) {
                title.textContent = producto.name;
            }
            if (description) {
                description.textContent = producto.description;
            }
            if (priceElements.length > 1) {
                priceElements[priceElements.length - 1].textContent = `$${producto.price.toFixed(2)}`;
            }
        }
    }
    eliminarProductoDelDOM(id) {
        const card = document.getElementById(`producto-${id}`);
        if (card) {
            card.remove();
        }
    }
    renderProductos() {
        this.productos.forEach((producto) => this.agregarProductoAlDOM(producto));
    }
}
