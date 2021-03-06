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
                let userData = userRef.data()
                userData.uid = cred.user.uid
                commit('SET_USER', userData);
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
    },
    loadClients({commit}, currUserId) {
        let clientsByName = {};
        let clientsById = {};
        db.collection('users').get().then(query => {
            query.forEach(doc => {
                if(doc.id !== currUserId) {
                    let userData = doc.data()
                    userData.id = doc.id
                    clientsByName[userData.company] = userData
                    clientsById[doc.id] = userData
                }
            })
            commit('SET_CLIENTS', clientsByName, clientsById)
        })
    },
    loadServiceDates({commit}) {
        let dates = []
        db.collection('serviceDates').get().then(query => {
            query.forEach(doc => {
                let eventData = doc.data()
                eventData.id = doc.id
                dates.push(eventData)
            })
            commit('SET_SERVICE_DATES', dates)
        })
    },
}