import { useState, useCallback, memo } from 'react'
import { useDispatch } from 'react-redux'
import { updateQuestion, UPDATE_QUESTION } from 'modules/questions/actions'
import { Question } from 'models/'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import Button from 'components/button'
import { useOnSuccessCall, useToggle } from 'utils/hooks'

import styles from './styles.scss'

const Poll = ({ question, className }) => {
  const [selected, setChoice] = useState('')
  const [success, handleSuccess] = useToggle()
  const dispatch = useDispatch()

  const handleInput = useCallback((event) => {
    const { value } = event.target
    setChoice(value)
  }, [])

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault()
      if (!selected) {
        return
      }
      dispatch(updateQuestion(selected))
    },
    [dispatch, selected],
  )

  const [isLoading] = useOnSuccessCall(UPDATE_QUESTION, handleSuccess)

  if (success) {
    return (
      <div className={clsx(styles.choices, className)}>
        <h2 className={styles['choices-title']}>Thanks for your vote :)</h2>
      </div>
    )
  }

  return (
    <div className={clsx(styles.choices, className)}>
      <h2 className={styles['choices-title']}>
        For this question we have {question.choices.length} different choices
      </h2>
      <h3 className={styles['choices-intro']}>
        You can also participate into this poll by selecting one of the choices bellow
      </h3>
      <form onSubmit={handleSubmit} className={styles.form}>
        {question.choices.map(({ choice }) => (
          <label
            htmlFor={`input-${choice}`}
            key={choice}
            className={clsx(styles['form-label'], { [styles.checked]: choice === selected })}
          >
            <input
              id={`input-${choice}`}
              onChange={handleInput}
              type="radio"
              value={choice}
              name="vote"
            />{' '}
            {choice}
          </label>
        ))}
        <Button disabled={!selected} isLoading={isLoading} className={styles.button} type="submit">
          Submit vote
        </Button>
      </form>
    </div>
  )
}

Poll.propTypes = {
  question: PropTypes.instanceOf(Question).isRequired,
  className: PropTypes.string,
}

Poll.defaultProps = {
  className: '',
}

export default memo(Poll)
