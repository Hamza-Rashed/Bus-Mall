'use strict';

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

let counter_end_event = 0;
let left_image = document.getElementById('left-image');
let mid_image = document.getElementById('mid-image');
let right_image = document.getElementById('right-image');
let imagesSection = document.getElementById('images-Section');
let result = document.getElementById('result');

function Vote(name,ext) {
  this.name = name;
  this.ext = ext;
  this.image_path = `img/${name}.${ext}`;
  this.votes = 0;
  this.times_showes = 0;
  Vote.all.push(this);

}
Vote.all = [];

for (let i = 0; i < images.length; i++) {
  new Vote(images[i].name,images[i].ext);
}

function render() {

  while ( left_side === mid_side || right_side === mid_side || left_side === right_side) {
    var right_side = Vote.all[randomNumber(0, Vote.all.length - 1)];
    var left_side = Vote.all[randomNumber(0, Vote.all.length - 1)];
    var mid_side = Vote.all[randomNumber(0, Vote.all.length - 1)];
  }

  left_side.times_showes++;
  right_side.times_showes++;
  mid_side.times_showes++;

  left_image.src = left_side.image_path;
  left_image.title = left_side.name;
  mid_image.src = mid_side.image_path;
  mid_image.title = mid_side.name;
  right_image.src = right_side.image_path;
  right_image.title = right_side.name;
  counter_end_event++;
}

function show_result() {
  let ulEl = document.createElement('ul');
  result.appendChild(ulEl);
  for (let i = 0; i < Vote.all.length; i++) {
    let liEl = document.createElement('li');
    ulEl.appendChild(liEl);
    liEl.innerHTML = `<span>${images[i].name}</span> had<span> ${Vote.all[i].votes}</span> votes and was shown <span>${Vote.all[i].times_showes}</span> times`;
  }
}
render();

function end_event(event) {
  if (counter_end_event <= 25) {
    if (event.target.id !== 'imagesSection') {
      for (let i = 0; i < Vote.all.length; i++) {
        if (event.target.title === Vote.all[i].name) {
          Vote.all[i].votes++;
        }
      }
      render();
    }
    if (counter_end_event === 26) {
      show_result();
    }
  }
}

imagesSection.addEventListener('click', end_event);

// helper function
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}