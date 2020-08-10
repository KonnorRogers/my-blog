import Typography from 'typography'
import githubTheme from 'typography-theme-github'

githubTheme.baseFontSize = "17px"
const typography = new Typography(githubTheme)

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export const rhythm = typography.rhythm
export const scale = typography.scale
export default typography
