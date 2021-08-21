import { useCallback, memo } from 'react'
import PropTypes from 'prop-types'
import { Link } from '@reach/router'

import styles from './styles.scss'

const QuestionCard = ({ question }) => {
  const countTotalOfVotes = useCallback(
    (choices) => choices.reduce((acc, curr) => acc + curr.votes, 0),
    [],
  )

  const showChoices = useCallback(
    (choices) =>
      choices
        .sort((choiceA, choiceB) => choiceB.votes - choiceA.votes)
        .reduce((acc, curr, index) => {
          if (index === 3) {
            return `${acc} and ${choices.length - index + 1} more choices`
          }
          if (index < 2) {
            if (choices.length === 2) {
              return `${acc} and ${curr.choice}`
            }
            return `${acc + curr.choice}, `
          }
          return acc
        }, ''),
    [],
  )
  return (
    <Link to={`/questions/${question.id}`} id={question.id} className={styles.card}>
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
      <p className={styles['card-options']}>Answers containing {showChoices(question.choices)}</p>
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
