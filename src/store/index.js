import { createStore } from 'vuex'
import auth from './auth'
import invoices from './invoices'

export default createStore({
  modules: {
    auth,
    invoices
  }
})