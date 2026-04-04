const button = document.getElementById("hello-button");

if (button) {
  button.addEventListener("click", () => {
    window.alert("Hello!");
  });
}
