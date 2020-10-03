<template>
  <v-container fluid>
    <div class="tables-basic">
      <h1 class="page-title mt-10 mb-6">Klanten</h1>
      <v-row>
        <v-col cols="12">
          <v-card class="employee-list mb-1">
            <v-card-title class="pa-5 pb-3">
              <p>Klanten Lijst</p>
              <v-spacer></v-spacer>
              <v-text-field
                  v-model="mock.employeeTable.search"
                  append-icon="mdi-magnify"
                  label="Search"
                  clearable
                  single-line
                  hide-details
              ></v-text-field>
            </v-card-title>
            <v-data-table
                v-model="mock.employeeTable.selected"
                :headers="mock.employeeTable.headers"
                :items="mock.employeeTable.clients"
                :search="mock.employeeTable.search"
                item-key="company"
                show-select
            >
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import mock from './mock'

export default {
  name: 'Tables',
  data() {
    return {
      mock,
    }
  },
  methods: {
    getClients() {
      this.clients = this.$store.dispatch('loadClients', this.$store.state)
    }
  },
  beforeMount() {
    this.getClients()
  },
  created() {
    this.mock.employeeTable.clients = this.$store.state.clients
  }
}
</script>

<style src="./Basic.scss" lang="scss"></style>
