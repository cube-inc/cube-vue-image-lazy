import ImageLazy from './components/ImageLazy.vue'

function applyOptions(options) {
  const componentPropNames = Object.keys(ImageLazy.props)
  Object.entries(options).forEach(([key, value]) => {
    // Apply default prop values
    if (componentPropNames.includes(key)) {
      ImageLazy.props[key].default = value
    }
  })
}

function registerComponent(Vue, options) {
  const { name = ImageLazy.name } = options
  Vue.component(name, ImageLazy)
}

ImageLazy.install = (Vue, options = {}) => {
  applyOptions(options)
  registerComponent(Vue, options)
}

export default ImageLazy
