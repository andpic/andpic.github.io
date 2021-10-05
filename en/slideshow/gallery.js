const numPictures = 15;

var slideImages = new Array();
for (var i = 0; i < numPictures; i++) {
	slideImages[i] = new Image();

	const imagePath = "gallery/" + (i+1).toString() + ".png";
	slideImages[i].src = imagePath;
	console.log(imagePath)
}

// Variable that will increment through the images
var step=0

function slideit(){
	// If browser does not support the image object, exit.
	if (!document.images)
		return
	document.getElementById('slide').src = slideImages[step].src
	
	if (step<numPictures)
		step++
	else
		step=0

	// Call function "slideit()" every 8 seconds
	setTimeout("slideit()", 8000)
}

slideit()
