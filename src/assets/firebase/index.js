import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyCCYcsEP1NNTEQwpMYd5jehlJE7g24vjfk',
  authDomain: 'vueinvoiceapp-5a736.firebaseapp.com',
  projectId: 'vueinvoiceapp-5a736',
  // storageBucket: 'vueinvoiceapp-5a736.appspot.com',
  messagingSenderId: '367800218966',
  appId: '1:367800218966:web:cf3fde53266a1d955352f7',
  storageBucket: 'gs://vueinvoiceapp-5a736.appspot.com'
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const storage = getStorage(app)

export { app, db, storage }
