console.log('hello from the auth file')
//listen for auth status changes

// check for state changes in auth
// at moment, will only console log when user signs out
auth.onAuthStateChanged( user => {
  if(user) {
    console.log('user is signed in')
    user.getIdTokenResult().then(idTokenResult => {
      console.log(user)
      user.admin = idTokenResult.claims.admin
      // do something if user is admin
    })
    // console.log('user logged in: ', user)
    // //get data
    // db.collection('terminology')
    //   .onSnapshot( (snapshot) => {
    //     setupQuestions(snapshot.docs)
    // }, err => {
    //   console.log(err.message)
    // })
  } else {
    console.log('Auth State: user currently logged out')
    if(displayWelcome) {displayWelcome()}

    // do something like hide elements if user is logged out
  }
})


//logout
let logoutButton
if(document.querySelector('.logout-button')){
  logoutButton = document.querySelector('.logout-button')
  logoutButton.addEventListener('click', (e) => {
    e.preventDefault()
    auth.signOut()
      .then( () => {
        console.log('Sign Out Event: user has signed out!')
      })
  })
}

//log in
let loginForm;
if(document.querySelector('#login-form')) {
  loginForm = document.querySelector('#login-form')
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault()
    //get user log in details
    const email = loginForm['login-email'].value
    const password = loginForm['login-password'].value
    console.log(email, password)
    auth.signInWithEmailAndPassword(email, password)
      .then( (credential) => {
        console.log('success!')
        window.location = "../index.html"
      })
      .catch( err => console.log(err.message))
  })
}

//signup
let signupForm
if(document.querySelector('#signup-form')) {
  signupForm = document.querySelector('#signup-form')
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault()

    //get user info
    const email = signupForm['signup-email'].value
    const password = signupForm['signup-password'].value
    console.log(email, password)

    //sign up the user
    auth.createUserWithEmailAndPassword(email, password)
      .then(credential => { //returns a promise which is a user credential token
        // modify below if we want to add db data upon signing up
        // return db.collection('users').doc(credential.user.uid).set({
        //   goal: signupForm['goal'].value
        // })
      })
      .then( (credential) => {
        console.log(credential)
        window.location = "../index.html"
    })
  })
}
