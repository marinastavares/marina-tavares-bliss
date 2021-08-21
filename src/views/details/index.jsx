import { useParams, Link } from '@reach/router'
import { useEffect, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getQuestion, updateQuestion } from 'modules/questions/actions'
import {
  questionSelector,
  getQuestionLoadingSelector,
  updateQuestionLoadingSelector,
} from 'modules/questions/selectors'
import Loading from 'components/loading'
import ArrowIcon from 'assets/ic-arrow.svg'
import Button from 'components/button'
import clsx from 'clsx'

import Poll from './poll'
import styles from './styles.scss'

const Details = () => {
  const [selected, setChoice] = useState('')
  const { questionId } = useParams()
  const dispatch = useDispatch()
  const question = useSelector(questionSelector)
  const isLoading = useSelector(getQuestionLoadingSelector)
  const isUpdatingLoading = useSelector(updateQuestionLoadingSelector)

  const handleInput = useCallback((event) => {
    const { value } = event.target
    setChoice(value)
  }, [])

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault()
      dispatch(updateQuestion(selected))
    },
    [dispatch, updateQuestion, selected],
  )

  useEffect(() => {
    dispatch(getQuestion(questionId))
  }, [questionId, dispatch])

  if (isLoading || !(question && question.id)) {
    return <Loading />
  }
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link to="/questions" className={styles.link}>
          <img src={ArrowIcon} aria-hidden alt="Arrow" className={styles.icon} />
        </Link>
        <p className={styles['header-id']}>Question N#{question?.id}</p>
      </div>
      <div className={styles['main-info']}>
        <img
          className={styles.img}
          src={question.imageUrl}
          alt={`Representation of the "${question.questionId}" question`}
        />
        <h1 className={styles.title}>{question.question}</h1>
        <Poll question={question} className={styles.choices} />
      </div>
    </div>
  )
}

export default Details
