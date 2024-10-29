<template>
  <q-layout view="hHh Lpr fFf">
    <Navbar @navigate="navigate" @logout="logout" />

    <q-page-container>
      <main class="full-height">
        <Main />
      </main>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import Navbar from "./components/Navbar.vue";
import Main from "./view/Main.vue";

const navigate = (route) => {
  console.log(route);
};

const logout = () => {};
</script>

<style scoped>
.full-height {
  height: calc(100vh - 50px);
}
</style>
