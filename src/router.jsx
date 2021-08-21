import { Router as RouterLink } from '@reach/router'
import App from 'views/app'
import QuestionList from 'views/question-list'

const Router = () => (
  <RouterLink>
    <App path="/">
      <QuestionList path="question" />
    </App>
  </RouterLink>
)

export default Router
