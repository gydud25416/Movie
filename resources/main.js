document.addEventListener("DOMContentLoaded", function(){
var movie_pick = document.querySelector("#item_pick"); //영화 선택
var movie_img = document.querySelector("section .image"); //영화 포스터
var adult_sel = document.querySelectorAll('.age_1 ul li a') //일반 인원수
var adult_sel2 = document.querySelectorAll('.age_2 ul li a') //청소년 인원수
var pay_adult = document.querySelector('.pay_adult .pay') //일반 영화 가격 
var pay_youth = document.querySelector('.pay_youth .pay') //청소년 영화 가격
var seat = document.querySelectorAll('.seat div a') //좌석


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
}

function setData(){ //영화선택

    if(movie_pick.value == '10000'){ 
        movie_img.style.background="url(resources/images/movie_01.jpg) no-repeat";
        movie_img.style.backgroundSize="auto 100%";
        
    }
    if(movie_pick.value == '12000'){
        movie_img.style.background="url(resources/images/movie_02.jpg) no-repeat";
        movie_img.style.backgroundSize="auto 100%";
    }
    if(movie_pick.value == '8000'){
        movie_img.style.background="url(resources/images/movie_03.jpg) no-repeat";
        movie_img.style.backgroundSize="auto 100%";
    }
    if(movie_pick.value == '9000'){
        movie_img.style.background="url(resources/images/movie_04.jpg) no-repeat";
        movie_img.style.backgroundSize="auto 100%";
    }
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
    })
})


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
    })
})



seat.forEach(function(el){
el.addEventListener('click', function(e){
    var adult_sel_data = document.querySelector('.age_1 ul li a.on').dataset.num // 선택된 일반 인원수
    var youth_sel_data = document.querySelector('.age_2 ul li a.on').dataset.num // 선택된청소년 인원수
    var seat_sel = document.querySelectorAll('.seat div a.select') // 선택된 좌석
    
    if(seat_sel.length + 1 > parseInt(adult_sel_data) + parseInt(youth_sel_data) ){
        // alert('선택한 인원수보다 많습니다.')
        e.target.classList.remove('select');
        e.preventDefault;
        return false
    }  
    e.target.classList.toggle('select');
    
  
     
})
})


/* JSON 정보 저장 */

//영화 선택 정보 저장
movie_pick.value = localStorage.getItem('selectMovie'); 
if(!movie_pick.value == '' ){
    setData();
}
    
console.log(movie_pick.value)





})