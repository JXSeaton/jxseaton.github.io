const icons = document.querySelectorAll("div#skills > div");
const iconColors = ['#17BEBB', '#F2BB05', '#FF078B'];
const positions = [];

function getRandPosition(){
	const left = Math.floor((Math.random() * (screen.width - screen.width * 0.5)) + (screen.width * 0.4));
	const top = Math.floor((Math.random() * (screen.height - screen.height * 0.3)) + (screen.height * 0.1));
	
	let notOverlap = true;
	for(let i = 0; i < positions.length; i++){
		if(
			((left >= positions[i][0] && left <= positions[i][0] + 60) ||
			(left + 60 >= positions[i][0] && left + 60 <= positions[i][0] + 60))
			&&
			((top >= positions[i][1] && top <= positions[i][1] + 60) ||
			(top + 60 >= positions[i][1] && top + 60 <= positions[i][1] + 60))
		){
			notOverlap = false;
		}
	}
	if(notOverlap){
		return [left, top];
	}else{
		return false;
	}
}

for(let i = 0; i < icons.length; i++){
	icons[i].style.backgroundColor = iconColors[i % 3];
	let randPosition = getRandPosition();
	while(!randPosition){
		randPosition = getRandPosition();
	}
	positions.push(randPosition);
	icons[i].style.left = randPosition[0] + "px";
	icons[i].style.top = randPosition[1] + "px";
}
