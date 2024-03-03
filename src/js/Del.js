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
    if(e.target.classList.contains('item-todo')) {
      if(e.target.querySelector('.item-todo-icon')) {
        e.target.querySelector('.item-todo-icon').classList.remove('hidden')
      }

    }
    if(e.target.classList.contains('item-todo-icon')) {
      e.target.classList.remove('hidden')
    }
  }

  mouseout(e) {
    if(e.target.classList.contains('item-todo')) {
      const delIcon = e.target.querySelector('.item-todo-icon')
      if(delIcon) {
        delIcon.classList.add('hidden')
        e.target.classList.remove('grabbing')
        e.target.classList.add('grab')
      }
    }
    if(e.target.classList.contains('item-todo-icon')) {
      e.target.classList.add('hidden')
    }
  }

  del(e) {
    if(e.target.classList.contains('item-todo-icon')) {
      e.target.classList.add('hidden')
      e.target.parentNode.remove()
      insert.saveLocal()
    }
  }
}

