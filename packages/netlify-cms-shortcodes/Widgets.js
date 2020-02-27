import { isPlainObject } from 'lodash'
import Shortcode from './Shortcode'

class Widgets {
  allAvailable() {
    return registered
  }

  allFromBlock(block) {
    return block.match(/\[~([a-zA-Z]*) (.*?) ~\]/gm)
  }

  encodeAllInBlock(block) {
    const shortcodes = this.allFromBlock(block)
    if (!shortcodes) return block
    shortcodes.forEach((shortcode) => {
      const sc = new Shortcode(shortcode)
      block = block.replace(shortcode, sc.encodeSettings().toString())
    })
    return block
  }

  renderAllInBlock(block) {
    if (Array.isArray(block)) {
      block.forEach((b, index) => {
        block[index] = this.renderAllInBlock(b)
      })
    }

    if (isPlainObject(block)) {
      Object.keys(block).forEach((key) => {
        block[key] = this.renderAllInBlock(block[key])
      })
    }

    if (typeof block === 'string') {
      const shortcodes = this.allFromBlock(block)
      if (!shortcodes) return block
      shortcodes.forEach((shortcode) => {
        const sc = new Shortcode(shortcode)
        block = block.replace(shortcode, sc.render())
      })
    }

    return block
  }
}

let widgets = new Widgets();
export default widgets
