<template>
  <v-app-bar
      height="64"
      fixed
      color='primary'
      dark
    >
    <v-btn icon class="mx-1" @click.stop="TOGGLE_DRAWER">
        <template v-if="DRAWER_STATE">
            <v-icon  style="font-size: 28px">mdi-arrow-left</v-icon>
        </template>
        <template v-else>
            <v-icon style="font-size: 28px">mdi-menu</v-icon>
        </template>
    </v-btn>
    <v-toolbar-title>VD Compressors</v-toolbar-title>
    <v-spacer></v-spacer>

    <Search />
    <v-menu
        max-width="280"
        offset-y
        bottom
        nudge-bottom="10"
        left
    >
    </v-menu>
    <v-menu
        min-width="180"
        offset-y
        bottom
        left
        nudge-bottom="10"
    >
        <template v-slot:activator="{ on, attrs }">
            <v-btn
                icon
                v-bind="attrs"
                v-on="on"
                >
                <v-icon
                    style="font-size: 28px"
                    :color="config.light.iconColor"
                >mdi-account</v-icon>
            </v-btn>
        </template>
        <v-list >
            <div class="text-h5 grey--text text--darken-3 px-4 pt-4">{{company}}</div>
          <!-- <div class="subtitle-2 primary--text font-weight-regular px-4"></div> maybe put link to company website here-->
            <v-list-item-group color="primary">
                <v-list-item
                    v-for="(item, i) in account"
                    :key="i"
                    :to="item.link === '#' ? '' : item.link"
                    link
                >
                    <v-list-item-icon class="mr-4">
                        <v-icon
                            :color="item.color"
                            v-text="item.icon"
                        ></v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title :color='config.light.textColor' v-text="item.text"></v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
            <div class="d-flex justify-center my-3">
                <v-btn
                    width="80%"
                    large
                    outlined
                    color="primary"
                    class="text-capitalize"
                    @click="logOut"
                >Sign Out</v-btn>
            </div>
        </v-list>
    </v-menu>

  </v-app-bar>
</template>

<script>
import {mapActions, mapState} from 'vuex'
  import config from '../../config';
  import Search from "@/components/Search/Search";
  import index from "@/store";

  export default {
    name: 'Header',
    components: { Search },
    data: () => ({
      config,
      company: index.state.user.company,
      searchCollapse: true,
      notifications: [
        { text: 'Check out this awesome ticket', icon: 'mdi-tag', color: 'warning' },
        { text: 'What is the best way to get ...', icon: 'mdi-thumb-up', color: 'success'  },
        { text: 'This is just a simple notification', icon: 'mdi-flag', color: 'error'  },
        { text: '12 new orders has arrived today', icon: 'mdi-cart', color: 'primary'  },
      ],
      messages: [
        { text: 'JH', name: 'Jane Hew', message: 'Hey! How is it going?', time: '09:32', color: 'warning' },
        { text: 'LB', name: 'Lloyd Brown', message: 'Check out my new Dashboard', time: '10:02', color: 'success'  },
        { text: 'MW', name: 'Mark Winstein', message: 'I want rearrange the appointment', time: '12:16', color: 'error'  },
        { text: 'LD', name: 'Liana Dutti', message: 'Good news from sale department', time: '14:56', color: 'primary'  },
      ],
      account: [
        { text: 'Profiel', icon: 'mdi-account', color: 'textColor', link: "/client/profile"},
        { text: 'Taken', icon: 'mdi-thumb-up', color: 'textColor'  },
        { text: 'Berichten', icon: 'mdi-flag', color: 'textColor'  }
      ],
      notificationsBadge: true,
      messageBadge: true
    }),
    computed: {
      ...mapState(['drawer']),
      DRAWER_STATE :{
        get() {
          return this.drawer
        },
      }
    },
    methods: {
      ...mapActions([ 'TOGGLE_DRAWER' ]),
      logOut: function () {
        window.localStorage.setItem('authenticated', false);
        this.$router.push('/login');
      }
    }
  };
</script>

<style src="./Header.scss" lang="scss"></style>
