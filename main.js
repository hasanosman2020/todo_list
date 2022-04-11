//Selectors for new category form

const newCategoryForm = document.querySelector('[data-new-category-form]')

const newCategoryInput = document.querySelector('[data-new-category-input]')

//Selectors for new categories container

const categoriesContainer = document.querySelector('[data-categories]')

//Local storage keys for the categories

const LOCAL_STORAGE_CATEGORIES_KEY = 'LOCAL_STORAGE_CATEGORIES_KEY'

//Application Data
let categories =
  JSON.parse(localStorage.getItem(LOCAL_STORAGE_CATEGORIES_KEY)) || []

//Listener event to the new category form

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

//Functions

function saveAndRender () {
  save()
  render()
}

function save () {
  localStorage.getItem(LOCAL_STORAGE_CATEGORIES_KEY, JSON.stringify(categories))
}

function render () {
  clearChildElements(categoriesContainer)
  renderCategories()
}

function renderCategories () {
  categoriesContainer.innerHTTML += `<li class="sidebar-item">All Categories</li>`
  categories.forEach(({ _id, category, color }) => {
    categoriesContainer.innerHTML += `<li class="sidebar-item" data-category-id=${_id}>

${category}<input type="color" value='color' class="sidebar-colour" />

</li>`
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
