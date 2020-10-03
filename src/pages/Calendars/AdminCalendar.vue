<template>
  <v-container fluid>
    <div class="calendar-page">
      <v-row no-gutters class="d-flex justify-space-between mt-14 mb-6">
        <h1 class="page-title">Kalender</h1>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                v-bind="attrs"
                v-on="on"
                color="error"
                class="text-capitalize button-shadow"
            >Latest Reports</v-btn>
          </template>

        </v-menu>
      </v-row>
      <v-row>
        <template>
          <v-row class="fill-height">
            <v-col>
              <v-sheet height="64">
                <v-toolbar flat color="white">
                  <v-btn color="primary" class="mr-4" dark @click.stop="dialog = true">
                    Onderhoud inplannen
                  </v-btn>
                  <v-btn outlined class="mr-4" @click="setToday">
                    Vandaag
                  </v-btn>
                  <v-btn fab text small @click="prev">
                    <v-icon small>mdi-chevron-left</v-icon>
                  </v-btn>
                  <v-btn fab text small @click="next">
                    <v-icon small>mdi-chevron-right</v-icon>
                  </v-btn>
                  <v-toolbar-title>{{ title }}</v-toolbar-title>
                  <div class="flex-grow-1"></div>
                  <v-menu bottom right>
                    <template v-slot:activator="{ on }">
                      <v-btn outlined v-on="on">
                        <span>{{ typeToLabel[type] }}</span>
                        <v-icon right>mdi-menu-down</v-icon>
                      </v-btn>
                    </template>
                    <v-list>
                      <v-list-item @click="type = 'day'">
                        <v-list-item-title>Dag</v-list-item-title>
                      </v-list-item>
                      <v-list-item @click="type = 'week'">
                        <v-list-item-title>Week</v-list-item-title>
                      </v-list-item>
                      <v-list-item @click="type = 'month'">
                        <v-list-item-title>Maand</v-list-item-title>
                      </v-list-item>
                      <v-list-item @click="type = '4day'">
                        <v-list-item-title>4 Dagen</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </v-toolbar>
              </v-sheet>

              <v-dialog v-model="dialog" max-width="500">
                <v-card>
                  <v-card-title>
                    <span class="headline">Onderhoud inplannen</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row justify="center">
                        <v-col
                            cols="12"
                            sm="6"
                            md="8"
                        >
                          <v-autocomplete
                              v-model="company"
                              :items= Object.keys(clients)
                              label="Bedrijfsnaam"
                          ></v-autocomplete>
                        </v-col>
                      </v-row>
                      <v-row justify="center">
                        <v-date-picker v-model="serviceDate" elevation="4"></v-date-picker>
                      </v-row>
                      <v-row justify="center">
                        <v-col
                            cols="12"
                            sm="6"
                            md="8"
                        >
                          <v-autocomplete
                              v-model="tasks"
                              :items="['Compressor', 'Droger', 'Luchtfilter', 'Oliefilter']"
                              label="Taken"
                              multiple
                          ></v-autocomplete>
                        </v-col>
                      </v-row>
                      <v-row justify="center">
                          <v-color-picker
                              v-model="color"
                              hide-canvas
                          ></v-color-picker>
                      </v-row>
                      <v-row>
                          <v-btn type="submit" color="primary" class="ml-4" @click.stop="dialog = false" @click="addEvent">
                            Plan onderhoud
                          </v-btn>
                        <div class="flex-grow-1"></div>
                          <v-btn color="error" class="mr-4" @click.stop="dialog = false">
                            Annuleer
                          </v-btn>
                      </v-row>
                    </v-container>
                  </v-card-text>
                </v-card>
              </v-dialog>
              <v-sheet height="600">
                <v-calendar
                    ref="calendar"
                    v-model="focus"
                    color="primary"
                    :events="events"
                    :event-color="getEventColor"
                    :event-margin-bottom="3"
                    :now="today"
                    :type="type"
                    @click:event="showEvent"
                    @click:more="viewDay"
                    @click:date="setDialogDate"
                    @change="updateRange"
                ></v-calendar>
                <v-menu
                    v-model="selectedOpen"
                    :close-on-content-click="false"
                    :activator="selectedElement"
                    full-width
                    offset-x
                >
                  <v-card color="grey lighten-4" :width="350" flat>
                    <v-toolbar :color="selectedEvent.color" dark>
                      <v-btn @click="deleteEvent(selectedEvent.id)" icon>
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                      <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                      <div class="flex-grow-1"></div>
                    </v-toolbar>

                    <v-card-text>
                      <form v-if="currentlyEditing !== selectedEvent.id">
                        {{ selectedEvent.details }}
                      </form>
                      <form v-else>
                        <v-text-field
                            v-model="selectedEvent.details"
                            type="text"
                            style="width: 100%"
                            :min-height="100"
                            placeholder="add note">
                        </v-text-field>
                      </form>
                    </v-card-text>

                    <v-card-actions>
                      <v-btn text color="secondary" @click="selectedOpen = false">
                        close
                      </v-btn>
                      <v-btn v-if="currentlyEditing !== selectedEvent.id" text @click.prevent="editEvent(selectedEvent)">
                        edit
                      </v-btn>
                      <v-btn text v-else type="submit" @click.prevent="updateEvent(selectedEvent)">
                        Save
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-menu>
              </v-sheet>
            </v-col>
          </v-row>
        </template>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import db from '../firebaseInit'
export default {
  data: () => ({
    //add service date variables
    company: null,
    serviceDate:null,
    tasks: null,
    clients: {},
    today: new Date().toISOString().substr(0, 10),
    focus: new Date().toISOString().substr(0, 10),
    type: 'month',
    typeToLabel: {
      month: 'Maand',
      week: 'Week',
      day: 'Dag',
      '4day': '4 Dagen',
    },
    name: null,
    details: null,
    start: null,
    end: null,
    color: '#1976D2', // default event color
    currentlyEditing: null,
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    events: [],
    dialog: false,
    dialogDate: false
  }),
  mounted () {
    this.getEvents()
  },
  computed: {
    title () {
      const { start, end } = this
      if (!start || !end) {
        return ''
      }
      const startMonth = this.monthFormatter(start)
      const endMonth = this.monthFormatter(end)
      const suffixMonth = startMonth === endMonth ? '' : endMonth
      const startYear = start.year
      const endYear = end.year
      const suffixYear = startYear === endYear ? '' : endYear
      const startDay = start.day + this.nth(start.day)
      const endDay = end.day + this.nth(end.day)
      switch (this.type) {
        case 'month':
          return `${startMonth} ${startYear}`
        case 'week':
        case '4day':
          return `${startMonth} ${startDay} ${startYear} - ${suffixMonth} ${endDay} ${suffixYear}`
        case 'day':
          return `${startMonth} ${startDay} ${startYear}`
      }
      return ''
    },
    monthFormatter () {
      return this.$refs.calendar.getFormatter({
        timeZone: 'UTC', month: 'long',
      })
    }
  },
  methods: {
    async getEvents () {
      let snapshot = await db.collection('serviceDates').get()
      const events = []
      snapshot.forEach(doc => {
        let appData = doc.data()
        appData.id = doc.id
        events.push(appData)
        console.log("serviceDate", appData)
      })
      this.events = events
    },
    setDialogDate( { date }) {
      this.dialogDate = true
      this.focus = date
    },
    viewDay ({ date }) {
      this.focus = date
      this.type = 'day'
    },
    getEventColor (event) {
      return event.color
    },
    setToday () {
      this.focus = this.today
    },
    prev () {
      this.$refs.calendar.prev()
    },
    next () {
      this.$refs.calendar.next()
    },
    async addEvent () {
      if (this.company && this.serviceDate && this.tasks) {
        //add to general servicedates database.
        const userId =  this.clients[this.company].id
        await db.collection("serviceDates").add({
          company: this.company,
          uid: userId,
          tasks: this.tasks,
          start: this.serviceDate,
          end: this.serviceDate,
          color: this.color
        })
        //await db.collection("users").doc(userId).update({
          //serviceDates: firebase.firestore.FieldValue.arrayUnion(this.serviceDate)
        //});
        await this.getEvents()
        this.company = null
        this.tasks = null
        this.serviceDate = null
        this.color = '#1976D2'// default event color
      } else {
        alert('You must enter event name, start, and end time')
      }
    },
    editEvent (ev) {
      this.currentlyEditing = ev.id
    },
    async updateEvent (ev) {
      await db.collection('calEvent').doc(this.currentlyEditing).update({
        details: ev.details
      })
      this.selectedOpen = false
          this.currentlyEditing = null
    },
    async deleteEvent (ev) {
      await db.collection("calEvent").doc(ev).delete()
      this.selectedOpen = false
          await this.getEvents()
    },
    showEvent ({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event
        this.selectedElement = nativeEvent.target
        setTimeout(() => this.selectedOpen = true, 10)
      }
      if (this.selectedOpen) {
        this.selectedOpen = false
        setTimeout(open, 10)
      } else {
        open()
      }
      nativeEvent.stopPropagation()
    },
    updateRange ({ start, end }) {
      this.start = start
      this.end = end
    },
    nth (d) {
      return d > 3 && d < 21
          ? 'th'
          : ['th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'][d % 10]
    },
    loadClients() {
      this.$store.dispatch('loadClients', this.$store.state)
    },
    getClients() {
      return this.$store.getters.clientsByName
    }
  },
  created() {
    this.clients = this.getClients()
  },
  beforeMount() {
    this.loadClients()
  }
}
</script>

<style src="./Calendar.scss" lang="scss"/>