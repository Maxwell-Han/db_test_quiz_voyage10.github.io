console.log('hello from create.js')

const createForm = document.querySelector('#create-form')
createForm.addEventListener('submit', (e) => {
  e.preventDefault()
  let category = document.querySelector('#question-category').value
  let data = {
    qType: createForm['question-type'].value,
    question: createForm['question'].value,
    choices: [
      createForm['choice1'].value,
      createForm['choice2'].value,
      createForm['choice3'].value,
      createForm['choice4'].value
    ],
    answer: createForm[createForm['answer'].value].value
  }
  console.log(data)
  db.collection('users').doc(auth.currentUser.uid).collection(category)
    .add(data)
    .then( () => {
      createForm.reset()
      document.querySelector('.success-message').style.display = "inline-block"
      window.location = "quiz.html"
    })
    .catch( err => console.log(err.message))
})
