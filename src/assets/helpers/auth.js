import { getAuth, onAuthStateChanged } from 'firebase/auth'

export async function checkLoggedUser () {
  const auth = await getAuth()

  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, user => {
      if (user) {
        resolve(user)
      } else {
        reject(false)
      }
    })
  })
}
