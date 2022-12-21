import { 
  getAuth,
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  updateProfile, 
  signOut 
} from 'firebase/auth'
import { checkLoggedUser } from '@/assets/helpers'

export default {
  state () {
    return {
      isUserAuthenticated: false,
      user: {}
    }
  },

  mutations: {
    setUser (state, payload) {
      state.user = {
        ...payload
      }     

      state.isUserAuthenticated = true
    },

    updateUser (state, { key, value }) {
      state.user[key] = value
    },

    signOut (state) {
      state.user = {}
      state.isUserAuthenticated = false
    }
  },

  actions: {
    authenticateUser ({ commit, state }, { email, password, type }) {
      const functionKey = type === 'login' ? 'signInWithEmailAndPassword' : 'createUserWithEmailAndPassword'
      const handlerFunction = {
        signInWithEmailAndPassword: () => signInWithEmailAndPassword(getAuth(), email, password),
        createUserWithEmailAndPassword: () => createUserWithEmailAndPassword(getAuth(), email, password)
      }

      const response = handlerFunction[functionKey]().then(userCredential => {
        const { user } = userCredential
      
        commit('setUser', { ...user.providerData[0], uid: user.uid })

        localStorage.setItem('user', JSON.stringify(state.user))

        return true
      }).catch(({ code, message }) => {
        console.log(code, message)
        return false
      })

      return response
    },

    async updateUser({ commit, state }, { key, value }) {
      const user = { ...state.user, [key]: value }

      const currentUser = await checkLoggedUser(getAuth())

      if (currentUser) {
        updateProfile(currentUser, {
          [key]: value
        }).then(() => {
          localStorage.setItem('user', JSON.stringify(user))
          commit('updateUser', { key, value })
        }).catch(({ code, message }) => {
          console.log(code, message)
          return false
        }) 
      }
    },

    signOut ({ commit }) {
      const auth = getAuth()

      return signOut(auth).then(() => {
        commit('signOut')
        commit('resetInvoicesList')
        localStorage.removeItem('user')

        return true
      }).catch(({ code, message }) => {
        console.log(code, message)
        return false
      })
    }
  }
}