<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{ $t('create') }}</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <input
              id="name"
              type="text"
              v-model="title"
              :class="{invalid: $v.title.$dirty && !$v.title.required}"
          >
          <label for="name">{{ $t('categoryName') }}</label>
          <span
              class="helper-text invalid"
              v-if="$v.title.$dirty && !$v.title.required"
          >
            {{ $t('ruleCategoryNameRequired') }}
          </span>
        </div>

        <div class="input-field">
          <input
              id="limit"
              type="number"
              v-model="limit"
              :class="{invalid: $v.limit.$dirty && !$v.limit.minValue}"
          >
          <label for="limit">{{ $t('limit') }}</label>
          <span
              class="helper-text invalid"
              v-if="$v.limit.$dirty && !$v.limit.minValue"
          >
            {{ $t('minLimit') }}
          </span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          {{ $t('create') }}
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import {required, minValue, numeric} from 'vuelidate/lib/validators'
import M from 'materialize-css'
export default {
  name: "CategoryCreate",
  data: () => ({
    title: '',
    limit: 100
  }),
  methods: {
    async submitHandler() {
      if(this.$v.$invalid) {
        this.$v.$touch()
        return false;
      }

      const category = await this.$store.dispatch('createCategory', {
        title: this.title,
        limit: this.limit
      })

      this.title = ''
      this.limit = 100
      this.$v.$reset()
      this.$message(this.$t('createdCategory'))
      this.$emit('created', category)
    }
  },
  mounted() {
    M.updateTextFields()
  },
  validations: {
    title: {required},
    limit: {numeric, minValue: minValue(100)}
  }
}
</script>

<style scoped>

</style>