const toggle = document.getElementById("toggle");
const toggleText = document.getElementById("cv-resume-text");
const cvText = document.getElementById("cv");
const resumeText = document.getElementById("resume");

toggle.addEventListener("change", function(){
	if(this.checked){
		toggleText.innerHTML = "Resum&eacute; Version";
		resumeText.style.display = "block";
		cvText.style.display = "none";
	}else{
		toggleText.innerHTML = "CV Version";
		cvText.style.display = "block";
		resumeText.style.display = "none";
	}	
});