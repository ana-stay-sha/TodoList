let ul = document.querySelector("ul");
let addTodo = document.querySelector(".todo__add-item");
let icons = document.getElementsByTagName("i");
let saveBtn = document.querySelector(".todo__buttons_save");
let clearBtn = document.querySelector(".todo__buttons_clear");
let getBtn = document.querySelector(".todo__buttons_get");
let addBtn = document.querySelector(".todo__add-button");
let setBtn = document.querySelector(".todo__buttons_set");

function deleteTodo() {
  for (let icon of icons) {
    icon.addEventListener("click", function () {
      icon.parentElement.remove();
    });
  }
}

function loadTodo() {
  if (localStorage.getItem("todoList")) {
    ul.innerHTML = "";
    let dataLS = localStorage.getItem("todoList");
    dataLS = JSON.parse(dataLS);

    for (i = 0; i < dataLS.length; i++) {
      let li = document.createElement("li");
      let spanElement = document.createElement("span");
      let icon = document.createElement("i");
      let newTodo = dataLS[i];

      icon.classList.add("fas", "fa-trash-alt");
      spanElement.classList.add("todo__items_text");
      spanElement.append(newTodo);
      ul.appendChild(li).append(spanElement, icon);
    }
    deleteTodo();
  }
}

addBtn.addEventListener("click", function () {
  let li = document.createElement("li");
  let spanElement = document.createElement("span");
  let icon = document.createElement("i");

  if (!addTodo.value.length || !addTodo.value.trim()){
    return
  }
  else{
    let newTodo = addTodo.value;
    icon.classList.add("fas", "fa-trash-alt");
    spanElement.classList.add("todo__items_text");
    spanElement.append(newTodo);
    ul.appendChild(li).append(spanElement, icon);
    }
  addTodo.value = "";
  deleteTodo();
});

ul.addEventListener("click", function (ev) {
  if (ev.target.tagName === "SPAN" || ev.target.tagName === "LI") {
    ev.target.classList.toggle("checked");
  }
});

saveBtn.addEventListener("click", function () {
  const dataTodo = [];
  for (let element of ul.querySelectorAll("li")) {
    dataTodo.push(element.textContent);
  }
  localStorage["todoList"] = JSON.stringify(dataTodo);
});

clearBtn.addEventListener("click", function () {
  ul.innerHTML = "";
  localStorage.removeItem("todoList", ul.innerHTML);
});

getBtn.addEventListener("click", function () {
  const options = {
    method: "GET",
    mode: "cors",
  };

  fetch("https://jsonplaceholder.typicode.com/users/1/todos", options)
    .then((data) => data.json())
    .then((data) => {
      let preparedTodo = data.map((item) => {
        let li = document.createElement("li");
        let spanElement = document.createElement("span");
        let icon = document.createElement("i");

        let newTodo = item.title;
        console.log(newTodo);

        icon.classList.add("fas", "fa-trash-alt");
        spanElement.classList.add("todo__items_text");
        spanElement.append(newTodo);
        ul.appendChild(li).append(spanElement, icon);

        deleteTodo();
      });
    })
    .catch(() => {
      console.log("error");
    });
});

deleteTodo();

loadTodo();
