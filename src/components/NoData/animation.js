import { gsap } from 'gsap'

const jump = (loading, lines) => {
  if (loading.active) {
    return
  }
  loading.active = true
  loading.count += 1
  lines.timeScale(2)
  gsap.to(loading, {
    keyframes: [
      {
        '--skate-x': '-12px',
        duration: 0.3
      },
      {
        '--skate-x': '12px',
        duration: 0.5
      },
      {
        '--skate-x': '0px',
        duration: 0.5
      }
    ]
  })
  gsap.to(loading, {
    keyframes: [
      {
        '--skate-y': '-32px',
        duration: 0.4,
        delay: 0.2
      },
      {
        '--skate-y': '0px',
        duration: 0.2
      }
    ]
  })
  gsap.to(loading, {
    keyframes: [
      {
        duration: 0.2,
        delay: 0.2,
        '--arm-front': '40deg',
        '--arm-front-end': '-12deg',
        '--arm-back': '172deg',
        '--arm-back-end': '38deg',
        '--leg-front': '-8deg',
        '--leg-front-end': '102deg',
        '--leg-back': '103deg',
        '--leg-back-end': '-16deg',
        '--board-r': '-40deg',
        '--body-r': '7deg',
        '--body-y': '-90%',
        '--body-x': '-160%'
      },
      {
        duration: 0.2,
        '--arm-front': '24deg',
        '--arm-front-end': '-48deg',
        '--arm-back': '172deg',
        '--arm-back-end': '15deg',
        '--leg-front': '22deg',
        '--leg-front-end': '55deg',
        '--leg-back': '142deg',
        '--leg-back-end': '-58deg',
        '--board-r': '3deg',
        '--body-r': '12deg',
        '--body-y': '-56%',
        '--body-x': '-60%'
      },
      {
        duration: 0.2,
        '--arm-front': '24deg',
        '--arm-front-end': '-48deg',
        '--arm-back': '164deg',
        '--arm-back-end': '-36deg',
        '--leg-front': '-4deg',
        '--leg-front-end': '66deg',
        '--leg-back': '111deg',
        '--leg-back-end': '-36deg',
        '--board-r': '0deg',
        '--body-r': '34deg',
        '--body-y': '-53%',
        '--body-x': '-28%'
      },
      {
        '--arm-front': '24deg',
        '--arm-front-end': '-48deg',
        '--arm-back': '164deg',
        '--arm-back-end': '-50deg',
        '--leg-front': '40deg',
        '--leg-front-end': '30deg',
        '--leg-back': '120deg',
        '--leg-back-end': '-36deg',
        '--board-r': '0deg',
        '--body-r': '12deg',
        '--body-y': '-65%',
        '--body-x': '-85%',
        duration: 0.4,
        onComplete() {
          loading.active = false
          lines.timeScale(1)
        }
      }
    ]
  })
}

const fast = (loading, lines) => {
  if (loading.active) {
    return
  }
  loading.active = true
  loading.count += 1
  lines.timeScale(2.5)
  gsap.to(loading, {
    '--skate-x': '12px',
    duration: 0.3
  })
  gsap.to(loading, {
    duration: 0.2,
    '--arm-front': '24deg',
    '--arm-front-end': '-48deg',
    '--arm-back': '164deg',
    '--arm-back-end': '-36deg',
    '--leg-front': '-4deg',
    '--leg-front-end': '66deg',
    '--leg-back': '111deg',
    '--leg-back-end': '-36deg',
    '--board-r': '0deg',
    '--body-r': '34deg',
    '--body-y': '-53%',
    '--body-x': '-28%'
  })
}

const reset = (loading, lines) => {
  if (!loading.active) {
    return
  }
  gsap.to(loading, {
    '--skate-x': '0px',
    duration: 0.3
  })
  gsap.to(loading, {
    duration: 0.2,
    '--arm-front': '24deg',
    '--arm-front-end': '-48deg',
    '--arm-back': '164deg',
    '--arm-back-end': '-50deg',
    '--leg-front': '40deg',
    '--leg-front-end': '30deg',
    '--leg-back': '120deg',
    '--leg-back-end': '-36deg',
    '--board-r': '0deg',
    '--board-x': '0px',
    '--body-r': '12deg',
    '--body-y': '-65%',
    '--body-x': '-85%',
    onComplete() {
      loading.active = false
      lines.play()
      lines.timeScale(1)
    }
  })
}

const slow = (loading, lines) => {
  if (loading.active) {
    return
  }
  loading.active = true
  loading.count += 1
  lines.timeScale(0.5)
  gsap.to(loading, {
    '--skate-x': '-12px',
    duration: 0.3
  })
  gsap.to(loading, {
    duration: 0.2,
    '--arm-front': '32deg',
    '--arm-front-end': '20deg',
    '--arm-back': '156deg',
    '--arm-back-end': '-22deg',
    '--leg-front': '19deg',
    '--leg-front-end': '74deg',
    '--leg-back': '134deg',
    '--leg-back-end': '-29deg',
    '--board-r': '-15deg',
    '--body-r': '-8deg',
    '--body-y': '-65%',
    '--body-x': '-110%'
  })
}

const down = (loading, lines) => {
  if (loading.active) {
    return
  }
  loading.active = true
  loading.count += 1
  gsap.to(loading, {
    duration: 0.2,
    '--arm-front': '-26deg',
    '--arm-front-end': '-58deg',
    '--arm-back': '204deg',
    '--arm-back-end': '60deg',
    '--leg-front': '40deg',
    '--leg-front-end': '80deg',
    '--leg-back': '150deg',
    '--leg-back-end': '-96deg',
    '--body-r': '180deg',
    '--body-y': '-100%'
  })
}

const fall = (loading, lines) => {
  if (loading.active) {
    return
  }
  loading.active = true
  loading.ouch = true
  lines.pause()
  gsap.to(loading, {
    duration: 0.5,
    '--board-x': '60px'
  })
  gsap.to(loading, {
    keyframes: [
      {
        '--board-r': '-40deg',
        duration: 0.15
      },
      {
        '--board-r': '0deg',
        duration: 0.3
      }
    ]
  })
  gsap.to(loading, {
    keyframes: [
      {
        '--line-top-x': '-100%',
        '--line-bottom-x': '-200%',
        '--body-r': '-8deg',
        '--leg-back-end': '24deg',
        '--leg-back': '60deg',
        '--leg-front-end': '30deg',
        '--leg-front': '10deg',
        '--arm-back-end': '-40deg',
        '--arm-back': '54deg',
        '--arm-front-end': '-28deg',
        '--arm-front': '24deg',
        duration: 0.2
      },
      {
        '--body-x': '-85%',
        '--body-y': '36%',
        '--body-r': '-26deg',
        '--leg-back-end': '24deg',
        '--leg-back': '20deg',
        '--leg-front-end': '30deg',
        '--leg-front': '-10deg',
        '--arm-back-end': '-40deg',
        '--arm-back': '164deg',
        '--arm-front-end': '-28deg',
        '--arm-front': '24deg',
        duration: 0.2
      }
    ]
  })
}

export const jumpAnimation = jump
export const fastAnimation = fast
export const slowAnimation = slow
export const downAnimation = down
export const resetAnimation = reset
export const fallAnimation = fall
