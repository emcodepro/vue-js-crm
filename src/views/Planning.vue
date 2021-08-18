<template>
  <Loader v-if="loading"/>

  <p class="center" v-else-if="!categories.length">{{ $t('noCategoriesFound') }} <router-link to="/categories">{{ $t('create') }}</router-link></p>

  <div v-else>
    <div class="page-title">
      <h3>{{ $t('planning') }}</h3>
      <h4>{{ userData.bill | currency('RUB')}}</h4>
    </div>

    <CategoryItem
        v-for="category in categories"
        :key="category.id"
        :category="category"/>
  </div>
</template>

<script>
import CategoryItem from "../components/planning/CategoryItem"
import {mapGetters} from 'vuex'
import Loader from "../components/app/Loader";
import currencyFilter from "../filters/currency.filter";

export default {
  name: "Planning",
  data: () => ({
    loading: true,
    categories: []
  }),
  computed: {
    ...mapGetters(['userData'])
  },
  async mounted() {
    const categories = await this.$store.dispatch('fetchCategories')
    const records = await this.$store.dispatch('fetchRecords')

    this.categories = categories.map(cat => {
      const spend  = records
          .filter(r => r.categoryId === cat.id)
          .filter(r => r.type === 'outcome')
          .reduce((total, record) => total += record.amount, 0)

      const percent = 100 * spend / cat.limit
      const progressPercent  = percent > 100 ? 100 : percent
      const progressColor = progressPercent === 100 ? 'red' : percent > 60 ? 'yellow' : 'green'

      const tooltipValue = cat.limit - spend
      const tooltip = `${tooltipValue < 0 ? this.$t('moreThan') : this.$t('left')} ${currencyFilter(Math.abs(tooltipValue))}`
      return {
        ...cat,
        progressPercent,
        spend,
        progressColor,
        tooltip
      }
    })

    this.loading = false
  },
  components: {
    Loader,
    CategoryItem
  }
}
</script>

<style scoped>

</style>