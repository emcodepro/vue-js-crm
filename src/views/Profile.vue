<template>
  <div>
    <div class="page-title">
      <h3>{{ $t('profile') }}</h3>
    </div>

    <form class="form" @submit.prevent="update">
      <div class="input-field">
        <input
            type="text"
            id="description"
            :class="{'invalid': $v.name.$dirty && !$v.name.required}"
            v-model="name">
        <label for="description">{{ $t('name') }}</label>
        <span
            class="helper-text invalid"
            v-if="$v.name.$dirty && !$v.name.required">{{ $t('nameRequired') }}</span>
      </div>
      <div class="switch">
        <label>
          EN
          <input
              type="checkbox"
              v-model="isRuLocale">
          <span class="lever"></span>
          RU
        </label>
      </div>
      <button class="btn waves-effect waves-light" type="submit">
        {{ $t('update') }}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import M from 'materialize-css'
import {required} from 'vuelidate/lib/validators'

export default {
  name: "Profile",
  data: () => ({
    name: '',
    isRuLocale: true
  }),
  methods: {
    async update() {
      if(this.$v.$invalid) {
        this.$v.$touch()
        return false
      }

      await this.$store.dispatch('updateUserData', {
        name: this.name,
        locale: this.isRuLocale === true ? 'ru-RU' : 'en-US'
      })
      this.$message('Settings changed!')
    }
  },
  mounted() {
    this.name = this.userData.name
    setTimeout(() => M.updateTextFields())

    this.isRuLocale = this.userData.locale === 'ru-RU'
  },
  computed: {
    ...mapGetters(['userData'])
  },
  validations: {
    name: {required}
  }
}
</script>

<style scoped>
.switch {
  margin-bottom: 10px;
}
</style>