function generateRandomStrings() {
  fetch("/random-strings")
    .then((response) => response.json())
    .then((data) => {
      const list = document.getElementById("strings");
      list.innerHTML = "";
      data.forEach((str, index) => {
        const li = document.createElement("li");
        li.textContent = `${index + 1}. ${str}`;
        list.appendChild(li);
      });
    });
}
console.log(generateRandomString());
