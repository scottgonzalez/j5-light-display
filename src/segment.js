module.exports = (five) => {
  class Segment {
    constructor (pin) {
      this.pin = new five.Pin(pin)
      this.off()
    }

    on () {
      this.pin.low()
      this.isOn = true
    }

    off () {
      this.pin.high()
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
