<template>
  <div>
    <div class="page-title">
      <h3>{{ $t('historyRecords') }}</h3>
    </div>

    <div class="history-chart">
      <canvas ref="canvas"></canvas>
    </div>
    <Loader v-if="loading"/>

    <p
        class="center"
        v-else-if="!records.length"> {{ $t('noRecord') }} <router-link to="/record">{{ $t('create') }}</router-link>
    </p>

    <section v-else>
      <HistoryTable
          :records="currentItems"/>

      <Paginate
          v-model="currentPage"
          :page-count="pageCount"
          :click-handler="paginationHandler"
          :prev-text="$t('back')"
          :next-text="$t('forward')"
          :container-class="'pagination'"
          :page-class="'waves-effect'"/>
    </section>
  </div>
</template>

<script>
import HistoryTable from "../components/history/HistoryTable"
import Loader from "../components/app/Loader";
import paginationMixin from '../mixins/pagination.mixin';

export default {
  name: "History",
  metaInfo() {
    return {
      title: this.$title('history')
    }
  },
  mixins: [paginationMixin],
  data: () => ({
    loading: true,
    records: []
  }),
  async mounted() {
    const categories = await this.$store.dispatch('fetchCategories')
    this.records = await this.$store.dispatch('fetchRecords')

    this.setupPagination(this.records.map(record => ({
      ...record,
      categoryName: categories.filter(category => category.id === record.categoryId)[0].title,
      operationType: record.type === 'income' ? this.$t('income') : this.$t('outcome'),
      operationClass: record.type === 'income' ? 'green' : 'red'
    })))

    this.loading = false
  },
  components: {
    Loader,
    HistoryTable
  }
}
</script>

<style scoped>

</style>