////////// SLIDE SHOW ///////////////

let slideIndex = 1;
showSlides(slideIndex);

function advanceSlides(slide) {
	slideIndex += slide;
	showSlides(slideIndex);
}

function currentSlide(slide) {
	slideIndex = slide;
	showSlides(slideIndex);
}

function showSlides(slide) {
	var i;
	let slides = document.getElementsByClassName("slide");
	let dots = document.getElementsByClassName("dot");
	if(slide > slides.length){
		slideIndex = 1;
	}else if(slide < 1){
		slideIndex = slides.length;
	}
	for(let i = 0; i < slides.length; i++){
		slides[i].style.display = "none";
	}
	for(let i = 0; i < dots.length; i++) {
		dots[i].className = dots[i].className.replace(" active", "");
	}
	slides[slideIndex - 1].style.display = "block";
	dots[slideIndex - 1].className += " active";
}