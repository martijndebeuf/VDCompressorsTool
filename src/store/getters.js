export default {
    DRAWER_STATE(state) {
        return state.drawer;
    },
    user: state => state.user,
    token: state => state.token,
    clientsByName: state => state.clientsByName,
    serviceDates: state => state.serviceDates
}