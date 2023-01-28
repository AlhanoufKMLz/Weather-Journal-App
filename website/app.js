// Personal API Key for OpenWeatherMap API
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = 'b0b7684900c02d23809071857a14114c&units=imperial';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Event listener
document.getElementById('generate').addEventListener('click', performAction());

function performAction(e) {
    const newZip = document.getElementById('zip').value;
    const newFeelings = document.getElementById('feelings').value;
  
    getTheData(baseURL, newZip, apiKey)
      .then(function (Data) {
        postData('/addFeeling', { date: newDate, temp: Data.main.temp, newFeelings })
      }).then(function (newData) {
          updateUI()
      })
    form.reset();
  }


// GET Data
const getTheData = async (baseURL, newZip, apiKey) => {
    const res = await fetch(baseURL + newZip + apiKey);
    try {
      const Data = await res.json();
        return Data;
    } catch (error) {
        console.log("error", error);
    }
  }


//POST Data 
const postData = async (url = '', data = {}) => {
    const req = await fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      body: JSON.stringify({
        date: data.date,
        temp: data.temp,
        content: data.content
      })
    })
  
    try {
      const newData = await req.json();
      return newData;
    }
    catch (error) {
      console.log(error);
    }
  };


// Update UI
const retrieveData = async () =>{
    const request = await fetch('/all');
    try {
    // Transform into JSON
    const allData = await request.json()
    console.log(allData)
    // Write updated data to DOM elements
    document.getElementById('temp').innerHTML = Math.round(allData.temp)+ 'degrees';
    document.getElementById('content').innerHTML = allData.feel;
    document.getElementById('date').innerHTML = allData.date;
    }
    catch(error) {
      console.log('error', error);
      // appropriately handle the error
    }
   }