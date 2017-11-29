# `Animation`

An `Animation` controls the state for all segments. Each animation can define its own set of options to customize the behavior. Some animations are bundled with `LightDisplay`, but additional animations may be loaded via [`Animation.define()`](#animationdefinename-class), [`Animation.loadFile()`](#animationloadfilefilepath), or [`Animation.loadDir()`](#animationloaddirdirpath). See [Custom Animations](#custom-animations) for more information.

See [Built-in Animations](#built-in-animations) for the set of built-in animations and their options.

### `new Animation(options)`

Creates a new `Animation` instance.

* `options` (Object): The options for initializing the animation.
  * `segments` (Array): An `Array` of [`Segment`](segment.md) instances to animate.
  * Additional options may be supported based on the specific animation.

```js
const animation = new Animation({
  segments: display.segments
})
```

*NOTE: `Animation` should never be instantiated directly, only descendants of `Animation` should be instantiated.*

### `Animation.define(name, class)`

Defines a new `Animation` class.

* `name` (String): The name of the animation.
* `class` (Class): The class that manages the animation.

The `class` parameter must be a subclass of `Animation`. See [Custom Animations](#custom-animations) for more information.

```js
class BlinkFast extends Animation {
  step (next) {
    this.segments.forEach((segment) => segment.toggle())
    setTimeout(next, 100)
  }
}

Animation.define('blink fast', BlinkFast)
```

### `Animation.get(options)` => `Animation`

Gets an initialized `Animation` instance using the provided options.

* `options` (Object): The options for intializing the animation.
  * `name` (String): The name of the animation.
  * Additional options may be supported based on the specified animation.

```js
const animation = Animation.get({
  name: 'chase',
  duration: 1000
})
```

### `Animation.loadDir(dirPath)`

Loads all animations in the specified directory.

* `dirPath` (String): The path to the directory containing animations.

```js
Animation.loadDir('/path/to/animations')
```

### `Animation.loadFile(filePath)`

Loads an animation from the specified file.

* `filePath` (String): The path to the file containing the animation.

```js
Animation.loadFile('/path/to/animation.js')
```

### `Animation#start()`

Starts the animation using the options provided to the constructor.

```js
animation.start()
```

### `Animation#stop()`

Stops the animation.

```js
animation.stop()
```

## Built-in Animations

### Blink

Toggles all segments simultaneously.

Options:
* `duration` (Number; default: `500`): The duration in milliseconds that the segments will be on/off before toggling.

### Chase

Toggles segments in order from first to last so the lights "chase" each other.

Options:
* `duration` (Number; default: `500`): The duration in milliseconds for each step.
* `simultaneous` (Number: default: `1`): The number of segments that will be on at the same time. Must be less than the number of segments in the display.

### Constant

Turns on all segments. This isn't really an animation, but is provided to simplify the logic for rotating through random animations while also allowing a constant on as one of the animations. As such, this animation has no options.

### Sparkle

Toggles segments randomly. The segments toggle at a random interval based on the specified minimum and maximum durations. Each step of the animation toggles a single segment, so the duration that a segment is turned on or off is completely random and may be several times longer than the maximum duration defined for each step.

Options:
* `minDelay` (Number; default: `200`): The minimum duration in milliseconds for each step.
* `maxDelay` (Number; default: `400`): The maximum duration in milliseconds for each step.

## Custom Animations

Custom animations can be defined by extending `Animation` and defining a [`step()`](#animationstepnext) method. The `step()` method will be invoked repeatedly while the animation is running. Additionally, an [`initialize()`](#animationinitializeoptions) method may be defined for any setup logic the animation may require.

The examples below are based on a simple blink animation, which has a single option named `duration` with a default value of `500`.

### Animation#initialize(options)

Initializes the animation.

The initialization phase can be used to set default values for options, set segments to an initial state, or perform any other logic that needs to happen only once. Animations do not have an accompanying destruction phase; whenever animations are stopped, all segments are turned off.

* `options` (Object): The options for intializing the animation.
  * `name` (String): The name of the animation.
  * Additional options as defined by the animation.

```js
initialize (options) {
  this.duration = options.duration || 500
}
```

### Animation#step(next)

Performs one step of the animation.

The `step()` method will be invoked repeatedly while the animation is running. The timing between steps is determined by the invocation of `next()`. As soon as `next()` is called, `step()` will be called again, as long as `stop()` was not called during the current step.

```js
step (next) {
  this.segments.forEach((segment) => segment.toggle())
  setTimeout(next, this.duration)
}
```
