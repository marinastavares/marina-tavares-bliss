import { useState, useCallback, useEffect, useRef } from 'react'
import { useDebounce } from 'use-debounce'
import { navigate, useLocation } from '@reach/router'
import { useDispatch, useSelector } from 'react-redux'
import { getQuestions, getMoreQuestions } from 'modules/questions/actions'
import {
  questionsSelector,
  getQuestionsLoadingSelector,
  hasMoreQuestionSelector,
  getMoreQuestionsLoadingSelector,
} from 'modules/questions/selectors'
import LoadingImage from 'assets/loading-questions.png'
import EmptyImage from 'assets/empty-questions.png'
import Button from 'components/button'

import QuestionCard from './card'
import styles from './styles.scss'

const DEBOUNCED_TIME = 1000

const QuestionList = () => {
  const dispatch = useDispatch()
  const questions = useSelector(questionsSelector)
  const isLoading = useSelector(getQuestionsLoadingSelector)
  const isMoreLoading = useSelector(getMoreQuestionsLoadingSelector)
  const hasMoreQuestions = useSelector(hasMoreQuestionSelector)
  const { search: searchQuery } = useLocation()
  const queryFilter = new URLSearchParams(searchQuery).get('filter')
  const [search, setSearch] = useState(queryFilter)
  const [filter] = useDebounce(search, DEBOUNCED_TIME)
  const inputRef = useRef()

  const handleChange = useCallback((event) => {
    const { value } = event.target
    setSearch(value)
  }, [])

  const handleMoreQuestions = useCallback(() => {
    dispatch(getMoreQuestions())
  }, [dispatch])

  // Navigate to the questions?filter-url when the input is filled
  useEffect(() => {
    if (filter) {
      navigate(`questions?filter=${filter}`)
    }
  }, [filter])

  // Focus on the input when theres nothing on the query parameter
  useEffect(() => {
    if (searchQuery && !queryFilter) {
      inputRef.current.focus()
    }
  }, [searchQuery, queryFilter, inputRef])

  // Populate the initial state of the application
  useEffect(() => {
    dispatch(getQuestions({ limit: 10, filter: queryFilter, offset: 11 }))
  }, [dispatch, queryFilter])

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Access different questions and its anwsers from our platform!
      </h1>
      <input
        ref={inputRef}
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
          {questions.size ? (
            questions.map((question) => <QuestionCard question={question} key={question.id} />)
          ) : (
            <div className={styles.loading}>
              <img
                src={EmptyImage}
                alt="Empty state"
                aria-hidden
                className={styles['loading-image']}
              />
              <p className={styles['loading-text']}>No questions were found for this search :(</p>
            </div>
          )}
        </div>
      )}
      {!isLoading && questions.size && hasMoreQuestions && (
        <Button isLoading={isMoreLoading} onClick={handleMoreQuestions} className={styles.button}>
          Load more
        </Button>
      )}
    </div>
  )
}

export default QuestionList
