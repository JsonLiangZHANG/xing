$(document).ready(function(){
	var swiper = new Swiper('.floor6_container', {
        pagination: '.pagination1',
        slidesPerView: 3.5,
        paginationClickable: true,
       // spaceBetween:30,
         grabCursor:true,
        freeMode: true
    });
    
    
	$("#list_nav>li").click(function(){
		console.log($(this).index());
		$(this).addClass("active").siblings().removeClass("active");
	});
	$(".welfare_title>div.form_tile").click(function(){
		createCode();
		var index=$(this).index();
		$(this).addClass("active").siblings().removeClass("active");
		if(index==0){
			$(".login_btn").css("display","block");
			$(".sigin_btn").css("display","none");
		}else{
			$(".sigin_btn").css("display","block");
			$(".login_btn").css("display","none");
		}
	});
   $(".backtop").click(function(){
        $('body,html').animate({scrollTop:0},800);
        return false;
    });
    
   window.onresize=setBackTop;
    setBackTop();
 	createCode();
    $('#myCarousel').carousel({interval:3000});//每隔5秒自动轮播 

})

/*生成4位数的验证码*/
	 var code ; //在全局定义验证码   
        function createCode(){ 
             code = "";    
             var codeLength = 4;//验证码的长度   
             var checkCode = document.getElementById("code");    
             var random = new Array(0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R',   
             'S','T','U','V','W','X','Y','Z');//随机数   
             for(var i = 0; i < codeLength; i++) {//循环操作   
                var index = Math.floor(Math.random()*36);//取得随机数的索引（0~35）   
                code += random[index];//根据索引取得随机数加到code上   
            }   
            checkCode.value = code;//把code值赋给验证码   
        } 
  
  function setBackTop(){
    var h=$(window).height()/2;
    var w=$(window).width();
    if(w>1200){
    	 $(".backtop").css({right:((w-1200)/4)+"px"});
    }else{
    	$(".backtop").css({right:20+"px"});
    }
   
    window.onscroll=function(){
        if(document.body.scrollTop>=h||document.documentElement.scrollTop>=h){
            $(".backtop").fadeIn(300);
        }else{
            $(".backtop").fadeOut(300);
        }
    }
}
