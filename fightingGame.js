const Dracaena = {
	position: {
		x:0,
		y:0
	},
	velocity: {
		x:0,
		y:10
	},
	offset1: {
		x:55,
		y:35,
		width:60,
		height:50,
		knockback:20,
		frame:2
	},
	imageSrc:'dracIdle.png',
	framesMax:4,
	framesHold:15,
	scale:.615,
	offset:{
		x:100,
		y:70
	},
	sprites: {
		idle:{
			imageSrc:'dracIdle.png',
			framesMax:4,
			framesHold:15,
			scale:.615,
			backwardsImg:'dracIdlebackwards.png',
			temp:null,
			offset:{
				x:100,
				y:70
			}
		},
		run:{
			imageSrc:'dracRun.png',
			framesMax:11,
			framesHold:4,
			scale:1.85,
			backwardsImg:'dracRunbackwards.png',
			temp:null,
			offset:{
				x:60,
				y:70
			}
		},
		jump:{
			imageSrc:'dracJump.png',
			framesMax:3,
			framesHold:12,
			scale:.48,
			backwardsImg:'dracJumpbackwards.png',
			temp:null,
			offset:{
				x:60,
				y:70
			}
		},
		fall:{
			imageSrc:'dracFall.png',
			framesMax:2,
			framesHold:6,
			scale:.36,
			backwardsImg:'dracFallbackwards.png',
			temp:null,
			offset:{
				x:60,
				y:70
			}
		},
		attack1:{
			imageSrc:'dracAttack1.png',
			framesMax:4,
			framesHold:5,
			scale:.66,
			backwardsImg:'dracAttack1backwards.png',
			temp:null,
			offset:{
				x:100,
				y:70
			}
		},
		takeHit:{
			imageSrc:'dracTakehit.png',
			framesMax:3,
			framesHold:11,
			scale:.43,
			backwardsImg:'dracTake Hitbackwards.png',
			temp:null,
			offset:{
				x:60,
				y:70
			}
		},
		death:{
			imageSrc:'dracDeath.png',
			framesMax:10,
			framesHold:9,
			scale:1.7,
			backwardsImg:'dracDeathbackwards.png',
			temp:null,
			offset:{
				x:60,
				y:70
			}
		}
	},
	height:150,
	width:50,
	speed:6
}

const Richard = {
	position: {
		x:400,
		y:100
	},
	velocity: {
		x:0,
		y:0
	},
	offset1: {
		x:125,
		y:50,
		//x:170,
		//y:50,
		width:70,
		height:50,
		knockback:27,
		frame:2
	},
	imageSrc:'richardIdle.png',
	framesMax:8,
	framesHold:6,
	scale:1.3,
	offset:{
		x:60,
		y:65
	},
	sprites: {
		idle:{
			imageSrc:'richardIdle.png',
			framesMax:8,
			framesHold:6,
			scale:1.3,
			backwardsImg:'richardIdlebackwards.png',
			temp:null,
			offset:{
				x:60,
				y:66
			}
		},
		run:{
			imageSrc:'richardRun.png',
			framesMax:7,
			framesHold:6,
			scale:1.18,
			backwardsImg:'richardRunbackwards.png',
			temp:null,
			offset:{
				x:60,
				y:66
			}
		},
		jump:{
			imageSrc:'richardJump.png',
			framesMax:2,
			framesHold:12,
			scale:.4,
			backwardsImg:'richardJumpbackwards.png',
			temp:null,
			offset:{
				x:60,
				y:70
			}
		},
		fall:{
			imageSrc:'richardFall.png',
			framesMax:2,
			framesHold:6,
			scale:.40,
			backwardsImg:'richardFallbackwards.png',
			temp:null,
			offset:{
				x:60,
				y:70
			}
		},
		attack1:{
			imageSrc:'richardAttack1.png',
			framesMax:5,
			framesHold:6,
			scale:.9,
			backwardsImg:'richardAttack1backwards.png',
			temp:null,
			offset:{
				x:70,
				y:80
			}
		},
		takeHit:{
			imageSrc:'richardTakehit.png',
			framesMax:5,
			framesHold:4,
			scale:.8,
			backwardsImg:'richardTakehitbackwards.png',
			temp:null,
			offset:{
				x:70,
				y:80
			}
		},
		death:{
			imageSrc:'richardDeath.png',
			framesMax:9,
			framesHold:6,
			scale:1.6,
			backwardsImg:'richardDeathbackwards.png',
			temp:null,
			offset:{
				x:70,
				y:80
			}
		}
	},
	height:230,
	width:120,
	speed:3.5
}

const fighterPortraits=['dracPortrait.png','richardPortrait.png']
const fighters=[Dracaena,Richard]
let player;
let enemy;
let end=[false]
let containerDiv=document.createElement("div")
containerDiv.id='fightingGame'
document.body.appendChild(containerDiv)
containerDiv.tabIndex=0
document.getElementById("fightingGame").onkeydown=function(e){
        if (e.key === "ArrowUp" || e.key === "ArrowDown" || e.key===" ") {
          //e.stopPropagation();
          e.preventDefault();
          return false;
        }
        //e.stopPropagation();
};
let fgActivator=document.createElement('button')
containerDiv.appendChild(fgActivator)
fgActivator.style.margin='auto auto auto auto'
fgActivator.innerHTML='Play'
let playerSelect=true
fgActivator.onclick=function(){
	fgActivator.remove()
	for (let i=0;i<fighterPortraits.length;i++){
		let portrait=document.createElement('img')
		portrait.src=fighterPortraits[i]
		console.log(i)
		containerDiv.appendChild(portrait)
		portrait.style.height='45px'
		portrait.style.width='45px'
		portrait.style.border='3px green solid'
		portrait.onclick=function(){
			if (playerSelect){
				player={...fighters[i]}
			} else {
				enemy={...fighters[i]}
			}
			playerSelect=false
			console.log(player,enemy)
			if (player!=null&&enemy!=null){
				containerDiv.innerHTML=''
				string1 = JSON.stringify(player);
    			string2 = JSON.stringify(enemy);
				if (string1==string2){
					console.log("yes")
					enemy=JSON.parse(JSON.stringify(player))
				}
				createGame()
			}
		}
	}
}

function createGame(){
containerDiv.style.display=''
let healthbar=document.createElement("div")

let playerHealth=document.createElement("div")
let playerHealthBar=document.createElement("div")
let playerBackground=document.createElement("div")

let enemyHealth=document.createElement("div")
let enemyHealthBar=document.createElement("div")
let enemyBackground=document.createElement("div")

let endgame=document.createElement('div')

let timer=document.createElement("div")
containerDiv.appendChild(healthbar)
healthbar.appendChild(playerHealth)
healthbar.appendChild(timer)
healthbar.appendChild(enemyHealth)
containerDiv.appendChild(endgame)
containerDiv.appendChild(document.createElement('canvas'))
playerHealth.appendChild(playerHealthBar)
playerHealth.appendChild(playerBackground)
enemyHealth.appendChild(enemyHealthBar)
enemyHealth.appendChild(enemyBackground)
containerDiv.style.fontFamily='botw'
//containerDiv.style.display='inline-block'

healthbar.style.position='absolute'
healthbar.style.display='flex'
healthbar.style.width='100%'
healthbar.style.padding='20px'
healthbar.style.alignItems='center'

playerHealth.style.position="relative"
playerHealth.style.width='100%'
playerHealth.style.display='flex'
playerHealth.style.justifyContent='flex-end'
playerHealth.style.borderTop='4px solid white'
playerHealth.style.borderLeft='4px solid white'
playerHealth.style.borderBottom='4px solid white'

playerBackground.style.backgroundColor='red'
playerBackground.style.height='30px'
playerBackground.style.width='100%'

playerHealthBar.style.position='absolute'
playerHealthBar.style.backgroundColor='#818CF8'

playerHealthBar.style.top='0'
playerHealthBar.style.right='0'
playerHealthBar.style.bottom='0'
playerHealthBar.style.width='100%'

timer.style.backgroundColor="black"
timer.style.height="50px"
timer.style.width='100px'
timer.style.flexShrink='0'
timer.style.display='flex'
timer.style.alignItems='center'
timer.style.justifyContent='center'
timer.innerHTML = '10'
timer.style.color='white'
timer.style.border='4px solid white'

enemyHealth.style.position='relative'
enemyHealth.style.width='100%'
enemyHealth.style.borderTop='4px solid white'
enemyHealth.style.borderRight='4px solid white'
enemyHealth.style.borderBottom='4px solid white'

enemyBackground.style.backgroundColor='red'
enemyBackground.style.height='30px'

enemyHealthBar.style.position='absolute'
enemyHealthBar.style.backgroundColor='#818CF8'
enemyHealthBar.style.top='0'
enemyHealthBar.style.right='0'
enemyHealthBar.style.bottom='0'
enemyHealthBar.style.left='0'

endgame.style.position='absolute'
endgame.style.color='white'
endgame.style.display='none'
endgame.style.alignItems='center'
endgame.style.justifyContent='center'
endgame.style.top='0'
endgame.style.right='0'
endgame.style.bottom='0'
endgame.style.left='0'

let canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
canvas.width = 1024
canvas.height=576

c.fillRect(0,0,canvas.width,canvas.height)
const gravity=0.7

player.position={
	x:0,
	y:0
}
enemy.position={
	x:400,
	y:100
}
class Sprite {
	constructor({position,imageSrc,scale=1,framesMax=1,offset={x:0 , y:0} }){
		this.position = position 
		this.width=50
		this.height=150
		this.image=new Image()
		this.image.src=imageSrc
		this.scale=scale
		this.framesMax=framesMax
		this.currentFrame=0
		this.framesElapsed=0
		this.framesHold=5
		this.offset=offset
	}

	draw(){
		c.drawImage(this.image,this.currentFrame*(this.image.width/this.framesMax),0,this.image.width/this.framesMax,this.image.height,this.position.x-this.offset.x,this.position.y-this.offset.y,(this.image.width/this.framesMax)*this.scale,this.image.height*this.scale)		
	}

	animateFrames(){
		this.framesElapsed++
		if (this.framesElapsed%this.framesHold==0){
			if (this.currentFrame<this.framesMax-1){
				this.currentFrame++
			} else {
				this.currentFrame=0
			}
		}
	}
	update(){
		this.draw()
		this.animateFrames()
	}
}

const background=new Sprite({
	position: {
		x:0,
		y:0,
	},
	imageSrc:'background.png'
})
const shop=new Sprite({
	position: {
		x:600,
		y:128,
	},
	imageSrc:'shop_anim.png',
	scale:2.75,
	framesMax:6
})
class Fighter extends Sprite{
	constructor({position,velocity,offset1,imageSrc,scale=1,framesMax=1,framesHold=5,offset= {x:0, y:0},sprites,height,width,speed }){
		super({position,imageSrc,scale,framesMax, offset}) 
		this.velocity=velocity
		this.width=width
		this.height=150
		this.lastKey
		this.attackBox= {
			position: {
				x:this.position.x,
				y:this.position.y
			},
			offset1,
			width: offset1.width,
			height:offset1.height,
			knockback:offset1.knockback
		}
		this.isAttacking
		this.health=100
		this.currentFrame=0
		this.framesElapsed=0
		this.framesHold=framesHold
		this.sprites=sprites
		this.dead=false
		this.speed=speed
		this.attackPress=true
		this.jumpArc=0
		for (const sprite in this.sprites){
			sprites[sprite].image=new Image()
			sprites[sprite].image.src=sprites[sprite].imageSrc
		}
		console.log(this.sprites)
	}

	update(){
		this.draw()
		if (!this.dead) this.animateFrames()
		this.attackBox.offset1.x<0?this.attackBox.position.x=this.position.x-this.attackBox.width:this.attackBox.position.x=this.position.x+this.width
		this.attackBox.position.y=this.position.y+this.attackBox.offset1.y
		//c.fillRect(this.attackBox.position.x, this.attackBox.position.y,this.attackBox.width,this.attackBox.height)
		//c.fillRect(this.position.x, this.position.y,this.width,this.height)
		this.position.y +=this.velocity.y
		if ((this.velocity.x<0&&this.velocity.x+this.position.x<0)||(this.velocity.x>0&&this.velocity.x+this.position.x>900)) this.velocity.x=0
		if (!(this.velocity.y==0&&this.image==this.sprites.attack1.image))this.position.x +=this.velocity.x
		if (this.position.y+this.height+this.velocity.y>=canvas.height-96){
			this.velocity.y=0
			this.position.y=330
		} else {
			this.velocity.y+=gravity
		}
	}
	attack(direction){
		if (direction!=null){
			this.switchSprite('attack1','backwards')
		} else {
			this.switchSprite('attack1')
		}
		this.isAttacking=true
	}
	takeHit(direction){
		this.health-=20
		if (this.health<=0){
			if (direction!=null&&direction=='backwards'){
				this.switchSprite('death',direction)
			} else {
				this.switchSprite('death')
			}
		} else {
			if (direction!=null&&direction=='backwards'){
				this.switchSprite('takeHit',direction)
			} else {
				this.switchSprite('takeHit')
			}
		}
	}
	switchSprite(sprite,direction){
		if (this.image===this.sprites.death.image) {
			if (this.currentFrame===this.sprites.death.framesMax-1) this.dead=true
			return
		}
		if (this.image===this.sprites.takeHit.image&&this.currentFrame<this.sprites.takeHit.framesMax-1) return
		if (this.image===this.sprites.attack1.image&&this.currentFrame<this.sprites.attack1.framesMax-1) return
		switch (sprite){
			case 'idle':
			if (direction!=null&&direction=='backwards'){
				this.sprites.idle.image.src=this.sprites.idle.backwardsImg
			} else {
				this.sprites.idle.image.src=this.sprites.idle.imageSrc
			}
			if (this.image !==this.sprites.idle.image){
				this.framesMax=this.sprites.idle.framesMax
				this.framesHold=this.sprites.idle.framesHold
				this.scale=this.sprites.idle.scale
				this.image=this.sprites.idle.image
				this.offset=this.sprites.idle.offset
				this.currentFrame=0
			}
			break
			case 'run':
				if (direction!=null&&direction=='backwards'){
						this.sprites.run.image.src=this.sprites.run.backwardsImg
					} else {
						this.sprites.run.image.src=this.sprites.run.imageSrc
					}
				if (this.image !==this.sprites.run.image){
					this.framesMax=this.sprites.run.framesMax
					this.framesHold=this.sprites.run.framesHold
					this.scale=this.sprites.run.scale
					this.image=this.sprites.run.image
					this.offset=this.sprites.run.offset
					this.currentFrame=0
				}
				break
			case 'jump':
				if (direction!=null&&direction=='backwards'){
						this.sprites.jump.image.src=this.sprites.jump.backwardsImg
					} else {
						this.sprites.jump.image.src=this.sprites.jump.imageSrc
					}
				if (this.image !==this.sprites.jump.image){
					this.image=this.sprites.jump.image
					this.framesMax=this.sprites.jump.framesMax
					this.framesHold=this.sprites.jump.framesHold
					this.scale=this.sprites.jump.scale
					this.offset=this.sprites.jump.offset
					this.currentFrame=0
				}
				break
			case 'fall':
			if (direction!=null&&direction=='backwards'){
						this.sprites.fall.image.src=this.sprites.fall.backwardsImg
					} else {
						this.sprites.fall.image.src=this.sprites.fall.imageSrc
					}
				if (this.image !==this.sprites.fall.image){
					this.image=this.sprites.fall.image
					this.framesMax=this.sprites.fall.framesMax
					this.framesHold=this.sprites.fall.framesHold
					this.scale=this.sprites.fall.scale
					this.offset=this.sprites.fall.offset
					this.currentFrame=0
				}
				break
			case 'attack1':
				if (direction!=null&&direction=='backwards'){
						this.sprites.attack1.image.src=this.sprites.attack1.backwardsImg
					} else {
						this.sprites.attack1.image.src=this.sprites.attack1.imageSrc
					}
				if (this.image !==this.sprites.attack1.image){
					this.image=this.sprites.attack1.image
					this.framesMax=this.sprites.attack1.framesMax
					this.framesHold=this.sprites.attack1.framesHold
					this.scale=this.sprites.attack1.scale
					this.offset=this.sprites.attack1.offset
					this.currentFrame=0
				}
				break
			case 'takeHit':
				if (direction!=null&&direction=='backwards'){
						this.sprites.takeHit.image.src=this.sprites.takeHit.backwardsImg
					} else {
						this.sprites.takeHit.image.src=this.sprites.takeHit.imageSrc
					}
				if (this.image !==this.sprites.takeHit.image){
					this.image=this.sprites.takeHit.image
					this.framesMax=this.sprites.takeHit.framesMax
					this.framesHold=this.sprites.takeHit.framesHold
					this.scale=this.sprites.takeHit.scale
					this.offset=this.sprites.takeHit.offset
					this.currentFrame=0
				}
				break
			case 'death':
				if (direction!=null&&direction=='backwards'){
						this.sprites.death.image.src=this.sprites.death.backwardsImg
					} else {
						this.sprites.death.image.src=this.sprites.death.imageSrc
					}
				if (this.image !==this.sprites.death.image){
					this.image=this.sprites.death.image
					this.framesMax=this.sprites.death.framesMax
					this.framesHold=this.sprites.death.framesHold
					this.scale=this.sprites.death.scale
					this.offset=this.sprites.death.offset
					this.currentFrame=0
				}
				break
		}
	}
}
player=new Fighter(player)
enemy=new Fighter(enemy)
for (sprite in enemy.sprites){
	temp=sprite.imageSrc
	sprite.imageSrc=sprite.backwardsImg
	sprite.backwardsImg=temp
}
const keys = {
	a: {
		pressed:false
	},
	d: {
		pressed:false
	},
	w: {
		pressed:false
	},
	ArrowLeft: {
		pressed:false
	},
	ArrowRight: {
		pressed:false
	},
	ArrowUp: {
		pressed:false
	}
}
function rectangleCollision(rectangle,rectangle2){
	return (rectangle.attackBox.position.x+rectangle.attackBox.width>=rectangle2.position.x&&rectangle.attackBox.position.x<=rectangle2.position.x+rectangle2.width&&rectangle.attackBox.position.y+rectangle.attackBox.height>=rectangle2.position.y&&rectangle.attackBox.position.y<=rectangle2.position.y+rectangle2.height&&rectangle.isAttacking)
}

function endgameCheck() {
	endgame.style.display='flex'
	endgame.style.color='black'
	if (player.health==enemy.health){
		endgame.innerHTML="Draw"
		player.takeHit()
		player.takeHit()
		player.takeHit()
		player.takeHit()
		player.takeHit()
		enemy.takeHit()
		enemy.takeHit()
		enemy.takeHit()
		enemy.takeHit()
		enemy.takeHit()
	} else if (player.health>enemy.health){
		endgame.innerHTML="Player 1 Wins"
		if (enemy.image!=enemy.sprites.death.image) {
			enemy.takeHit()
			enemy.takeHit()
			enemy.takeHit()
			enemy.takeHit()
			enemy.takeHit()
		}
	} else if (enemy.health>player.health){
		endgame.innerHTML="Player 2 Wins"
		if (player.image!=player.sprites.death.image) {
			player.takeHit()
			player.takeHit()
			player.takeHit()
			player.takeHit()
			player.takeHit()
		}
	}
	setTimeout(deleter, 2000)
}

let timerValue=60
function decreaseTimer(){
	if (timerValue>0&&endgame.style.display=='none'){
		setTimeout(decreaseTimer,1000)
		timerValue--
		timer.innerHTML = timerValue
	}
	if (timerValue==0){
		endgameCheck()
	}
}

decreaseTimer()
function animate(){
	if (!end[0]){
	window.requestAnimationFrame(animate)
	c.fillStyle='black'
	c.fillRect(0,0,canvas.width,canvas.height)
	background.update()
	shop.update()
	c.fillStyle='rgba(255,255,255,0.17)'
	c.fillRect(0,0,canvas.width,canvas.height)
	if (player.image==player.sprites.death.image) player.lastKey=1234567890
	if (enemy.image==enemy.sprites.death.image) enemy.lastKey=1234567890

	player.update()
	enemy.update()
	player.velocity.x=0
	enemy.velocity.x=0
	//player movement
	if (keys.a.pressed&&player.lastKey=='a'&&player.image!=player.sprites.takeHit.image&&player.velocity.y==0) {
		player.velocity.x=-player.speed
		if (player.velocity.y==0){
			player.switchSprite('run','backwards')
			player.attackBox.offset1.x>0?player.attackBox.offset1.x*=-1:player.attackBox.offset1.x*=1
		}
	} else if (keys.d.pressed&&player.lastKey=='d'&&player.image!=player.sprites.takeHit.image&&player.velocity.y==0) {
		player.velocity.x=player.speed
		if (player.velocity.y==0){
			player.switchSprite('run')
			player.attackBox.offset1.x<0?player.attackBox.offset1.x*=-1:player.attackBox.offset1.x*=1

		}
	}

	if (player.velocity.y<0){
		if (player.jumpArc!=0){
			player.velocity.x=player.jumpArc
		}
		if (player.velocity.x>0||(player.position.x<enemy.position.x&&player.velocity.x==0)){
			player.switchSprite('jump')
		} else {
			player.switchSprite('jump','backwards')
		}
	} else if (player.velocity.y>0){
		if (player.jumpArc!=0){
			player.velocity.x=player.jumpArc
		}
		if (player.velocity.x>0||(player.position.x<enemy.position.x&&player.velocity.x==0)){
			player.switchSprite('fall')
		} else {
			player.switchSprite('fall','backwards')
		}
	} else if (player.velocity.x===0&&player.velocity.y==0){
		if (player.position.x<enemy.position.x){
			player.switchSprite('idle')
			player.attackBox.offset1.x<0?player.attackBox.offset1.x*=-1:player.attackBox.offset1.x*=1
		} else {
			player.switchSprite('idle','backwards')
			player.attackBox.offset1.x>0?player.attackBox.offset1.x*=-1:player.attackBox.offset1.x*=1
		}
	}

	//enemy movement
	if (keys.ArrowLeft.pressed&&enemy.lastKey=='ArrowLeft'&&enemy.image!=enemy.sprites.takeHit.image&&enemy.velocity.y==0) {
		enemy.velocity.x=-enemy.speed
		if (enemy.velocity.y==0){
			enemy.switchSprite('run','backwards')
			enemy.attackBox.offset1.x>0?enemy.attackBox.offset1.x*=-1:enemy.attackBox.offset1.x*=1
		}
	} else if (keys.ArrowRight.pressed&&enemy.lastKey=='ArrowRight'&&enemy.image!=enemy.sprites.takeHit.image&&enemy.velocity.y==0) {
		enemy.velocity.x=enemy.speed
		if (enemy.velocity.y==0){
			enemy.switchSprite('run')
			enemy.attackBox.offset1.x<0?enemy.attackBox.offset1.x*=-1:enemy.attackBox.offset1.x*=1
		}
	}

	if (enemy.velocity.y<0){
		if (enemy.jumpArc!=0){
			enemy.velocity.x=enemy.jumpArc
		}
		if (enemy.velocity.x>0||(enemy.position.x<player.position.x&&enemy.velocity.x==0)){
			enemy.switchSprite('jump')
		} else {
			enemy.switchSprite('jump','backwards')
		}
	} else if (enemy.velocity.y>0){
		if (enemy.jumpArc!=0){
			enemy.velocity.x=enemy.jumpArc
		}
		if (enemy.velocity.x>0||(enemy.position.x<player.position.x&&enemy.velocity.x==0)){
			enemy.switchSprite('fall')
		} else {
			enemy.switchSprite('fall','backwards')
		}
	} else if (enemy.velocity.x===0&&enemy.velocity.y==0){
		if (enemy.position.x<player.position.x){
			enemy.switchSprite('idle')
			enemy.attackBox.offset1.x<0?enemy.attackBox.offset1.x*=-1:enemy.attackBox.offset1.x*=1
		} else {
			enemy.switchSprite('idle','backwards')
			enemy.attackBox.offset1.x>0?enemy.attackBox.offset1.x*=-1:enemy.attackBox.offset1.x*=1
		}
	}

	//collision detection
	if (rectangleCollision(player,enemy)&&player.isAttacking&&player.currentFrame===player.attackBox.offset1.frame&&player.image==player.sprites.attack1.image) {
		if (enemy.position.x<player.position.x){
			(!(player.attackBox.knockback<0))?player.attackBox.knockback*=-1:player.attackBox.knockback*=1
			enemy.takeHit()
		} else {
			(!(player.attackBox.knockback>0))?player.attackBox.knockback*=-1:player.attackBox.knockback*=1
			enemy.takeHit('backwards')
		}
		enemy.velocity.x=player.attackBox.knockback
		player.isAttacking=false
		enemyHealthBar.style.width=enemy.health+'%'
		console.log("collided")
	}
	if (player.isAttacking&&player.currentFrame===2){
		player.isAttacking=false
	}
	if (rectangleCollision(enemy,player)&&enemy.isAttacking&&enemy.currentFrame===enemy.attackBox.offset1.frame&&enemy.image==enemy.sprites.attack1.image) {
		if (player.position.x<enemy.position.x){
			(!(enemy.attackBox.knockback<0))?enemy.attackBox.knockback*=-1:enemy.attackBox.knockback*=1
			player.takeHit()
		} else {
			(!(enemy.attackBox.knockback>0))?enemy.attackBox.knockback*=-1:enemy.attackBox.knockback*=1
			player.takeHit('backwards')
		}
		player.velocity.x=enemy.attackBox.knockback
		enemy.isAttacking=false
		playerHealthBar.style.width=player.health+'%'
		console.log(" enemy collided")
	}
	if (enemy.isAttacking&&enemy.currentFrame===3){
		enemy.isAttacking=false
	}
	if (enemy.health<=0||player.health<=0){
		endgameCheck()
	}
}
}

animate()
window.addEventListener('keydown',(event)=>{
	if (!end[0]&&!player.dead&&player.image!=player.sprites.death.image&&player.image!=player.sprites.takeHit.image){
		let keyBuffer=event.key.toLowerCase()
		switch (keyBuffer){
		case 'd':
			keys.d.pressed=true
			player.lastKey='d'
			break
		case 'a':
			keys.a.pressed=true
			player.lastKey='a'
			break
		case 'w':
			if (player.velocity.y==0){
				if (player.velocity.x==player.speed||player.velocity.x==-player.speed){
					player.jumpArc=player.velocity.x
				} else {
					player.jumpArc=0
				}
				player.velocity.y=-17

			}
			break
		case ' ':
			if (player.attackPress==true){
				if (player.velocity.x<0||(player.position.x>enemy.position.x&&player.velocity.x==0)){
					player.attack('backwards')
				} else {
					player.attack()
				}
			}
			player.attackPress=false
			break	
		}
	}
	if (!end[0]&&!enemy.dead&&enemy.image!=enemy.sprites.death.image&&enemy.image!=enemy.sprites.takeHit.image){
		switch(event.key){
		case 'ArrowRight':
			keys.ArrowRight.pressed=true
			enemy.lastKey='ArrowRight'
			break
		case 'ArrowLeft':
			keys.ArrowLeft.pressed=true
			enemy.lastKey='ArrowLeft'
			break
		case 'ArrowUp':
			if (enemy.velocity.y==0){
				if (enemy.velocity.x==enemy.speed||enemy.velocity.x==-enemy.speed){
					enemy.jumpArc=enemy.velocity.x
				} else {
					enemy.jumpArc=0
				}
				enemy.velocity.y=-15
			}
			break
		case 'ArrowDown':
			if (enemy.attackPress==true){
				if (enemy.velocity.x<0||(enemy.position.x>player.position.x&&enemy.velocity.x==0)){
					enemy.attack('backwards')
				} else {
					enemy.attack()
				}
			}
			enemy.attackPress=false
			break
		}
	}
})

window.addEventListener('keyup',(event)=>{
	if (!end[0]){
	let keyBuffer=event.key.toLowerCase()
	switch (keyBuffer){
		case 'd':
			keys.d.pressed=false
			break
		case 'a':
			keys.a.pressed=false
			break
		case ' ':
			player.attackPress=true
	}

	switch (event.key){
		case 'ArrowLeft':
			keys.ArrowLeft.pressed=false
			break
		case 'ArrowRight':
			keys.ArrowRight.pressed=false
			break
		case 'ArrowDown':
			enemy.attackPress=true
	}
}})
}
function deleter(){
	end[0]=true
	containerDiv.innerHTML=""
	fgActivator=document.createElement('button')
	containerDiv.appendChild(fgActivator)
	fgActivator.style.margin='auto auto auto auto'
	fgActivator.innerHTML='Play'
	playerSelect=true
	player=null
	enemy=null
	fgActivator.onclick=function(){
		fgActivator.remove()
		for (let i=0;i<fighterPortraits.length;i++){
			let portrait=document.createElement('img')
			portrait.src=fighterPortraits[i]
			console.log(i)
			containerDiv.appendChild(portrait)
			portrait.style.height='45px'
			portrait.style.width='45px'
			portrait.style.border='3px green solid'
			portrait.onclick=function(){
				if (playerSelect){
					player={...fighters[i]}
				} else {
					enemy={...fighters[i]}
				}
				playerSelect=false
				console.log(player,enemy)
				if (player!=null&&enemy!=null){
					containerDiv.innerHTML=''
					end[0]=false
					string1 = JSON.stringify(player);
    				string2 = JSON.stringify(enemy);
					if (string1==string2){
						console.log("yes")
						enemy=JSON.parse(JSON.stringify(player))
					}
					createGame()
				}
			}
		}
	}
}
