/*
 * Source: Halo Hao theme templates/assets/libs/canvas/dark.js
 * Vue adapter: preserve the original particle/comet algorithm while exposing
 * cleanup and accepting LogicStack's "night" theme value.
 */
(function () {
  if (window.__haoDarkDestroy) window.__haoDarkDestroy()

  function dark() {
    window.requestAnimationFrame =
      window.requestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.msRequestAnimationFrame

    var width
    var height
    var starCount
    var context
    var speed = 0.05
    var canvas = document.getElementById('universe')
    var opening = true
    var cometColor = '226,225,224'
    var stars = []
    var rafId
    var alive = true

    if (!canvas) return function () {}

    function resize() {
      width = window.innerWidth
      height = window.innerHeight
      starCount = 0.216 * width
      canvas.setAttribute('width', width)
      canvas.setAttribute('height', height)
    }

    function draw() {
      context.clearRect(0, 0, width, height)
      for (var length = stars.length, index = 0; index < length; index++) {
        var star = stars[index]
        star.move()
        star.fadeIn()
        star.fadeOut()
        star.draw()
      }
    }

    function Star() {
      this.reset = function () {
        this.giant = chance(3)
        this.comet = !this.giant && !opening && chance(10)
        this.x = random(0, width - 10)
        this.y = random(0, height)
        this.r = random(1.1, 2.6)
        this.dx = random(speed, 6 * speed) + (this.comet + 1 - 1) * speed * random(50, 120) + 0.1
        this.dy = -random(speed, 6 * speed) - (this.comet + 1 - 1) * speed * random(50, 120)
        this.fadingOut = null
        this.fadingIn = true
        this.opacity = 0
        this.opacityTresh = random(0.2, 1 - 0.4 * (this.comet + 1 - 1))
        this.do = random(0.0005, 0.002) + 0.001 * (this.comet + 1 - 1)
      }

      this.fadeIn = function () {
        if (this.fadingIn) {
          this.fadingIn = !(this.opacity > this.opacityTresh)
          this.opacity += this.do
        }
      }

      this.fadeOut = function () {
        if (this.fadingOut) {
          this.fadingOut = !(this.opacity < 0)
          this.opacity -= this.do / 2
          if (this.x > width || this.y < 0) {
            this.fadingOut = false
            this.reset()
          }
        }
      }

      this.draw = function () {
        context.beginPath()
        if (this.giant) {
          context.fillStyle = 'rgba(180,184,240,' + this.opacity + ')'
          context.arc(this.x, this.y, 2, 0, 2 * Math.PI, false)
        } else if (this.comet) {
          context.fillStyle = 'rgba(' + cometColor + ',' + this.opacity + ')'
          context.arc(this.x, this.y, 1.5, 0, 2 * Math.PI, false)
          for (var tail = 0; tail < 30; tail++) {
            context.fillStyle = 'rgba(' + cometColor + ',' + (this.opacity - (this.opacity / 20) * tail) + ')'
            context.rect(this.x - (this.dx / 4) * tail, this.y - (this.dy / 4) * tail - 2, 2, 2)
            context.fill()
          }
        } else {
          context.fillStyle = 'rgba(226,225,142,' + this.opacity + ')'
          context.rect(this.x, this.y, this.r, this.r)
        }
        context.closePath()
        context.fill()
      }

      this.move = function () {
        this.x += this.dx
        this.y += this.dy
        if (false === this.fadingOut) this.reset()
        if (this.x > width - width / 4 || this.y < 0) this.fadingOut = true
      }

      setTimeout(function () {
        opening = false
      }, 50)
    }

    function chance(value) {
      return Math.floor(1000 * Math.random()) + 1 < 10 * value
    }

    function random(minimum, maximum) {
      return Math.random() * (maximum - minimum) + minimum
    }

    resize()
    window.addEventListener('resize', resize, false)
    context = canvas.getContext('2d')
    for (var index = 0; index < starCount; index++) {
      stars[index] = new Star()
      stars[index].reset()
    }
    draw()

    function animate() {
      var mode = document.documentElement.getAttribute('data-theme')
      if (mode === 'dark' || mode === 'night') draw()
      if (alive) rafId = window.requestAnimationFrame(animate)
    }

    animate()

    return function destroy() {
      alive = false
      window.cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize, false)
      context.clearRect(0, 0, width, height)
    }
  }

  window.__haoDarkDestroy = dark()
})()
