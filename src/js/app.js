import Add from './Add'
import InsertLocal from "./InsertLocal";
import Del from './Del'

const add = new Add();
const insert = new InsertLocal();
const del = new Del();

add.addArea();
del.init();
insert.insertLocal();

window.onload = function () {
  insert.insertLocal()
};

const container = document.querySelector('.container');

let currentDroppable = null;

container.onmousedown = function(e) { // (1) отследить нажатие
  insert.saveLocal()
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

    // (2) подготовить к перемещению:
    // разместить поверх остального содержимого и в абсолютных координатах
    mouseUpItem.style.position = 'absolute';
    mouseUpItem.style.zIndex = 1000;
    // переместим в body, чтобы мяч был точно не внутри position:relative
    document.body.append(mouseUpItem);
    // // и установим абсолютно спозиционированный мяч под курсор
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
      let items = elemBelow.closest('.items');
      const newEl = document.createElement('div')
      newEl.classList.add('item-todo-light')

      if (currentDroppable !== droppableBelow) {


        if (currentDroppable) {
          // логика обработки процесса "вылета" из droppable (удаляем подсветку)
          // newEl.remove()
        }
        currentDroppable = droppableBelow;
        if (currentDroppable) {
          // currentDroppable.parentElement.insertAdjacentElement('afterend', newEl)
          // // логика обработки процесса, когда мы "влетаем" в элемент droppable
        }
      }
    }

    document.addEventListener('mousemove', onMouseMove);

    function mouseup(ev) {

      if(currentDroppable !== null) {

        if(ev.target.classList.contains('item-todo')) {

          currentDroppable.insertAdjacentElement('afterend', mouseUpItem)
          if(!currentDroppable.hasChildNodes()) {
            currentDroppable.remove()
          }

          mouseUpItem.classList.add('grab')
          mouseUpItem.classList.remove('grabbing')
          mouseUpItem.removeAttribute("style")

          document.removeEventListener('mousemove', onMouseMove);
          mouseUpItem.removeEventListener('mouseup', mouseup);
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
