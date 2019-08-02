const jsonData = '../data/dark.json';

const map = document.querySelector(".map");

const head = document.head;

const headStyles = head.querySelector("style");





const dummy01 = document.querySelector(".dummy01");

gridSetup(dummy01);





function gridSetup(element, targetEpisode) {
	fetch(jsonData)
		.then(response => response.json())
		.then(function(data) {

			const charactersReferenceList = data.darkCharacters;

			const charactersOrderList = data.charactersOrder;

			// Grab latest episode if targetEpisode is unspecified
			let episode = targetEpisode ? targetEpisode : charactersOrderList[charactersOrderList.length - 1].episode;

			let knownCharacters = charactersOrderList.filter(item => item.episode == episode)[0].knownCharacters;

			let templateColumnSetup = "";
			const cellWidth = "12em";

			for (var i = 0; i < knownCharacters.length; i++) {
				if (i == 0) {
					templateColumnSetup = templateColumnSetup + "[full-start " + knownCharacters[i].toLowerCase() + "-start] " + cellWidth;
				} else if (i > 0 && i < (knownCharacters.length - 1)) {
					templateColumnSetup = templateColumnSetup + " [ " + knownCharacters[i-1].toLowerCase() + "-end " + knownCharacters[i].toLowerCase() + "-start] " + cellWidth;
				} else {
					templateColumnSetup = templateColumnSetup + " [" + knownCharacters[i-1].toLowerCase() + "-end " + knownCharacters[i].toLowerCase() + "-start] " + cellWidth + " [" + knownCharacters[i].toLowerCase() + "-end full-end]";
				}
			}

			headStyles.innerHTML = ".map { grid-template-columns: " + templateColumnSetup + " }";
		})
}