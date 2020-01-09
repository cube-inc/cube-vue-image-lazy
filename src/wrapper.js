import component from './components/ImageLazy.vue'

function install (Vue, options = {}) {
  applyOptions(options)
  registerComponent(Vue, options)
}

function applyOptions (options) {
  const componentPropNames = Object.keys(component.props)
  Object.entries(options)
    .forEach(([key, value]) => {
      // Apply default prop values
      if (componentPropNames.includes(key)) {
        component.props[key].default = value
      }
    })
}

function registerComponent (Vue, options) {
  const { name = component.name } = options
  Vue.component(name, component)
}

component.install = install

export default component
