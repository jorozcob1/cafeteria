import { Productos } from "./products.js";
const product = new Productos();
const username = localStorage.getItem("username");
///////////////////////////////////////////
document.addEventListener("DOMContentLoaded", () => {
    let a = document.getElementById("ingresar");
    if (username) {
        a.textContent = "Cerrar sesión";
        a.href = "../../index.html";
    }
    a.addEventListener("click", () => {
        if (username) {
            localStorage.removeItem("username");
        }
    });
    if (!username) {
        let button = document.getElementById("addProductButton");
        button.hidden = true;
        const btnEliminar = document.getElementsByClassName("btn-danger");
        for (let i = 0; i < btnEliminar.length; i++) {
            btnEliminar[i].hidden = true;
        }
    }
    //eliminar producto
    const buttons = document.querySelectorAll(".dynamic-btn");
    buttons.forEach((button) => {
        button.addEventListener("click", (event) => {
            const target = event.target;
            const buttonId = target.getAttribute("data-idE");
            //console.log(`Button clicked: ${buttonId}`);
            botonEliminar(buttonId);
        });
    });
});
/////////////////////////////////////////////////////
function botonEliminar(id) {
    // Lógica para manejar el clic del botón basado en el ID
    if (id) {
        // console.log(`Button with ID ${id} was clicked.`);
        product.eliminarProducto(parseInt(id));
        //recargar la pagina sin load
        location.reload();
    }
}
