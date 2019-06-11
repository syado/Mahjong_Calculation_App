var set_id = "";

function centeringModalSyncer() {
	var w = $( window ).width() ;
	var h = $( window ).height() ;

	var cw = $( "#modal-content" ).outerWidth();
	var ch = $( "#modal-content" ).outerHeight();

	$( "#modal-content" ).css( {"left": ((w - cw)/2) + "px","top": ((h - ch)/2) + "px"} ) ;
}

function modal_open(hai_id) {
    set_id = hai_id;

	//キーボード操作などにより、オーバーレイが多重起動するのを防止する
	$( this ).blur() ;	//ボタンからフォーカスを外す
	if( $( "#modal-overlay" )[0] ) return false ;		//新しくモーダルウィンドウを起動しない (防止策1)
	//if($("#modal-overlay")[0]) $("#modal-overlay").remove() ;		//現在のモーダルウィンドウを削除して新しく起動する (防止策2)

	//オーバーレイを出現させる
	$( "body" ).append( '<div id="modal-overlay"></div>' ) ;
	$( "#modal-overlay" ).fadeIn( "fast" ) ;

	//コンテンツをセンタリングする
	centeringModalSyncer() ;

	//コンテンツをフェードインする
	$( "#modal-content" ).fadeIn( "fast" ) ;

	//[#modal-overlay]、または[#modal-close]をクリックしたら…
	$( "#modal-overlay,#modal-close" ).unbind().click( function(){

		//[#modal-content]と[#modal-overlay]をフェードアウトした後に…
		$( "#modal-content,#modal-overlay" ).fadeOut( "fast" , function(){

			//[#modal-overlay]を削除する
			$('#modal-overlay').remove() ;

		} ) ;

	} ) ;
}

function hai_change(src_name, alt_name){
	document.getElementById(set_id).src = src_name;
	document.getElementById(set_id).alt = alt_name;
    $( "#modal-content,#modal-overlay" ).fadeOut( "fast" , function(){

        //[#modal-overlay]を削除する
        $('#modal-overlay').remove() ;

    } ) ;
}

function getUrlVars()
{
    var vars = [], max = 0, hash = "", array = "";
    var url = window.location.search;

        //?を取り除くため、1から始める。複数のクエリ文字列に対応するため、&で区切る
    hash  = url.slice(1).split('&');    
    max = hash.length;
    for (var i = 0; i < max; i++) {
        array = hash[i].split('=');    //keyと値に分割。
        vars.push(array[0]);    //末尾にクエリ文字列のkeyを挿入。
        vars[array[0]] = array[1];    //先ほど確保したkeyに、値を代入。
    }

    return vars;
}

$( window ).resize( centeringModalSyncer ) ;