import atob from 'atob'
import Widget from './Widget'
import WidgetRegistry from './WidgetRegistry'

export default class Shortcode {
  constructor(shortcode) {
    this.shortcode = shortcode
    const match = this.shortcode.match(/\[~([a-zA-Z]*) (.*?) ~\]/)
    this.name = match[1]
    match[2] = match[2].replace(/\\~/g, '~').trim()
    try {
      this.settings = JSON.parse(match[2])
    } catch (err) {
      try {
        this.settings = JSON.parse(atob(match[2]))
      } catch (error) {
        this.settings = {}
      }
    }
  }

  toString() {
    return this.shortcode
  }

  encodeSettings() {
    const widget = new Widget(WidgetRegistry.get(this.name))
    this.shortcode = widget.toBlock(this.settings, this.name, true)
    return this
  }

  decodeSettings() {
    const widget = new Widget(WidgetRegistry.get(this.name))
    this.shortcode = widget.toBlock(this.settings, this.name)
    return this
  }

  render() {
    const widget = new Widget(WidgetRegistry.get(this.name))
    const settings = this.settings
    return widget.toPreview(settings)
  }
}
