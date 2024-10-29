<template>
  <div>
    <q-btn label="Add Employee" @click="openAddDialog" />
    <EmployeeForm
      v-if="isAdd"
      :isEdit="isAdd"
      :rowData="newEmployee"
      @update:isEdit="isAdd = $event"
      @submitData="addEmployee"
    />
  </div>
</template>

<script setup>
import EmployeeForm from "@/components/EmployeeForm.vue";
import { ref } from "vue";
import { v4 as uuidv4 } from "uuid";

const isAdd = ref(false);

const newEmployee = {
  id: "",
  name: "",
  department: "",
  age: null,
  salary: null,
  location: "",
  gender: "",
};

function openAddDialog() {
  isAdd.value = true;
  newEmployee.id = uuidv4();
  newEmployee.name = "";
  newEmployee.department = "";
  newEmployee.age = null;
  newEmployee.salary = null;
  newEmployee.location = "";
  newEmployee.gender = "";
}

function addEmployee(employeeData) {
  console.log("New Employee Data:", employeeData);
  isAdd.value = false;
}
</script>
