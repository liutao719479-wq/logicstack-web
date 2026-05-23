<script setup>
defineProps({ direction: { type: Object, required: true } })
</script>

<template>
  <router-link class="direction glass-card" :to="direction.route">
    <div class="direction-top">
      <span class="index">{{ direction.index }}</span>
      <span class="arrow">&nearr;</span>
    </div>
    <h3>{{ direction.title }}</h3>
    <p>{{ direction.description }}</p>
    <div class="tags">
      <span v-for="tag in direction.tags" :key="tag">{{ tag }}</span>
    </div>
  </router-link>
</template>

<style scoped>
.direction {
  display: flex;
  flex-direction: column;
  min-height: 212px;
  padding: 26px 23px;
}

.direction-top {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
  color: var(--ls-text-muted);
  font-size: 12px;
  letter-spacing: 0.14em;
}

.arrow {
  color: var(--ls-text-muted);
  font-size: 17px;
}

h3 {
  margin-bottom: 13px;
  font-size: 19px;
  font-weight: 400;
}

p {
  flex: 1;
  margin-bottom: 18px;
  color: var(--ls-text-secondary);
  font-size: 14px;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
}

.tags span {
  color: rgba(141, 152, 155, 0.8);
  font-size: 12px;
}

.tags span:not(:last-child)::after {
  content: "/";
  margin-left: 7px;
}
</style>
