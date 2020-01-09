<template>
  <img ref="img" v-bind="$attrs" v-on="$listeners" :class="imageClasses" @load="onLoad" />
</template>

<script>
export default {
  name: 'ImageLazy',
  props: {
    src: { type: String, required: true },
    srcset: { type: String, default: null },
    delay: { type: Number, default: 0 },
    baseClass: { type: String, default: 'image-lazy' },
    hiddenClass: { type: String, default: 'image-lazy-hidden' }
  },
  data () {
    return {
      loaded: false
    }
  },
  computed: {
    imageClasses () {
      const classes = []
      if (this.baseClass) {
        classes.push(this.baseClass)
      }
      if (!this.loaded) {
        classes.push(this.hiddenClass)
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
      const img = this.$refs.img
      setTimeout(() => {
        img.src = this.src
        if (this.srcset) {
          img.srcset = this.srcset
        }
      }, this.delay)
    },
    onLoad () {
      this.loaded = true
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
