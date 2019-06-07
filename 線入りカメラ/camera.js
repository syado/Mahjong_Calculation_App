/*
カメラ周りのコード記述
カメラの解像度設定
カメラで撮影した画像の送信先の記述

*/
let width = "720"   // We will scale the photo width to this
let height = "390"     // This will be computed based on the input stream

let streaming = false

let video = null
let canvas = null
let photo = null
let startbutton = null
let constrains = { video: { facingMode: 'environment' }, audio: false }
let myStream = null
/**
 * ユーザーのデバイスによるカメラ表示を開始し、
 * 各ボタンの挙動を設定する
 *
 */
//↓線引くやつゾ
//読み込み時に実行する
onload = function () {
    /* 線を引く */
    var line_canvas = document.getElementById("videocanvas");
    var line_ctx = line_canvas.getContext("2d");
    line_ctx.beginPath();
    // 開始位置に移動する
    line_ctx.moveTo(50, 50);
    // 線を引く
    line_ctx.lineTo(50, 500);
    line_ctx.closePath();
    line_ctx.stroke();
}

function startup() {
    video = document.getElementById('video')
    canvas = document.getElementById('canvas')
    photo = document.getElementById('photo')
    startbutton = document.getElementById('startbutton')

    videoStart()

    video.addEventListener('canplay', function (ev) {
        if (!streaming) {
            height = video.videoHeight / (video.videoWidth / width)

            video.setAttribute('width', width)
            video.setAttribute('height', height)
            streaming = true
        }
    }, false)

    // 「画像撮影」ボタンをとる挙動を定義
    startbutton.addEventListener('click', function (ev) {
        takepicture()
        ev.preventDefault()
        //カメラの動作を停止？
        streaming = true

        if (myStream) {
            for (track of myStream.getTracks()) track.stop();
            myStream = null;
        };
        video.pause();
        if ("srcObject" in video) video.srcObject = null;
        else video.src = null;
    }, false);
}

/**
 * カメラ操作を開始する
 */
function videoStart() {
    streaming = false
    navigator.mediaDevices.getUserMedia(constrains)
        .then(function (stream) {
            video.srcObject = stream
            video.play()
            myStream = stream;
            //線描画読み出し
            linetrace()
        })
        .catch(function (err) {
            console.log("An error occured! " + err)
        })
}

/**
 * カメラに表示されている現在の状況を撮影する
 */
function takepicture() {
    let context = canvas.getContext('2d')
    if (width && height) {
        canvas.width = width
        canvas.height = height
        context.drawImage(video, 0, 0, width, height)
        send()
    } else {
        clearphoto()
    }
}
function videoRestartbutton() {
    navigator.mediaDevices.getUserMedia(constrains)
        .then(function (stream) {
            if ("srcObject" in video) video.srcObject = stream;
            else video.src = window.URL.createObjectURL(stream);
            video.onloadedmetadata = function (e) {
                video.play();
                myStream = stream;
            };
        })
        .catch(function (err) { console.log(err.name + ": " + err.message); });

};
//下記はカメラデータの送信部分
/*
function send() {
    data = canvas.toDataURL('image/png').replace(/^.*,/, '')
    $.ajax('/read.php', {
        method: 'POST',
        data: { image: data }
    }).then(res => {
        $('#readStr').val(res)
    })
}
*/

startup()