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
body {
  background-image: url("../assets/logo.png");
  background-repeat: no-repeat;
  background-size:100% auto;
}

@media (max-width: 600px) {
  body {
    background-image: url("../assets/logo-mobile.png");
  }
}
</style>
