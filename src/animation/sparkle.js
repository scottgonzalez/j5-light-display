module.exports = ({ five, Animation }) => {
  Animation.define('sparkle', class Sparkle extends Animation {
    initialize (options) {
      this.minDelay = five.Fn.constrain(options.minDelay, 1, 60 * 1000) || 200
      this.maxDelay = five.Fn.constrain(options.maxDelay, 2, 60 * 1000) || 400
    }

    step (next) {
      // Toggle a random segment
      const segment = this.segments[Math.floor(Math.random() * this.segments.length)]
      segment.toggle()

      // Wait a random amount of time (within the provided constraints) before
      // toggling another random segment
      setTimeout(next, this._delay())
    }

    _delay () {
      return Math.floor(Math.random() * (this.maxDelay - this.minDelay)) + this.minDelay
    }
  })
}
