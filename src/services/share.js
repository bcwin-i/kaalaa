async function shareCanvasAsImage(url, index) {
  const blob = await (await fetch(url)).blob();
  let bac = false;

  // Create file form the blob
  const image = new File([blob], "canvas.png", { type: blob.type });

  // Check if the device is able to share these files then open share dialog
  if (navigator.canShare && navigator.canShare({ files: [image] })) {
    try {
      await navigator
        .share({
          url:
            window.location.href + "?id=" + localStorage.getItem("Kaalaa") ||
            "" + "&itemId=" + url + "-" + index,
          files: [image], // Array of files to share
          title: "shared by kaalaa.io", // Share dialog title
          text: "Provided by kaalaa.io",
        })
        .then((e) => (bac = true));
    } catch (error) {
      bac = false;
      console.log("Sharing failed!", error);
    }
    return bac;
  } else {
    console.log("This device does not support sharing files.");
    return false;
  }
}

function convertImageToCanvas(image) {
  var canvas = document.createElement("canvas");
  canvas.width = image.width;
  canvas.height = image.height;
  canvas.getContext("2d").drawImage(image, 0, 0);

  return canvas;
}

export default shareCanvasAsImage;
