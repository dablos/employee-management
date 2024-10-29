<template>
  <div class="full-width">
    <q-table
      :rows="employees"
      :columns="columns"
      row-key="id"
      :loading="loading"
      :no-data-label="'Currently there is no match'"
      :no-results-label="'Currently there are no matches'"
      class="table-responsive"
      style="overflow-x: auto"
    >
      <template v-slot:top>
        <div class="full-width text-right items-end">
          <q-btn
            flat
            color="positive"
            class="q-ma-sm text-bold"
            @click="$emit('openAddModal')"
            label="Add"
            icon="add"
          />
        </div>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="id" :props="props" class="text-center">
            {{ props.row.id }}
          </q-td>
          <q-td key="name" :props="props" class="text-center">
            {{ props.row.name }}
          </q-td>
          <q-td key="department" :props="props" class="text-center">
            {{ props.row.department }}
          </q-td>
          <q-td key="age" :props="props" class="text-center">
            {{ props.row.age }}
          </q-td>
          <q-td key="salary" :props="props" class="text-center">
            {{ props.row.salary }}
          </q-td>
          <q-td key="location" :props="props" class="text-center">
            {{ props.row.location }}
          </q-td>
          <q-td key="gender" :props="props" class="text-center">
            {{ props.row.gender }}
          </q-td>
          <q-td key="actions" :props="props" class="text-center">
            <div>
              <q-icon
                name="edit"
                class="text-grey-8 cursor-pointer text-bold q-ma-xs"
                size="20px"
                @click="$emit('openEditModal', props.row)"
              />
              <q-icon
                name="delete"
                class="cursor-pointer text-bold text-negative q-ma-xs"
                size="20px"
                @click="$emit('confirmDelete', props.row.id)"
              />
            </div>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  employees: Array,
  loading: Boolean,
});

const columns = [
  { name: "id", label: "ID", align: "left", field: "id", sortable: true },
  {
    name: "name",
    align: "left",
    label: "Name",
    field: "name",
    sortable: true,
  },
  {
    name: "department",
    align: "left",
    label: "Department",
    field: "department",
    sortable: true,
  },
  { name: "age", align: "left", label: "Age", field: "age", sortable: true },
  {
    name: "salary",
    align: "left",
    label: "Salary",
    field: "salary",
    sortable: true,
  },
  {
    name: "location",
    align: "left",
    label: "Location",
    field: "location",
    sortable: true,
  },
  {
    name: "gender",
    align: "left",
    label: "Gender",
    field: "gender",
    sortable: true,
  },
  { name: "actions", align: "center", label: "Actions", field: "actions" },
];
</script>

<style scoped>
.table-responsive {
  width: 100%;
  overflow-x: auto;
}

@media (max-width: 600px) {
  .table-responsive {
    font-size: 14px;
  }
}
</style>
