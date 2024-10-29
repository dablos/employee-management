<template>
  <div>
    <EmployeeForm
      :isEdit="isEdit"
      :rowData="selectedEmployee"
      @update:isEdit="isEdit = $event"
      @submitData="editEmployee"
    />
  </div>
</template>

<script setup>
import EmployeeForm from "@/components/EmployeeForm.vue";
import { ref } from "vue";

const isEdit = ref(false);
const selectedEmployee = {
  id: 1,
  name: "John Doe",
  department: "IT",
  age: 30,
  salary: 5000,
  location: "New York",
  gender: "Male",
};

function editEmployee(employeeData) {
  console.log("Updated Employee Data:", employeeData);
}
</script>
