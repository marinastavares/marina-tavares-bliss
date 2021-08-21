import { useState, useCallback, useEffect } from 'react'
import { useDebounce } from 'use-debounce'
import { navigate } from '@reach/router'
import { useDispatch, useSelector } from 'react-redux'
import { getQuestions } from 'modules/questions/actions'
import { questionsSelector, getQuestionsLoadingSelector } from 'modules/questions/selectors'
import LoadingImage from 'assets/loading-questions.png'

import QuestionCard from './card'
import styles from './styles.scss'

const DEBOUNCED_TIME = 1000

const QuestionList = () => {
  const dispatch = useDispatch()
  const questions = useSelector(questionsSelector)
  const isLoading = useSelector(getQuestionsLoadingSelector)
  const [search, setSearch] = useState('')
  const [filter] = useDebounce(search, DEBOUNCED_TIME)

  const handleChange = useCallback((event) => {
    const { value } = event.target
    setSearch(value)
  }, [])

  useEffect(() => {
    if (filter) {
      navigate(`questions?filter=${filter}`)
    }
  }, [filter])

  useEffect(() => {
    dispatch(getQuestions())
  }, [dispatch])

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Access different questions from our platform!</h1>
      <input
        placeholder="Search questions"
        className={styles.input}
        type="text"
        onChange={handleChange}
        value={search}
      />
      {isLoading ? (
        <div className={styles.loading}>
          <img
            src={LoadingImage}
            alt="Loading state"
            aria-hidden
            className={styles['loading-image']}
          />
          <p className={styles['loading-text']}>Loading questions...</p>
        </div>
      ) : (
        <div className={styles.cards}>
          {questions.map((question) => (
            <QuestionCard question={question} key={question.id} />
          ))}
        </div>
      )}
    </div>
  )
}

export default QuestionList
