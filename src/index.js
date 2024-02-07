let addToy = false;
const url = 'http://localhost:3000/toys'
const toyCollection = document.querySelector('#toy-collection')


// document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyForm = document.querySelector('.add-toy-form')
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  const totalToys = document.querySelectorAll('#toy-collection .card')
  toyForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const newToy = {
        name: e.target.name.value,
        image: e.target.image.value,
        likes: 0,
        id: `${totalToys.length + 1}`
    }
    displayToy(newToy)
    postToy(newToy)
  })
// });


const displayToy = (toyObj) => {
  //! Make all the elements
  const card = document.createElement('div')
  const toyName = document.createElement('h2')
  const toyImage = document.createElement('img')
  const toyLikeBtn = document.createElement('button')
  const toyLikesCount = document.createElement('p')
  const toyId = toyObj.id
  
  //! Input information into element
  card.className = 'card'
  toyName.textContent = toyObj.name
  toyImage.setAttribute('src', toyObj.image)
  toyImage.setAttribute('class', 'toy-avatar')
  toyLikeBtn.setAttribute('class', 'btn')
  toyLikeBtn.setAttribute('id', toyObj.id)
  toyLikeBtn.textContent = "Like ❤️"
  toyLikesCount.textContent = `Likes: ${toyObj.likes}`

  //! Make Button for Likes
  toyLikeBtn.addEventListener('click', () => {
    toyObj.likes ++ 
    toyLikesCount.innerText = `Likes: ${toyObj.likes}`
    fetch(`${url}/${toyId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'},
      body: JSON.stringify({
        likes: toyObj.likes
      })
    })
    .catch(err => console.log(err))
  })

  //! Append Toy information
  card.appendChild(toyName)
  card.appendChild(toyImage)
  card.appendChild(toyLikesCount)
  card.appendChild(toyLikeBtn)

  //! Append card <div> to collection
  toyCollection.appendChild(card)

}

const postToy = (toy) => {
  fetch(url,{
    method: 'POST',
    headers: {
      'Content-Type': "application/json"
    },
    body:JSON.stringify(toy)
  })
  .catch(error => alert(error))
}

const getToys = () =>{
  return fetch(url)
  .then(resp => resp.json())
  .then(toysData => toysData.forEach(toy => displayToy(toy)))
  .catch(err => console.log(err))
}

getToys()


