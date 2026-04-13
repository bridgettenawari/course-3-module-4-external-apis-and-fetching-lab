const weatherApi = "https://api.weather.gov/alerts/active?area=";

const stateInput = document.querySelector("#state-input"); //input
const fetchAlertsBtn = document.querySelector("#fetch-alerts"); //btn
const alertsDisplay = document.querySelector("#alerts-display"); //div
const errorMessage = document.querySelector("#error-message"); //div
//hides error message when page first loads
errorMessage.classList.add("hidden");
//function to fetch API
function fetchWeatherAlerts(state) {
  //since API link was already declared just call it using interpolation method
  //also call on state which is what is input into the API
  fetch(`${weatherApi}${state}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error 404: Response not fetched!");
      } //ir response fetching was successful return it as JSON
      return response.json();
    })
    .then((data) => {
      //console.log(data)
      //take the data and display it using the displayAlerts function with data as a parameter
      displayAlerts(data);
      //this hides the error message when data is displayed
      errorMessage.classList.add("hidden");
      //empties the error message after data is fetched successfully
      errorMessage.textContent = "";
    })
    .catch((error) => {
      //removes error from being hidden
      errorMessage.classList.remove("hidden");
      //change the textContent of the errorMessage div to the message given by the error
      errorMessage.textContent = error.message;
    });
}
//add event listener to the button
fetchAlertsBtn.addEventListener("click", () => {
  //save input value into a variable
  const stateValue = stateInput.value;
  //call the fetchWeatherAlerts function with the input value as a parameter
  fetchWeatherAlerts(stateValue);
 //clear the input box after a value is fetched
  stateInput.value = "";
});

function displayAlerts(data) {
  //removes whatever was previously in the alertsDisplay div
  alertsDisplay.innerHTML = "";
  //shows number of alerts under the features key
  const alerts = data.features || [];
  
  const heading = document.createElement("h2");
  heading.textContent = `Weather Alerts: ${alerts.length}`;
  alertsDisplay.appendChild(heading);

  alerts.forEach((alert) => {
    const p = document.createElement("p");
    p.textContent = alert.properties.headline;
    alertsDisplay.appendChild(p);
  });
}
