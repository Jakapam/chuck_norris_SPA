let firstName;
let lastName;
let chuckNorrified = false;

document.addEventListener("DOMContentLoaded", function(event) {
    document.getElementById('random_fact').addEventListener("click", getRandomFact)
    document.getElementById('multi_fact_button').addEventListener("click", getMultiFact)
    document.getElementById('chuckNorrifier').addEventListener("submit", function(event){
      event.preventDefault()
      chuckNorrify();
    })
  });

var baseURL = 'http://api.icndb.com'

//functions to create single joke
function getRandomFact() {
  let endpoint = baseURL+"/jokes/random";
  let chuckDiv = fetch(endpoint).then(res => res.json())
  .then(res => createDiv(res.value))
  .then(div => appendToHTML(div))
}

function createDiv(res){
  var div = document.createElement("li");
  div.className =  "chuckFact";
  if (chuckNorrified){
    res.joke = res.joke.replace(/Chuck/g, firstName);
    res.joke = res.joke.replace(/Norris/g, lastName);
    res.joke = res.joke.replace(/chuck/g, firstName);
    res.joke = res.joke.replace(/norris/g, lastName);
  }
  div.innerHTML = res.joke;
  return div;
}

function appendToHTML(element){
  document.getElementById('facts_display').appendChild(element);
}

//functions to create multiple jokes to refactor later
function getMultiFact() {
  let numberOfFacts = document.getElementById("multi_fact").value;
  let endpoint = baseURL+"/jokes/random/"+numberOfFacts
  let chuckDiv = fetch(endpoint).then(res => res.json())
  .then(res => createMultiDiv(res.value)).then(divArray=>appendMultiDiv(divArray))
}

function createMultiDiv(resArray){
  let divArray = resArray.map((res)=> createDiv(res))
  return divArray;
}

function appendMultiDiv(divArray){
  divArray.forEach((element)=> document.getElementById('facts_display').appendChild(element))
}

function chuckNorrify(){
  if(!chuckNorrified){
    chuckNorrified = true;
    firstName = document.getElementById("first_name").value;
    lastName = document.getElementById("last_name").value;
    let chuckAry = [].slice.call(document.querySelectorAll(".chuckFact"));
    document.getElementById('title').innerHTML = document.getElementById('title').innerHTML.replace("Chuck Norris", firstName+ " " +lastName);
    document.getElementById('browser_title').innerHTML = document.getElementById('browser_title').innerHTML.replace("Chuck Norris", firstName+ " " +lastName);
    chuckAry.forEach(fact => {
      fact.innerHTML = fact.innerHTML.replace(/Chuck/g, firstName)
      fact.innerHTML = fact.innerHTML.replace(/Norris/g, lastName)
      fact.innerHTML = fact.innerHTML.replace(/chuck/g, firstName)
      fact.innerHTML = fact.innerHTML.replace(/norris/g, lastName)
    })

    document.getElementById("first_name").value = ""
    document.getElementById("last_name").value = ""
  } else{
    alert(`There can be only one Chuck Norris (AKA: ${firstName} ${lastName})`)
  }
}
