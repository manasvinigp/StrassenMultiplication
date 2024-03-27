document.getElementById("multiply-1").addEventListener("click", () => {
  rowA = parseInt(document.getElementById("rowA").value);
  colA = parseInt(document.getElementById("colA").value);
  if (rowA != colA) {
    alert("Matrix A is not a square Matrix\nNote that Strassen's is efficient for square matrices only");
  }
  rowB = parseInt(document.getElementById("rowB").value);
  colB = parseInt(document.getElementById("colB").value);
  if (rowB != colB) {
    alert("Matrix B is not a square Matrix\nNote that Strassen's is efficient for square matrices only");
  }
  if (!isPowerOfTwo(rowA) || !isPowerOfTwo(colA) || !isPowerOfTwo(rowB) || !isPowerOfTwo(colB)) {
    swal("Dimension tip:Strassen's is efficient for dimensions in powers of 2");
}
if(rowA>4 || colA>4||rowB>4 || colB>4){
  alert("Sorry! Our current prototype supports maximum dimension of 4");
}
  
  function isPowerOfTwo(n) {
      return (n & (n - 1)) === 0 && n !== 0;
  }
  

  if (colA != rowB) {
    swal(
      "Error!!",
      "Rows of matrix A is not matching with columns of Matrix B",
      "error"
    );
  } else {
    document.querySelector(".container").style.marginTop = "50px";
    document.querySelector(".matrices").style.display = "flex";
    createMat(rowA, colA, document.querySelector(".matA>.matrix"));
    createMat(rowB, colB, document.querySelector(".matB>.matrix"));
    document.querySelector("#multiply-1").style.display = "none";
    document.querySelector("#multiply-1").parentNode.remove();
    document.querySelector("#multiply-2").style.display = "block";
  }
});


function createMat(m, n, element) {
  const lB = document.createElement("div");
  lB.setAttribute("class", "leftBracket");
  const rB = document.createElement("div");
  rB.setAttribute("class", "rightBracket");
  element.appendChild(lB);
  for (let i = 0; i < m; i++) {
    const row = document.createElement("div");
    row.setAttribute("class", "row");
    for (let j = 0; j < n; j++) {
      const col = document.createElement("div");
      col.setAttribute("class", "col");
      const input = document.createElement("input");
      input.setAttribute("class", "cell row" + i + "col" + j);
      input.value = Math.floor((Math.random() * 10) % 10);
      input.style.fontSize = "24px";
      input.style.margin = "0px";
      col.appendChild(input);
      row.append(col);
    }
    element.append(row);
  }
  element.appendChild(rB);
}

document.getElementById("multiply-2").addEventListener("click", () => {
  document.querySelector(".hid").style.display = "block";
  document.querySelectorAll(".matrices")[1].style.display = "flex";
  mat1 = createPMatrix(1);
  mat2 = createPMatrix(2);
  document.querySelector("#multiply-2").style.display = "none";
  document.querySelector("#multiply-2").parentNode.remove();
  document.querySelector("#multiply-3").style.display = "block";
});

function createPMatrix(n) {
  let matrix = [];
  const lB = document.createElement("div");
  lB.setAttribute("class", "leftBracket");
  const rB = document.createElement("div");
  rB.setAttribute("class", "rightBracket");
  let mat = document.querySelector(".out" + n + ">.matrix");
  let selector;
  if (n == 1) {
    selector = ".matA>.matrix>.row";
  } else {
    selector = ".matB>.matrix>.row";
  }
  mat.appendChild(lB);
  for (let i = 0; i < 4; i++) {
    let rowMatrix = [];
    const row = document.createElement("div");
    row.setAttribute("class", "row");
    const selRow = document.querySelectorAll(selector)[i];
    for (let j = 0; j < 4; j++) {
      const input = document.createElement("p");
      input.setAttribute("class", "cell row" + i + "col" + j);
      input.style.fontSize = "24px";
      input.style.margin = "0px";
      if (selRow == undefined) {
        input.innerHTML = "0";
        rowMatrix[j] = 0;
      } else {
        const cell = selRow.querySelector(".col>.row" + i + "col" + j);
        if (cell == undefined) {
          input.innerHTML = "0";
          rowMatrix[j] = 0;
        } else {
          input.innerHTML = cell.value;
          rowMatrix[j] = parseInt(cell.value);
        }
      }
      const col = document.createElement("div");
      col.setAttribute("class", "col");
      col.appendChild(input);
      row.append(col);
    }
    mat.append(row);
    matrix.push(rowMatrix);
  }
  mat.appendChild(rB);
  return matrix;
}

document.getElementById("multiply-3").addEventListener("click", () => {
  document.querySelectorAll(".hid")[1].style.display = "block";
  document.querySelectorAll(".matrices")[2].style.display = "flex";
  designMatrix(1, 2);
  designMatrix(2, 2);
  finalize();
  document.querySelector("#multiply-3").style.display = "none";
  document.querySelector("#multiply-3").parentNode.remove();
  document.querySelector("#multiply-4").style.display = "block";
});

function designMatrix(n, m) {
  const lB = document.createElement("div");
  lB.setAttribute("class", "leftBracket");
  const rB = document.createElement("div");
  rB.setAttribute("class", "rightBracket");
  let sel1 = document.querySelector(".output-" + m + ">.matrices>.out" + n);
  let mat = sel1.querySelector("tr").querySelector(".out" + n + ">.matrix");
  let selector;
  if (n == 1) {
    selector = ".matA>.matrix>.row";
  } else {
    selector = ".matB>.matrix>.row";
  }
  mat.appendChild(lB);
  for (let i = 0; i < 4; i++) {
    const row = document.createElement("div");
    row.setAttribute("class", "row");
    const selRow = document.querySelectorAll(selector)[i];
    for (let j = 0; j < 4; j++) {
      const input = document.createElement("p");
      input.setAttribute("class", "cell row" + i + "col" + j);
      input.style.fontSize = "24px";
      input.style.margin = "0px";
      input.style.backgroundColor = getColor(n, i, j);
      if (selRow == undefined) {
        input.innerHTML = "0";
      } else {
        const cell = selRow.querySelector(".col>.row" + i + "col" + j);
        if (cell == undefined) input.innerHTML = "0";
        else input.innerHTML = cell.value;
      }
      const col = document.createElement("div");
      col.setAttribute("class", "col");
      col.appendChild(input);
      row.append(col);
    }
    mat.append(row);
  }
  mat.appendChild(rB);
}

function getColor(n, i, j) {
  if (n == 1) {
    if ((i == 0 || i == 1) && (j == 0 || j == 1)) return "#fee08b";
    else if ((i == 0 || i == 1) && (j == 2 || j == 3)) return "#f46d43";
    else if ((i == 2 || i == 3) && (j == 0 || j == 1)) return "#fdae61";
    else if ((i == 2 || i == 3) && (j == 2 || j == 3)) return "#d53e4f";
  } else {
    if ((i == 0 || i == 1) && (j == 0 || j == 1)) return "#e6f598";
    else if ((i == 0 || i == 1) && (j == 2 || j == 3)) return "#66c2a5";
    else if ((i == 2 || i == 3) && (j == 0 || j == 1)) return "#abdda4";
    else if ((i == 2 || i == 3) && (j == 2 || j == 3)) return "#3288bd";
  }
}

document.getElementById("multiply-4").addEventListener("click", () => {
  document.querySelectorAll(".hid")[2].style.display = "block";
  document.querySelectorAll(".matrices")[3].style.display = "flex";
  document.querySelector(".lineMat1").style.display = "flex";
  document.querySelector("#multiply-4").style.display = "none";
  document.querySelector("#multiply-4").parentNode.remove();
  document.querySelector("#multiply-5").style.display = "block";
});

let count = 0;
let count2 = 0;

document.getElementById("multiply-5").addEventListener("click", () => {
  if (count == 0) {
    document.querySelectorAll(".hid")[3].style.display = "block";
    linemat1();
  }
  if (count == 1) {
    document.querySelectorAll(".matrices")[4].style.display = "flex";
    document.querySelector(".lineMat2").style.display = "flex";
    document.querySelectorAll(".hid")[4].style.display = "block";
    linemat2();
  }
  if (count == 2) {
    document.querySelectorAll(".matrices")[5].style.display = "flex";
    document.querySelector(".lineMat3").style.display = "flex";
    document.querySelectorAll(".hid")[5].style.display = "block";
    linemat3();
  }
  if (count == 3) {
    document.querySelectorAll(".matrices")[6].style.display = "flex";
    document.querySelector(".lineMat4").style.display = "flex";
    document.querySelectorAll(".hid")[6].style.display = "block";
    linemat4();
  }
  if (count == 4) {
    document.querySelectorAll(".matrices")[7].style.display = "flex";
    document.querySelector(".lineMat5").style.display = "flex";
    document.querySelectorAll(".hid")[7].style.display = "block";
    linemat5();
  }
  if (count == 5) {
    document.querySelectorAll(".matrices")[8].style.display = "flex";
    document.querySelector(".lineMat6").style.display = "flex";
    document.querySelectorAll(".hid")[8].style.display = "block";
    linemat6();
  }
  if (count == 6) {
    document.querySelectorAll(".matrices")[9].style.display = "flex";
    document.querySelector(".lineMat7").style.display = "flex";
    document.querySelectorAll(".hid")[9].style.display = "block";
    linemat7();
  }
  if (count >= 7) {
    document.querySelectorAll(".hid")[10].style.display = "block";
    document.querySelectorAll(".matrices")[10].style.display = "flex";
    document.querySelector("#multiply-5").style.display = "none";
    document.querySelector("#multiply-5").parentNode.remove();
    document.querySelector("#multiply-6").style.display = "block";
  }
  count++;
});

function linemat1() {
  let matArr = document.querySelectorAll(".lineMat1>.matrix");
  for (let i = 0; i < 2; i++) {
    const row = document.createElement("div");
    row.setAttribute("class", "row");
    for (let j = 0; j < 2; j++) {
      const input = document.createElement("p");
      input.setAttribute("class", "cell");
      input.style.fontSize = "24px";
      input.style.margin = "0px";
      input.style.backgroundColor = "#fee08b";
      input.innerHTML = a11[i][j];
      const col = document.createElement("div");
      col.setAttribute("class", "col");
      col.appendChild(input);
      row.append(col);
    }
    matArr[1].append(row);
  }
  for (let i = 0; i < 2; i++) {
    const row = document.createElement("div");
    row.setAttribute("class", "row");
    for (let j = 0; j < 2; j++) {
      const input = document.createElement("p");
      input.setAttribute("class", "cell");
      input.style.fontSize = "24px";
      input.style.margin = "0px";
      input.style.backgroundColor = "#d53e4f";
      input.innerHTML = a22[i][j];
      const col = document.createElement("div");
      col.setAttribute("class", "col");
      col.appendChild(input);
      row.append(col);
    }
    matArr[2].append(row);
  }
  for (let i = 0; i < 2; i++) {
    const row = document.createElement("div");
    row.setAttribute("class", "row");
    for (let j = 0; j < 2; j++) {
      const input = document.createElement("p");
      input.setAttribute("class", "cell");
      input.style.fontSize = "24px";
      input.style.margin = "0px";
      input.style.backgroundColor = "#e6f598";
      input.innerHTML = b11[i][j];
      const col = document.createElement("div");
      col.setAttribute("class", "col");
      col.appendChild(input);
      row.append(col);
    }
    matArr[5].append(row);
  }
  for (let i = 0; i < 2; i++) {
    const row = document.createElement("div");
    row.setAttribute("class", "row");
    for (let j = 0; j < 2; j++) {
      const input = document.createElement("p");
      input.setAttribute("class", "cell");
      input.style.fontSize = "24px";
      input.style.margin = "0px";
      input.style.backgroundColor = "#3288bd";
      input.innerHTML = b22[i][j];
      const col = document.createElement("div");
      col.setAttribute("class", "col");
      col.appendChild(input);
      row.append(col);
    }
    matArr[6].append(row);
  }
  for (let i = 0; i < 2; i++) {
    const row = document.createElement("div");
    row.setAttribute("class", "row");
    for (let j = 0; j < 2; j++) {
      const input = document.createElement("p");
      input.setAttribute("class", "cell");
      input.style.fontSize = "24px";
      input.style.margin = "0px";
      // input.style.backgroundColor = "#e6f598";
      input.innerHTML = m1[i][j];
      const col = document.createElement("div");
      col.setAttribute("class", "col");
      col.appendChild(input);
      row.append(col);
    }
    matArr[8].append(row);
  }
}

function linemat2() {
  let matArr = document.querySelectorAll(".lineMat2>.matrix");
  for (let i = 0; i < 2; i++) {
    const row = document.createElement("div");
    row.setAttribute("class", "row");
    for (let j = 0; j < 2; j++) {
      const input = document.createElement("p");
      input.setAttribute("class", "cell");
      input.style.fontSize = "24px";
      input.style.margin = "0px";
      input.style.backgroundColor = "#fdae61";
      input.innerHTML = a21[i][j];
      const col = document.createElement("div");
      col.setAttribute("class", "col");
      col.appendChild(input);
      row.append(col);
    }
    matArr[1].append(row);
  }
  for (let i = 0; i < 2; i++) {
    const row = document.createElement("div");
    row.setAttribute("class", "row");
    for (let j = 0; j < 2; j++) {
      const input = document.createElement("p");
      input.setAttribute("class", "cell");
      input.style.fontSize = "24px";
      input.style.margin = "0px";
      input.style.backgroundColor = "#d53e4f";
      input.innerHTML = a22[i][j];
      const col = document.createElement("div");
      col.setAttribute("class", "col");
      col.appendChild(input);
      row.append(col);
    }
    matArr[2].append(row);
  }
  for (let i = 0; i < 2; i++) {
    const row = document.createElement("div");
    row.setAttribute("class", "row");
    for (let j = 0; j < 2; j++) {
      const input = document.createElement("p");
      input.setAttribute("class", "cell");
      input.style.fontSize = "24px";
      input.style.margin = "0px";
      input.style.backgroundColor = "#e6f598";
      input.innerHTML = b11[i][j];
      const col = document.createElement("div");
      col.setAttribute("class", "col");
      col.appendChild(input);
      row.append(col);
    }
    matArr[4].append(row);
  }
  for (let i = 0; i < 2; i++) {
    const row = document.createElement("div");
    row.setAttribute("class", "row");
    for (let j = 0; j < 2; j++) {
      const input = document.createElement("p");
      input.setAttribute("class", "cell");
      input.style.fontSize = "24px";
      input.style.margin = "0px";
      input.innerHTML = m2[i][j];
      const col = document.createElement("div");
      col.setAttribute("class", "col");
      col.appendChild(input);
      row.append(col);
    }
    matArr[5].append(row);
  }
}

function linemat3() {
  let matArr = document.querySelectorAll(".lineMat3>.matrix");
  for (let i = 0; i < 2; i++) {
    const row = document.createElement("div");
    row.setAttribute("class", "row");
    for (let j = 0; j < 2; j++) {
      const input = document.createElement("p");
      input.setAttribute("class", "cell");
      input.style.fontSize = "24px";
      input.style.margin = "0px";
      input.style.backgroundColor = "#fee08b";
      input.innerHTML = a11[i][j];
      const col = document.createElement("div");
      col.setAttribute("class", "col");
      col.appendChild(input);
      row.append(col);
    }
    matArr[0].append(row);
  }
  for (let i = 0; i < 2; i++) {
    const row = document.createElement("div");
    row.setAttribute("class", "row");
    for (let j = 0; j < 2; j++) {
      const input = document.createElement("p");
      input.setAttribute("class", "cell");
      input.style.fontSize = "24px";
      input.style.margin = "0px";
      input.style.backgroundColor = "#66c2a5";
      input.innerHTML = b12[i][j];
      const col = document.createElement("div");
      col.setAttribute("class", "col");
      col.appendChild(input);
      row.append(col);
    }
    matArr[2].append(row);
  }
  for (let i = 0; i < 2; i++) {
    const row = document.createElement("div");
    row.setAttribute("class", "row");
    for (let j = 0; j < 2; j++) {
      const input = document.createElement("p");
      input.setAttribute("class", "cell");
      input.style.fontSize = "24px";
      input.style.margin = "0px";
      input.style.backgroundColor = "#3288bd";
      input.innerHTML = b22[i][j];
      const col = document.createElement("div");
      col.setAttribute("class", "col");
      col.appendChild(input);
      row.append(col);
    }
    matArr[3].append(row);
  }
  for (let i = 0; i < 2; i++) {
    const row = document.createElement("div");
    row.setAttribute("class", "row");
    for (let j = 0; j < 2; j++) {
      const input = document.createElement("p");
      input.setAttribute("class", "cell");
      input.style.fontSize = "24px";
      input.style.margin = "0px";
      input.innerHTML = m3[i][j];
      const col = document.createElement("div");
      col.setAttribute("class", "col");
      col.appendChild(input);
      row.append(col);
    }
    matArr[5].append(row);
  }
}

function linemat4() {
  let matArr = document.querySelectorAll(".lineMat4>.matrix");
  for (let i = 0; i < 2; i++) {
    const row = document.createElement("div");
    row.setAttribute("class", "row");
    for (let j = 0; j < 2; j++) {
      const input = document.createElement("p");
      input.setAttribute("class", "cell");
      input.style.fontSize = "24px";
      input.style.margin = "0px";
      input.style.backgroundColor = "#d53e4f";
      input.innerHTML = a22[i][j];
      const col = document.createElement("div");
      col.setAttribute("class", "col");
      col.appendChild(input);
      row.append(col);
    }
    matArr[0].append(row);
  }
  for (let i = 0; i < 2; i++) {
    const row = document.createElement("div");
    row.setAttribute("class", "row");
    for (let j = 0; j < 2; j++) {
      const input = document.createElement("p");
      input.setAttribute("class", "cell");
      input.style.fontSize = "24px";
      input.style.margin = "0px";
      input.style.backgroundColor = "#abdda4";
      input.innerHTML = b21[i][j];
      const col = document.createElement("div");
      col.setAttribute("class", "col");
      col.appendChild(input);
      row.append(col);
    }
    matArr[2].append(row);
  }
  for (let i = 0; i < 2; i++) {
    const row = document.createElement("div");
    row.setAttribute("class", "row");
    for (let j = 0; j < 2; j++) {
      const input = document.createElement("p");
      input.setAttribute("class", "cell");
      input.style.fontSize = "24px";
      input.style.margin = "0px";
      input.style.backgroundColor = "#e6f598";
      input.innerHTML = b11[i][j];
      const col = document.createElement("div");
      col.setAttribute("class", "col");
      col.appendChild(input);
      row.append(col);
    }
    matArr[3].append(row);
  }
  for (let i = 0; i < 2; i++) {
    const row = document.createElement("div");
    row.setAttribute("class", "row");
    for (let j = 0; j < 2; j++) {
      const input = document.createElement("p");
      input.setAttribute("class", "cell");
      input.style.fontSize = "24px";
      input.style.margin = "0px";
      input.innerHTML = m4[i][j];
      const col = document.createElement("div");
      col.setAttribute("class", "col");
      col.appendChild(input);
      row.append(col);
    }
    matArr[5].append(row);
  }
}

function linemat5() {
  let matArr = document.querySelectorAll(".lineMat5>.matrix");
  for (let i = 0; i < 2; i++) {
    const row = document.createElement("div");
    row.setAttribute("class", "row");
    for (let j = 0; j < 2; j++) {
      const input = document.createElement("p");
      input.setAttribute("class", "cell");
      input.style.fontSize = "24px";
      input.style.margin = "0px";
      input.style.backgroundColor = "#fee08b";
      input.innerHTML = a11[i][j];
      const col = document.createElement("div");
      col.setAttribute("class", "col");
      col.appendChild(input);
      row.append(col);
    }
    matArr[1].append(row);
  }
  for (let i = 0; i < 2; i++) {
    const row = document.createElement("div");
    row.setAttribute("class", "row");
    for (let j = 0; j < 2; j++) {
      const input = document.createElement("p");
      input.setAttribute("class", "cell");
      input.style.fontSize = "24px";
      input.style.margin = "0px";
      input.style.backgroundColor = "#f46d43";
      input.innerHTML = a12[i][j];
      const col = document.createElement("div");
      col.setAttribute("class", "col");
      col.appendChild(input);
      row.append(col);
    }
    matArr[2].append(row);
  }
  for (let i = 0; i < 2; i++) {
    const row = document.createElement("div");
    row.setAttribute("class", "row");
    for (let j = 0; j < 2; j++) {
      const input = document.createElement("p");
      input.setAttribute("class", "cell");
      input.style.fontSize = "24px";
      input.style.margin = "0px";
      input.style.backgroundColor = "#3288bd";
      input.innerHTML = b22[i][j];
      const col = document.createElement("div");
      col.setAttribute("class", "col");
      col.appendChild(input);
      row.append(col);
    }
    matArr[4].append(row);
  }
  for (let i = 0; i < 2; i++) {
    const row = document.createElement("div");
    row.setAttribute("class", "row");
    for (let j = 0; j < 2; j++) {
      const input = document.createElement("p");
      input.setAttribute("class", "cell");
      input.style.fontSize = "24px";
      input.style.margin = "0px";
      input.innerHTML = m5[i][j];
      const col = document.createElement("div");
      col.setAttribute("class", "col");
      col.appendChild(input);
      row.append(col);
    }
    matArr[5].append(row);
  }
}

function linemat6() {
  let matArr = document.querySelectorAll(".lineMat6>.matrix");
  for (let i = 0; i < 2; i++) {
    const row = document.createElement("div");
    row.setAttribute("class", "row");
    for (let j = 0; j < 2; j++) {
      const input = document.createElement("p");
      input.setAttribute("class", "cell");
      input.style.fontSize = "24px";
      input.style.margin = "0px";
      input.style.backgroundColor = "#fdae61";
      input.innerHTML = a21[i][j];
      const col = document.createElement("div");
      col.setAttribute("class", "col");
      col.appendChild(input);
      row.append(col);
    }
    matArr[1].append(row);
  }
  for (let i = 0; i < 2; i++) {
    const row = document.createElement("div");
    row.setAttribute("class", "row");
    for (let j = 0; j < 2; j++) {
      const input = document.createElement("p");
      input.setAttribute("class", "cell");
      input.style.fontSize = "24px";
      input.style.margin = "0px";
      input.style.backgroundColor = "#fee08b";
      input.innerHTML = a11[i][j];
      const col = document.createElement("div");
      col.setAttribute("class", "col");
      col.appendChild(input);
      row.append(col);
    }
    matArr[2].append(row);
  }
  for (let i = 0; i < 2; i++) {
    const row = document.createElement("div");
    row.setAttribute("class", "row");
    for (let j = 0; j < 2; j++) {
      const input = document.createElement("p");
      input.setAttribute("class", "cell");
      input.style.fontSize = "24px";
      input.style.margin = "0px";
      input.style.backgroundColor = "#e6f598";
      input.innerHTML = b11[i][j];
      const col = document.createElement("div");
      col.setAttribute("class", "col");
      col.appendChild(input);
      row.append(col);
    }
    matArr[5].append(row);
  }
  for (let i = 0; i < 2; i++) {
    const row = document.createElement("div");
    row.setAttribute("class", "row");
    for (let j = 0; j < 2; j++) {
      const input = document.createElement("p");
      input.setAttribute("class", "cell");
      input.style.fontSize = "24px";
      input.style.margin = "0px";
      input.style.backgroundColor = "#66c2a5";
      input.innerHTML = b12[i][j];
      const col = document.createElement("div");
      col.setAttribute("class", "col");
      col.appendChild(input);
      row.append(col);
    }
    matArr[6].append(row);
  }
  for (let i = 0; i < 2; i++) {
    const row = document.createElement("div");
    row.setAttribute("class", "row");
    for (let j = 0; j < 2; j++) {
      const input = document.createElement("p");
      input.setAttribute("class", "cell");
      input.style.fontSize = "24px";
      input.style.margin = "0px";
      input.innerHTML = m6[i][j];
      const col = document.createElement("div");
      col.setAttribute("class", "col");
      col.appendChild(input);
      row.append(col);
    }
    matArr[8].append(row);
  }
}

function linemat7() {
  let matArr = document.querySelectorAll(".lineMat7>.matrix");
  for (let i = 0; i < 2; i++) {
    const row = document.createElement("div");
    row.setAttribute("class", "row");
    for (let j = 0; j < 2; j++) {
      const input = document.createElement("p");
      input.setAttribute("class", "cell");
      input.style.fontSize = "24px";
      input.style.margin = "0px";
      input.style.backgroundColor = "#f46d43";
      input.innerHTML = a12[i][j];
      const col = document.createElement("div");
      col.setAttribute("class", "col");
      col.appendChild(input);
      row.append(col);
    }
    matArr[1].append(row);
  }
  for (let i = 0; i < 2; i++) {
    const row = document.createElement("div");
    row.setAttribute("class", "row");
    for (let j = 0; j < 2; j++) {
      const input = document.createElement("p");
      input.setAttribute("class", "cell");
      input.style.fontSize = "24px";
      input.style.margin = "0px";
      input.style.backgroundColor = "#d53e4f";
      input.innerHTML = a22[i][j];
      const col = document.createElement("div");
      col.setAttribute("class", "col");
      col.appendChild(input);
      row.append(col);
    }
    matArr[2].append(row);
  }
  for (let i = 0; i < 2; i++) {
    const row = document.createElement("div");
    row.setAttribute("class", "row");
    for (let j = 0; j < 2; j++) {
      const input = document.createElement("p");
      input.setAttribute("class", "cell");
      input.style.fontSize = "24px";
      input.style.margin = "0px";
      input.style.backgroundColor = "#abdda4";
      input.innerHTML = b21[i][j];
      const col = document.createElement("div");
      col.setAttribute("class", "col");
      col.appendChild(input);
      row.append(col);
    }
    matArr[5].append(row);
  }
  for (let i = 0; i < 2; i++) {
    const row = document.createElement("div");
    row.setAttribute("class", "row");
    for (let j = 0; j < 2; j++) {
      const input = document.createElement("p");
      input.setAttribute("class", "cell");
      input.style.fontSize = "24px";
      input.style.margin = "0px";
      input.style.backgroundColor = "#3288bd";
      input.innerHTML = b22[i][j];
      const col = document.createElement("div");
      col.setAttribute("class", "col");
      col.appendChild(input);
      row.append(col);
    }
    matArr[6].append(row);
  }
  for (let i = 0; i < 2; i++) {
    const row = document.createElement("div");
    row.setAttribute("class", "row");
    for (let j = 0; j < 2; j++) {
      const input = document.createElement("p");
      input.setAttribute("class", "cell");
      input.style.fontSize = "24px";
      input.style.margin = "0px";
      input.innerHTML = m7[i][j];
      const col = document.createElement("div");
      col.setAttribute("class", "col");
      col.appendChild(input);
      row.append(col);
    }
    matArr[8].append(row);
  }
}
function prefinal() {
  if (rowA < 4 || colB < 4) {
    
    document.querySelectorAll(".hid")[16].style.display = "block";
    document.querySelector("#multiply-7").style.display = "block";
    document.querySelector("td.out-final-1").style.display = "flex";
    let mat = document.querySelector(".mat-final-1>.matrix");
    for (let i = 0; i < 4; i++) {
      const row = document.createElement("div");
      row.setAttribute("class", "row");
      for (let j = 0; j < 4; j++) {
        const input = document.createElement("p");
        input.setAttribute("class", "cell");
        input.style.fontSize = "24px";
        input.style.margin = "0px";
        // input.style.backgroundColor = "#fee08b";
        input.innerHTML = c[i][j];
        const col = document.createElement("div");
        col.setAttribute("class", "col");
        col.appendChild(input);
        row.append(col);
      }
      mat.append(row);
    }
  } else {
    document.querySelectorAll(".matrices")[15].style.display = "flex";
    document.querySelectorAll(".hid")[17].style.display = "block";
    document.querySelector("td.out-final-2").style.display = "flex";
    let mat = document.querySelector(".mat-final-2>.matrix");
    for (let i = 0; i < 4; i++) {
      const row = document.createElement("div");
      row.setAttribute("class", "row");
      for (let j = 0; j < 4; j++) {
        const input = document.createElement("p");
        input.setAttribute("class", "cell");
        input.style.fontSize = "24px";
        input.style.margin = "0px";
        // input.style.backgroundColor = "#fee08b";
        input.innerHTML = c[i][j];
        const col = document.createElement("div");
        col.setAttribute("class", "col");
        col.appendChild(input);
        row.append(col);
      }
      mat.append(row);
    }
    document.querySelector("#multiply-7").style.display = "none";
    document.querySelector("#multiply-7").parentNode.remove();
  }
}


document.getElementById("multiply-6").addEventListener("click", () => {
  if (count2 == 0) {
    document.querySelectorAll(".matrices")[10].style.display = "flex";
    document.querySelector(".lineMat11").style.display = "flex";
    document.querySelectorAll(".hid")[11].style.display = "block";
    linemat11();
  }
  if (count2 == 1) {
    document.querySelectorAll(".matrices")[11].style.display = "flex";
    document.querySelector(".lineMat12").style.display = "flex";
    document.querySelectorAll(".hid")[12].style.display = "block";
    linemat12();
  }
  if (count2 == 2) {
    document.querySelectorAll(".matrices")[12].style.display = "flex";
    document.querySelector(".lineMat21").style.display = "flex";
    document.querySelectorAll(".hid")[13].style.display = "block";
    linemat21();
  }
  if (count2 == 3) {
    document.querySelectorAll(".matrices")[13].style.display = "flex";
    document.querySelector(".lineMat22").style.display = "flex";
    document.querySelectorAll(".hid")[14].style.display = "block";
    linemat22();
  }
  if (count2 >= 4) {
    document.querySelectorAll(".hid")[15].style.display = "block";
    document.querySelectorAll(".matrices")[14].style.display = "flex";
    document.querySelector("#multiply-6").style.display = "none";
    document.querySelector("#multiply-6").parentNode.remove();
    prefinal();
  }
  count2++;
});

function linemat11() {
  let matArr = document.querySelectorAll(".lineMat11>.matrix");
  for (let i = 0; i < 2; i++) {
    const row = document.createElement("div");
    row.setAttribute("class", "row");
    for (let j = 0; j < 2; j++) {
      const input = document.createElement("p");
      input.setAttribute("class", "cell");
      input.style.fontSize = "24px";
      input.style.margin = "0px";
      // input.style.backgroundColor = "#fee08b";
      input.innerHTML = m1[i][j];
      const col = document.createElement("div");
      col.setAttribute("class", "col");
      col.appendChild(input);
      row.append(col);
    }
    matArr[0].append(row);
  }
  for (let i = 0; i < 2; i++) {
    const row = document.createElement("div");
    row.setAttribute("class", "row");
    for (let j = 0; j < 2; j++) {
      const input = document.createElement("p");
      input.setAttribute("class", "cell");
      input.style.fontSize = "24px";
      input.style.margin = "0px";
      // input.style.backgroundColor = "#d53e4f";
      input.innerHTML = m4[i][j];
      const col = document.createElement("div");
      col.setAttribute("class", "col");
      col.appendChild(input);
      row.append(col);
    }
    matArr[1].append(row);
  }
  for (let i = 0; i < 2; i++) {
    const row = document.createElement("div");
    row.setAttribute("class", "row");
    for (let j = 0; j < 2; j++) {
      const input = document.createElement("p");
      input.setAttribute("class", "cell");
      input.style.fontSize = "24px";
      input.style.margin = "0px";
      // input.style.backgroundColor = "#e6f598";
      input.innerHTML = m5[i][j];
      const col = document.createElement("div");
      col.setAttribute("class", "col");
      col.appendChild(input);
      row.append(col);
    }
    matArr[2].append(row);
  }
  for (let i = 0; i < 2; i++) {
    const row = document.createElement("div");
    row.setAttribute("class", "row");
    for (let j = 0; j < 2; j++) {
      const input = document.createElement("p");
      input.setAttribute("class", "cell");
      input.style.fontSize = "24px";
      input.style.margin = "0px";
      // input.style.backgroundColor = "#3288bd";
      input.innerHTML = m7[i][j];
      const col = document.createElement("div");
      col.setAttribute("class", "col");
      col.appendChild(input);
      row.append(col);
    }
    matArr[3].append(row);
  }
  for (let i = 0; i < 2; i++) {
    const row = document.createElement("div");
    row.setAttribute("class", "row");
    for (let j = 0; j < 2; j++) {
      const input = document.createElement("p");
      input.setAttribute("class", "cell");
      input.style.fontSize = "24px";
      input.style.margin = "0px";
      // input.style.backgroundColor = "#e6f598";
      input.innerHTML = c11[i][j];
      const col = document.createElement("div");
      col.setAttribute("class", "col");
      col.appendChild(input);
      row.append(col);
    }
    matArr[4].append(row);
  }
}

function linemat12() {
  let matArr = document.querySelectorAll(".lineMat12>.matrix");
  for (let i = 0; i < 2; i++) {
    const row = document.createElement("div");
    row.setAttribute("class", "row");
    for (let j = 0; j < 2; j++) {
      const input = document.createElement("p");
      input.setAttribute("class", "cell");
      input.style.fontSize = "24px";
      input.style.margin = "0px";
      // input.style.backgroundColor = "#fee08b";
      input.innerHTML = m3[i][j];
      const col = document.createElement("div");
      col.setAttribute("class", "col");
      col.appendChild(input);
      row.append(col);
    }
    matArr[0].append(row);
  }
  for (let i = 0; i < 2; i++) {
    const row = document.createElement("div");
    row.setAttribute("class", "row");
    for (let j = 0; j < 2; j++) {
      const input = document.createElement("p");
      input.setAttribute("class", "cell");
      input.style.fontSize = "24px";
      input.style.margin = "0px";
      // input.style.backgroundColor = "#d53e4f";
      input.innerHTML = m5[i][j];
      const col = document.createElement("div");
      col.setAttribute("class", "col");
      col.appendChild(input);
      row.append(col);
    }
    matArr[1].append(row);
  }
  for (let i = 0; i < 2; i++) {
    const row = document.createElement("div");
    row.setAttribute("class", "row");
    for (let j = 0; j < 2; j++) {
      const input = document.createElement("p");
      input.setAttribute("class", "cell");
      input.style.fontSize = "24px";
      input.style.margin = "0px";
      // input.style.backgroundColor = "#e6f598";
      input.innerHTML = c12[i][j];
      const col = document.createElement("div");
      col.setAttribute("class", "col");
      col.appendChild(input);
      row.append(col);
    }
    matArr[2].append(row);
  }
}

function linemat21() {
  let matArr = document.querySelectorAll(".lineMat21>.matrix");
  for (let i = 0; i < 2; i++) {
    const row = document.createElement("div");
    row.setAttribute("class", "row");
    for (let j = 0; j < 2; j++) {
      const input = document.createElement("p");
      input.setAttribute("class", "cell");
      input.style.fontSize = "24px";
      input.style.margin = "0px";
      // input.style.backgroundColor = "#fee08b";
      input.innerHTML = m2[i][j];
      const col = document.createElement("div");
      col.setAttribute("class", "col");
      col.appendChild(input);
      row.append(col);
    }
    matArr[0].append(row);
  }
  for (let i = 0; i < 2; i++) {
    const row = document.createElement("div");
    row.setAttribute("class", "row");
    for (let j = 0; j < 2; j++) {
      const input = document.createElement("p");
      input.setAttribute("class", "cell");
      input.style.fontSize = "24px";
      input.style.margin = "0px";
      // input.style.backgroundColor = "#fee08b";
      input.innerHTML = m4[i][j];
      const col = document.createElement("div");
      col.setAttribute("class", "col");
      col.appendChild(input);
      row.append(col);
    }
    matArr[1].append(row);
  }
  for (let i = 0; i < 2; i++) {
    const row = document.createElement("div");
    row.setAttribute("class", "row");
    for (let j = 0; j < 2; j++) {
      const input = document.createElement("p");
      input.setAttribute("class", "cell");
      input.style.fontSize = "24px";
      input.style.margin = "0px";
      // input.style.backgroundColor = "#fee08b";
      input.innerHTML = c21[i][j];
      const col = document.createElement("div");
      col.setAttribute("class", "col");
      col.appendChild(input);
      row.append(col);
    }
    matArr[2].append(row);
  }
}

function linemat22() {
  let matArr = document.querySelectorAll(".lineMat22>.matrix");
  for (let i = 0; i < 2; i++) {
    const row = document.createElement("div");
    row.setAttribute("class", "row");
    for (let j = 0; j < 2; j++) {
      const input = document.createElement("p");
      input.setAttribute("class", "cell");
      input.style.fontSize = "24px";
      input.style.margin = "0px";
      // input.style.backgroundColor = "#fee08b";
      input.innerHTML = m1[i][j];
      const col = document.createElement("div");
      col.setAttribute("class", "col");
      col.appendChild(input);
      row.append(col);
    }
    matArr[0].append(row);
  }
  for (let i = 0; i < 2; i++) {
    const row = document.createElement("div");
    row.setAttribute("class", "row");
    for (let j = 0; j < 2; j++) {
      const input = document.createElement("p");
      input.setAttribute("class", "cell");
      input.style.fontSize = "24px";
      input.style.margin = "0px";
      // input.style.backgroundColor = "#d53e4f";
      input.innerHTML = m2[i][j];
      const col = document.createElement("div");
      col.setAttribute("class", "col");
      col.appendChild(input);
      row.append(col);
    }
    matArr[1].append(row);
  }
  for (let i = 0; i < 2; i++) {
    const row = document.createElement("div");
    row.setAttribute("class", "row");
    for (let j = 0; j < 2; j++) {
      const input = document.createElement("p");
      input.setAttribute("class", "cell");
      input.style.fontSize = "24px";
      input.style.margin = "0px";
      // input.style.backgroundColor = "#e6f598";
      input.innerHTML = m3[i][j];
      const col = document.createElement("div");
      col.setAttribute("class", "col");
      col.appendChild(input);
      row.append(col);
    }
    matArr[2].append(row);
  }
  for (let i = 0; i < 2; i++) {
    const row = document.createElement("div");
    row.setAttribute("class", "row");
    for (let j = 0; j < 2; j++) {
      const input = document.createElement("p");
      input.setAttribute("class", "cell");
      input.style.fontSize = "24px";
      input.style.margin = "0px";
      // input.style.backgroundColor = "#3288bd";
      input.innerHTML = m6[i][j];
      const col = document.createElement("div");
      col.setAttribute("class", "col");
      col.appendChild(input);
      row.append(col);
    }
    matArr[3].append(row);
  }
  for (let i = 0; i < 2; i++) {
    const row = document.createElement("div");
    row.setAttribute("class", "row");
    for (let j = 0; j < 2; j++) {
      const input = document.createElement("p");
      input.setAttribute("class", "cell");
      input.style.fontSize = "24px";
      input.style.margin = "0px";
      // input.style.backgroundColor = "#e6f598";
      input.innerHTML = c22[i][j];
      const col = document.createElement("div");
      col.setAttribute("class", "col");
      col.appendChild(input);
      row.append(col);
    }
    matArr[4].append(row);
  }
}


document.getElementById("multiply-7").addEventListener("click", () => {
  for (let mn = 0; mn < rowA; mn++) {
    _c.push(c.slice(0, rowA)[mn].slice(0, colB));
  }
  console.log(_c);
  document.querySelectorAll(".hid")[17].style.display = "block";
  document.querySelectorAll(".matrices")[15].style.display = "flex";
  document.querySelector("td.out-final-2").style.display = "flex";
  let mat = document.querySelector(".mat-final-2>.matrix");
  for (let i = 0; i < rowA; i++) {
    const row = document.createElement("div");
    row.setAttribute("class", "row");
    for (let j = 0; j < colB; j++) {
      const input = document.createElement("p");
      input.setAttribute("class", "cell");
      input.style.fontSize = "24px";
      input.style.margin = "0px";
      input.innerHTML = _c[i][j];
      const col = document.createElement("div");
      col.setAttribute("class", "col");
      col.appendChild(input);
      row.append(col);
    }
    mat.append(row);
  }
  document.querySelector("#multiply-7").style.display = "none";
  document.querySelector("#multiply-7").parentNode.remove();
});


let rowA;
let colA;
let rowB;
let colB;
let mat1;
let mat2;
let a11 = [];
let a12 = [];
let a21 = [];
let a22 = [];
let b11 = [];
let b12 = [];
let b21 = [];
let b22 = [];
let m1;
let m2;
let m3;
let m4;
let m5;
let m6;
let m7;
let res;
let c11;
let c12;
let c21;
let c22;
let c;
let _c = [];
function matSub(a, b) {
  let sub = [];
  for (let i = 0; i < 2; i++) {
    let rowSub = [];
    for (let j = 0; j < 2; j++) {
      rowSub.push(a[i][j] - b[i][j]);
    }
    sub.push(rowSub);
  }
  return sub;
}
function matrixMult(A, B) {
  var result = new Array(A.length)
    .fill(0)
    .map((row) => new Array(B[0].length).fill(0));
  return result.map((row, i) => {
    return row.map((val, j) => {
      return A[i].reduce((sum, elm, k) => sum + elm * B[k][j], 0);
    });
  });
}

function matAdd(a, b) {
  let sum = [];
  for (let i = 0; i < 2; i++) {
    let rowSum = [];
    for (let j = 0; j < 2; j++) {
      rowSum.push(a[i][j] + b[i][j]);
    }
    sum.push(rowSum);
  }
  return sum;
}


function finalize() {
  a11.push(mat1.slice(0, 2)[0].slice(0, 2), mat1.slice(0, 2)[1].slice(0, 2));
  a12.push(mat1.slice(0, 2)[0].slice(2, 4), mat1.slice(0, 2)[1].slice(2, 4));
  a21.push(mat1.slice(2, 4)[0].slice(0, 2), mat1.slice(2, 4)[1].slice(0, 2));
  a22.push(mat1.slice(2, 4)[0].slice(2, 4), mat1.slice(2, 4)[1].slice(2, 4));
  b11.push(mat2.slice(0, 2)[0].slice(0, 2), mat2.slice(0, 2)[1].slice(0, 2));
  b12.push(mat2.slice(0, 2)[0].slice(2, 4), mat2.slice(0, 2)[1].slice(2, 4));
  b21.push(mat2.slice(2, 4)[0].slice(0, 2), mat2.slice(2, 4)[1].slice(0, 2));
  b22.push(mat2.slice(2, 4)[0].slice(2, 4), mat2.slice(2, 4)[1].slice(2, 4));
  m1 = matrixMult(matAdd(a11, a22), matAdd(b11, b22));
  m2 = matrixMult(matAdd(a21, a22), b11);
  m3 = matrixMult(a11, matSub(b12, b22));
  m4 = matrixMult(a22, matSub(b21, b11));
  m5 = matrixMult(matAdd(a11, a12), b22);
  m6 = matrixMult(matSub(a21, a11), matAdd(b11, b12));
  m7 = matrixMult(matSub(a12, a22), matAdd(b21, b22));
  c11 = matAdd(matAdd(m1, m7), matSub(m4, m5));
  c12 = matAdd(m3, m5);
  c21 = matAdd(m2, m4);
  c22 = matAdd(matAdd(m3, m6), matSub(m1, m2));
  c = matrixMult(mat1, mat2);
}
