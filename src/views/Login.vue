<template>
  <form class="card auth-card" @submit.prevent="onSubmit">
    <div class="card-content">
      <span class="card-title">{{ $t('homeBookKeeping') }}</span>
      <div class="input-field">
        <input
            id="email"
            type="text"
            class="validate"
            v-model.trim="email"
            :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}"
        >
        <label for="email">Email</label>
        <small
            class="helper-text invalid"
            v-if="$v.email.$dirty && !$v.email.required"
        >{{ $t('ruleEmailRequired') }}</small>
        <small
            class="helper-text invalid"
            v-else-if="$v.email.$dirty && !$v.email.email"
        >{{ $t('ruleIncorrectEmail') }}</small>
      </div>
      <div class="input-field">
        <input
            id="password"
            type="password"
            class="validate"
            v-model.trim="password"
            :class="{invalid: $v.password.$dirty && (!$v.password.required || !$v.password.minLength)}"
        >
        <label for="password">{{ $t('password') }}</label>
        <small
            class="helper-text invalid"
            v-if="$v.password.$dirty && !$v.password.required"
        >
          {{ $t('rulePasswordRequired') }}
        </small>
        <small
            class="helper-text invalid"
            v-else-if="$v.password.$dirty && !$v.password.minLength"
        >
          {{ $t('rulePasswordLength') }} {{ password.length }}
        </small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
        >
          {{ $t('login') }}
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        {{ $t('noAccount') }}
        <router-link to="/register">{{ $t('registration') }}</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import {email, required, minLength} from 'vuelidate/lib/validators'
import messages from "../utils/messages"
export default {
  name: "Login",
  data: () => ({
    email: '',
    password: ''
  }),
  validations: {
    email: {email, required},
    password: {required, minLength: minLength(6)}
  },
  mounted() {
    if(messages[this.$route.query.message]) {
      this.$message(messages[this.$route.query.message])
    }
  },
  methods: {
    async onSubmit() {
      if(this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      const formData = {
        email: this.email,
        password: this.password
      }
      
      try {
        await this.$store.dispatch('login', formData)
        await this.$router.push('/')
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style scoped>

</style>