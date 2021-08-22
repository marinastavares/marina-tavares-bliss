import React from 'react'
import FadeIn from 'react-fade-in'
import Lottie from 'react-lottie'

import * as loader from './loader.json'
import styles from './styles.scss'

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: loader.default,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
}
const NoConnectivity = () => (
  <div className={styles.connectivity}>
    <FadeIn>
      <div className={styles.container}>
        <h1 className={styles.title}>Network error</h1>
        <Lottie options={defaultOptions} height={240} width={240} />
        <p className={styles.subtitle}>Check your internet connection, you seems to be offline</p>
      </div>
    </FadeIn>
  </div>
)

export default NoConnectivity
