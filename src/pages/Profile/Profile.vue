<template>
  <v-container fluid>
    <div class="profile">
      <h1 class="page-title mt-10 mb-6">Profiel</h1>
      <v-card
          class="mx-auto my-12"
          elevation="7"
      >
        <template slot="progress">
          <v-progress-linear
              color="deep-purple"
              height="10"
              indeterminate
          ></v-progress-linear>
        </template>
        <v-card-title>Uw persoonlijke data:</v-card-title>
        <v-card-text>
          Bedrijfsnaam: {{userData.company}}
        </v-card-text>
        <v-divider class="mx-4"></v-divider>
        <v-card-text>
          Email: {{userData.email}}
        </v-card-text>
      </v-card>
    </div>
  </v-container></template>

<script>

export default {
  name: 'Profile',
  data() {
    return {
      userData: {},
    }
  },
  created() {
    this.userData = this.$store.getters.user
  }
}
</script>

<style scoped>

</style>