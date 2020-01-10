<template>
  <img ref="img" v-bind="$attrs" v-on="$listeners" :class="imageClasses" @load="onLoad" />
</template>

<script>

const STATE_DEFERRED = 'deferred'
const STATE_LOADING = 'loading'
const STATE_LOADED = 'loaded'

export default {
  name: 'ImageLazy',
  props: {
    src: { type: String, required: true },
    srcset: { type: String, default: null },
    delay: { type: Number, default: 0 },
    baseClass: { type: String, default: 'image-lazy' },
    deferredClass: { type: String, default: 'image-lazy-deferred' },
    loadingClass: { type: String, default: 'image-lazy-loading' },
    loadedClass: { type: String, default: 'image-lazy-loaded' }
  },
  data () {
    return {
      state: STATE_DEFERRED
    }
  },
  computed: {
    imageClasses () {
      const classes = []
      if (this.baseClass) {
        classes.push(this.baseClass)
      }
      if (this.state === STATE_DEFERRED && this.deferredClass) {
        classes.push(this.deferredClass)
      }
      if (this.state === STATE_LOADING && this.loadingClass) {
        classes.push(this.loadingClass)
      }
      if (this.state === STATE_LOADED && this.loadedClass) {
        classes.push(this.loadedClass)
      }
      return classes
    }
  },
  methods: {
    observe () {
      if ('IntersectionObserver' in window) {
        this.$observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
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
    unobserve () {
      if (this.$observer) {
        this.$observer.unobserve(this.$refs.img)
      }
    },
    load () {
      this.$emit('loading')
      this.state = STATE_LOADING
      this.$nextTick(() => {
        const img = this.$refs.img
        setTimeout(() => {
          img.src = this.src
          if (this.srcset) {
            img.srcset = this.srcset
          }
        }, this.delay)
      })
    },
    onLoad () {
      this.state = STATE_LOADED
      this.$emit('load')
    }
  },
  mounted () {
    this.observe()
  },
  beforeDestroy () {
    this.unobserve()
  }
}
</script>
