const form = document.forms.search;
const content = document.querySelector('.content');
const result = document.querySelector('.content__result');
const error = document.querySelector('.content__error');
const spinner = document.querySelector('.spinner');




function search(entity,entityId){
  return fetch(`https://swapi.co/api/${entity}/${entityId}`);
}
function renderResult(text){result.textContent = text; error.textContent=""};
function renderError(err){error.textContent = err; result.textContent=""};
function renderLoading(isLoading){
  if (isLoading){
    spinner.classList.add("spinner_visible");
    content.classList.add("content_hidden")
  } else{
    spinner.classList.remove("spinner_visible");
    content.classList.remove("content_hidden")
  }
}


form.addEventListener('submit', function submit(e) {
    e.preventDefault();
    renderLoading(true);
    search(form.elements.entity.value, form.elements.entityId.value)
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(res.status);
        }
      })
      .then(res => renderResult(res.name))
      .catch(err => renderError(`Ошибка: ${err}`))
      .finally(() => renderLoading(false));
  });