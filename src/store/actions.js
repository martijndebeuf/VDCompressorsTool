import firebase from "firebase";
import db from "@/pages/firebaseInit";

export default  {
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
}