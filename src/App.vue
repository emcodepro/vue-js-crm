<template>
  <div id="app">
    <component :is="layout">
      <router-view/>
    </component>
  </div>
</template>

<script>
import MainLayout from "./layouts/MainLayout";
import EmptyLayout from "./layouts/EmptyLayout";

export default {
  computed: {
    layout() {
      return (this.$route.meta.layout || 'empty') + '-layout'
    }
  },
  components: {
    MainLayout, EmptyLayout
  },
}
</script>

<style lang="sass">
@import '~materialize-css/dist/css/materialize.min.css'
@import './assets/index.css'
</style>

