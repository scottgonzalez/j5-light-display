# `Segment`

A `Segment` represents one or more lights. The number of lights controlled by a segment is determined by the number of lights connected to the segment's pin.

### `new Segment(options)`

Creates a new `Segment` instance.

* `options` (Object): The options for initializing the segment.
  * `pin` (Mixed): The pin for the segment.
  * `inverted` (Boolean): When `true`, `LOW` will be used to turn on the segment instead of `HIGH`.

```js
const segment = new Segment({
  pin: 3,
  inverted: true
})
```

### `new Segment(pin)`

Creates a new `Segment` instance.

* `pin` (Mixed): The pin for the segment.

```js
const segment = new Segment(3)
```

### `Segment#off()`

Turns off the segment.

```js
segment.off()
```

### `Segment#on()`

Turns on the segment.

```js
segment.on()
```

### `Segment#toggle()`

Toggles the current state for the segment. If the segment is on, it will turn off; if the segment is off, it will turn on.

```js
segment.toggle()
```
