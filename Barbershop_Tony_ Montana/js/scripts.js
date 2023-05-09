/*Функция "listenInputChanges" добавляет событие "input" к полю ввода */
function listenInputChanges(field) {
	field.addEventListener('input', function() {
		removeInvalidStatus(field);
	});
}

/*Если поле ввода изменяется, вызывается функция "removeInvalidStatus", которая проверяет, есть ли у поля ввода класс 
"form-field-invalid", и если есть, он удаляет его. */
function removeInvalidStatus(field) { 
	if (field.classList.contains('form-field-invalid')) {
		field.classList.remove('form-field-invalid')
	}
}



/*Этот код находит и записывает в переменную "overlay" элемент на веб-странице, который имеет класс "modal-overlay". 
Этот элемент используем для закрытия модального окна на странице */
var overlay = document.querySelector('.modal-overlay');



// РАБОТА С ФОРМОЙ ВХОДА (открытие формы в вебью, редактирование полей ввода и установке фокуса на первое поле.)
//!!!!!!ВЫДЕЛИТЬ В РАБОТЕ 
//находим элемент на странице с классом "modal-content-form" и сохраняем его в переменную popupForm.
var popupForm = document.querySelector('.modal-content-form');

if (popupForm) {

	//ищем кнопку с классом "login-btn" и сохраняем в переменную openForm.
	var openForm = document.querySelector('.login-btn');
	//Далее находим форму с классом "login-form" внутри popupForm и сохраняем в переменную loginForm.
	var loginForm = popupForm.querySelector('.login-form');
	//находим все поля ввода внутри loginForm с классом "login-form-field" и сохраняем в переменную loginFormFields.
	var loginFormFields = document.querySelectorAll('.login-form-field');

	//Создаем кнопку закрытия формы 
	var closeForm = document.createElement('button');
	//задаем ей класс "modal-content-close" с типом button
	closeForm.classList.add('modal-content-close');
	closeForm.type = 'button';
	//добавляем в конце popupForm
	popupForm.appendChild(closeForm);


	//добавляем слушатель события 'click' на openForm
	openForm.addEventListener('click', function(event) {
		var focusFieldNum = 0;

		//отменяется стандартное поведение браузера при клике на ссылку (event.preventDefault());
	   	event.preventDefault();
		//элементу overlay добавляется класс "modal-overlay-show";
	   	overlay.classList.add('modal-overlay-show');
		//popupForm удаляется класс "modal-content-form-error" (если он есть);
	   	popupForm.classList.remove('modal-content-form-error');
		//popupForm добавляется класс "modal-content-form-show";
		popupForm.classList.add('modal-content-form-show');

		//выполняем цикл по всем полям в loginFormFields
		for (var i = 0; i < loginFormFields.length; i++) {
			loginFormFields[i].classList.remove('form-field-invalid');

			if ( !loginFormFields[i].value && (loginFormFields[focusFieldNum] != document.activeElement) && (i >= focusFieldNum) ) {
				focusFieldNum = i;
				loginFormFields[focusFieldNum].focus();
			}
		}
	});


	//ПРОВЕРКА НА ЗАПОЛНЕНИЕ ОБЯЗАТЕЛЬНЫХ ПОЛЕЙ (привязываю функцию к отправке формы)
	loginForm.addEventListener('submit', function(event) {
		var invalidFieldNum = 0;

		//При отправке формы, проверяем заполнены ли все обязательные поля формы. 
		for (var i = 0; i < loginFormFields.length; i++) {
			if (!loginFormFields[i].value) {
				event.preventDefault();
				//Если какое-то поле пустое, предотвращаем отправку формы = классом "form-field-invalid"
				loginFormFields[i].classList.add('form-field-invalid');

				if ( (loginFormFields[invalidFieldNum] != document.activeElement) && (i >= invalidFieldNum) ) {
					invalidFieldNum = i;
					loginFormFields[invalidFieldNum].focus();
				}

				//добавляем/удаляем класс "modal-content-form-error" = стилизация под ошибку при незаполненном поле.
				popupForm.classList.remove('modal-content-form-error');
		      	setTimeout(function() {
		         	popupForm.classList.add('modal-content-form-error')
		      	}, 1);
			}
		}
	});


	//ОТВЕЧАЕТ ЗА ЗАКРЫТИЕ ФОРМЫ
	for (var i = 0; i < loginFormFields.length; i++)  {
		listenInputChanges(loginFormFields[i]);
	}

	//закртыие на форме (крестик)
	closeForm.addEventListener('click', function(event) {
	   	event.preventDefault();
	   	overlay.classList.remove('modal-overlay-show');
	   	popupForm.classList.remove('modal-content-form-show');
	});

	overlay.addEventListener('click', function(event) {
	   	event.preventDefault();
	   	overlay.classList.remove('modal-overlay-show');
	   	popupForm.classList.remove('modal-content-form-show');
	});

	//закрытие при нажатии ESC
	window.addEventListener('keydown', function(event) {
	   	if (event.keyCode === 27) {
	      	overlay.classList.remove('modal-overlay-show');
	      	popupForm.classList.remove('modal-content-form-show');
	   	}
	});

}




// РАБОТА С КАРТОЙ (в вебью) - выделить в работе 

//Создание модального окна с картой на веб-странице
var popupMap = document.querySelector('.modal-content-map');

if (popupMap) {
	var openMapBtn = document.querySelector('.map-btn');
	var openMapLink = document.querySelector('.map-link');

	//Создаем кнопку закрытия модального окна
	var closeMap = document.createElement('button');
	closeMap.classList.add('modal-content-close');
	closeMap.type = 'button';
	popupMap.appendChild(closeMap);

	//вызываем функцию отображения overlay и popupMap при openMapBtn
	if (openMapBtn) {
	   	openMapBtn.addEventListener('click', function(event) {
	      	event.preventDefault();
	      	overlay.classList.add('modal-overlay-show');
	      	popupMap.classList.add('modal-content-map-show');
	   	});
	}

	//вызываем функцию отображения overlay и popupMap при openMapLink
	openMapLink.addEventListener('click', function(event) {
	   	event.preventDefault();
	   	overlay.classList.add('modal-overlay-show');
	   	popupMap.classList.add('modal-content-map-show');
	});

	//закртыие на форме (крестик)
	closeMap.addEventListener('click', function(event) {
	   	event.preventDefault();
	   	overlay.classList.remove('modal-overlay-show');
	   	popupMap.classList.remove('modal-content-map-show');
	});

	//закрытие на темном фоне
	overlay.addEventListener('click', function(event) {
	   	event.preventDefault();
	   	overlay.classList.remove('modal-overlay-show');
	   	popupMap.classList.remove('modal-content-map-show');
	});

	//закрытие при нажатии ESC
	window.addEventListener('keydown', function(event) {
	   	if (event.keyCode === 27) {
	      	overlay.classList.remove('modal-overlay-show');
	      	popupMap.classList.remove('modal-content-map-show');
	   	}
	});
}





// Работа с фото на главной


var indexGallery = document.querySelector('.index-gallery');

if (indexGallery) {

	indexGallery.classList.add('index-gallery-js');

	//gallery-photo используем в html 
	var photos = indexGallery.querySelectorAll('.gallery-photo');             

	// 'first-photo' - первый элемент и сохраняет в переменную firstphoto
	// в галерее добавляются классы first-photo и current-photo для того, чтобы показывать, что это первое и текущее изображение.
	var firstphoto = indexGallery.querySelector('.gallery-photo:first-of-type');
	firstphoto.classList.add('first-photo');
	firstphoto.classList.add('current-photo');

	//last-photo - последний элемент и сохраняет в переменную lastPhoto
	var lastPhoto = indexGallery.querySelector('.gallery-photo:last-of-type');
	lastPhoto.classList.add('last-photo');

	var currentPhoto = indexGallery.querySelector('.current-photo');


	var galleryNav = document.createElement('div');
	galleryNav.classList.add('gallery-nav');
	indexGallery.appendChild(galleryNav);

	//делаем кнопки назад и вперед
	var galleryPrev = document.createElement('button');
	galleryPrev.classList.add('btn');
	galleryPrev.type = 'button';
	galleryPrev.textContent = 'Назад';
	galleryNav.appendChild(galleryPrev);

	var galleryNext = document.createElement('button');
	galleryNext.classList.add('btn');
	galleryNext.type = 'button';
	galleryNext.textContent = 'Вперед';
	galleryNav.appendChild(galleryNext);


	//отвечает за переключение фотографий в галерее ПО КНОПКАМ ВПЕРЕД НАЗАД 
	/*Когда пользователь кликает на кнопку "galleryPrev" (предыдущая фотография), то происходит следующее: код проверяет, 
	если текущая фотография является первой фотографией в галерее, то она заменяется на последнюю фотографию в галерее.
	*/
	galleryPrev.addEventListener('click', function() {
		if (currentPhoto.classList.contains('first-photo')) {
	        lastPhoto.classList.add('current-photo');
	    } else {
			currentPhoto.previousSibling.previousSibling.classList.add('current-photo');
	    }
		// код удаляет класс 'current-photo' у предыдущей фотографии и добавляет этот класс к новой фотографии
		currentPhoto.classList.remove('current-photo');
		//После этого текущая фотография переопределяется с помощью метода 'querySelector'.
		currentPhoto = indexGallery.querySelector('.current-photo');
	});

	/*текущая фотография заменяется на следующую фотографию. Если текущая фотография является последней в галерее, 
	то она заменяется на первую фотографию в галерее*/
	galleryNext.addEventListener('click', function() {
		if (currentPhoto.classList.contains('last-photo')) {
	        firstphoto.classList.add('current-photo');
	    } else {
			currentPhoto.nextSibling.nextSibling.classList.add('current-photo');
	    }
		//код удаляет класс 'current-photo' у предыдущей фотографии
		currentPhoto.classList.remove('current-photo');
		//После этого текущая фотография переопределяется с помощью метода 'querySelector
		currentPhoto = indexGallery.querySelector('.current-photo');
	});


	//ВАЖНЫЙ КЛАСС - РАБОТАЕТ ДЛЯ ВСЕХ ФОТОК (для приблежения, закрытия фоток)
	var modalPhoto = document.querySelector('.modal-content-photo');

	// создается изображение с классом "zoomed-photo" и добавляется внутрь элемента "modalPhoto"
	var zoomedPhoto = document.createElement('img');
	zoomedPhoto.classList.add('zoomed-photo');
	modalPhoto.appendChild(zoomedPhoto);

	//Затем создается кнопка с классом "modal-content-close" и типом "button" для закрытия модального окна
	var closePhoto = document.createElement('button');
	closePhoto.classList.add('modal-content-close');
	closePhoto.type = 'button';
	//кнопки также добавляются внутрь элемента "modalPhoto"
	modalPhoto.appendChild(closePhoto);

	var sliderPrev = document.createElement('button');
	sliderPrev.classList.add('gallery-slider-prev', 'gallery-slider-btn');
	sliderPrev.type = 'button';
	//кнопки также добавляются внутрь элемента "modalPhoto"
	modalPhoto.appendChild(sliderPrev);

	var sliderNext = document.createElement('button');
	sliderNext.classList.add('gallery-slider-next', 'gallery-slider-btn');
	sliderNext.type = 'button';
	//кнопки также добавляются внутрь элемента "modalPhoto"
	modalPhoto.appendChild(sliderNext);

	/*Он перебирает все элементы фотографий на странице (photos), добавляет каждому событие 'click', которое вызывает 
	модальное окно с увеличенной фотографией. 
	ЕСЛИ УДАЛИТЬ ЭТОТ КОД, ТО ФОТО БУДЕТ ОТКРЫВАТЬСЯ В НОВОМ ОКНЕ*/
	for (var i = 0; i < photos.length; i++) {
		photos[i].addEventListener('click', function(event) {
			//При клике на фотографию, сначала предотвращается стандартное поведение браузера (event.preventDefault())
			event.preventDefault();
			//затем появляется затемняющий фон (overlay), что делает модальное окно центром внимания.
			overlay.classList.add('modal-overlay-show');

			//Далее увеличенная фотография устанавливается как атрибут src на элементе modalPhoto
			zoomedPhoto.setAttribute("src", currentPhoto.getAttribute('href'));

			//который также становится видимым (modalPhoto.classList.add('modal-content-photo-show'))
			modalPhoto.classList.add('modal-content-photo-show');
			/*добавляются стили для центрирования модального окна с фотографией в центре экрана (modalPhoto.style.marginTop 
			и modalPhoto.style.marginLeft).*/
			modalPhoto.style.marginTop = '-' + modalPhoto.offsetHeight/2 + 'px';
			modalPhoto.style.marginLeft = '-' + modalPhoto.offsetWidth/2 + 'px';
		});
	}


	//Этот код отвечает за функциональность ПЕРЕКЛЮЧЕНИЯ фотографий на сайте при зуме (налево, направо)
	//sliderPrev - это кнопка "назад"
	sliderPrev.addEventListener('click', function() {
		if (currentPhoto.classList.contains('first-photo')) {
	        lastPhoto.classList.add('current-photo');
	    } else {
			currentPhoto.previousSibling.previousSibling.classList.add('current-photo');
	    }
		currentPhoto.classList.remove('current-photo');
		currentPhoto = indexGallery.querySelector('.current-photo');
		zoomedPhoto.setAttribute("src", currentPhoto.getAttribute('href'));
	});

	// sliderNext - кнопка "вперед".
	sliderNext.addEventListener('click', function() {
		if (currentPhoto.classList.contains('last-photo')) {
	        firstphoto.classList.add('current-photo');
	    } else {
			currentPhoto.nextSibling.nextSibling.classList.add('current-photo');
	    }
		currentPhoto.classList.remove('current-photo');
		currentPhoto = indexGallery.querySelector('.current-photo');
		zoomedPhoto.setAttribute("src", currentPhoto.getAttribute('href'));
	});


	/* Когда пользователь кликает на кнопку "закрыть" или темный фон, классы 'modal-overlay-show' и 'modal-content-photo-show'
	 удаляются из элементов, чтобы спрятать модальное окно. */
	closePhoto.addEventListener('click', function(event) {
	   	event.preventDefault();
	   	overlay.classList.remove('modal-overlay-show');
	   	modalPhoto.classList.remove('modal-content-photo-show');
	});

	overlay.addEventListener('click', function(event) {
	   	event.preventDefault();
	   	overlay.classList.remove('modal-overlay-show');
	   	modalPhoto.classList.remove('modal-content-photo-show');
	});

	//Когда пользователь нажимает клавишу "Esc", также удаляются классы, чтобы закрыть модальное окно.
	window.addEventListener('keydown', function(event) {
	   	if (event.keyCode === 27) {
	      	overlay.classList.remove('modal-overlay-show');
	      	modalPhoto.classList.remove('modal-content-photo-show');
	   	}
	});

}





// Валидация формы записи


var appointmentForm = document.querySelector('.appointment-form');

if (appointmentForm) {

	var appointmentFormFields = document.querySelectorAll('.appointment-field');

	//при отпрвке формы проверяем заполненность всех полей 
	appointmentForm.addEventListener('submit', function(event) {
		var invalidFieldNum = 0;
		for (var i = 0; i < appointmentFormFields.length; i++) {
			if (!appointmentFormFields[i].value) {
				event.preventDefault();
				appointmentFormFields[i].classList.add('form-field-invalid');

				//делаем фокус на незаполненном поле/полях
				if ( (appointmentFormFields[invalidFieldNum] != document.activeElement) && (i >= invalidFieldNum) ) {
					invalidFieldNum = i;
					appointmentFormFields[invalidFieldNum].focus();
				}
			}
		}
	});

	//проверяем изменения в полях ввода и вызываем функцию "listenInputChanges" для каждого поля ввода.
	for (var i = 0; i < appointmentFormFields.length; i++)  {
		listenInputChanges(appointmentFormFields[i]);
	}
}

