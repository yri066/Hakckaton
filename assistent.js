const artyom = new Artyom();
var com;

var bool = true;
document.onclick = function (e) {
	e = e || event;
	if ($.session.get('sound') != 'false' && bool && $.session.get('sound') != undefined) {
		comm();
	}
	bool = false;
};

function comm() {
	artyom.say("Я поддерживаю следующие команды:");
	artyom.say("открыть страницу.");
	if ($.session.get('login') != undefined) {
		if ($.session.get('admin') != undefined)
			artyom.say("панель администратора");
		artyom.say("выйти");
	}
	else {
		artyom.say("регистрация. войти");
	}
}


// first we make sure annyang started succesfully
if (annyang) {


	var openPage = function (page) {
		if (page.indexOf('главн') != -1)
			window.location.href = 'https://swsu.badwolf.tech/';
		if (page.indexOf('новост') != -1)
			window.location.href = 'https://swsu.badwolf.tech/news';
		if (page.indexOf('продукт') != -1)
			window.location.href = 'https://swsu.badwolf.tech/knock-knock';
		if (page.indexOf('компан') != -1)
			window.location.href = 'https://swsu.badwolf.tech/about';

	}

	var speak = function () {
		artyom.say("Команда не распознана");
		comm();
	}

	var reg = function () {
		if ($.session.get('login') == undefined) {
			window.location.href = 'https://swsu.badwolf.tech/registration/';
		}
	}

	var vxod = function () {
		if ($.session.get('login_v') == undefined) {
			$.ajax({
				url: 'https://swsu.badwolf.tech/php/reg.php',
				type: 'POST',
				cache: false,
				data: { submit_v: ".", login_v: $('#login').val(), password_v: $('#password').val() },
				beforeSend: function () {

				},
				success: function (data) {
					if (data == "success") {
						$.session.set('login', 'success');
					}
					else if (data == "admin") {
						$.session.set('login', 'success');
						$.session.set('admin', 'success');
					}
					document.location.href = "";
				}
			});
		}
	}

	var logout = function () {
		if ($.session.get('login') != undefined) {
			$.ajax({
				url: 'https://swsu.badwolf.tech/php/reg.php',
				type: 'POST',
				cache: false,
				data: { vixod: "." },
				beforeSend: function () {

				},
				success: function (data) {
					$.session.remove('login');
					$.session.remove('admin');
					document.location.href = "";
				}
			});
		}
	}

	var soundoff = function () {
		$.session.set('sound', 'false');
		artyom.say("Произношение команд отключено");
	}

	var soundon = function () {
		$.session.set('sound', 'true');
		artyom.say("Произношение команд включено");
	}

	var admin = function () {
		if ($.session.get('admin') != undefined) {
			window.location.href = 'https://swsu.badwolf.tech/admin/';
		}
	}

	var money = function () {
		if ($.session.get('login') != undefined) {
			artyom.say($('#money').html());
		}
	}


	var botpage = function () {
		var temp = window.innerHeight / 2;
		window.scrollBy(0, temp);

	}

	var toppage = function () {
		var temp = window.innerHeight / 2;
		window.scrollBy(0, -temp);

	}

	// define our commands.
	// * The key is the phrase you want your users to say.
	// * The value is the action to do.
	//   You can pass a function, a function name (as a string), or write your function as part of the commands object.
	var commands = {
		'перейди на :page (страницу)': openPage,
		'перейди на (страницу) (о) :page': openPage,
		'открой (страницу) (о) :page': openPage,
		'открой :page (страницу)': openPage,
		'Перейди на :page (страницу)': openPage,
		'Перейди на (страницу) (о) :page': openPage,
		'Открой (страницу) (о) :page': openPage,
		'Открой :page (страницу)': openPage,
		'открыть (страницу) (о) :page': openPage,
		'Открыть (страницу) (о) :page': openPage,
		'Зарегистрироваться': reg,
		'зарегистрироваться': reg,
		'Регистрация': reg,
		'регистрация': reg,
		'войти': vxod,
		'вход': vxod,
		'выйти': logout,
		'выход': logout,
		'не произносить команды': soundoff,
		'произносить команды': soundon,
		'панель администратора': admin,
		'текущий баланс': money,
		'Опусти вниз': botpage,
		'подними вверх': toppage,
		'*s': speak,

	};

	com = Object.keys(commands);

	//console.log(com[0]);

	// OPTIONAL: activate debug mode for detailed logging in the console
	annyang.debug();

	// Add voice commands to respond to
	annyang.addCommands(commands);

	// OPTIONAL: Set a language for speech recognition (defaults to English)
	// For a full list of language codes, see the documentation:
	// https://github.com/TalAter/annyang/blob/master/docs/FAQ.md#what-languages-are-supported
	annyang.setLanguage('ru');

	// Start listening. You can call this here, or attach this call to an event, button, etc.
	annyang.start();
} else {
	//console.log("Speech Recognition is not supported");
}

if (!annyang) {
	console.log("Speech Recognition is not supported");
}


$(function () {// if you use artyom.fatality , wait 250 ms to initialize again.
	artyom.initialize({
		lang: "ru-RU",// A lot of languages are supported. Read the docs !
		continuous: true,// Artyom will listen forever
		listen: false, // Start recognizing
		debug: false, // Show everything in the console
		speed: 1 // talk normally
	}).then(function () {
		console.log("Ready to work !");
	});
});