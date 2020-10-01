document.addEventListener("DOMContentLoaded", () => {
  let activityData;
  let filteredData = [];

  function getActivityData() {
    const username = "code_challenge";
    const password = "BhfUzYiUsdqjp4Ffeqg9@P";

    let headers = new Headers();
    headers.set("Authorization", "Basic " + btoa(username + ":" + password));
    fetch("https://api.jazz.co/codeChallenge/dQzv42tCFR/activity", {
      headers: headers,
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        activityData = data;
      });
  }
  getActivityData();

  function control() {
    const dateField = document.querySelector(".date-field");
    const searchButton = document.querySelector(".search-button");

    let dateSelected = null;
    dateField.addEventListener("change", () => {
      dateSelected = dateField.value;
    });

    searchButton.addEventListener("click", () => {
      filteredData = [];
      for (let i = 0; i < activityData.length; i++) {
        const activityDate = activityData[i].transitionedAt.slice(0, 10);
        if (activityDate === dateSelected) filteredData.push(activityData[i]);
      }
      createTable();
    });
  }
  control();

  function createTable() {
    let newC = 0;
    let screening = 0;
    let interview = 0;
    let offer = 0;
    let hired = 0;
    let notHired = 0;

    for (let candidate of filteredData) {
      switch (candidate.statusTo) {
        case "New":
          newC++;
          break;
        case "Screening":
          screening++;
          break;
        case "Interview":
          interview++;
          break;
        case "Offer":
          offer++;
          break;
        case "Hired":
          hired++;
          break;
        case "Not Hired":
          notHired++;
          break;
      }
    }

    document.querySelector("#new").innerText = newC;
    document.querySelector("#screening").innerText = screening;
    document.querySelector("#interview").innerText = interview;
    document.querySelector("#offer").innerText = offer;
    document.querySelector("#hired").innerText = hired;
    document.querySelector("#notHired").innerText = notHired;

    document.querySelector(".tble").style.display = "inline-table";
  }
});
