import NotFoundPage from 'assets/404.png'
import Button from 'components/button'

import styles from './styles.scss'

const NotFound = () => (
  <div className={styles.container}>
    <img className={styles.image} src={NotFoundPage} alt="404 not found" />
    <Button to="/questions">Go back to the main view</Button>
  </div>
)

export default NotFound
