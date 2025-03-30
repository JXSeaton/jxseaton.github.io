const icons = document.querySelectorAll("div#skills > div");
const iconColors = ['#17BEBB', '#F2BB05', '#FF078B'];
const positions = [];



function getRandPosition(){
	const top = Math.floor((Math.random() * 60) + 20) + "%";
	const left = Math.floor((Math.random() * 40) + 50) + "%";
	
	return [left, top];
}

for(let i = 0; i < icons.length; i++){
	icons[i].style.backgroundColor = iconColors[i % 3];
	const randPosition = getRandPosition();
	positions.push(randPosition);
	icons[i].style.left = randPosition[0];
	icons[i].style.top = randPosition[1];
}
