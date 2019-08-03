const Joi = require('@hapi/joi')

module.exports = data =>
  Joi.object()
    .keys({
      nif: Joi.string()
        .regex(/^\w{2,4}$/)
        .required(),
      apellidosynombre: Joi.string().required(),
      orden: Joi.number()
        .min(0)
        .required(),
      acceso2: Joi.boolean().required(),
      exp: Joi.boolean().required(),
      puntuacion: Joi.number().required(),
      asignacion: Joi.string().required(),
      tipovacante: Joi.string(),
      dat: Joi.string()
        .regex(/^DAT/i)
        .required(),
      jornada: Joi.string().allow('', null),
      date: Joi.string()
        .regex(/^\w{4}-\w{2}-\w{2}$/)
        .required(),
    })
    .validate(data)
