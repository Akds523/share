let crumbData = [
    {
        'title':'品牌:',
        'data':['苹果','小米','锤子','魅族','华为','三星','OPPO','VIVO','乐视','中兴','索尼']
    },
    {
        'title':'尺寸:',
        'data':['3.0英寸以下','3.0-3.9英寸','4.0-4.5英寸','4.6-4.9英寸','5.0-5.5英寸','6.0英寸以上']
    },
    {
        'title':'系统:',
        'data':['安卓(Android)','苹果(IOS)','微软(WindowsPhone)','无','其他']
    },
    {
        'title':'网络:',
        'data':['联通3G','双卡单4G','双卡双4G','联通4G','移动4G','电信4G']
    },
];
const type = document.querySelector('.type');
let dataLen = crumbData.length;
let newLi = null;
let newSpan = null;
let newA = null;
for(var i=0;i<dataLen;i++){
    newLi = document.createElement('li');
    newSpan = document.createElement('span');
    type.appendChild(newLi);
    newLi.appendChild(newSpan);
    newSpan.innerText = crumbData[i].title;
    for(var j=0;j<crumbData[i].data.length;j++){
        newA = document.createElement('a');
        newA.href = 'javascript:;';
        newA.innerText = crumbData[i].data[j];
        newLi.appendChild(newA);
    }
}
const lis = type.children;
let tagA = null;
// let prev = null;
let chooseObj = {};
for(var l=0;l<lis.length;l++){
    tagA = lis[l].querySelectorAll('a');
    lis[l].prevNode = null;
    lis[l].index = l;
    for(var o=0; o<tagA.length;o++){
        tagA[o].addEventListener('click',function(){
            var parent = this.parentNode;
            chooseObj[parent.index] = this.innerText;
            // console.log(chooseObj);
            createChoose();
            if(parent.prevNode){
                parent.prevNode.style.color = '';
            }
            this.style.color = 'red';
            parent.prevNode = this;
        });
    }
}
const chooseElement = document.querySelector('.choose div');
function createChoose(){
    let html = '';
    for(var i=0;i<lis.length;i++){
        if(chooseObj[i]){
            // html += '<mark>'+chooseObj[i]+' <a href="javascript:;">x</a></mark>';
            html += `<mark>${chooseObj[i]} <a data-index="${i}" href="javascript:;">x</a></mark>`
        }
    }
    chooseElement.innerHTML = html;
    const chooseA = chooseElement.querySelectorAll('a');
    for(var j=0;j<chooseA.length;j++){
        chooseA[j].addEventListener('click',function(){
            // console.log(this.parentNode);
            // this.perentNode.remove();
            this.parentNode.parentNode.removeChild(this.parentNode);
            // console.log(this.dataset);
            delete chooseObj[this.dataset.index];
            lis[this.dataset.index].prevNode.style.color = '';
        })
    }
}