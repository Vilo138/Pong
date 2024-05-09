var lopta_x;						// pozicia lopty x [px]
var lopta_y;						// pozicia lopty y [px]
var lopta_smer_x;					// smer pohybu x [kladny - zlava doprava / zaporny naopak]
var lopta_smer_y;					// smer pohybu y [kladny - zhora nadol / zaporny naopak]
var lopta_rychlost_x = 350;			// rychlost lopty v smere x [pixelov za sekundu]
var lopta_rychlost_y = 400;			// rychlost lopty v smere y [pixelov za sekundu]
var padlo_x = 0;					// pozicia padla x
var padlo_y = 380;					// pozicia padla y [nemeni sa]
var mys_x;							// pozicia mysi x
var mys_y;							// pozicia mysi y
var interval = 0.01;				// ako casto pocitame pohyb lopty [sekundy]
var milis;							// cas intervalu v milisekundach
var lopta;							// globalna referencia na loptu
var padlo;							// globalna referencia na padlo
var plocha;							// globalna referencia na plochu
var casovac;						// globalna referencia na casovac



var leftArrowPressed = false; // premenna pre uchovanie informacie o stlacenej lavej sipke
var rightArrowPressed = false; // premenna pre uchovanie informacie o stlacenej pravej sipke
var paddleSpeed = 5; // rychlost pohybu padla

document.onkeydown = function(e) { // event listener pre stlacenie klavesy
	switch (e.keyCode) {
		case 37: // lave sipka
			leftArrowPressed = true; // nastavenie premennej na true
			break;
		case 39: // prava sipka
			rightArrowPressed = true; // nastavenie premennej na true
			break;
	}
};

document.onkeyup = function(e) { // event listener pre uvolnenie klavesy
	switch (e.keyCode) {
		case 37: // lave sipka
			leftArrowPressed = false; // nastavenie premennej na false
			break;
		case 39: // prava sipka
			rightArrowPressed = false; // nastavenie premennej na false
			break;
	}
};

window.onload = function() { // spusti sa po nacitani objektu window
	lopta = document.getElementById('lopta'); // ziskanie elementu s id 'lopta'
	padlo = document.getElementById('padlo'); // ziskanie elementu s id 'padlo'
	plocha = document.getElementById('plocha'); // ziskanie elementu s id 'plocha'

	lopta_x = lopta.offsetLeft; // ziskanie pozicie lopty na osi x
	lopta_y = lopta.offsetTop; // ziskanie pozicie lopty na osi y

	lopta_smer_x = lopta_rychlost_x; // nastavenie smeru pohybu lopty na osi x
	lopta_smer_y = lopta_rychlost_y; // nastavenie smeru pohybu lopty na osi y

	casovac = setInterval(pohyb, interval * 1000); // spustenie casovaca pre pohyb lopty
};

function pohyb() { // funkcia pre pohyb lopty
	lopta_x += lopta_smer_x * interval; // aktualizacia pozicie lopty na osi x
	lopta_y += lopta_smer_y * interval; // aktualizacia pozicie lopty na osi y

	if (lopta_x < 0 || lopta_x > plocha.clientWidth - lopta.clientWidth) { // kontrola kolizie lopty s okrajmi plochy na osi x
		lopta_smer_x = -lopta_smer_x; // zmena smeru pohybu lopty na osi x
	}

	if (lopta_y < 0) { // kontrola kolizie lopty s hornym okrajom plochy
		lopta_smer_y = -lopta_smer_y; // zmena smeru pohybu lopty na osi y
	}

	if (lopta_y > plocha.clientHeight - lopta.clientHeight) { // kontrola kolizie lopty s dolnym okrajom plochy
		if (lopta_x > padlo_x && lopta_x < padlo_x + padlo.clientWidth) { // kontrola kolizie lopty s padlom
			lopta_smer_y = -lopta_smer_y; // zmena smeru pohybu lopty na osi y
		} else {
			clearInterval(casovac); // zastavenie casovaca
			alert('Game Over'); // zobrazenie alertu s informaciou o konci hry
		}
	}

	lopta.style.left = lopta_x + 'px'; // nastavenie pozicie lopty na osi x
	lopta.style.top = lopta_y + 'px'; // nastavenie pozicie lopty na osi y

	if (leftArrowPressed && padlo_x > 0) { // kontrola stlacenej lavej sipky a pozicie padla na osi x
		padlo_x -= paddleSpeed; // aktualizacia pozicie padla na osi x
	}

	if (rightArrowPressed && padlo_x < plocha.clientWidth - padlo.clientWidth) { // kontrola stlacenej pravej sipky a pozicie padla na osi x
		padlo_x += paddleSpeed; // aktualizacia pozicie padla na osi x
	}

	padlo.style.left = padlo_x + 'px'; // nastavenie pozicie padla na osi x
}
