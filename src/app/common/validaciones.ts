import Swal from 'sweetalert2';

export function validarFecha(dateString: string): boolean {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  return regex.test(dateString);
}

export function validarLetras(event: KeyboardEvent) {
  // Obtener el carácter ingresado
  const char = event.key;

  // Patrón de la expresión regular
  const pattern = /^[A-Za-zñÑ\s]*$/;

  // Verificar si el carácter coincide con el patrón
  if (!pattern.test(char)) {
    // Si el carácter no coincide, prevenir la entrada
    event.preventDefault();
  }
}

export function validarNumeros(event: KeyboardEvent) {
  // Obtener el carácter ingresado
  const char = event.key;

  // Permitir las siguientes teclas sin restricciones
  const allowedKeys = [
    'Backspace',
    'Delete',
    'ArrowLeft',
    'ArrowRight',
    'Home',
    'End',
    'Tab',
  ];

  // Si la tecla presionada no es una de las permitidas y no coincide con el patrón, prevenir la entrada
  if (!allowedKeys.includes(char) && !/^[0-9]*$/.test(char)) {
    event.preventDefault();
  }
}

export function validarLetrasNum(event: KeyboardEvent) {
  // Obtener el carácter ingresado
  const char = event.key;

  // Patrón de la expresión regular
  const pattern = /^[A-Za-z0-9\s]*$/;

  // Verificar si el carácter coincide con el patrón
  if (!pattern.test(char)) {
    // Si el carácter no coincide, prevenir la entrada
    event.preventDefault();
  }
}

export function validarCorreo(correo: string): boolean {
  const regexCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regexCorreo.test(correo);
}

export function validarCPF(strCPF: string): boolean {
  var i = 0
  var Soma;
  var Resto;
  Soma = 0;
  if (strCPF == "00000000000") return false;

  for (i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
  Resto = (Soma * 10) % 11;

  if ((Resto == 10) || (Resto == 11)) Resto = 0;
  if (Resto != parseInt(strCPF.substring(9, 10))) return false;

  Soma = 0;
  for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
  Resto = (Soma * 10) % 11;

  if ((Resto == 10) || (Resto == 11)) Resto = 0;
  if (Resto != parseInt(strCPF.substring(10, 11))) return false;
  return true;
}

export function calcularEdad(edadUsuario: Date): number {
  const fechaActual: Date = new Date();

  const anioActual: number = fechaActual.getFullYear();
  const mesActual: number = fechaActual.getMonth() + 1;
  const diaActual: number = fechaActual.getDate();

  const nacimiento: Date = new Date(edadUsuario);
  const anioNacimiento: number = nacimiento.getFullYear();
  const mesNacimiento: number = nacimiento.getMonth() + 1;
  const diaNacimiento: number = nacimiento.getDate() + 1;
  // console.log("nacimiento" + nacimiento)

  let edad: number = anioActual - anioNacimiento;

  // Verificar si aún no ha cumplido años en el presente año
  if (
    mesActual < mesNacimiento ||
    (mesActual === mesNacimiento && diaActual < diaNacimiento)
  ) {
    edad--;
  }
  // console.log("EDAD" + edad)

  return edad;
}

export function validarCadena(cadena: string): boolean {
  const expresionRegular = /^[A-Za-zÁÉÍÓÚáéíóúÜüÑñ0-9\s;.,]+$/;
  return expresionRegular.test(cadena) && cadena.trim() !== '';
}

export function validarDouble(cadena: string): boolean {
  // Expresión regular para números con dos decimales separados por punto
  const expresionRegular = /^(\d+(\.\d{1,2})?)?$/;
  return expresionRegular.test(cadena) && cadena.trim() !== '';
}

export function showErrorAlCrear() {
  Swal.fire({
    icon: 'error',
    title: 'No se puede crear',
    text: 'No se puede crear el elemento en este momento.',
  });
}

export function showMasRegistros() {
  Swal.fire({
    icon: 'error',
    title: 'No se puede crear',
    text: 'Este es un valor único, por lo que solo puede editarse',
  });
}

//Transforma un string en formato: 02/10/2023 7:49:50 a un Date
export function string_Date(fechaStr: string): Date {
  const partes = fechaStr.split(' ');

  // Divide la fecha y la hora
  const fechaPartes = partes[0].split('/');
  const horaPartes = partes[1].split(':');

  const año = parseInt(fechaPartes[2]);
  const mes = parseInt(fechaPartes[1]) - 1; // Los meses en JavaScript son de 0 a 11
  const día = parseInt(fechaPartes[0]);
  const hora = parseInt(horaPartes[0]);
  const minuto = parseInt(horaPartes[1]);
  const segundo = parseInt(horaPartes[2]);

  const fecha = new Date(año, mes, día, hora, minuto, segundo);
  return fecha
}


export function Date_String(fechaDT: string | null | undefined): string {
  if (!fechaDT) {
    return ''; // O cualquier valor predeterminado que desees en caso de fecha nula o indefinida
  }

  const fecha = new Date(fechaDT);

  const year = fecha.getUTCFullYear();
  const month = (fecha.getUTCMonth() + 1).toString().padStart(2, '0');
  const day = fecha.getUTCDate().toString().padStart(2, '0');
  const hour = fecha.getUTCHours().toString().padStart(2, '0');
  const minute = fecha.getUTCMinutes().toString().padStart(2, '0');
  const second = fecha.getUTCSeconds().toString().padStart(2, '0');

  const fechaFormateada = `${year}-${month}-${day}   ${hour}:${minute}:${second}`;

  return fechaFormateada;
}

export function final_Date(fechaDT: string | null | undefined): string {
  if (!fechaDT) {
    return ''; // O cualquier valor predeterminado que desees en caso de fecha nula o indefinida
  }

  const fecha = new Date(fechaDT);

  const year = fecha.getUTCFullYear();
  const month = (fecha.getUTCMonth() + 1).toString().padStart(2, '0');
  const day = fecha.getUTCDate().toString().padStart(2, '0');

  const hour = '23';
  const minute = '59';
  const second = '59';

  const fechaFormateada = `${year}-${month}-${day}   ${hour}:${minute}:${second}`;

  return fechaFormateada;
}



// export function json_Object(jsonData: any) {
//   // Convert the array of arrays to an array of objects
//   const headers = jsonData[0];
//   jsonData = jsonData.slice(1).map((row: any) => {
//     const obj: any = {};
//     headers.forEach((header: string, index: number) => {
//       obj[header] = row[index];
//     });
//     return obj;
//   });

//   console.log(jsonData);
// }
