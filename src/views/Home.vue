<template>
  <div>
    <div class="page-title">
      <h3>Счет</h3>

      <button class="btn waves-effect waves-light btn-small">
        <i class="material-icons" @click="refresh">refresh</i>
      </button>
    </div>
    <loader v-if="loading"/>
    <div v-else class="row">
      <home-bill
        :rates="currency.rates"
      />

      <home-currency
        :rates="currency.rates"
        :date="currency.date"/>
    </div>
  </div>
</template>

<script>
import HomeBill from "../components/home/HomeBill"
import HomeCurrency from "../components/home/HomeCurrency"
import Loader from "../components/app/Loader";
export default {
  name: 'Home',
  metaInfo() {
    return {
      title: this.$title('bill')
    }
  },
  data: () => ({
    loading: true,
    currency: null
  }),
  async mounted() {
    this.currency = await this.$store.dispatch('fetchCurrency')
    this.loading = false
  },
  methods: {
    async refresh() {
      this.loading = true
      this.currency = await this.$store.dispatch('fetchCurrency')
      this.loading = false
    }
  },
  components: {
    HomeBill,
    HomeCurrency,
    Loader
  }
}
</script>
