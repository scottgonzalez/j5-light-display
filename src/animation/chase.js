module.exports = ({ five, Animation }) => {
  Animation.define('chase', class Chase extends Animation {
    initialize (options) {
      // The max number of simultaneous segments that can be lit is all but one.
      // This results in an inverted chase where a single segment is dark at a time.
      this.simultaneous = five.Fn.constrain(
        options.simultaneous, 1, this.segments.length - 1
      ) || 1

      // The duration for each step cannot be greater than a minute.
      // Even at a minute, the chase would crawl.
      this.duration = five.Fn.constrain(
        options.duration, 1, 60 * 1000
      ) || 500

      // Always start with the first segment
      this.current = 0

      // If we're turning on multiple segments at a time, we need to ramp up
      // one at a time until we have the correct number of segments turned on.
      this.isStarting = this.simultaneous > 1
    }

    step (next) {
      // Determine if we're still only turning lights on because we haven't reached
      // the desired number of simultaneous segments yet.
      if (this.isStarting) {
        this.segments[this.current].on()

        this.current++
        this.isStarting = this.current < this.simultaneous - 1
        return setTimeout(next, this.duration)
      }

      // Turn the next light on at the beginning of the step
      this.segments[this.current].on()

      // Turn the light off at the end of the step
      setTimeout(() => {
        const index = (
          this.current - this.simultaneous + 1 +
          this.segments.length
        ) % this.segments.length
        this.segments[index].off()

        // Determine which segment to animate next
        this.current = (this.current + 1) % this.segments.length
        next()
      }, this.duration)
    }
  })
}
