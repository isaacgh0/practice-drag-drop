let data = null;
let xCoord = 0;
let yCoord = 0;
let targetX = 0;
let targetY = 0;
let differenceX = 0;
let differenceY = 0;

let interval = null;
let time = 0;

let initialX = 0;
let initialY = 0;

let finalX = 0;
let finalY = 0;

const assignDrag = () => {
  const containers = [...document.querySelectorAll('[object-drag]')];

  containers.forEach(object => {
    object.addEventListener('drag', (e) => {
      console.log('drag', e);
      e.preventDefault();
      data = e.target;
      xCoord = e.clientX;
      yCoord = e.clientY;

      if (differenceX === 0 || differenceY === 0) {
        differenceX = xCoord - targetX;
        differenceY = yCoord - targetY;
      }

      if (xCoord === 0 || yCoord === 0) return;

      console.log(xCoord, yCoord, differenceX, differenceY);
      
      data.style.position = 'fixed';
      data.style.top = `${yCoord - differenceY}px`;
      data.style.left = `${xCoord - differenceX}px`;
    });

    object.addEventListener('dragstart', (e) => {
      targetX = e.target.getBoundingClientRect().x;
      targetY = e.target.getBoundingClientRect().y;

      console.log('dragstart', targetX, targetY);
      
      // console.log('dragstart');

      initialX = e.clientX;
      initialY = e.clientY;

      interval = setInterval(() => {
        time += 10;
      }, 10);
    });
    object.addEventListener('dragend', (e) => {
      targetX = 0;
      targetY = 0;

      differenceX = 0;
      differenceY = 0;

      finalX = e.clientX;
      finalY = e.clientY;

      let distance = ((finalX - initialX) ** 2 + (finalY - initialY) ** 2) ** 0.5;
      let speed = distance / time;

      console.log('dragend', time, distance, speed);

      if (speed > 0.5) {
        e.target.style.border = '3px solid red';
        setTimeout(() => {
          e.target.style.border = 'none';
        }, 2000);
      }

      clearInterval(interval);
      time = 0;
      distance = 0;
      speed = 0;
      initialX = 0;
      initialY = 0;
      finalX = 0;
      finalY = 0;

      // data.style.position = 'fixed';
      // data.style.top = `${yCoord}px`;
      // data.style.left = `${xCoord}px`;

      // data = null;
      // xCoord = 0;
      // yCoord = 0;
    });
  });
}

const assignDrop = () => {
  const containers = [...document.querySelectorAll('[container-drop]')];

  containers.forEach(container => {
    container.addEventListener('drop', (e) => {
      // console.log('drop');
      e.preventDefault();
      const children = [...e.currentTarget.children];

      if (children.length === 0) {
        e.currentTarget.appendChild(data);
        return;
      }

      for (const child of children) {
        const cXCoord = child.getBoundingClientRect().x;
        const cYCoord = child.getBoundingClientRect().y;
        const height = child.getBoundingClientRect().height;
        const width = child.getBoundingClientRect().width;

        console.log('child', cXCoord, cYCoord, height, width);
        console.log(xCoord > cXCoord && xCoord < cXCoord + width && yCoord > cYCoord && yCoord < cYCoord + height);
        
        if (xCoord > cXCoord && xCoord < cXCoord + width && yCoord > cYCoord && yCoord < cYCoord + height) {
          e.currentTarget.insertBefore(data, child);
          return;
        }
      }

      e.currentTarget.appendChild(data);

      // const children = [...e.currentTarget.children];
      // const newChild = children.sort((a, b) => a.innerHTML.localeCompare(b.innerHTML));

      // e.currentTarget.innerHTML = '';
      // newChild.forEach(child => e.currentTarget.appendChild(child));
    });

    container.addEventListener('dragover', (e) => {
      e.preventDefault();
      // console.log('dragover');
    });

    container.addEventListener('dragenter', (e) => {
      e.preventDefault();
      // console.log('dragenter');
    });

    container.addEventListener('dragleave', (e) => {
      e.preventDefault();
      // console.log('dragleave');
    });
  });
}

assignDrag();
assignDrop();
