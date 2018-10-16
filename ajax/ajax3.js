function ajax(json){
    //method url data success函数
    var opt = {
        method:'get',
        url:'',
        data:{},
        dataType:'json',
        success:function(){},
        fail:function(){}
    };
    for(var attr in json){
        opt[attr] = json[attr];
    }
	console.log(opt.data);
    /*var arr = [];
    for(var attr in opt.data){
        arr.push(attr + '='+ opt.data[attr]);
    }
    opt.data = arr.join('&');
	console.log(opt.data);*/
    var xhr = null;
    try{
        xhr = new XMLHttpRequest();
    }catch(e){
        xhr = new ActiveXObject('Microsoft-XMLHTTP');
    }
   if(opt.method == 'get'){
        xhr.open('get',opt.url+'?'+opt.data ,true);
        xhr.send();
        xhr.onreadystatechange = ready;
   }
   if(opt.method == 'post'){
       xhr.open('post',opt.url,true);
       xhr.setRequestHeader('content-type','application/x-www-form-urlencoded');
       xhr.send(opt.data);
       xhr.onreadystatechange = ready;
   }
  function ready(){
      if(xhr.readyState === 4){
          if(xhr.status >=200 && xhr.status <=207){
              if(opt.dataType === 'json'){
				 
                  opt.success && opt.success(JSON.parse(xhr.responseText));
              }else if(opt.dataType === 'xml'){
                  opt.success && opt.success(xhr.responseXML);
              }else{
                  opt.success && opt.success(xhr.responseText);
              }
          }else{
              opt.fail(ajax.status);
          }
      }
  }
}