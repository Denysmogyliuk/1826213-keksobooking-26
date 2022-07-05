import {setEnabledCondition, formAddress} from './form.js';
import {createProposition} from './generate-layout.js';
import {objectsArray} from './data-generation.js';

const map = L.map('map-canvas')
  .on('load', setEnabledCondition)
  .setView({
    lat: 35.6894,
    lng: 139.69235,
  }, 10);

const mainPinIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: 35.6894,
    lng: 139.69235,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);

mainPinMarker.on('moveend', (evt) => {
  const lat = evt.target.getLatLng().lat;
  const lng = evt.target.getLatLng().lng;
  formAddress.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
});

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);


const arrayPropositions = [];

for (let i = 0; i < objectsArray.length; i++) {
  arrayPropositions[i] = createProposition(objectsArray[i]);
}

function getMarker (elem) {
  const marker = L.marker(
    {
      lat: elem.location.lat,
      lng: elem.location.lng,
    },
  );
  marker.addTo(map).bindPopup(createProposition(elem));
}

objectsArray.forEach(
  getMarker
);


// 1. Удалите код отрисовки одного из сгенерированных DOM-элементов объявления, который был нужен только для разработки.

// 2. С помощью полученных обновлений (стили, изображения и скрипты, необходимые для Leaflet) от Кексобота реализуйте отображение карты и дальнейший переход страницы в активное состояние после инициализации карты. Координаты центра Токио найдите самостоятельно.

// Обратите внимание, событие инициализации нужно использовать из API карт, а не из браузера.

// 3. Напишите код, который будет добавлять на карту специальную, «главную», метку. Иконка для метки есть в обновлении, файл main-pin.svg.

// 4. Реализуйте с помощью API карт выбор адреса путём перемещения главной метки. Ручное редактирование поля запрещено, однако поле должно быть доступно, чтобы значение отправлялось на сервер с формой.


// 5. Напишите код, который добавит на карту метки объявлений, «обычные». Иконка для меток есть в обновлении, файл pin.svg. Для отображения используйте данные для разработки, которые мы генерировали несколько заданий назад.

// 6. С помощью API карт реализуйте показ балуна с подробной информацией об объявлении. Учтите нюансы поведения и ограничения для обычных меток и главной.


// А ещё мы добавим альтернативную возможность указать цену за ночь:

// 7. С помощью полученных обновлений (стили и скрипты, необходимые для noUiSlider) от Кексобота реализуйте указание цены за ночь.|
