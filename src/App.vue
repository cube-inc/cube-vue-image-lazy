<template>
  <div id="app" class="scroll-snap">
    <section class="section header scroll-snap-center">
      <h1>
        {{ name }}
        <small>v{{ version }}</small>
      </h1>
      <p class="lead">{{ description }}</p>
      <p v-if="loaded" class="instruction">The image is loaded! 👍</p>
      <p v-else-if="loading" class="instruction">The image is currently loading…</p>
      <p v-else class="instruction">
        Scroll down until the image appears…
        <br />⬇︎
      </p>
    </section>
    <section class="section section-event scroll-snap-center">
      <h2>Event demo</h2>
      <p v-if="loaded">The image is loaded! 👍</p>
      <p v-else-if="loading">The image is currently loading…</p>
      <p v-else>The image loading is currently deferred.</p>
      <ImageLazy src="/images/animated-logos.gif" class="logo" @loading="loading = true" @load="loaded = true" />
    </section>
    <section class="section section-photos scroll-snap-center">
      <h2>Photos demo</h2>
      <p>Photos are loaded with an incremental short delay.</p>
      <div class="photos">
        <ImageLazy v-for="(photo, index) in photos" :key="index" :src="photo" :delay="index * 100" class="photo" />
      </div>
    </section>
  </div>
</template>

<script>
import ImageLazy from '@/components/ImageLazy.vue'

export default {
  name: 'app',
  components: {
    ImageLazy
  },
  data() {
    const { name, version, description } = this.$root.$options.packageInfo
    return {
      name,
      version,
      description,
      loading: false,
      loaded: false,
      photos: []
    }
  },
  created() {
    for (let i = 0; i < 25; i++) {
      this.photos.push(`https://source.unsplash.com/random/200x200`)
    }
  }
}
</script>

<style>
:root {
  --brand-primary: #2c3e50;
  --bg-color: #2c3e5033;
  --bg-color-alt: #141c24;
}
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -ms-overflow-style: -ms-autohiding-scrollbar;
  font-family: 'Helvetica Neue', 'Ubuntu', 'Roboto', 'Noto', 'Segoe UI', 'Arial', sans-serif;
  color: var(--brand-primary);
}
*,
*::before,
*::after {
  box-sizing: border-box;
}
#app {
  text-align: center;
  height: 100vh;
  overflow: auto;
}
.scroll-snap {
  scroll-snap-type: y proximity;
}
.scroll-snap-center {
  scroll-snap-align: start;
}
.section {
  min-height: 100vh;
}
.header {
  padding: 60px 0;
}
.header h1 {
  font-size: 2em;
}
.header h1 small {
  display: block;
  font-size: 60%;
  font-weight: normal;
}
.lead {
  font-size: 120%;
}
.instruction {
  margin-top: 20vh;
}
.section-event {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--bg-color);
}
.logo {
  width: 100%;
  max-width: 600px;
}
.section-photos {
  color: white;
  background-color: var(--bg-color-alt);
  padding: 2em 0;
}
.photos {
  overflow: hidden;
  display: grid;
  grid-template-columns: repeat(auto-fill, 100px);
  grid-auto-rows: 100px;
  grid-gap: 2px;
  justify-content: center;
  align-items: center;
}
.photo {
  width: 100px;
  height: 100px;
  object-fit: cover;
}

.image-lazy {
  opacity: 0;
}
.image-lazy-loading.photo {
  transform: translateX(100vh);
}
.image-lazy-loading.logo {
  transform: rotate(360deg);
}
.image-lazy-loaded {
  transition: all 1s ease;
  opacity: 1;
}
</style>
