export default class InsertLocal {
  constructor() {
    this.todo = document.querySelector('.todo');
    this.inProgress = document.querySelector('.in-progress');
    this.done = document.querySelector('.done');
  }

  saveLocal() {
    localStorage.setItem('todo', this.todo.innerHTML);
    localStorage.setItem('inProgress', this.inProgress.innerHTML);
    localStorage.setItem('done', this.done.innerHTML);
  }

  insertLocal() {
    if(localStorage.length !== 0) {
      this.todo.innerHTML = ''
      this.inProgress.innerHTML = ''
      this.done.innerHTML = ''
      this.todo.innerHTML = localStorage.getItem('todo')
      this.inProgress.innerHTML = localStorage.getItem('inProgress')
      this.done.innerHTML = localStorage.getItem('done')
    }
  }

}