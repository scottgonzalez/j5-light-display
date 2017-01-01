# `LightDisplay`

`LightDisplay` is the main class for controlling a light display. An instance of `LightDisplay` will contain many [`Segment`](segment.md) instances. Each `Segment` represents one or more lights. The segments can be controlled directly or can be managed via an [`Animation`](animation.md).

### `new LightDisplay(options)`

Creates a new `LightDisplay` instance.

* `options` (Object): The options for initializing the display.
  * `segments` (Array): The options for each segment. See the [`Segment`](segment.md) documentation for more information.

```js
const display = new LightDisplay({
  segments: [2, 3, 4]
})
```

### `new LightDisplay(segments)`

Creates a new `LightDisplay` instance.

* `segments` (Array): The options for each segment. See the [`Segment`](segment.md) documentation for more information.

```js
const display = new LightDisplay([2, 3, 4])
```

### `LightDisplay#off()`

Turns off all segments. Stops any currently running animation.

```js
display.off()
```

### `LightDisplay#on()`

Turns on all segments. Stops any currently running animation.

```js
display.on()
```

### `LightDisplay#start(options)`

Starts an animation.

* `options` (Object): The options for the animation.
  * `name` (String): The name of the animation.
  * Additional options may be supported based on the specified animation.

See [`Animation`](animation.md) for more information.

```js
display.start({
  name: 'chase',
  simultaneous: 3,
  duration: 1000
})
```

### `LightDisplay#start(name)`

Starts an animation with default options.

* `name` (String): The name of the animation.

```js
display.start('chase')
```

### `LightDisplay#stop()` => `Promise`

Stops the currently running animation.

Returns a `Promise` which resolves when the animation has stopped.

```js
display.stop()
```

### `LightDisplay#segments`

An `Array` of all [`Segment`](segment.md) instances for the light display.

### `LightDisplay.Animation`

See [`Animation`](animation.md).

### `LightDisplay.Segment`

See [`Segment`](segment.md).
