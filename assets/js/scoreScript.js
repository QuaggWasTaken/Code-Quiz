const highScoreListEl = document.getElementById("high-scores");
var highScores = JSON.parse(localStorage.getItem("highScores")) || [];

var map_index = -1;
highScoreListEl.innerHTML = highScores.map(score => {
    map_index++;
    return `<li class="high-score"><span class="initials">${score.initials}</span>: <span class="score">${score.score}</span>
    <button id="start" onclick="deleteItem(this)">Delete</button></li>`;
}).join("");

function deleteItem(element) {
    var parent = element.parentElement;
    var index = highScores.findIndex(x => x.initials == parent.getElementsByClassName("initials")[0].textContent && x.score == parent.getElementsByClassName("score")[0].textContent);
    if (index == -1) {
        return;
    }
    highScores.splice(index, 1)
    localStorage.setItem("highScores", JSON.stringify(highScores));
    element.parentElement.remove();
}

function clearScores() {
    highScores = [];
    localStorage.setItem("highScores", JSON.stringify(highScores));
    highScoreListEl.innerHTML = "";
}

function goBack() {
    window.location.href = "./index.html";
}