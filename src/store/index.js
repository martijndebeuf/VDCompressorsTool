import Vue from 'vue';
import Vuex from 'vuex';
import firebase from "firebase";
import routes from "@/Routes";
import db from "@/pages/firebaseInit";
import createPersistedState from 'vuex-persistedstate';
import Cookies from 'js-cookie';

Vue.use(Vuex);

export default new Vuex.Store({

  namespace: true,
  state: {
    drawer: true,
    user: {},
  },
  plugins: [createPersistedState({
    storage: {
      getItem: key => Cookies.get(key),
      setItem: (key, value) => Cookies.set(key, value, { expires: 3, secure: false }),
      removeItem: key => Cookies.remove(key)
    }
  })],
  mutations: {
    toggleDrawer(state) {
      state.drawer = !state.drawer;
    },
    SET_USER(state, userData){
      state.user = userData
      if (state.user.isAdmin)
        routes.push('/admin/dashboard');
      else
        routes.push('/client/dashboard');
    },
  },
  actions: {
    TOGGLE_DRAWER({ commit }) {
      commit('toggleDrawer');
    },
    loginUser({commit}, user) {
      firebase.auth().signInWithEmailAndPassword(user.email, user.password).then(cred => {
        window.localStorage.setItem('authenticated', 'true')
        return db.collection('users').doc(cred.user.uid).get().then((userRef)=> {
          commit('SET_USER', userRef.data());
        })
      })
    },
    registerUser({commit}, newUser) {
      firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password).then(user => {
            delete newUser.password
            return db.collection('users').doc(user.user.uid).set(newUser).then(() => {
              newUser.uid = user.user.uid
              commit('SET_USER', newUser)
            })
          },
          err => {
            alert(err.message)
      })
    }
  },
  getters: {
    DRAWER_STATE(state) {
      return state.drawer;
    },
    user: state => state.user,
    token: state => state.token
  }
});