// ==UserScript==
// @name         移除录直播应用视频上的水印
// @namespace    http://tampermonkey.net/
// @version      0.6
// @description  使用 MutationObserver 在水印刚出现时立即移除 (#myVideos > div.mark-content 和 #myVideos1 > div.mark-content)
// @author       lsy223622
// @match        http://newesxidian.chaoxing.com/*
// @grant        none
// @homepage     https://lsy223622.com
// @supportURL   https://github.com/lsy223622/KnowledgeWithoutBarriers/issues
// @license      GPLv3
// ==/UserScript==

(function () {
  "use strict";

  const selectors = ["#myVideos > div.mark-content", "#myVideos1 > div.mark-content"];

  function removeElements() {
    try {
      selectors.forEach((selector) => {
        const elementToRemove = document.querySelector(selector);
        if (elementToRemove) {
          elementToRemove.remove();
          console.log(`水印已被移除：${selector}`);
        }
      });
    } catch (error) {
      console.error("移除水印时发生错误：", error);
    }
  }

  function observeDOMChanges() {
    try {
      const targetNode = document.body;
      const config = { childList: true, subtree: true };

      const callback = function (mutationsList) {
        try {
          for (let mutation of mutationsList) {
            if (mutation.type === "childList") {
              removeElements();
              break;
            }
          }
        } catch (error) {
          console.error("处理 DOM 变化时发生错误：", error);
        }
      };

      const observer = new MutationObserver(callback);
      observer.observe(targetNode, config);
    } catch (error) {
      console.error("设置 MutationObserver 时发生错误：", error);
    }
  }

  function init() {
    try {
      removeElements();
      observeDOMChanges();
    } catch (error) {
      console.error("初始化脚本时发生错误：", error);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
