module.exports = ({ five, Animation }) => {
  Animation.define('blink', class Blink extends Animation {
    initialize (options) {
      this.duration = options.duration || 500
    }

    step (next) {
      this.segments.forEach((segment) => segment.toggle())
      setTimeout(next, this.duration)
    }
  })
}
