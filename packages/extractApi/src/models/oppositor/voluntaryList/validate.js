const Joi = require('@hapi/joi')

module.exports = data =>
  Joi.object()
    .keys({
      nif: Joi.string()
        .regex(/^\w{2,4}$/)
        .required(),
      apellidosynombre: Joi.string().required(),
      puntuacion: Joi.number().required(),
      acceso2: Joi.boolean().required(),
      exp: Joi.boolean().required(),
      orden: Joi.number()
        .min(0)
        .required(),
      tipovacantes: Joi.string().required(),
      norte: Joi.number().integer(),
      sur: Joi.number().integer(),
      este: Joi.number().integer(),
      oeste: Joi.number().integer(),
      capital: Joi.number().integer(),
    })
    .validate(data)
