song="";
LeftWristX=0;
LeftWristY=0;

RightWristX=0;
RightWristY=0;

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
}

