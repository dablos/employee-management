import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const mock = new MockAdapter(axios);

let employees = [
  {
    id: 1,
    name: "John Doe",
    department: "Engineering",
    age: 30,
    salary: 70000,
    location: "New York",
    gender: "Male",
  },
  {
    id: 2,
    name: "Jane Smith",
    department: "Marketing",
    age: 25,
    salary: 50000,
    location: "Los Angeles",
    gender: "Female",
  },
];

mock.onGet("/employees").reply(200, employees);

mock.onPost("/employees").reply((config) => {
  const newEmployee = JSON.parse(config.data);
  newEmployee.id = employees.length + 1;
  employees.push(newEmployee);
  return [201, newEmployee];
});

mock.onPut(/\/employees\/\d+/).reply((config) => {
  const id = parseInt(config.url.split("/").pop());
  const updatedData = JSON.parse(config.data);
  const employeeIndex = employees.findIndex((emp) => emp.id === id);

  if (employeeIndex >= 0) {
    employees[employeeIndex] = { ...employees[employeeIndex], ...updatedData };
    return [200, employees[employeeIndex]];
  }

  return [404];
});

mock.onDelete(/\/employees\/\d+/).reply((config) => {
  const id = parseInt(config.url.split("/").pop());
  const employeeIndex = employees.findIndex((emp) => emp.id === id);

  if (employeeIndex >= 0) {
    employees.splice(employeeIndex, 1);
    return [204];
  }

  return [404];
});

export default axios;
