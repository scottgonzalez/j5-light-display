module.exports = (five) => {
  class Segment {
    constructor (options) {
      if (typeof options !== 'object') {
        options = { pin: options }
      }

      this.pin = new five.Pin(options.pin)
      this.inverted = !!options.inverted

      this.off()
    }

    on () {
      if (this.inverted) {
        this.pin.low()
      } else {
        this.pin.high()
      }

      this.isOn = true
    }

    off () {
      if (this.inverted) {
        this.pin.high()
      } else {
        this.pin.low()
      }

      this.isOn = false
    }

    toggle () {
      if (this.isOn) {
        this.off()
      } else {
        this.on()
      }
    }
  }

  return Segment
}
