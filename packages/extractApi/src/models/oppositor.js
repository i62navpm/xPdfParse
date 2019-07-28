module.exports = ({ list }) => {
  const opNormalize = require(`./oppositor/${list}/normalize`)
  const opValidate = require(`./oppositor/${list}/validate`)

  return {
    data: {},
    from(data) {
      this.data = data
      return this
    },
    normalize() {
      this.data = opNormalize(this.data)
      return this
    },
    async validate() {
      this.data = await opValidate(this.data)
      return this
    },
  }
}
