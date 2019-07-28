const Joi = require('@hapi/joi')

module.exports = data =>
  Joi.object()
    .keys({
      nif: Joi.string()
        .regex(/^\w{2,4}$/)
        .required(),
      apellidosynombre: Joi.string().required(),
      puntuacion: Joi.number().required(),
      baremo11: Joi.number().required(),
      baremo12: Joi.number().required(),
      baremo13: Joi.number().required(),
      baremo14: Joi.number().required(),
      baremo211: Joi.number().required(),
      baremo212: Joi.number().required(),
      baremo22: Joi.number().required(),
      orden: Joi.number()
        .integer()
        .min(0)
        .required(),
      acceso2: Joi.boolean().required(),
      exp: Joi.boolean().required(),
    })
    .validate(data)
