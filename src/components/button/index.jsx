import PropTypes from 'prop-types'
import clsx from 'clsx'

import styles from './styles.scss'

const Button = ({ children, type, className, isLoading, disabled, ...props }) => (
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
  disabled: PropTypes.bool,
}
Button.defaultProps = {
  isLoading: false,
  disabled: false,
  type: 'button',
  className: '',
}

export default Button
