const Joi = require('@hapi/joi')

module.exports = data =>
  Joi.object()
    .keys({
      nif: Joi.string()
        .regex(/^\w{2,4}$/)
        .required(),
      apellidosynombre: Joi.string().required(),
      puntuacion: Joi.number().required(),
      orden: Joi.number()
        .integer()
        .min(0)
        .required(),
      acceso2: Joi.boolean().required(),
      exp: Joi.boolean().required(),
    })
    .validate(data)
