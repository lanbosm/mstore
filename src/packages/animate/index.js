
var core = (function Animate (global) {
  var time = Date.now || function () {
    return +new Date()
  }

  var desiredFrames = 60
  var millisecondsPerSecond = 1000
  var running = {}
  var counter = 1

  var core = {
    status: {
      fps: 60
    },
    method: {},
    effect: {}

  }

  // 最基础的动画操作
  core.method = {
    /**
     * Start the animation.
     *
     * @param stepCallback {Function} Pointer to function which is executed on every step.
     *   Signature of the method should be `function(percent, now, virtual) { return continueWithAnimation; }`
     * @param verifyCallback {Function} Executed before every animation step.
     *   Signature of the method should be `function() { return continueWithAnimation; }`
     * @param completedCallback {Function}
     *   Signature of the method should be `function(droppedFrames, finishedAnimation) {}`
     * @param duration {Integer} Milliseconds to run the animation
     * @param easingMethod {Function} Pointer to easing function
     *   Signature of the method should be `function(percent) { return modifiedValue; }`
     * @param root {Element ? document.body} Render root, when available. Used for internal
     *   usage of requestAnimationFrame.
     * @return {Integer} Identifier of animation. Can be used to stop it any time.
     */
    start: function (stepCallback, verifyCallback, completedCallback, duration, easingMethod, root) {
      var start = time()
      var lastFrame = start
      var percent = 0
      var dropCounter = 0
      var id = counter++

      if (!root) {
        root = document.body
      }

      // Compacting running db automatically every few new animations
      if (id % 20 === 0) {
        var newRunning = {}
        for (var usedId in running) {
          newRunning[usedId] = true
        }
        running = newRunning
      }

      // This is the internal step method which is called every few milliseconds
      var step = function (virtual) {
        // Normalize virtual value
        var render = virtual !== true

        // Get current time
        var now = time()

        // Verification is executed before next animation step
        if (!running[id] || (verifyCallback && !verifyCallback(id))) {
          running[id] = null
          completedCallback && completedCallback(desiredFrames - (dropCounter / ((now - start) / millisecondsPerSecond)), id, false)
          return
        }

        // For the current rendering to apply let's update omitted steps in memory.
        // This is important to bring internal state variables up-to-date with progress in time.
        if (render) {
          var droppedFrames = Math.round((now - lastFrame) / (millisecondsPerSecond / desiredFrames)) - 1
          for (var j = 0; j < Math.min(droppedFrames, 4); j++) {
            step(true)
            dropCounter++
          }
        }

        // Compute percent value
        if (duration) {
          percent = (now - start) / duration
          if (percent > 1) {
            percent = 1
          }
        }

        // Execute step callback, then...
        var value = easingMethod ? easingMethod(percent) : percent
        if ((stepCallback(value, now, render) === false || percent === 1) && render) {
          running[id] = null
          completedCallback && completedCallback(desiredFrames - (dropCounter / ((now - start) / millisecondsPerSecond)), id, percent === 1 || duration == null)
        } else if (render) {
          lastFrame = now
          core.effect.Animate.requestAnimationFrame(step, root)
        }
      }

      // Mark as running
      running[id] = true

      // Init first step
      core.effect.Animate.requestAnimationFrame(step, root)

      // Return unique animation ID
      return id
    },

    /**
     * Whether the given animation is still running.
     *
     * @param id {Integer} Unique animation ID
     * @return {Boolean} Whether the animation is still running
     */
    isRunning: function (id) {
      return running[id] != null
    },

    /**
     * Stops the given animation.
     *
     * @param id {Integer} Unique animation ID
     * @return {Boolean} Whether the animation was stopped (aka, was running before)
     */
    stop: function (id) {
      var cleared = running[id] != null
      if (cleared) {
        running[id] = null
      }
      return cleared
    }

  }

  core.effect.Animate = {
    /**
     * A requestAnimationFrame wrapper / polyfill.
     *
     * @param callback {Function} The callback to be invoked before the next repaint.
     * @param root {HTMLElement} The root element for the repaint
     */
    requestAnimationFrame: (function () {
      // Check for request animation Frame support
      var requestFrame = global.requestAnimationFrame || global.webkitRequestAnimationFrame || global.mozRequestAnimationFrame || global.oRequestAnimationFrame
      var isNative = !!requestFrame

      if (requestFrame && !/requestAnimationFrame\(\)\s*\{\s*\[native code\]\s*\}/i.test(requestFrame.toString())) {
        isNative = false
      }

      if (isNative) {
        return function (callback, root) {
          requestFrame(callback, root)
        }
      }

      var TARGET_FPS = core.status.fps
      console.log('fps:' + TARGET_FPS)
      var requests = {}
      var requestCount = 0
      var rafHandle = 1
      var intervalHandle = null
      var lastActive = +new Date()

      return function (callback, root) {
        var callbackHandle = rafHandle++

        // Store callback
        requests[callbackHandle] = callback
        requestCount++

        // Create timeout at first request
        if (intervalHandle === null) {
          intervalHandle = setInterval(function () {
            var time = +new Date()
            var currentRequests = requests

            // Reset data structure before executing callbacks
            requests = {}
            requestCount = 0

            for (var key in currentRequests) {
              if (currentRequests.hasOwnProperty(key)) {
                currentRequests[key](time)
                lastActive = time
              }
            }

            // Disable the timeout when nothing happens for a certain
            // period of time
            if (time - lastActive > 2500) {
              clearInterval(intervalHandle)
              intervalHandle = null
            }
          }, 1000 / TARGET_FPS)
        }

        return callbackHandle
      }
    })()

  }

  return core
})(window)

// 通过core的扩展一些自己需要的方法
core.method.getCSS = function (el, attr) {
  var styles = {}

  for (var styleName in attr) {
    if (window.getComputedStyle) {
      styles[styleName] = getComputedStyle(el)[styleName]
    } else {
      styles[styleName] = el.currentStyle[styleName]
    }
  }

  var obj = {}
  obj.style = {}
  obj.style.translateX = parseFloat(styles['transform'].substring(7).split(',')[4])
  obj.style.translateY = parseFloat(styles['transform'].substring(7).split(',')[5])
  return obj
}

core.method.setCSS = function (el, attr, cb) {
  var self = this
  var dopt = {}
  var attr = Object.assign({}, dopt, attr)

  var step = function (percent, now, render) {
    for (var i in attr) {
      el.style[i] = attr[i]
    }
  }

  var verify = function (id) {
    return el._isAnimating === id
  }

  var completed = function (renderedFramesPerSecond, animationId, wasFinished) {
    if (animationId === el._isAnimating) {
      el._isAnimating = false
    }
  }

  if (el._isAnimating) {
    self.stop(el._isAnimating)
    el._isAnimating = false
  }
  // completed,1000/core.status.fps
  el._isAnimating = self.start(step, verify)
}

/**
 * 因为技术问题 这里的matrix 是不按规范来的 如果对矩阵很了解 可以改成正式版
 * @param transfrom
 */
function transfrom2obj (transfromStr) {
  function _makeTemplate (obj) {
    var str = obj.originStr
    for (var i in obj.style) {
      if (i != 'originStr') {
        str = str.replace(obj.style[i], '$' + i)
      }
    }
    return str
  }

  var obj = {}
  obj.originStr = transfromStr
  obj.style = {}
  if (transfromStr.indexOf('translate(') >= 0) {
    var matrix = transfromStr.replace(/translate\(/g, '').replace(/px/g, '').replace(/\)/, '')
    obj.style.translateX = matrix.split(',')[0]
    obj.style.translateY = matrix.split(',')[1]
    obj.template = _makeTemplate(obj)
  } else if (transfromStr.indexOf('translateX(') >= 0) {
    var matrix = transfromStr.replace(/translateX\(/g, '').replace(/px/g, '').replace(/\)/, '')
    obj.style.translateX = matrix
    obj.template = _makeTemplate(obj)
  }
  return obj
}

function obj2transfrom (obj) {
  for (var i in obj.style) {
    obj.template = obj.template.replace('$' + i, obj.style[i])
  }
  return obj.template
}

/*
  物体多属性同时运动的函数
  obj：运动的物体
  oTarget：对象，属性名为运动的样式名，属性值为样式运动的终点值
  ratio：速度的系数
*/

core.method.bufferTransition = function bufferMove (el, attr, cb, ratio = 8) {
  var self = this
  var dopt = {}
  var attr = Object.assign({}, dopt, attr)

  var tag
  if (attr.transform) {
    tag = transfrom2obj(attr.transform)
  }

  // 声明 速率
  var stepX = 0
  var stepY = 0
  // 声明弹性距离
  var disX = 1
  var disY = 1

  var step = function (percent, now, render) {
    var cur = core.method.getCSS(el, attr)

    var curX = Number(cur.style.translateX) || 0
    var curY = Number(cur.style.translateY) || 0

    var tagX = Number(tag.style.translateX) || 0
    var tagY = Number(tag.style.translateY) || 0

    disX = tagX - curX
    disY = tagY - curY

    // 更新弹性距离
    stepX = (tagX - curX) * 0.4
    stepY = (tagY - curY) * 0.4

    curX = stepX > 0 ? Math.ceil(curX) : Math.floor(curX)
    curY = stepX > 0 ? Math.ceil(curY) : Math.floor(curY)

    // if((curX + stepX - tagX)*stepX > 0){
    //   stepX = tagX- curX;
    // }

    cur.style.translateX = curX + stepX
    cur.style.translateY = curY + stepY

    cur.template = tag.template

    el.style['transform'] = obj2transfrom(cur)
  }

  var verify = function (id) {
    // console.log(curX-tagX);
    if (Math.round(disX) == 0 && Math.round(disY) == 0) {
      // 已经十分接近
      el.style['transform'] = obj2transfrom(tag)
      self.stop(el._isAnimating)
      el._isAnimating = false
      if (cb) {
        cb()
      }
    }
    return el._isAnimating === id
  }

  if (el._isAnimating) {
    self.stop(el._isAnimating)
    el._isAnimating = false
  }
  el._isAnimating = self.start(step, verify)
}

// 弹性过度
core.method.elasticTransition = function (el, attr, cb) {
  var self = this
  var dopt = {}
  var attr = Object.assign({}, dopt, attr)

  var tag
  if (attr.transform) {
    tag = transfrom2obj(attr.transform)
  }

  // 声明 速率
  var velocityX = 0
  var velocityY = 0
  // 声明弹性距离
  var disX = 1
  var disY = 1
  // 声明弹性系数  默认值为0.3
  var acceleration = 0.2
  // 声明损耗系数 默认值为0.7
  var deceleration = 0.6

  var step = function (percent, now, render) {
    var cur = core.method.getCSS(el, attr)

    var curX = Number(cur.style.translateX) || 0
    var curY = Number(cur.style.translateY) || 0

    var tagX = Number(tag.style.translateX) || 0
    var tagY = Number(tag.style.translateY) || 0

    // 更新弹性距离
    disX = tagX - curX
    disY = tagY - curY

    // 弹力影响
    velocityX += disX * acceleration
    velocityY += disY * acceleration
    // 阻力影响
    velocityX = velocityX * deceleration
    velocityY = velocityY * deceleration

    cur.style.translateX = curX + velocityX

    cur.style.translateY = curY + velocityY

    cur.template = tag.template

    el.style['transform'] = obj2transfrom(cur)
  }

  var verify = function (id) {
    if (Math.round(velocityX) == 0 && Math.round(velocityY) == 0 && Math.round(disX) == 0 && Math.round(disY) == 0) {
      // 已经十分接近
      el.style['transform'] = obj2transfrom(tag)
      self.stop(el._isAnimating)
      el._isAnimating = false
      if (cb) {
        cb()
      }
    }
    return el._isAnimating === id
  }

  if (el._isAnimating) {
    self.stop(el._isAnimating)
    el._isAnimating = false
  }
  el._isAnimating = self.start(step, verify)
}

var vueAnimate = {

  install: function (Vue) {
    Vue.prototype.$animate = core.method
  }
}

export default vueAnimate
