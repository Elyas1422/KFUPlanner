let rows = ["MATH208", "SWE363", "IAS212"];

const table = document.querySelector("#table");

let rowCount = rows.length;

const rerun = () => {
  table.classList.remove("empty");
  buildRows();
};

const removeRow = (index) => {
  const row = document.querySelector(`#row-${index}`);
  row.classList.add("removed");
  rowCount -= 1;

  if (rowCount === 0) {
    table.classList.add("empty");
  }

  Toastify({
    text: "The course has been deleted",
    duration: 1500,
    gravity: "bottom",
    position: "center",
    stopOnFocus: true,
  }).showToast();
};

const buildRows = () => {
  let content = ``;
  rows=  [...new Set(rows)];
  rows.forEach((row, index) => {
    content += `
      <div class="row" id="row-${index}">
        <p>${row}</p>
        <button onclick="removeRow(${index})">
            <span class="material-symbols-outlined"> X </span>
        </button>
      </div>`;
  });

  console.log("content", content);

  table.innerHTML = content;
};
const button = document.querySelector('#add-course-button');
const comboBox = document.querySelector('#course-input');
button.addEventListener('click', () => {
  rows.push(comboBox.value);
  console.log((comboBox.value))
  buildRows();
});


window.addEventListener("load", () => buildRows());