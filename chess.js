function creater() {
	let blackMoved=[true]
	let blackWon=[false]
	let whiteWon=[false]
	let draw=[false]
	let bpieces=[]
	let bpawns=[]
	let bbishops=[]
	let bknights=[]
	let brooks=[]
	let bqueens=[]
	let bkings=[]
	let wpieces=[]
	let wpawns=[]
	let wbishops=[]
	let wknights=[]
	let wrooks=[]
    let wqueens=[]
    let wkings=[]
	document.getElementById("activater")
	activater.style.display="none"
	document.getElementById("chessboard")
	chessboard.style.backgroundColor="white"
	chessboard.style.display="grid"
	function pieceMaker(img,id,arr,square,side){
		let piece=document.createElement("img");
    	piece.src = "pixil-frame-"+img+".png";
		piece.style.margin ="auto auto auto auto"
		if (side!=undefined){
			piece.id=side+id+(arr.length)
		} else {
			piece.id=id+(arr.length)
		}
		square.appendChild(piece)
		arr.push(piece)
		//console.log(piece.id)
	}
	for (let i=0;i<64;i++) {
	let classer="whiteSquare"
	let cell = document.createElement("bob"+i);
	//cell.innerText=i
    if ((Math.floor(i/8)%2==0&&i%2!=0)||(Math.floor(i/8)%2!=0&&i%2==0)) {
		classer="blackSquare";
		}
    chessboard.appendChild(cell).id="bob"+i
    cell.classList.add(classer);
    
    if (i>=8&&i<=15){
			pieceMaker(1,"bpawn",bpawns,cell)
    	}
    if (i==2||i==5){
			pieceMaker(5,"bbishop",bbishops,cell)
    	}
    if (i==0||i==7){
			pieceMaker(3,"brook",brooks,cell)
    	}
    if (i==1||i==6){
			pieceMaker(7,"bknight",bknights,cell)
    	}
    if (i==4){
			pieceMaker(11,"bking",bkings,cell)
    	}
    if (i==3){
			pieceMaker(9,"bqueen",bqueens,cell)
    	}

    if (i>=48&&i<=55){
			pieceMaker(0,"wpawn",wpawns,cell)
    	}
    if (i==58||i==61){
			pieceMaker(4,"wbishop",wbishops,cell)
    	}
    if (i==63||i==56){
			pieceMaker(2,"wrook",wrooks,cell)
    	}
    if (i==62||i==57){
			pieceMaker(6,"wknight",wknights,cell)
    	}
    if (i==60){
			pieceMaker(10,"wking",wkings,cell)
    	}
    if (i==59){
			pieceMaker(8,"wqueen",wqueens,cell)
    	}
	}
	bpieces.push(bpawns,bbishops,brooks,bknights,bqueens,bkings)
	wpieces.push(wpawns,wbishops,wrooks,wknights,wqueens,wkings)
	console.log(bpieces)
	console.log(wpieces)
	chessboard.style.gridTemplateRows="repeat(8, 62.5px)"
	chessboard.style.gridTemplateColumns="repeat(8, 62.5px)"
	let functions=[pawnMovement,bishopMovement,rookMovement,knightMovement,queenMovement,kingMovement]
	let bufferAccess=[]
	let moveLog=[[]]
	let newPiece=[]
	let empSquare=[]
	function arrayConfirm(arr1,arr2){
		if (arr1.length==arr2.length){
			for (let s=0;s<arr1.length;s++){
				if (arr1[s]!=arr2[s]){
					return false
				}
			}
			return true
		}
	}
	function hasMoved(piece){
		for (let d=0;d<moveLog.length;d++){
			if (moveLog[d][0]==piece){
				return true
			}
		}
		return false
	}
	function mover(selectedSquare,piece,enemy,friendly,side,img,mode,moveforward,taker,taker2,iM,iT,iT2){
		let og=piece.parentNode
		let difference=[0]
		if (selectedSquare.classList.contains('selected')) {
			//console.log(piece.parentNode)
			selectedSquare.appendChild(piece)
			let buffer=enemy.filter(item=>item.filter(thing=>thing.parentNode==selectedSquare).length>0)
			//console.log(buffer)
			if (buffer.length>0){
				buffer=buffer[0].filter(item=>item.parentNode==selectedSquare)
				if (piece.parentNode==buffer[0].parentNode) {
					buffer[0].parentNode.removeChild(buffer[0])
				}
			}
			function enpassant(){
				if (friendly[0].filter(item=>item==piece)&&selectedSquare.classList.contains("enpassant")){
					for (let g=0;g<64;g++){
						if (document.getElementById("bob"+g).classList.contains("enpassant")&&!document.getElementById("bob"+g).classList.contains("selected")){
							if (mode=="check"){
								bufferAccess=[enemy[0].filter(item=>item.parentNode==document.getElementById("bob"+g))[0]]
								empSquare=[document.getElementById("bob"+g)]
							}
							document.getElementById("bob"+g).removeChild(enemy[0].filter(item=>item.parentNode==document.getElementById("bob"+g))[0])
						}
					}
				}
			}
			switch (mode){
				case "move":
					enpassant()
					if (friendly[friendly.length-1].filter(item=>item==piece)&&selectedSquare.classList.contains("castle")){
						for (let h=0;h<64;h++){
							if (document.getElementById("bob"+h).classList.contains("castle")&&piece.parentNode==document.getElementById("bob"+h)){
								if (friendly[2].filter(item=>item.parentNode==document.getElementById("bob"+(h+1))).length>0){
									document.getElementById("bob"+(h-1)).appendChild(friendly[2].filter(item=>item.parentNode==document.getElementById("bob"+(h+1)))[0])
								} else if (friendly[2].filter(item=>item.parentNode==document.getElementById("bob"+(h-2))).length>0){
									document.getElementById("bob"+(h+1)).appendChild(friendly[2].filter(item=>item.parentNode==document.getElementById("bob"+(h-2)))[0])
								}
							}
						}
					}
					for (let a=0;a<64;a++){
						if (document.getElementById("bob"+a)==og){
							for (let b=0;b<64;b++){
								if (document.getElementById("bob"+b)==selectedSquare){
									difference[0]=Math.abs(b-a)
								}
							}
						}
					}
					remover("spotChange")
					remover("selected")
					remover("enpassant")
					remover("castle")
					backgroundRemover(friendly)
					og.classList.add("spotChange")
					selectedSquare.classList.add("spotChange")
					moveLog.push([piece,enemy,og,selectedSquare,difference[0]])
					console.log(moveLog)
					function promotion(){
						let choices=[[4+img,"bishop",friendly[1]],[2+img,"rook",friendly[2]],[6+img,"knight",friendly[3]],[8+img,"queen",friendly[4]]]
						for (let o=0;o<64;o++){
							if (piece.parentNode==document.getElementById("bob"+o)&&(o>55||o<8)){
								if (friendly==wpieces){
									let choice=window.prompt("would you like the pawn to be promoted to a queen, rook, bishop or knight?")
									for (let n=0;n<choices.length;n++){
										if (choice!=null && choices[n][1]==choice.toLowerCase()){
											pieceMaker(choices[n][0],side+choices[n][1],choices[n][2],selectedSquare)
											selectedSquare.removeChild(friendly[0].filter(item=>item==piece)[0])
										} else if (choice==null||!choices.filter(item=>item.filter(thing=>thing==choice.toLowerCase()).length>0).length>0){
											promotion()
										}
									}
								} else {
									pieceMaker(choices[choices.length-1][0],side+choices[choices.length-1][1],choices[choices.length-1][2],selectedSquare)
									selectedSquare.removeChild(friendly[0].filter(item=>item==piece)[0])
								}
							}
						}
					}
					if (friendly[0].filter(item=>item==piece).length>0){
						promotion()
					}
					blackMoved[0]==true ? blackMoved[0]=false : blackMoved[0]=true;
					endgameCheck(friendly,enemy,moveforward,taker,taker2,iM,iT,iT2)
					if (blackWon[0]==false&&draw[0]==false){
						enabler()
					}
					if (whiteWon[0]==false&&draw[0]==false){
						enabler2()
					}
					break;
				case "check":
					if (empSquare.length>0){
						empSquare=[]
					}
					if (buffer.length>0){
						bufferAccess=[buffer[0]]
					} else {
						bufferAccess=[]
					}
					enpassant()
			}
		}
	}
	function remover(classRemove){
		for (let e=0;e<64;e++){
			if (document.getElementById("bob"+e).classList.contains(classRemove)){
				document.getElementById("bob"+e).classList.remove(classRemove)
			}
		}
	}
	function deleter(){
		if (draw[0]==true){
			alert("The game is a draw")
		} else {
			whiteWon[0]==true?alert("Checkmate! You Win!"):alert("Checkmate! You Lose!")
		}
		for (let l=0;l<64;l++){
			if (document.getElementById("bob"+l)!=null){
				document.getElementById("bob"+l).remove()
			}
		}
		document.getElementById("activater").style.display="block"
		chessboard.style.backgroundColor="gray"
		chessboard.style.display="flex"
	}
	function endgameCheck(friend,enemy,moveforward,taker,taker2,iM,iT,iT2){
		let canMove=[]
		for (let k=0;k<enemy.length;k++){
			for (let i=0;i<enemy[k].length;i++){
				if (enemy[k][i].parentNode!=null){
					functions[k](enemy[k][i],friend,"selected",enemy,iM,iT,iT2)
					checker(enemy[k][i],enemy[enemy.length-1][0],enemy,friend,moveforward,taker,taker2)
					for (let v=0;v<64;v++){
						if (!document.getElementById("bob"+v).classList.contains("selected")){
							canMove.push(0)
						} else {
							canMove.push(1)
						}
					}
				}
				remover("selected")
			}
		}
		friend.map((set,index)=>set.map((piecer)=>functions[index](piecer,enemy,"inCheck",friend,moveforward,taker,taker2)))
		if (canMove.filter(item=>item==0).length==canMove.length&&!enemy[enemy.length-1][0].parentNode.classList.contains("inCheck")){
			draw[0]=true
		}
		if (canMove.filter(item=>item==0).length==canMove.length&&enemy[enemy.length-1][0].parentNode.classList.contains("inCheck")){
			friend==wpieces?whiteWon[0]=true:blackWon[0]=true
		}
		if (enemy.filter(item=>item.filter(thing=>thing.parentNode!=null).length>0).length==1&&friend.filter(item=>item.filter(thing=>thing.parentNode!=null).length>0).length==1){
			draw[0]=true
		}
		if (moveLog.length>10&&arrayConfirm(moveLog[moveLog.length-1],moveLog[moveLog.length-3])==true&&arrayConfirm(moveLog[moveLog.length-2],moveLog[moveLog.length-4])==true&&arrayConfirm(moveLog[moveLog.length-5],moveLog[moveLog.length-7])==true&&arrayConfirm(moveLog[moveLog.length-6],moveLog[moveLog.length-8])==true){
			draw[0]=true
		}
		if (document.getElementById("bob0")!=null){
			remover("inCheck")
		}
	}

	function checker(piece,king,friend,enemy,moveforward,taker,taker2){
		let squares=[]
		for (let o=0;o<64;o++){
			if (document.getElementById("bob"+o).classList.contains("selected")){
				squares.push(document.getElementById("bob"+o))
			}
		}
		//console.log(squares)
		let original=piece.parentNode
		let moveIndex=0;
		while (moveIndex<squares.length){
			mover(squares[moveIndex],piece,enemy,friend,"","","check")
			let temp=bufferAccess[0]
			let kingCheck=[false];
			enemy.map((set,index)=>set.map((piecer)=>functions[index](piecer,friend,"inCheck",enemy,moveforward,taker,taker2)))
			//console.log(squares[moveIndex])
			//console.log(squares[moveIndex].classList)
			for (let v=0;v<64;v++){
				if (king.parentNode.classList.contains("inCheck")){
					kingCheck[0]=true
				}
			}
			if (kingCheck[0]==true && squares.length>0){
				squares[moveIndex].classList.remove("selected")
				if (bufferAccess.length>0&&empSquare.length>0){
					empSquare[0].appendChild(bufferAccess[0])
				} else if (bufferAccess.length>0){
					squares[moveIndex].appendChild(bufferAccess[0])
				}
			} else {
				if (bufferAccess.length>0&&empSquare.length>0){
					empSquare[0].appendChild(bufferAccess[0])
				} else if (bufferAccess.length>0){
					squares[moveIndex].appendChild(bufferAccess[0])
				}
			}
			remover("inCheck")
			moveIndex++
		}
		original.appendChild(piece)
		if (piece==king&&hasMoved(king)==false){
			enemy.map((set,index)=>set.map((piecer)=>functions[index](piecer,friend,"inCheck",enemy,moveforward,taker,taker2)))
			for (let g=0;g<64;g++){
				if (piece.parentNode==document.getElementById("bob"+g)){
					if ((!document.getElementById("bob"+(g-1)).classList.contains("selected")&&document.getElementById("bob"+(g-2)).classList.contains("selected"))||piece.parentNode.classList.contains("inCheck")){
						document.getElementById("bob"+(g-2)).classList.remove("selected")
					}
					if ((!document.getElementById("bob"+(g+1)).classList.contains("selected")&&document.getElementById("bob"+(g+2)).classList.contains("selected"))||piece.parentNode.classList.contains("inCheck")){
						document.getElementById("bob"+(g+2)).classList.remove("selected")
					}
				}
			}
		}
		remover("inCheck")
	}

	function pawnMovement(pawn,enemy,squareClass,friendly,moveforward,taker,taker2,emp){
		for (let j=0;j<64;j++){
			if (pawn.parentNode==document.getElementById("bob"+j)){
				if (document.getElementById("bob"+(j-moveforward))!=null&&document.getElementById("bob"+(j-moveforward)).children.length<=0){
					document.getElementById("bob"+(j-moveforward)).classList.add(squareClass)
				}
				if (hasMoved(pawn)==false&&(document.getElementById("bob"+(j-moveforward)).children.length<=0&&document.getElementById("bob"+(j-moveforward*2)).children.length<=0)){
					document.getElementById("bob"+(j-moveforward*2)).classList.add(squareClass)
				}
				if (document.getElementById("bob"+(j-taker))!=null&&enemy.filter(item=>item.filter(thing=>thing.parentNode==document.getElementById("bob"+(j-taker))).length>0).length>0&&(Math.floor((j-taker)/8)%2!=(Math.floor(j/8)%2))){
					document.getElementById("bob"+(j-taker)).classList.add(squareClass)
				}
				if (document.getElementById("bob"+(j-taker2))!=null&&enemy.filter(item=>item.filter(thing=>thing.parentNode==document.getElementById("bob"+(j-taker2))).length>0).length>0&&(Math.floor((j-taker2)/8)%2!=(Math.floor(j/8)%2))){
					document.getElementById("bob"+(j-taker2)).classList.add(squareClass)
				}
				if (document.getElementById("bob"+(j-taker))!=null&&arrayConfirm(moveLog[moveLog.length-1],[enemy[0].filter(item=>item.parentNode==document.getElementById("bob"+(j-emp)))[0],friendly,document.getElementById("bob"+(j-emp-moveforward*2)),document.getElementById("bob"+(j-emp)),16])===true&&(Math.floor((j-taker)/8)%2!=(Math.floor(j/8)%2))&&document.getElementById("bob"+(j-taker)).children.length<=0){
					document.getElementById("bob"+(j-taker)).classList.add(squareClass)
					document.getElementById("bob"+(j-taker)).classList.add("enpassant")
					document.getElementById("bob"+(j-emp)).classList.add("enpassant")
				}
				if (document.getElementById("bob"+(j-taker2))!=null&&(arrayConfirm(moveLog[moveLog.length-1],[enemy[0].filter(item=>item.parentNode==document.getElementById("bob"+(j+emp)))[0],friendly,document.getElementById("bob"+(j+emp-moveforward*2)),document.getElementById("bob"+(j+emp)),16])===true&&(Math.floor((j-taker2)/8)%2!=(Math.floor(j/8)%2)))&&document.getElementById("bob"+(j-taker2)).children.length<=0){
					document.getElementById("bob"+(j-taker2)).classList.add(squareClass)
					document.getElementById("bob"+(j-taker2)).classList.add("enpassant")
					document.getElementById("bob"+(j+emp)).classList.add("enpassant")
				}
			}
		}
	}

  	function knightMovement(knight,enemy,squareClass,friendly,moveforward,taker,taker2,emp){
  		for (let f=0;f<64;f++){
  			if (knight.parentNode==document.getElementById("bob"+f)){
  				if (document.getElementById("bob"+(f-15))!=null&&(document.getElementById("bob"+(f-15)).children.length<=0||enemy.filter(item=>item.filter(thing=>thing.parentNode==document.getElementById("bob"+(f-15))).length>0).length>0)&&(Math.floor((f-15)/8)%2==(Math.floor(f/8)%2))){
  					document.getElementById("bob"+(f-15)).classList.add(squareClass)
  				}
  				if (document.getElementById("bob"+(f+15))!=null&&(document.getElementById("bob"+(f+15)).children.length<=0||enemy.filter(item=>item.filter(thing=>thing.parentNode==document.getElementById("bob"+(f+15))).length>0).length>0)&&(Math.floor((f+15)/8)%2==(Math.floor(f/8)%2))){
  					document.getElementById("bob"+(f+15)).classList.add(squareClass)
  				}
  				if (document.getElementById("bob"+(f-17))!=null&&(document.getElementById("bob"+(f-17)).children.length<=0||enemy.filter(item=>item.filter(thing=>thing.parentNode==document.getElementById("bob"+(f-17))).length>0).length>0)&&(Math.floor((f-17)/8)%2==(Math.floor(f/8)%2))){
  					document.getElementById("bob"+(f-17)).classList.add(squareClass)
  				}
  				if (document.getElementById("bob"+(f+17))!=null&&(document.getElementById("bob"+(f+17)).children.length<=0||enemy.filter(item=>item.filter(thing=>thing.parentNode==document.getElementById("bob"+(f+17))).length>0).length>0)&&(Math.floor((f+17)/8)%2==(Math.floor(f/8)%2))){
  					document.getElementById("bob"+(f+17)).classList.add(squareClass)
  				}
  				if (document.getElementById("bob"+(f-10))!=null&&(document.getElementById("bob"+(f-10)).children.length<=0||enemy.filter(item=>item.filter(thing=>thing.parentNode==document.getElementById("bob"+(f-10))).length>0).length>0)&&(Math.floor((f-10)/8)%2!=(Math.floor(f/8)%2))){
  					document.getElementById("bob"+(f-10)).classList.add(squareClass)
  				}
  				if (document.getElementById("bob"+(f+10))!=null&&(document.getElementById("bob"+(f+10)).children.length<=0||enemy.filter(item=>item.filter(thing=>thing.parentNode==document.getElementById("bob"+(f+10))).length>0).length>0)&&(Math.floor((f+10)/8)%2!=(Math.floor(f/8)%2))){
  					document.getElementById("bob"+(f+10)).classList.add(squareClass)
  				}
  				if (document.getElementById("bob"+(f-6))!=null&&(document.getElementById("bob"+(f-6)).children.length<=0||enemy.filter(item=>item.filter(thing=>thing.parentNode==document.getElementById("bob"+(f-6))).length>0).length>0)&&(Math.floor((f-6)/8)%2!=(Math.floor(f/8)%2))){
  					document.getElementById("bob"+(f-6)).classList.add(squareClass)
  				}
  				if (document.getElementById("bob"+(f+6))!=null&&(document.getElementById("bob"+(f+6)).children.length<=0||enemy.filter(item=>item.filter(thing=>thing.parentNode==document.getElementById("bob"+(f+6))).length>0).length>0)&&(Math.floor((f+6)/8)%2!=(Math.floor(f/8)%2))){
  					document.getElementById("bob"+(f+6)).classList.add(squareClass)
  				}
  			}
  		}
  	}
  	
  	function bishopMovement(bishop,enemy,squareClass,same,moveforward,taker,taker2,emp){
  		for (let h=0;h<64;h++){
			function directioner(direction,enn,friend){
				let amounter=1
				let classerer="whiteSquare"
				if (document.getElementById("bob"+h).classList.contains(classerer)==false) {
					classerer="blackSquare";
				}
  				while (document.getElementById("bob"+(h-(direction*amounter)))!=null){
  					if (friend.filter(item=>item.filter(thing=>thing.parentNode==document.getElementById("bob"+(h-(direction*amounter)))).length>0).length>0){
  						break;
  					}
					if (document.getElementById("bob"+(h-(direction*amounter)))!=null&&document.getElementById("bob"+(h-(direction*amounter))).classList.contains(classerer)==true){
  						document.getElementById("bob"+(h-(direction*amounter))).classList.add(squareClass)
  					}
  					if (enn.filter(item=>item.filter(thing=>thing.parentNode==document.getElementById("bob"+(h-(direction*amounter)))).length>0).length>0){
  						break;
  					}
					amounter++
  				}
  			}
  			if (bishop.parentNode==document.getElementById("bob"+h)){
				directioner(9,enemy,same)
				directioner(7,enemy,same)
				directioner(-9,enemy,same)
				directioner(-7,enemy,same)
  			}
  		}
  	}
  	
  	function rookMovement(rook,enemy,squareClass,friendly,moveforward,taker,taker2,emp){
  		for (let z=0;z<64;z++){
  			function forwarder(direction,enn,friend){
				let amounter=1
  				while (document.getElementById("bob"+(z-(direction*amounter)))!=null){
  					if (friend.filter(item=>item.filter(thing=>thing.parentNode==document.getElementById("bob"+(z-(direction*amounter)))).length>0).length>0){
  						break;
  					}
					if (document.getElementById("bob"+(z-(direction*amounter)))!=null&&Math.floor((z-(direction*amounter))/8)==(Math.floor(z/8))){
  						document.getElementById("bob"+(z-(direction*amounter))).classList.add(squareClass)
  					}
  					if (document.getElementById("bob"+(z-(direction*amounter)))!=null&&Math.floor((z-(direction*amounter))%8)==(Math.floor(z%8))){
  						document.getElementById("bob"+(z-(direction*amounter))).classList.add(squareClass)
  					}
  					if (enn.filter(item=>item.filter(thing=>thing.parentNode==document.getElementById("bob"+(z-(direction*amounter)))).length>0).length>0){
  						break;
  					}
					amounter++
  				}
  			}
  			if (rook.parentNode==document.getElementById("bob"+z)){
				forwarder(8,enemy,friendly)
				forwarder(1,enemy,friendly)
				forwarder(-8,enemy,friendly)
				forwarder(-1,enemy,friendly)
  			}
  		}
  	}
  	function queenMovement(queen,enemy,squareClass,friendly,moveforward,taker,taker2,emp){
  		rookMovement(queen,enemy,squareClass,friendly);
		bishopMovement(queen,enemy,squareClass,friendly);
  	}
  	function kingMovement(king,enemy,squareClass,friendly,moveforward,taker,taker2,emp){
  		for (let l=0;l<64;l++) {
  			if (king.parentNode==document.getElementById("bob"+l)){
  				if (document.getElementById("bob"+(l-8))!=null&&(document.getElementById("bob"+(l-8)).children.length<=0||enemy.filter(item=>item.filter(thing=>thing.parentNode==document.getElementById("bob"+(l-8))).length>0).length>0)&&(Math.floor((l-8)/8)%2!=(Math.floor(l/8)%2))){
  					document.getElementById("bob"+(l-8)).classList.add(squareClass)
  				}
  				if (document.getElementById("bob"+(l+8))!=null&&(document.getElementById("bob"+(l+8)).children.length<=0||enemy.filter(item=>item.filter(thing=>thing.parentNode==document.getElementById("bob"+(l+8))).length>0).length>0)&&(Math.floor((l+8)/8)%2!=(Math.floor(l/8)%2))){
  					document.getElementById("bob"+(l+8)).classList.add(squareClass)
  				}
  				if (document.getElementById("bob"+(l-7))!=null&&(document.getElementById("bob"+(l-7)).children.length<=0||enemy.filter(item=>item.filter(thing=>thing.parentNode==document.getElementById("bob"+(l-7))).length>0).length>0)&&(Math.floor((l-7)/8)%2!=(Math.floor(l/8)%2))){
  					document.getElementById("bob"+(l-7)).classList.add(squareClass)
  				}
  				if (document.getElementById("bob"+(l+7))!=null&&(document.getElementById("bob"+(l+7)).children.length<=0||enemy.filter(item=>item.filter(thing=>thing.parentNode==document.getElementById("bob"+(l+7))).length>0).length>0)&&(Math.floor((l+7)/8)%2!=(Math.floor(l/8)%2))){
  					document.getElementById("bob"+(l+7)).classList.add(squareClass)
  				}
  				if (document.getElementById("bob"+(l-9))!=null&&(document.getElementById("bob"+(l-9)).children.length<=0||enemy.filter(item=>item.filter(thing=>thing.parentNode==document.getElementById("bob"+(l-9))).length>0).length>0)&&(Math.floor((l-9)/8)%2!=(Math.floor(l/8)%2))){
  					document.getElementById("bob"+(l-9)).classList.add(squareClass)
  				}
  				if (document.getElementById("bob"+(l+9))!=null&&(document.getElementById("bob"+(l+9)).children.length<=0||enemy.filter(item=>item.filter(thing=>thing.parentNode==document.getElementById("bob"+(l+9))).length>0).length>0)&&(Math.floor((l+9)/8)%2!=(Math.floor(l/8)%2))){
  					document.getElementById("bob"+(l+9)).classList.add(squareClass)
  				}
  				if (document.getElementById("bob"+(l-1))!=null&&(document.getElementById("bob"+(l-1)).children.length<=0||enemy.filter(item=>item.filter(thing=>thing.parentNode==document.getElementById("bob"+(l-1))).length>0).length>0)&&(Math.floor((l-1)/8)%2==(Math.floor(l/8)%2))){
  					document.getElementById("bob"+(l-1)).classList.add(squareClass)
  				}
  				if (document.getElementById("bob"+(l+1))!=null&&(document.getElementById("bob"+(l+1)).children.length<=0||enemy.filter(item=>item.filter(thing=>thing.parentNode==document.getElementById("bob"+(l+1))).length>0).length>0)&&(Math.floor((l+1)/8)%2==(Math.floor(l/8)%2))){
  					document.getElementById("bob"+(l+1)).classList.add(squareClass)
  				}
  				if (document.getElementById("bob"+(l-2))!=null&&document.getElementById("bob"+(l-2)).children.length<=0&&document.getElementById("bob"+(l-3))!=null&&document.getElementById("bob"+(l-3)).children.length<=0&&hasMoved(king)==false&&hasMoved(friendly[2][0])==false&&document.getElementById("bob"+(l-4))!=null&&friendly[2][0].parentNode==document.getElementById("bob"+(l-4))&&document.getElementById("bob"+(l-1)).children.length<=0){
  					document.getElementById("bob"+(l-2)).classList.add(squareClass)
  					document.getElementById("bob"+(l-2)).classList.add("castle")
  				}
  				if (document.getElementById("bob"+(l+2))!=null&&document.getElementById("bob"+(l+2)).children.length<=0&&hasMoved(king)==false&&hasMoved(friendly[2][1])==false&&document.getElementById("bob"+(l+3))!=null&&friendly[2][1].parentNode==document.getElementById("bob"+(l+3))&&document.getElementById("bob"+(l+1)).children.length<=0){
  					document.getElementById("bob"+(l+2)).classList.add(squareClass)
  					document.getElementById("bob"+(l+2)).classList.add("castle")
  				}
  			}
		}
  	}
  	function backgroundRemover(friendly){
  		for (let v=0;v<friendly.length;v++){
			for (let p=0;p<friendly[v].length;p++){
				friendly[v][p].style.backgroundColor=''	
				friendly[v][p].style.border=''	

			}
		}
  	}
  	function pieceMover(arr,pieceFunction,enemy,friendly,moveforward,taker,taker2,iM,iT,iT2,emp,side,img,stat){
  		for (let c=0;c<arr.length;c++){
			arr[c].onclick=function(){
				if (blackMoved[0]==stat){
					remover("selected")
					remover("enpassant")
					remover("castle")
					backgroundRemover(friendly)
					pieceFunction(arr[c],enemy,"selected",friendly,moveforward,taker,taker2,emp)
					checker(arr[c],friendly[friendly.length-1][0],friendly,enemy,iM,iT,iT2,emp)
					arr[c].style.backgroundColor='#A1C121'
					arr[c].style.border='2px solid #A1C121'
					arr[c].style.borderRadius='5px'
					for (let x=0;x<64;x++){
						document.getElementById("bob"+x).onclick=function(){
							mover(document.getElementById("bob"+x),arr[c],enemy,friendly,side,img,"move",moveforward,taker,taker2,iM,iT,iT2)
							if (whiteWon[0]==true||draw[0]==true){
								setTimeout(deleter, 200);
							}
						}
					}
				}
			}
		}
  	}
  	function enabler(){
  		let whiteMovement=0
  		while (whiteMovement<wpieces.length){
  			pieceMover(wpieces[whiteMovement],functions[whiteMovement],bpieces,wpieces,8,9,7,-8,-9,-7,1,"w",0,true)
  			whiteMovement++
  		}
  	}

  	function enabler2(){
  		let randomType=[]
  		let randomPiece=[]
  		let redoCheck=[]
  		let pickedSquare=[]
  		if (blackMoved[0]==false){
  			remover("selected")
			remover("enpassant")
			remover("castle")
  			function randomMaker(){
  				randomType[0]=(Math.floor(Math.random()*(bpieces.length-1-0+1))+0)
  				//console.log(randomType[0])
  				//console.log(bpieces[randomType[0]])
  				randomPiece[0]=((Math.floor(Math.random()*(bpieces[randomType[0]].length-1-0+1))+0))
  				if (bpieces[randomType[0]][randomPiece[0]]==null||bpieces[randomType[0]][randomPiece[0]].parentNode==null){
  					randomMaker()
  				}
  			}
  			randomMaker()
  			//console.log(randomType,randomPiece)
			functions[randomType[0]](bpieces[randomType[0]][randomPiece[0]],wpieces,"selected",bpieces,-8,-9,-7,(-1))
			checker(bpieces[randomType[0]][randomPiece[0]],bpieces[bpieces.length-1][0],bpieces,wpieces,8,9,7,(1))
			for (let n=0;n<64;n++){
				if (document.getElementById("bob"+n).classList.contains("selected")){
					redoCheck.push(false)
					pickedSquare.push(document.getElementById("bob"+n))
				} else {
					redoCheck.push(true)
				}
			}
			if (redoCheck.filter(item=>item==true).length!=redoCheck.length){
				let randomSquare=(Math.floor(Math.random()*(pickedSquare.length-1-0+1))+0)
  				pickedSquare[0]=pickedSquare[randomSquare]
  				//console.log(pickedSquare[0])			
				mover(pickedSquare[0],bpieces[randomType[0]][randomPiece[0]],wpieces,bpieces,"b",1,"move",-8,-9,-7,8,9,7)
				if (blackWon[0]==true||draw[0]==true){
					setTimeout(deleter, 200);
				}
			} else {
				enabler2()
			}
  		}
  	}
  	if (moveLog.length==1){
		enabler()
	}
}