const REGEX_PASSWORD =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,32}$/;
const REGEX_URL =
  /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;

const REGEX_BUSINESS_URL =
  /^(?=.{4,20}$)(?![_.])(?!.*[_.]{2})[a-z0-9._]+(?<![_.])$/gm;

const REGEX_EMAIL =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const REGEX_PHONE = /^[0-9\-\+]{10}$/;

const REGEX_USERNAME = /^(?=.{4,20}$)(?![_.])(?!.*[_.]{2})[a-z0-9._]+(?<![_.])$/;

export const AuthValidation = {
  userName: {
    required: 'Se necesita un nombre de usuario',
    maxLength: {
      message: 'Debe tener máximo 20 caracteres',
      value: 20,
    },
    minLength: {
      message: 'Debe tener al menos 4 caracteres',
      value: 4,
    },
    pattern: {
      message: 'Debe ser un nombre de usuario valido',
      value: REGEX_USERNAME,
    },
  },
  email: {
    required: 'Se necesita un correo electrónico',
    pattern: {
      message: 'Debe ser un correo electrónico valido',
      value: REGEX_EMAIL,
    },
  },
  firstName: {
    required: 'Se necesita un nombre',
    maxLength: {
      message: 'El nombre debe tener máximo 40 caracteres',
      value: 40,
    },
    minLength: {
      message: 'El nombre debe tener al menos 4 caracteres',
      value: 4,
    },
  },
  lastName: {
    required: 'Se necesita un apellido',
    maxLength: {
      message: 'El apellido debe tener máximo 40 caracteres',
      value: 40,
    },
    minLength: {
      message: 'El apellido debe tener al menos 4 caracteres',
      value: 4,
    },
  },
  password: {
    required: 'Se necesita una contraseña',
    maxLength: {
      message: 'La contraseña debe tener máximo 32 caracteres',
      value: 32,
    },
    minLength: {
      message: 'La contraseña debe tener al menos 8 caracteres',
      value: 8,
    },
    pattern: {
      message:
        'Debe tener al menos una mayúscula, una minúscula, un dígito y un carácter especial (#?!@$%^&*-)',
      value: REGEX_PASSWORD,
    },
  },
};

export const ProductValidation = {
  product_name: {
    required: 'Se necesita un nombre de producto',
    maxLength: {
      message: 'El nombre del producto puede tener maximo 40 caracteres',
      value: 40,
    },
    minLength: {
      message: 'El nombre debe tener almenos 3 caracteres',
      value: 3,
    },
  },
//   unit_price: {
//     required: 'Se necesita un precio',
//     validate: (value) => Number(value) > 0,
//     pattern: {
//       message: 'Debe ser un valor númerico eg: 100, 99.99, 1000',
//       value: REGEX_PRICE,
//     },
//   },
  units_in_stock: {
    required: 'Se necesita un stock',
    min: { message: 'Debe existir al menos 1 producto en stock', value: 1 },
  },
  product_picture_full: {
    required: 'Debes selecionar una imagen',
    pattern: {
      message: 'Error al elegir la imagen, vuelve a seleccionarla',
      value: REGEX_URL,
    },
  },
};

export const CategoryValidation = {
  category_name: {
    required: 'Se necesita un nombre de categoria',
    maxLength: {
      message: 'El nombre de la categoria puede tener maximo 15 caracteres',
      value: 15,
    },
    minLength: {
      message: 'El nombre de la categoria debe tener almenos 3 caracteres',
      value: 3,
    },
  },
  description: {
    maxLength: {
      message:
        'La descripción de la categoria puede tener maximo 100 caracteres',
      value: 100,
    },
    minLength: {
      message: 'La descripción de la categoria debe tener almenos 3 caracteres',
      value: 5,
    },
  },
  picture: {
    pattern: {
      message: 'Error al elegir la imagen, vuelve a seleccionarla',
      value: REGEX_URL,
    },
  },
};

export const BusinessValidation = {
  business_username: {
    required: 'Se necesita una url de la marca',
    maxLength: {
      message:
        'El nombre usado en la url de la marca debe tener maximo 20 caracteres',
      value: 20,
    },
    minLength: {
      message:
        'El nombre usado en la url de la marca debe tener almenos 4 caracteres',
      value: 4,
    },
    pattern: {
      message:
        'El formato usado no es valido, solo se permiten caracteres alfanumericos y ._',
      value: REGEX_BUSINESS_URL,
    },
  },
  business_name: {
    required: 'Se necesita un nombre de negocio',
    maxLength: {
      message: 'El nombre del negocio debe tener maximo 40 caracteres',
      value: 40,
    },
    minLength: {
      message: 'El nombre del negocio debe tener almenos 3 caracteres',
      value: 3,
    },
  },
  business_email: {
    pattern: {
      message: 'Debe ser un email valido',
      value: REGEX_EMAIL,
    },
  },
  contact_name: {
    maxLength: {
      message: 'El nombre del contacto debe tener maximo 40 caracteres',
      value: 40,
    },
    minLength: {
      message: 'El nombre del contacto debe tener almenos 3 caracteres',
      value: 3,
    },
  },
  business_phone: {
    maxLength: {
      message: 'Debe ser un número celular valido',
      value: 10,
    },
    minLength: {
      message: 'Debe ser un número celular valido',
      value: 10,
    },
    pattern: {
      message: 'Debe ser un número celular valido',
      value: REGEX_PHONE,
    },
  },
  website: {
    pattern: {
      message: 'Debe ser una url valida',
      value: REGEX_URL,
    },
  },
  business_description: {
    maxLength: {
      message: 'La descripción del negocio puede tener maximo 200 caracteres',
      value: 200,
    },
    minLength: {
      message: 'La descripción del negocio debe tener almenos 5 caracteres',
      value: 5,
    },
  },
  address: {
    maxLength: {
      message: 'La dirección del negocio puede tener maximo 100 caracteres',
      value: 100,
    },
    minLength: {
      message: 'La dirección del negocio debe tener almenos 5 caracteres',
      value: 5,
    },
  },
  city: {
    maxLength: {
      message: 'La ciudad puede tener maximo 60 caracteres',
      value: 60,
    },
    minLength: {
      message: 'La ciudad debe tener almenos 2 caracteres',
      value: 2,
    },
  },
  country: {
    maxLength: {
      message: 'El país puede tener maximo 60 caracteres',
      value: 60,
    },
    minLength: {
      message: 'El país debe tener almenos 2 caracteres',
      value: 2,
    },
  },
  postalcode: {
    maxLength: {
      message: 'El codigo postal puede tener maximo 10 caracteres',
      value: 10,
    },
    minLength: {
      message: 'El codigo postal debe tener almenos 4 caracteres',
      value: 4,
    },
  },
};
