song="";
LeftWristX=0;
LeftWristY=0;

RightWristX=0;
RightWristY=0;
scoreLeftWrist=0;
scoreRightWrist=0;
function preload(){
    song=loadSound("Heat-Waves(PagalWorld).mp3");
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

        scoreRightWrist=results[0].pose.keypoints[10].score;
        console.log("Right Wrist Score = "+scoreRightWrist);
        scoreLeftWrist=results[0].pose.keypoints[9].score;
        console.log("Left Wrist Score = "+scoreLeftWrist);
        
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

    // 19.05.2023
    circle(RightWristX,RightWristY,20);

    if (RightWristY>0&&RightWristY<=100){
        document.getElementById("speed").innerHTML="Speed:0.5x"
        song.rate(0.5);
    }

    else if (RightWristY>100&&RightWristY<=200){
        document.getElementById("speed").innerHTML="Speed:1x"
        song.rate(1);
    }

   else if (RightWristY>200&&RightWristY<=300){
        document.getElementById("speed").innerHTML="Speed:1.5x"
        song.rate(1.5);
    }

    else if (RightWristY>300&&RightWristY<=400){
        document.getElementById("speed").innerHTML="Speed:2x"
        song.rate(2);
    }

    else if (RightWristY>400&&RightWristY<=500){
        document.getElementById("speed").innerHTML="Speed:2.5x"
        song.rate(2.5);
    }

    if (scoreLeftWrist > 0.2){
        circle(LeftWristX,LeftWristY,20);
        inNumberLeftWristY=Number(LeftWristY);
        remove_decimls=floor(inNumberLeftWristY);
        volume=remove_decimls/500;
        document.getElementById("volume").innerHTML="Volume = "+volume;
        song.setVolume(volume);
    }
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);

}

