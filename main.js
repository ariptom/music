status="";
song1="";
song2="";
LeftWristX=0;
LeftWristY=0;

RightWristX=0;
RightWristY=0;
scoreLeftWrist=0;
function preload(){
    song1=loadSound("Heat-Waves(PagalWorld).mp3");
    song2=loadSound("Unstoppable");
}
function setup(){
    canvas=createCanvas(500,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    posenet=ml5.poseNet(video,modelLoaded);
    posenet.on('pose',gotPoses)
}
function modelLoaded(){
    console.log('initialized');
}
function gotPoses(results){
    if(results.length>0){
        console.log(results);

        scoreLeftWrist=results[0].pose.keypoints[9].score;
        console.log("Left Wrist Score = "+scoreLeftWrist)
        
        LeftWristX=results[0].pose.LeftWrist.x;
        LeftWristY=results[0].pose.LeftWrist.y;
        console.log('lwx '+ LeftWristX + 'lwy ' + LeftWristY);

        RightWristX=results[0].pose.RightWrist.x;
        RightWristY=results[0].pose.RightWrist.y;
        console.log('lwx '+ RightWristX + 'lwy ' + RightWristY)
    }
}
function draw(){
    image(video,0,0,500,500);

    fill("#FF0000");
    stroke("#FF0000");

        status=song1.isPlaying();
        console.log(status);
    if (scoreLeftWrist > 0.2){
        circle(LeftWristX,LeftWristY,20);
        song2.stop()

    }
    if (status="false"){
        song1.play();
        document.getElementById("heaing").innerHTML="Heat Waves";
    }
}