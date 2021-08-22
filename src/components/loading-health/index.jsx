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
const Loading = () => (
  <div className={styles.loading}>
    <FadeIn>
      <div className={styles.container}>
        <h1 className={styles.title}>Checking health status of the application</h1>
        <Lottie options={defaultOptions} height={120} width={120} />
      </div>
    </FadeIn>
  </div>
)

export default Loading
