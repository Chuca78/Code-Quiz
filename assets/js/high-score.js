
const hsTable = document.getElementById("hs-table");
const clearBtn = document.getElementById("clear-hs");

clearBtn.addEventListener('click', clearHs);
generateHsTable();

function generateHsTable() {
  let highScores = localStorage.getItem("scoreList");
  if (highScores) {
    addHsTableRows(highScores);
  } 
}

function addHsTableRows(highScores) {
  highScores = JSON.parse(highScores);
  highScores.forEach(function(scoreItem, index) {
    const rankCell = createRankCell(index + 1);
    const scoreCell = createScoreCell(scoreItem.score);
    const initialsCell = createInitialsCell(scoreItem.initials);
    const highScoreTableRow = createHsTableRow(rankCell, scoreCell, initialsCell);
    hsTable.appendChild(highScoreTableRow);
  });
}

function createRankCell(rank) {
  const rankCell = document.createElement('td');
  rankCell.textContent = `#${rank}`;
  return rankCell;
}

function createScoreCell(score) {
  const scoreCell = document.createElement('td');
  scoreCell.textContent = score;
  return scoreCell;
}

function createInitialsCell(initials) {
  const initialsCell = document.createElement('td');
  initialsCell.textContent = initials;
  return initialsCell;
}

function createHsTableRow(rankCell, scoreCell, initialsCell) {
  const tableRow = document.createElement('tr');
  tableRow.appendChild(rankCell);
  tableRow.appendChild(scoreCell);
  tableRow.appendChild(initialsCell);
  return tableRow;
}

function clearHs() {
  localStorage.setItem('scoreList', []);
  while (hsTable.children.length > 1) {
    hsTable.removeChild(hsTable.lastChild);
  }
}