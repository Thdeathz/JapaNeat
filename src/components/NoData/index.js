import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import {
  downAnimation,
  fallAnimation,
  fastAnimation,
  jumpAnimation,
  resetAnimation,
  slowAnimation
} from './animation'
import { gsap } from 'gsap'
import './NoData.scss'

function NoData({ title }) {
  const loadingRef = useRef(null)

  useEffect(() => {
    const animation = loading => {
      loading.count = 0

      let lines = gsap.to(loading, {
        keyframes: [
          {
            '--line-top-x': '-100%',
            '--line-bottom-x': '-200%',
            onComplete() {
              gsap.set(loading, {
                '--line-top-x': '200%',
                '--line-bottom-x': '100%'
              })
            }
          },
          {
            '--line-top-x': '0%',
            '--line-bottom-x': '0%'
          }
        ],
        duration: 1,
        repeat: -1
      })

      document.addEventListener('keyup', e => {
        if (e.key === ' ' || e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
          jumpAnimation(loading, lines)
        }
        if (
          e.key === 'ArrowDown' ||
          e.key === 's' ||
          e.key === 'S' ||
          e.key === 'ArrowRight' ||
          e.key === 'd' ||
          e.key === 'D' ||
          e.key === 'ArrowLeft' ||
          e.key === 'a' ||
          e.key === 'A'
        ) {
          if (!loading.ouch) {
            resetAnimation(loading, lines)
          }
        }
        if (
          loading.ouch &&
          (e.key === ' ' || e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W')
        ) {
          loading.ouch = false
          resetAnimation(loading, lines)
        }
      })

      document.addEventListener('keydown', e => {
        if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
          fastAnimation(loading, lines)
        }
        if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
          downAnimation(loading, lines)
        }
        if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
          slowAnimation(loading, lines)
        }
        if (e.key === 'c' || e.key === 'C') {
          fallAnimation(loading, lines)
        }
      })

      return () => {
        document.removeEventListener('onkeyup')
        document.removeEventListener('keydown')
      }
    }

    animation(loadingRef.current)
  }, [])

  return (
    <div className="content">
      <div className="loading" ref={loadingRef}>
        <div className="skate">
          <div className="body">
            <div className="arm back"></div>
            <div className="arm front"></div>
            <div className="leg back"></div>
            <div className="leg front"></div>
          </div>
          <div className="board">
            <svg viewBox="0 0 34 8">
              <path d="M0.897306 0.911767C1.22218 0.30263 1.97934 0.072188 2.58848 0.397061L2.91936 0.573532C3.75214 1.01768 4.68144 1.25 5.62525 1.25H28.3752C29.3191 1.25 30.2484 1.01768 31.0811 0.573532L31.412 0.397061C32.0212 0.072188 32.7783 0.30263 33.1032 0.911767C33.4281 1.5209 33.1976 2.27807 32.5885 2.60294L32.2576 2.77941C31.0627 3.41667 29.7294 3.75 28.3752 3.75H27.9692C28.5841 4.09118 29.0002 4.747 29.0002 5.5C29.0002 6.60457 28.1048 7.5 27.0002 7.5C25.8957 7.5 25.0002 6.60457 25.0002 5.5C25.0002 4.747 25.4164 4.09118 26.0312 3.75H7.96925C8.5841 4.09118 9.00025 4.747 9.00025 5.5C9.00025 6.60457 8.10482 7.5 7.00025 7.5C5.89568 7.5 5.00025 6.60457 5.00025 5.5C5.00025 4.747 5.41639 4.09118 6.03124 3.75H5.62525C4.27109 3.75 2.93774 3.41667 1.74289 2.77941L1.41201 2.60294C0.802874 2.27807 0.572432 1.5209 0.897306 0.911767Z" />
            </svg>
          </div>
          <div className="line top"></div>
          <div className="line bottom"></div>
        </div>
      </div>
      <div className="description">{title}</div>
    </div>
  )
}

NoData.propTypes = {
  title: PropTypes.string.isRequired
}

export default NoData
