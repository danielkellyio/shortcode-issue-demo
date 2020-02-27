import Widget from './Widget'
let widgets = {}
export default {
  register(settings){
    widgets[settings.id] = settings;
    if(window.CMS){
      (new Widget(settings)).registerWithNetlifyCms();
    }
  },
  get(name){
    return widgets[name]
  }
}
