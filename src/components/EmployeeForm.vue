<template>
  <q-dialog v-model="dialogVisible" persistent>
    <q-card style="width: 450px; max-width: 80vw">
      <q-card-section>
        <div class="text-h6 text-center">
          {{ isEdit ? "Edit Employee Details" : "Add Employee" }}
        </div>
      </q-card-section>

      <q-card-section class="q-gutter-sm">
        <q-input
          v-model="formData.name"
          label="Name"
          outlined
          dense
          :rules="[
            (val) => val.length >= 3 || 'Please use minimum 3 characters',
          ]"
        />
        <q-input
          v-model="formData.department"
          label="Department"
          outlined
          dense
          :rules="[
            (val) => val.length >= 3 || 'Please use minimum 3 characters',
          ]"
        />
        <q-input
          v-model="formData.age"
          label="Age"
          type="number"
          outlined
          dense
          :rules="[(val) => val >= 18 || 'Age must be at least 18']"
        />
        <q-input
          v-model="formData.salary"
          label="Salary"
          type="number"
          outlined
          dense
          :rules="[(val) => (val && val > 0) || 'Please enter a valid salary']"
        />
        <q-input
          v-model="formData.location"
          label="Location"
          outlined
          dense
          :rules="[
            (val) => val.length >= 3 || 'Please use minimum 3 characters',
          ]"
        />
        <q-input
          v-model="formData.gender"
          label="Gender"
          outlined
          dense
          :rules="[
            (val) => val.length >= 3 || 'Please use minimum 3 characters',
          ]"
        />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" @click="closeDialog" />
        <q-btn
          flat
          label="Save"
          color="negative"
          :disabled="!isFormValid"
          @click="submitForm"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { computed, reactive, watch } from "vue";

const props = defineProps({
  isEdit: Boolean,
  isAdd: Boolean,
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

const emit = defineEmits(["update:isEdit", "update:isAdd", "submitData"]);

const dialogVisible = computed({
  get: () => props.isEdit || props.isAdd,
  set: (value) => {
    emit("update:isEdit", false);
    emit("update:isAdd", false);
  },
});

const formData = reactive({ ...props.rowData });

watch(
  () => props.rowData,
  (newRowData) => {
    Object.assign(formData, newRowData);
  },
  { immediate: true }
);

const isFormValid = computed(() => {
  return (
    formData.name.length >= 3 &&
    formData.department.length >= 3 &&
    formData.age >= 18 &&
    formData.salary > 0 &&
    formData.location.length >= 3 &&
    formData.gender.length >= 3
  );
});

function closeDialog() {
  emit("update:isEdit", false);
  emit("update:isAdd", false);
}

function submitForm() {
  emit("submitData", { ...formData });
  closeDialog();
}
</script>

<style scoped></style>
