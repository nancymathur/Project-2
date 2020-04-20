d3.select('#selDataset').on("change", getSummary);
// AO TEST x = [];
function getSummary() {
    
    // April 17 - pulling data from Flask url
    var state = d3.select("#selDataset").node().value;
    if (state === "boise") {
        var url = "http://127.0.0.1:5000/api/v1.0/boise"
    }
    if (state === "columbus") {
        var url = "http://127.0.0.1:5000/api/v1.0/columbus"
    }
    if (state === "detroit") {
        var url = "http://127.0.0.1:5000/api/v1.0/detroit"
    }
    if (state === "milwaukee") {
        var url = "http://127.0.0.1:5000/api/v1.0/milwaukee"
    }
    if (state === "la") {
        var url = "http://127.0.0.1:5000/api/v1.0/la"
    }
    if (state === "neworleans") {
        var url = "http://127.0.0.1:5000/api/v1.0/neworleans"
    }
    if (state === "ny") {
        var url = "http://127.0.0.1:5000/api/v1.0/ny"
    }
    if (state === "portland") {
        var url = "http://127.0.0.1:5000/api/v1.0/portland"
    }
    if (state === "seattle") {
        var url = "http://127.0.0.1:5000/api/v1.0/seattle"
    }
    if (state === "indianapolis") {
        var url = "http://127.0.0.1:5000/api/v1.0/indianapolis"
    }
    d3.json(url).then(function (data) {
        console.log(data)
        var chosenCityDate = [];
        var chosenCityAqi = [];
        var chosenCityName = [];
        var chosenCityShelterDate = [];
        var chosenCityPopulation = [];
        for (i=0; i<data.length; i++) {
            chosenCityName.push(data[i].city_name);
            chosenCityShelterDate.push(data[i].state_ordinance)
            chosenCityPopulation.push(data[i].population); 
            chosenCityAqi.push(data[i].aqi_value);      
            chosenCityDate.push(data[i].date);
        }
        var chosenCityName2 = chosenCityName[0]
        var chosenCityPopulation2 = chosenCityPopulation[0]
        var chosenCityShelterDate2 = new Date(chosenCityShelterDate[0]).toISOString().slice(0, 10);
        //console.log(chosenCityDate)
        // Sort and format date
        var newDate = chosenCityDate.sort(function(a, b) {
            return  +new Date(a.date) - +new Date(b.date);
        })
        var newDate2 = [];
        for (i=0; i<newDate.length; i++) {  
            newDate2.push(new Date(newDate[i]).toISOString().slice(5,10));
        }
        
        var postShelterAqi = chosenCityAqi.filter(chosenCityAqi => chosenCityAqi >= chosenCityShelterDate);
        var datePreShelter = newDate2.slice(63, 83)
        var aqiPreShelter = chosenCityAqi.slice(63,83)
        var datePostShelter = newDate2.slice(84, 100)
        var aqiPostShelter = chosenCityAqi.slice(84,100)
        
        var meanAqiPost = math.mean(aqiPostShelter)
        var meanAqiPre = math.mean(aqiPreShelter)
        console.log("RESULT TEST", meanAqiPost, meanAqiPre)

        // AO TEST x.push(meanAqiPost);
            
        var list = d3.select("#summary");
        // remove any children from the list
        list.html("");
        // append stats to the list
        // list.append("li").text(`City: ${chosenCityName2}`);
        // list.append("li").text(`Population: ${chosenCityPopulation2}`);
        // list.append("li").text(`State Ordinance: ${chosenCityShelterDate2}`);
        list.append("li").text(`Post_Shelter_AQI Mean: ${meanAqiPost}`);
        list.append("li").text(`Pre_Shelter_AQI Mean: ${meanAqiPre}`);
    })
    // AO TEST console.log("ANGELINE", x)  
}

// Method 2?
// console.log("Test2", x)  

// function produceMessage() {
//     var y = x;
//     return y;
// }

// console.log(produceMessage());

// // JUSTIN - trying to return AQI values from function above so that it can populate html page.
// // is it because its in an array??
// var y = 10
// document.getElementById("math").value = y 









