<template>
  <q-header elevated class="bg-primary">
    <q-toolbar>
      <q-toolbar-title>
        <span class="text-h5 text-white">EM</span>
      </q-toolbar-title>

      <div class="nav-buttons">
        <q-btn flat label="Home" @click="$emit('navigate', 'home')" />
        <q-btn flat label="Employees" @click="$emit('navigate', 'employees')" />
        <q-btn
          flat
          label="Departments"
          @click="$emit('navigate', 'departments')"
        />
        <q-btn flat label="Reports" @click="$emit('navigate', 'reports')" />
        <q-btn flat label="Settings" @click="$emit('navigate', 'settings')" />
      </div>

      <q-space />

      <q-btn flat label="Logout" @click="$emit('logout')" />

      <q-btn
        flat
        icon="menu"
        @click="toggleDrawer"
        class="q-ml-md hamburger-btn"
      />
    </q-toolbar>
  </q-header>

  <q-drawer v-model="isDrawerOpen" side="left" overlay>
    <q-list>
      <q-item clickable @click="navigateAndClose('home')">
        <q-item-label>Home</q-item-label>
      </q-item>
      <q-item clickable @click="navigateAndClose('employees')">
        <q-item-label>Employees</q-item-label>
      </q-item>
      <q-item clickable @click="navigateAndClose('departments')">
        <q-item-label>Departments</q-item-label>
      </q-item>
      <q-item clickable @click="navigateAndClose('reports')">
        <q-item-label>Reports</q-item-label>
      </q-item>
      <q-item clickable @click="navigateAndClose('settings')">
        <q-item-label>Settings</q-item-label>
      </q-item>
      <q-item clickable @click="logoutAndClose">
        <q-item-label>Logout</q-item-label>
      </q-item>
    </q-list>
  </q-drawer>
</template>

<script setup>
import { ref } from "vue";

const isDrawerOpen = ref(false);

const toggleDrawer = () => {
  isDrawerOpen.value = !isDrawerOpen.value;
};

const closeDrawer = () => {
  isDrawerOpen.value = false;
};

const navigateAndClose = (route) => {
  $emit("navigate", route);
  closeDrawer();
};

const logoutAndClose = () => {
  $emit("logout");
  closeDrawer();
};
</script>

<style scoped>
.nav-buttons {
  display: flex;
  gap: 10px;
}

@media (min-width: 600px) {
  .nav-buttons {
    display: flex;
  }

  .hamburger-btn {
    display: none;
  }
}

@media (min-width: 600px) and (max-width: 1024px) {
  .nav-buttons {
    flex-wrap: wrap;
  }

  .q-btn {
    flex: 1;
  }
}

@media (max-width: 600px) {
  .nav-buttons {
    display: none;
  }

  .hamburger-btn {
    display: block;
  }
}
</style>
