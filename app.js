let zoos = [
  { name: "City Zoo", visitors: 50000, animals: 200, public_string: "Urban Area" },
  { name: "Safari Park", visitors: 75000, animals: 300, public_string: "Wildlife Reserve" },
  { name: "National Zoo", visitors: 100000, animals: 500, public_string: "National Park" }
];

const zoosContainer = document.getElementById("zoos");
const searchInput = document.getElementById("search");
const totalOutput = document.getElementById("total");
let sortAscending = true;

function displayZoos(items) {
  zoosContainer.innerHTML = "";

  items.forEach((zoo, index) => {
    zoosContainer.insertAdjacentHTML("beforeend", `
      <div class="card" data-index="${index}">
        <p class="name-text"><b>Name:</b> ${zoo.name}</p>
        <p class="visitors-text"><b>Visitors:</b> ${zoo.visitors}</p>
        <p class="animals-text"><b>Animals:</b> ${zoo.animals}</p>
        <p class="type-text"><b>Type:</b> ${zoo.public_string}</p>
        <button class="edit" data-index="${index}">Edit</button>
        <button class="remove" data-index="${index}">Remove</button>
      </div>
    `);
  });

  document.querySelectorAll(".remove").forEach(btn => {
    btn.addEventListener("click", e => {
      const idx = e.target.dataset.index;
      zoos.splice(idx, 1);
      refresh();
    });
  });

  document.querySelectorAll(".edit").forEach(btn => {
    btn.addEventListener("click", e => {
      const idx = e.target.dataset.index;
      const card = btn.parentElement;

      card.innerHTML = `
        <input type="text" class="name" value="${zoos[idx].name}" data-index="${idx}">
        <input type="text" class="visitors" value="${zoos[idx].visitors}" data-index="${idx}">
        <input type="text" class="animals" value="${zoos[idx].animals}" data-index="${idx}">
        <input type="text" class="type" value="${zoos[idx].public_string}" data-index="${idx}">
        <button class="save" data-index="${idx}">Save</button>
        <button class="cancel" data-index="${idx}">Cancel</button>
      `;

      card.querySelector(".save").addEventListener("click", () => {
        const nameInput = card.querySelector(".name").value;
        const visitorsInput = card.querySelector(".visitors").value;
        const animalsInput = card.querySelector(".animals").value;
        const typeInput = card.querySelector(".type").value;

        if (!/^[0-9eE]+$/.test(visitorsInput) || !/^[0-9eE]+$/.test(animalsInput)) {
          alert("Visitors and Animals must be numbers (digits or 'e' for exponent)");
          return;
        }

        zoos[idx].name = nameInput;
        zoos[idx].visitors = Number(visitorsInput);
        zoos[idx].animals = Number(animalsInput);
        zoos[idx].public_string = typeInput;

        refresh();
      });

      card.querySelector(".cancel").addEventListener("click", () => {
        refresh();
      });
    });
  });
}

function getFilteredZoos() {
  const value = searchInput.value.toLowerCase().trim();
  return zoos.filter(zoo => zoo.name.toLowerCase().includes(value));
}

function updateTotal(items) {
  const total = items.reduce((sum, zoo) => sum + zoo.animals, 0);
  totalOutput.textContent = "Total animals: " + total;
}

function refresh() {
  const filtered = getFilteredZoos();
  displayZoos(filtered);
}

refresh();

searchInput.addEventListener("input", refresh);

document.getElementById("sort").addEventListener("click", () => {
  const filtered = getFilteredZoos();
  const sorted = [...filtered].sort((a, b) => sortAscending ? a.visitors - b.visitors : b.visitors - a.visitors);
  sortAscending = !sortAscending;
  displayZoos(sorted);
  document.getElementById("sort").textContent = `Sort by Visitors ${sortAscending ? "↑" : "↓"}`;
});

document.getElementById("count").addEventListener("click", () => {
  const filtered = getFilteredZoos();
  updateTotal(filtered);
});

document.getElementById("add")?.addEventListener("click", () => {
  const name = prompt("Enter zoo name:");
  if (!name) return;
  let visitors = prompt("Enter number of visitors:");
  if (!/^[0-9eE]+$/.test(visitors)) { alert("Visitors must be digits or 'e' for exponent"); return; }
  let animals = prompt("Enter number of animals:");
  if (!/^[0-9eE]+$/.test(animals)) { alert("Animals must be digits or 'e' for exponent"); return; }
  const type = prompt("Enter type:");
  if (!type) return;
  zoos.push({ name: name.trim(), visitors: Number(visitors), animals: Number(animals), public_string: type.trim() });
  refresh();
});
