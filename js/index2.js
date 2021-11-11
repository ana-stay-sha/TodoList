let resultList = document.querySelector(".todo__result_list");

function showList(){
  resultList.innerHTML = "";
  let myData = localStorage.getItem("todoList");
  myData = JSON.parse(myData);
  for (let i = 0, length = myData.length; i < length; i++) {
    const key = i + 1;
    const value = myData[i];
    resultList.innerHTML += `<li class='todo__result_items'>${key}. ${value}</li>`;
  }
}
showList();
