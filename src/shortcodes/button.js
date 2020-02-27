export default {
  // Internal id of the component
  id: 'button',
  // Visible label
  label: 'Button',
  // Fields the user need to fill out when adding an instance of the component
  fields: [
    {
      name: 'label',
      label: 'Button Label',
      widget: 'string'
    },
    {
      name: 'link',
      label: 'Button Link',
      widget: 'string'
    },
    {
      name: 'classes',
      label: 'Button Classes',
      widget: 'string'
    }
  ],
  // Preview output for this component. Can either be a string or a React component
  // (component gives better render performance)
  toPreview(obj) {
    const label = obj.label || ''
    const link = obj.link || ''
    let classes = obj.classes || ''
    const classList = classes
    .split(' ')
    .map((cl) => {
      return cl.trim()
    })
    .filter((cl) => {
      return cl !== ''
    })
    if (!classList.includes('is-block')) {
      classList.push('is-inline')
    }
    classes = classList.join(' ')
    return `<a class='button ${classes}' href='${link}'>${label}</a>`
  }
}
