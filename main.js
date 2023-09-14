musica = ""
idDireito = 0
idEsquerdo = 0
direitoX = 0
direitoY = 0
esquerdoX = 0 
esquerdoY = 0
function preload(){
    musica = loadSound("music.mp3")
}
function play(){
musica.play()
musica.setVolume(1)
musica.rate(1)
}

function setup() {
    canvas = createCanvas(600,500)
    canvas.center()
    video = createCapture(VIDEO)
    video.hide()
    pozenet = ml5.poseNet(video,modeloCarregado)
    pozenet.on("pose", obterPoses)
}

function modeloCarregado() {
    console.log("funcionou")
}
function obterPoses(results){
if(results.length>0){
    console.log(results)
    idDireito = results[0].pose.keypoints[10].score
    idEsquerdo = results[0].pose.keypoints[9].score
    direitoX = results[0].pose.rightWrist.x
    direitoY = results[0].pose.rightWrist.y
    esquerdoX = results[0].pose.leftWrist.x
    esquerdoY = results[0].pose.leftWrist.y

}
}
function draw() {
    image(video,0,0,600,500)
     if(idDireito>0.2)
     {
        circle(direitoX,direitoY,20)
     }
     if(direitoX>0 && direitoY<=100){
        musica.rate(0.5)
        document.getElementById("speed").innerHTML="velocidade=0.5"
     }
     if(direitoX>100 && direitoY<=200){
        musica.rate(1)
        document.getElementById("speed").innerHTML="velocidade=1"
     }
     if(direitoX>200 && direitoY<=300){
        musica.rate(1.5)
        document.getElementById("speed").innerHTML="velocidade=1.5"
     }
     if (idEsquerdo > 0.2) {
		circle(esquerdoX, esquerodY, 20);
		numeroPulsoEsquerdoY = Number(esquerdoY);
		remove_decimals = floor(numeroPulsoEsquerdoY);
		volume = remove_decimals / 500;
		document.getElementById("volume").innerHTML = "Volume = " + volume;
		musica.setVolume(volume);
	}
}