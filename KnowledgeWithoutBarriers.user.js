// ==UserScript==
// @name         移除录直播应用视频上的水印
// @namespace    http://tampermonkey.net/
// @version      0.4
// @description  使用 MutationObserver 在水印刚出现时立即移除 (#myVideos > div.mark-content 和 #myVideos1 > div.mark-content)
// @match        http://newesxidian.chaoxing.com/*
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  const selectors = ["#myVideos > div.mark-content", "#myVideos1 > div.mark-content"];

  function removeElements() {
    selectors.forEach((selector) => {
      const elementToRemove = document.querySelector(selector);
      if (elementToRemove) {
        elementToRemove.remove();
        console.log(`水印已被移除：${selector}`);
      }
    });
  }

  function observeDOMChanges() {
    const targetNode = document.body;
    const config = { childList: true, subtree: true };

    const callback = function (mutationsList) {
      for (let mutation of mutationsList) {
        if (mutation.type === "childList") {
          removeElements();
          break;
        }
      }
    };

    const observer = new MutationObserver(callback);
    observer.observe(targetNode, config);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      removeElements();
      observeDOMChanges();
    });
  } else {
    removeElements();
    observeDOMChanges();
  }
})();
