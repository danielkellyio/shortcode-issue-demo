import btoa from 'btoa'
import Shortcode from './Shortcode'
import Widgets from './Widgets'

class Widget {
  constructor(defObject) {
    this.name = defObject.id
    this.widget = defObject
  }

  pattern(flags = 'gm') {
    return new RegExp('\\[~(' + this.name + ') (.*?) ~\\]', flags)
  }

  fromBlock(shortcode) {
    if (Array.isArray(shortcode)) {
      shortcode = shortcode[0]
    }
    if (shortcode) {
      const sc = new Shortcode(shortcode)
      return sc.settings
    }
    return {}
  }

  toBlock(settings, name, encoded = false) {
    settings = this.prepareSettings(settings)
    let settingsString = JSON.stringify(settings)
    if (encoded) {
      settingsString = btoa(settingsString)
    }
    settingsString = settingsString
      .replace(/~\]/g, '\\~]')
      .replace(/\[~/g, '[\\~')
    return `[~${name} ${settingsString} ~]`
  }

  toPreview(settings) {
    settings = this.prepareSettings(settings)
    settings = Widgets.renderAllInBlock(settings)
    return this.widget.toPreview(settings)
  }

  prepareSettings(obj) {
    if (
      !Object.keys(obj).length &&
      this.widget.fields &&
      Array.isArray(this.widget.fields)
    ) {
      obj = {}
      this.widget.fields.forEach((field) => {
        obj[field.name] = field.default || null
      })
      return obj
    }
    return obj
  }

  netlifyCmsSettings() {
    const widget = this
    return {
      ...this.widget,
      pattern: this.pattern(),
      // Function to extract data elements from the regexp match
      fromBlock: (shortcode) => {
        return this.fromBlock(shortcode)
      },
      // Function to create a text block from an instance of this component
      toBlock: (obj) => {
        return this.toBlock(obj, widget.name)
      },
      toPreview: (obj) => {
        obj = Widgets.renderAllInBlock(obj)
        return this.widget.toPreview(obj)
      }
    }
  }

  registerWithNetlifyCms() {
    console.log(this.netlifyCmsSettings())
    window.CMS.registerEditorComponent(this.netlifyCmsSettings())
  }
}
export default Widget
