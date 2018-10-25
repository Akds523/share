const username1Q = document.getElementById('username1');
const verifyUserNameMsgQ = document.getElementById('verifyUserNameMsg');
const btnRegQ = document.getElementById('btnReg');
const password1Q = document.getElementById('password1');
const btnLoginQ = document.getElementById('btnLogin');
const username2Q = document.getElementById('username2');
const password2Q = document.getElementById('password2');
const regQ = document.getElementById('reg');
const loginQ = document.getElementById('login');
const userQ = document.getElementById('user');
const userinfoQ = document.getElementById('userinfo');
const logoutQ = document.getElementById('logout');
const btnPostQ = document.getElementById('btnPost');
const contentQ = document.getElementById('content');
const listQ = document.getElementById('list');
const showMoreQ = document.getElementById('showMore');
let pageQ = 1;
//初始化
updateUesr();
function updateUesr(){
	var uid = getCookie('uid');
	var username = getCookie('username');
	if(uid){
		regQ.style.display = 'none';
		loginQ.style.display = 'none';
		userQ.style.display = 'block';
		userinfoQ.innerText = username;	
	}else{
		regQ.style.display = 'block';
		loginQ.style.display = 'block';
		userQ.style.display = 'none';
		userinfoQ.innerText = '';
	}
}
showList();
//用户名验证
username1Q.onblur = function(){
	ajax({
		method:'get',
		url:'guestbook/index.php',
		data:{
			m:'index',
			a:'verifyUserName',
			username:this.value
		},
		dataType:'json',
		success:function(data){
			verifyUserNameMsgQ.innerText = data.message;
			if(!data.code){
				verifyUserNameMsgQ.style.color = 'green';
			}else{
				verifyUserNameMsgQ.style.color = 'red';
			}
			
		}
	})
}
//注册
btnRegQ.onclick = function(){
	ajax({
		method:'post',
		url:'guestbook/index.php',
		data:{
			m:'index',
			a:'reg',
			username:username1Q.value,
			password:password1Q.value
		},
		dataType:'json',
		success:function(data){
			alert(data.message);
			console.log(data);
		}
	})
}
//登录
btnLoginQ.onclick = function(){
	ajax({
		method:'post',
		url:'guestbook/index.php',
		data:{
			m:'index',
			a:'login',
			username:username2Q.value,
			password:password2Q.value
		},
		dataType:'json',
		success:function(data){
			alert(data.message);
			if(!data.code){
				updateUesr();
			}
		}
	})
}
//退出
logoutQ.onclick = function(){
	ajax({
		method:'post',
		url:'guestbook/index.php',
		data:{
			m:'index',
			a:'logout'
		},
		dataType:'json',
		success:function(data){
			alert(data.message);
			if(!data.code){
				updateUesr();
			}
		}
	})
	return false;
}
//发表留言
btnPostQ.onclick = function(){
	ajax({
		method:'post',
		url:'guestbook/index.php',
		data:{
			m:'index',
			a:'send',
			content:encodeURI(contentQ.value)
		},
		dataType:'json',
		success:function(data){
			alert(data.message);
			if(!data.code){
				//创建留言列表
				createList(data.data,true);
			}
		}
	})
}
//留言列表
function showList(){
	ajax({
		method:'post',
		url:'guestbook/index.php',
		data:{
			m:'index',
			a:'getList',
			page:pageQ,
			n:2
		},
		dataType:'json',
		success:function(data){
			var data = data.data;
			if(data){
				for(var i=0;i<data.list.length;i++){
					createList(data.list[i]);
				}
			}else{
				if(pageQ == 1){
					listQ.innerText = '现在还没有留言，快来留言咯';
				}
				showMoreQ.style.display = 'none';
			}
		}
	})
}
//点击更多
showMoreQ.onclick = function(){
	pageQ ++;
	showList();
}
//获取cookie
function getCookie(key){
	var arr = document.cookie.split('; ');
	for(var i=0;i<arr.length;i++){
		var arr2 = arr[i].split('=');
		if(arr2[0] == key){
			return arr2[1];
		}
	}
}
//创建留言列表
function createList(data,insert){
	let su = data.support;
	let op = data.oppose;
	let dl = document.createElement('dl');
	let dt = document.createElement('dt');
	let strong = document.createElement('strong');
	strong.innerText = data.username + ':';
	let dd = document.createElement('dd');
	dd.innerText = data.content;
	let dd2 = document.createElement('dd');
	dd2.className = 't';
	let a = document.createElement('a');
	a.href = '#';
	a.className = 'support';
	a.innerHTML = '顶(<span>'+su+'</span>)';
	let a2 = document.createElement('a2');
	a2.href = '#';
	a2.className = 'oppose';
	a2.innerHTML = '踩(<span>'+op+'</span>)';
	dt.appendChild(strong);
	dd2.appendChild(a);
	dd2.appendChild(a2);
	dl.appendChild(dt);
	dl.appendChild(dd);
	dl.appendChild(dd2);
	let cid = data.cid;
	if(insert){
		listQ.insertBefore(dl,listQ.children[0]);
	}else{
		listQ.appendChild(dl);
	}
	a.addEventListener('click',function(e){
		ajax({
			method:'get',
			url:'guestbook/index.php',
			data:{
				m:'index',
				a:'doSupport',
				cid:cid
			},
			dataType:'json',
			success:function(data){
				alert(data.message);
				if(!data.code){
					su ++;
					a.innerHTML = '顶(<span>'+su+'</span>)';
				}
			}
		})
	})
	a2.addEventListener('click',function(e){
		ajax({
			method:'get',
			url:'guestbook/index.php',
			data:{
				m:'index',
				a:'doOppose',
				cid:cid
			},
			dataType:'json',
			success:function(data){
				alert(data.message);
				if(!data.code){
					op ++;
					a2.innerHTML = '踩(<span>'+op+'</span>)';
				}
			}
		})
	})
}