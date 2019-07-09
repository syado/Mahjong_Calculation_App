// canvasのサイズ設定
let width = "640"
let height = "480"

// カメラ実行中かどうかのフラグ？
let streaming = false

let video = null
let canvas = null

// カメラの設定
let constrains = { 
    video: {
        // カメラの解像度 低めに設定中要件以上のカメラを搭載してない場合はエラー
        width: { min: 640},
        height: { min: 480},
        // フロントカメラを指定
        facingMode: 'environment'
    }, 
    audio: false 
}
let myStream = null;

// カメラのスタートアップ
function startup() {
    video = document.getElementById('video')
    canvas = document.getElementById('canvas')

    // カメラ起動
    videoStart()

    // カメラの準備ができた時
    video.addEventListener('canplay', function (ev) {
        if (!streaming) {
            streaming = true
        }
    }, false)

    // 撮影ボタン(カメラ画面)がタップされた時
    grid_video.addEventListener('click', function (ev) {
        // スクリーンショット
        takepicture()
        ev.preventDefault()
        streaming = true    
        
        if(myStream){
            for(track of myStream.getTracks()) track.stop();
            myStream = null;
          };
          video.pause();
          if("srcObject" in video) video.srcObject = null;
          else video.src = null;
    }, false);
    // canvasの表示領域を初期化する
    clearphoto()
}

// カメラ起動
function videoStart() {
    streaming = false
    navigator.mediaDevices.getUserMedia(constrains)
        .then(function (stream) {
            video.srcObject = stream
            video.play()
            myStream = stream;
        })
        .catch(function (err) {
            console.log("An error occured! " + err)
        })
}

// canvasの表示領域を初期化する
function clearphoto() {
    let context = canvas.getContext('2d')
    context.fillStyle = "#AAA"
    context.fillRect(0, 0, canvas.width, canvas.height)
}

// スクリーンショット
function takepicture() {
    let context = canvas.getContext('2d')
    if (width && height) {
        canvas.width = width
        canvas.height = height
        context.drawImage(video, 0, 0, width, height)
    } else {
        clearphoto()
    }
}

// カメラを再起動 
function videoRestartbutton(){
    navigator.mediaDevices.getUserMedia(constrains)
    .then(function(stream){
      if("srcObject" in video) video.srcObject = stream;
      else video.src = window.URL.createObjectURL(stream);
      video.onloadedmetadata = function(e){
        video.play();
        myStream = stream;
      };
    })
    .catch(function(err){ console.log(err.name + ": " + err.message); });
};