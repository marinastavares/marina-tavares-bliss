import QuestionMark from 'assets/ic-question.svg'
import PropTypes from 'prop-types'

import styles from './styles.scss'

const App = ({ children }) => (
  <div className={styles.view}>
    <header className={styles.header}>
      <img className={styles.icon} src={QuestionMark} alt="question mark" aria-hidden />
      <p className={styles.title}>Questions and answers database</p>
    </header>
    <main className={styles.main}>{children}</main>
  </div>
)

App.propTypes = {
  children: PropTypes.node.isRequired,
}

export default App
