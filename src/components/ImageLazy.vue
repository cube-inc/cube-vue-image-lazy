<template>
  <img ref="img" v-bind="$attrs" v-on="$listeners" :class="imageClasses" @load="onLoad" />
</template>

<script>
const State = {
  DEFERRED: 0,
  LOADING: 1,
  LOADED: 2
}

export default {
  name: 'ImageLazy',
  props: {
    src: { type: String, required: true },
    srcset: { type: String, default: '' },
    eager: { type: Boolean, default: false },
    delay: { type: Number, default: 0 },
    baseClass: { type: String, default: 'image-lazy' },
    deferredClass: { type: String, default: 'image-lazy-deferred' },
    loadingClass: { type: String, default: 'image-lazy-loading' },
    loadedClass: { type: String, default: 'image-lazy-loaded' }
  },
  data() {
    return {
      state: State.DEFERRED,
      delayExpired: false
    }
  },
  computed: {
    imageClasses() {
      const classes = [this.baseClass]
      switch (this.state) {
        case State.DEFERRED:
          classes.push(this.deferredClass)
          break
        case State.LOADING:
          classes.push(this.loadingClass)
          break
        case State.LOADED:
          classes.push(this.delayExpired ? this.loadedClass : this.loadingClass)
          break
      }
      return classes
    }
  },
  methods: {
    observe() {
      if ('IntersectionObserver' in window) {
        this.$observer = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              this.load()
              this.unobserve()
            }
          })
        })
        this.$observer.observe(this.$refs.img)
      } else {
        this.load()
      }
    },
    unobserve() {
      if (this.$observer) {
        this.$observer.unobserve(this.$refs.img)
      }
    },
    load() {
      window.requestAnimationFrame(() => {
        this.state = State.LOADING
        this.$emit('loading', this)
        setTimeout(() => (this.delayExpired = true), this.delay)
        Object.assign(this.$refs.img, { src: this.src, srcset: this.srcset })
      })
    },
    onLoad() {
      this.state = State.LOADED
      this.$emit('load', this)
    }
  },
  mounted() {
    this.eager ? this.load() : this.observe()
  },
  beforeDestroy() {
    this.unobserve()
  }
}
</script>
