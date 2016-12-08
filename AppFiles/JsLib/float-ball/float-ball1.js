$(document).ready(function() {
    var div = document.createElement('div');
    div.className = 'float-menu-bar menu-mask';
    var html = '<div class="menu-mask"></div>';
    html += '<img src="AppFiles/JsLib/float-ball/ball.png" style="width: 35px; height: 35px;position: fixed;" />';
    html += '<ul class="menu-list">';
    html += '<li><a href="javascript:history.go(-1);"><img  src="AppFiles/JsLib/float-ball/back.png"/></a></li>';
    html += '<li><a href="index.html"><img  src="AppFiles/JsLib/float-ball/home.png"/></a></li>';
    html += '<li><a href="search.html"><img  src="AppFiles/JsLib/float-ball/search.png"/></a></li>';
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
});