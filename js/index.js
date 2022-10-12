// -----------------------轮播图-------------------------------
var swiper = new Swiper(".mySwiper", {
  loop:true,   //是否循环
    // spaceBetween: 30,  //每屏之间的间隔空白
    centeredSlides: true,
    // speed:1000,             //触摸轮播时的速度
    autoplay: {   //自动播放
      delay: 2500,   //每2.5s切换一次图片
      stopOnLastSlide:false,
      disableOnInteraction: false,   //用户操作swipper后不禁止autoplay
    },
    //分页器
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    
  });

// ---------------------------推荐攻略---------------------------------------
var num=0;

getData(0)
function getData(num){
  $.ajax({
    type:'get',
    url:"http://localhost/mafengwo/server/mfw.php",
    data:{
      num
    },
    dataType:'json',
    success:res=>{
        // console.log(res.data.list);
        // console.log(res);

        if(!res.show_more){
          $('.footer').html('已经到最底部啦~~~')
          return;
        }


        let arr=res.data.list,str='',logo='';
      
        for (let i = 0; i < arr.length; i++) {
          // console.log(arr[i].data.badge);
          if(arr[i].data.badge){
            logo=`<img class="fs" src="${arr[i].data.badge.image}" alt="" style="height:${arr[i].data.badge.height/2}px; width:${arr[i].data.badge.width/2}px;">`
          }else{
            logo=""
          }

           str+=`<a href="#">
                    <div class="bd-title">
                        ${arr[i].data.title}  ${logo}
                    </div>
                    <div class="content">
                        <div class="left">
                            <img src="${arr[i].data.image}" alt="">
                        </div>
                        <div class="right">
                            <div class="summary">${arr[i].data.content}</div>
                            <div class="bot">
                                  ${arr[i].data_source.pv}浏览
                                  <div class="author">
                                    ${arr[i].data.bottom.user.name}
                                    
                                    <img src="${arr[i].data.bottom.user.logo}" alt="">
                                  </div>
                                </div>
                              
                        </div>
                    </div>
                  </a>`
        }
        $('.bd').append(str)
        flag=true;

    }
  })

}

//点击查看更多
$(".footer").click(function(){
  num++;
  getData(num)
  
})


//点击返回顶部按钮
let width=$(window).height()   //视口的高度
// console.log(width);
let flag=true;

//鼠标滚动事件
$(window).scroll(function(){
  let top=$(window).scrollTop()   //鼠标滚动的距离
  let docHei=$(document).height()  //文档的高度
  // console.log(docHei);
  // console.log(top);
  if(top>1000){
    $('.goTop').show()
  }else{
    $('.goTop').hide()
  }

  //当鼠标滚动到每一屏的最后时，开始加载下一页的数据
  if(top+width>=docHei-100 &&flag ){  
    //top+width>=docHei-100 第一次符合条件时进入，flag变为false，进入下一屏，
    // 下一屏数据加载完，flag变为true，鼠标继续在下一屏滚动，直到下一次符合
    // top+width>=docHei-100的条件。


    // console.log(1);  用来保证每一屏只进入一次这个判断条件 
    flag=false;

    num++;
    getData(num);

   
  }
})

$('.goTop').click(function(){
  // $(window).scrollTop(0)
  //$().animate({属性},delay,callback)
  $("body,html").animate({
    scrollTop:0
  },1000)
})