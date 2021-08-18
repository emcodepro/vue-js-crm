<template>
  <ul class="sidenav app-sidenav" :class="{open: sideBarIsOpen}">
    <router-link
        v-for="link in links"
        tag="li"
        active-class="active"
        :key="link.url"
        :to="link.to"
        :exact="link.exact">
      <a href="#" class="waves-effect waves-orange pointer">{{ link.title }}</a>
    </router-link>
  </ul>
</template>

<script>
export default {
  name: "SideBar",
  props: ['sideBarIsOpen'],
  data() {
    return {
      links: [
        {title: this.$t('bill'), to: '/', exact: true},
        {title: this.$t('history'), to: '/history'},
        {title: this.$t('planning'), to: '/planning'},
        {title: this.$t('newRecord'), to: '/record'},
        {title: this.$t('categories'), to: '/categories'}
      ]
    }
  }
}
</script>

<style scoped>

</style>