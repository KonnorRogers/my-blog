// @see https://github.com/gatsbyjs/gatsby/blob/master/www/src/components/copy.js
import React, { useState } from 'react'
import PropTypes from 'prop-types'

import copyToClipboard from './copy-to-clipboard'

const delay = duration => new Promise(resolve => setTimeout(resolve, duration))

function Copy({ className, content, duration, title, trim = false }) {
  const [copied, setCopied] = useState(false)

  const label = copied
    ? `${title ? title + ` ` : ``}copied to clipboard`
    : `${title ? title + `: ` : ``}copy code to clipboard`

  return (
    <button
      name={label}
      className={className}
      disabled={copied}
      // sx={{
      //   backgroundColor: `transparent`,
      //   border: `none`,
      //   color: `code.copyButton`,
      //   cursor: `pointer`,
      //   fontSize: 2,
      //   fontFamily: `heading`,
      //   lineHeight: `solid`,
      //   p: 2,
      //   transition: `default`,
      //   "&[disabled]": {
      //     cursor: `not-allowed`,
      //   },
      //   ":not([disabled]):hover": {
      //     bg: `purple.60`,
      //     boxShadow: `raised`,
      //     color: `white`,
      //   },
      //   ":active": {
      //     boxShadow: `floating`,
      //   },
      // }}
      onClick={async () => {
        await copyToClipboard(trim ? content.trim() : content)

        setCopied(true)

        await delay(duration)

        setCopied(false)
      }}
    >
      {copied ? `Copied` : `Copy`}
    </button>
  )
}

Copy.propTypes = {
  content: PropTypes.string.isRequired,
  duration: PropTypes.number,
  title: PropTypes.string,
  trim: PropTypes.bool,
}

Copy.defaultProps = {
  duration: 5000,
  fileName: ``,
}

export default Copy
