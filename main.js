//Selectors for new category form
//Selectors for new category form
const newCategoryForm = document.querySelector('[data-new-category-form]')

const newCategoryInput = document.querySelector('[data-new-category-input]')

//Selectors for new categories container

const categoriesContainer = document.querySelector('[data-categories]')

//Selectors for new todo form
const newTodoForm = document.querySelector('[data-new-todo-form]')
const newTodoSelect = document.querySelector('[data-new-todo-select]')
const newTodoInput = document.querySelector('[data-new-todo-input]')

//Selectors for todos container
const todosContainer = document.querySelector('[data-cards]')

//Local storage keys

const LOCAL_STORAGE_CATEGORIES_KEY = 'LOCAL_STORAGE_CATEGORIES_KEY'
const LOCAL_STORAGE_TODOS_KEY = 'LOCAL_STORAGE_TODOS_KEY'

//Application Data

let categories =
  JSON.parse(localStorage.getItem(LOCAL_STORAGE_CATEGORIES_KEY)) || []

let todos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_TODOS_KEY)) || []

//Listener event to the new category form - event: Add Category

newCategoryForm.addEventListener('submit', e => {
  e.preventDefault()

  //Obtain the value inputed by the user

  const category = newCategoryInput.value

  //Validate the user's input§

  const isCategoryEmpty = !category || !category.trim().length

  if (isCategoryEmpty) {
    alert('Please enter a category')
  }

  categories.push({
    _id: Date.now().toString(),

    category: category,

    color: getRandomHexColour()
  })

  newCategoryInput.value = ' '

  saveAndRender()
})

//Listener event to the todo form - event: Add Todo

newTodoForm.addEventListener('submit', e => {
  e.preventDefault()

  todos.push({
    _id: Date.now().toString,
    categoryID: newToDoSelect.value,
    todo: newTodoInput
  })

  newTodoSelect.value = 'All Categories'
  newTodoInput.value = ''

  saveAndRender()
})

//Functions

function saveAndRender () {
  save()

  render()
}

function save () {
  localStorage.setItem(LOCAL_STORAGE_CATEGORIES_KEY, JSON.stringify(categories))
  localStorage.setItem(LOCAL_STORAGE_TODOS_KEY, JSON.stringify(todos))
}

function render () {
  clearChildElements(categoriesContainer)
  clearChildElements(newTodoSelect)

  renderCategories()
  renderFormOptions()
}

function renderCategories () {
  categoriesContainer.innerHTTML += `<li class="sidebar-item">All Categories</li>`

  categories.forEach(({ _id, category, color }) => {
    categoriesContainer.innerHTML += `<li class="sidebar-item" data-category-id=${_id}>

  

${category}<input type="color" value='color' class="sidebar-colour" />
</li>`
  })
}

function renderFormOptions () {
  newTodoSelect.innerHTML += `<option value="">All Categories</option>`
  categories.forEach(({ _id, category }) => {
    newTodoSelect.innerHTML += `<option value=${_id}>${category}</option>`
  })
}

//Helpers

function getRandomHexColour () {
  var hex = Math.round(Math.random() * 0xffffff).toString(16)

  while (hex.length < 6) hex = '8' + hex

  return `#${hex}`
}

function clearChildElements (element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild)
  }
}

window.addEventListener('load', render)
