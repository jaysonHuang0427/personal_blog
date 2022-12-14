export default function getUserMedia(constraints) {
  return new Promise((resolve, reject) => {
    // 老的浏览器可能根本没有实现 mediaDevices，所以我们可以先设置一个空的对象
    if (navigator.mediaDevices === undefined) {
      navigator.mediaDevices = {};
    }

    // 一些浏览器部分支持 mediaDevices。我们不能直接给对象设置 getUserMedia
    // 因为这样可能会覆盖已有的属性。这里我们只会在没有 getUserMedia 属性的时候添加它。
    if (navigator.mediaDevices.getUserMedia === undefined) {
      navigator.mediaDevices.getUserMedia = function (constraints) {
        // 首先，如果有 getUserMedia 的话，就获得它
        const getUserMedia =
          navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

        // 一些浏览器根本没实现它 - 那么就返回一个 error 到 promise 的 reject 来保持一个统一的接口
        if (!getUserMedia) {
          return reject(
            new Error("getUserMedia is not implemented in this browser")
          );
        }

        // 否则，为老的 navigator.getUserMedia 方法包裹一个 Promise
        getUserMedia.call(navigator, constraints, resolve, reject);
      };
    } else {
      const chunks = [];
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then((stream) => {
          const options = {
            audioBitsPerSecond: 128000,
            videoBitsPerSecond: 2500000,
            mimeType: "video/webm",
          };
          const mediaRecorder = new MediaRecorder(stream, options);
          mediaRecorder.addEventListener("start", () => {
            console.log("recorder started");
          });
          mediaRecorder.addEventListener("dataavailable", (e) => {
            chunks.push(e.data);
          });
          mediaRecorder.addEventListener("stop", () => {
            console.log("recorder stop", chunks);
            const video = document.querySelector("video");
            const blob = new Blob(chunks, { type: "video/mp4" });
            const videoUrl = window.URL.createObjectURL(blob);
            video.src = videoUrl;
            // // 旧的浏览器可能没有 srcObject
            // if ("srcObject" in video) {
            //   video.srcObject = stream;
            // } else {
            //   // 防止在新的浏览器里使用它，应为它已经不再支持了
            //   video.src = window.URL.createObjectURL(stream);
            // }
            // video.onloadedmetadata = function (e) {
            //   video.play();
            // };
          });
          resolve(mediaRecorder);
        })
        .catch((err) => {
          reject(err);
        });
    }
  });
}
