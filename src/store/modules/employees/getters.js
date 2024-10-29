export default {
  employees: (state) => state.employees,
  employeeById: (state) => (id) => {
    return state.employees.find((employee) => employee.id === id);
  },
};
