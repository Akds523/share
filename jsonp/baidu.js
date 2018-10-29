function qyk(data){
	const ulQ = document.getElementById('ul');
	var html = '';
	if(data.s.length){
		ulQ.style.display = 'block';
		for(var i=0;i<data.s.length;i++){
			html += '<li><a target="_blank" href="https://www.baidu.com/s?wd='+data.s[i]+'">'+data.s[i]+'</a></li>';
	   }
	   ulQ.innerHTML = html;
	}else{
		ulQ.style.display = 'none';
	}
}
window.onload = function(){
	const searchQ = document.getElementById('search');
	const ulQ = document.getElementById('ul');
	searchQ.addEventListener('keyup',function(ev){
		if(this.value != ''){
			let script = document.createElement('script');
			script.src = 'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd='+this.value+'&cb=qyk';
			document.body.appendChild(script);
		}else{
			ulQ.style.display = 'none';
		}
		if(ev.keyCode == '13'){
			window.location.href = 'https://www.baidu.com/s?ie=utf-8&mod=1&isbd=1&isid=c530a5e00004975c&ie=utf-8&f=8&rsv_bp=1&rsv_idx=1&tn=baidu&wd='+this.value+'&oq=d&rsv_pq=c530a5e00004975c&rsv_t=6e64n4pTXDOubNrXLIIgEUk0cXVVs7Mc%2B3BQN8M5GxB0%2BfpPorZQU2%2FTyxc&rqlang=cn&rsv_enter=1&inputT=6&rsv_sug3=3&rsv_sug1=3&rsv_sug7=100&rsv_sug2=0&rsv_sug4=1713&bs=d&rsv_sid=1449_21120_27401&_ss=1&clist=f898f8c0d94e51b&hsug=&f4s=1&csor=1&_cr1=29426'	
		}
	})
}