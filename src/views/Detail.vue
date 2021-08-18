<template>
  <div>
    <Loader v-if="loading"/>
    <div v-else-if="record">
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">{{ $t('history') }}</router-link>
        <a class="breadcrumb">
          {{ record.recordType }}
        </a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div
              class="card"
              :class="{
                  'green': record.type === 'income',
                  'red': record.type === 'outcome'
              }">
            <div class="card-content white-text">
              <p>{{ $t('description') }}: {{ record.description }}</p>
              <p>{{ $t('amount') }}: {{ record.amount | currency }}</p>
              <p>{{ $t('category') }}: {{ record.categoryName}}</p>

              <small>{{ new Date(record.created_at) | date('datetime') }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p class="center" v-else>Запись с id={{ recordId }} не найдено</p>
  </div>
</template>

<script>
import Loader from "../components/app/Loader";
export default {
  name: "Detail",
  components: {Loader},
  data: () => ({
    loading: true,
    record: null,
    recordId: null
  }),
  async mounted() {
    this.recordId = this.$route.params.id
    let record;
    let category;

    try {
      record = await this.$store.dispatch('fetchRecordById', this.recordId)
      category = await this.$store.dispatch('fetchCategoryById', record.categoryId)
    }catch (e) {
      console.log(e)
    }

    if(record && category) {
      this.record = {
        ...record,
        categoryName: category.title,
        recordType: record.type === 'income' ? this.$t('income') : this.$t('outcome')
      }
    }

    this.loading = false

  }
}
</script>

<style scoped>

</style>