import WidgetRegistry from '../packages/netlify-cms-shortcodes/WidgetRegistry'
import Widgets from '../packages/netlify-cms-shortcodes/Widgets'
import box from './shortcodes/box'
import button from './shortcodes/button'
import youtube from './shortcodes/youtube'
import about from '../content/pages/about.md'
import MarkdownIt from 'markdown-it'

WidgetRegistry.register(box)
WidgetRegistry.register(button)
WidgetRegistry.register(youtube)

if(document.getElementById('page')){
  const md = new MarkdownIt({})
  
  let html = md.render(Widgets.encodeAllInBlock(about.content))
  document.getElementById('page').innerHTML = Widgets.renderAllInBlock(html);
}else{
  window.CMS.registerPreviewStyle(
    'https://cdn.jsdelivr.net/npm/bulma@0.8.0/css/bulma.css'
  )
}



