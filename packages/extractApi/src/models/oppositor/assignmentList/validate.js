const Joi = require('@hapi/joi')

module.exports = data =>
  Joi.object()
    .keys({
      nif: Joi.string()
        .regex(/^\w{2,4}$/)
        .required(),
      apellidosynombre: Joi.string().required(),
      orden: Joi.number()
        .integer()
        .min(0)
        .required(),
      asignacion: Joi.string().required(),
      tipovacante: Joi.string(),
      jornada: Joi.string().allow('', null),
    })
    .validate(data)
