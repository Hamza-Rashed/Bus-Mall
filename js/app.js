'use strict';
// this object for all images and extentions for it
let images = [
  {name:'bag',ext:'jpg'},
  {name:'pen',ext:'jpg'},
  {name:'banana',ext:'jpg'},
  {name:'pet-sweep',ext:'jpg'},
  {name:'bathroom',ext:'jpg'},
  {name:'scissors',ext:'jpg'},
  {name:'boots',ext:'jpg'},
  {name:'shark',ext:'jpg'},
  {name:'breakfast',ext:'jpg'},
  {name:'sweep',ext:'png'},
  {name:'bubblegum',ext:'jpg'},
  {name:'tauntaun',ext:'jpg'},
  {name:'chair',ext:'jpg'},
  {name:'unicorn',ext:'jpg'},
  {name:'cthulhu',ext:'jpg'},
  {name:'usb',ext:'gif'},
  {name:'dog-duck',ext:'jpg'},
  {name:'water-can',ext:'jpg'},
  {name:'dragon',ext:'jpg'},
  {name:'wine-glass',ext:'jpg'},
];
let arrr = [];
let counter_end_event = 0;
const left_image = document.getElementById('left-image');
const mid_image = document.getElementById('mid-image');
const right_image = document.getElementById('right-image');
const imagesSection = document.getElementById('images-Section');
const result = document.getElementById('result');
//  this is the constructor function 
function Vote(name,ext) {
  this.name = name;
  this.ext = ext;
  this.image_path = `img/${name}.${ext}`;
  this.votes = 0;
  this.times_showes = 0;
  Vote.all.push(this);

}
Vote.all = []; // this array to push all the object on it 

for (let i = 0; i < images.length; i++) {
  new Vote(images[i].name,images[i].ext);
}
// set Item on local storage
function setProducts(){
  localStorage.setItem('products', JSON.stringify(Vote.all));
}
// get Item from local storage
function getProducts(){
  let productsLocalStorage = JSON.parse(localStorage.getItem('products'));
  if (productsLocalStorage){
    Vote.all = [];
    for (let i=0;i<productsLocalStorage.length;i++){
      new Vote(productsLocalStorage[i].path.split('/')[1], productsLocalStorage[i].times_showes, productsLocalStorage[i].votes);
    }
  }
  render();
}
// render the all picture 
function render() {

    var left_side = left_image_show();
    var mid_side = mid_image_show(left_side);
    var right_side = right_image_show(left_side,mid_side);
    console.log(left_side)
    console.log(mid_side)
    console.log(right_side)
    arrr = [right_side,left_side,mid_side]

    Vote.all[left_side].times_showes++;
    Vote.all[right_side].times_showes++;
  Vote.all[mid_side].times_showes++;

  left_image.src = Vote.all[left_side].image_path;
  left_image.title = Vote.all[left_side].name;
  mid_image.src = Vote.all[mid_side].image_path;
  mid_image.title = Vote.all[mid_side].name;
  right_image.src = Vote.all[right_side].image_path;
  right_image.title = Vote.all[right_side].name;
  counter_end_event++;
}
// show the finall result
function show_result() {
  let ulEl = document.createElement('ul');
  result.appendChild(ulEl);
  for (let i = 0; i < Vote.all.length; i++) {
    let liEl = document.createElement('li');
    ulEl.appendChild(liEl);
    liEl.innerHTML = `<span>${images[i].name}</span> had<span> ${Vote.all[i].votes}</span> votes and was shown <span>${Vote.all[i].times_showes}</span> times`;
  }
}
// random number
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


function prev_image(index) {
  for (let i = 0; i < arrr.length; i++) {
    console.log(arrr[i])
    if (index === arrr[i]) {
      return (true);
    }
  }
  return (false);
}
function left_image_show() {
  let leftIndex = randomNumber(0, Vote.all.length - 1);
  while (prev_image(leftIndex)) {
    leftIndex = randomNumber(0, Vote.all.length - 1);
  }
  return (leftIndex);
}

function mid_image_show(leftIndex) {
  let midIndex = randomNumber(0, Vote.all.length - 1);
  while (prev_image(midIndex) || midIndex === leftIndex) {
    midIndex = randomNumber(0, Vote.all.length - 1);
  }
  return (midIndex);
}
function right_image_show(leftIndex, midIndex) {
  let rightIndex = randomNumber(0, Vote.all.length - 1);
  while (prev_image(rightIndex) || rightIndex === leftIndex || rightIndex === midIndex) {
    rightIndex = randomNumber(0, Vote.all.length - 1);
  }
  return (rightIndex);
}


render();
// this function for submit 
function end_event(event) {
  if (counter_end_event <= 25) {
    if (event.target.id !== 'images-Section') {
      for (let i = 0; i < Vote.all.length; i++) {
        if (event.target.title === Vote.all[i].name) {
          Vote.all[i].votes++;
        }
      }
      setProducts();
      render();
    }
    if (counter_end_event === 26) {
      show_result();
      create_chart();
    }
  }
}

imagesSection.addEventListener('click', end_event);

// for chart js

function create_chart() {

  let name = [];
  let views = [];
  let votes = [];
  for (let info in Vote.all) {
    name.push(Vote.all[info].name);
    views.push(Vote.all[info].times_showes);
    votes.push(Vote.all[info].votes);
    // console.log(Vote_arr)
  }

  var ctx = document.getElementById('myChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: name,
      datasets: [{
        label: 'votes',
        data: votes,
        backgroundColor: 'yellow',
        borderColor: 'black',
        borderWidth: 1.0,
        barPercentage: 1.0
      }, {
        label: 'views',
        data: views,
        backgroundColor: 'blue',
        borderColor: 'red',
        borderWidth: 1.0,
        borderPercentage: 1.0
      }]
    },

    option: {
      scales: {
        xAxis: [{
          stacked: true
        }],
        yAxis: [{
          stacked: true,
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}