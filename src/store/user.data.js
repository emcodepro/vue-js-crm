import firebase from "firebase";

export default {
    state: {
        userData: {}
    },
    mutations: {
        setData(state, data) {
            state.userData = data
        },
        clearData(state) {
            state.userData = {}
        }
    },
    actions: {
        async getUserData({dispatch, commit}) {
            try {
                const uid = await dispatch('getUid')
                const userData = (await firebase.database().ref(`/users/${uid}/info`).once('value')).val()
                commit('setData', userData)
            }catch (e) {
                console.log(e)
            }
        },
        async updateUserData({dispatch, commit, getters}, newData) {
            try {
                const uid = await dispatch('getUid')
                const updatedData = {...getters.userData, ...newData}
                await firebase.database().ref(`/users/${uid}/info`).update(updatedData)
                commit('setData', updatedData)
            } catch (e) {
                commit('setError', e)
                throw e
            }
        }
    },
    getters: {
        userData: s => s.userData
    }
}