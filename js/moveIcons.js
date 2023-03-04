// mVEnBVdr34dVeF6
const WIDTH = 60;
const divArray = [];

function getStrengthOfEffect(mouse, div, axis){
    const divX = div.getBoundingClientRect().x;
    const divY = div.getBoundingClientRect().y;
    const mX = mouse.x;
    const mY = mouse.y;
    
    const distanceY = Math.abs(divY - mY);
    const distanceX = Math.abs(divX - mX);
    const relativeDistanceY = distanceY/WIDTH;
    const relativeDistanceX = distanceX/WIDTH;
    let strengthOfEffect;
    
    if(axis == "x"){
        strengthOfEffect = 1/relativeDistanceX;
    }else{
        strengthOfEffect = 1/relativeDistanceY;
    }
    
    if(relativeDistanceX > 6 || relativeDistanceY > 6){
        strengthOfEffect = 0;
    }
    return strengthOfEffect;
}

function moveMe(e){
    for (const div of divArray){
        const divX = div.el.getBoundingClientRect().x;
        const divY = div.el.getBoundingClientRect().y;
        const mX = e.x;
        const mY = e.y;
        
        if(mY < divY - WIDTH/2){
            const strengthOfEffect = getStrengthOfEffect(e, div.el, "y");
            
            let newYPos = divY + strengthOfEffect;
            if (newYPos > div.y + (3 * WIDTH)){
                newYPos = div.y + (3 * WIDTH);
            }
            div.el.style.top = newYPos + "px";
        }
        
        if(mY > divY + WIDTH/2){
            const strengthOfEffect = getStrengthOfEffect(e, div.el, "y");
        
            let newYPos = divY - strengthOfEffect;
            if (newYPos < div.y - (3 * WIDTH)){
                newYPos = div.y - (3 * WIDTH);
            }
            div.el.style.top = newYPos + "px";
        }
        
        if(mX < divX - WIDTH/2){
            const strengthOfEffect = getStrengthOfEffect(e, div.el, "x");
            
            let newXPos = divX + strengthOfEffect;
            if (newXPos > div.x + (3 * WIDTH)){
                newXPos = div.x + (3 * WIDTH);
            }
            div.el.style.left = newXPos + "px";
        }
        
        if(mX > divX + WIDTH/2){
            const strengthOfEffect = getStrengthOfEffect(e, div.el, "x");       
            let newXPos = divX - strengthOfEffect;
            if (newXPos < div.x - (3 * WIDTH)){
                newXPos = div.x - (3 * WIDTH);
            }
            div.el.style.left = newXPos + "px";
        }
    }
}

function makeDivObjects(){
    const divEls = document.querySelectorAll("div#skills > div");
    console.log(divEls);
    for (const el of divEls){
        const tempObj = {
            el: el,
            x: el.getBoundingClientRect().x,
            y: el.getBoundingClientRect().y
        }
        divArray.push(tempObj);
    }
}

// checking if the document is ready
window.addEventListener("load", function (e) {
    // checking for a mouse
    if (matchMedia('(pointer:fine)').matches) {
        makeDivObjects();
        document.addEventListener("mousemove", moveMe);
    }  
});
