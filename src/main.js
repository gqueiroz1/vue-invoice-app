import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/firebase' // making firebase load as soon as the App loads

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faUserSecret,
  faSun,
  faMoon,
  faCircleUser,
  faFileInvoiceDollar,
  faChevronDown,
  faCirclePlus,
  faPlus,
  faChevronRight,
  faArrowLeft,
  faTrash,
  faFaceSadTear,
  faEllipsisVertical,
  faCamera,
  faRightFromBracket
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faUserSecret,
  faSun,
  faMoon,
  faCircleUser,
  faFileInvoiceDollar,
  faChevronDown,
  faCirclePlus,
  faPlus,
  faChevronRight,
  faArrowLeft,
  faTrash,
  faFaceSadTear,
  faEllipsisVertical,
  faCamera,
  faRightFromBracket
)

createApp(App).component('fas-icon', FontAwesomeIcon).use(store).use(router).mount('#app')
