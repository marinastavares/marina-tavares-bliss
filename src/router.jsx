import { Router as RouterLink } from '@reach/router'
import App from 'views/app'
import QuestionList from 'views/question-list'
import Details from 'views/details'

const Router = () => (
  <RouterLink>
    <App path="/">
      <QuestionList path="questions/" />
      <QuestionList path="/" />
      <Details path="questions/:questionId" />
    </App>
  </RouterLink>
)

export default Router
