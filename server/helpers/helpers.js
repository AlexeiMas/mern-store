class Helpers {
  spaceReplacer = (str, symbol = '_') => {
    return str.trim().toLowerCase().replaceAll(' ', symbol)
  }
  slugGen = (...params) => {
    return params.reduce((acc, el) =>
      `${this.spaceReplacer(acc)}_${this.spaceReplacer(el)}`
    )
  }
}

module.exports = new Helpers()