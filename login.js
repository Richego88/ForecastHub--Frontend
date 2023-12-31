document.getElementById("register").addEventListener("click", function () {
  const user = {
    name: document.querySelector("#registerName").value,
    email: document.querySelector("#registerEmail").value,
    password: document.querySelector("#registerPassword").value,
  };
  fetch("https://weather-app-backend-one.vercel.app/users/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.result) {
        window.location.assign("index.html");
      } else {
        if (data.error.includes("email")) {
          document.getElementById("emailError").innerText = data.error;
        }
      }
    });
  // .catch((error) => {
  //   console.error(error);
  // });
});

document.getElementById("connection").addEventListener("click", function () {
  const user = {
    email: document.querySelector("#connectionEmail").value,
    password: document.querySelector("#connectionPassword").value,
  };
  fetch("https://weather-app-backend-one.vercel.app/users/signin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.result) {
        window.location.assign("index.html");
        userLoggedIn();
      }
    });
  // .catch((error) => {
  //   console.error(error);
  // });
});
