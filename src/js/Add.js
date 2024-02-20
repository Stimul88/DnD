import InsertLocal from "./InsertLocal";

const insert = new InsertLocal();

export default class Add {
  constructor() {
    this.items = Array.from(document.querySelectorAll('.items'));
    this.textArea = Array.from(document.querySelectorAll('.textarea'))
    this.add = document.querySelectorAll('.add')
    this.otherBtn = Array.from(document.querySelectorAll('.other-btn '))
    this.addContainer = Array.from(document.querySelectorAll('.add-container '))
    this.icon = document.querySelectorAll('.icon');
    this.addCardBtn = document.querySelectorAll('.add-card-btn');
  }

  addArea () {
    this.add.forEach((item, index) => {
      this.add[index].addEventListener('click', (e) => {
        const findTextArea = this.textArea.find(e => !e.classList.contains('hidden'))
        const findOtherBtn = this.otherBtn.find(e => !e.classList.contains('hidden'))
        const findAddContainer = this.addContainer.find(e => e.classList.contains('hidden'))

        if(findTextArea) {
          findTextArea.classList.add('hidden')
          findOtherBtn.classList.add('hidden')
          findAddContainer.classList.remove('hidden')
        }
        this.textArea[index].classList.remove('hidden')
        this.otherBtn[index].classList.remove('hidden')
        this.addContainer[index].classList.add('hidden')
        this.textArea[index].value = ''
      })

      this.icon[index].addEventListener('click', (e) => {
        this.textArea[index].classList.add('hidden')
        this.otherBtn[index].classList.add('hidden')
        this.addContainer[index].classList.remove('hidden')
        this.textArea[index].value = ''
      })

      this.addCardBtn[index].addEventListener('click', (e) => {
        if (this.textArea[index].value.trim() !== "") {
          this.textArea[index].classList.add('hidden')
          this.otherBtn[index].classList.add('hidden')
          this.addContainer[index].classList.remove('hidden')
          this.items[index].innerHTML += `<div class="item-todo" draggable="true">${this.textArea[index].value}
                                            <span class="item-todo-icon hidden"></span>
                                            </div>`
          this.textArea[index].value = ''
          insert.saveLocal()
        } else {
          this.textArea[index].classList.add('hidden')
          this.otherBtn[index].classList.add('hidden')
          this.addContainer[index].classList.remove('hidden')
        }
      })
    })
  }
}