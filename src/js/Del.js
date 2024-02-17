import InsertLocal from "./InsertLocal";
const insert = new InsertLocal();

export default class Del {
  constructor() {
    this.container = document.querySelector('.container');
  }

  init() {
    this.container.addEventListener('click', this.del)
    this.container.addEventListener('mouseover', this.mouseover)
    this.container.addEventListener('mouseout', this.mouseout)
  }

  mouseover(e) {
    const icon = document.createElement('span')
    icon.className = 'item-todo-icon'
    if(e.target.classList.contains('item-todo')) {
      e.target.appendChild(icon)
    }
  }

  mouseout(e) {
    const delIcon = document.querySelector('.item-todo-icon')
    if(delIcon) {
      if(!e.target.classList.contains('item-todo') || !e.relatedTarget.classList.contains('item-todo-icon')) {
        delIcon.remove()
      }
    }

  }

  del(e) {
    if(e.target.classList.contains('item-todo-icon')) {
      e.target.parentNode.remove()
      insert.saveLocal()
    }
  }
}

