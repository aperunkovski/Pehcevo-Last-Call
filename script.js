document.addEventListener("DOMContentLoaded", () => {
    // Ефект за промена на активна состојба кај медот/сирењето/ракијата во секунда 5
    const tabButtons = document.querySelectorAll(".tab-btn");
    
    tabButtons.forEach(button => {
        button.addEventListener("click", () => {
            tabButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");
        });
    });

    // Опционално: Елегантна навигација која станува матна при скролање (Blur effect)
    const navbar = document.querySelector(".navbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.style.backdropFilter = "blur(10px)";
            navbar.style.background = "rgba(3, 23, 12, 0.2)";
            navbar.style.padding = "15px 4%";
            navbar.style.transition = "all 0.4s ease";
        } else {
            navbar.style.backdropFilter = "none";
            navbar.style.background = "transparent";
            navbar.style.padding = "30px 4%";
        }
    });
});


document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. ФУНКЦИОНАЛНОСТ ЗА НАВИГАЦИЈА (Скрол ефект за Почетна) ---
    const navbar = document.querySelector(".navbar");
    // Проверка дали сме на почетна (каде телото ја нема класата 'bg-cream')
    if (navbar && !document.body.classList.contains("bg-cream")) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 60) {
                navbar.style.backdropFilter = "blur(12px)";
                navbar.style.background = "rgba(3, 23, 12, 0.4)";
                navbar.style.padding = "16px 4%";
                navbar.style.borderBottom = "1px solid rgba(255, 255, 255, 0.08)";
            } else {
                navbar.style.backdropFilter = "none";
                navbar.style.background = "transparent";
                navbar.style.padding = "30px 4%";
                navbar.style.borderBottom = "none";
            }
        });
    }

    // --- 2. ИНТЕРАКТИВЕН POPUP (MODAL) ЗА СТРАНИЦАТА АТРАКЦИИ ---
    const modal = document.getElementById("attractionModal");
    
    // Скриптата ќе се изврши само ако модалот постои на тековната страница
    if (modal) {
        const modalImg = document.getElementById("modalImg");
        const modalTitle = document.getElementById("modalTitle");
        const modalCategory = document.getElementById("modalCategory");
        const modalMeta = document.getElementById("modalMeta");
        const modalDesc = document.getElementById("modalDesc");
        const closeBtn = document.querySelector(".modal-close-btn");
        const backdrop = document.querySelector(".modal-backdrop");
        const cards = document.querySelectorAll(".attraction-card");

        // Отворање модал и динамично полнење податоци
        cards.forEach(card => {
            card.addEventListener("click", () => {
                const title = card.getAttribute("data-title");
                const category = card.getAttribute("data-category");
                const meta = card.getAttribute("data-meta");
                const imgUrl = card.getAttribute("data-img");
                const desc = card.getAttribute("data-desc");

                // Доделување на вредности во поп-апот
                modalImg.src = imgUrl;
                modalImg.alt = title;
                modalTitle.innerHTML = title;
                modalCategory.innerText = category;
                modalMeta.innerText = `·   ${meta}`;
                modalDesc.innerText = desc;

                // Класа за анимација (Fade/Scale)
                modal.classList.add("open");
                document.body.style.overflow = "hidden"; // Спречува скролање под поп-апот
            });
        });

        // Затворање на поп-апот преку сите три методи
        if (closeBtn) closeBtn.addEventListener("click", closeModal);
        if (backdrop) backdrop.addEventListener("click", closeModal);
        
        window.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && modal.classList.contains("open")) {
                closeModal();
            }
        });

        function closeModal() {
            modal.classList.remove("open");
            document.body.style.overflow = ""; // Го враќа скролањето на сајтот
        }
    }

    // --- 3. ТАБОВИ ЗА ХРАНА/МЕД ОД ИНДЕКС СТРАНИЦАТА ---
    const tabButtons = document.querySelectorAll(".tab-btn");
    if (tabButtons.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener("click", () => {
                tabButtons.forEach(btn => btn.classList.remove("active"));
                button.classList.add("active");
            });
        });
    }
});




document.addEventListener("DOMContentLoaded", () => {
    // 1. Набљудувач на пресек (Intersection Observer) за ставките во времепловот
    const timelineItems = document.querySelectorAll(".timeline-item");
    
    const observerOptions = {
        root: null,
        rootMargin: "0px 0px -120px 0px",
        threshold: 0.15
    };

    const timelineObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });

    // 2. Логика за прогресивната линија и мазен паралакс ефект без ротирање
    const timelineSection = document.querySelector(".section-timeline");
    const progressLine = document.querySelector(".timeline-progress");
    const ghostImages = document.querySelectorAll(".timeline-bg-ghost");

    window.addEventListener("scroll", () => {
        if (!timelineSection || !progressLine) return;

        const sectionRect = timelineSection.getBoundingClientRect();
        const screenHeight = window.innerHeight;

        // Кога секцијата е активна на екранот
        if (sectionRect.top < screenHeight && sectionRect.bottom > 0) {
            const sectionTotalHeight = sectionRect.height;
            const scrolledIntoSection = screenHeight - sectionRect.top;
            
            // Пресметка за висината на напредокот на линијата (во %)
            let percentage = (scrolledIntoSection / sectionTotalHeight) * 100;
            percentage = Math.min(Math.max(percentage, 0), 100);
            progressLine.style.height = `${percentage}%`;

            // Мазен вертикален паралакс движење (без никаква ротација)
            ghostImages.forEach((img, index) => {
                const speed = (index + 1) * 0.12; 
                const offset = (screenHeight - sectionRect.top) * speed;
                
                // Сликите се целосно исправени и се лизгаат суптилно само по Y оската
                if (index === 0) {
                    img.style.transform = `translateY(${offset * 0.12}px)`;
                } else if (index === 1) {
                    img.style.transform = `translateY(${-offset * 0.12}px)`;
                } else {
                    img.style.transform = `translateY(${offset * 0.08}px)`;
                }
            });
        }
    });
});



document.addEventListener('DOMContentLoaded', () => {
    // 1. Мобилно Мени (Hamburger Toggle)
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('mobile-active');
            
            // Промена на 'aria-expanded' за подобра пристапност (Accessibility)
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
        });

        // Затвори го менито ако се кликне надвор од него
        document.addEventListener('click', (event) => {
            if (!navMenu.contains(event.target) && !menuToggle.contains(event.target)) {
                navMenu.classList.remove('mobile-active');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // 2. Ефект при скролање на хедерот (Header Glassmorphism)
    const header = document.getElementById('mainHeader');
    
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // 3. Интерактивност на форми (Newsletter Submit)
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('.newsletter-input');
            if (emailInput && emailInput.value) {
                alert(`Ви благодариме за пријавувањето со е-пошта: ${emailInput.value}!`);
                emailInput.value = '';
            }
        });
    }
});


// ИНТЕРАКТИВНА МAПА ЗА PEHCEVO
document.addEventListener("DOMContentLoaded", function () {
    // Проверка дали елементот за мапа постои на тековната страница
    const mapContainer = document.getElementById('pehcevo-map');
    
    if (mapContainer) {
        // Координати за центарот на Пехчево
        const pehcevoCoords = [41.7621, 22.8884];
        
        // Иницијализација на мапата со дефиниран зум
        const map = L.map('pehcevo-map').setView(pehcevoCoords, 12);

        // Поставување на преубав минималистички слој на мапата (CartoDB Positron)
        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; OpenStreetMap contributors &copy; CARTO'
        }).addTo(map);

        // Листа на клучни локации во регионетот со координати
        const locations = [
            {
                name: "Град Пехчево",
                coords: [41.7621, 22.8884],
                desc: "Почетна точка на вашата рута. Прекрасна чаршија и музеј."
            },
            {
                name: "Пехчевски Водопади (Равна Река)",
                coords: [41.7345, 22.9320],
                desc: "Комплекс од неколку живописни водопади опкружени со букови шуми."
            },
            {
                name: "Врв Кадиица",
                coords: [41.7667, 22.9912],
                desc: "Највисокиот врв на Малешевските планини (1932м). Прекрасен панорамски поглед."
            },
            {
                name: "Врв Буковик",
                coords: [41.7912, 22.8550],
                desc: "Познат по своите густи четинарски еко-системи и чист планински воздух."
            }
        ];

        // Додавање на пиновите на мапата
        locations.forEach(function (loc) {
            const marker = L.marker(loc.coords).addTo(map);
            
            // Креирање стилизиран скокачки прозорец при клик на пинот
            marker.bindPopup(`
                <h4>${loc.name}</h4>
                <p>${loc.desc}</p>
            `);
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const routeMapContainer = document.getElementById('route-map');
    
    if (routeMapContainer) {
        // Координати на клучните дестинации
        const pehcevo = [41.7621, 22.8884];
        const skopje = [41.9981, 21.4254];
        const sofia = [42.6977, 23.3219];
        const thessaloniki = [40.6401, 22.9444];

        // 1. Иницијализирај ја мапата
        const map = L.map('route-map', {
            scrollWheelZoom: false // спречува несакано зумирање при скролање на страницата
        });

        // 2. Постави софистициран минималистички стил на мапата (CartoDB Light)
        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; OpenStreetMap contributors &copy; CARTO'
        }).addTo(map);

        // 3. Дефинирај ги патиштата користејќи попатни градови за линијата да биде природна
        const skopjeRoute = [
            skopje,
            [41.7151, 21.7724], // Велес
            [41.7454, 22.1994], // Штип
            [41.8710, 22.4855], // Кочани
            [41.9658, 22.7753], // Делчево
            pehcevo
        ];

        const sofiaRoute = [
            sofia,
            [42.2608, 23.1189], // Дупница
            [42.0206, 23.0943], // Благоевград
            [41.9790, 22.8420], // Граничен премин Делчево
            pehcevo
        ];

        const thessalonikiRoute = [
            thessaloniki,
            [40.9930, 22.8743], // Кукуш
            [41.4378, 22.6427], // Струмица
            [41.7064, 22.8525], // Берово
            pehcevo
        ];

        // 4. Нацртај ги полилиниите (рутите) со различни стилови во рамките на твојот бренд
        const routeSkopjeLine = L.polyline(skopjeRoute, {
            color: '#0D9488', // Твојот акцент $accent-teal
            weight: 4,
            opacity: 0.85,
            dashArray: '8, 8' // Да претставува испрекината линија на движење
        }).addTo(map);

        const routeSofiaLine = L.polyline(sofiaRoute, {
            color: '#1F2937', // Твојот темен текст $text-dark за контраст
            weight: 4,
            opacity: 0.75,
            dashArray: '8, 8'
        }).addTo(map);

        const routeSolunLine = L.polyline(thessalonikiRoute, {
            color: '#6B7280', // Неутрална $text-muted
            weight: 4,
            opacity: 0.75,
            dashArray: '8, 8'
        }).addTo(map);

        // 5. Креирај маркер за Пехчево (целта)
        const destinationMarker = L.circleMarker(pehcevo, {
            radius: 8,
            fillColor: '#0D9488',
            color: '#03170C',
            weight: 3,
            opacity: 1,
            fillOpacity: 1
        }).addTo(map);

        destinationMarker.bindPopup(`
            <div style="font-family: 'Inter', sans-serif; text-align: center;">
                <b style="font-size: 14px; color: #03170C;">Крајна дестинација: Пехчево</b><br>
                <span style="font-size: 12px; color: #6B7280;">Срцето на Малешевијата</span>
            </div>
        `).openPopup();

        // Постави маркери за почетните градови
        const cities = [
            { name: "Скопје", coords: skopje },
            { name: "Софија", coords: sofia },
            { name: "Солун", coords: thessaloniki }
        ];

        cities.forEach(city => {
            L.circleMarker(city.coords, {
                radius: 5,
                fillColor: '#03170C',
                color: '#FFFFFF',
                weight: 2,
                opacity: 1,
                fillOpacity: 1
            }).addTo(map).bindTooltip(city.name, {
                permanent: true,
                direction: 'top',
                className: 'city-tooltip'
            });
        });

        // 6. Автоматски прилагоди ја ширината на мапата за да ги собере сите градови на почетокот
        const bounds = L.latLngBounds([skopje, sofia, thessaloniki, pehcevo]);
        map.fitBounds(bounds, { padding: [50, 50] });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    
    // БАЗА НА ПОДАТОЦИ ЗА ПРЕПОРАЧАНИТЕ АТРАКЦИИ (Инспирирано од atrakcii.html)
    const attractionData = {
        "ravna-reka": {
            title: "Долина на Равна Река",
            img: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=800&q=80",
            desc: "Главното излетничко место и еколошка зона во Пехчево, обвиткано со густи шуми и идеално за лесни прошетки и кампување покрај реката."
        },
        "pehcevo-waterfalls": {
            title: "Пехчевски Водопади",
            img: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80",
            desc: "Скриен систем од седум живописни водопади на неколку километри од градот, уредени со дрвени патеки и планински мостови."
        },
        "bukovik-peak": {
            title: "Врв Буковик",
            img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
            desc: "Исклучителен планински предел богат со чист воздух, познат по прекрасните шумски екосистеми од црн бор и бука."
        },
        "kadiica": {
            title: "Извори под Кадиица",
            img: "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=800&q=80",
            desc: "Изворите лоцирани на највисокиот врв на Малешевските Планини, кои во текот на летото нудат неверојатна свежина и кристално ладна вода."
        },
        "st-petka": {
            title: "Манастир Св. Петка",
            img: "https://upload.wikimedia.org/wikipedia/commons/0/07/Crkva_Sv._Petar_i_Pavle_-_Pehcevo_04.jpg",
            desc: "Свет духовен комплекс сместен во недопрена природа, кој зрачи со мир, традиционална малешевска архитектура и вековна историја."
        },
        "maleshevo-range": {
            title: "Малешевски Планини",
            img: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?auto=format&fit=crop&w=800&q=80",
            desc: "Голем планински венец кој нуди панорамски погледи кои го одземаат здивот во есенските месеци кога шумата ги менува боите во златни нијанси."
        },
        "ravna-winter": {
            title: "Равна Река во Зима",
            img: "https://images.unsplash.com/photo-1482862549707-f63cb32c5fd9?auto=format&fit=crop&w=800&q=80",
            desc: "Зимска бајка обвиена во тишина, каде замрзнатите делови од реката и тешкиот снег на гранките создаваат филмски пејзаж."
        },
        "old-town": {
            title: "Старото маало во Пехчево",
            img: "https://upload.wikimedia.org/wikipedia/commons/7/70/Pehcevo_-_stara_arhitektura_05.jpg",
            desc: "Истражете ја рустичната архитектура во градот каде сè уште мириса на чад од букови дрва и се подготвуваат топли традиционални јадења."
        }
    };

    // СЕЛЕКТОРИ ЗА МОДАЛНИОТ ПРОЗОРЕЦ
    const modal = document.getElementById("attractionModal");
    const modalTitle = document.getElementById("modalTitle");
    const modalImg = document.getElementById("modalImg");
    const modalDesc = document.getElementById("modalDesc");
    const closeBtn = document.querySelector(".modal-close-btn");
    const overlay = document.querySelector(".modal-overlay");

    // Функција за отворање на модалот
    const tagButtons = document.querySelectorAll(".attraction-tag-btn");
    tagButtons.forEach(button => {
        button.addEventListener("click", function () {
            const attractionId = this.getAttribute("data-id");
            const data = attractionData[attractionId];

            if (data) {
                // Пополни ги податоците динамички
                modalTitle.textContent = data.title;
                modalImg.src = data.img;
                modalImg.alt = data.title;
                modalDesc.textContent = data.desc;

                // Прикажи го модалот со класата active
                modal.classList.add("active");
            }
        });
    });

    // Затвори на X копчето
    if (closeBtn) {
        closeBtn.addEventListener("click", closeModal);
    }

    // Затвори при клик надвор на оверлеј позадината
    if (overlay) {
        overlay.addEventListener("click", closeModal);
    }

    // Затвори со притискање на ESC копче
    window.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
            closeModal();
        }
    });

    function closeModal() {
        if (modal) {
            modal.classList.remove("active");
        }
    }
});






document.addEventListener("DOMContentLoaded", function () {
    
    // БАЗА НА ПОДАТОЦИ ЗА СМЕСТУВАЊАТА (Со 6 соодветни висококвалитетни слики за секоја локација)
    const stayDatabase = {
        "ravna-reka-lodge": {
            title: "Ravna Reka Lodge",
            type: "MOUNTAIN LODGE",
            desc: "A premium timber-framed lodge on the edge of the pine forest, minutes from the waterfalls trailhead. Experience absolute silence and direct access to mountain springs.",
            services: ["Бесплатен Wi-Fi", "Приватен паркинг", "Камин на дрва", "Поглед на шума", "Надворешна скара", "Планински велосипеди"],
            images: [
                "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=900&q=80",
                "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=900&q=80",
                "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=900&q=80",
                "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=900&q=80",
                "https://images.unsplash.com/photo-1542224566-6e85f2e6772f?auto=format&fit=crop&w=900&q=80",
                "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=80"
            ]
        },
        "kuka-malesevo": {
            title: "Kuka Maleševo",
            type: "FAMILY GUESTHOUSE",
            desc: "Restored stone house in the old town, run by a family with three generations of hospitality. Enjoy home-cooked traditional pastry and organic mountain honey every morning.",
            services: ["Традиционален појадок", "Двор со градина", "Кујна за гости", "Парно греење", "Кабловска ТВ", "Локален водич"],
            images: [
                "https://images.unsplash.com/photo-1587061949409-02df41d5e562?auto=format&fit=crop&w=900&q=80",
                "https://images.unsplash.com/photo-1542718610-a1d656d1884c?auto=format&fit=crop&w=900&q=80",
                "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=900&q=80",
                "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=900&q=80",
                "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=900&q=80",
                "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80"
            ]
        },
        "monastery-retreat": {
            title: "Monastery Retreat",
            type: "HERITAGE STAY",
            desc: "Simple, silent rooms adjoining the 18th-century chapel — optimized for travelers seeking absolute stillness, digital detox, and deep meditation.",
            services: ["Богата библиотека", "Историски амбиент", "Органска градина", "Мирна зона", "Пешачки патеки", "Планински чај"],
            images: [
                "https://upload.wikimedia.org/wikipedia/commons/0/07/Crkva_Sv._Petar_i_Pavle_-_Pehcevo_04.jpg",
                "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=900&q=80",
                "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=900&q=80",
                "https://images.unsplash.com/photo-1500627869374-13cd993b1115?auto=format&fit=crop&w=900&q=80",
                "https://images.unsplash.com/photo-1446329813274-7c9036bd9a1f?auto=format&fit=crop&w=900&q=80",
                "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=900&q=80"
            ]
        },
        "bukovik-hotel": {
            title: "Bukovik Boutique Hotel",
            type: "BOUTIQUE HOTEL",
            desc: "Twelve luxury rooms with breathtaking mountain views, a wood-fired sauna, and a slow-food restaurant sourcing ingredients entirely from the valley below.",
            services: ["Спа и Сауна", "Премиум ресторан", "Мини-бар во соба", "Надворешен базен", "Рум сервис", "Панорамски балкон"],
            images: [
                "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80",
                "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=900&q=80",
                "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=900&q=80",
                "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=900&q=80",
                "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=900&q=80",
                "https://images.unsplash.com/photo-1596524430615-b46475ddff6e?auto=format&fit=crop&w=900&q=80"
            ]
        }
    };

    // СЕЛЕКТОРИ ЗА МОДАЛОТ
    const modal = document.getElementById("stayModal");
    const modalTitle = document.getElementById("modalStayTitle");
    const modalType = document.getElementById("modalStayType");
    const modalDesc = document.getElementById("modalStayDesc");
    const modalServicesList = document.getElementById("modalServicesList");
    const activeImg = document.getElementById("activeModalImg");
    const thumbContainer = document.getElementById("thumbContainer");

    const closeBtn = document.querySelector(".close-modal-btn");
    const overlay = document.querySelector(".modal-overlay");
    const prevArrow = document.querySelector(".prev-arrow");
    const nextArrow = document.querySelector(".next-arrow");

    let currentStayKey = "";
    let currentImgIndex = 0;

    // СЛУШАЧ НА НАСТАНИ ЗА КОПЧИЊАТА „ВИДИ ПОВЕЌЕ“
    const viewMoreButtons = document.querySelectorAll(".btn-view-more");
    viewMoreButtons.forEach(button => {
        button.addEventListener("click", function() {
            currentStayKey = this.getAttribute("data-id");
            const stayData = stayDatabase[currentStayKey];

            if (stayData) {
                currentImgIndex = 0;
                
                // 1. Пополнување основни текст инфо
                modalTitle.textContent = stayData.title;
                modalType.textContent = stayData.type;
                modalDesc.textContent = stayData.desc;

                // 2. Вбризгување на услуги со елегантни SVG вектори штикли
                modalServicesList.innerHTML = "";
                stayData.services.forEach(service => {
                    const li = document.createElement("li");
                    li.innerHTML = `
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        <span>${service}</span>
                    `;
                    modalServicesList.appendChild(li);
                });

                // 3. Динамичко градење на thumbnails
                buildThumbnails(stayData.images);

                // 4. Поставување на почетната слика
                updateActiveImage(stayData.images);

                // Прикажување на модалот со класа
                modal.classList.add("active");
            }
        });
    });

    // КРЕИРАЊЕ НА THUMBNAILS (МИНИЈАТУРИ)
    function buildThumbnails(imagesArray) {
        thumbContainer.innerHTML = "";
        imagesArray.forEach((imgUrl, index) => {
            const img = document.createElement("img");
            img.src = imgUrl;
            img.alt = "Thumbnail";
            img.classList.add("thumb-img");
            if (index === 0) img.classList.add("active");

            // Промена при клик на минијатура
            img.addEventListener("click", function() {
                currentImgIndex = index;
                updateActiveImage(imagesArray);
            });

            thumbContainer.appendChild(img);
        });
    }

    // ОБНОВУВАЊЕ НА АКТИВНАТА СЛИКА
    function updateActiveImage(imagesArray) {
        activeImg.src = imagesArray[currentImgIndex];

        // Креирај активен статус кај точниот thumbnail
        const thumbs = thumbContainer.querySelectorAll(".thumb-img");
        thumbs.forEach((thumb, index) => {
            if (index === currentImgIndex) {
                thumb.classList.add("active");
            } else {
                thumb.classList.remove("active");
            }
        });
    }

    // ЛЕВА СТРЕЛКА
    if (prevArrow) {
        prevArrow.addEventListener("click", function() {
            const images = stayDatabase[currentStayKey].images;
            currentImgIndex = (currentImgIndex === 0) ? images.length - 1 : currentImgIndex - 1;
            updateActiveImage(images);
        });
    }

    // ДЕСНА СТРЕЛКА
    if (nextArrow) {
        nextArrow.addEventListener("click", function() {
            const images = stayDatabase[currentStayKey].images;
            currentImgIndex = (currentImgIndex === images.length - 1) ? 0 : currentImgIndex + 1;
            updateActiveImage(images);
        });
    }

    // ЗАТВОРАЊЕ НА МОДАЛОТ
    function closeModal() {
        if (modal) modal.classList.remove("active");
    }

    if (closeBtn) closeBtn.addEventListener("click", closeModal);
    if (overlay) overlay.addEventListener("click", closeModal);
    
    window.addEventListener("keydown", function (e) {
        if (e.key === "Escape") closeModal();
    });
});