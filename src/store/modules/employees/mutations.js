const mutations = {
  SET_EMPLOYEES(state, employees) {
    state.employees = employees;
  },
  ADD_EMPLOYEE(state, employee) {
    state.employees.push(employee);
  },
  UPDATE_EMPLOYEE(state, updatedEmployee) {
    const index = state.employees.findIndex(
      (emp) => emp.id === updatedEmployee.id
    );
    if (index !== -1) {
      Object.assign(state.employees[index], updatedEmployee);
    }
  },
  REMOVE_EMPLOYEE(state, employeeId) {
    state.employees = state.employees.filter((emp) => emp.id !== employeeId);
  },
};

export default mutations;
