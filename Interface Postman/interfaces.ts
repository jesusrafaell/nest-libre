interface login {
  login: string;
  password: string;
}

//Signo ? indica que es opcional el campo
interface EndPointCreateComercio {
  commerce: {
    comerRif: string; //Rango 6..10 / Ej: 'V12332324'
    idActivityXAfiliado: string; //Longitud: 15
    comerDesc: string; //Rango 1...255
    comerTipoPer: number; //1=Persona Natural/ 2=Juridica
    comerCodTipoCont: number; //Tipo contrato Permante=2 / Temporal=1
    comerCodigoBanco: string; //Longitud: 4
    comerCuentaBanco: string; //Longitud: 20
    comerObservaciones?: string; //Rango 0..255
    comerPuntoAdicional?: number; //Rango 0 or 1
    comerCodigoBanco2?: string;
    comerCuentaBanco2?: string;
    comerCodigoBanco3?: string;
    comerCuentaBanco3?: string;
    locationCommerce: {
      estado: string;
      municipio: string;
      ciudad: string;
      parroquia: string;
      casa: string;
    };
    locationContact: {
      estado: string;
      municipio: string;
      ciudad: string;
      parroquia: string;
      casa: string;
    };
    locationPos: {
      estado: string;
      municipio: string;
      ciudad: string;
      parroquia: string;
      casa: string;
    };
    daysOperacion: {
      Lun: boolean;
      Mar: boolean;
      Mie: boolean;
      Jue: boolean;
      Vie: boolean;
      Sab: boolean;
      Dom: boolean;
    };
  };
  contacto: {
    contNombres: string; //Rango 1...50
    contApellidos: string; //Rango 1..50
    contTelefLoc: string; //Longitud: 11 example: 02126889569
    contTelefMov: string; //Longitud: 11 example: 02126889569
  };
}

interface createTerminal {
  comerRif: string;
  comerCantPost: number; //Rango 1..9
}
