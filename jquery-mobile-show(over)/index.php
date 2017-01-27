<?php
header('Content-Type: text/html; charset=utf-8');
header('Access-Control-Allow-Origin: *');
function returnState(){
	return array('state'=>'error');
}
if(is_array($_GET)&&count($_GET)>0){ 
	if(isset($_GET["type"])){ 
		$choose=$_GET["type"];
	}else{
		echo  json_encode(returnState());
		
	}
} else{
	echo  json_encode(returnState());
	// echo '123';
}
// echo '123123';

$config = array('user'=>'root',
			'password'=>'KaNg_In',
			'database'=>'douban',
			'lange'=>'utf-8');


$_con = mysqli_connect('localhost',$config['user'],$config['password'],$config['database']);

mysqli_query($_con,"SET NAMES UTF8");


// echo '123';



switch($choose){
	case 'tuijian': 
		$sql='SELECT * FROM (
			SELECT `book_id`,
					`book_name`,
					`book_image`,
					`book_info`,
					`book_tags`,
					`book_content`,
					`rate_num`,
					`rate_people`
			 FROM `book`
				ORDER BY `book`.`rate_num`  DESC,
						`book`.`rate_people` DESC limit 5000
			) as a 
		ORDER BY  RAND() LIMIT 50';
		$a = mysqli_query($_con,$sql);
		$result = $a->fetch_all(MYSQL_ASSOC);
		$result['state']='success';
		echo json_encode($result);
		break;
	case 'one':
		if(isset($_GET['key'])&&is_numeric($_GET['key'])){$key = $_GET['key'];}else{echo  json_encode(returnState());break;}
		$sql = '
					SELECT `book_id`,
							`book_name`,
							`book_image`,
							`book_info`,
							`book_tags`,
							`book_content`,
							`rate_num`,
							`rate_people`
					 FROM `book`
						WHERE `book_id`='.$key;
		$a = mysqli_query($_con,$sql);
		$result = $a->fetch_all(MYSQL_ASSOC);
		$result['state']='success';
		echo json_encode($result);
		break;
	case 'list':
		if(isset($_GET['key'])){$key = $_GET['key'];}else{echo  json_encode(returnState());break;}
		$_arr = explode('_', $key);
		if(count($_arr)==1){
		$sql = 'SELECT `book_id`,
								`book_name`,
								`book_image`,
								`book_info`,
								`book_tags`,
								`book_content`,
								`rate_num`,
								`rate_people` 
						FROM `book` WHERE `book_tags` LIKE \'%'.urldecode($_arr[0]).'%\' ORDER BY `book`.`rate_num` DESC , `book`.`rate_people` DESC limit 0,50' ;
			// $a['state']='successful';
			$a = mysqli_query($_con,$sql);
			$result = $a->fetch_all(MYSQL_ASSOC);
			$result['state']='success';
			echo json_encode($result);
			break;
		}elseif(count($_arr)==3){
			$sql = 'SELECT `book_id`,
								`book_name`,
								`book_image`,
								`book_info`,
								`book_tags`,
								`book_content`,
								`rate_num`,
								`rate_people` 
						FROM `book` WHERE `book_tags` LIKE \'%'.urldecode($_arr[0]).'%\' ORDER BY `book`.`rate_num` DESC , `book`.`rate_people` DESC limit '. $_arr[1].','.$_arr[2];
			$a = mysqli_query($_con,$sql);
			$result = $a->fetch_all(MYSQL_ASSOC);
			$result['state']='success';
			echo json_encode($result);
			break;
		}elseif(count($_arr)==2){
			echo  json_encode(returnState());break; 
		}else{
			echo  json_encode(returnState());break;
		}


}