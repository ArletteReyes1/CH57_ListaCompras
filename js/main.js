const txtName = document.getElementById("Name");
const txtNumber = document.getElementById("Number");
const btnAgregar = document.getElementById("btnAgregar");
const btnClear = document.getElementById("btnClear");

const alertValidaciones = document.getElementById("alertValidaciones");
const alertValidacionesTexto = document.getElementById("alertValidacionesTexto");
const tablaListaCompras = document.getElementById("tablaListaCompras");
const cuerpoTabla = tablaListaCompras.getElementsByTagName("tbody").item(0);

const contadorProductos = document.getElementById("contadorProductos");
const productosTotal = document.getElementById("productosTotal");
const precioTotal = document.getElementById("precioTotal");



let cont = 0;
let costoTotal = 0;
let totalEnProductos = 0;

let datos = new Array(); // Use el constructor Array pero pudo tambien funcionar con [];


//Cuando hay que hacer varias validaciones, mejor hacer una funcion
function validarCantidad() {
  if (txtNumber.value.length == 0) {
    return false;
  } //Que tenga información

  if (isNaN(txtNumber.value)) {
    return false;
  }// Tiene que ser un número

  if (Number(txtNumber.value) <= 0) {
    return false;
  }// Número mayor de 0 

  return true;
} //validar Cantidad

function getPrecio() {
  return Math.round(Math.random() * 10000) / 100;
}//getPrecio


btnAgregar.addEventListener("click", function (event) {
  event.preventDefault();
  let isValid = true;
  alertValidacionesTexto.innerHTML = "";
  alertValidaciones.style.display = "none"; //Limpia el texto cuando presiono el boton de agregar con todos los campos correctos, me quita las alertas cuando anteriormente no coloque adecuadamente los espcaios
  txtName.style.border = "";
  txtNumber.style.border = "";
  //Name ¿Que le tendria que validad? 
  // //Que tenga info, por lo menos 3 letras
  if (txtName.value.length < 3) {
    txtName.style.border = "thin red solid"; //si pongo thick el borde es grueso, medium es medio

    // mensaje de error cuando sea menor que 3.
    alertValidacionesTexto.innerHTML =
      "<strong> El Nombre del producto no es correcto. </strong>";
    alertValidaciones.style.display = "block";
    isValid = false;
  }// menor de 3

  if (!validarCantidad()) { //No validar cantidad = Validar cantidad es falso
    txtNumber.style.border = "thin red solid";
    alertValidacionesTexto.innerHTML +=
      "<strong> La Cantidad del producto no es correcto. </strong>"; //El + es para agregar aparte del que primer innerHTML este otro
    alertValidaciones.style.display = "block";
    isValid = false;
  }//validarCantidad
  if (isValid) {
    //Agregar los elementos a la tabla
    cont++;
    let precio = getPrecio();
    let row = `<tr>
                  <td>${cont}</td>
                  <td>${txtName.value}</td>
                  <td>${txtNumber.value}</td>
                  <td>${precio}</td>
              </tr>`;

    let elemento = {
      "cont": cont,
      "nombre": txtName.value,
      "cantidad": txtNumber.value,
      "precio": precio,
    };
    datos.push(elemento);
    localStorage.setItem("datos", JSON.stringify(datos));

    cuerpoTabla.insertAdjacentHTML("beforeend", row);
    contadorProductos.innerText = cont;
    totalEnProductos += Number(txtNumber.value); //Constructor
    productosTotal.innerText = totalEnProductos;
    costoTotal += precio * Number(txtNumber.value);
    //precioTotal.innerText = "$" + costoTotal.toFixed(2)  ////modo fácil
    precioTotal.innerText = new Intl.NumberFormat("es-MX",
      { style: "currency", currency: "MXN" }).format(costoTotal);
    let resumen = {
      "cont": cont,
      "totalEnProductos": totalEnProductos,
      "costoTotal": costoTotal,
    }
    localStorage.setItem("resumen", JSON.stringify(resumen));

    txtName.value = ""; //Limpia los campos una vez "agregado" el producto
    txtNumber.value = "";
    txtName.focus(); // Borde color azul y cursor en campo para escribir,  despues de llenar los campos y agregarlo

  }//isValid



}); //btnAgregar

//<></>

window.addEventListener("load", function (event) {
  event.preventDefault();
  if (this.localStorage.getItem("datos") != null) { //Evalua el campo para saber si hay info ahi, si esta vacio no hace nada.
    datos = JSON.parse(this.localStorage.getItem("datos"));
    datos.forEach((dato) => {
      let row = `<tr>
                  <td>${dato.cont}</td>
                  <td>${dato.nombre}</td>
                  <td>${dato.cantidad}</td>
                  <td>${dato.precio}</td>
              </tr>
              `;
      cuerpoTabla.insertAdjacentHTML("beforeend", row);
    });//forEach

  };//datos !=null
  if (this.localStorage.getItem("resumen") != null) { //Valida que los valores existan
    let resumen = JSON.parse(this.localStorage.getItem("resumen")); //Se convierte en Objeto 
    costoTotal = resumen.costoTotal;
    totalEnProductos = resumen.totalEnProductos;
    cont = resumen.cont;
  };//resumen !=null!
  contadorProductos.innerText = cont;
  productosTotal.innerText = totalEnProductos;
  precioTotal.innerText = new Intl.NumberFormat("es-MX",
    { style: "currency", currency: "MXN" }).format(costoTotal);

}); //Window load




btnClear. addEventListener("click", function (event) {
  event.preventDefault();
  //1. Eliminar el storage
  localStorage.removeItem("datos");
  localStorage.removeItem("resumen");
  //2. Limpiar la tabla
  cuerpoTabla.innerHTML = "";
  //3 Limpiar los campos
  txtName.value = ""; //Limpia los campos una vez "Limpiar " el producto
  txtNumber.value = "";
  txtName.focus();
  //4. Limpiar el borde de los campos //Limpia el texto cuando presiono el boton de agregar con todos los campos correctos, me quita las alertas cuando anteriormente no coloque adecuadamente los espcaios
  txtName.style.border = "";
  txtNumber.style.border = "";
  //5. Limpiar los alerts
  alertValidacionesTexto.innerHTML = "";
  alertValidaciones.style.display = "none";
  //6. Limpiar el Resumen
  cont = 0;
  costoTotal = 0;
  totalEnProductos = 0;

  contadorProductos.innerText = cont;
  productosTotal.innerText = totalEnProductos;
  precioTotal.innerText = new Intl.NumberFormat("es-MX",
    { style: "currency", currency: "MXN" }).format(costoTotal);

    datos = new Array();
})//Limpiar todo