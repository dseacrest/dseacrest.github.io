<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/checklist.png" width="350px"/>
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
