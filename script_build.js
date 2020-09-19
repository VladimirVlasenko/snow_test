function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

document.addEventListener("DOMContentLoaded", function () {
  var headerRef = document.querySelectorAll(".headerRef");
  var headerRefHidden = document.querySelectorAll(".headerRef_hidden");
  var header = document.querySelector("header");
  var parts = document.querySelectorAll('.part');
  var a = document.querySelector('a');
  var goodsContainer = document.querySelector('.goods_container');
  var hiddenMenu = document.querySelector('.hidden_menu');
  a.addEventListener('click', function (event) {
    event.preventDefault();
  }); // Выбор раздела сайта

  document.addEventListener('click', function (event) {
    if (event.target.classList.contains('headerRef')) {
      event.preventDefault();

      for (var _iterator = _createForOfIteratorHelperLoose(headerRef), _step; !(_step = _iterator()).done;) {
        item = _step.value;
        item.classList.remove('active');
      }

      for (var _iterator2 = _createForOfIteratorHelperLoose(parts), _step2; !(_step2 = _iterator2()).done;) {
        item = _step2.value;
        item.classList.remove('active');
      }

      for (var _i = 0; _i < headerRef.length; _i++) {
        if (headerRef[_i] === event.target) {
          headerRef[_i].classList.add('active');

          parts[_i].classList.add('active');

          if (headerRef[_i] = headerRef[2]) {
            getDealers();
          }
        }
      }
    }

    if (event.target.closest('.find_dealer_button')) {
      for (var _iterator3 = _createForOfIteratorHelperLoose(headerRef), _step3; !(_step3 = _iterator3()).done;) {
        item = _step3.value;
        item.classList.remove('active');
      }

      for (var _iterator4 = _createForOfIteratorHelperLoose(parts), _step4; !(_step4 = _iterator4()).done;) {
        item = _step4.value;
        item.classList.remove('active');
      }

      headerRef[2].classList.add('active');
      parts[2].classList.add('active');
      getDealers();
    }

    if (event.target.classList.contains('catalog')) {
      var getGoods = /*#__PURE__*/function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          var response, goods, _i2, pagination, pageNumber, _i3, pagesLoaded, _i4;

          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return fetch("http://junior-snowmobile.we-demonstrate2.ru/api/products");

                case 2:
                  response = _context.sent;
                  _context.next = 5;
                  return response.json();

                case 5:
                  goods = _context.sent;
                  _goodsContainer.innerHTML = "";

                  for (_i2 = 0; _i2 < goods.data.length; _i2++) {
                    _goodsContainer.innerHTML += "\n                        <div class=\"goods_item\">\n                            <div class=\"name\">" + goods.data[_i2].name + "</div>\n                            <div class=\"image\"> <img src=" + goods.data[_i2].picture + "></div>\n                            <div class=\"price\">" + goods.data[_i2].price.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ') + "  \u20BD</div>\n                        </div>\n                    ";
                  }

                  pagination = document.querySelector('.pagination');
                  pagination.innerHTML = "";
                  pageNumber = document.querySelectorAll('.page_num');

                  if (!(pageNumber.length === goods.last_page)) {
                    pagination.innerHTML = "";

                    for (_i3 = 0; _i3 < +goods.last_page; _i3++) {
                      pagination.innerHTML += "\n                            <li class=\"page_number\"><a class=\"page_num\">" + (_i3 + 1) + "</a></li>\n                            ";
                    }
                  }

                  pagesLoaded = document.querySelectorAll('.page_num');

                  for (_i4 = 0; _i4 < pagesLoaded.length; _i4++) {
                    if (!pagesLoaded[_i4].classList.contains('active')) {
                      pagesLoaded[0].classList.add('active');
                    }
                  }

                case 14:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        return function getGoods() {
          return _ref.apply(this, arguments);
        };
      }();

      // Получаем товары 
      var _goodsContainer = document.querySelector('.goods_container');

      getGoods();
    }
  }); // Появление скрытого меню 

  document.addEventListener('mousedown', function (event) {
    if (event.target.closest('.container_burger') && !hiddenMenu.classList.contains('active')) {
      hiddenMenu.classList.add('active');
      console.log("добавлен активный класс");
    } else if (event.target.closest('.container_burger') && hiddenMenu.classList.contains('active')) {
      hiddenMenu.classList.remove('active');
      console.log("удален активный класс");
    }
  }); // Выбор раздела сайта в скрытом меню 

  document.addEventListener('click', function (event) {
    if (event.target.classList.contains('headerRef_hidden')) {
      event.preventDefault();
      var checkbox = document.querySelector('.checkbox4');
      checkbox.checked = false;

      for (var _iterator5 = _createForOfIteratorHelperLoose(headerRefHidden), _step5; !(_step5 = _iterator5()).done;) {
        item = _step5.value;
        item.classList.remove('active');
      }

      for (var _iterator6 = _createForOfIteratorHelperLoose(parts), _step6; !(_step6 = _iterator6()).done;) {
        item = _step6.value;
        item.classList.remove('active');
      }

      for (var _i5 = 0; _i5 < headerRefHidden.length; _i5++) {
        if (headerRefHidden[_i5] === event.target) {
          headerRefHidden[_i5].classList.add('active');

          parts[_i5].classList.add('active');

          if (headerRefHidden[_i5] = headerRefHidden[2]) {
            getDealers();
          }
        }
      }

      hiddenMenu.classList.remove('active');
    }

    if (event.target.closest('.find_dealer_button')) {
      for (var _iterator7 = _createForOfIteratorHelperLoose(headerRefHidden), _step7; !(_step7 = _iterator7()).done;) {
        item = _step7.value;
        item.classList.remove('active');
      }

      for (var _iterator8 = _createForOfIteratorHelperLoose(parts), _step8; !(_step8 = _iterator8()).done;) {
        item = _step8.value;
        item.classList.remove('active');
      }

      headerRefHidden[2].classList.add('active');
      parts[2].classList.add('active');
      getDealers();
    }

    if (event.target.classList.contains('catalog')) {
      var getGoods = /*#__PURE__*/function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
          var response, goods, _i6, pagination, pageNumber, _i7, pagesLoaded, _i8;

          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return fetch("http://junior-snowmobile.we-demonstrate2.ru/api/products");

                case 2:
                  response = _context2.sent;
                  _context2.next = 5;
                  return response.json();

                case 5:
                  goods = _context2.sent;
                  _goodsContainer2.innerHTML = "";

                  for (_i6 = 0; _i6 < goods.data.length; _i6++) {
                    _goodsContainer2.innerHTML += "\n                        <div class=\"goods_item\">\n                            <div class=\"name\">" + goods.data[_i6].name + "</div>\n                            <div class=\"image\"> <img src=" + goods.data[_i6].picture + "></div>\n                            <div class=\"price\">" + goods.data[_i6].price.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ') + "  \u20BD</div>\n                        </div>\n                    ";
                  }

                  pagination = document.querySelector('.pagination');
                  pagination.innerHTML = "";
                  pageNumber = document.querySelectorAll('.page_num');

                  if (!(pageNumber.length === goods.last_page)) {
                    pagination.innerHTML = "";

                    for (_i7 = 0; _i7 < +goods.last_page; _i7++) {
                      pagination.innerHTML += "\n                            <li class=\"page_number\"><a class=\"page_num\">" + (_i7 + 1) + "</a></li>\n                            ";
                    }
                  }

                  pagesLoaded = document.querySelectorAll('.page_num');

                  for (_i8 = 0; _i8 < pagesLoaded.length; _i8++) {
                    if (!pagesLoaded[_i8].classList.contains('active')) {
                      pagesLoaded[0].classList.add('active');
                    }
                  }

                case 14:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }));

        return function getGoods() {
          return _ref2.apply(this, arguments);
        };
      }();

      // Получаем товары 
      var _goodsContainer2 = document.querySelector('.goods_container');

      getGoods();
    }
  }); // Конец выбора раздела сайта в скрытом меню
  // Пагинация по страницам

  document.addEventListener('click', function (event) {
    var allPageNumbers = document.querySelectorAll('.page_num');

    if (event.target.closest('.page_number')) {
      var getGoods = /*#__PURE__*/function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
          var y, response, goods, _i9, pagination, pageNumber, _i10;

          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  y = 0;

                case 1:
                  if (!(y < topTabs.length)) {
                    _context3.next = 16;
                    break;
                  }

                  _context3.next = 4;
                  return fetch("http://junior-snowmobile.we-demonstrate2.ru/api/products?page=" + event.target.textContent);

                case 4:
                  response = _context3.sent;
                  _context3.next = 7;
                  return response.json();

                case 7:
                  goods = _context3.sent;
                  goodsContainer.innerHTML = "";

                  for (_i9 = (event.target.textContent - 1) * goods.per_page; _i9 < goods.per_page * event.target.textContent; _i9++) {
                    if (goods.data[_i9]) {
                      goodsContainer.innerHTML += "\n                                <div class=\"goods_item\">\n                                    <div class=\"name\">" + goods.data[_i9].name + "</div>\n                                    <div class=\"image\"> <img src=" + goods.data[_i9].picture + "></div>\n                                    <div class=\"price\">" + goods.data[_i9].price.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ') + "  \u20BD</div>\n                                </div>\n                            ";
                    }
                  }

                  pagination = document.querySelector('.pagination');
                  pageNumber = document.querySelectorAll('.page_num');

                  if (!(pageNumber.length === goods.last_page - 1)) {} else {
                    pagination.innerHTML = "";

                    for (_i10 = 0; _i10 < +goods.last_page; _i10++) {
                      pagination.innerHTML += "\n                    <li class=\"page_number\"><a class=\"page_num\">" + (_i10 + 1) + "</a></li>\n                    ";
                    }
                  }

                case 13:
                  y++;
                  _context3.next = 1;
                  break;

                case 16:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3);
        }));

        return function getGoods() {
          return _ref3.apply(this, arguments);
        };
      }();

      for (var _a = 0; _a < allPageNumbers.length; _a++) {
        allPageNumbers[_a].classList.remove('active');
      }

      event.target.classList.add('active');
      goodsContainer.innerHTML = "";
      getGoods();
    }
  }); // Вывод товара по производителю 
  // Конец выбора раздела сайта
  // Выбор города

  var chooseCity = document.querySelector('.city');
  var chosenCity = document.querySelector('.city_name');
  var cityPopup = document.querySelector('.city_popup');
  var windowMiddle = cityPopup.querySelector('.middle');
  var closeCities = cityPopup.querySelector('.close');
  var orderButton = document.querySelector('.order');
  var orderPopup = document.querySelector('.order_popup');
  var cities = document.querySelectorAll('.city_name'); // Ставим куки по умолчанию

  function writeCookieDefault(name, val, expires) {
    var date = new Date();
    date.setDate(date.getDate() + expires);
    document.cookie = name + "=" + encodeURIComponent(val) + "; path=/Snow; expires=" + date.toUTCString();
  }

  for (var c = 0; c < cities.length; c++) {
    if (cities[c].textContent.trim() === "Выберите город") {
      writeCookieDefault('name_city', "Москва", 30);
    }
  } // Считываем куки пользователя


  function readCookieCity(name) {
    var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
    return decodeURIComponent(matches) ? decodeURIComponent(matches[1]) : undefined;
  }

  var test = readCookieCity('name_city');

  if (test) {
    for (var _i11 = 0; _i11 < cities.length; _i11++) {
      cities[_i11].textContent = test;
    }
  } // Конец считывания кук пользователя


  document.addEventListener('click', function (event) {
    if (event.target.classList.contains('city_name')) {
      cityPopup.style.display = "block";
      getCities();
    }
  }); // Получаем города 

  function getCities() {
    return _getCities.apply(this, arguments);
  } // События в открытом попапе выбора города


  function _getCities() {
    _getCities = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
      var response, citiesApi, _i21;

      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return fetch('http://junior-snowmobile.we-demonstrate2.ru/api/cities');

            case 2:
              response = _context7.sent;
              _context7.next = 5;
              return response.json();

            case 5:
              citiesApi = _context7.sent;

              for (_i21 in citiesApi) {
                windowMiddle.innerHTML += "\n            <div class=\"item\">\n                " + citiesApi[_i21].name + "\n            </div>\n            ";
              }

            case 7:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    }));
    return _getCities.apply(this, arguments);
  }

  cityPopup.addEventListener('click', function (event) {
    if (event.target.classList.contains('item')) {
      var writeCookie = function writeCookie(name, val, expires) {
        var date = new Date();
        date.setDate(date.getDate() + expires);
        document.cookie = name + "=" + encodeURIComponent(val) + "; path=/Snow; expires=" + date.toUTCString();
      };

      var readCookie = function readCookie(name) {
        var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
        return decodeURIComponent(matches) ? decodeURIComponent(matches[1]) : undefined;
      };

      var clickedCity = event.target.textContent.trim();
      writeCookie('name_city', clickedCity, 30);

      var _test = readCookie('name_city');

      for (var _i12 = 0; _i12 < cities.length; _i12++) {
        cities[_i12].textContent = _test;
      }
    }

    if (event.target.classList.contains('close') || !event.target.classList.contains("popup_window") || event.target.classList.contains('item')) {
      cityPopup.style.display = 'none';
      windowMiddle.innerHTML = "";
    }

    getDealers();
  }); // Попап "Оставить заявку"

  document.addEventListener('click', function (event) {
    if (event.target.closest('.order') || event.target.closest('.order_button')) {
      orderPopup.classList.add('active');
    }
  });
  orderPopup.addEventListener('click', function (event) {
    if (event.target.classList.contains('close') || !event.target.closest(".popup_window")) {
      orderPopup.classList.remove('active');
    }
  }); // Конец попапа "Оставить заявку"
  // События в каталоге 

  var catalog = document.querySelector('.catalog_body');
  var topTabs = document.querySelectorAll('.top_tab');
  catalog.addEventListener('click', function (event) {
    if (event.target.closest('.top_tab')) {
      var _loop = function _loop(_a2) {
        topTabs[_a2].classList.remove('active');

        if (event.target.parentNode === topTabs[_a2]) {
          var getGoods = /*#__PURE__*/function () {
            var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
              var response, goods, goodsNew, _i13, _goodsNew, pagination, pageNumber, _i14, pagesLoaded, _i15;

              return regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                  switch (_context4.prev = _context4.next) {
                    case 0:
                      _context4.next = 2;
                      return fetch("http://junior-snowmobile.we-demonstrate2.ru/api/products?brand_id=" + _a2);

                    case 2:
                      response = _context4.sent;
                      _context4.next = 5;
                      return response.json();

                    case 5:
                      goods = _context4.sent;
                      goodsContainer.innerHTML = "";
                      goodsNew = Object.keys(goods.data);

                      for (_i13 = 0, _goodsNew = goodsNew; _i13 < _goodsNew.length; _i13++) {
                        i = _goodsNew[_i13];

                        if (goods.data[i]) {
                          goodsContainer.innerHTML += "\n                                <div class=\"goods_item\">\n                                    <div class=\"name\">" + goods.data[i].name + "</div>\n                                    <div class=\"image\"> <img src=" + goods.data[i].picture + "></div>\n                                    <div class=\"price\">" + goods.data[i].price.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ') + "  \u20BD</div>\n                                </div>\n                            ";
                        }
                      }

                      pagination = document.querySelector('.pagination');
                      pageNumber = document.querySelectorAll('.page_num');

                      if (!(pageNumber.length === goods.last_page)) {
                        pagination.innerHTML = "";

                        for (_i14 = 0; _i14 < +goods.last_page; _i14++) {
                          pagination.innerHTML += "\n                                    <li class=\"page_number\"><a class=\"page_num\">" + (_i14 + 1) + "</a></li>\n                                    ";
                        }
                      }

                      pagesLoaded = document.querySelectorAll('.page_num');

                      for (_i15 = 0; _i15 < pagesLoaded.length; _i15++) {
                        if (!pagesLoaded[_i15].classList.contains('active')) {
                          pagesLoaded[0].classList.add('active');
                        }
                      }

                    case 14:
                    case "end":
                      return _context4.stop();
                  }
                }
              }, _callee4);
            }));

            return function getGoods() {
              return _ref4.apply(this, arguments);
            };
          }();

          getGoods();
        }
      };

      for (var _a2 = 0; _a2 < topTabs.length; _a2++) {
        _loop(_a2);
      }

      event.target.closest('.top_tab').classList.add('active');
    }
  }); // Переключение bottom табов

  var bottomTabs = document.querySelectorAll('.category');
  catalog.addEventListener('click', function (event) {
    if (event.target.closest('.category')) {
      for (var _iterator9 = _createForOfIteratorHelperLoose(bottomTabs), _step9; !(_step9 = _iterator9()).done;) {
        item = _step9.value;
        item.classList.remove('active');
      }

      var _loop2 = function _loop2(_a3) {
        bottomTabs[_a3].classList.remove('active');

        if (event.target.parentNode === bottomTabs[_a3]) {
          var getGoods = /*#__PURE__*/function () {
            var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
              var response, goods, goodsNew, _i16, _goodsNew2, pagination, pageNumber, _i17, pagesLoaded, _i18;

              return regeneratorRuntime.wrap(function _callee5$(_context5) {
                while (1) {
                  switch (_context5.prev = _context5.next) {
                    case 0:
                      _context5.next = 2;
                      return fetch("http://junior-snowmobile.we-demonstrate2.ru/api/products?category_id=" + _a3);

                    case 2:
                      response = _context5.sent;
                      _context5.next = 5;
                      return response.json();

                    case 5:
                      goods = _context5.sent;
                      goodsContainer.innerHTML = "";
                      goodsNew = Object.keys(goods.data);

                      for (_i16 = 0, _goodsNew2 = goodsNew; _i16 < _goodsNew2.length; _i16++) {
                        i = _goodsNew2[_i16];

                        if (goods.data[i]) {
                          goodsContainer.innerHTML += "\n                                <div class=\"goods_item\">\n                                    <div class=\"name\">" + goods.data[i].name + "</div>\n                                    <div class=\"image\"> <img src=" + goods.data[i].picture + "></div>\n                                    <div class=\"price\">" + goods.data[i].price.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ') + "  \u20BD</div>\n                                </div>\n                            ";
                        }
                      }

                      pagination = document.querySelector('.pagination');
                      pageNumber = document.querySelectorAll('.page_num');

                      if (!(pageNumber.length === goods.last_page)) {
                        pagination.innerHTML = "";

                        for (_i17 = 0; _i17 < +goods.last_page; _i17++) {
                          pagination.innerHTML += "\n                                    <li class=\"page_number\"><a class=\"page_num\">" + (_i17 + 1) + "</a></li>\n                                    ";
                        }
                      }

                      pagesLoaded = document.querySelectorAll('.page_num');

                      for (_i18 = 0; _i18 < pagesLoaded.length; _i18++) {
                        if (!pagesLoaded[_i18].classList.contains('active')) {
                          pagesLoaded[0].classList.add('active');
                        }
                      }

                    case 14:
                    case "end":
                      return _context5.stop();
                  }
                }
              }, _callee5);
            }));

            return function getGoods() {
              return _ref5.apply(this, arguments);
            };
          }();

          getGoods();
        }
      };

      for (var _a3 = 0; _a3 < bottomTabs.length; _a3++) {
        _loop2(_a3);
      }

      event.target.closest('.category').classList.add('active');
    }
  }); // Получение списка городов и дилеров

  var mapContainer = document.querySelector('.map_container');
  var addresses = document.querySelector('.adresses');

  function getDealers() {
    return _getDealers.apply(this, arguments);
  } // Кнопка показать еще 


  function _getDealers() {
    _getDealers = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
      var response, dealers, response2, citiesApi, readCookieCity, chosenCookieCity, sidebarBottom, maps, mapMain, y, test, _i22, _i23, x, dealersList;

      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              readCookieCity = function _readCookieCity(name) {
                var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
                return decodeURIComponent(matches) ? decodeURIComponent(matches[1]) : undefined;
              };

              _context8.next = 3;
              return fetch('http://junior-snowmobile.we-demonstrate2.ru/api/dealers');

            case 3:
              response = _context8.sent;
              _context8.next = 6;
              return response.json();

            case 6:
              dealers = _context8.sent;
              _context8.next = 9;
              return fetch('http://junior-snowmobile.we-demonstrate2.ru/api/cities');

            case 9:
              response2 = _context8.sent;
              _context8.next = 12;
              return response2.json();

            case 12:
              citiesApi = _context8.sent;
              chosenCookieCity = readCookieCity('name_city');
              sidebarBottom = document.querySelector('.bottom_sidebar');
              maps = document.querySelectorAll('.map_item');
              mapMain = document.querySelector('.map_main'); // Обновляем данные на вкладке "Дилеры"

              sidebarBottom.innerHTML = "";

              for (y = 0; y < maps.length; y++) {
                maps[y].classList.remove('active');
              }

              test = readCookieCity('name_city');

              for (_i22 = 0; _i22 < cities.length; _i22++) {
                cities[_i22].textContent = test;
              }

              for (_i23 = 0; _i23 < citiesApi.length; _i23++) {
                if (chosenCookieCity.trim() === citiesApi[_i23].name) {
                  for (x = 0; x < dealers.length; x++) {
                    if (+dealers[x].city_id === _i23 + 1) {
                      maps[_i23].classList.add('active');

                      sidebarBottom.innerHTML += "\n                        <div class=\"bottom_sidebar_item\">\n                            <div class=\"name\">" + dealers[x].name + "</div>\n                            <div class=\"address feature\">" + dealers[x].address + "</div>\n                            <div class=\"tel feature\">" + dealers[x].phone + "</div>\n                            <div class=\"mail feature\">" + dealers[x].email + "</div>\n                            <div class=\"website feature\">" + dealers[x].site + "</div>\n                            <hr>\n                        </div>\n                        ";
                    }
                  }
                }
              } // Конец считывания кук пользователя


              dealersList = cityPopup.querySelectorAll('.item');

            case 23:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8);
    }));
    return _getDealers.apply(this, arguments);
  }

  document.addEventListener('click', function (event) {
    var allPageNumbers = document.querySelectorAll('.page_num');

    if (event.target.classList.contains('show_more')) {
      var _loop3 = function _loop3(x) {
        if (allPageNumbers[x].classList.contains('active')) {
          var getGoods = /*#__PURE__*/function () {
            var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
              var response, goods, _i19, pagination, pageNumber, _i20;

              return regeneratorRuntime.wrap(function _callee6$(_context6) {
                while (1) {
                  switch (_context6.prev = _context6.next) {
                    case 0:
                      _context6.next = 2;
                      return fetch("http://junior-snowmobile.we-demonstrate2.ru/api/products?page=" + (x + 2));

                    case 2:
                      response = _context6.sent;
                      _context6.next = 5;
                      return response.json();

                    case 5:
                      goods = _context6.sent;

                      for (_i19 = (x + 1) * goods.per_page; _i19 < goods.per_page * (x + 2); _i19++) {
                        if (goods.data[_i19]) {
                          goodsContainer.innerHTML += "\n                                        <div class=\"goods_item\">\n                                            <div class=\"name\">" + goods.data[_i19].name + "</div>\n                                            <div class=\"image\"> <img src=" + goods.data[_i19].picture + "></div>\n                                            <div class=\"price\">" + goods.data[_i19].price.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ') + "  \u20BD</div>\n                                        </div>\n                                    ";
                        }
                      }

                      pagination = document.querySelector('.pagination');
                      pageNumber = document.querySelectorAll('.page_num');

                      if (!(pageNumber.length === goods.last_page - 1)) {} else {
                        pagination.innerHTML = "";

                        for (_i20 = 0; _i20 < +goods.last_page; _i20++) {
                          pagination.innerHTML += "\n                            <li class=\"page_number\"><a class=\"page_num\">" + (_i20 + 1) + "</a></li>\n                            ";
                        }
                      }

                      allPageNumbers[x + 1].classList.add('active');

                    case 11:
                    case "end":
                      return _context6.stop();
                  }
                }
              }, _callee6);
            }));

            return function getGoods() {
              return _ref6.apply(this, arguments);
            };
          }();

          allPageNumbers[x].classList.remove('active');
          getGoods();
        }
      };

      for (var x = 0; x < allPageNumbers.length; x++) {
        _loop3(x);
      }
    }
  });

  var sendForm = function sendForm() {
    var postData = function postData(body) {
      return fetch('./server.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
    };

    postData();
  };

  document.addEventListener('submit', sendForm);
});