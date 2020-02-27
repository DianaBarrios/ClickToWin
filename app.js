const Icons = {
    0: "logo-emissary-fondo.png",
    1: "logo-carssa.png",
    2: "logo-dhl.png",
    3: "logo-estafeta.png",
    4: "logo-fedex.png",
    5: "logo-quiken.png",
    6: "logo-redpack.png",
    7: "logo-sendex.png"
};

var corrects = 0;
var gameOver = false;
var clicks = 0;
var startTime, endTime;

function createIcon() {
    let icon = document.createElement("div");
    icon.className = "icon";
    icon.id = "icon-" + corrects;
    icon.style.visibility = "show";
    icon.style.width = 250 / (corrects + 1) + "px";
    icon.style.height = 250 / (corrects + 1) + "px";
    icon.innerHTML = "  ";
    icon.addEventListener("click", checkIcon);
    document.getElementById("table").appendChild(icon);
}

function removeIcon(c) {
    document.getElementById("icon-" + c).remove();
}

function startGame() {
    createIcon(0);
    start();
    document.getElementById("start-btn").style.display = "none";
}

function restartGame(){
    let icons = document.getElementsByClassName("icon");
    for (let i = icons.length-1; i >=  0; i--) {
        removeIcon(i);
    }
    document.getElementById("restart-btn").style.display = "none";
    document.getElementById("start-btn").style.display = "inline-block";
    corrects = 0;
    gameOver = false;
    clicks = 0;
    startTime, endTime = 0;
    document.getElementById("footer-title").innerHTML = " ";
    document.getElementById("clicks-count").innerHTML = " ";
    document.getElementById("time-count").innerHTML = " ";
}

function checkOverlap(j,x,y){
    let icons = document.getElementsByClassName("icon");
    for(let i = 0; i < j; i++){
        let left = icons[i].getBoundingClientRect.left;
        let top = icons[i].getBoundingClientRect.top;
        let side = icons[i].offsetWidth;
        if((x >= left && x <= (left+side)) && ((y >= top && y <= (top+side))||((y+side) >= top)) || ((y >= top && y <= (top+side)) && ((x >= left && x <= (left+side)) || (x+side >= left))) || ((x >= left && x <= (left+side)) && (y >= top && y <= (top+side))) || ((x+side) >= left && (x <= left) && (y >= top) && (y <= (top+side))) || ((x+side) >= left && (y
            +side) >= top) || (((x >= left) && (x <= left+side)) && (((y+side) >= top) && (y <= top)))){
            return true;
        }
    }
    return false;
}

function randomPos() {
    let table = document.getElementById("table");
    let minX = table.getBoundingClientRect().left;
    let maxX = table.offsetWidth + minX;
    let minY = table.getBoundingClientRect().top;
    let maxY = table.offsetHeight + minY;
    var randPosX = Math.floor(Math.random() * (maxX-minX)) + minX;
    var randPosY = Math.floor(Math.random() * (maxY-minY)) + minY;
    return [randPosX, randPosY];
}

function changeIcons() {
    let icons = document.getElementsByClassName("icon");
    for (let i = 0; i <= icons.length; i++) {
        let side = 250 / (corrects + 1) 
        icons[i].style.width = side + "px";
        icons[i].style.height = side + "px";
        let newPos = randomPos();
        let newX = newPos[0];
        let newY = newPos[1];
        while(checkOverlap(i,newX,newY)){
            newPos = randomPos();
            newX = newPos[0];
            newY = newPos[1];
            checkOverlap(i,newX,newY);
        }
        icons[i].style.left = newX + "px";
        icons[i].style.top = newY + "px";
    }
}

function winGame() {
    if (corrects == 7) {
        gameOver = true;
        end();
        document.getElementById("restart-btn").style.display = "inline-block";
        document.getElementById("footer-title").innerHTML = "Resultados";
        document.getElementById("clicks-count").innerHTML = "Clicks: " + clicks;
        alert("Felicidades!")
    }
}

function start() {
    startTime = new Date();
};

function end() {
    endTime = new Date();
    var timeDiff = endTime - startTime;
    timeDiff /= 1000;
    var seconds = Math.round(timeDiff);
    document.getElementById("time-count").innerHTML = ("Tiempo: " + seconds + " segundos");
}

function checkIcon() {
    if (!gameOver) {
        clicks++;
        if (this.id == "icon-0") {
            corrects++;
            if (winGame()) {
                return 0;
            }
            createIcon();
        } else {
            removeIcon(corrects);
            corrects--;
        }
        changeIcons();
    }
}
