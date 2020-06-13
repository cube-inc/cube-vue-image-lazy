# cube-vue-image-lazy

A super simple image lazy loader for Vue.

## Install

```sh
yarn add cube-vue-image-lazy
```

_**Warning**: You'll need to install the [w3c Intersection Observer polyfill](https://github.com/w3c/IntersectionObserver/tree/master/polyfill) in case you're targeting a browser which doesn't support it._

## Usage

You can register the component globally so it's available in all your apps:

```javascript
import Vue from 'vue'
import ImageLazy from 'cube-vue-image-lazy'

Vue.use(ImageLazy)

// Or you can override defaults
Vue.use(ImageLazy, {
  name: 'ImageLazyLoad',
  delay: 500,
  baseClass: 'image-lazy-load',
  deferredClass: 'image-lazy-load-deferred',
  loadingClass: 'image-lazy-load-loading',
  loadedClass: 'image-lazy-load-loaded'
})
```

Or use it locally in any of your components:

```html
<template>
  <div id="App">
    <ImageLazy
      class="photo"
      src="https://source.unsplash.com/random/200x200"
      srcset="https://source.unsplash.com/random/400x400 2x"
      baseClass="image-lazy"
      deferredClass="image-lazy-deferred"
      loadingClass="image-lazy-loading"
      loadedClass="image-lazy-loaded"
      :delay="500"
      @loading="loading = true"
      @load="loaded = true"
    />
  </div>
</template>

<script>
  import ImageLazy from 'cube-vue-image-lazy'

  export default {
    components: {
      ImageLazy
    },
    data() {
      return {
        loading: false,
        loaded: false
      }
    }
  }
</script>

<style>
  .image-lazy {
    opacity: 0;
  }
  .image-lazy-loading {
    filter: blur(5px);
    transform: translateY(1rem);
  }
  .image-lazy-loaded {
    transition: opacity 2s ease, transform 1s ease, filter 1s ease;
    opacity: 1;
    transform: none;
    filter: none;
  }
</style>
```

## Props

| Name          | Required | Type    | Default               | Description                                                                    |
| ------------- | -------- | ------- | --------------------- | ------------------------------------------------------------------------------ |
| eager         | false    | Boolean | false                 | Do not wait the image appears in the viewport and loads the image immediately. |
| delay         | false    | Number  | 0                     | The delay in ms before showing up the image.                                   |
| baseClass     | false    | String  | 'image-lazy'          | The name of the class always added to the image.                               |
| deferredClass | false    | String  | 'image-lazy-deferred' | The name of the class added while the loading of the image is deferred.        |
| loadingClass  | false    | String  | 'image-lazy-loading'  | The name of the class added while the image is loading.                        |
| loadedClass   | false    | String  | 'image-lazy-loaded'   | The name of the class added when the image is loaded.                          |

## Events

| Name    | Description           |
| ------- | --------------------- |
| loading | The image is loading. |
| load    | The image is loaded.  |

## Development Setup

```sh
# Project setup
yarn install

# Compiles and hot-reloads for development – Run the demo
yarn serve

# Compiles and minifies for production
yarn build

# Builds the npm ready packages
yarn bundle

# Watches for file changes and builds the npm ready packages accordingly
yarn watch

# Lints and fixes files
yarn lint

# Run the unit tests
yarn test:unit
```
