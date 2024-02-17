import Add from './Add'
import InsertLocal from "./InsertLocal";
import Del from './Del'


const add = new Add();
const insert = new InsertLocal();
const del = new Del();


add.addArea();
del.init();
insert.insertLocal();


const container = document.querySelector('.container');

let actualElement;

const onMouseOver = (e) => {
  actualElement.style.top = e.clientY + 'px';
  actualElement.style.left = e.clientX + 'px';
};

const onMouseUp = (e) => {
  const mouseUpItem = e.target;

  if(mouseUpItem.classList.contains('item-todo')) {

    mouseUpItem.parentNode.insertBefore(actualElement, mouseUpItem);

    actualElement.style.top = null;
    actualElement.style.left = null;

    actualElement.classList.remove('dragged');
    actualElement = undefined;

    document.documentElement.removeEventListener('mouseup', onMouseUp);
    document.documentElement.removeEventListener('mouseover', onMouseOver);
    insert.saveLocal()
  } else {
    insert.insertLocal()
  }
};


container.addEventListener('mousedown', (e) => {
  actualElement = e.target;
  if(actualElement.classList.contains('item-todo')) {
    e.preventDefault();
    actualElement.classList.add('dragged');
    document.documentElement.addEventListener('mouseup', onMouseUp);
    document.documentElement.addEventListener('mouseover', onMouseOver);
  }
})
