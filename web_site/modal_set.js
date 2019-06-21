var set_id = "";

// 牌選択画面用
function centeringModalSyncer() {
	var w = $( window ).width() ;
	var h = $( window ).height() ;

	var cw = $( "#modal-content" ).outerWidth();
	var ch = $( "#modal-content" ).outerHeight();

	$( "#modal-content" ).css( {"left": ((w - cw)/2) + "px","top": ((h - ch)/2) + "px"} ) ;
}
// リザルト画面用
function centeringModalSyncerRslt() {
	var w = $( window ).width() ;
	var h = $( window ).height() ;

	var cw = $( "#modal-content-rslt" ).outerWidth();
	var ch = $( "#modal-content-rslt" ).outerHeight();

	$( "#modal-content-rslt" ).css( {"left": ((w - cw)/2) + "px","top": ((h - ch)/2) + "px"} ) ;
}
// 鳴き画面用
function centeringModalSyncerNaki() {
	var w = $( window ).width() ;
	var h = $( window ).height() ;

	var cw = $( "#modal-content-naki" ).outerWidth();
	var ch = $( "#modal-content-naki" ).outerHeight();

	$( "#modal-content-naki" ).css( {"left": ((w - cw)/2) + "px","top": ((h - ch)/2) + "px"} ) ;
}

// 牌選択画面オープン
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

// 牌選択画面で牌が選択されたとき実行
function hai_change(src_name, alt_name){
	document.getElementById(set_id).src = src_name;
	document.getElementById(set_id).alt = alt_name;
    $( "#modal-content,#modal-overlay" ).fadeOut( "fast" , function(){
        //[#modal-overlay]を削除する
        $('#modal-overlay').remove() ;
    } ) ;
}

// リザルト画面オープン
function modal_open_rslt() {
	//キーボード操作などにより、オーバーレイが多重起動するのを防止する
	$( this ).blur() ;	//ボタンからフォーカスを外す
	if( $( "#modal-overlay" )[0] ) return false ;		//新しくモーダルウィンドウを起動しない (防止策1)
	//if($("#modal-overlay")[0]) $("#modal-overlay").remove() ;		//現在のモーダルウィンドウを削除して新しく起動する (防止策2)

	//オーバーレイを出現させる
	$( "body" ).append( '<div id="modal-overlay"></div>' ) ;
	$( "#modal-overlay" ).fadeIn( "fast" ) ;

	//コンテンツをセンタリングする
	centeringModalSyncerRslt() ;

	//コンテンツをフェードインする
	$( "#modal-content-rslt" ).fadeIn( "fast" ) ;
	modal_hai_load("hourakei");

	//[#modal-overlay]、または[#modal-close]をクリックしたら…
	$( "#modal-overlay,#modal-close" ).unbind().click( function(){

		//[#modal-content]と[#modal-overlay]をフェードアウトした後に…
		$( "#modal-content-rslt,#modal-overlay" ).fadeOut( "fast" , function(){

			//[#modal-overlay]を削除する
			$('#modal-overlay').remove() ;
		} ) ;
	} ) ;
}

// 鳴き画面オープン
function modal_open_naki() {	
	//キーボード操作などにより、オーバーレイが多重起動するのを防止する
	$( this ).blur() ;	//ボタンからフォーカスを外す
	if( $( "#modal-overlay" )[0] ) return false ;		//新しくモーダルウィンドウを起動しない (防止策1)
	//if($("#modal-overlay")[0]) $("#modal-overlay").remove() ;		//現在のモーダルウィンドウを削除して新しく起動する (防止策2)

	//オーバーレイを出現させる
	$( "body" ).append( '<div id="modal-overlay"></div>' ) ;
	$( "#modal-overlay" ).fadeIn( "fast" ) ;

	//コンテンツをセンタリングする
	centeringModalSyncerNaki() ;

	//コンテンツをフェードインする
	$( "#modal-content-naki" ).fadeIn( "fast" ) ;
	modal_hai_load("tehai_naki");

	//[#modal-overlay]、または[#modal-close]をクリックしたら…
	$( "#modal-overlay,#modal-close" ).unbind().click( function(){

		//[#modal-content]と[#modal-overlay]をフェードアウトした後に…
		$( "#modal-content-naki,#modal-overlay" ).fadeOut( "fast" , function(){

			//[#modal-overlay]を削除する
			$('#modal-overlay').remove() ;
		} ) ;
	} ) ;
}

// リサイズ用
$( window ).resize( centeringModalSyncer ) ;
$( window ).resize( centeringModalSyncerRslt ) ;
$( window ).resize( centeringModalSyncerNaki ) ;

// リザルト画面の牌生成
function modal_hai_load(id) {
	// リザルトの牌を初期化
	var element = document.getElementById(id);
	modal_reset(element);
	// 設定画面から牌を取得して生成
	var tehai_ar = ["tehai_01", "tehai_02", "tehai_03", "tehai_04", "tehai_05", "tehai_06", "tehai_07", "tehai_08", "tehai_09", "tehai_10", "tehai_11", "tehai_12", "tehai_13", "agarihai"];
	for (var j = 0; j < 14; j++) {
		var tmp = document.getElementById(tehai_ar[j]).alt;
		var type = tmp.slice(0, 1);
		var num = tmp.slice(1);
		var img = document.createElement('img');
		img.id = tehai_ar[j];
		img.src = "hai/" + type + "/" + num + ".png";
		element.appendChild(img);
	}
}

// リザルト画面の役生成
function modal_yaku_load(yaku_list) {
	// リザルトの役を初期化
	var element1 = document.getElementById("yaku_name");
	modal_reset(element1);
	var element2 = document.getElementById("yaku_han");
	modal_reset(element2);
	// JSONから取得した役を生成
	for (key in yaku_list) {
		var name = document.createElement("p")
		var han = document.createElement("p")
		name.innerHTML = yaku_list[key].japanese
		han.innerHTML = yaku_list[key].han + "翻";
		element1.appendChild(name);
		element2.appendChild(han);
	}
}

// リザルト画面の点数生成
function modal_ten_load(cost_han, cost_fu, cost_main, cost_additional) {
	// リザルトの点を初期化
	var element = document.getElementById("modal_ten");
	modal_reset(element);
	// JSONから取得した点を生成
	var han = document.createElement("p");
	var ten = document.createElement("p");
	var tumo = document.getElementById("tumo").checked
	var wind = document.getElementById("jikaze").alt
	han.id = "han";
	han.innerHTML = cost_han + "翻" + cost_fu + "符";
	ten.id = "ten";
	// ロン
	if (tumo == false) {
		ten.innerHTML = cost_main + "点";
	}
	// 親ツモ
	else if (wind == 1) {
		ten.innerHTML = "ALL " + cost_main + "点";
	}
	// 子ツモ
	else {
		ten.innerHTML = "親" +  cost_main + "点 子" + cost_additional + "点";
	}
	element.appendChild(han);
	element.appendChild(ten);
	// manganを生成する関数を呼び出し
	var cost_sum = cost_main + (cost_additional * 2)
	modal_mangan_load(cost_sum, cost_han);
}

// リザルト画面の満貫を生成
function modal_mangan_load(cost, han) {
	// リザルトの点を初期化
	var element = document.getElementById("modal_mangan");
	modal_reset(element);
	// manganを生成
	var mangan = document.createElement("p");
	var wind = document.getElementById("jikaze").alt
	// 親の場合
	if (wind == 1) {
		if (cost >= 48000) {
			mangan.innerHTML = "役満";
		}
		else if (cost >= 36000) {
			mangan.innerHTML = "三倍満";
		}
		else if (cost >= 24000) {
			mangan.innerHTML = "倍満";
		}
		else if (cost >= 18000) {
			mangan.innerHTML = "跳満";
		}
		else if (cost >= 12000) {
			mangan.innerHTML = "満貫";
		}
		else {
			mangan.innerHTML = han + "翻";
		}
	}
	// 子の場合
	else {
		if (cost >= 32000) {
			mangan.innerHTML = "役満";
		}
		else if (cost >= 24000) {
			mangan.innerHTML = "三倍満";
		}
		else if (cost >= 16000) {
			mangan.innerHTML = "倍満";
		}
		else if (cost >= 12000) {
			mangan.innerHTML = "跳満";
		}
		else if (cost >= 8000) {
			mangan.innerHTML = "満貫";
		}
		else {
			mangan.innerHTML = han + "翻";
		}
	}
	element.appendChild(mangan);
}

// リザルト画面のリセット用
function modal_reset(element) {
	while (element.firstChild) {
		element.removeChild(element.firstChild);
	}
}