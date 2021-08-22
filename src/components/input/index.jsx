import { forwardRef } from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'

import styles from './styles.scss'

const Input = forwardRef(({ className, isSearchInput, error, ...props }, ref) => (
  <div className={styles.container}>
    <input
      ref={ref}
      className={clsx(
        styles.input,
        className,
        styles[isSearchInput ? 'search-icon' : 'email-icon'],
        { [styles.error]: !!error },
      )}
      type={isSearchInput ? 'search' : 'text'}
      {...props}
    />
    {!!error && <p className={styles['error-description']}>{error}</p>}
  </div>
))

Input.propTypes = {
  className: PropTypes.string,
  isSearchInput: PropTypes.bool,
}
Input.defaultProps = {
  isSearchInput: false,
  className: '',
}

export default Input
