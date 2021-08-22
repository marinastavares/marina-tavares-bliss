import { useParams, Link } from '@reach/router'
import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getQuestion } from 'modules/questions/actions'
import { questionSelector, getQuestionLoadingSelector } from 'modules/questions/selectors'
import Loading from 'components/loading'
import ArrowIcon from 'assets/ic-arrow.svg'
import DonutChart from 'components/donut-chart'
import { useWindowSize } from 'utils/hooks'

import Poll from './poll'
import styles from './styles.scss'

const Details = () => {
  const { questionId } = useParams()
  const { isMobile } = useWindowSize()
  const dispatch = useDispatch()
  const question = useSelector(questionSelector)
  const isLoading = useSelector(getQuestionLoadingSelector)

  const renderChartData = useMemo(
    () =>
      question && [
        ['choices', 'votes'],
        ...question.choices.map((values) => [values.choice, values.votes]),
      ],
    [question],
  )

  const totalVotes = useMemo(
    () => question && question.choices.reduce((acc, curr) => acc + curr.votes, 0),
    [question],
  )

  const showChoices = useMemo(
    () =>
      question &&
      question.choices
        .sort((choiceA, choiceB) => choiceB.votes - choiceA.votes)
        .reduce((acc, curr, index) => {
          if (index === 0) {
            return `The first place went to ${curr.choice} with ${curr.votes} votes`
          }
          if (index === 1) {
            return `${acc}, followed by ${curr.choice} counting ${curr.votes} votes`
          }
          if (index === question.choices.length - 1) {
            return `${acc}, and for last ${curr.choice} counting ${curr.votes} votes.`
          }
          return `${acc}, ${curr.choice} with ${curr.votes} votes`
        }, ''),
    [question],
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
      <div className={styles.results}>
        <h2 className={styles['results-title']}>Total votes so far</h2>
        <p className={styles['results-total']}>
          For the vote carried out with the proposed question, we had a total of {totalVotes} votes.
          {showChoices}This poll was publised at{' '}
          {new Date(question.publishedAt).toLocaleDateString('en-US', {
            month: 'long',
            day: '2-digit',
            year: 'numeric',
          })}
          . Below there is a chart for better visualization of the data obtained.
        </p>
        <DonutChart
          title={question.question}
          className={styles['donut-innertext']}
          width="400px"
          height={isMobile ? '300px' : '600px'}
          data={renderChartData}
        />
      </div>
    </div>
  )
}

export default Details
