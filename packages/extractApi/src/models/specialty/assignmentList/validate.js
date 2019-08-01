const Joi = require('@hapi/joi')
const { specialtyCodes } = require('@i62navpm/specialty-codes')

module.exports = data =>
  Joi.object()
    .keys({
      specialty: Joi.string()
        .valid(
          [
            ...specialtyCodes.primary.bilingualSpecialties,
            ...specialtyCodes.primary.normalSpecialties,
          ].map(({ id }) => id)
        )
        .required(),
    })
    .validate(data)
