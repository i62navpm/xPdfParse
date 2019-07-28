module.exports = ({ list }) => {
  const spNormalize = require(`./specialty/${list}/normalize`)
  const spValidate = require(`./specialty/${list}/validate`)

  return {
    data: {},
    from(data) {
      this.data = data
      return this
    },
    normalize() {
      this.data = spNormalize(this.data)
      return this
    },
    async validate() {
      this.data = await spValidate(this.data)
      return this
    },
  }
}
