var set_id = "";
var naki_cnt = 0;
var naki_mode = "";
var pon_cnt = 1;
var chi_cnt = 1;
var kan_cnt = 1;
var honba_cnt = 0;
var cost_main = 0;
var cost_additional = 0;
var tehai_ar = ["tehai_01", "tehai_02", "tehai_03", "tehai_04", "tehai_05", "tehai_06", "tehai_07", "tehai_08", "tehai_09", "tehai_10", "tehai_11", "tehai_12", "tehai_13", "agarihai"];
var houra_ar = ["houra_01", "houra_02", "houra_03", "houra_04", "houra_05", "houra_06", "houra_07", "houra_08", "houra_09", "houra_10", "houra_11", "houra_12", "houra_13", "houra_a"];
var naki_ar = ["naki_01", "naki_02", "naki_03", "naki_04", "naki_05", "naki_06", "naki_07", "naki_08", "naki_09", "naki_10", "naki_11", "naki_12", "naki_13", "naki_a"];
var id1 = "";
var id2 = "";


var modal_id = "";

// モーダルウィンドウの画面調整
function centeringModalSyncer(modal_id) {
	var w = $( window ).width() ;
	var h = $( window ).height() ;

	var cw = $( modal_id ).outerWidth();
	var ch = $( modal_id ).outerHeight();

	$( modal_id ).css( {"left": ((w - cw)/2) + "px","top": ((h - ch)/2) + "px"} ) ;
}

// 牌選択画面オープン
function modal_open(select_id) {	
	//キーボード操作などにより、オーバーレイが多重起動するのを防止する
	$( this ).blur() ;	//ボタンからフォーカスを外す
	if( $( "#modal-overlay" )[0] ) return false ;		//新しくモーダルウィンドウを起動しない

	//オーバーレイを出現させる
	$( "body" ).append( '<div id="modal-overlay"></div>' ) ;
	$( "#modal-overlay" ).fadeIn( "fast" ) ;

	try {
		// 牌選択画面
		if (select_id.length > 2) {
			modal_id = "#modal-content";
			set_id = select_id;
		}
		// 鳴き画面 
		else {
			modal_id = "#modal-content-naki";
			naki_mode = select_id;
			naki_title_change(naki_mode);
			modal_hai_load("tehai_naki");
		}
	}
	// リザルト画面
	catch (error) {
		modal_id = "#modal-content-rslt";
		modal_hai_load("hourakei");
	}
	//コンテンツをセンタリングする
	centeringModalSyncer(modal_id) ;

	//コンテンツをフェードインする
	$( modal_id ).fadeIn( "fast" ) ;

	//[#modal-overlay]、または[#modal-close]をクリックしたら…
	$( "#modal-overlay,#modal-close" ).unbind().click( function(){
		
		modal_id += ",#modal_overlay";
		//[#modal-content]と[#modal-overlay]をフェードアウトした後に…
		$( modal_id ).fadeOut( "fast" , function(){

			//[#modal-overlay]を削除する
			$('#modal-overlay').remove() ;
			modal_id = "";
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

// ウィンドウサイズがリサイズされたらモーダルウィンドウの位置を調整
$( window ).resize( centeringModalSyncer(modal_id) ) ;

// 鳴き画面の文字変更
function naki_title_change(id) {
	var element1 = document.getElementById("naki_title");
	var element2 = document.getElementById("naki_des2");
	switch (id) {
		case "10":
			element1.innerHTML = "ポンした牌を選択してください";
			$( ".naki_des2" ).fadeOut(1);
			break;
		case "20":
			element1.innerHTML = "チーした牌を選択してください";
			$( ".naki_des2" ).fadeOut(1);
			break;
		case "30":
			element1.innerHTML = "明槓した牌を選択してください";
			element2.innerHTML = "暗槓している牌を選択すると明槓に変更します";
			$( ".naki_des2" ).fadeIn(1);
			break;
		case "40":
			element1.innerHTML = "暗槓した牌を選択してください";
			element2.innerHTML = "明槓している牌を選択すると暗槓に変更します";
			$( ".naki_des2" ).fadeIn(1);
			break;
	}
}

// 鳴き処理用関数
function pon(target_alt) {
	for (var j = 12; j >= 0; j--) {
		if (document.getElementById(naki_ar[j]).alt == target_alt && document.getElementById(naki_ar[j]).className == "none") {
			document.getElementById(tehai_ar[j]).className = naki_mode + pon_cnt;
			naki_cnt += 1;
			if (naki_cnt >= 3) {
				pon_cnt += 1;
				break;
			}
		}
	}
}
function mkan(target_alt) {
	for (var j = 12; j >= 0; j--) {
		if (document.getElementById(naki_ar[j]).alt == target_alt && document.getElementById(naki_ar[j]).className == "none") {
			document.getElementById(tehai_ar[j]).className = naki_mode + kan_cnt;
			naki_cnt += 1;
			if (naki_cnt >= 3) {
				kan_cnt += 1;
				break;
			}
		}
	}
}
function akan(target_alt) {
	for (var j = 12; j >= 0; j--) {
		if (document.getElementById(naki_ar[j]).alt == target_alt && document.getElementById(naki_ar[j]).className == "none") {
			document.getElementById(tehai_ar[j]).className = naki_mode + kan_cnt;
			naki_cnt += 1;
			if (naki_cnt >= 3) {
				kan_cnt += 1;
				break;
			}
		}
	}
}

// 鳴き画面の牌選択
function naki(id) {
	var element = document.getElementById(id);
	var target_alt = "";
	if (element.className == "none" && naki_mode != "20") {
		target_alt = element.alt;
		if (target_alt.slice(-1) == "5" || target_alt.slice(-1) == "r") {
			switch (naki_mode) {
				case "10":
					pon(target_alt);
					if(target_alt.slice(-1) == "5" && naki_cnt < 3) {
						target_alt = target_alt.replace("5", "r");
						pon(target_alt);
					}
					else if (naki_cnt < 3) {
						target_alt = target_alt.replace("r", "5");
						pon(target_alt);
					}
					break;
				case "30":
					mkan(target_alt);
					if(target_alt.slice(-1) == "5" && naki_cnt < 3) {
						target_alt = target_alt.replace("5", "r");
						mkan(target_alt);
					}
					else if (naki_cnt < 3) {
						target_alt = target_alt.replace("r", "5");
						mkan(target_alt);
					}
					break;
				case "40":
					akan(target_alt);
					if(target_alt.slice(-1) == "5" && naki_cnt < 3) {
						target_alt = target_alt.replace("5", "r");
						akan(target_alt);
					}
					else if (naki_cnt < 3) {
						target_alt = target_alt.replace("r", "5");
						akan(target_alt);
					}
					break;
			}
		}
		else {
			switch (naki_mode) {
				case "10":
					pon(target_alt);
					break;
				case "30":
					mkan(target_alt);
					break;
				case "40":
					akan(target_alt);
					break;
			}
		}
		$( "#modal-content-naki,#modal-overlay" ).fadeOut( "fast" , function(){
			$('#modal-overlay').remove() ;
		} ) ;
		naki_reset();
		hai_load();
	}
	else if (element.className == "none" && naki_mode == "20") {
		element.className = naki_mode + chi_cnt;
		naki_cnt += 1;
		if (naki_cnt == 1) {
			id1 = id;
		}
		if (naki_cnt == 2) {
			id2 = id;
		}
		if (naki_cnt < 3) {
			var target_num = 0
			var target_r = element.alt.slice(0,-1) + "r";
			if (element.alt.slice(-1) == "r") {
				target_num = 6
			}
			else {
				target_num = Number(element.alt.slice(-1)) + 1;
			} 
			target_alt = element.alt.slice(0,-1) + target_num;
			for (var j = 0; j < 13; j++) {
				// 鳴ける牌が鳴かれていなければ選択できるようにする
				if ((document.getElementById(naki_ar[j]).alt == target_alt || (target_num == 5 && document.getElementById(naki_ar[j]).alt == target_r)) && (document.getElementById(naki_ar[j]).className == "nakenai" || document.getElementById(naki_ar[j]).className == "none")) {
					document.getElementById(naki_ar[j]).className = "none";
					document.getElementById(naki_ar[j]).onclick = new Function("naki(this.id);");
				} 
				// 鳴けない牌が選択できるようになってる時選択できなくさせる
				else if (document.getElementById(naki_ar[j]).alt != target_alt && document.getElementById(naki_ar[j]).className == "none") {
					document.getElementById(naki_ar[j]).onclick = "";
					document.getElementById(naki_ar[j]).className = "nakenai";
				}
				else if (naki_ar[j] == id1 || naki_ar[j] == id2) {
					document.getElementById(naki_ar[j]).onclick = "";
				}
				// 鳴いた牌を選択できなくさせる
				else if (document.getElementById(naki_ar[j]).className != "none" && document.getElementById(naki_ar[j]).className != "nakenai") {
					document.getElementById(naki_ar[j]).onclick = "";
					var test = document.getElementById(naki_ar[j]);
					console.log(test);
					if (naki_cnt == 1) {
						document.getElementById(naki_ar[j]).className = document.getElementById(naki_ar[j]).className + "a";
						if(document.getElementById(naki_ar[j] + "z")) {
							document.getElementById(naki_ar[j] + "z").onclick = "";
							document.getElementById(naki_ar[j] + "z").className = document.getElementById(naki_ar[j] + "z").className + "a";
						}
					}
				}
			}
		}
		else {
			for (var j = 0; j < 13; j++) {
				if (document.getElementById(naki_ar[j]).className == naki_mode + chi_cnt) {
					document.getElementById(tehai_ar[j]).className = naki_mode + chi_cnt;
				}
			}
			chi_cnt += 1;
			$( "#modal-content-naki,#modal-overlay" ).fadeOut( "fast" , function(){
				$('#modal-overlay').remove() ;
			} ) ;
			naki_reset();
			hai_load();
		}
	}
	else if (element.className != "none") {
		var clsnmsrc = element.className
		var mode = clsnmsrc.slice(0,-1);
		var srcnum = clsnmsrc.slice(-1);
		for (var j = 0; j < 13; j++) {
			var clsnm = document.getElementById(naki_ar[j]).className
			// 明槓ボタンで起動 かつ 選択された牌が暗槓
			if (naki_mode == "30" && mode == "40") {
				// 選択された暗槓のみを明槓に変更
				if (mode == clsnm.slice(0,-1) && srcnum == clsnm.slice(-1)) {
					document.getElementById(tehai_ar[j]).className = naki_mode + srcnum;
				}
			// 暗槓ボタンで起動 かつ 選択された牌が明槓
			} else if (naki_mode == "40" && mode == "30") {
				// 選択された明槓のみを暗槓に変更
				if (mode == clsnm.slice(0,-1) && srcnum == clsnm.slice(-1)) {
					document.getElementById(tehai_ar[j]).className = naki_mode + srcnum;
				}
			} else {
				// 選択された牌と同じ鳴きモード
				if (mode == clsnm.slice(0,-1)) {
					// 選択された牌と同じ鳴き番号
					if(srcnum == clsnm.slice(-1)) {
						document.getElementById(tehai_ar[j]).className = "none";
					}
					// 選択された牌より大きい鳴き番号 
					else if (srcnum < clsnm.slice(-1)) {
						document.getElementById(tehai_ar[j]).className = mode + (clsnm.slice(-1) - 1);
					}
				} else if (mode == "30") {
					if("40" == clsnm.slice(0,-1) && srcnum < clsnm.slice(-1)) {
						document.getElementById(tehai_ar[j]).className = "40" + (clsnm.slice(-1) - 1);
					}
				} else if (mode == "40") {
					if("30" == clsnm.slice(0,-1) && srcnum < clsnm.slice(-1)) {
						document.getElementById(tehai_ar[j]).className = "30" + (clsnm.slice(-1) - 1);
					}
				}
			}
		}
		switch (mode) {
			case "10": 
				pon_cnt -= 1;
				break;
			case "20": 
				chi_cnt -= 1;
				break;
			case "30": 
				if (naki_mode != "40")kan_cnt -= 1;
				break;
			case "40": 
				if (naki_mode != "30")kan_cnt -= 1;
				break;
		}
		$( "#modal-content-naki,#modal-overlay" ).fadeOut( "fast" , function(){
			//[#modal-overlay]を削除する
			$('#modal-overlay').remove() ;
		} ) ;
		naki_reset();
		hai_load();
	}
}
function naki_reset() {
	naki_cnt = 0;
	naki_mode = "";
}
//鳴き対応のソート
function hai_load() {
	var cnt = 0;
	var n_cnt = 0;
	var set_hai = [];
	var naki_hai = [];
	// 現在の牌を配列に保存
	for (var j = 0; j < 13; j++) {
		var tmp_a = document.getElementById(tehai_ar[j]).alt;
		var tmp_c = document.getElementById(tehai_ar[j]).className;
		if (tmp_c == "none") {
			set_hai[cnt] = {hai: "", cls: ""};
			set_hai[cnt].hai = tmp_a;
			set_hai[cnt].cls = tmp_c;
			cnt += 1;
		} else {
			naki_hai[n_cnt] = {hai: "", cls: ""};
			naki_hai[n_cnt].hai = tmp_a;
			naki_hai[n_cnt].cls = tmp_c.slice(0,-1);
			naki_hai[n_cnt].cls += tmp_c.slice(-1);
			n_cnt += 1;
		}
	}
	// ソート
	naki_hai.sort(function(a, b) {
		if (a.cls < b.cls) {
		  return -1;
		}
		if (a.cls > b.cls) {
		  return 1;
		}
		return 0;
	});
	// 鳴き牌を配列に追加
	for (var j = 0; j < n_cnt; j++) {
		set_hai[cnt] = {hai: "", cls: ""};
		set_hai[cnt].hai = naki_hai[j].hai;
		set_hai[cnt].cls = naki_hai[j].cls;
		cnt += 1;
	}
	var agari = document.getElementById("agarihai");
	set_hai[13] = {hai: "", cls: ""};
	set_hai[13].hai = agari.alt
	set_hai[13].cls = agari.className;
	// 現在の牌を削除して再描画
	var element = document.getElementById("tehai");
	modal_reset(element);
	var kan_num = 0
	for (var j = 0; j < 14; j++) {
		var img = document.createElement('img');
		if (set_hai[j].hai == "error") {
			var type = "h";
			var num = "error";
		} else {
			var type = set_hai[j].hai.slice(0, 1);
			var num = set_hai[j].hai.slice(1);
		}
		img.id = tehai_ar[j];
		img.src = "hai/" + type + "/" + num + ".png";
		img.alt = set_hai[j].hai
		img.className = set_hai[j].cls
		img.onclick = new Function("modal_open(this.id);");
		element.appendChild(img);
		if (set_hai[j].cls.slice(0,2) == "30" || set_hai[j].cls.slice(0,2) == "40") {
			kan_num += 1
			if (kan_num == 3) {
				var img2 = document.createElement('img');
				img2.id = tehai_ar[j];
				if(num == "r") {
					num = 5;
				}
				img2.src = "hai/" + type + "/" + num + ".png";
				img2.alt = set_hai[j].hai
				img2.className = set_hai[j].cls
				img2.onclick = new Function("modal_open(this.id);");
				element.appendChild(img2);
				kan_num = 0;
			}
		}
	}
	$(".tehai > *").css({
		"max-width": "calc( ( 100% - 10px ) /" + String(14 + (kan_cnt-1)) + ")"
	});
	console.log(set_hai);
}

// リザルト&鳴き画面の牌生成 (挿入先のidを取得して生成)
function modal_hai_load(id) {
	// リザルト&鳴きの牌を初期化
	var element = document.getElementById(id);
	modal_reset(element);	
	// 設定画面から牌を取得して生成
	var kan_num = 0;
	for (var j = 0; j < 14; j++) {
		var tmp = document.getElementById(tehai_ar[j]).alt;
		var tmp_c = document.getElementById(tehai_ar[j]).className;
		if (tmp == "error") {
			var type = "h"
			var num = "error"
		} else {
			var type = tmp.slice(0, 1);
			var num = tmp.slice(1);
		}
		var img = document.createElement('img');
		img.id = houra_ar[j];
		img.src = "hai/" + type + "/" + num + ".png";
		img.alt = type + num;
		img.className = tmp_c;
		if (id == "tehai_naki") {
			img.id = naki_ar[j];
			var cnt = 0;
			switch (naki_mode) {
				case "10":
					for (var k = 0; k < 13; k++) {
						var t_alt = document.getElementById(tehai_ar[k]).alt;
						var t_clsnm = document.getElementById(tehai_ar[k]).className;
						if (img.alt == t_alt && t_clsnm == "none") {
							cnt += 1;
						} else if (num == "5") {
							i_alt = type + "r";
							if (i_alt == t_alt && t_clsnm == "none") {
								cnt += 1;
							}
						} else if (num == "r") {
							i_alt = type + "5";
							if (i_alt == t_alt && t_clsnm == "none") {
								cnt += 1;
							}
						}
					}
					if (cnt >= 3){
						img.onclick = new Function("naki(this.id);");
					}
					else if (img.className == "none") {
						img.className = "nakenai";
					}
					else {
						img.onclick = new Function("naki(this.id);");
					}
					break;
				case "20":
					var flg = false;
					var n_num = 0;
					var nn_num = 0;
					var n_alt = 0;
					var nn_alt = 0;
					var r_alt = type + "r"
					if (img.className == "none") {
						if (num == "r") {
							n_alt = type + "6";
							nn_alt = type + "7";
						}
						else if (Number(num) < 8) {
							n_num = Number(num) + 1;
							nn_num = Number(num) + 2;
							n_alt = type + String(n_num);
							nn_alt = type + String(nn_num);
						} else {
							img.className = "nakenai";
						}
						for (var k = 0; k < 13; k++) {
							var t_alt = document.getElementById(tehai_ar[k]).alt;
							var t_clsnm = document.getElementById(tehai_ar[k]).className;
							if ((n_alt == t_alt && t_clsnm == "none") || (n_num == 5 && r_alt == t_alt && t_clsnm == "none")) {
								for (var l = 0; l < 13; l++) {
									var tt_alt = document.getElementById(tehai_ar[l]).alt;
									var tt_clsnm = document.getElementById(tehai_ar[l]).className;
									if ((nn_alt == tt_alt && tt_clsnm == "none") || (nn_num == 5 && r_alt == tt_alt && tt_clsnm == "none")) {
										flg = true;
										break;
									}
								}
							}
							if (flg == true) {
								img.className = "none";
								img.onclick = new Function("naki(this.id);");
								flg = false;
								break;
							} else {
								img.className = "nakenai";
							}
						}
					} else {
						img.onclick = new Function("naki(this.id);");
					}
					break;
				case "30":
					for (var k = 0; k < 13; k++) {
						var t_alt = document.getElementById(tehai_ar[k]).alt;
						var t_clsnm = document.getElementById(tehai_ar[k]).className;
						if (img.alt == t_alt && t_clsnm == "none") {
							cnt += 1;
						} else if (num == "5") {
							i_alt = type + "r";
							if (i_alt == t_alt && t_clsnm == "none") {
								cnt += 1;
							}
						} else if (num == "r") {
							i_alt = type + "5";
							if (i_alt == t_alt && t_clsnm == "none") {
								cnt += 1;
							}
						}
					}
					if (cnt >= 3){
						img.onclick = new Function("naki(this.id);");
					}
					else if (img.className == "none") {
						img.className = "nakenai";
					}
					else {
						img.onclick = new Function("naki(this.id);");
					}
					break;
				case "40":
					for (var k = 0; k < 13; k++) {
						var t_alt = document.getElementById(tehai_ar[k]).alt;
						var t_clsnm = document.getElementById(tehai_ar[k]).className;
						if (img.alt == t_alt && t_clsnm == "none") {
							cnt += 1;
						} else if (num == "5") {
							i_alt = type + "r";
							if (i_alt == t_alt && t_clsnm == "none") {
								cnt += 1;
							}
						} else if (num == "r") {
							i_alt = type + "5";
							if (i_alt == t_alt && t_clsnm == "none") {
								cnt += 1;
							}
						}
					}
					if (cnt >= 3){
						img.onclick = new Function("naki(this.id);");
					}
					else if (img.className == "none") {
						img.className = "nakenai";
					}
					else {
						img.onclick = new Function("naki(this.id);");
					}
					break;
			}
			if (j == 13) {
				img.className = "agari";
				img.onclick = "";
			}
		}
		element.appendChild(img);
		// 明槓暗槓の時は３枚目を複製する
		if (tmp_c.slice(0,2) == "30" || tmp_c.slice(0,2) == "40") {
			kan_num += 1
			if (kan_num == 3) {
				var img2 = document.createElement('img');
				img2.id = houra_ar[j];
				if(num == "r") {
					num = 5;
				}
				img2.src = "hai/" + type + "/" + num + ".png";
				img2.alt = type + num;
				img2.className = tmp_c
				if (id == "tehai_naki") {
					img2.id = naki_ar[j] + "z";
					img2.onclick = new Function("naki(this.id);");
				}
				element.appendChild(img2);
				kan_num = 0;
			}
		}
	}
	$(".tehai_naki > *").css({
		"max-width": "calc( ( 100% - 10px ) /" + String(14 + (kan_cnt-1)) + ")"
	});
	$(".hourakei > *").css({
		"max-width": "calc( ( 100% - 10px ) /" + String(14 + (kan_cnt-1)) + ")"
	});
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
function modal_ten_load(cost_han, cost_fu, cost_m, cost_a) {
	honba_cnt = 0;
	cost_main = cost_m;
	cost_additional = cost_a;
	var ten = document.getElementById("ten");
	var han = document.getElementById("han");
	// JSONから取得した点を生成
	var tumo = document.getElementById("tumo").checked;
	var wind = document.getElementById("jikaze").alt;
	han.innerHTML = cost_han + "翻" + cost_fu + "符";
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

// 本場数変更
function honba_minus() {
	if (honba_cnt > 0) {
		honba_cnt -= 1
		var honba = document.getElementById("honba");
		var ten = document.getElementById("ten");
		var tumo = document.getElementById("tumo").checked;
		var wind = document.getElementById("jikaze").alt;
		honba.innerHTML = honba_cnt + "本場";
		// ロン
		if (tumo == false) {
			ten.innerHTML = (cost_main + honba_cnt * 300) + "点";
		}
		// 親ツモ
		else if (wind == 1) {
			ten.innerHTML = "ALL " + (cost_main + honba_cnt * 100) + "点";
		}
		// 子ツモ
		else {
			ten.innerHTML = "親" +  (cost_main + honba_cnt * 100) + "点 子" + (cost_additional + honba_cnt * 100) + "点";
		}
	}
}
function honba_plus() {
	if (honba_cnt < 9) {
		honba_cnt += 1
		var honba = document.getElementById("honba");
		var ten = document.getElementById("ten");
		var tumo = document.getElementById("tumo").checked;
		var wind = document.getElementById("jikaze").alt;
		honba.innerHTML = honba_cnt + "本場";
		// ロン
		if (tumo == false) {
			ten.innerHTML = (cost_main + honba_cnt * 300) + "点";
		}
		// 親ツモ
		else if (wind == 1) {
			ten.innerHTML = "ALL " + (cost_main + honba_cnt * 100) + "点";
		}
		// 子ツモ
		else {
			ten.innerHTML = "親" +  (cost_main + honba_cnt * 100) + "点 子" + (cost_additional + honba_cnt * 100) + "点";
		}
	}
}

// リザルト画面のリセット用
function modal_reset(element) {
	while (element.firstChild) {
		element.removeChild(element.firstChild);
	}
}