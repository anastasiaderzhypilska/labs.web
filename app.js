const API_URL = "http://localhost:3000/zoos";

async function fetchZoos(search = "", sort = "", order = "") {
  const url = new URL(API_URL);
  if (search) url.searchParams.append("search", search);
  if (sort) url.searchParams.append("sort", sort);
  if (order) url.searchParams.append("order", order);
  const res = await fetch(url);
  return await res.json();
}

async function createZoo(zoo) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(zoo)
  });
  return await res.json();
}

async function updateZoo(id, zoo) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(zoo)
  });
  return await res.json();
}

async function deleteZoo(id) {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
}


const zoosContainer = document.getElementById("zoos");
const searchInput = document.getElementById("search");
const totalOutput = document.getElementById("total");
let sortAscending = true;

if (zoosContainer) {
  async function displayZoos(items) {
    zoosContainer.innerHTML = "";
    items.forEach(zoo => {
      zoosContainer.insertAdjacentHTML("beforeend", `
        <div class="card">
          <p><b>Name:</b> ${zoo.name}</p>
          <p><b>Visitors:</b> ${zoo.visitors}</p>
          <p><b>Animals:</b> ${zoo.animals}</p>
          <p><b>Type:</b> ${zoo.public_string}</p>
          <a href="edit.html?id=${zoo.id}"><button>Edit</button></a>
          <button class="remove" data-id="${zoo.id}">Remove</button>
        </div>
      `);
    });

    document.querySelectorAll(".remove").forEach(btn => {
      btn.addEventListener("click", async e => {
        const id = e.target.dataset.id;
        await deleteZoo(id);
        refresh();
      });
    });
  }

  async function refresh(sort = "", order = "") {
    const search = searchInput.value.trim();
    const all = await fetchZoos(search, sort, order);
    displayZoos(all);
  }

  searchInput.addEventListener("input", () => refresh());

  document.getElementById("sort").addEventListener("click", () => {
    const order = sortAscending ? "asc" : "desc";
    sortAscending = !sortAscending;
    refresh("visitors", order);
  });

  document.getElementById("count").addEventListener("click", async () => {
    const searchValue = searchInput.value.trim();
    const res = await fetch(`${API_URL}/count?search=${encodeURIComponent(searchValue)}`);
    const data = await res.json();
    totalOutput.textContent = "Total animals: " + data.total;
  });

  refresh();
}


const createForm = document.getElementById("createForm");
if (createForm) {
  createForm.addEventListener("submit", async e => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const visitors = Number(document.getElementById("visitors").value);
    const animals = Number(document.getElementById("animals").value);
    const type = document.getElementById("type").value.trim();

    await createZoo({ name, visitors, animals, public_string: type });
    window.location.href = "index.html";
  });
}


const editForm = document.getElementById("editForm");
if (editForm) {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  (async () => {
    const all = await fetchZoos();
    const zoo = all.find(z => z.id == id);

    if (!zoo) {
      alert("Zoo not found!");
      window.location.href = "index.html";
      return;
    }

    document.getElementById("name").value = zoo.name;
    document.getElementById("visitors").value = zoo.visitors;
    document.getElementById("animals").value = zoo.animals;
    document.getElementById("type").value = zoo.public_string;

    editForm.addEventListener("submit", async e => {
      e.preventDefault();
      const updated = {
        name: document.getElementById("name").value.trim(),
        visitors: Number(document.getElementById("visitors").value),
        animals: Number(document.getElementById("animals").value),
        public_string: document.getElementById("type").value.trim(),
      };
      await updateZoo(id, updated);
      window.location.href = "index.html";
    });
  })();
}
