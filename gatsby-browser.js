// custom typefaces
import 'typeface-montserrat'
import 'typeface-merriweather'
import './src/styles/global.css'

import { wrapRootElement as wrap } from './wrap-root-element'

export const wrapRootElement = wrap

import Prism from "prism-react-renderer/prism";

(typeof global !== "undefined" ? global : window).Prism = Prism;

require("prismjs/components/prism-kotlin");
require("prismjs/components/prism-ruby");
require("prismjs/components/prism-csharp");
