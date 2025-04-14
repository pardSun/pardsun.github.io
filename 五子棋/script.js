// 棋盘大小
const BOARD_SIZE = 15;
// 网格大小
const GRID_SIZE = 40;
// 获取画布元素
const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');

// 初始化棋盘
const board = Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(0));
// 当前玩家，1 表示黑棋，2 表示白棋
let currentPlayer = 1;

// 绘制棋盘
function drawBoard() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < BOARD_SIZE; i++) {
    ctx.beginPath();
    ctx.moveTo(GRID_SIZE, GRID_SIZE * (i + 1));
    ctx.lineTo(GRID_SIZE * BOARD_SIZE, GRID_SIZE * (i + 1));
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(GRID_SIZE * (i + 1), GRID_SIZE);
    ctx.lineTo(GRID_SIZE * (i + 1), GRID_SIZE * BOARD_SIZE);
    ctx.stroke();
  }
  ctx.strokeRect(GRID_SIZE, GRID_SIZE, GRID_SIZE * BOARD_SIZE, GRID_SIZE * BOARD_SIZE);
}

// 绘制棋子
function drawPieces() {
  for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_SIZE; j++) {
      if (board[i][j] === 1) {
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.arc(GRID_SIZE * (j + 1), GRID_SIZE * (i + 1), 18, 0, 2 * Math.PI);
        ctx.fill();
      } else if (board[i][j] === 2) {
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(GRID_SIZE * (j + 1), GRID_SIZE * (i + 1), 18, 0, 2 * Math.PI);
        ctx.fill();
      }
    }
  }
}

// 检查是否有五子连成一线
function checkWin(x, y, player) {
  const directions = [
    [1, 0],
    [0, 1],
    [1, 1],
    [1, -1]
  ];
  for (const [dx, dy] of directions) {
    let count = 1;
    // 正向检查
    for (let i = 1; i < 5; i++) {
      const newX = x + i * dx;
      const newY = y + i * dy;
      if (newX >= 0 && newX < BOARD_SIZE && newY >= 0 && newY < BOARD_SIZE && board[newX][newY] === player) {
        count++;
      } else {
        break;
      }
    }
    // 反向检查
    for (let i = 1; i < 5; i++) {
      const newX = x - i * dx;
      const newY = y - i * dy;
      if (newX >= 0 && newX < BOARD_SIZE && newY >= 0 && newY < BOARD_SIZE && board[newX][newY] === player) {
        count++;
      } else {
        break;
      }
    }
    if (count >= 5) {
      return true;
    }
  }
  return false;
}

// 处理鼠标点击事件
canvas.addEventListener('click', function (event) {
  const rect = canvas.getBoundingClientRect();
  // 计算鼠标点击位置相对于画布左上角的坐标
  const clickX = event.clientX - rect.left;
  const clickY = event.clientY - rect.top;
  // 计算最近的交叉点坐标
  const col = Math.round((clickX - GRID_SIZE) / GRID_SIZE);
  const row = Math.round((clickY - GRID_SIZE) / GRID_SIZE);

  if (col >= 0 && col < BOARD_SIZE && row >= 0 && row < BOARD_SIZE && board[row][col] === 0) {
    board[row][col] = currentPlayer;
    if (checkWin(row, col, currentPlayer)) {
      alert(`玩家 ${currentPlayer === 1 ? '黑棋' : '白棋'} 获胜！`);
    } else {
      currentPlayer = 3 - currentPlayer;
    }
    drawBoard();
    drawPieces();
  }
});

// 初始化绘制
drawBoard();
drawPieces();