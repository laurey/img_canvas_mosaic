const input = document.querySelector("#range");
const rangeWrap = document.querySelector(".rangeWrap");
let range = +input.defaultValue || 0;

const cvs = document.querySelector("#canvas");
const ctx = cvs.getContext("2d");

const cvsTarget = document.querySelector("#target");
const pxCtx = cvsTarget.getContext("2d");

function drawImg(img, value) {
  const fw = (img.width / value) | 0;
  const fh = (img.height / value) | 0;

  pxCtx.webkitImageSmoothingEnabled = false;
  pxCtx.mozImageSmoothingEnabled = false;
  pxCtx.msImageSmoothingEnabled = false;
  pxCtx.imageSmoothingEnabled = false;

  pxCtx.drawImage(img, 0, 0, fw, fh);
  pxCtx.drawImage(cvsTarget, 0, 0, fw, fh, 0, 0, img.width, img.height);
}

function setRange(input, val = 0) {
  input.value = +val;
  input.dispatchEvent(new Event("input"));
}

const img = new Image();
img.src = "./f488.jpg";
img.onload = function () {
  ctx.drawImage(this, 0, 0);
  drawImg(this, range);
};

input.addEventListener("input", function (e) {
  range = +this.value;
  rangeWrap.textContent = range.toFixed(1);
  drawImg(img, range);
});

setRange(input, range);
