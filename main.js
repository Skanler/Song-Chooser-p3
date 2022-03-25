scoreleftWristY = 0;
scorerightWristY = 0;
song1status = "";
song2status = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
song1 = "";
song2 = "";

function preload(){
    song1 = loadSound("mus_papyrusboss.ogg");
    song2 = loadSound("mus_zz_megalovania.ogg");
}

function setup(){
    canvas = createCanvas(600, 500);
    canvas.position(650, 250);
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw(){
    image(video, 0, 0, 600, 500);
    song1status = song1.isPlaying();
    song2status = song2.isPlaying();
    fill(0, 255, 0);
    stroke(0, 255, 0);
    if(scoreleftWristY > 0.2){
    circle(leftWristX, leftWristY, 20);
    song2.stop();
    if(song1status == false){
        song1.play();
        document.getElementById("currentplay").innerHTML = "Song currently playing: Papyrus's Theme";
    }
    
    }
    if(scorerightWristY > 0.2){
    circle(rightWristX, rightWristY, 20);
    song1.stop();
    if(song2status == false){
        song2.play();
        document.getElementById("currentplay").innerHTML = "Song currently playing: Megalovania";
    }
    }
 
}

function gotPoses(results){
    if (results.length > 0){
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("Left wrist posX = "+leftWristX);
        console.log("Left wrist posY = "+leftWristY);
        console.log("Right wrist posX = "+rightWristX);
        console.log("Right wrist posY = "+rightWristY);
        scoreleftWristY = results[0].pose.keypoints[9].score;
        scorerightWristY = results[0].pose.keypoints[10].score;
    }
}

function modelLoaded(){
    console.log("PoseNet is ready to DJ!");
}