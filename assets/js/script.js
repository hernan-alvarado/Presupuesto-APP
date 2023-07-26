// Objeto presupuestoObj
var presupuestoObj = {
  presupuesto: 0,
  nombreDelGasto: "",
  gasto: 0,
  saldo: 0,
  basurero: " ",
  

  calcularSaldo: function () {
    // Calcular el saldo
    this.saldo = this.presupuesto - this.gasto;

    // Verificar si el saldo es menor que cero
    if (this.saldo < 0) {
      this.saldo = 0;
    }

    // Actualizar el saldo en el HTML
    document.getElementById("actualizaSaldo").innerHTML = "$" + this.saldo;

    // Deshabilitar los botones si el gasto es mayor o igual al saldo
    if (this.gasto >= this.presupuesto) { 
      alert("Se ha gastado todo el saldo disponible.");
      botonAñadirGasto.classList.add("disabled");
      botonCalcular.classList.add("disabled");
      var tabla = document.getElementById("Tabla").getElementsByTagName('tbody')[0];
      tabla.deleteRow(fila.rowIndex);
    } else {
      botonAñadirGasto.classList.remove("disabled"); 
    }
  }
};


var presupuestoObj = new Proxy(presupuestoObj, {
  get(target, prop){
      if(prop in target){
          return target[prop];
      }else{
          return `La propiedad ${prop} no existe`
      }
  }
});


presupuestoObj = new Proxy(presupuestoObj, {
  set(target, prop, value) {
    if (prop === "presupuesto" && value < 0) {
      alert("El presupuesto debe ser un valor positivo");
      location.reload();
      return false;
    }

    if (prop === "gasto" && value < 0) {
      alert("El gasto debe ser un valor positivo");
      prop.gasto = 0;
      var tabla = document.getElementById("Tabla").getElementsByTagName('tbody')[0];
      tabla.deleteRow(fila.rowIndex);
      return false;
    }

    target[prop] = value;
    return true;
  }
});

  // Botón actualizar página
  var botonRecargar = document.getElementById("botonRecargar");
botonRecargar.addEventListener("click", function() {
  location.reload();
});



// TABLA


// Función para eliminar una fila de la tabla
function eliminarFila(fila) {
  var tabla = document.getElementById("Tabla").getElementsByTagName('tbody')[0];
  tabla.deleteRow(fila.rowIndex);
}

// Función para agregar una nueva fila a la tabla con el nombre del gasto y el valor actualizado
function actualizarTabla(presupuestoObj) {
  // Seleccionar la tabla por su id
  var tabla = document.getElementById("Tabla").getElementsByTagName('tbody')[0];

  // Crear una fila nueva
  var fila = tabla.insertRow();

  // Crear celdas para el nombre del gasto, el valor y el basurero
  var gasto = fila.insertCell(0);
  var valor = fila.insertCell(1);
  var basurero = fila.insertCell(2);

  // Agregar el ícono de la papelera a la celda de la papelera
  var papelera = document.createElement('div');
  papelera.setAttribute('class', 'text-primary me-2 btn');

  var iconoPapelera = document.createElement('i');
  iconoPapelera.setAttribute('class', 'bi bi-trash-fill');

  papelera.appendChild(iconoPapelera);
  basurero.appendChild(papelera);

  // Agregar un evento 'click' al ícono de la papelera para eliminar la fila correspondiente
  papelera.addEventListener('click', function() {
    tabla.removeChild(fila);
  var inputCantidadGasto = document.getElementById("input-CantidadGasto").value;

   // si se elimina la fila, que me reste los valores de esta en los campos superiores 
   gastoParseado = parseInt(presupuestoObj.gasto)
   inputCantidadGastoParseado = parseInt(inputCantidadGasto)
   saldoParseado = parseInt(presupuestoObj.saldo)
   presupuestoObj.gasto =  gastoParseado - inputCantidadGastoParseado;
   presupuestoObj.saldo = saldoParseado + inputCantidadGastoParseado;
   document.getElementById("actualizaSaldo").innerHTML = "$" + presupuestoObj.saldo;

   document.getElementById("imprimeCantidadGasto").innerHTML = "$" + presupuestoObj.gasto;

  });

  // Asignar el nombre del gasto y el valor a las celdas
  gasto.innerHTML = presupuestoObj.nombreDelGasto;
  valor.innerHTML = "$" +  document.getElementById("input-CantidadGasto").value;
}


// Formulario PRESUPUESTO

// Obtener botón calcular
var botonCalcular = document.getElementById("btncalcular");

// Agregar un evento 'click' al botón calcular
botonCalcular.addEventListener('click', function () {
  // Obtener el valor del input de presupuesto
  var inputPresupuesto = document.getElementById("input-Presupuesto").value;
  if (!inputPresupuesto) {
    alert("Ingrese el presupuesto antes de continuar.");
    location.reload(); // recarga la página
    return;
  }

  // Asignar el valor de inputPresupuesto a presupuestoObj.presupuesto
  presupuestoObj.presupuesto = inputPresupuesto;
  presupuestoObj.saldo = inputPresupuesto;

  // Actualizar el presupuesto en el HTML
  document.getElementById("imprimePresupuesto").innerHTML = "$" + inputPresupuesto;
  document.getElementById("imprimeSaldo").innerHTML = "$" + presupuestoObj.saldo;
});

// Formulario GASTOS

// Obtener el botón AÑADIR GASTO
var botonAñadirGasto = document.getElementById("btnAñadirGasto");

// Agregar un evento 'click' al botón AÑADIR GASTO
botonAñadirGasto.addEventListener('click', function () {
  var inputNombreGasto = document.getElementById("input-NombreGasto").value;

  var inputCantidadGasto = document.getElementById("input-CantidadGasto").value;

  if (!inputNombreGasto && !inputCantidadGasto) {
    alert("Ingrese los datos antes de continuar.");
    location.reload(); // recarga la página
    return;
  }

  // Verificar que el gasto no supere el saldo
if (parseInt(inputCantidadGasto) > (presupuestoObj.saldo)) {
  inputCantidadGasto = presupuestoObj.saldo - presupuestoObj.gasto;
  alert("Su gasto es mayor al saldo disponible");
  botonAñadirGasto.classList.add("disabled");
  botonCalcular.classList.add("disabled");
  presupuestoObj.saldo = 0;
  }
  
  // Asignar el valor del inputNombreGasto a presupuestoObj.nombreDelGasto
  presupuestoObj.nombreDelGasto = inputNombreGasto;

  // Añadir el valor del gasto al total de gastos en presupuestoObj.gasto
  presupuestoObj.gasto += parseInt(inputCantidadGasto);
  
  // Calcular y actualizar el saldo
  presupuestoObj.calcularSaldo();
  
  // Actualizar el gasto en el HTML
  document.getElementById("imprimeCantidadGasto").innerHTML = "$" + presupuestoObj.gasto;
  
  // Agregar una nueva fila a la tabla con el nombre del gasto y el valor actualizado
  actualizarTabla(presupuestoObj);
  });


// Alerta por añadir valores iguales a 0

inputPresupuesto.addEventListener('input', function() {
  if (inputPresupuesto.value === '' || inputPresupuesto.value === '0') {
    btnAñadirGasto.disabled = true;
    alertaAnadirGastos.style.display = 'block';
  } else {
    btnAñadirGasto.disabled = false;
    alertaAnadirGastos.style.display = 'none';
  }
});

