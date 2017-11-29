# Johnny-Five Light Display

`LightDisplay` is a [Johnny-Five](http://johnny-five.io/) module for controlling a set of lights. Designed to manage everything from a few individual LEDs to large light displays like custom Christmas decorations.

## Example

```js
const five = require('johnny-five')
const LightDisplay = require('light-display')(five)

const board = new five.Board()

board.on('ready', () => {
  const display = new LightDisplay({
    segments: [2, 3, 4]
  })

  display.start('chase')
})
```

## Animations

Four animations come bundled with `LightDisplay`:

* [blink](doc/animation.md#blink): Toggles all segments simultaneously.
* [chase](doc/animation.md#chase): Toggles segments in order from first to last so the lights "chase" each other.
* [constant](doc/animation.md#constant): Turns on all segments (doesn't actually animate).
* [sparkle](doc/animation.md#sparkle): Toggles segments randomly.

## Documentation

* [`Animation`](doc/animation.md)
* [`LightDisplay`](doc/light-display.md)
* [`Segment`](doc/segment.md)

## License

Copyright Scott González. Released under the terms of the MIT license.
