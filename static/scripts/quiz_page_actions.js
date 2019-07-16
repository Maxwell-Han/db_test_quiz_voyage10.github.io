console.log('hi from quiz page actions script file')
const displayWelcome = () => {
  let message = document.querySelector('.messages-container')
  let loggedInMessage = document.querySelector('.logged-in-message')
  console.log('we are checking for a signed in user')
  if(!!auth.currentUser) {
    message.style.display = "flex"
    loggedInMessage.textContent = `Welcome ${auth.currentUser.email}!`
  }else{
    message.style.display = "none"
  }
}



window.addEventListener('load', (e) => {
  setTimeout( () => {
    console.log('we are running the timer')
    displayWelcome()
  }, 1000)
})

const getStartedButton = document.querySelector('.get-started-button')

const categories = document.querySelector('.link-box')
// start page with categories hidden
// load categories when we click Get Started
getStartedButton.addEventListener('click' , (e) => {
  e.preventDefault()
  console.log('GET STARTED!')
  categories.style.display = "inline-block"
  getStartedButton.style.display = "none"
})
