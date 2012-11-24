if(window.foxCavesInjected) {
	chrome.extension.onMessage.removeListener(window.foxCavesInjected);
}
window.foxCavesProgressBar = null;
window.foxCavesProgressContainer = null;
function removeIfExists() {
	try {
		if(window.foxCavesProgressContainer)
			window.foxCavesProgressContainer.parentNode.removeChild(window.foxCavesProgressContainer);
	} catch(e) { }
}
window.foxCavesInjected = function(msg, source, sendMessage) {
	if(msg.progress) {
		if(msg.progress > 100) {
			removeIfExists();
		} else if(msg.progress < 0) {
			removeIfExists();

			var mainDiv = document.createElement("div");
			mainDiv.style.width = "200px";
			mainDiv.style.height = "80px";
			mainDiv.style.top = "50%";
			mainDiv.style.left = "50%";
			mainDiv.style.position = "fixed";
			mainDiv.style.marginLeft = "-100px";
			mainDiv.style.marginTop = "-40px";
			mainDiv.style.backgroundColor = "white";
			mainDiv.style.border = "1px solid black";
			mainDiv.style.display = "table";
			
			var subDiv = document.createElement("div");
			subDiv.style.display = "table-cell";
			subDiv.style.textAlign = "center";
			subDiv.style.verticalAlign = "middle";
			mainDiv.appendChild(subDiv);
			
			var text = document.createTextNode("Uploading to foxCaves...");
			subDiv.appendChild(text);
			
			var br = document.createElement("br");
			subDiv.appendChild(br);
			
			var progress = document.createElement("progress");
			progress.max = 100;
			progress.value = 0;
			subDiv.appendChild(progress);
			
			window.foxCavesProgressContainer = mainDiv;
			window.foxCavesProgressBar = progress;
			
			document.getElementsByTagName("body")[0].appendChild(mainDiv);
		} else {
			window.foxCavesProgressBar.value = msg.progress;
		}
		
		sendMessage("OK");
	}
};
chrome.extension.onMessage.addListener(window.foxCavesInjected);