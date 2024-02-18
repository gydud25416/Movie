document.addEventListener("DOMContentLoaded", function(){ // 전체 1회 실행
var movie_pick = document.querySelector("#item_pick"); //영화 선택
var movie_img = document.querySelector("section .image"); //영화 포스터
var adult_sel = document.querySelectorAll('.age_1 ul li a') //일반 인원수
var adult_sel2 = document.querySelectorAll('.age_2 ul li a') //청소년 인원수
var pay_adult = document.querySelector('.pay_adult .pay') //일반 영화 가격 
var pay_youth = document.querySelector('.pay_youth .pay') //청소년 영화 가격
var seat = document.querySelectorAll('.seat div a') //좌석
var se_text = document.querySelector(".reset p .tt"); //빈좌석 수

var per_adult = document.querySelector('.pay_adult .person') // 계산 일반 인원수  TEXT
var per_youth = document.querySelector('.pay_youth .person') //계산 청소년 인원수  TEXT

var pay_total = document.querySelector('.pay_total .price') // 총 금액 TEXT

document.querySelector('.pay_adult').style.display="none"
document.querySelector('.pay_youth').style.display="none"

function pay(){ //총금액 계산
    var adult_sel_data = document.querySelector('.age_1 ul li a.on').dataset.num // 선택된 일반 인원수
    var youth_sel_data = document.querySelector('.age_2 ul li a.on').dataset.num // 선택된청소년 인원수
   

    pay_adult.innerText = movie_pick.value 
    pay_youth.innerText = movie_pick.value - 2000 
    per_adult.innerText = adult_sel_data 
    per_youth.innerText = youth_sel_data
    pay_total.innerText = ( movie_pick.value * adult_sel_data ) + ( (movie_pick.value - 2000 ) * youth_sel_data ) //총 금액

    localStorage.setItem('pay_adult', parseInt( pay_adult.innerText ));
    localStorage.setItem('pay_youth', parseInt( pay_youth.innerText) );
    localStorage.setItem('pay_total', pay_total.innerText);

    console.log(pay_total.innerText)

}



/* select 영화선택 이벤트 */
function setData(){ //영화선택 
    let selectIndex = movie_pick.selectedIndex; 
    movie_img.style.background="url(resources/images/movie_0" + selectIndex + ".jpg) no-repeat";
    movie_img.style.backgroundSize="auto 100%";
        
  
    adult_sel.forEach(function(e){ //일반 인원수 초기화
        e.classList.remove("on"); //전체 버튼 class on 삭제
    })
    adult_sel2.forEach(function(e){  //청소년 인원수 초기화
        e.classList.remove("on"); //전체 버튼 class on 삭제
    })
    adult_sel[0].classList.add('on'); //일반 인원 0명으로 초기화
    adult_sel2[0].classList.add('on'); //청소년 인원 0명으로 초기화
    

    document.querySelectorAll('.seat div a').forEach(function(seat){ //좌석 초기화
        seat.classList.remove('select'); 
    })
    document.querySelector('.pay_adult').style.display="none" //일반 금액 텍스트 숨김
    document.querySelector('.pay_youth').style.display="none" //청소년 금액 텍스트 숨김
    pay(); //총 금액 다시 계산

    localStorage.setItem('selectMovie', movie_pick.value ); //선택한 영화 로컬스토리지 저장

   
    
}

movie_pick.addEventListener("change", setData ) //영화 선택
movie_pick.addEventListener("change", function(){  //영화 선택 시 저장 초기화
    localStorage.removeItem('pay_adult'); //일반 가격
    localStorage.removeItem('pay_youth'); //청소년 가격
    localStorage.removeItem('per_adult'); //일반 인원수
    localStorage.removeItem('per_youth'); //청소년 인원수
    localStorage.removeItem('pay_total'); //청소년 인원수
    localStorage.removeItem('seatIndex'); // 좌석idx
    
} )



/* 일반 인원수 클릭 이벤트 */
adult_sel.forEach(function(ele){ // 모든 일반 인원수 버튼
    ele.addEventListener("click",function(el){ //클릭 이벤트 추가
        var seat_sel = document.querySelectorAll('.seat div a.select') // 선택된 좌석
        if(movie_pick.value == ''){
            alert("영화를 선택해주세요.")
            el.preventDefault;
            return false
        }else{
        adult_sel.forEach(function(e){ 
            e.classList.remove("on"); //전체 버튼 class on 삭제
        })
    }
    seat_sel.forEach(function(seat){ //좌석 초기화
        seat.classList.remove('select'); 
    })
    if(el.target.parentElement.classList.contains('0') == true){
        el.target.classList.add("on") //선택된 인원수
        document.querySelector('.pay_adult').style.display="none"
        pay()
    }else{
        el.target.classList.add("on") //선택된 인원수
        document.querySelector('.pay_adult').style.display="block"
        pay()
    }
    localStorage.setItem('per_adult', per_adult.innerText); //일반 인원수 저장

    console.log(per_adult.innerText)
    localStorage.removeItem('seatIndex') //좌석 초기화
    reset();
    se_text.innerText = "40"   
    var seat_empty = "40"
    localStorage.setItem('seat_empty', seat_empty ) //빈좌석 수 저장
    console.log(seat_empty)
    })
})

/* 청소년 인원수 클릭 이벤트 */
adult_sel2.forEach(function(ele){ // 모든 청소년 인원수 버튼
    ele.addEventListener("click",function(el){
        var seat_sel = document.querySelectorAll('.seat div a.select') // 선택된 좌석

        if(movie_pick.value == ''){
            alert("영화를 선택해주세요.")
            el.preventDefault;
            return false
        }else{
        adult_sel2.forEach(function(e){
            e.classList.remove("on")
            

        })
    }
    seat_sel.forEach(function(seat){ //좌석 초기화
        seat.classList.remove('select');
         
    })
    if(el.target.parentElement.classList.contains('0') == true){
        el.target.classList.add("on") //선택된 인원수
        document.querySelector('.pay_youth').style.display="none"
        pay()
    }else{
        el.target.classList.add("on") //선택된 인원수
        document.querySelector('.pay_youth').style.display="block"
        pay()
    }
    localStorage.setItem('per_youth',  per_youth.innerText ); //청소년 인원수 저장

    console.log(per_youth.innerText)
    localStorage.removeItem('seatIndex') //좌석idx 초기화
    reset();
    se_text.innerText = "40"   
    var seat_empty = "40"
    localStorage.setItem('seat_empty', seat_empty ) //빈좌석 수 저장
    console.log(seat_empty)
    })
})


/* 좌석 선택 이벤트 */
seat.forEach(function(el){
el.addEventListener('click', function(e){
    var adult_sel_data = document.querySelector('.age_1 ul li a.on').dataset.num // 선택된 일반 인원수
    var youth_sel_data = document.querySelector('.age_2 ul li a.on').dataset.num // 선택된청소년 인원수
  var seat_sel = document.querySelectorAll('.seat div a.select') // 선택된 좌석

    if(seat_sel.length + 1 > parseInt(adult_sel_data) + parseInt(youth_sel_data) ){
     
        e.target.classList.remove('select');
        e.preventDefault;
        return false
    }  
    e.target.classList.toggle('select');
    
    var seat_sel = document.querySelectorAll('.seat div a.select') // 선택된 좌석
    var seats = document.querySelectorAll('.seat div a') //전체좌석

    var seatIndex = [...seat_sel].map(function(seat){ //선택한 모든 좌석(var seat_sel)에 function 순회
        return [...seats].indexOf(seat); //seatIndex = 모든 좌석(seats) 배열 중 선택한 좌석(seat)의 index값 ->map 모든 배열 순회
    })

    localStorage.setItem('seatIndex', JSON.stringify(seatIndex)); // 선택 좌석 index값 저장

    var seat_empty = seats.length - seat_sel.length; // 전체좌석 - 선택좌석

    
    se_text.innerText = seat_empty;

    localStorage.setItem('seat_empty', seat_empty ) //빈좌석 수 저장
     console.log(seat_empty)
})
})

/* 좌석 초기화 */
var reset_btn = document.querySelector(".reset button")

reset_btn.addEventListener('click', reset)
function reset(){
    var seat_sel = document.querySelectorAll('.seat div a.select') // 선택된 좌석
    seat_sel.forEach(function(seat){ //좌석 초기화
    seat.classList.remove('select');
    se_text.innerText = "40"   
    var seat_empty = "40"
    localStorage.setItem('seat_empty', seat_empty ) //빈좌석 수 저장
    console.log(seat_empty)
    localStorage.removeItem('seatIndex') //좌석idx 초기화

    })
}
/* JSON 정보 저장 */

//영화 선택 정보 저장
movie_pick.value = localStorage.getItem('selectMovie'); 
if(!movie_pick.value == '' ){
    setData();
   
} else{
    setData();
    movie_pick.value = ''
}
console.log(movie_pick.value)

// 총 금액 정보, 좌석 정보 저장
function pay2(){


    pay_adult.innerText = localStorage.getItem('pay_adult'); //일반 가격
    pay_youth.innerText = localStorage.getItem('pay_youth'); //청소년 가격
    per_adult.innerText = localStorage.getItem('per_adult'); //일반 인원수
    per_youth.innerText = localStorage.getItem('per_youth'); //청소년 인원수

    if(movie_pick.value == ''){
        pay_total.innerText = '0' //영화 미선택 시 0원
    }else{
        pay_total.innerText = (pay_adult.innerText * per_adult.innerText) + (pay_youth.innerText * per_youth.innerText) //총가격

    }
    //저장된 인원수가 있으면 계산 보여짐
    if(per_adult.innerText > 0){
        document.querySelector('.pay_adult').style.display="block"
    }
    if(per_youth.innerText > 0){
        document.querySelector('.pay_youth').style.display="block"
    }
 
 /* 좌석 선택 정보 저장  */
    var seats = document.querySelectorAll('.seat div a') //전체좌석
    var seat_idx = JSON.parse(localStorage.getItem('seatIndex')) //선택한 좌석 idx배열값
    if(seat_idx !== null && seat_idx.length > 0){ // 선택한 상태에서만 실행
    seats.forEach(function(row, rowIdx){ // 모든 좌석(a)에 {row(seats)} rowIdx 값 추가
        if(seat_idx.indexOf(rowIdx) > -1 ){ //[선택좌석1, 선택좌석2 ...] 처럼 선택 좌석(seat_idx)이 하나 이상일때
            row.classList.add('select')
        }
    })
}
} 
pay2(); // 총 금액 정보, 좌석 정보 저장
console.log(pay_adult.innerText)
console.log(pay_youth.innerText)
console.log(per_adult.innerText)
console.log(per_youth.innerText)
console.log(pay_total.innerText)

/* 일반, 청소년 인원수 저장 불러오기 */
per_adult.innerText = localStorage.getItem('per_adult');
 
if(per_adult.innerText > 0){
    adult_sel[0].classList.remove('on')// 일반 인원수[0] 클래스 삭제 
    adult_sel[per_adult.innerText].classList.add('on') // 일반 인원수 저장
}

per_youth.innerText = localStorage.getItem('per_youth');
 
if(per_youth.innerText > 0){
    adult_sel2[0].classList.remove('on')// 청소년 인원수[0] 클래스 삭제
    adult_sel2[per_youth.innerText].classList.add('on')// 청소년 인원수 저장
}

/* 빈좌석 수 */
var seat_empty = localStorage.getItem('seat_empty');

se_text.innerText = seat_empty;

})