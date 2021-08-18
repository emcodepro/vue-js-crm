<template>
  <section>
    <div>
      <p>
        <strong>{{ category.title }}:</strong>
        {{ category.spend }} {{ $t('from') }} {{ category.limit }}
      </p>
      <div class="progress" v-tooltip="category.tooltip">
        <div
            class="determinate"
            :class="[category.progressColor]"
            :style="{width: category.progressPercent + '%'}"
        ></div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "CategoryItem",
  props: ['category'],
  async mounted() {

  },
  methods: {
  }
}
</script>

<style scoped>

</style>