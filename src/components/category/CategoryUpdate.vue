<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{ $t('edit') }}</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field" >
          <select ref="select-category" v-model="current">
            <option
              v-for="category  of categories"
              :key="category.id"
              :value="category.id">{{ category.title }}</option>
          </select>
          <label>{{ $t('selectCategory') }}</label>
        </div>

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
          {{ $t('update') }}
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import M from 'materialize-css'
import {required, minValue, numeric} from 'vuelidate/lib/validators'

export default {
  name: "CategoryUpdate",
  props: {
    categories: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    title: '',
    limit: 100,
    select: null,
    current: null
  }),
  methods: {
    async submitHandler() {
      if(this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      const formData = {
        id: this.current,
        title: this.title,
        limit: this.limit
      }
      await this.$store.dispatch('updateCategory', formData)
      this.$emit('updated', formData)
      this.$message(this.$t('updatedCategory'))
    }
  },
  mounted() {
    this.select = M.FormSelect.init(this.$refs["select-category"])
    M.updateTextFields()
  },
  watch: {
    current(catId) {
      const category = this.categories.find(c => c.id === catId)
      this.title = category.title
      this.limit = category.limit
    }
  },
  created() {
    const category = this.categories[0]
    this.current = category.id
    this.title = category.title
    this.limit = category.limit
  },
  validations: {
    title: {required},
    limit: {numeric, minValue: minValue(100)}
  },
  beforeDestroy() {
    if(this.select && this.select.destroy) {
      this.select.destroy()
    }
  }
}
</script>

<style scoped>

</style>