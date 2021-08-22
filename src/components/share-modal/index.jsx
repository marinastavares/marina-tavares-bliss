import Modal from 'react-modal'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { useCallback, useState, useMemo, memo } from 'react'
import IconButton from 'assets/ic-close.svg'
import { useLocation } from '@reach/router'
import { useOnSuccessCall, useToggle } from 'utils/hooks'
import { SHARE_CONTENT, shareContent } from 'modules/share/actions'

import Input from '../input'
import Button from '../button'

import styles from './styles.scss'

const validateEmail = (email) => {
  const emailRegex =
    // eslint-disable-next-line max-len
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return emailRegex.test(String(email).toLowerCase())
}

const SimpleModal = ({ handleModal, content, ...props }) => {
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [successState, handleSuccess] = useToggle()
  const { href } = useLocation()

  const handleSendAgain = useCallback(() => {
    setEmail('')
    handleSuccess()
  }, [handleSuccess])

  const handleInput = useCallback((event) => {
    const { value } = event.target
    setEmail(value)
  }, [])

  const handleBlur = useCallback((event) => {
    const { value } = event.target
    if (!validateEmail(value)) {
      setError('Please type a valid email')
      return
    }
    if (!value.length) {
      setError('Please type valid email')
      return
    }
    setError('')
  }, [])

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault()
      if (!error) {
        dispatch(shareContent({ destinationEmail: email, contentUrl: href }))
      }
    },
    [dispatch, email, error, href],
  )

  const [isLoading] = useOnSuccessCall(SHARE_CONTENT, handleSuccess)

  const modalStyle = useMemo(
    () => ({
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
      },
      overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
      },
    }),
    [],
  )

  return (
    <Modal
      isOpen
      onRequestClose={handleModal}
      contentLabel="Share URL Modal"
      style={modalStyle}
      ariaHideApp={false}
      className={styles.modal}
      {...props}
    >
      <div className={styles['title-wrapper']}>
        <h2 className={styles.title}>Share this content with your friends!</h2>
        <button type="button" alt="Close modal" className={styles.button} onClick={handleModal}>
          <img className={styles.close} src={IconButton} alt="Close icon" aria-hidden />
        </button>
      </div>
      {successState ? (
        <>
          {' '}
          <p className={styles.info}>Email sent :)</p>{' '}
          <Button onClick={handleSendAgain}>Send to another contact</Button>
        </>
      ) : (
        <>
          <p className={styles.info}>
            {content}. The url{' '}
            <a href={href} className={styles.link} aria-label="Current url">
              {href}
            </a>
            will be sent to the contact typed below.
          </p>
          <form onSubmit={handleSubmit} className={styles.form}>
            <Input
              onBlur={handleBlur}
              value={email}
              onChange={handleInput}
              placeholder="Enter a valid email"
              error={error}
              disabled={isLoading}
            />
            <Button isLoading={isLoading} type="submit">
              Submit
            </Button>
          </form>
        </>
      )}
    </Modal>
  )
}

SimpleModal.propTypes = {
  handleModal: PropTypes.func.isRequired,
  content: PropTypes.string.isRequired,
}

export default memo(SimpleModal)
