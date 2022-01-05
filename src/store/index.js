import { createStore } from 'vuex'

export default createStore({
    state: {
        lastName: localStorage.getItem('lastName') || '',
        firstName: localStorage.getItem('firstName') || '',
        account: localStorage.getItem('account') || '',
        pa: localStorage.getItem('pa') || 'false',
    },
    mutations: {
        'UPDATE_ACCOUNT_DETAILS' (state, data) {
            state.firstName = data.first_name
            state.lastName = data.last_name
            state.account = data.account
            state.pa = data.pa
        }
    },
    actions: {
        updateAccount({ commit }, data) {
            localStorage.setItem('firstName', data.first_name)
            localStorage.setItem('lastName', data.last_name)
            localStorage.setItem('account', data.account)
            localStorage.setItem('pa', data.pa)
            commit('UPDATE_ACCOUNT_DETAILS', data)
        }
    },
    modules: {}
})