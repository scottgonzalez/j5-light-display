module.exports = (five) => {
  const fs = require('fs')
  const path = require('path')

  const animations = new Map()

  class Animation {
    static define (name, Class) {
      animations.set(name, Class)
    }

    static get (options) {
      const AnimationClass = animations.get(options.name)

      if (!AnimationClass) {
        throw new Error(`Unknown animation: ${options.name}`)
      }

      return new AnimationClass(options)
    }

    static loadFile (filePath) {
      require(filePath)({ five, Animation })
    }

    static loadDir (dirPath) {
      fs.readdirSync(dirPath)
        .filter((filePath) => /\.js$/.test(filePath))
        .map((filePath) => filePath.replace('.js', ''))
        .forEach((filePath) => this.loadFile(path.join(dirPath, filePath)))
    }

    constructor (options = {}) {
      this.isRunning = false
      this.isStepping = false
      this.segments = options.segments
      this.initialize(options)
    }

    initialize () {}

    start () {
      if (this.isRunning) {
        return
      }

      this.isRunning = true
      this._step()
    }

    stop () {
      if (!this.isRunning) {
        return Promise.resolve()
      }

      this.isRunning = false

      return new Promise((resolve) => {
        const interval = setInterval(() => {
          if (!this.isStepping) {
            clearInterval(interval)
            resolve()
          }
        }, 16)
      })
    }

    _step () {
      if (this.isRunning) {
        this.isStepping = true
        this.step(() => this._step())
      } else {
        this.isStepping = false
      }
    }
  }

  // Load all built-in animations
  Animation.loadDir(path.join(__dirname, 'animation'))

  return Animation
}
