<template>
  <q-dialog v-model="dialogVisible">
    <q-card style="width: 400px; max-width: 80vw">
      <q-card-section>
        <div class="text-h6 text-center">Delete Employee</div>
      </q-card-section>

      <q-card-section class="q-gutter-sm">
        <q-input v-model="rowData.name" label="Name" readonly />
        <q-input v-model="rowData.department" label="Department" readonly />
        <q-input v-model="rowData.age" label="Age" readonly />
        <q-input v-model="rowData.salary" label="Salary" readonly />
        <q-input v-model="rowData.location" label="Location" readonly />
        <q-input v-model="rowData.gender" label="Gender" readonly />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Close" color="primary" @click="closeDialog" />
        <q-btn flat label="Delete" color="negative" @click="confirmDelete" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  isDelete: Boolean,
  rowData: {
    type: Object,
    required: true,
    default: () => ({
      id: "",
      name: "",
      department: "",
      age: null,
      salary: null,
      location: "",
      gender: "",
    }),
  },
});

const emit = defineEmits(["update:isDelete", "confirmDelete"]);

const dialogVisible = computed({
  get: () => props.isDelete,
  set: (value) => {
    emit("update:isDelete", value);
  },
});

function closeDialog() {
  dialogVisible.value = false;
}

function confirmDelete() {
  emit("confirmDelete", props.rowData.id);
  closeDialog();
}
</script>

<style scoped></style>
