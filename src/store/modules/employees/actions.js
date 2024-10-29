import api from "../../../api";

const actions = {
  async fetchEmployees({ commit }) {
    try {
      const response = await api.get("/employees");
      commit("SET_EMPLOYEES", response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  },

  async addEmployee({ commit }, employeeData) {
    try {
      const response = await api.post("/employees", employeeData);
      commit("ADD_EMPLOYEE", response.data);
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  },

  async editEmployee({ commit }, employeeData) {
    try {
      const response = await api.put(
        `/employees/${employeeData.id}`,
        employeeData
      );
      commit("UPDATE_EMPLOYEE", response.data);
    } catch (error) {
      console.error("Error editing employee:", error);
    }
  },

  async deleteEmployee({ commit }, employeeId) {
    try {
      await api.delete(`/employees/${employeeId}`);
      commit("REMOVE_EMPLOYEE", employeeId);
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  },
};

export default actions;
