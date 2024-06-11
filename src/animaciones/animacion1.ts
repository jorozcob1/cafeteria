//variable + valor query-selector
const checkbox = document.querySelector(
  ".icono-interruptor"
)! as HTMLInputElement;

//var + addlistener "change" + funcion
checkbox.addEventListener("change", function () {
  //var Colorcontainer + query selector
  const ColorContainer = document.querySelector(".contenedor-oscuro")!;
  //si esta marcado agregara("add") la clase claro
  if (ColorContainer && this.checked) {
    ColorContainer.classList.add("claro");
    //si no quitara("remove") la clase claro.
  } else {
    ColorContainer.classList.remove("claro");
  }
});
