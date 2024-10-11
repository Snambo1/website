let reviews=[
    {
        img: "1984.jpg",
        review: `It's LITERALLY 1984. This is one of  those rare books where exactly everything you've  heard  about it is on point.
        "It's a dystopian thriller surrounding freedom of thought and freedom of expression.
        "Winston Smith isn't so much a character  as he is a caricature of what a typical citizen  of  this cruel dystopia  is like.
        "I'd say my only major criticism is Winston and Julie's \"relationship\" is kind of poorly written.
        "Aside from that, the self-contradictory nature of double think, the oppressive thought police, and
        "the power-hungry Ingsoc are about as well written as you'd expect. It's obviously much more relevant than ever so check it out `,
        score:"7. 5/10"
    },
    {
        img: "blood meridian.jpg",
        review: `I actually hate this book. Blood meridian is a 337 page marathon of murder, rape, and cruelty. 
        There is no profundity to be derived from any of it. It is literally just a massacre. Judge Holden is the most interesting character in the book, 
        but one interesting character isn't enough to save this book. It's a miserable read and there is absolutely nothing to be derived from how unnecessarily cruel it is. 
        The kid, our protagonist, doesn't have much of a character, and in a nonstop bloodbath like this, it's important to have one character to latch onto, but nope. 
        I never want to read this again`,
        score: "2/10"
    },
    {
        img: "musashi.jpg",
        review: `The legendary exploits of Japan's greatest warrior. 
        Musashi is a grand epic that encompasses several years and gives the rise of Shinmen Takezo to Miyamoto Musashi. 
        Along  the way, Musashi has multiple brush-ins with Takuen, a buddhist monk with a sense of humor, Otsu, his love-interest, Matahachi, his childhood friend, and many others. 
        All building to his final bout with his arch-nemesis, Sasaki Kojiro. Musashi's journey is of an animal to a human being, and a kind one at that. 
        There are few low-points, which is impressive given its scope. It's a long one, but it's worth it. (that's what she  said)`,
        score: "9/10"
    },
    {
        img: "odyssey.jpg",
        review: `The odyssey isn't that long, but it tells of the far-reaching journey of odysseus and his crew from Troy back to Greece,
        and the adversaries they face along the way. The witch Cerce, the cyclops, the sirens. They visit the underworld, they get smited by god's whose favor  they have scorned. 
        It's a tried-and-true adventure. Poor odysseus  goes  through so much and loses his entire crew only to see that suitors have  disgraced  his home. 
        Imagination and cruelty, that's what the odyssey is. I  guess  that's just what greek mythology is`,
        score: "8/10"
    },
    {
        img: "TheRoad.jpg",
        review: `The road is a story about a father and son traversing a post-apocalyptic world just  trying to survive. 
        We don't know how the world came to be this way, all we know is that we want them to survive, no matter how unrealistic that may be. 
        The story is a deconstruction of survival, pessisism, and hope. It has its flaws and moments, but man, is the ending a kicker. 
        The Road is bleak, but it's peppered with small moments of joy, of hope, and triumph. Watching the son slowly lose his innocence and idealism hurts, but it's just how it is`,
        score:"8/10"
    }
]
let count=0

function listChecker(list,mode=false){
    if (mode){
        let element=reviews[Math.floor(Math.random() * (reviews.length-1))]
        if (parseInt(element.score[0],10)<7) listChecker(list,mode);
        else list.push(element.img)
        return
    }
    let element=reviews[Math.floor(Math.random() * (reviews.length-1))].img
    if (list.includes(element)) listChecker(list);
    else list.push(element)

}
function scrollMaker(){
    let list=[]
    for (let i=0;i<4;i++) listChecker(list)
    return list
}
let scrollList=scrollMaker()
let highlights=[]
listChecker(highlights,true)
listChecker(highlights)
highlights.push(reviews[reviews.length-1].img)
for (let i=highlights.length-1,j=1;i>=0;i--,j++)
    document.getElementById("revHigh"+j).src=highlights[i]
//listChecker()
for (let i=1,j=0;i<=8;i++,j++){
    if (j>=scrollList.length) j=0
    document.getElementById("revScroll"+i).src=scrollList[j]
}
//console.log(scrollList)
function finder(word){
    for (let i=0;i<reviews.length;i++){
        if (reviews[i].img==word){
            if (count==0) {
                for (let j=0;j<15;j++){
                    let temp=document.createElement('br');
                    document.getElementById("reviewSpot").insertBefore(temp, document.getElementById("revImage"));
                }
                count++;
            }
            document.getElementById("revImage").src=reviews[i].img
            document.getElementById("revText").innerHTML=reviews[i].review
            document.getElementById("revImage").classList.add("gridImage")
            document.getElementById("revText").classList.add("blurbs")
            document.getElementById("revScore").innerHTML=reviews[i].score
            document.getElementById("revImage").style.height="400px"
            document.getElementById("revImage").style.width="400px"
            document.getElementById("revImage").style.minHeight="400px"
            document.getElementById("revImage").style.minWidth="400px"
            return true;
        }
    }
    return false
}

function searcher(name){
    let buf=name+".jpg"
    buf.toLowerCase()
    console.log(buf)
    if (finder(buf));
    else {
        document.getElementById("revImage").src=""
        document.getElementById("revText").innerHTML=""
        document.getElementById("revImage").classList.remove("gridImage")
        document.getElementById("revText").classList.remove("blurbs")
        document.getElementById("revScore").innerHTML="Review not found!"
        document.getElementById("revImage").style.height="400px"
        document.getElementById("revImage").style.width="400px"
        document.getElementById("revImage").style.minHeight="400px"
        document.getElementById("revImage").style.minWidth="400px"
    }
}
var scrollToElement = function(el, ms){
    var speed = (ms) ? ms : 600;
    $('html,body').animate({
        scrollTop: $(el).offset().top
    }, speed);
}
var form = document.getElementById("form");
function handleForm(event) { event.preventDefault(); } 
form.addEventListener('submit', handleForm);
/*let string=''
for (let i=window.location.href.length-1;i>=0;i--) {
    if (window.location.href[i]=='/') break;
    string+=window.location.href[i]
}

string=string.split("")
string=string.reverse()
string=string.join("")
console.log(string)*/
