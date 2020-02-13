<template>
  <div class="home">
    <ChecklistsList msg="Shared Checklists" />
  </div>
</template>

<script>
// @ is an alias to /src
import ChecklistsList from "@/components/ChecklistsList.vue";

export default {
  name: "home",
  components: {
    ChecklistsList
  }
};
</script>

<style lang="scss">
@import '../styles/quasar.variables.scss';
body {
  background-color: $secondary;
}
</style>
