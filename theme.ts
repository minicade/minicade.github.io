if (!localStorage.getItem("theme")) {
  localStorage.setItem("theme", "dark");
}
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
} else {
  document.body.classList.add("light");
}
