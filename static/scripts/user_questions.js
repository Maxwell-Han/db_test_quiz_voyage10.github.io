
const qList = document.querySelector('.questions-container')
const questionItemsContainer = document.querySelector('.question-items')
const setupQuestions = (data) => {
  let html = ''
  if(data.length){
    data.forEach( doc => {
      const question = doc.data()
      const li = `
        <div class="q-item" id=${doc.id}>
          <li>${question.questionText}</li>
          <button class="edit">Edit</button>
          <button class="delete">Delete</button>
        </div>
      `
      html += li
      })
      questionItemsContainer.innerHTML = html
    }
}

const grabQuestions = () => {
  db.collection('users').doc(auth.currentUser.uid).collection('questions')
    .onSnapshot ( (snapshot) => {
      let questions = snapshot.docs
      //we now have an array of questions to work with
      console.log('snapshot.docs is ', questions)
      questions.forEach( d => console.log(d.data()))
      setupQuestions(questions)
    }, err => {
      console.log(err.message)
    })
}

// get Topics and add to Page
const getTopics = () => {
  db.collection('users').doc(auth.currentUser.uid).collection('topics')
  	.onSnapshot( (snapshot) => {
  		let topics = snapshot.docs

      let topicsContainer = document.querySelector('.topics-container')
      let html = ''
  		topics.forEach( t => console.log(t.data()))
  		//we now have an array of topic objs to do stuff with
      topics.forEach( (t) => {
        let topicName = t.data().name
        let div = `<li>${topicName}</li>`
        if(topicName) html += div
      })
      topicsContainer.innerHTML = html
  	})
}

document.addEventListener('DOMContentLoaded', () => {
  getTopics()
  grabQuestions()
})
