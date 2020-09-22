'use strict';

let images = [{
    name: 'pen',
    ext: 'jpg'
  },
  {
    name: 'pet-sweep',
    ext: 'jpg'
  },
  {
    name: 'scissors',
    ext: 'jpg'
  },
  {
    name: 'bag',
    ext: 'jpg'
  },
  {
    name: 'banana',
    ext: 'jpg'
  },
  {
    name: 'bathroom',
    ext: 'jpg'
  },
  {
    name: 'boots',
    ext: 'jpg'
  },
  {
    name: 'shark',
    ext: 'jpg'
  },
  {
    name: 'breakfast',
    ext: 'jpg'
  },
  {
    name: 'sweep',
    ext: 'png'
  },
  {
    name: 'bubblegum',
    ext: 'jpg'
  },
  {
    name: 'tauntaun',
    ext: 'jpg'
  },
  {
    name: 'chair',
    ext: 'jpg'
  },
  {
    name: 'unicorn',
    ext: 'jpg'
  },
  {
    name: 'cthulhu',
    ext: 'jpg'
  },
  {
    name: 'usb',
    ext: 'gif'
  },
  {
    name: 'dog-duck',
    ext: 'jpg'
  },
  {
    name: 'water-can',
    ext: 'jpg'
  },
  {
    name: 'dragon',
    ext: 'jpg'
  },
  {
    name: 'wine-glass',
    ext: 'jpg'
  },
];

let left_image = document.getElementById('left-image');
let mid_image = document.getElementById('mid-image');
let right_image = document.getElementById('right-image');
let imagesSection = document.getElementById('images-Section');
let result = document.getElementById('result');
let again = document.getElementById('again')
let Vote_arr = [];

function Vote(name, ext) {
  this.name = name;
  this.ext = ext;
  this.image_path = `img/${name}.${ext}`;
  this.votes = 0;
  this.times_showes = 1;
  Vote_arr.push(this);
}

for (let i = 0; i < images.length; i++) {
  new Vote(images[i].name, images[i].ext);
}

let num_picture;

function render() {

  while (left_side === mid_side || right_side === mid_side || left_side === right_side) {
    var right_side = Vote_arr[randomNumber(0, Vote_arr.length - 1)];
    var left_side = Vote_arr[randomNumber(0, Vote_arr.length - 1)];
    var mid_side = Vote_arr[randomNumber(0, Vote_arr.length - 1)];
  }
  num_picture = images.splice(0, 3)
  if (num_picture.length == 2) {
    left_image.src = `../img/${num_picture[0].name}.${num_picture[0].ext}`
    left_image.title = num_picture[0].name;
    mid_image.src = `../img/${num_picture[1].name}.${num_picture[1].ext}`
    mid_image.title = num_picture[1].name;
    right_image.src = ``;
    right_image.title = ``;

  } else if (num_picture.length == 3) {
    left_image.src = `../img/${num_picture[0].name}.${num_picture[0].ext}`
    left_image.title = num_picture[0].name;
    right_image.src = `../img/${num_picture[1].name}.${num_picture[1].ext}`
    right_image.title = num_picture[1].name;
    mid_image.src = `../img/${num_picture[2].name}.${num_picture[2].ext}`
    mid_image.title = num_picture[2].name;
  }
}
let array_local = [];

function send_local_storage() {


  for (let i = 0; i < Vote_arr.length; i++) {

    array_local.push({
      name: Vote_arr[i].name,
      Votes: Vote_arr[i].votes,
      Showes: Vote_arr[i].times_showes
    })
    localStorage.setItem('product', JSON.stringify(array_local))

  }
  console.log(array_local)
  show_result();
}


function show_result() {
  let ulEl = document.createElement('ul');
  result.appendChild(ulEl);
  let all_info = JSON.parse(localStorage.getItem('product'));
  for (let i = 0; i < all_info.length; i++) {
    let liEl = document.createElement('li');
    ulEl.appendChild(liEl);
    console.log(all_info[i].name)
    liEl.innerHTML = `<span>${all_info[i].name}</span> had<span> ${all_info[i].Votes}</span> votes and was shown <span>${all_info[i].Showes}</span> times`;
  }

}

render();

function end_event(event) {
  // let votes_value = JSON.parse(localStorage.getItem('product'));
  if (event.target.id !== 'images-Section') {
    for (let i = 0; i < Vote_arr.length; i++) {
      if (event.target.title === Vote_arr[i].name) {
        Vote_arr[i].votes++;
        //  array_local[1] = Vote_arr[i].votes
      }
    }
    render();
  }
  if (num_picture.length == 0) {
    send_local_storage();
again.style.display = 'block'
    create_chart();
    imagesSection.style.display = 'none';
  }
}

imagesSection.addEventListener('click', end_event);

// helper function
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


function create_chart() {

  let name = [];
  let views = [];
  let votes = [];
  for (let info in Vote_arr) {
    name.push(Vote_arr[info].name);
    views.push(Vote_arr[info].times_showes);
    votes.push(Vote_arr[info].votes);
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