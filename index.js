'use strict';

var selector = document.querySelector('input');
var im = new Inputmask("99.99.9999");
im.mask(selector);



let logo = document.querySelector('.logo');
let table = document.querySelector('.table');
let cross = document.querySelector('.cross');
let modalBackground = document.querySelector('.modal-background');
let add = document.querySelector('.add');
let input = document.querySelector('.modal-input');
let modalHead = document.querySelector('.modal-head');
let modalBtn = document.querySelector('.modal-btn');
let tbody = document.querySelector('.tbody');
let cells = document.querySelectorAll('td');
let rows = document.querySelectorAll('tr');
let dateInput = document.querySelector('.input-date');
let actionInput = document.querySelector('.input-action');
let priceInput = document.querySelector('.input-price');
let trash = document.querySelector('.trash');
let overR;
let underR;
let mouseStart;
let mouseEnd;
let count = 0;


modalBtn.addEventListener('click', clickNext);
add.addEventListener('click', addNewElement)
cross.addEventListener('click', closeModal)
tbody.addEventListener('click', editTD);

logo.classList.add('animate__fadeIn');

setTimeout(logo1, 2000);

function logo1() {
logo.classList.add('animate__fadeOut');
logo.classList.remove('animate__fadeIn');
setTimeout(logo2, 2000);
}
function logo2() {
logo.classList.remove('animate__fadeOut');
logo.style.display = "none";
}


function inputDefault() {
  dateInput.classList.remove("hide");
  actionInput.classList.add("hide");
  priceInput.classList.add("hide");
}

function addNewElement() {
  ++count
  modalBackground.style.display = "flex";
  document.querySelector('.modal-input').focus();

  let newTR = document.createElement('tr');
  newTR.setAttribute("draggable", true);
  let newTdDate = document.createElement('td');
  newTdDate.classList.add('date');
  let newTdAction = document.createElement('td');
  newTdAction.classList.add('action');
  let newTdPrice = document.createElement('td');
  newTdPrice.classList.add('price');
  newTR.append(newTdDate);
  newTR.append(newTdAction);
  newTR.append(newTdPrice);
  tbody.append(newTR);
}

function editTD(ev) {
  if (ev.target.tagName === 'TD') {
    ev.target.setAttribute('contenteditable', true)
  }
}

function closeModal() {
  count = 0; 
  inputDefault()
  modalBackground.style.display = "none";
  document.querySelectorAll('.modal-input').forEach((el) => {
    el.value = '';
  });
}

function clickNext() {
  let lastRow = document.querySelector('.tbody').lastElementChild;
  let dateCell = lastRow.querySelector('.date');
  let actionCell = lastRow.querySelector('.action');
  let priceCell = lastRow.querySelector('.price');

  switch (count) {
    case 1:
      modalHead.textContent = "Ценная бумага";
      dateCell.innerHTML = dateInput.value;
      dateInput.classList.add("hide");
      actionInput.classList.remove("hide");
      actionInput.focus();
      ++count;
      break;
    case 2:
      modalHead.textContent = "стоимость";
      actionCell.innerHTML = actionInput.value;
      actionInput.classList.add("hide");
      priceInput.classList.remove("hide");
      priceInput.focus();
      ++count;
      break;
    case 3:
      priceCell.innerHTML = priceInput.value;
      count = 0;
      closeModal();
      break;

    default:
      closeModal();
      count = 0;
  }
  document.querySelector('.modal-input') .value = '';
}


function drugAndDrop() {

  const dragStart = function(ev) {
    setTimeout(() => {
      overR = ev.target;
      mouseStart = ev.clientY;
      overR.classList.add('hide');
      trash.classList.remove('hide');
    }, 100);
  }

  const dragEnd = function(ev) {
    setTimeout(() => {
      overR.classList.remove('hide');
      trash.classList.add('hide');
    }, 100);
  }

  const dragOver = function(event) {
    event.preventDefault();
  }

  const dragEnter = function(event) {
    event.preventDefault();
  }

  const dragOverTrash = function(event) {
    event.preventDefault();
  }

  const dragEnterTrash = function(event) {
    event.preventDefault();
  }

  const dragDrop = function(ev) {
    // console.log(this.children);

    for (let index = 0; index < this.children; index++) {
      console.log(1);   
    }
    // this.children.forEach(function(ev) {
    //   console.log(1);
    // });

    // tbody.forEach((el) => {
    //   console.log(ev.target);
    // });
    // if (ev.currentTarget.tagName == "TR") {
    //   console.log(1);
    // }

    // underR = this;
    // mouseEnd = ev.clientY;
    // if (mouseStart > mouseEnd) {
    //   underR.before(overR)
    // } else {
    //   underR.after(overR)
    // }
  }

  const dragDropTrash = function(ev) {
    overR.remove();
  }

  // tbody.forEach((row) => {
  //   row.addEventListener('dragstart', dragStart);
  //   row.addEventListener('dragend', dragEnd);
    // row.addEventListener('drop', dragDrop);
  // })

  tbody.addEventListener('drop', dragDrop);
  tbody.addEventListener('dragend', dragEnd);
  tbody.addEventListener('dragstart', dragStart);
  tbody.addEventListener('dragenter', dragEnter);
  tbody.addEventListener('dragover', dragOver);
  trash.addEventListener('dragenter', dragEnterTrash);
  trash.addEventListener('dragover', dragOverTrash);
  trash.addEventListener('drop', dragDropTrash);
}

drugAndDrop();

