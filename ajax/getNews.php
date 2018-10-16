<?php
	header('content-type:text/html;charset="utf-8"');
	error_reporting(0);
	$news = array(
		array('title'=>'title1','data'=>'data1'),
		array('title'=>'title2','data'=>'data2'),
		array('title'=>'title3','data'=>'data3'),
		array('title'=>'title4','data'=>'data4'),
		array('title'=>'title5','data'=>'data5'),
	);
	echo json_encode($news);
?>