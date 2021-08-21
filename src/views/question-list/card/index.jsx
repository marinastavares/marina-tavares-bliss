import { useCallback, memo } from 'react'
import PropTypes from 'prop-types'
import { Link } from '@reach/router'

import styles from './styles.scss'

const QuestionCard = ({ question }) => {
  const countTotalOfVotes = useCallback(
    (choices) => choices.reduce((acc, curr) => acc + curr.votes, 0),
    [],
  )
  return (
    <Link to={`questions/${question.id}`} id={question.id} className={styles.card}>
      <img
        className={styles['card-image']}
        src={question.thumbUrl}
        aria-hidden
        alt={`Image of the ${question.question} question`}
      />
      <h1 className={styles['card-title']}>{question.question}</h1>
      <span className={styles['card-published']}>
        Published at{' '}
        {new Date(question.publishedAt).toLocaleDateString('en-US', {
          month: 'long',
          day: '2-digit',
          year: 'numeric',
        })}
      </span>
      <div className={styles['card-votes']}>
        <p className={styles.number}>{countTotalOfVotes(question.choices)}</p>
        <span className={styles['number-text']}>votes counted</span>
      </div>
    </Link>
  )
}

QuestionCard.propTypes = {
  question: PropTypes.shape({
    id: PropTypes.number,
    question: PropTypes.string,
    publishedAt: PropTypes.string,
    thumbUrl: PropTypes.string,
    imageUrl: PropTypes.string,
    choices: PropTypes.arrayOf(
      PropTypes.shape({ choice: PropTypes.string, votes: PropTypes.number }),
    ),
  }).isRequired,
}

export default memo(QuestionCard)
