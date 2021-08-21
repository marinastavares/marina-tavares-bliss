import QuestionMark from 'assets/ic-question.svg'

import styles from './styles.scss'

const App = () => (
  <div className={styles.view}>
    <header className={styles.header}>
      <img className={styles.icon} src={QuestionMark} alt="question mark" aria-hidden />
      <p className={styles.title}>Questionary</p>
    </header>
  </div>
)

export default App
