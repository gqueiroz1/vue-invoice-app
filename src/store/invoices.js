import { 
  collection, 
  addDoc, 
  getDocs, 
  getDoc, 
  doc, 
  deleteDoc, 
  updateDoc, 
  query, 
  where 
} from 'firebase/firestore'
import { db } from '@/assets/firebase'
import { checkLoggedUser } from '@/assets/helpers'

export default {
  state: {
    invoicesList: []
  },

  getters: {
    invoicesList: state => filterValue => {
      if (!filterValue) return state.invoicesList

      return state.invoicesList.filter(invoice => invoice.state === filterValue)
    },

    getInvoiceById: state => id => {
      return state.invoicesList.find(invoice => invoice.id === id)
    }
  },

  mutations: {
    addInvoice (state, payload) {
      if (Array.isArray(payload)) {
        state.invoicesList = payload
      } else {
        state.invoicesList.push({ ...payload })
      }
    },

    deleteInvoice (state, id) {
      state.invoicesList = state.invoicesList.filter(invoice => invoice.id !== id)
    },

    updateInvoice (state, payload) {
      state.invoicesList.forEach((invoice, index) => {
        if (invoice.id === payload.id) {
          state.invoicesList[index] = { ...payload }
        }
      })
    },

    setInvoiceState (state, payload) {
      state.invoicesList.forEach((invoice, index) => {
        if (invoice.id === payload.id) {
          state.invoicesList[index].state = payload.state
        }
      })
    },

    resetInvoicesList (state) {
      state.invoicesList = []
    }
  },

  actions: {
    createInvoice ({ commit }, payload) {
      addDoc(collection(db, 'invoices'), {
        ...payload,
        userId: JSON.parse(localStorage.getItem('user')).uid
      }).then(response => {
        commit('addInvoice', { id: response.id, ...payload })
      }).catch(e => {
        console.log(e)
      }) 
    },

    async fetchInvoices ({ commit }) {
      const user = await checkLoggedUser()
      const payload = []
      const fetchQuery = query(collection(db, 'invoices'), where('userId', '==', user.uid))
      
      getDocs(fetchQuery).then(response => {
        response.forEach(doc => payload.push({ id: doc.id, ...doc.data() }))

        commit('addInvoice', payload)
      })
    },

    fetchInvoiceById ({ commit }, id) {
      return getDoc(doc(db, 'invoices', id)).then(response => {
        if (response.data()) {
          commit('addInvoice', { id: response.id, ...response.data() })

          return { id: response.id, ...response.data() }
        } else {
          return false
        }
      }).catch(e => {
        console.log(e)
      })
    },

    deleteInvoice ({ commit }, id) {
      return deleteDoc(doc(db, 'invoices', id)).then(() => {
        commit('deleteInvoice', id)
        return true
      }).catch(e => {
        console.log(e)
      })
    },

    updateInvoice ({ commit }, payload) {
      return updateDoc(doc(db, 'invoices', payload.id), { ...payload }).then(() => {
        commit('updateInvoice', payload)
        return true
      }).catch(e => {
        console.log(e)
      })
    },

    setInvoiceState ({ commit }, { id, state }) {
      return updateDoc(doc(db, 'invoices', id), { state }).then(() => {
        commit('setInvoiceState', { state, id })
        return true
      }).catch(e => {
        console.log(e)
      })
    }
  }
}