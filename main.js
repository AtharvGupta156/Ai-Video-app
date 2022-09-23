status="";
objects = [];

function preload() {
    video = createVideo('video.mp4');
}

function setup() {
    canvas = createCanvas(480,380);
    canvas.center();
    video.hide();
}

function draw() {
    image(video,0,0,480,380);

    if (status != "") {
        object_detector.detect(video,gotResults);

        for (i=0 ; i<objects.length ; i++) {
            document.getElementById("status").innerHTML = "Objects Detected";
            document.getElementById("numberofobject").innerHTML = "Number of objects detected are : "+objects.length;
            fill("red");
            percent = floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%" , objects[i].x+15 , objects[i].y);
    noFill();
    stroke("red");
    rect(objects[i].x-75,objects[i].y,objects[i].width,objects[i].height)
        }
    }
}

function start() {
    object_detector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting objects";
}

function modelLoaded() {
    console.log("model is loaded ");
    status = true ;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function gotResults(error, results ) {
    if (error) {
        console.log(error);
    }
    else{
console.log(results);
 objects = results;
    }

}

