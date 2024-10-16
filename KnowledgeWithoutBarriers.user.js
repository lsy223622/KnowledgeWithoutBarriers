// ==UserScript==
// @name         移除录直播应用视频上的水印
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  移除录直播应用视频上的水印 (#myVideos > div.mark-content 和 #myVideos1 > div.mark-content)
// @match        http://newesxidian.chaoxing.com/*
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  function removeElements() {
    const selectors = ["#myVideos > div.mark-content", "#myVideos1 > div.mark-content"];

    selectors.forEach((selector) => {
      const elementToRemove = document.querySelector(selector);
      if (elementToRemove) {
        elementToRemove.remove();
        console.log(`水印已被移除：${selector}`);
      } else {
        console.log(`未找到要移除的水印：${selector}`);
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", removeElements);
  } else {
    removeElements();
  }

  setInterval(removeElements, 1000);
})();
