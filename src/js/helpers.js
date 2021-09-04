function addStylesheet(styles) {
	// Сначала необходимо создать новую таблицу стилей 
	var styleElt, styleSheet;
	
	if (document.createStyleSheet) { //Если определен IE API, использовать его
		styleSheet = document.createStyleSheet();
	}
	else {
		var head = document.getElementsByTagName("head")[0];
		styleElt = document.createElement("style");		// Новый элемент <style>
		head.appendChild(styleElt);						// Вставить в <head>
		
		// Теперь новая таблица находится в конце массива
		styleSheet = document.styleSheets[document.styleSheets.length-1];
	}
	
	// Вставить стили в таблицу 
	if (typeof styles === "string") {
		// Аргумент содержит текстовое определение таблицы стилей
		if (styleElt) 
			styleElt.innerHTML = styles;
		else styleSheet.cssText = styles;	// IE API
	}
	else {
		// Аргумент объект с правилами для вставки 
		var i = 0;
		for(selector in styles) {
			if (styleSheet.insertRule) {
				var rule = selector + " {" + styles[selector] + "}"; 
				styleSheet.insertRule(rule, i++);
			}
			else {
				styleSheet.addRule(selector, styles[selector], i++);
			}
		}
	}
}


exports.addStylesheet = addStylesheet;