import PropTypes from 'prop-types'
import { memo } from 'react'
import ShareIcon from 'assets/ic-share.svg'
import ReactTooltip from 'react-tooltip'
import ShareModal from 'components/share-modal'
import { useToggle } from 'utils/hooks'
import clsx from 'clsx'

import styles from './styles.scss'

const ShareButton = ({ content, className }) => {
  const [isModalOpen, toggleModal] = useToggle()

  return (
    <>
      <button
        type="button"
        alt="Share content with friends"
        className={clsx(styles.button, className)}
        onClick={toggleModal}
        data-tip
        data-for="share-content"
      >
        <img className={styles.close} src={ShareIcon} alt="Share icon" aria-hidden />
      </button>
      <ReactTooltip id="share-content" place="top" effect="solid">
        Share this content with your friends
      </ReactTooltip>
      {isModalOpen && (
        <ShareModal
          content={`Share the content regarding the "${content}" with other people,
        let's battle for the more voted choice`}
          handleModal={toggleModal}
        />
      )}
    </>
  )
}

ShareButton.propTypes = {
  content: PropTypes.string.isRequired,
  className: PropTypes.string,
}

ShareButton.defaultProps = {
  className: '',
}

export default memo(ShareButton)
