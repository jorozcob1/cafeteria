import { Productos } from "./products.js";
const productos = new Productos();
productos.renderProductos();
document.addEventListener("DOMContentLoaded", () => {
    //load modal editar
    const modal = document.getElementById("modalEditar");
    fetch("/pages/productos/editar.html")
        .then((response) => response.text())
        .then((data) => {
        modal.innerHTML = data;
        editar();
    });
    //editar producto
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
function editar() {
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
}
