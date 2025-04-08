const tabStyle = "border-bottom-color: #F2BB05; color: black;";
const tabActiveStyle = "border-bottom-color: #f29b05; color: #f29b05;";

const tabs = document.getElementsByClassName("tab");
let activeTab = "friendship";
document.getElementById(activeTab).style.display = "block";
document.querySelector('div[data-tab="friendship"]').style.cssText = tabActiveStyle;

function swtichTab(){
	document.querySelector(`div[data-tab="${activeTab}"]`).style.cssText = tabStyle;
	document.getElementById(activeTab).style.display = "none";
	activeTab = this.dataset.tab;
	this.style.cssText = tabActiveStyle;
	document.getElementById(activeTab).style.display = "block";
}

for(let tab of tabs){
	tab.addEventListener('click', swtichTab);
}