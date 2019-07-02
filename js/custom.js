var output = document.getElementById('output');
var dateTime = document.querySelectorAll('.date');
var answers = document.querySelector('.answers');
var outputImg = document.getElementById('output');
var counter = document.getElementById('counter');
var date = document.querySelectorAll('.date');
var pointsMade = document.querySelectorAll('.pointsMade');
var preBtn = document.querySelectorAll('a.preBtn');

var step = Number(localStorage.getItem('step'));
if (!step) {
    step = 1;
}
if (step > 5) {
    localStorage.removeItem('step');
    window.location.href = "./result.html";
} else {

    if (counter) {
        counter.innerHTML = `Question ${step} of 5`;
    }

    var url = fetch('https://api.myjson.com/bins/a6da9').then(res => res.json());

    var randomEntries = [];

    var obj = url.then(el => {

        var continents = el.map(function (item) {
            return item.continent;
        });

        var continentsUnique = continents.filter(function (item, index) {
            return continents.indexOf(item) >= index;
        });

        let randomName = continentsUnique.sort(() => Math.random()).slice(0, 3);

        var randomImage = el.filter(s => s.continent === randomName[Math.round(Math.random() * 2)]);
        var singleContinent = randomImage.slice(0, 1);

        if (outputImg) {
            outputImg.setAttribute('src', singleContinent[0].image);
            outputImg.dataset.name = singleContinent[0].continent;
        }

        for (let i = 0; i < 3; i++) {
            var div = document.createElement("div");
            var textnode = document.createTextNode(randomName[i]);
            div.appendChild(textnode);
            div.classList.add('answer');
            if (answers) {
                answers.appendChild(div);
            }
        }

        var click = 0;
        var points = Number(localStorage.getItem('points'));
        if (!points) {
            points = 0;
        }

        for (let i = 0; i < preBtn.length; i++) {
            preBtn[i].onclick = function (e) { 
                if(click != 0){
                    return true;
                } else {
                    alert('Please select one of the answers');
                    e.preventDefault();
                    return;
                }
             }
        }
        
        var answer = document.querySelectorAll('.answer');
        for (let i = 0; i < answer.length; i++) {
            answer[i].onclick = function name(params) {
                if (click === 0) {
                    this.classList.add('orange')
                    if (this.innerText === outputImg.getAttribute('data-name')) {
                        this.classList.add('correct');
                        points += 750;
                        localStorage.setItem('points', points);
                    } else {
                        this.classList.add('wrong');
                    }
                    step++;
                    localStorage.setItem('step', step);
                } 
                click++;
            }
        }
        console.log(click);
    });
}

function resetPoints() {

    var results = JSON.parse(localStorage.getItem("quiz_result") || "[]");

    function formatDate(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        return date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();
    }

    var d = new Date();
    var e = "on " + formatDate(d);

    var currentResult = {
        date: e,
        points: localStorage.getItem("points")
    };

    results.push(currentResult);

    results.sort(function (a, b) {
        return b.points - a.points;
    });

    if (results.length > 3) {
        results = results.slice(0, 3);
    }

    localStorage.setItem("quiz_result", JSON.stringify(results));

    localStorage.removeItem('points');

};

var results = JSON.parse(localStorage.getItem("quiz_result"));
for (let i = 0; i < results.length; i++) {
 
    var num = Number(results[i].points).toLocaleString(undefined, {
        maximumFractionDigits: 2
    });
    if (pointsMade[i] && date[i]) {
        date[i].innerHTML = results[i].date;
        pointsMade[i].innerHTML = `${num} pts`;
    }
}


