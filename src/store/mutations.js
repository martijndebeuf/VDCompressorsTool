import routes from "@/Routes";

export default {
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
    SET_CLIENTS(state, clientsByName, clientsById) {
        state.clientsByName = clientsByName;
        state.clientsById = clientsById
    }
}