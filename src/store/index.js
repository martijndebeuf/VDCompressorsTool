import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import Cookies from 'js-cookie';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';

Vue.use(Vuex);

export default new Vuex.Store({

  namespace: true,
  state: {
    drawer: true,
    user: {},
    clientsByName: {},
    clientsById: {},
    serviceDates: []
  },
  plugins: [createPersistedState({
    storage: {
      getItem: key => Cookies.get(key),
      setItem: (key, value) => Cookies.set(key, value, { expires: 3, secure: false }),
      removeItem: key => Cookies.remove(key)
    }
  })],
  mutations: mutations,
  actions: actions,
  getters: getters
});