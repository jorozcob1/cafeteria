import { Productos } from "./products.js";
const productos = new Productos();
productos.renderProductos();
document.addEventListener("DOMContentLoaded", () => {
    //load modal editar
    const modal = document.getElementById("modalEditar");
    const modalAgregar = document.getElementById("modalAgregar");
    //insertar modal editar
    //agregar boton editar a cada producto
    const buttons = document.querySelectorAll(".btn-edit");
    buttons.forEach((button) => {
        button.addEventListener("click", (event) => {
            const target = event.target;
            const buttonId = target.getAttribute("data-idEd");
            // console.log(`Button clicked: ${buttonId}`);
            const producto = productos.obtenerProducto(parseInt(buttonId));
            //llenar formulario con los datos del producto
            const form = document.getElementById("editproductForm");
            form.elements.namedItem("idproducto").setAttribute("value", buttonId);
            form.elements.namedItem("editname").setAttribute("value", producto.name);
            form.elements.namedItem("editdescription").value = producto.description;
            //.setAttribute("value", producto.description);
            form.elements
                .namedItem("editprecio")
                .setAttribute("value", producto.price.toString());
            form.elements
                .namedItem("editimagen")
                .setAttribute("value", producto.image);
        });
    });
});
//actualizar producto
document
    .getElementById("editproductForm")
    .addEventListener("submit", function (event) {
    const id = parseInt(document.getElementById("idproducto").value);
    const name = document.getElementById("editname")
        .value;
    const description = document.getElementById("editdescription").value;
    const price = parseFloat(document.getElementById("editprecio").value);
    const image = document.getElementById("editimagen")
        .value;
    productos.actualizarProducto({
        id,
        name,
        description,
        price,
        image,
    });
    this.reset();
});
// funcion para agregar producto
///Manejo del formulario de productos insertados
var bootstrap;
const product = new Productos();
document
    .getElementById("productForm")
    .addEventListener("submit", function (event) {
    product.guardarProducto({
        id: product.numeroProductos(),
        name: document.getElementById("productName").value,
        description: document.getElementById("productDescription").value,
        price: parseFloat(document.getElementById("productPrice").value),
        image: document.getElementById("productImage")
            .value,
    });
    this.reset();
    const modalElement = document.querySelector("#addProductModal");
    const modal = bootstrap.Modal.getInstance(modalElement);
    if (modal)
        modal.hide();
});
