import PropTypes from 'prop-types'
import clsx from 'clsx'
import { Link } from '@reach/router'
import { memo } from 'react'

import styles from './styles.scss'

const Button = ({ children, type, className, isLoading, disabled, to, ...props }) =>
  to ? (
    <Link className={clsx(className, styles.button, styles.link)} to={to}>
      {children}
    </Link>
  ) : (
    <button
      className={clsx(className, styles.button)}
      disabled={isLoading || disabled}
      // eslint-disable-next-line react/button-has-type
      type={type}
      {...props}
    >
      {isLoading ? '...' : children}
    </button>
  )

Button.propTypes = {
  children: PropTypes.node.isRequired,
  isLoading: PropTypes.bool,
  type: PropTypes.string,
  className: PropTypes.string,
  to: PropTypes.string,
  disabled: PropTypes.bool,
}
Button.defaultProps = {
  isLoading: false,
  disabled: false,
  type: 'button',
  className: '',
  to: '',
}

export default memo(Button)
