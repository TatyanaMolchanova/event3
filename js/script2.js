
$(document).ready(function(){
	'use strict';

	$('.slider').slick({
		dots: false,
		arrows: false,
		autoplay: true,
		fade: true,
	});



	let toDate =  new Date('2019-09-07 16:40:00'); // 1. когда событие

	let countdown = setInterval(function() {
		// 2. получить разницу (дельту) во времени между сейчас и событием
		let now = new Date(),  // сейчас
			delta = parseInt((toDate - now) / 1000);

			// console.log('toDate: ' + toDate);
			// console.log(now);
			// console.log(delta);

		if (delta <= 0) {
			clearInterval(countdown);
		} else {
			// --start--

		// 3. посчитать, сколько целых дней в разнице и вывести в квадрат дней
	 	// 24 * 60 * 60 * 1000
	 	// 24 * 60 * 60 

	 	let days = Math.floor(delta / (24 * 60 * 60));
	 	// console.log(days);
	 	$('#days').text(days.toString().length == 1 ? '0' + days : days );
		// 3a. вычесть дни из дельты

		delta -= days *  (24 * 60 * 60);


		// 4. посчитать, сколько целых часов в разнице и вывести в квадрат дней
		// 60 * 60 * 1000
		// 60 * 60 
		let hours = Math.floor(delta / (60 * 60) );
		// console.log(hours);
		$('#hours').text(hours.toString().length == 1 ? '0' + hours : hours );
		// 3a. вычесть часы из дельты
		delta -= hours * ( 60 * 60 );
		// 5. посчитать, сколько целых минут в разнице и вывести в квадрат дней
		// 60 * 1000
		// 60
		let minutes = Math.floor( delta / 60);
		// console.log(minutes);
		$('#minutes').text(minutes.toString().length == 1 ? '0' + minutes : minutes );
		// 3a. вычесть минуты из дельты
		delta -= minutes * 60;
		// 6. посчитать, сколько целых секунд в разнице и вывести в квадрат дней
		let seconds = delta;
		// console.log(days + ':' + hours + ':' +  minutes + ':' + seconds);
		$('#seconds').text(seconds.toString().length == 1 ? '0' + seconds : seconds );
		// --end--
		}
	
	}, 1000);

	// 7. проделать действия п.п. 2-6 каждую секунду


	// API

	let options = [
		{
			endpoint: 'https://reqres.in/api/users',
			count: 6,
			target: 'competitorsUsers',
			class: null,
		},
		{
			endpoint: 'https://reqres.in/api/users?page=2',
			count: 3,
			target: 'usersJury',
			class: 'user__img-box--round',
		}
	];

	options.forEach(function(option){
		loadUsers(option);
	})

	function loadUsers(opt) {

		let xhr = new XMLHttpRequest();

		xhr.open('GET', opt.endpoint);

		xhr.send();

		xhr.responseType = 'json';


		xhr.onerror = function() {
		  alert("Запрос не удался");
		};


		xhr.onload = function() {
		  if (xhr.status != 200) { // анализируем HTTP-статус ответа, если статус не 200, то произошла ошибка
		    alert(`Ошибка ${xhr.status}: ${xhr.statusText}`); // Например, 404: Not Found
		  } else { // если всё прошло гладко, выводим результат
		  	// console.log(xhr.response);
		    // alert(`Готово, получили ${xhr.response.length} байт`); // response -- это ответ сервера
		  // console.log(xhr.response);
		   // console.log(xhr.response.data);

			
		let target = document.getElementById(opt.target),
			users = xhr.response.data.splice(0, opt.count);

		users.forEach(function(user) {
		   		// console.log(user.first_name, user.last_name);

		   		let html = `<div class="user">
						<div class="user__img-box ${opt.class}">
							<img src="${user.avatar}" alt="" class="user__img ">
						</div>
						<div class="user__name">${user.first_name} ${user.last_name}</div>
						<div class="user__pos">${user.email}</div>
					</div>`;

				target.innerHTML = target.innerHTML + html;
		   });
		  }
		};

		// console.log(xhr);
	};

	let sound = document.querySelector('audio');

	$('.toggler').on('click', function(e) {
		e.preventDefault();

		$('body').toggleClass('menu-opened');
		sound.play();
	})



});