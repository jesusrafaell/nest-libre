//Login
const respuestaLoginError = {
  statusCode: 401, //number
  message: 'Usuario o clave invalida', //string
  error: 'Unauthorized', //stirng
};

//Token invalido
const RespToken = {
  statusCode: 401, //number
  message: 'Token expiro' || 'Token invalido', //string
  error: 'Unauthorized', //string
};

//Creacion de comercio
const RespComercioExiste = {
  statusCode: 400, //number
  message: 'Comercio [V33234238] ya existe', //string
  error: 'Bad Request', //string
};

//cuando no hay termianels disponibles
const RespustaTermianlesAbono = {
  statusCode: 400, //number
  message: `Error al crear abono a los terminales, por favor contactar a Tranred`, //string
  terminales: [], //string[] terminales (lista de terminales sin abono)
  error: 'Bad Request', //string
};

const RespuestaEmpty_Terminales = {
  statusCode: 404,
  message:
    'Vuelva a intentar esta accion en 10 minutos, estamos creando terminales',
  error: 'Not Found',
};

interface Repuesta_terminales_disponibles {
  info: string; //menesaje
  code: number;
  //202 = se crearon menos terminales de las solicitadas porque algunas ya teniana abono
  //203 = se crearon menos terminales de las solicitadas por falta de disponibilidad
  terminales: string[]; //lsita de terminales
}
