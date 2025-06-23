const container = document.getElementById("dogContainer");
const loadBtn = document.getElementById("loadBtn");
const filterInput = document.getElementById("breedFilter");

let allDogs = [];

async function fetchDogs() {
  const res = await fetch("https://dog.ceo/api/breeds/image/random/5");
  const data = await res.json();
  allDogs = data.message;
  displayDogs(allDogs);
}

function displayDogs(dogImages) {
  container.innerHTML = "";
  dogImages.forEach((imgUrl) => {
    const breed = imgUrl.split("/")[4]; // extract breed name from URL
    const card = document.createElement("div");
    card.className = "dog-card";
    card.innerHTML = `
      <img src="${imgUrl}" alt="Dog Image"/>
      <p>Breed: ${breed}</p>
    `;
    container.appendChild(card);
  });
}

filterInput.addEventListener("input", () => {
  const query = filterInput.value.toLowerCase();
  const filtered = allDogs.filter((imgUrl) => imgUrl.includes(query));
  displayDogs(filtered);
});

loadBtn.addEventListener("click", fetchDogs);

fetchDogs();
