import React from 'react'
import Copy from './copy'
import { render } from 'react-dom'
import Highlight, { defaultProps } from 'prism-react-renderer'
import shadesOfPurple from 'prism-react-renderer/themes/shadesOfPurple'
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live'

// https://github.com/gatsbyjs/gatsby/blob/master/www/src/components/code-block/index.js
const getParams = (metastring = ``) => {
  return metastring.split(' ').reduce((merged, param) => {
    const [key, value] = param.split(`=`)
    merged[key] = value
    return merged
  }, {})
}

export const Code = ({
  codeString,
  className = children.props ? children.props.className : ``,
  language,
  ...props
}) => {
  if (props['react-live']) {
    return (
      <LiveProvider code={codeString} noInline={true}>
        <LiveEditor />
        <LiveError />
        <LivePreview />
      </LiveProvider>
    )
  }

  const color = shadesOfPurple.styles[4].style.color
  const borderColor = shadesOfPurple.styles[3].style.color

  const hoverColor = shadesOfPurple.styles[4].style.color
  const hoverBgColor = shadesOfPurple.styles[3].style.color

  React.useEffect(() => {
    const html = document.querySelector('html')
    html.style.setProperty('--copy-hover-bg', hoverBgColor)
    html.style.setProperty('--copy-hover-color', hoverColor)
  }, [])

  const { title } = getParams(props.metastring)

  return (
    <React.Fragment>
      <div
        className="gatsby-code-meta"
        style={{ color: color, borderColor: borderColor }}
      >
        <div className="gatsby-code-meta-text">{title}</div>
        <div className="gatsby-code-meta-text">
          <Copy
            className="gatsby-code-meta-copy"
            content={codeString}
            title={title}
          />
        </div>
      </div>
      <Highlight
        {...defaultProps}
        code={codeString}
        language={language}
        theme={shadesOfPurple}
      >
        {({
          className,
          style,
          tokens,
          getLineProps,
          getTokenProps,
          ...defaultProps
        }) => (
          <pre className={className} style={style}>
            {tokens.map((line, i) => (
              <div {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </React.Fragment>
  )
}
