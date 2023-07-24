const start = document.getElementById('start');
const reset = document.getElementById('reset');
const high_score_display = document.getElementById('hi-score');

reset.addEventListener('click',function(){

    

    window.location.reload(true);
    
    





})





let hiscore =0;
const width = 28;
const height = 31;
const grid = document.querySelector('.grid');
const scoreDisplay = document.querySelector('#score');
let squares = [];
let score =0;
let totalPellets = 240


function button_sound(){

    let press = new Audio('soundeffects/eatdots.wav');
    press.play();
    
    
    }

function scareSound(){

        let press = new Audio('soundeffects/Pac-Man-Ghosts-Sound.mp3');
        press.play();
        
        
        }

function interMission(){

        let press = new Audio('soundeffects/pacman_intermission.wav');
        press.play();
        
        
        }

function deadSound(){

            let dead = new Audio('soundeffects/pacman_death.wav');
            dead.play();
            
            
            }





    



// 28*28 = 784
    //0- pac-dots
    //1- wall
    //2- ghost-lair
    //3- power peller
    //4- empty


const w = 'wall' 
const b = 'blank' 
const d = 'pac-dot'
const p = 'power-pill'
const l = 'ghost-lair'
const e = 'door'
const x = 'invisible-wall'
const f = 'bonus-sq'

    const layout = [
        w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w,
        w, d, d, d, d, d, d, d, d, d, d, d, d, w, w, d, d, d, d, d, d, d, d, d, d, d, d, w,
        w, d, w, w, w, w, d, w, w, w, w, w, d, w, w, d, w, w, w, w, w, d, w, w, w, w, d, w,
        w, p, w, w, w, w, d, w, w, w, w, w, d, w, w, d, w, w, w, w, w, d, w, w, w, w, p, w,
        w, d, w, w, w, w, d, w, w, w, w, w, d, w, w, d, w, w, w, w, w, d, w, w, w, w, d, w,
        w, d, d, d, d, d, d, d, d, d, d, d, d, d, d, d, d, d, d, d, d, d, d, d, d, d, d, w,
        w, d, w, w, w, w, d, w, w, d, w, w, w, w, w, w, w, w, d, w, w, d, w, w, w, w, d, w,
        w, d, w, w, w, w, d, w, w, d, w, w, w, w, w, w, w, w, d, w, w, d, w, w, w, w, d, w,
        w, d, d, d, d, d, d, w, w, d, d, d, d, w, w, d, d, d, d, w, w, d, d, d, d, d, d, w,
        w, w, w, w, w, w, d, w, w, w, w, w, b, w, w, b, w, w, w, w, w, d, w, w, w, w, w, w,
        b, b, b, b, b, w, d, w, w, w, w, w, b, w, w, b, w, w, w, w, w, d, w, b, b, b, b, b,
        b, b, b, b, b, w, d, w, w, b, b, b, b, b, b, b, b, b, b, w, w, d, w, b, b, b, b, b,
        b, b, b, b, b, w, d, w, w, b, w, w, w, e, e, w, w, w, b, w, w, d, w, b, b, b, b, b,
        w, w, w, w, w, w, d, w, w, b, w, x, l, l, l, l, x, w, b, w, w, d, w, w, w, w, w, w,
        b, b, b, b, b, b, d, b, b, b, w, x, x, x, x, x, x, w, b, b, b, d, b, b, b, b, b, b,
        w, w, w, w, w, w, d, w, w, b, w, x, x, x, x, x, x, w, b, w, w, d, w, w, w, w, w, w,
        b, b, b, b, b, w, d, w, w, b, w, w, w, w, w, w, w, w, b, w, w, d, w, b, b, b, b, b,
        b, b, b, b, b, w, d, w, w, b, b, b, b, b, f, b, b, b, b, w, w, d, w, b, b, b, b, b,
        b, b, b, b, b, w, d, w, w, b, w, w, w, w, w, w, w, w, b, w, w, d, w, b, b, b, b, b,
        w, w, w, w, w, w, d, w, w, b, w, w, w, w, w, w, w, w, b, w, w, d, w, w, w, w, w, w,
        w, d, d, d, d, d, d, d, d, d, d, d, d, w, w, d, d, d, d, d, d, d, d, d, d, d, d, w,
        w, d, w, w, w, w, d, w, w, w, w, w, d, w, w, d, w, w, w, w, w, d, w, w, w, w, d, w,
        w, d, w, w, w, w, d, w, w, w, w, w, d, w, w, d, w, w, w, w, w, d, w, w, w, w, d, w,
        w, p, d, d, w, w, d, d, d, d, d, d, d, b, b, d, d, d, d, d, d, d, w, w, d, d, p, w,
        w, w, w, d, w, w, d, w, w, d, w, w, w, w, w, w, w, w, d, w, w, d, w, w, d, w, w, w,
        w, w, w, d, w, w, d, w, w, d, w, w, w, w, w, w, w, w, d, w, w, d, w, w, d, w, w, w,
        w, d, d, d, d, d, d, w, w, d, d, d, d, w, w, d, d, d, d, w, w, d, d, d, d, d, d, w,
        w, d, w, w, w, w, w, w, w, w, w, w, d, w, w, d, w, w, w, w, w, w, w, w, w, w, d, w,
        w, d, w, w, w, w, w, w, w, w, w, w, d, w, w, d, w, w, w, w, w, w, w, w, w, w, d, w,
        w, d, d, d, d, d, d, d, d, d, d, d, d, d, d, d, d, d, d, d, d, d, d, d, d, d, d, w,
        w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w
      ]




// create Bord
function createBoard(){


    for(let i=0;i<layout.length;i++){

        // creating new <div>
        let square = document.createElement('div');

        // adding class to it
        square.classList.add('squares');

        // adding the newly create div to grid
        grid.appendChild(square);

        // pushing newly create square into squares array
        squares.push(square);


        if(layout[i]=='pac-dot'){

            squares[i].classList.add('pac-dot');

        }
        else if(layout[i]=='wall'){

            squares[i].classList.add('wall');

        }
        
        else if(layout[i]=='power-pill'){

            squares[i].classList.add('power-pellet');

        }
        else if(layout[i]=='invisible-wall'){

            squares[i].classList.add('invisible-wall');

        }
        else if(layout[i]=='door'){

            squares[i].classList.add('door');

        }
        else if(layout[i]=='bonus-sq'){

            squares[i].classList.add('bonus-sq');

        }
        else if(layout[i]=='blank'){

            squares[i].classList.add('blank');

        }
        
        
    }

}


//-------------------------------------High Score Logic Part --------------------------------------------------------------------------

if(localStorage.getItem('hi-score-key')){

    high_score_display.textContent = `${JSON.parse(localStorage.getItem('hi-score-key'))}`;
  }
  
  function getsetHighScore(){
  
      if(localStorage.getItem('hi-score-key')){
  
        if(score>JSON.parse(localStorage.getItem('hi-score-key'))){
          hiscore = score;
          localStorage.setItem('hi-score-key',`${hiscore}`);
          high_score_display.textContent = `${JSON.parse(localStorage.getItem('hi-score-key'))}`;
  
          
  
        }
        
      }
      else{
        
        hiscore = score;
        
        localStorage.setItem('hi-score-key',`${hiscore}`)
       
  
      }
  }
  
  getsetHighScore();
  
  //----------------------------------------High Score logic Part End-------


createBoard();

let pacmanCurrentIndex = 658;
squares[pacmanCurrentIndex].classList.add('pacman');

start.addEventListener('click',function (){  /////////////////////////////

    
    document.getElementById('game-message').style.display= 'none';
    start.disabled = true;
    start.style.backgroundColor = 'gray';
    



// starting position of pacman



// Key Controls
document.addEventListener('keyup', handleKeyInput);

document.querySelectorAll('.d-btn').forEach(item => item.addEventListener('click', handleKeyInput))





function handleKeyInput (event) {

   squares[pacmanCurrentIndex].classList.remove('pacman');
  
const input = event.type === 'keyup' ? event.key : event.currentTarget.id




squares[pacmanCurrentIndex].classList.remove('pacman-up');
squares[pacmanCurrentIndex].classList.remove('pacman');
squares[pacmanCurrentIndex].classList.remove('pacman-left');
squares[pacmanCurrentIndex].classList.remove('pacman-down');

    switch (input) {
        case 'ArrowRight':
        case 'btn-right':
        case 'd':
          
      
            if(  !squares[pacmanCurrentIndex+1].classList.contains('wall') && pacmanCurrentIndex%width<width-1) pacmanCurrentIndex +=1;
            if(pacmanCurrentIndex==419){

                pacmanCurrentIndex = 392;
                
            }
            powerPelletEaten()
            pacDotEaten();
            checkForWin()
            gameOver()
            
            squares[pacmanCurrentIndex].classList.remove('pacman-up');
            squares[pacmanCurrentIndex].classList.remove('pacman-down');
            squares[pacmanCurrentIndex].classList.remove('pacman-left');
            squares[pacmanCurrentIndex].classList.add('pacman');
            
          
          break
    
        case 'ArrowUp':
        case 'btn-up':
        case 'w':
            
            if(!squares[pacmanCurrentIndex-width].classList.contains('wall') &&pacmanCurrentIndex-width>=0) pacmanCurrentIndex -= width;
            powerPelletEaten()
            pacDotEaten()
            checkForWin()
            gameOver()
            
            squares[pacmanCurrentIndex].classList.remove('pacman');
            squares[pacmanCurrentIndex].classList.remove('pacman-down');
            squares[pacmanCurrentIndex].classList.remove('pacman-left');
            squares[pacmanCurrentIndex].classList.add('pacman-up');
          break
    
        case 'ArrowLeft':
        case 'btn-left':
        case 'a':
        
            
            if( !squares[pacmanCurrentIndex-1].classList.contains('wall') && pacmanCurrentIndex%width!==0) pacmanCurrentIndex -= 1;
            if(pacmanCurrentIndex==392){

                pacmanCurrentIndex = 419;
                
            }
            powerPelletEaten()
            pacDotEaten()
            checkForWin()
            gameOver()
            
            squares[pacmanCurrentIndex].classList.remove('pacman');
            squares[pacmanCurrentIndex].classList.remove('pacman-down');
            squares[pacmanCurrentIndex].classList.remove('pacman-up');
            squares[pacmanCurrentIndex].classList.add('pacman-left');

         
          break
    
        case 'ArrowDown':
        case 'btn-down':
        case 's':
          
            if(
                !squares[pacmanCurrentIndex+width].classList.contains('door') && !squares[pacmanCurrentIndex+width].classList.contains('wall') &&
                pacmanCurrentIndex+width<width*height) pacmanCurrentIndex += width;
                powerPelletEaten()
                pacDotEaten()
                checkForWin()
                gameOver()
                
                squares[pacmanCurrentIndex].classList.remove('pacman');
            
                squares[pacmanCurrentIndex].classList.remove('pacman-up');
                squares[pacmanCurrentIndex].classList.remove('pacman-left');
                squares[pacmanCurrentIndex].classList.add('pacman-down');
          
          break
      }
    
      squares[pacmanCurrentIndex].classList.add('pacman');
      checkForWin()
      gameOver()
      
      




  

  
}

// Pac dot Eaten

function pacDotEaten(){


    if(squares[pacmanCurrentIndex].classList.contains('pac-dot')){

        score++;
        getsetHighScore();
        totalPellets--;
        if(score==120){

            interMission();
        }
        else {
        button_sound();
        }
        scoreDisplay.textContent = `${score}`;
        squares[pacmanCurrentIndex].classList.remove('pac-dot');

    }

}


function powerPelletEaten(){

    //if square pacman is in contains a power
    if(squares[pacmanCurrentIndex].classList.contains('power-pellet')){
        squares[pacmanCurrentIndex].classList.remove('power-pellet');
        score +=10;
        scareSound();
        
        
        ghosts.forEach(ghost => ghost.isScared=true);

         setTimeout(unScareGhosts,10000);



    }


}



function unScareGhosts(){


    ghosts.forEach(ghost => ghost.isScared=false);
    
    
    
    

}











class Ghost {

    constructor(className, startIndex, speed){
        this.className = className;
        this.startIndex = startIndex;
        this.speed = speed;
        this.currentIndex = startIndex;
        this.isScared = false;
        this.timerId = NaN;


    }


}

const ghosts = [

new Ghost('blinky',376,50),
new Ghost('pinky',377,100),
new Ghost('inky',378,150),
new Ghost('clyde',379,200)


] 

// draw my ghost onto my grid

ghosts.forEach(ghost =>{ squares[ghost.currentIndex].classList.add(ghost.className)
squares[ghost.currentIndex].classList.add('ghost')
});


// move the ghost





    
    ghosts.forEach(ghost=>moveGhost(ghost))

    


function moveGhost(ghost){


    const directions = [-1,+1,-width,+width];
    let direction = directions[Math.floor(Math.random()*directions.length)]

    ghost.timerId = setInterval(function(){

        //if the next does not contain a wall and ghost

        if(!squares[ghost.currentIndex+direction].classList.contains('wall')&& !squares[ghost.currentIndex+direction].classList.contains('ghost')){
            //removing any ghost
        squares[ghost.currentIndex].classList.remove(ghost.className)
        squares[ghost.currentIndex].classList.remove('ghost','scared-ghost')
        // add direction to current Index
        ghost.currentIndex += direction
        //add ghost class
        squares[ghost.currentIndex].classList.add(ghost.className);
        squares[ghost.currentIndex].classList.add('ghost')


        } else{

            direction = directions[Math.floor(Math.random()*directions.length)]

        }

        if(ghost.isScared){

            squares[ghost.currentIndex].classList.add('scared-ghost');
            

        }
        // if the ghost is current scared and pacman is on it
        if(ghost.isScared && squares[ghost.currentIndex].classList.contains('pacman')){

            //remove classname - ghost.className, 'ghost' , 'scared-ghost'
            
            squares[ghost.currentIndex].classList.remove(ghost.className,'ghost','scared-ghost')
            //change ghost currentIndex back to its startIndex
            ghost.currentIndex = ghost.startIndex
            score +=100;
            getsetHighScore();
            //add a score of 100;
            squares[ghost.currentIndex].classList.add(ghost.className,ghost);
            

            //readd classnames of ghost and ghost to the ghost new postion
             
        }
        gameOver();
        
    },ghost.speed)

    
}

// check for Game Over

function gameOver(){

    // if the square pacman is in contains a ghost And does Not contain a scared ghost
    if(squares[pacmanCurrentIndex].classList.contains('ghost') && !squares[pacmanCurrentIndex].classList.contains('scared-ghost')){
        deadSound();
     //for each ghost - we need to stop it moving
        ghosts.forEach(ghost=>clearInterval(ghost.timerId));
    //remove eventlistener from our control function
        document.removeEventListener('keyup',handleKeyInput);
    //tell user game is over
    scoreDisplay.innerHTML='You Lost';



    }


}

function checkForWin(){

    if(totalPellets==0){


    ghosts.forEach(ghost=>clearInterval(ghost.timerId));
    //remove eventlistener from our control function
    document.removeEventListener('keyup',handleKeyInput);
    //tell user win
    scoreDisplay.innerHTML='You Win!';


    }






}


})

