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
  data: () => ({
    links: [
      {title: 'Счет', to: '/', exact: true},
      {title: 'История', to: '/history'},
      {title: 'Планирование', to: '/planning'},
      {title: 'Новая запись', to: '/record'},
      {title: 'Категории', to: '/categories'}
    ]
  })
}
</script>

<style scoped>

</style>