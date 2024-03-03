import Add from './Add'
import InsertLocal from "./InsertLocal";
import Del from './Del'

const add = new Add();
const insert = new InsertLocal();
const del = new Del();

add.addArea();
del.init();

document.addEventListener("DOMContentLoaded", () => {
  insert.insertLocal()
})


const container = document.querySelector('.container');

let currentDroppable = null;

container.onmousedown = function(e) { // (1) отследить нажатие
  let mouseUpItem = e.target;

  if(mouseUpItem.classList.contains('item-todo')) {
    let shiftX = e.clientX - mouseUpItem.getBoundingClientRect().left;
    let shiftY = e.clientY - mouseUpItem.getBoundingClientRect().top;
    const delIcon = mouseUpItem.querySelector('.item-todo-icon')
    if(delIcon) {
      delIcon.classList.add('hidden')
      mouseUpItem.classList.remove('grab')
      mouseUpItem.classList.add('grabbing')
    }

    mouseUpItem.style.position = 'absolute';
    mouseUpItem.style.zIndex = 1000;

    document.body.append(mouseUpItem);

    moveAt(e.pageX, e.pageY);

    function moveAt(pageX, pageY) {
      mouseUpItem.style.left = pageX - shiftX + 'px';
      mouseUpItem.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);
      mouseUpItem.hidden = true;
      mouseUpItem.hidden = false;
      // внутри обработчика события мыши
      mouseUpItem.hidden = true; // (*) прячем переносимый элемент

      let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
      // elemBelow - элемент под мячом (возможная цель переноса)

      mouseUpItem.hidden = false;

      if (!elemBelow) return;

      let droppableBelow = elemBelow.closest('.item-todo');

      if (currentDroppable !== droppableBelow) {
        if(droppableBelow) {

          const newEl = document.createElement('div')
          newEl.classList.add('item-todo-light')
          newEl.setAttribute("style",`height:${mouseUpItem.getBoundingClientRect().height - 20}` + `px`);


          if (currentDroppable) {
            // const itemToDo = containerBox.querySelectorAll('.item-todo')
            console.log(currentDroppable.nextSibling)
            currentDroppable.nextSibling.remove()

            // логика обработки процесса "вылета" из droppable (удаляем подсветку)
            newEl.remove()
          }
          currentDroppable = droppableBelow;

          if (currentDroppable) {
              droppableBelow.insertAdjacentElement('afterend', newEl)
          }
        }
      }
    }

    document.addEventListener('mousemove', onMouseMove);

    function mouseup(ev) {
      if(currentDroppable !== null) {
        if(currentDroppable.classList.contains('item-todo')) {
          console.log(currentDroppable.nextSibling)
          currentDroppable.nextSibling.remove()
          currentDroppable.insertAdjacentElement('afterend', mouseUpItem)

          mouseUpItem.classList.add('grab')
          mouseUpItem.classList.remove('grabbing')
          mouseUpItem.removeAttribute("style")
          mouseUpItem.children[0].classList.add('hidden')
          document.removeEventListener('mousemove', onMouseMove);
          mouseUpItem.removeEventListener('mouseup', mouseup);
          currentDroppable = null
          insert.saveLocal()
        }
      }

      if (currentDroppable === null) {
        mouseUpItem.removeEventListener('mouseup', mouseup);
        document.removeEventListener('mousemove', onMouseMove);
        mouseUpItem.remove()
        insert.insertLocal()
      }
    }

    mouseUpItem.addEventListener('mouseup', mouseup);

    mouseUpItem.ondragstart = function() {
      return false;
    };
  }
};
