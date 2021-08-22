import QuestionMark from 'assets/ic-question.svg'
import PropTypes from 'prop-types'
import { useEffect, useCallback } from 'react'
import { getHealthCheck } from 'modules/health/actions'
import { healthCheckSelector, getHealthCheckLoadingSelector } from 'modules/health/selectors'
import { useDispatch, useSelector } from 'react-redux'
import LoadingHealth from 'components/loading-health'
import NoConnectivity from 'components/no-connectivity'
import Button from 'components/button'
import { useNetwork } from 'utils/hooks'
import clsx from 'clsx'
import { Link } from '@reach/router'
import Favicon from 'assets/question.png'

import styles from './styles.scss'

const App = ({ children }) => {
  const dispatch = useDispatch()
  const isLoading = useSelector(getHealthCheckLoadingSelector)
  const status = useSelector(healthCheckSelector)
  // If the user is not online, it will show a NoConnectivity state
  const isOnline = useNetwork()

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
        <h1 className={styles['retry-title']}>The application is temporally unavailable</h1>
        <Button onClick={handleReload}>Click to reload</Button>
      </div>
    )
  }

  return (
    <>
      {!isOnline && <NoConnectivity />}
      <div className={clsx(styles.view, { [styles.offline]: !isOnline })}>
        <header className={styles.header}>
          <Link to="/questions">
            <img className={styles.icon} src={Favicon} alt="question mark" aria-hidden />
          </Link>
          <Link to="/questions" className={styles.title}>
            Questions and answers database
          </Link>
        </header>
        <main className={styles.main}>{children}</main>
      </div>
    </>
  )
}

App.propTypes = {
  children: PropTypes.node.isRequired,
}

export default App
