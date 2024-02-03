document.addEventListener("DOMContentLoaded", function(){
var movie_pick = document.querySelector("#item_pick");
var movie_img = document.querySelector("section .image");
var adult_sel = document.querySelectorAll('.age_1 ul li a')
var adult_sel2 = document.querySelectorAll('.age_2 ul li a')

movie_pick.addEventListener("change", function(){
 
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
})
 
adult_sel.forEach(function(ele){
    ele.addEventListener("click",function(el){
        adult_sel.forEach(function(e){
            e.classList.remove("on")
        })
        el.target.classList.add("on")
    })
})
adult_sel2.forEach(function(ele){
    ele.addEventListener("click",function(el){
        adult_sel2.forEach(function(e){
            e.classList.remove("on")
        })
        el.target.classList.add("on")
    })
})


})