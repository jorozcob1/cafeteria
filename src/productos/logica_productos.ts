import { Productos } from "./products.js";
const productos = new Productos();
productos.renderProductos();
document.addEventListener("DOMContentLoaded", () => {
  //load modal editar
  const modal = document.getElementById("modalEditar")! as HTMLDivElement;
  fetch("/pages/productos/editar.html")
    .then((response) => response.text())
    .then((data) => {
      modal.innerHTML = data;
      editar();
    });

  //editar producto
  const buttons = document.querySelectorAll(
    ".btn-edit"
  ) as NodeListOf<HTMLButtonElement>;

  buttons.forEach((button) => {
    button.addEventListener("click", (event: Event) => {
      const target = event.target as HTMLButtonElement;
      const buttonId = target.getAttribute("data-idEd")!;
      // console.log(`Button clicked: ${buttonId}`);
      const producto = productos.obtenerProducto(parseInt(buttonId));

      //llenar formulario con los datos del producto
      const form = document.getElementById(
        "editproductForm"
      )! as HTMLFormElement;

      form.elements.namedItem("idproducto")!.setAttribute("value", buttonId);
      form.elements.namedItem("editname")!.setAttribute("value", producto.name);
      form.elements.namedItem("editdescription")!.value = producto.description;
      //.setAttribute("value", producto.description);
      form.elements
        .namedItem("editprecio")!
        .setAttribute("value", producto.price.toString());
      form.elements
        .namedItem("editimagen")!
        .setAttribute("value", producto.image);
    });
  });
});
function editar(): void {
  //actualizar producto
  document
    .getElementById("editproductForm")!
    .addEventListener("submit", function (event) {
      const id = parseInt(
        (document.getElementById("idproducto") as HTMLInputElement).value
      );
      const name = (document.getElementById("editname") as HTMLInputElement)
        .value;
      const description = (
        document.getElementById("editdescription") as HTMLTextAreaElement
      ).value;
      const price = parseFloat(
        (document.getElementById("editprecio") as HTMLInputElement).value
      );
      const image = (document.getElementById("editimagen") as HTMLInputElement)
        .value;

      productos.actualizarProducto({
        id,
        name,
        description,
        price,
        image,
      });

      (this as HTMLFormElement).reset();
    });
}
