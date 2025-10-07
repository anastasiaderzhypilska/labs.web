let zoos = JSON.parse(localStorage.getItem("zoos")) || [
  { name: "City Zoo", visitors: 50000, animals: 200, public_string: "Urban Area" },
  { name: "Safari Park", visitors: 75000, animals: 300, public_string: "Wildlife Reserve" },
  { name: "National Zoo", visitors: 100000, animals: 500, public_string: "National Park" }
];

function saveZoos() {
  localStorage.setItem("zoos", JSON.stringify(zoos));
}

const zoosContainer = document.getElementById("zoos");
const searchInput = document.getElementById("search");
const totalOutput = document.getElementById("total");
let sortAscending = true;

if (zoosContainer) {
  function displayZoos(items) {
    zoosContainer.innerHTML = "";

    items.forEach((zoo, index) => {
      zoosContainer.insertAdjacentHTML("beforeend", `
        <div class="card" data-index="${index}">
          <p><b>Name:</b> ${zoo.name}</p>
          <p><b>Visitors:</b> ${zoo.visitors}</p>
          <p><b>Animals:</b> ${zoo.animals}</p>
          <p><b>Type:</b> ${zoo.public_string}</p>
          <a href="edit.html?index=${index}"><button>Edit</button></a>
          <button class="remove" data-index="${index}">Remove</button>
        </div>
      `);
    });

    document.querySelectorAll(".remove").forEach(btn => {
      btn.addEventListener("click", e => {
        const idx = e.target.dataset.index;
        zoos.splice(idx, 1);
        saveZoos();
        refresh();
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
}

const createForm = document.getElementById("createForm");
if (createForm) {
  createForm.addEventListener("submit", e => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const visitors = Number(document.getElementById("visitors").value);
    const animals = Number(document.getElementById("animals").value);
    const type = document.getElementById("type").value.trim();
    zoos.push({ name, visitors, animals, public_string: type });
    saveZoos();
    window.location.href = "index.html"; 
  });
}

const editForm = document.getElementById("editForm");
if (editForm) {
  const params = new URLSearchParams(window.location.search);
  const idx = params.get("index");
  if (idx !== null && zoos[idx]) {
    document.getElementById("name").value = zoos[idx].name;
    document.getElementById("visitors").value = zoos[idx].visitors;
    document.getElementById("animals").value = zoos[idx].animals;
    document.getElementById("type").value = zoos[idx].public_string;

    editForm.addEventListener("submit", e => {
      e.preventDefault();
      zoos[idx].name = document.getElementById("name").value.trim();
      zoos[idx].visitors = Number(document.getElementById("visitors").value);
      zoos[idx].animals = Number(document.getElementById("animals").value);
      zoos[idx].public_string = document.getElementById("type").value.trim();
      saveZoos();
      window.location.href = "index.html";
    });
  } else {
    alert("Zoo not found!");
    window.location.href = "index.html";
  }
}
