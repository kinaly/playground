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

			const periods = data.darkPeriods;

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

			let templateRowSetup = "";

			let knownPeriods = periods.filter(item => item.episode <= episode);

			for (var i = 0; i < knownPeriods.length; i++) {
				if (i == 0) {
					templateRowSetup = templateRowSetup + "[full-start time" + knownPeriods[i].id + "-start header" + knownPeriods[i].id + "-start] auto [header" + knownPeriods[i].id + "-end old" + knownPeriods[i].id + "-start] auto [old" + knownPeriods[i].id + "-end adult" + knownPeriods[i].id + "-start] auto [adult" + knownPeriods[i].id + "-end young" + knownPeriods[i].id + "-start] auto [young" + knownPeriods[i].id + "-end baby" + knownPeriods[i].id + "-start] auto [baby" + knownPeriods[i].id + "-end time" + knownPeriods[i].id + "-end ";
				} else if (i > 0 && i < (knownPeriods.length - 1)) {
					templateRowSetup = templateRowSetup + "time" + knownPeriods[i].id + "-start header" + knownPeriods[i].id + "-start] auto [header" + knownPeriods[i].id + "-end old" + knownPeriods[i].id + "-start] auto [old" + knownPeriods[i].id + "-end adult" + knownPeriods[i].id + "-start] auto [adult" + knownPeriods[i].id + "-end young" + knownPeriods[i].id + "-start] auto [young" + knownPeriods[i].id + "-end baby" + knownPeriods[i].id + "-start] auto [baby" + knownPeriods[i].id + "-end time" + knownPeriods[i].id + "-end ";
				} else {
					templateRowSetup = templateRowSetup + "time" + knownPeriods[i].id + "-start header" + knownPeriods[i].id + "-start] auto [header" + knownPeriods[i].id + "-end old" + knownPeriods[i].id + "-start] auto [old" + knownPeriods[i].id + "-end adult" + knownPeriods[i].id + "-start] auto [adult" + knownPeriods[i].id + "-end young" + knownPeriods[i].id + "-start] auto [young" + knownPeriods[i].id + "-end baby" + knownPeriods[i].id + "-start] auto [baby" + knownPeriods[i].id + "-end time" + knownPeriods[i].id + "-end full-end]";
				}
			}

			headStyles.innerHTML = ".map { grid-template-columns: " + templateColumnSetup + "; grid-template-rows: " + templateRowSetup + "; }";
		})
}