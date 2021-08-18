<template>
  <div>
    <div class="page-title">
      <h3>{{ $t('newRecord') }}</h3>
    </div>

    <Loader v-if="loading"/>

    <p class="center" v-else-if="!categories.length">{{ $t('noCategoriesFound') }} <router-link to="/categories">
      {{ $t('create') }}</router-link></p>

    <form class="form" @submit.prevent="submitHandler" v-else>
      <div class="input-field" >
        <select ref="select-category" v-model="category">
          <option
              v-for="category in categories"
              :key="category.id"
              :value="category.id">{{ category.title }}</option>
        </select>
        <label>{{ $t('selectCategory') }}</label>
      </div>

      <p>
        <label>
          <input
              class="with-gap"
              name="type"
              type="radio"
              value="income"
              v-model="type"
          />
          <span>{{ $t('income') }}</span>
        </label>
      </p>

      <p>
        <label>
          <input
              class="with-gap"
              name="type"
              type="radio"
              value="outcome"
              v-model="type"
          />
          <span>{{ $t('outcome') }}</span>
        </label>
      </p>

      <div class="input-field">
        <input
            id="amount"
            type="number"
            v-model.number="amount"
            :class="{invalid: $v.amount.$dirty && (!$v.amount.required || !$v.amount.minValue)}"
        >
        <label for="amount">{{ $t('amount') }}</label>
        <span
            class="helper-text invalid"
            v-if="$v.amount.$dirty && !$v.amount.required">{{ $t('ruleAmountRequired') }}</span>
        <span
            class="helper-text invalid"
            v-if="$v.amount.$dirty && !$v.amount.minValue">{{ $t('ruleMinAmount') }}</span>
      </div>

      <div class="input-field">
        <input
            id="description"
            type="text"
            v-model="description"
            :class="{invalid: $v.description.$dirty && !$v.description.required}"
        >
        <label for="description">{{ $t('description') }}</label>
        <span
            class="helper-text invalid"
            v-if="$v.description.$dirty && !$v.description.required">{{ $t('ruleDescriptionRequired') }}</span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{ $t('create') }}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import Loader from "../components/app/Loader"
import {required, minValue} from 'vuelidate/lib/validators'
import M from "materialize-css"
import {mapGetters} from 'vuex'

export default {
  name: "Record",
  components: {Loader},
  data: () => ({
    categories: [],
    category: null,
    loading: true,
    type: 'outcome',
    amount: 1,
    description: ''
  }),
  computed: {
    ...mapGetters(['userData']),
    canCreateRecord() {
      if(this.type === 'income') {
        return true
      }

      return this.userData.bill >= this.amount
    }
  },
  methods: {
    async submitHandler() {
      if(this.$v.$invalid) {
        this.$v.$touch()
        return false
      }

      if(this.canCreateRecord) {
        const record = {
          categoryId: this.category,
          amount: this.amount,
          description: this.description,
          type: this.type,
          created_at: new Date().toJSON()
        }

        const bill = this.type === 'income'
            ? this.userData.bill + this.amount
            : this.userData.bill - this.amount

        await this.$store.dispatch('createRecord', record)
        await this.$store.dispatch('updateUserData', {bill})
        this.$v.$reset()

        this.amount = 1
        this.description = ''
        this.type = 'outcome'

        this.$message('Запись создано')
      } else {
        this.$message(this.$t('noMoney') + ` (${this.amount - this.userData.bill})`)
      }
    }
  },
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories')

    if(this.categories.length) {
      this.category = this.categories[0].id
    }

    this.loading = false

    setTimeout(() => {
      this.select = M.FormSelect.init(this.$refs["select-category"])
      M.updateTextFields()
    }, 0)
  },
  validations: {
    description: {required},
    amount: {
      required,
      minValue: minValue(1)
    }
  }
}
</script>

<style scoped>

</style>