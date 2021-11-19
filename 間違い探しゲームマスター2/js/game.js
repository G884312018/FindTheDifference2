let timer = null;
const count = 0;
const MAX = 3;
let clear = 0;
const APPLICATION_KEY = "11c64f2f0234c2b02b0e6da89589270398abc7be02d669aa762ef696ff16596b";
const CLIENT_KEY = "62295267daa5ad9b2dff5d0ead1c64965497c58953694529fb87f7a1a206a7c3";
const ncmb = new NCMB(APPLICATION_KEY,CLIENT_KEY);
const DBName = "TestClass";
let TestClass = ncmb.DataStore(DBName);
let test = new TestClass();
let key = "message";


function init() {
  if (timer == null) {
    start = new Date();
    time();
    gameStart();
  }
}

function gameStart() {
  let size = 5;
  let qNum = Math.floor(Math.random()*q.length);

  for (let i=0; i<size*size; i++){
    let s = document.createElement("span");
    s.textContent = q[qNum][0];
    s.setAttribute("id", "num" + i);
    s.addEventListener("click", function(){
      if (this.textContent == q[qNum][1]) {
        // alert("正解");
        correct.play();
        while (cells.firstChild){
          cells.removeChild(cells.firstChild);
        }
        clear++;
        if(clear == MAX){
          clear = 0;
          clearTimeout(timer);

          let test = new TestClass();
          let key = "message";
          const text = document.getElementById('message');
          const sc = document.getElementById('time');
          let sco = sc.textContent;
          test.set(key, parseInt(sco))
            .save()
            .then(function(){
              console.log("成功：" + sco);
            })
            .catch(function(err){
              console.log("エラー：" + err);
            });

            let re;
            TestClass
              .order("message")
              .fetchAll()
              .then(function(results){
                if(results.length <=0){
                  re = sco
                  alert("High score!  :" + sco);
                }else if(parseInt(sco) <= results[0].message){
                  re = results[0].message;
                  console.log("最高スコア" + results[0].message);
                  alert("High score!  :" + sco);
                }else{
                  console.log("最高スコア" + results[0].message);
                  alert("Game clear!");
                }
              })
              .catch(function(err) {
                console.log("エラー：" + err);
              });

          timer = null;
          return;
        }
        gameStart();
      } else {
        wrong.play();
      }
    });
    cells.appendChild(s);
    if(i % size == size -1){
      const br = document.createElement("br");
      cells.appendChild(br);
    }
  }
  let p = Math.floor(Math.random()*size*size);
  let ans = document.getElementById("num" + p);
  ans.textContent = q[qNum][1];
}

function time() {
  let now = new Date();
  let eTime = parseInt((now.getTime() - start.getTime())/1000);
  score.textContent = eTime;
  timer = setTimeout("time()", 1000);
}
