$(document).ready(function() {
    /*
    var liObj={
        lis:[ //功能按钮
            {'href':'javascript:history.go(-1);','img':'AppFiles/JsLib/float-ball/back.png'},
            { 'href':'index.html','img':'AppFiles/JsLib/float-ball/home.png'}
        ]};
    $(this).floatBall(liObj);
    */
    $(this).floatBall();//使用默认参数
});

(function ($) {
    $.fn.floatBall = function (options) {
        var defaults = {//默认参数
            'lis':[ //功能按钮
                {'href':'javascript:history.go(-1);','img':'AppFiles/JsLib/float-ball/back.png'},
                { 'href':'index.html','img':'AppFiles/JsLib/float-ball/home.png'},
                {'href':'search.html','img':'AppFiles/JsLib/float-ball/search.png'}
                ],

            'width':'35px',//浮动点的宽度
            'height':'35px'//浮动点的高度
        }
        var settings = $.extend({},defaults,options);

        var menuListTop = '0%';
        switch(settings.lis.length){
            case 1:
                menuListTop = '0%';
                break;
            case 2:
                menuListTop = '-70%';
                break;
            case 3:
                menuListTop = '-150%';
                break;
        }
        var div = document.createElement('div');
        div.className = 'float-menu-bar menu-mask';
        var html = '<div class="menu-mask"></div>';
        html += '<img src="AppFiles/JsLib/float-ball/ball.png" style="width:'+ settings.width + '; height: ' + settings.height + ';position: fixed;" />';
        html += '<ul class="menu-list" style="top:' + menuListTop + '">';
        for(var li in settings.lis){
            html += '<li><a href="' + settings.lis[li].href + '"><img  src="' + settings.lis[li].img + '"/></a></li>';
        }
        html += '</ul>';
        div.innerHTML = html;
        document.body.appendChild(div);



        var viewWidth = window.screen.width;
        var viewHeight = window.screen.height;
        var storageWidth = localStorage.getItem('imgWidth');
        var storageHeigth = localStorage.getItem('imgHeigth');
        var divWidth = parseInt($(div).css('width'));
        var divHeight = parseInt($(div).css('height'));


        if (storageWidth != null && storageHeigth != null)
        {
            $('.float-menu-bar').css('left', storageWidth);
            $('.float-menu-bar').css('top', storageHeigth);
        }

        //移动
        div.addEventListener('touchmove' ,function(event) {
            event.preventDefault();//阻止其他事件
            // 如果这个元素的位置内只有一个手指的话
            if (event.targetTouches.length == 1) {
                var touch = event.targetTouches[0];  // 把元素放在手指所在的位置
                var tempWidth = touch.pageX - divWidth/2;
                var tempHeigth = touch.pageY - divHeight/2;
                tempWidth = tempWidth>5?tempWidth:5;
                tempHeigth = tempHeigth>5?tempHeigth:5;
                if(tempWidth > (viewWidth - divWidth)){
                    tempWidth = viewWidth - divWidth - 5;
                }
                if(tempHeigth > (viewHeight - divHeight)){
                    tempHeigth = viewHeight - divHeight - 5;
                }
                div.style.left =  tempWidth  + 'px';
                div.style.top = tempHeigth + 'px';
                localStorage.setItem('imgWidth', tempWidth + 'px');
                localStorage.setItem('imgHeigth', tempHeigth + 'px');
                div.style.background = "";
            }
        }, false);

        //点击
        div.addEventListener('click',function () {
            var halfViewWidth = parseInt(viewWidth)/2;
            var divLeft = parseInt(document.querySelector('.float-menu-bar').style.left);
            var ul = document.querySelector(".menu-list");
            if(divLeft > halfViewWidth && !this.classList.contains('menu-show')){
                ul.style.webkitTransform = 'translate(-300%, 0%) scale(1)';
                ul.style.mozTransform = 'translate(-300%, 0%) scale(1)';
                ul.style.transform = 'translate(-300%, 0%) scale(1)';
            }
            else{
                ul.style.webkitTransform = '';
                ul.style.mozTransform = '';
                ul.style.transform = '';
            }
            this.classList.toggle('menu-show');
        },false);
    };
})(jQuery)

