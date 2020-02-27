export default {
  // Internal id of the component
  id: 'box',
  // Visible label
  label: 'Box',
  // Fields the user need to fill out when adding an instance of the component
  fields: [
    {
      name: 'content',
      label: 'Box Content',
      widget: 'markdown'
    }
  ],
  // Preview output for this component. Can either be a string or a React component
  // (component gives better render performance)
  toPreview(obj) {
    const string = obj.content || ''
    return `<div class="box"><div class="box-content">${string}</div></div>`
  }
}
