<template>
  <div class="q-pa-xs flex justify-center q-mt-xl">
    <q-input
      v-model="search"
      label="Search Employees"
      debounce="300"
      outlined
      dense
      class="bg-white rounded-borders"
      :style="{ minWidth: '350px', maxWidth: '500px' }"
      clearable
    >
      <template v-slot:append>
        <q-icon name="search" />
      </template>
    </q-input>
  </div>
</template>

<script setup>
import { ref, watch, defineEmits } from "vue";

const emit = defineEmits(["update:search"]);
const search = ref("");

watch(search, (newValue) => {
  emit("update:search", newValue);
});
</script>

<style scoped></style>
