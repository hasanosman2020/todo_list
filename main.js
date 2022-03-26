//Selectorys for new category form
const newCategoryForm = document.querySelector('data-new-category-form')
const newCategoryInput = document.querySelector('data-new-category-input')

//Selectors for new categories container
const categoriesContainer = document.querySelector('data-categories')
//Local storage keys for the categories
const LOCAL_STORAGE_CATEGORIES_KEY = 'LOCAL_STORAGE_CATEGORIES_KEY'
//Listener event to the new category form
newCategoryForm.addEventListener('submit', e => {
  e.preventDefault()

  //Obtain the value inputted by the user
  const category = newCategoryInput.value
  //Validate the user's input§
  const isCategoryEmpty = !category || !category.trim().length
  if (isCategoryEmpty) {
    alert('Please enter a category')
  }
})
