const t={body:document.body,startButton:document.querySelector("[data-start]"),stopButton:document.querySelector("[data-stop]")};t.stopButton.setAttribute("disabled",!0);t.startButton.addEventListener("click",(()=>{t.startButton.setAttribute("disabled",!0),t.stopButton.removeAttribute("disabled"),intervalId=setInterval((()=>{t.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`}),1e3)})),t.stopButton.addEventListener("click",(()=>{t.startButton.removeAttribute("disabled"),t.stopButton.setAttribute("disabled",!0),clearInterval(intervalId)}));
//# sourceMappingURL=01-color-switcher.32288c03.js.map
