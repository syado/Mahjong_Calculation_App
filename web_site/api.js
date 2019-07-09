// Web上カメラの送信
function camera_send() {
    $( ".loading" ).fadeIn( "fast" ) ;
    // 送信先URL
    var host_url = "https://mahjong.syado.net/img_api/base64";
    // canvas elementを取得
    var canvas = document.getElementById('canvas');
    // base64データを取得（エンコード）
    var img_base64 = canvas.toDataURL('image/png');
    var fd = new FormData();
    fd.append('img', img_base64);

    $.ajax({
        url: host_url,
        type: 'POST',
        data: fd,
        contentType: false,
        processData: false,
        success: function(data) {
            //非同期で通信成功時に読み出される [200 OK 時]
            console.log('Success', data);
            var cnt = 0;
            seturl = "web_setting.html?";
            // 手牌
            for (var i = 0; i < data.tehai.length; i++) {
                seturl += String(cnt) + "=" + data.tehai[i].name + "&";
                cnt += 1;
            }
            // 鳴き
            for (var i = 0; i < data.naki.length; i++) {
                var mode = data.naki[i].name
                for (var j = 0; j < 3; j++) {
                    seturl += String(cnt) + "=" + data.naki[i].hai[j].name + mode.slice(0,1) + String(i + 1) + "&";
                    cnt += 1;
                }
            }
            cnt = 13
            // アガリ牌
            if (data.agari) {
                seturl += String(cnt) + "=" + data.agari[0].name + "&";
            }
            // ドラ
            cnt = 20
            for (var i = 0; i < data.dora.length; i++) {
                seturl += String(cnt) + "=" + data.dora[i].name + "&";
                cnt += 1;
            }
            console.log(seturl);
            window.location.href = seturl.slice(0, -1);
        },
        error: function(errorThrown) {
            //非同期で通信失敗時に読み出される
            console.log('Error : ' + errorThrown);
        }
    });
}

// ファイル選択の送信
function img_form_send() {
    $( ".loading" ).fadeIn( "fast" ) ;
    $.ajax({
        //画像処理サーバーに返す場合
        url: $("#img_form").attr('action'),
        type: $("#img_form").attr('method'),
        data: new FormData($('#img_form').get(0)),
        contentType: false,
        processData: false,
        complete: function(){
            loading_off();
        },
        success: function (data) {
            //非同期で通信成功時に読み出される [200 OK 時]
            console.log('Success', data);
            var cnt = 0;
            seturl = "web_setting.html?";
            // 手牌
            for (var i = 0; i < data.tehai.length; i++) {
                seturl += String(cnt) + "=" + data.tehai[i].name + "&";
                cnt += 1;
            }
            // 鳴き
            for (var i = 0; i < data.naki.length; i++) {
                var mode = data.naki[i].name
                for (var j = 0; j < 3; j++) {
                    seturl += String(cnt) + "=" + data.naki[i].hai[j].name + mode.slice(0,1) + String(i + 1) + "&";
                    cnt += 1;
                }
            }
            // アガリ牌
            if (data.agari) {
                seturl += String(cnt) + "=" + data.agari[0].name + "&";
            }
            // ドラ
            cnt = 20
            for (var i = 0; i < data.dora.length; i++) {
                seturl += String(cnt) + "=" + data.dora[i].name + "&";
                cnt += 1;
            }
            console.log(seturl);
            window.location.href = seturl.slice(0, -1);
        },
        error: function (errorThrown) {
            //非同期で通信失敗時に読み出される
            console.log('Error : ' + errorThrown);
        }
    });
}