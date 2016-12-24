// The constant animation is used for keeping the lights in a constant on state.
// This is implemented as an animation so that `LightDisplay` doesn't need
// special logic for switching between an animation and constant on.
module.exports = ({ five, Animation }) => {
  Animation.define('__constant__', class Solid extends Animation {
    start () {
      this.segments.forEach((segment) => segment.on())
    }

    // We have to implement a step so that `stop()` can interrupt between steps.
    // The duration is chosen to be small enough to not be perceivable when
    // switching to another animation, but long enough to not be a resource hog.
    step (next) {
      setTimeout(next, 200)
    }
  })
}
