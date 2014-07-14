<?php
$page=filter_input(INPUT_GET,"p",FILTER_SANITIZE_SPECIAL_CHARS);
ini_set('display_errors',1);
error_reporting(E_ALL);
$title="gho testing";
if($page){
    $title="$page - gho testing";
}
?>
<html>
    <head>
        <meta charset="UTF-8">
        <title><?php echo $title;?></title>
        <link rel="stylesheet" href="//code.jquery.com/qunit/qunit-1.14.0.css">
        <style>
            #top-menu{
                list-style:none;
                padding:0;
                font-size:18px;
            }
            #top-menu li {
                display:inline;
                padding:5px;
            }
            #top-menu li.active {
                border-radius:2px;
                background:#0D3349;
                color:#ffffff;
            }
            a:link,a:visited,a{
                cursor:pointer;
            }
        </style>
    <body>
        <ul id="top-menu">
            <?php
            $path='tests';
            foreach (new DirectoryIterator($path) as $file) {
                if($file->isFile()){
                    $active='';
                    if(substr($file->getFilename(),0,-3)===$page){
                        $active='active';
                    }
                    echo '<li class="' . $active . '"><a class="nav" id="' . substr($file->getFilename(),0,-3) . '">' . substr($file->getFilename(),0,-3) . '</a>' . '</li>';
                }
            }
            ?>
        </ul>
        <?php if($page){?>
        <div id="qunit"></div>
        <div id="qunit-fixture"></div>
        <script src="//code.jquery.com/qunit/qunit-1.14.0.js"></script>
        <script type="text/javascript" src="../src/gho.js?v=<?php echo rand();?>"></script>
        <script type="text/javascript" src="tests/<?php echo $page;?>.js"></script>
        <?php }?>
        <form action="" method="get" id="jump">
            <input type="hidden" id="p" name="p"/>
        </form>
        <script type="text/javascript">
            var a=document.getElementsByClassName('nav');
            for(var i=0;i<a.length;i++){
                a[i].onclick=function(){
                    var page=this.id;
                    document.getElementById('p').value=page;
                    document.getElementById('jump').submit();
                };
            }
        </script>