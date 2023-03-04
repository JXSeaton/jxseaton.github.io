/**
* Summary: Class that creates and manages the cards displayed on the website
* @param {String} 		title: the title of the article
* @param {Sting} 		link: link to the article
* @param {String} 		category: category using to label article - major topic
* @param {String} 		img: hero image of the article
* @param {String[]} 	tags: tags to search through articles
* @param {String} 		id: html id attribute for the link encapsolating the card
* @param {boolean} 		display: determines if the article should be displayed based on search parameters
*/
class papers{
    constructor(title, link, category, img, tags, id){
        this.title = title;
        this.link = link;
        this.category = category;
        this.img = img;
        this.tags = tags;
        this.id = id;
        this.displayCategory = true;
		this.displayTags = true;
    }
    /**
    * Summary: dynamically creates html to display the card
    */
    createCard(){
        const card = document.createElement('div');

        //creates category
        const category = document.createElement('h3');
        const categoryText = document.createTextNode(this.category);
        category.appendChild(categoryText);
        card.appendChild(category);

        //creates article title
        const title = document.createElement('h2');
        const titleText = document.createTextNode(this.title);
        title.appendChild(titleText);
        card.appendChild(title);

        //creates image
        const image = document.createElement('img');
        image.src = this.img;
        card.appendChild(image);

        //creates tags
        const dataList = document.createElement('dl');
        for(let i = 0; i < this.tags.length; i++){
            const dataTerm = document.createElement('dt');
            const tagText = document.createTextNode(this.tags[i]);
            dataTerm.appendChild(tagText);
            dataList.appendChild(dataTerm);
        }
        card.appendChild(dataList);

        //links card to the article
        const link = document.createElement('a');
        link.href = this.link;
        link.id = this.id;
        link.appendChild(card);
        link.classList.add('card');
        
        //adds cards to the page
        const container = document.getElementById('cardContainer');
        container.appendChild(link);
    }
}

/****** Arrays are choosen to store the tags and categories instead of genrating from the object to assist in creating unique and appropriate tags and categories. It is easier to see them together in one place! ******/

// array holds all the created cards to allow me to iterate through them
const arrayOfCards = [];

const categories = [
	'All Categories',
	'Development',
	'Game-Based Education',
	'Non-Formal Education',
	'Play',
	'Programming'
];

//array of tags for articles
const tags = [
	{name: 'Video Games', selected: 'selected'},
	{name: 'Play', selected: 'selected'},
	{name: 'Learning', selected: 'selected'},
	{name: 'Academic', selected: 'selected'},
	{name: 'Andragogy', selected: 'selected'},
	{name: 'Non-Formal Education', selected: 'selected'},
	{name: 'History', selected: 'selected'},
	{name: 'Programming', selected: 'selected'},
	{name: 'Design', selected: 'selected'},
	{name: 'MUO', selected: 'selected'},
	{name: 'Algorithms', selected: 'selected'}
];

/**
* Summary: once the display is determined, this actually changes to display.
*/
function displayCards() {
	for (let i = 0; i < arrayOfCards.length; i++) {
		if (arrayOfCards[i].displayCategory && arrayOfCards[i].displayTags) {
			document.getElementById(arrayOfCards[i].id).style.display = "inline-block";
		} else {
			document.getElementById(arrayOfCards[i].id).style.display = "none";
		}
	}
}

/**
* Summary: determines which cards should be displayed based on the selections
*          chosen in the filter div. The display status is saved in the card 
*          object.
*/
function filterCards(){
	//creates an array of the tags selected
	const displayTags = [];
	for (let i = 0; i < tags.length; i++) {
		if (tags[i].selected == 'selected') {
			displayTags.push(tags[i].name);
		}
	}

	//creates an array of excluded tags
	const excludeTags = [];
	for (let i = 0; i < tags.length; i++) {
		if (tags[i].selected == 'excluded') {
			excludeTags.push(tags[i].name);
		}
	}
	
	// sets display based on category
	arrayOfCards.forEach(function(card){
		//filters based on category
		const category = document.getElementById('category').value;
		if (category == 'All Categories'){
			card.displayCategory = true;
		}else if(category == card.category){
			card.displayCategory = true;
		}else{
			card.displayCategory = false;
		}

		//filter by tag

		//sets all display to false
		card.displayTags = false;
		
		//displays if tag is on
		card.tags.forEach(function(tag){
			if (displayTags.includes(tag)) {
				card.displayTags = true;
			}
		});

		//excludes if tag is excluded
		card.tags.forEach(function (tag) {
			if (excludeTags.includes(tag)) {
				card.displayTags = false;
			}
		});
	});
	displayCards();
}

/**
* Summary: Uses the Category array to create the category filter dropdown
*/
function createCategories(){
	const selectElement = document.getElementById('category');
	categories.forEach(function(cat){
		const optionElement = document.createElement('option');
		optionElement.innerText = cat;
		optionElement.value = cat;
		selectElement.append(optionElement);
	});
	selectElement.addEventListener('change', function(){
		filterCards();
	});
}

/**
* Summary: handles displaying cards based on which tags are
*          selected in the filter panel.
*/
function filterCardsByTags(){
    //creates an array of the tags selected
    const displayTags = [];
    for(let i = 0; i < tags.length; i++){
        if(tags[i].selected == 'selected'){
            displayTags.push(tags[i].name);
        }
    }

	//creates an array of excluded tags
	const excludeTags = [];
	for(let i = 0; i < tags.length; i++) {
		if (tags[i].selected == 'excluded') {
			excludeTags.push(tags[i].name);
		}
	}

    //sets all card displays to false and then only truns on the cards in the array of tags selected
    for(let i = 0; i < arrayOfCards.length; i++){
        arrayOfCards[i].display = false;
        //makes cards with tags selected visible
		for(let j = 0; j < arrayOfCards[i].tags.length; j++){
            if (displayTags.includes(arrayOfCards[i].tags[j])){
                arrayOfCards[i].display = true;
            }
        }
		//removes cards that are excluded
		for (let j = 0; j < arrayOfCards[i].tags.length; j++){
			if (excludeTags.includes(arrayOfCards[i].tags[j])){
				arrayOfCards[i].display = false;
			}
		}
    }
	displayCards();
}

/**
* Summary: This function controls the tag toggling. It cycles tags through selected
*          -> unslected -> excluded. Unselected does not target those tags, whereas  
*          excluded actively removes those tags from the search results.
* @param {String} selected: tag attribute that determins how the tag filters the results. 
*/
function changeTagSelection(selected){
	if(selected == 'selected'){
		return 'unselected';
	}else if(selected == 'unselected'){
		return 'excluded';
	}else{
		return 'selected';
	}
}

/**
* Summary: handles selecting the tags. tracks which tags have 
*          been selected in the filter. toggles the class of 
*          the tag to grey-out unselected tags
* @param {object} tag: tag object of clicked on tag.
*/
function toggleTag(tag){
	tag.selected = changeTagSelection(tag.selected);
    if(tag.selected == 'unselected'){
		document.getElementById(tag.name).classList.add('unselected');
		document.getElementById(tag.name).classList.remove('excluded');
	} else if (tag.selected == 'excluded'){
		document.getElementById(tag.name).classList.remove('unselected');
		document.getElementById(tag.name).classList.add('excluded');
    }else{
		document.getElementById(tag.name).classList.remove('unselected');
		document.getElementById(tag.name).classList.remove('excluded');
	}
    filterCards();
}

/**
* Summary: dynamically adds tags to the filter panel
*/
function addTagsToFilter(){
    //tags are data terms housed in a data list
    const dataList = document.createElement('dl');
    for (let i = 0; i < tags.length; i++) {
        const dataTerm = document.createElement('dt');
        const tagText = document.createTextNode(tags[i].name);
        dataTerm.appendChild(tagText);
        dataTerm.addEventListener('click', toggleTag.bind(this, tags[i]));
        dataTerm.id = tags[i].name;
        dataList.appendChild(dataTerm);
    }
    const filterDiv = document.getElementById('tags');
    filterDiv.appendChild(dataList);
}

//called on body load
function init(){
	//creates category selection
	createCategories();
    //creates tags in filter panel
    addTagsToFilter();
/*
 *************** ADD ARTICLES BELOW ******************
    1) CREATE NEW CARD OBJECT
    2) CALL createCard METHOD
    3) PUSH CARD TO arrayOfCards
 */


	/********* ARTICLES FROM MAKE USE OF *********/
	//What Is COBOL and Why Is It in Demand?
	const cobolHistory = new papers('What Is COBOL and Why Is It in Demand?', 'https://www.makeuseof.com/what-is-cobol/', 'Programming', './img/code-on-computer-screen.jpg', ['Programming', 'History', 'MUO'], 'cobolHistory');
	cobolHistory.createCard();
	arrayOfCards.push(cobolHistory);

	//What Is a Function in Programming?
	const funcProgramming = new papers('What Is a Function in Programming?', 'https://www.makeuseof.com/what-is-a-function-programming/', 'Programming', './img/pexels-olia-danilevich-5088021.jpg', ['Programming', 'MUO'], 'funcProgramming');
	funcProgramming.createCard();
	arrayOfCards.push(funcProgramming);

	//What Is the Difference Between UI and UX Design?
	const uiUx = new papers('What Is the Difference Between UI and UX Design?', 'https://www.makeuseof.com/difference-between-ui-and-ux-design/', 'Development', './img/pexels-picjumbocom-196644.jpg', ['Design', 'MUO'], 'uiUx');
	uiUx.createCard();
	arrayOfCards.push(uiUx);

	//How to Set a Background Image in CSS
	const backgroundImgCss = new papers('How to Set a Background Image in CSS', 'https://www.makeuseof.com/set-background-image-css/', 'Development', './img/sky.jpg', ['Design', 'MUO'], 'backgroundImgCss');
	backgroundImgCss.createCard();
	arrayOfCards.push(backgroundImgCss);

	//How to Write a for Loop in Java
	const forLoopJava = new papers('How to Write a for Loop in Java', 'https://www.makeuseof.com/learn-for-loops-in-java/', 'Programming', './img/pexels-tuur-tisseghem-172483.jpg', ['Programming', 'MUO'], 'forLoopJava');
	forLoopJava.createCard();
	arrayOfCards.push(forLoopJava);

	//What Is Recursion and How Do You Use It?
	const recusionUse = new papers('What Is Recursion and How Do You Use It?', 'https://www.makeuseof.com/recursion-explained/', 'Programming', './img/recursive-function.jpg', ['Programming', 'Algorithms', 'MUO'], 'recusionUse');
	recusionUse.createCard();
	arrayOfCards.push(recusionUse);

	//Get Started With Phaser For Game Development
	const phaserDev = new papers('Get Started With Phaser For Game Development', 'https://www.makeuseof.com/phaser-game-development/', 'Development', './img/phaser.png', ['Video Games', 'Programming', 'MUO'], 'phaserDev');
	phaserDev.createCard();
	arrayOfCards.push(phaserDev);

	//Bringing Your Characters to Life in Phaser
	const phaserChar = new papers('Bringing Your Characters to Life in Phaser', 'https://www.makeuseof.com/animate-sprite-with-phaser/', 'Development', './img/phaser.png', ['Video Games', 'Programming', 'MUO'], 'phaserChar');
	phaserChar.createCard();
	arrayOfCards.push(phaserChar);

	//What Is Big-O Notation?
	const bigO = new papers('What Is Big-O Notation?', 'https://www.makeuseof.com/what-is-big-o-notation/', 'Programming', './img/coding-project-ideas-intro.jpg', ['Programming', 'Algorithms', 'MUO'], 'bigO');
	bigO.createCard();
	arrayOfCards.push(bigO);

	//A Beginner's Guide To Raspberry Pi Breadboarding With The Game Simon
	const simonPi = new papers("Raspberry Pi Breadboarding With The Game Simon", 'https://www.makeuseof.com/beginners-guide-to-raspberry-pi-breadboarding-with-simon/', 'Programming', './img/20201021_133358.jpg', ['Video Games', 'Programming', 'MUO'], 'simonPi');
	simonPi.createCard();
	arrayOfCards.push(simonPi);

	//6 Software Development Steps All Programmers Should Know
	const sixDev = new papers('6 Software Development Steps All Programmers Should Know', 'https://www.makeuseof.com/software-development-steps/', 'Development', './img/software-planning.jpg', ['Design', 'MUO'], 'sixDev');
	sixDev.createCard();
	arrayOfCards.push(sixDev);



	/******************* FROM COMPERHENSIVE EXAM *********************/
	//A Brief History of Video Games in Education
	const edGameHistory = new papers('A Brief History of Video Games in Education', './papers/edGameHistory.html', 'Game-Based Education', './img/pexels-garrett-johnson-3800795.jpg', ['Video Games', 'Learning', 'Academic'], 'edGameHistory');
	edGameHistory.createCard();
	arrayOfCards.push(edGameHistory);

	//What is Play
	const whatIsPlay = new papers('What is Play?', './papers/whatIsPlay.html', 'Play', './img/pexels-suzy-hazelwood-1275235.jpg', ['Play', 'Learning', 'Academic'], 'whatIsPlay');
	whatIsPlay.createCard();
	arrayOfCards.push(whatIsPlay);

	//The History of Theories of Play in Learning
	const theoriesOfPlay = new papers('The History of Theories of Play in Learning', './papers/theoriesOfPlay.html', 'Play', './img/pexels-magda-ehlers-1319572.jpg', ['Play', 'Learning', 'Academic', 'History'], 'theoriesOfPlay');
	theoriesOfPlay.createCard();
	arrayOfCards.push(theoriesOfPlay);

	//Play for Adult Learning
	const playAdultLearning = new papers('Play for Adult Learning', './papers/playAdultLearning.html', 'Play', './img/pexels-jeshootscom-1040157.jpg', ['Play', 'Learning', 'Andragogy', 'Academic'], 'playAdultLearning');
	playAdultLearning.createCard();
	arrayOfCards.push(playAdultLearning);

	//History of Non-Formal Learning
	const nonFormalEdHistory = new papers('History of Non-Formal Learning', './papers/nonFormalEdHistory.html', 'Non-Formal Education', './img/pexels-cottonbro-4778611.jpg', ['Learning', 'Academic', 'Non-Formal Education', 'History'], 'nonFormalEdHistory');
	nonFormalEdHistory.createCard();
	arrayOfCards.push(nonFormalEdHistory);

	//Defining Non-Formal Education
	const definitionOfNonFOrmalEd = new papers('Towards a Classification of Learning', './papers/definitionOfNonFormalEd.html', 'Non-Formal Education', './img/pexels-scott-webb-305823.jpg', ['Learning', 'Non-Formal Education', 'Design'], 'definitionOfNonFOrmalEd');
	definitionOfNonFOrmalEd.createCard();
	arrayOfCards.push(definitionOfNonFOrmalEd);

	//Games in Education
	const gamesInEd = new papers('Games in Education', './papers/gamesInEd.html', 'Game-Based Education', './img/pexels-francesco-ungaro-1670977.jpg', ['Video Games', 'Play', 'Learning', 'Academic', 'Design'], 'gamesInEd');
	gamesInEd.createCard();
	arrayOfCards.push(gamesInEd);
}
