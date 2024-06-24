function puzzleCreater(){
	document.getElementById("activater2").style.display="none"
	document.getElementById("puzzle15")
	puzzle15.style.backgroundColor="white"
	puzzle15.style.display="grid"
	let numbers=['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15',' ']
	let holder=[]
	while (numbers.length!=0){
		let randomer=Math.floor(Math.random() * numbers.length);
		let cell = document.createElement('puzzleSquare');
		cell.innerText=numbers[randomer]
    	puzzle15.appendChild(cell).id=numbers[randomer]
    	cell.classList.add("blackSquare");
    	holder.push(numbers[randomer])
    	numbers.splice(randomer,1)
	}
	for (let i=0;i<holder.length;i++){
		document.getElementById(holder[i]).onclick=function(){
			if (holder[i]!=' '){
				if (i+1!=holder.length&&holder[i+1]==' '&&Math.floor(i/4)%2==Math.floor((i+1)/4)%2){
					let buffer = holder[i+1]
					document.getElementById(buffer).innerText=holder[i]
					let buffer2=document.getElementById(holder[i])
					document.getElementById(buffer).id=holder[i]
					buffer2.id=buffer
					document.getElementById(buffer).innerText=buffer
					holder[i+1]=holder[i]
					holder[i]=buffer
				}
				if (i-1>=0&&holder[i-1]==' '&&Math.floor(i/4)%2==Math.floor((i-1)/4)%2){
					let buffer = holder[i-1]
					document.getElementById(buffer).innerText=holder[i]
					let buffer2=document.getElementById(holder[i])
					document.getElementById(buffer).id=holder[i]
					buffer2.id=buffer
					document.getElementById(buffer).innerText=buffer
					holder[i-1]=holder[i]
					holder[i]=buffer
				}
				if (i+4<holder.length&&holder[i+4]==' '){
					let buffer = holder[i+4]
					document.getElementById(buffer).innerText=holder[i]
					let buffer2=document.getElementById(holder[i])
					document.getElementById(buffer).id=holder[i]
					buffer2.id=buffer
					document.getElementById(buffer).innerText=buffer
					holder[i+4]=holder[i]
					holder[i]=buffer
				}
				if (i-4>=0&&holder[i-4]==' '){
					let buffer = holder[i-4]
					document.getElementById(buffer).innerText=holder[i]
					let buffer2=document.getElementById(holder[i])
					document.getElementById(buffer).id=holder[i]
					buffer2.id=buffer
					document.getElementById(buffer).innerText=buffer
					holder[i-4]=holder[i]
					holder[i]=buffer
				}
			}
			let ender=false
			for (let j=0;j<holder.length-1;j++){
				console.log(holder[j],j+1)
				if (parseInt(holder[j])==j+1){
					ender=true
				} else {
					ender =false
					break
				}
			}
			if (ender){
				function deleter(){
					alert("You solved the puzzle!")
					for (let l=0;l<holder.length;l++){
						if (document.getElementById(holder[l])!=null){
							document.getElementById(holder[l]).remove()
						}
					}
					document.getElementById("activater2").style.display="block"
					puzzle15.style.backgroundColor="gray"
					puzzle15.style.display="flex"
				}
				console.log(holder)
				setTimeout(deleter, 200);
			}
		}
	}
	puzzle15.style.gridTemplateRows="repeat(4, 125px)"
	puzzle15.style.gridTemplateColumns="repeat(4, 125px)"
}