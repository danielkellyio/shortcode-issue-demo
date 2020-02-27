export default {
  // Internal id of the component
  id: 'youtube',
  // Visible label
  label: 'Youtube',
  // Fields the user need to fill out when adding an instance of the component
  fields: [{ name: 'url', label: 'Youtube Video URL', widget: 'string' }],
  // Preview output for this component. Can either be a string or a React component
  // (component gives better render performance)
  toPreview(obj) {
    if (!obj || !obj.url) return ''
    const [url, id] = obj.url.match(/youtube.com\/watch\?v=(.*)/)
    return `<div class="embed-container"><iframe data-orig-src="${url}" loading="lazy" src="https://www.youtube.com/embed/${id}" frameborder="0" allowfullscreen></iframe></div>`
  }
}
