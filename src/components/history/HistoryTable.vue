<template>
  <table>
    <thead>
    <tr>
      <th>#</th>
      <th>{{ $t('amount') }}</th>
      <th>{{ $t('date') }}</th>
      <th>{{ $t('category') }}</th>
      <th>{{ $t('type') }}</th>
      <th>{{ $t('open') }}</th>
    </tr>
    </thead>

    <tbody>
    <tr
        v-for="(record, idx) of records"
        :key="record.id">
      <td>{{ idx +1 }}</td>
      <td>{{ record.amount | currency }}</td>
      <td>{{ new Date(record.created_at) | date('datetime') }}</td>
      <td>{{ record.categoryName }}</td>
      <td>
        <span
            class="white-text badge"
            :class="[record.operationClass]">{{ record.operationType }}</span>
      </td>
      <td>
        <button class="btn-small btn" @click="$router.push(`/detail/${record.id}`)">
          <i class="material-icons">open_in_new</i>
        </button>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "HistoryTable",
  props: ['records']
}
</script>

<style scoped>

</style>