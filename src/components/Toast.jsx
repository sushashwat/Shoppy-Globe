import React from 'react'
import PropTypes from 'prop-types'

/**
 * Toast Component
 *
 * Displays a temporary notification popup in the bottom-right corner.
 * Auto-dismisses after 3 seconds.
 *
 * Props:
 * - message: Text to show in the toast
 * - isVisible: Boolean to show/hide toast
 * - onClose: Callback to close the toast
 */
function Toast({ message, isVisible, onClose }) {
  React.useEffect(() => {
    if (!isVisible) return

    // Auto-close after 3 seconds
    const timer = setTimeout(() => {
      onClose()
    }, 3000)

    return () => clearTimeout(timer)
  }, [isVisible, onClose])

  if (!isVisible) return null

  return (
    <div className="toast-overlay">
      <div className="toast-message">
        <span className="toast-icon">✓</span>
        <p>{message}</p>
      </div>
    </div>
  )
}

Toast.propTypes = {
  message: PropTypes.string.isRequired,
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default Toast