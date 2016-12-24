module.exports = (five) => {
  const Animation = require('./animation')(five)
  const Segment = require('./segment')(five)

  class LightDisplay {
    constructor (options) {
      if (Array.isArray(options)) {
        options = { pins: options }
      }

      this.segments = options.pins.map((pin) => new Segment(pin))
    }

    on () {
      this.start({ name: '__constant__' })
    }

    off () {
      return this.stop()
        .then(() => {
          this.segments.forEach((segment) => segment.off())
        })
    }

    start (options = {}) {
      if (typeof options === 'string') {
        options = { name: options }
      }

      return this.off()
        .then(() => {
          options = Object.assign({ segments: this.segments }, options)
          return Animation.get(options)
        })
        .then((animation) => {
          this.currentAnimation = animation
          animation.start()
        })
    }

    stop () {
      if (!this.currentAnimation) {
        return Promise.resolve()
      }

      return this.currentAnimation.stop()
        .then(() => {
          this.currentAnimation = null
        })
    }
  }

  Object.assign(LightDisplay, {
    Animation,
    Segment
  })

  return LightDisplay
}
