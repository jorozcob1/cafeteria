document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm")!;

  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const username = (<HTMLInputElement>document.getElementById("username"))
      .value;
    const password = (<HTMLInputElement>document.getElementById("password"))
      .value;

    if (username === "admin" && password === "123") {
      localStorage.setItem("username", username);
      window.location.href = "https://agarivasc.github.io/aat1/index.html";
    } else {
      alert("Invalid username or password.");
    }
  });
});
