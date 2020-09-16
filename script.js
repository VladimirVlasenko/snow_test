document.addEventListener("DOMContentLoaded", () => {
    const headerRef = document.querySelectorAll(".headerRef");
    const header = document.querySelector("header");
    const parts = document.querySelectorAll('.part');
    const a = document.querySelector('a');
    let goodsContainer = document.querySelector('.goods_container');

    a.addEventListener('click', (event) => {
        event.preventDefault();
    })


    // Выбор раздела сайта
    document.addEventListener('click', (event) => {

        if (event.target.classList.contains('headerRef')) {
            event.preventDefault();
            for (item of headerRef) {
                item.classList.remove('active');
            }
            for (item of parts) {
                item.classList.remove('active');
            }

            for (let i = 0; i < headerRef.length; i++) {
                if (headerRef[i] === event.target) {
                    headerRef[i].classList.add('active');
                    parts[i].classList.add('active');
                    if (headerRef[i] = headerRef[2]) {
                        getDealers();
                    }
                }
            }

        }

        if (event.target.closest('.find_dealer_button')) {
            for (item of headerRef) {
                item.classList.remove('active');
            }
            for (item of parts) {
                item.classList.remove('active');
            }
            headerRef[2].classList.add('active');
            parts[2].classList.add('active');
            getDealers();
        }
        if (event.target.classList.contains('catalog')) {

            // Получаем товары 
            let goodsContainer = document.querySelector('.goods_container');
            async function getGoods() {
                const response = await fetch(`http://junior-snowmobile.we-demonstrate2.ru/api/products`);
                const goods = await response.json();
                goodsContainer.innerHTML = "";
                
                for (let i = 0; i < goods.data.length; i++) {
                    goodsContainer.innerHTML += `
                        <div class="goods_item">
                            <div class="name">${goods.data[i].name}</div>
                            <div class="image"> <img src=${goods.data[i].picture}></div>
                            <div class="price">${goods.data[i].price.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')}  ₽</div>
                        </div>
                    `
                }
                let pagination = document.querySelector('.pagination');
                pagination.innerHTML = "";
                let pageNumber = document.querySelectorAll('.page_num');

                if (!(pageNumber.length === goods.last_page)) {
                    pagination.innerHTML = "";
                    for (let i = 0; i < +goods.last_page; i++) {
                            pagination.innerHTML += `
                            <li class="page_number"><a class="page_num">${i+1}</a></li>
                            `
                    }
                }
                let pagesLoaded = document.querySelectorAll('.page_num');
                for(let i=0; i<pagesLoaded.length; i++) {
                    if(!pagesLoaded[i].classList.contains('active')) {
                        pagesLoaded[0].classList.add('active');
                    }
                }


            }
            getGoods();

        }

    })
    // Пагинация по страницам
    document.addEventListener('click', (event) => {
        let allPageNumbers = document.querySelectorAll('.page_num');
        if (event.target.closest('.page_number')) {
            for (let a = 0; a < allPageNumbers.length; a++) {
                allPageNumbers[a].classList.remove('active');
            }
            event.target.classList.add('active');
            goodsContainer.innerHTML = "";
            async function getGoods() {
                for (let y = 0; y < topTabs.length; y++) {
                    const response = await fetch(`http://junior-snowmobile.we-demonstrate2.ru/api/products?page=${event.target.textContent}`);
                    const goods = await response.json();

                    goodsContainer.innerHTML="";
                    for (let i = (event.target.textContent - 1) * goods.per_page; i < goods.per_page * event.target.textContent; i++) {
                        if (goods.data[i]) {
                            goodsContainer.innerHTML += `
                                <div class="goods_item">
                                    <div class="name">${goods.data[i].name}</div>
                                    <div class="image"> <img src=${goods.data[i].picture}></div>
                                    <div class="price">${goods.data[i].price.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')}  ₽</div>
                                </div>
                            `
                        }

                    }


                    let pagination = document.querySelector('.pagination');
                    let pageNumber = document.querySelectorAll('.page_num');
                    if (!(pageNumber.length === (goods.last_page - 1))) {

                    } else {
                        pagination.innerHTML = "";
                        for (let i = 0; i < +goods.last_page; i++) {
                            pagination.innerHTML += `
                    <li class="page_number"><a class="page_num">${i+1}</a></li>
                    `
                        }
                    }
                    
                }


            }
            getGoods()

        }
    })
    // Вывод товара по производителю 


    // Конец выбора раздела сайта
    // Выбор города

    let chooseCity = document.querySelector('.city');
    let chosenCity = document.querySelector('.city_name');
    let cityPopup = document.querySelector('.city_popup');
    let windowMiddle = cityPopup.querySelector('.middle');
    let closeCities = cityPopup.querySelector('.close');
    let orderButton = document.querySelector('.order');
    let orderPopup = document.querySelector('.order_popup');
    let cities = document.querySelectorAll('.city_name');


// Ставим куки по умолчанию


            
            function writeCookieDefault(name, val, expires) {
                let date = new Date;
                date.setDate(date.getDate() + expires);
                document.cookie = name + "=" + encodeURIComponent(val) + "; path=/Snow; expires=" + date.toUTCString();
            }
    for(let c=0; c<cities.length; c++) {

        if(cities[c].textContent.trim() === "Выберите город") {
            writeCookieDefault('name_city', "Москва", 30)
        }
    }

    // Считываем куки пользователя
        function readCookieCity(name) {
            let matches = document.cookie.match(new RegExp(
                "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
            ));
            return decodeURIComponent(matches) ? decodeURIComponent(matches[1]) : undefined;
        }
        
        let test = readCookieCity('name_city');

        if (test) {
            for (let i = 0; i < cities.length; i++) {
                cities[i].textContent = test;
            }
        }
    
    


    // Конец считывания кук пользователя


    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('city_name')) {
            cityPopup.style.display = "block";
            getCities();

        }
    })
    // Получаем города 
    async function getCities() {
        const response = await fetch('http://junior-snowmobile.we-demonstrate2.ru/api/cities');
        const citiesApi = await response.json();
        for (let i in citiesApi) {
            windowMiddle.innerHTML += `
            <div class="item">
                ${citiesApi[i].name}
            </div>
            `

        }

    }

    
    
    // События в открытом попапе выбора города
    cityPopup.addEventListener('click', (event) => {
        if (event.target.classList.contains('item')) {
            let clickedCity = event.target.textContent.trim();

            

            function writeCookie(name, val, expires) {
                let date = new Date;
                date.setDate(date.getDate() + expires);
                document.cookie = name + "=" + encodeURIComponent(val) + "; path=/Snow; expires=" + date.toUTCString();
            }
            
            writeCookie('name_city', clickedCity, 30);



            function readCookie(name) {
                let matches = document.cookie.match(new RegExp(
                    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
                ));
                return decodeURIComponent(matches) ? decodeURIComponent(matches[1]) : undefined;
            }
            let test = readCookie('name_city');


            for (let i = 0; i < cities.length; i++) {
                cities[i].textContent = test;
            }
        }


        if (event.target.classList.contains('close') || !event.target.classList.contains("popup_window") ||
            event.target.classList.contains('item')) {
            cityPopup.style.display = 'none';
            windowMiddle.innerHTML = "";
        }
        getDealers();

    })

    // Попап "Оставить заявку"

    document.addEventListener('click', (event) => {
        if (event.target.closest('.order') || event.target.closest('.order_button')) {
            orderPopup.classList.add('active')

        }

    })


    orderPopup.addEventListener('click', (event) => {
        if (event.target.classList.contains('close') || !event.target.closest(".popup_window")) {
            orderPopup.classList.remove('active');
        }
    })

    // Конец попапа "Оставить заявку"

    // События в каталоге 
    let catalog = document.querySelector('.catalog_body');
    let topTabs = document.querySelectorAll('.top_tab');
    catalog.addEventListener('click', (event) => {
        if (event.target.closest('.top_tab')) {
            for (let a = 0; a < topTabs.length; a++) {
                topTabs[a].classList.remove('active');

                if (event.target.parentNode === topTabs[a]) {
                    
                    async function getGoods() {

                        const response = await fetch(`http://junior-snowmobile.we-demonstrate2.ru/api/products?brand_id=${a}`);
                        const goods = await response.json();
                        goodsContainer.innerHTML = "";
                        
                        let goodsNew = Object.keys(goods.data);

                        for (i of goodsNew) {

                            if (goods.data[i]) {

                                goodsContainer.innerHTML += `
                                <div class="goods_item">
                                    <div class="name">${goods.data[i].name}</div>
                                    <div class="image"> <img src=${goods.data[i].picture}></div>
                                    <div class="price">${goods.data[i].price.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')}  ₽</div>
                                </div>
                            `
                            }

                        }


                        let pagination = document.querySelector('.pagination');
                        let pageNumber = document.querySelectorAll('.page_num');

                        if (!(pageNumber.length === goods.last_page)) {
                            pagination.innerHTML = "";
                            for (let i = 0; i < +goods.last_page; i++) {
                                    pagination.innerHTML += `
                                    <li class="page_number"><a class="page_num">${i+1}</a></li>
                                    `
                            }
                        }
                        let pagesLoaded = document.querySelectorAll('.page_num');
                        for(let i=0; i<pagesLoaded.length; i++) {
                            if(!pagesLoaded[i].classList.contains('active')) {
                                pagesLoaded[0].classList.add('active');
                            }
                        }

                    }
                    getGoods()
                }
            }
            event.target.closest('.top_tab').classList.add('active');
        }


    })
    // Переключение bottom табов
    let bottomTabs = document.querySelectorAll('.category');
    catalog.addEventListener('click', (event) => {
        
        if (event.target.closest('.category')) {
            
            for (item of bottomTabs) {
                item.classList.remove('active');
            }
            for (let a = 0; a < bottomTabs.length; a++) {
                
                bottomTabs[a].classList.remove('active');
                
                if (event.target.parentNode === bottomTabs[a]) {

                    async function getGoods() {

                        const response = await fetch(`http://junior-snowmobile.we-demonstrate2.ru/api/products?category_id=${a}`);
                        const goods = await response.json();
                        goodsContainer.innerHTML = "";
                        let goodsNew = Object.keys(goods.data);

                        for (i of goodsNew) {

                            if (goods.data[i]) {

                                goodsContainer.innerHTML += `
                                <div class="goods_item">
                                    <div class="name">${goods.data[i].name}</div>
                                    <div class="image"> <img src=${goods.data[i].picture}></div>
                                    <div class="price">${goods.data[i].price.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')}  ₽</div>
                                </div>
                            `
                            }

                        }


                        let pagination = document.querySelector('.pagination');
                        let pageNumber = document.querySelectorAll('.page_num');

                        if (!(pageNumber.length === goods.last_page)) {
                            pagination.innerHTML = "";
                            for (let i = 0; i < +goods.last_page; i++) {
                                    pagination.innerHTML += `
                                    <li class="page_number"><a class="page_num">${i+1}</a></li>
                                    `
                            }
                        }
                        let pagesLoaded = document.querySelectorAll('.page_num');
                        for(let i=0; i<pagesLoaded.length; i++) {
                            if(!pagesLoaded[i].classList.contains('active')) {
                                pagesLoaded[0].classList.add('active');
                            }
                        }

                    }
                    getGoods()
                }
            }
            event.target.closest('.category').classList.add('active');


        }
    })

    // Получение списка городов и дилеров
    let mapContainer = document.querySelector('.map_container');
    let addresses = document.querySelector('.adresses');
    async function getDealers() {

        const response = await fetch('http://junior-snowmobile.we-demonstrate2.ru/api/dealers');
        const dealers = await response.json();


        const response2 = await fetch('http://junior-snowmobile.we-demonstrate2.ru/api/cities');
        const citiesApi = await response2.json();



        // Считываем куки пользователя
        function readCookieCity(name) {
            let matches = document.cookie.match(new RegExp(
                "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
            ));
            return decodeURIComponent(matches) ? decodeURIComponent(matches[1]) : undefined;
        }
        let chosenCookieCity = readCookieCity('name_city');

        let sidebarBottom = document.querySelector('.bottom_sidebar');
        let maps = document.querySelectorAll('.map_item');
        let mapMain = document.querySelector('.map_main');

        // Обновляем данные на вкладке "Дилеры"
        sidebarBottom.innerHTML = "";
        for (let y = 0; y < maps.length; y++) {
            maps[y].classList.remove('active');
        }
        let test = readCookieCity('name_city');

        for (let i = 0; i < cities.length; i++) {
                cities[i].textContent = test;
        }


        for (let i = 0; i < citiesApi.length; i++) {
            if (chosenCookieCity.trim() === citiesApi[i].name) {
                for (let x = 0; x < dealers.length; x++) {

                    if (+dealers[x].city_id === i + 1) {
                        maps[i].classList.add('active');
                        sidebarBottom.innerHTML += `
                        <div class="bottom_sidebar_item">
                            <div class="name">${dealers[x].name}</div>
                            <div class="address feature">${dealers[x].address}</div>
                            <div class="tel feature">${dealers[x].phone}</div>
                            <div class="mail feature">${dealers[x].email}</div>
                            <div class="website feature">${dealers[x].site}</div>
                            <hr>
                        </div>
                        `
                    }
                }
            }
        }


        // Конец считывания кук пользователя



        let dealersList = cityPopup.querySelectorAll('.item');
    }
    // Кнопка показать еще 
    document.addEventListener('click', (event) => {

        let allPageNumbers = document.querySelectorAll('.page_num');
       
        if (event.target.classList.contains('show_more')) {
            for(let x=0; x<allPageNumbers.length; x++) {

                if(allPageNumbers[x].classList.contains('active')) {
                    allPageNumbers[x].classList.remove('active');
                    
                    async function getGoods() {
                        
                        
                            const response = await fetch(`http://junior-snowmobile.we-demonstrate2.ru/api/products?page=${x+2}`);
                            const goods = await response.json();
        
                            
                            for (let i = (x+1) * goods.per_page; i < goods.per_page * (x+2); i++) {
                                
                                if (goods.data[i]) {
                                    
                                    goodsContainer.innerHTML += `
                                        <div class="goods_item">
                                            <div class="name">${goods.data[i].name}</div>
                                            <div class="image"> <img src=${goods.data[i].picture}></div>
                                            <div class="price">${goods.data[i].price.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')}  ₽</div>
                                        </div>
                                    `
                                }
        
                            }
        
        
                            let pagination = document.querySelector('.pagination');
                            let pageNumber = document.querySelectorAll('.page_num');
                            if (!(pageNumber.length === (goods.last_page - 1))) {
        
                            } else {
                                pagination.innerHTML = "";
                                for (let i = 0; i < +goods.last_page; i++) {
                                    pagination.innerHTML += `
                            <li class="page_number"><a class="page_num">${i+1}</a></li>
                            `
                                }
                            }
                            
                        
        
                        allPageNumbers[x+1].classList.add('active');
                    }
                    getGoods()

                    
                }
            }
            

        }
    })

    const sendForm = () => {
        const postData = (body) => {
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

})