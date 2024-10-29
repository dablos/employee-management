<template>
  <q-layout>
    <q-page-container>
      <q-page>
        <div>
          <div v-if="pageLoading">
            <q-spinner-cube :size="'xl'" color="page-loading" />
          </div>

          <div v-else>
            <SearchInput v-model:search="search" />

            <div class="q-pa-lg" style="max-width: 1200px; margin: auto">
              <EmployeeList
                :employees="filteredEmployees"
                :loading="loading"
                @openAddModal="openAddModal"
                @openEditModal="openEditModal"
                @confirmDelete="confirmDelete"
              />
            </div>
          </div>

          <EmployeeForm
            v-if="isEdit || isAdd"
            :isEdit="isEdit"
            :isAdd="isAdd"
            :rowData="selectedRow"
            @update:isEdit="isEdit = $event"
            @update:isAdd="isAdd = $event"
            @submitData="saveEmployee"
          />

          <DeleteEmployeeItem
            v-if="isDelete"
            :rowData="selectedRow"
            :isDelete="isDelete"
            @update:isDelete="isDelete = $event"
            @confirmDelete="deleteEmployee"
          />
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import EmployeeList from "@/components/EmployeeList.vue";
import DeleteEmployeeItem from "@/components/DeleteEmployeeItem.vue";
import EmployeeForm from "@/components/EmployeeForm.vue";
import SearchInput from "@/components/SearchInput.vue";
import { Notify } from "quasar";

const store = useStore();
const pageLoading = ref(true);
const loading = ref(false);
const isDelete = ref(false);
const isEdit = ref(false);
const isAdd = ref(false);
const selectedRow = ref(null);
const search = ref("");

onMounted(async () => {
  try {
    loading.value = true;
    await store.dispatch("employees/fetchEmployees");
  } catch (error) {
    Notify.create({
      type: "negative",
      message: "Error loading employees: " + error.message,
    });
  } finally {
    loading.value = false;
    pageLoading.value = false;
  }
});

const employees = computed(() => store.getters["employees/employees"]);

const filteredEmployees = computed(() => {
  if (!search.value) return employees.value;
  return employees.value.filter((employee) => {
    return (
      employee.name.toLowerCase().includes(search.value.toLowerCase()) ||
      employee.department.toLowerCase().includes(search.value.toLowerCase()) ||
      String(employee.age).includes(search.value) ||
      String(employee.salary).includes(search.value) ||
      employee.location.toLowerCase().includes(search.value.toLowerCase()) ||
      employee.gender.toLowerCase().includes(search.value.toLowerCase())
    );
  });
});

const openAddModal = () => {
  selectedRow.value = {
    id: "",
    name: "",
    department: "",
    age: null,
    salary: null,
    location: "",
    gender: "",
  };
  isAdd.value = true;
  isEdit.value = false;
};

const openEditModal = (row) => {
  selectedRow.value = { ...row };
  isEdit.value = true;
  isAdd.value = false;
};

const saveEmployee = async (data) => {
  loading.value = true;
  try {
    if (data.id) {
      await store.dispatch("employees/editEmployee", data);
      Notify.create({
        type: "positive",
        message: "Employee updated successfully!",
      });
    } else {
      await store.dispatch("employees/addEmployee", data);
      Notify.create({
        type: "positive",
        message: "Employee added successfully!",
      });
    }
  } catch (error) {
    Notify.create({
      type: "negative",
      message: "Error saving employee: " + error.message,
    });
  } finally {
    loading.value = false;
    isEdit.value = false;
    isAdd.value = false;
  }
};

const confirmDelete = (employeeId) => {
  selectedRow.value = store.getters["employees/employeeById"](employeeId);
  isDelete.value = true;
};

const deleteEmployee = async () => {
  loading.value = true;
  try {
    await store.dispatch("employees/deleteEmployee", selectedRow.value.id);
    Notify.create({
      type: "positive",
      message: "Employee deleted successfully!",
    });
  } catch (error) {
    Notify.create({
      type: "negative",
      message: "Error deleting employee: " + error.message,
    });
  } finally {
    loading.value = false;
    isDelete.value = false;
  }
};
</script>

<style scoped>
.full-height {
  height: 100vh;
}
</style>
