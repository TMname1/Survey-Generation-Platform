<script lang="ts" setup>
defineProps({
  data: { type: Array<{ id: string; name: string }>, required: true },
});
</script>

<template>
  <div class="grid grid-cols-2 gap-3">
    <el-button class="ml-0! w-full" v-for="item in data" :key="item.id">
      {{ item.name }}
    </el-button>
  </div>
</template>
