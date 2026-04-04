const button = document.getElementById("hello-button");
const version = document.getElementById("version");

if (button) {
  button.addEventListener("click", () => {
    window.alert("Hello!");
  });
}

async function loadVersion() {
  if (!version) {
    return;
  }

  try {
    const response = await fetch("version.json", { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    version.textContent = `Version: ${data.version}`;
  } catch {
    version.textContent = "Version: unavailable";
  }
}

loadVersion();
