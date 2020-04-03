(function () {
  const data = [
    ['李赢', '巩义'],
    ['杨柳', 'lottery', '李靖怡'],
    ['徐凯鸿', '王伟', '孔明浩'],
  ];
  function createCell(name, type = 'cell') {
    const cell = document.createElement('div');
    cell.classList.add(type);
    cell.innerText = name;
    return cell;
  }

  function showResult(target) {
    alert('恭喜: ' + cells[target].innerText);
  }

  function createLotteryButton() {
    const btn = createCell('点名', 'lot-btn');
    btn.addEventListener('click', () => drawLottery(showResult));
    return btn;
  }

  function initApp() {
    const app = document.querySelector('#app');
    const lottery = [];
    const cntr = document.createElement('div');
    for (let r = 0; r < data.length; r++) {
      const row = document.createElement('div');
      row.classList.add('row');
      cntr.appendChild(row);
      for (let c of data[r]) {
        if (c === 'lottery') {
          const btn = createLotteryButton();
          row.appendChild(btn);
        } else if (c) {
          const cell = createCell(c);
          lottery.push(cell);
          row.appendChild(cell);
        } else {
          const cell = createCell('', 'cell-empty');
          row.appendChild(cell);
        }
      }
    }
    app.appendChild(cntr);
    return lottery;
  }

  const cells = initApp();
  let curAct = 0;
  let prevAct = curAct;
  let isDrawing = false;

  function drawLottery(fn) {
    if (isDrawing) return;
    isDrawing = true;
    // 清除上次抽奖状态
    cells.forEach((v) => {
      if (v.classList.contains('act')) {
        v.classList.remove('act');
      }
    });

    const target = Math.floor(Math.random() * cells.length);
    const turns = Math.floor(Math.random() * 5 + 2);
    const waitDuration = 200; // 每个格子的基础等待时间
    prevAct = curAct;
    for (let i = 0; i < turns + 1; i++) {
      for (let c = 0; c < cells.length; c++) {
        setTimeout(() => {
          cells[prevAct].classList.remove('act');
          cells[curAct].classList.add('act');
          prevAct = curAct;
          curAct = (curAct + 1) % cells.length;
        }, waitDuration * cells.length * i + c * waitDuration);
        if (i === turns && (curAct + c) % cells.length === target) {
          setTimeout(() => {
            isDrawing = false;
            fn(target);
          }, waitDuration * cells.length * i + c * waitDuration + 1000);
          break;
        }
      }
    }
  }
})();
