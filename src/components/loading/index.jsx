import { memo } from 'react'
import PropTypes from 'prop-types'
import LoadingImage from 'assets/loading-questions.png'

import styles from './styles.scss'

const Loading = ({ isPlural }) => (
  <div className={styles.loading}>
    <img src={LoadingImage} alt="Loading state" aria-hidden className={styles['loading-image']} />
    <p className={styles['loading-text']}>Loading question{isPlural ? 's' : ''}...</p>
  </div>
)

Loading.propTypes = {
  isPlural: PropTypes.bool,
}
Loading.defaultProps = {
  isPlural: false,
}

export default memo(Loading)
