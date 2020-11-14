import Ceramic from '@ceramicnetwork/ceramic-http-client'
import { IDXWeb } from '@ceramicstudio/idx-web'

import { definitions } from '../config.json'

const CERAMIC_URL = `https://ceramic.3boxlabs.com`
// const CERAMIC_URL = `https://ceramic.evius.id`

class IDXWrapper {
  constructor() {
    this.ceramic = null
    this.idx = null
  }

  async init() {
    const ceramic = new Ceramic(CERAMIC_URL)
    const idx = new IDXWeb({ ceramic, definitions })
    this.ceramic = ceramic
    this.idx = idx
  }
}

export default IDXWrapper
