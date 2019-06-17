var set_id = "";

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

// リザルト画面用
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
	modal_hai_load();

	//[#modal-overlay]、または[#modal-close]をクリックしたら…
	$( "#modal-overlay,#modal-close" ).unbind().click( function(){

		//[#modal-content]と[#modal-overlay]をフェードアウトした後に…
		$( "#modal-content-rslt,#modal-overlay" ).fadeOut( "fast" , function(){

			//[#modal-overlay]を削除する
			$('#modal-overlay').remove() ;

		} ) ;

	} ) ;
}

function modal_hai_load() {
	// リザルトの牌を初期化
	var element = document.getElementById("hourakei");
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

function modal_yaku_load(yaku_list) {
	// リザルトの役を初期化
	var element = document.getElementById("modal_yaku");
	modal_reset(element);
	// JSONから取得した役を生成
	for (var j = 0; j < yaku_list.length; j++) {
		var yaku = document.createElement("p");
		yaku.innerHTML = yaku_list[j];
		element.appendChild(yaku);
	}
}

function modal_ten_load(data) {
	// リザルトの点を初期化
	var element = document.getElementById("modal_ten");
	modal_reset(element);
	// JSONから取得した点を生成
	var han = document.createElement("p");
	var ten = document.createElement("p");
	var tumo = document.getElementById("tumo").checked
	var wind = document.getElementById("jikaze").alt
	han.id = "han";
	han.innerHTML = data.han + "翻" + data.fu + "符";
	ten.id = "ten";
	if (tumo == false) {
		ten.innerHTML = data.cost.main + "点";
	}
	else if (wind == 1) {
		ten.innerHTML = "ALL " + data.cost.main + "点";
	}
	else {
		ten.innerHTML = "親" +  data.cost.main + "点 子" + data.cost.additional + "点";
	}
	element.appendChild(han);
	element.appendChild(ten);
	// manganを生成する関数を呼び出し
	modal_mangan_load(data);
}

function modal_mangan_load(data) {
	// リザルトの点を初期化
	var element = document.getElementById("modal_mangan");
	modal_reset(element);
	// manganを生成
	var mangan = document.createElement("p");
	var cost = data.cost.main + (data.cost.additional * 2)
	var wind = document.getElementById("jikaze").alt
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
			mangan.innerHTML = data.han + "翻";
		}
	}
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
			mangan.innerHTML = data.han + "翻";
		}
	}
	element.appendChild(mangan);
}

function modal_reset(element) {
	while (element.firstChild) {
		element.removeChild(element.firstChild);
	}
}

$( window ).resize( centeringModalSyncer ) ;
$( window ).resize( centeringModalSyncerRslt ) ;