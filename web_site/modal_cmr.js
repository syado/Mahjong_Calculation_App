// 画面リサイズ時にずれないよう調整
function centeringModalSyncer() {
	var w = $( window ).width() ;
	var h = $( window ).height() ;

	var cw = $( "#modal-content" ).outerWidth();
	var ch = $( "#modal-content" ).outerHeight();

	$( "#modal-content" ).css( {"left": ((w - cw)/2) + "px","top": ((h - ch)/2) + "px"} ) ;
}

function modal_open() {
	// キーボード操作などにより、オーバーレイが多重起動するのを防止する
	$( this ).blur() ;	// ボタンからフォーカスを外す
	if( $( "#modal-overlay" )[0] ) return false ;  // 新しくモーダルウィンドウを起動しない
	

	// オーバーレイを出現させる
	$( "body" ).append( '<div id="modal-overlay"></div>' ) ;
	$( "#modal-overlay" ).fadeIn( "fast" ) ;

	// コンテンツをセンタリングする
	centeringModalSyncer() ;

	// コンテンツをフェードインする
	$( "#modal-content" ).fadeIn( "fast" ) ;

	// [#modal-overlay]、または[#modal-close]をクリックしたら…
	$( "#modal-overlay,#modal-close" ).unbind().click( function(){
		// カメラを再起動
		videoRestartbutton()

		// [#modal-content]と[#modal-overlay]をフェードアウトした後に…
		$( "#modal-content,#modal-overlay" ).fadeOut( "fast" , function(){
			
			// [#modal-overlay]を削除する
			$('#modal-overlay').remove() ;
		} ) ;
	} ) ;
}

$( window ).resize( centeringModalSyncer ) ;