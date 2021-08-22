import QuestionMark from 'assets/ic-question.svg'
import PropTypes from 'prop-types'
import { useEffect, useCallback } from 'react'
import { getHealthCheck } from 'modules/health/actions'
import { healthCheckSelector, getHealthCheckLoadingSelector } from 'modules/health/selectors'
import { useDispatch, useSelector } from 'react-redux'
import LoadingHealth from 'components/loading-health'
import Button from 'components/button'

import styles from './styles.scss'

const App = ({ children }) => {
  const dispatch = useDispatch()
  const isLoading = useSelector(getHealthCheckLoadingSelector)
  const status = useSelector(healthCheckSelector)

  const handleReload = useCallback(() => {
    window.location.reload(false)
  }, [])

  useEffect(() => {
    dispatch(getHealthCheck)
  }, [dispatch])

  if (isLoading || !status) {
    return <LoadingHealth />
  }

  if (status !== 'OK') {
    return (
      <div className={styles.retry}>
        <h1 className={styles['retry-title']}>The application is temporaly unavailable</h1>
        <Button onClick={handleReload}>Click to reload</Button>
      </div>
    )
  }

  return (
    <div className={styles.view}>
      <header className={styles.header}>
        <img className={styles.icon} src={QuestionMark} alt="question mark" aria-hidden />
        <p className={styles.title}>Questions and answers database</p>
      </header>
      <main className={styles.main}>{children}</main>
    </div>
  )
}

App.propTypes = {
  children: PropTypes.node.isRequired,
}

export default App
