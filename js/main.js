const txtName = document.getElementById("Name");
const txtNumber = document.getElementById("Number");
const btnAgregar = document.getElementById("btnAgregar");
const btnClear = document.getElementById("btnClear");

const alertValidaciones = document.getElementById("alertValidaciones");
const alertValidacionesTexto = document.getElementById("alertValidacionesTexto");


//Cuando hay que hacer varias validaciones, mejor hacer una funcion
function validarCantidad(){
    if(txtNumber.value.length==0){
        return false;
    } //Que tenga información

  if(isNaN(txtNumber.value)){
    return false;
  }// Tiene que ser un número

  if(Number(txtNumber.value)<=0){
    return false;
  }// Número mayor de 0 
    
    return true;
} //validar Cantidad

btnAgregar.addEventListener("click", function(event){
    event.preventDefault();
            alertValidacionesTexto.innerHTML="";
            alertValidaciones.style.display="none"; //Limpia el texto cuando presiono el boton de agregar con todos los campos correctos, me quita las alertas cuando anteriormente no coloque adecuadamente los espcaios
            txtName.style.border="";
            txtNumber.style.border="";
    //Name ¿Que le tendria que validad? 
    // //Que tenga info, por lo menos 3 letras
    if(txtName.value.length<3) {
            txtName.style.border="thin red solid"; //si pongo thick el borde es grueso, medium es medio

            // mensaje de error cuando sea menor que 3.
            alertValidacionesTexto.innerHTML=
            "<strong> El Nombre del producto no es correcto. </strong>";
            alertValidaciones.style.display="block";
    }// menor de 3

    if(! validarCantidad()){ //No validar cantidad = Validar cantidad es falso
        txtNumber.style.border="thin red solid";
        alertValidacionesTexto.innerHTML += 
        "<strong> La Cantidad del producto no es correcto. </strong>"; //El + es para agregar aparte del que primer innerHTML este otro
        alertValidaciones.style.display="block";
    }//validarCantidad

    //Number ¿Que tengo que validar?
    //Tener info, 
    // Número mayor de 0 
    // Tiene que ser un número



}); //btnAgregar