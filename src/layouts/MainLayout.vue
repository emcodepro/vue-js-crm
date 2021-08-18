<template>
  <div>
    <Loader
        v-if="loading"/>

    <div class="app-main-layout" v-else>

      <nav-bar @open-close="isOpen = !isOpen" />

      <side-bar
          :sideBarIsOpen="isOpen"
          :key="locale"/>

      <main class="app-content" :class="{full: !isOpen}">
        <div class="app-page">
            <router-view />
        </div>
      </main>

      <div class="fixed-action-btn">
        <router-link class="btn-floating btn-large blue" to="/record">
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "../components/app/NavBar"
import SideBar from "../components/app/SideBar"
import Loader from "../components/app/Loader";

export default {
  name: "main-layout",
  data: () => ({
    isOpen: true,
    loading: true
  }),
  computed: {
    locale() {
      return this.$store.getters.userData.locale
    }
  },
  components: {
    Loader,
    NavBar,
    SideBar
  },
  async mounted() {
    if(!Object.keys(this.$store.getters.userData).length) {
      await this.$store.dispatch('getUserData')
    }

    this.loading = false
  }
}
</script>

<style scoped>

</style>