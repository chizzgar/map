
(() => {
    const cities = [
        {
            name: 'Oviedo',
            data: 'Oviedo',
            coords: {
                top: 28,
                left: 175
            }
        },
        {
            name: 'Pamplona',
            data: 'Pamplona',
            coords: {
                top: 66,
                left: 419
            }
        },
        {
            name: 'Zaragoza',
            data: 'Zaragoza',
            coords: {
                top: 157,
                left: 458
            }
        },
        {
            name: 'Barcelona',
            data: 'Barcelona',
            coords: {
                top: 164,
                left: 639
            }
        },
        {
            name: 'Valladolid',
            data: 'Valladolid',
            coords: {
                top: 157,
                left: 236
            }
        },
        {
            name: 'Madrid',
            data: 'Madrid',
            coords: {
                top: 252,
                left: 292
            }
        },
        {
            name: 'Merida',
            data: 'Merida',
            coords: {
                top: 373,
                left: 136
            }
        },
        {
            name: 'Sevilla',
            data: 'Sevilla',
            coords: {
                top: 495,
                left: 152
            }
        },
        {
            name: 'Murcia',
            data: 'Murcia',
            coords: {
                top: 442,
                left: 455
            }
        },
        {
            name: 'Valencia',
            data: 'Valencia',
            coords: {
                top: 326,
                left: 499
            }
        },
        {
            name: 'Palma de Mallorca',
            data: 'Palma_de_Mallorca',
            coords: {
                top: 308,
                left: 685
            }
        },



        // {
        //     name: 'Toledo'
        // },
        // {
        //     name: 'Logrono'
        // },
        // {
        //     name: 'Santander'
        // },
        // {
        //     name: 'Vitoria'
        // },
        // {
        //     name: 'Sontiago de Compostela'
        // },

    ];

    const wrapper = document.querySelector('.map_wrapper');

    const mapContainer = wrapper.querySelector('.map_container');
    const dragElemContainer = wrapper.querySelector('.draggable_elems');


    const reloadTaskBtn = wrapper.querySelector('.reloadTask')
    const checkingTaskBtn = wrapper.querySelector('.checkingTask')
    const chek_answerTxt = wrapper.querySelector('.chek_answer')
    const checkTask = wrapper.querySelector('.checkTask');

    const numders_voice = document.getElementById('numders_voice');
    const numders_voice1 = document.getElementById('numders_voice1');
    const numders_voice2 = document.getElementById('numders_voice2');

    let isPlaying = false;




    // var playButton2 = document.getElementById('control');

    // playButton2.addEventListener('click', e => {
    //   e.preventDefault();
    //   isPlaying ? numders_voice2.pause() : numders_voice2.play();
    //   playButton2.classList.toggle('is--playing');
    // });
    // numders_voice2.onplaying = function () {
    //     isPlaying = true;
    // };
    // numders_voice2.onpause = function () {
    //     isPlaying = false;
    // };
    // numders_voice2.onended = function () {
    //     playButton2.classList.toggle('is--playing')
    //     isPlaying = false;
    // };





    // const playButton1 = document.querySelector('.button--play');
    // playButton1.addEventListener('click', () => {
    //     isPlaying ? numders_voice1.pause() : numders_voice1.play();
    //     playButton1.classList.toggle('button--active')
    // });
    // numders_voice1.onplaying = function () {
    //     isPlaying = true;
    // };
    // numders_voice1.onpause = function () {
    //     isPlaying = false;
    // };

    // numders_voice1.onended = function () {
    //     playButton1.classList.toggle('button--active')
    //     isPlaying = false;
    // };

//    let img_playSound = document.createElement('img');
//    img_playSound.src = 'Images_1/map_img/sound_textHeader.svg';
//    img_playSound.classList.add('map_soundIcon');


 


    const soundButton = wrapper.querySelector('.icon_speaker_button');
    soundButton.addEventListener('click', soundPlayPause, false);
    function soundPlayPause() {
        isPlaying ? numders_voice.pause() : numders_voice.play();
    }

    numders_voice.onplaying = function () {
        soundButton.classList.add('animatingSoundIconPlay');
        soundButton.classList.remove('staticSoundIconPause');
        isPlaying = true;
    };
    numders_voice.onpause = function () {
        soundButton.classList.remove('animatingSoundIconPlay');
        soundButton.classList.add('staticSoundIconPause');
        isPlaying = false;
    };

    numders_voice.onended = function () {
        soundButton.classList.remove('animatingSoundIconPlay');
        soundButton.classList.remove('staticSoundIconPause');
        isPlaying = false;
    };



    let winVar = 0;

    cities.forEach(elem => {
        createDragElems(elem);
        createDropPlaces(elem);
    });

    const inDokElems = wrapper.querySelectorAll('.dragElem')
    function createDragElems(elem) {
        let divDragWrapper = document.createElement('div');
        divDragWrapper.classList.add('dragElem');
        divDragWrapper.setAttribute('drag-set', elem.data);
        let dot_img = document.createElement('img');
        dot_img.setAttribute('src', 'Images_1/map_img/dot.png');
        dot_img.classList.add(`dot_img`);
        divDragWrapper.appendChild(dot_img);

        let citiesContentText = document.createTextNode(elem.name.replace(/ /g, "&nbsp;"));
        divDragWrapper.insertAdjacentHTML("beforeend", `<p>${citiesContentText.textContent}</p>`);
        dragElemContainer.appendChild(divDragWrapper);
    }

    function createDropPlaces(elem) {
        let divDrop = document.createElement('div');
        divDrop.classList.add('dropPlaceElem');
        divDrop.setAttribute('drop-set', elem.data);

        divDrop.style.top = `${elem.coords.top}px`;
        divDrop.style.left = `${elem.coords.left}px`;
        mapContainer.appendChild(divDrop);
    }






    inDokElems.forEach(dragElem => {
        dragElem.addEventListener('pointerdown', mouseDown)
    })


    let draggingItem;
    let elemBelow;
    function changeStylesAndAppend(startPlace, draggingElem) {
        draggingElem.style.position = "relative ";
        draggingElem.style.zIndex = null;
        draggingElem.style.top = null;
        draggingElem.style.left = null;
        startPlace.appendChild(draggingElem)
    }

    function mouseDown(event) {
        if (event.button !== 0) return;
        draggingItem = event.target;
        draggingItem.style.cursor = "grabbing";
        const elemDraggingBanBorder = wrapper;//элемент за границы которого запрещён вылет перетаскиваемой фигуры
        const elemDraggingStartPlace = dragElemContainer;  //элемент первоначального расположения перетаскиваемых фигур (стартовое состояние)

        draggingItem.style.touchAction = 'none'; //ОБЯЗАТЕЛЬНОЕ УСЛОВИЕ(МОЖНО УБРАТЬ И ПРОПИСАТЬ В СТИЛЬ САМОМУ ОБЪЕКТУ) 
        let shiftX = event.clientX - draggingItem.getBoundingClientRect().left;
        let shiftY = event.clientY - draggingItem.getBoundingClientRect().top;

        // ЛИММИТЫ КООРДИНАТ ОГРАНИЧИВАЮЩИЕ ВЫЛЕТ ПЕРЕТАСКИВАЕМОГО ЭЛЕМЕНТА ЗА БЛОК
        //  (ПО УМОЛЧАНИЮ interact_zadanie - РОДИТЕЛЬ ВАШЕГО БЛОКА)
        // let limits = {
        //     top: elemDraggingBanBorder.offsetTop,
        //     right: elemDraggingBanBorder.offsetWidth + elemDraggingBanBorder.offsetLeft,
        //     bottom: elemDraggingBanBorder.offsetHeight + elemDraggingBanBorder.offsetTop,
        //     left: elemDraggingBanBorder.offsetLeft
        // };

        draggingItem.style.position = 'absolute';
        draggingItem.style.zIndex = 1000;
        document.body.appendChild(draggingItem);

        moveAt(event.pageX, event.pageY);

        function moveAt(pageX, pageY) {
            draggingItem.style.left = pageX - shiftX + 'px';
            draggingItem.style.top = pageY - shiftY + 'px';
        }

        elemBelow = document.elementFromPoint(event.clientX, event.clientY);
        let currentDroppable = null;
        let clickWithoutMove = true;
        function onMouseMove(event) {
            // let newLocation = {
            //     x: limits.left,
            //     y: limits.top
            // };
            // if (event.pageX > limits.right) {
            //     newLocation.x = limits.right;
            // }
            // else if (event.pageX > limits.left) {
            //     newLocation.x = event.pageX;
            // }
            // if (event.pageY > limits.bottom) {
            //     newLocation.y = limits.bottom;
            // }
            // else if (event.pageY > limits.top) {
            //     newLocation.y = event.pageY;
            // }

            clickWithoutMove = false
            // moveAt(newLocation.x, newLocation.y);
            moveAt(event.pageX, event.pageY);


            if (!event.path.includes(draggingItem)) {
                window.addEventListener('pointerup', moveOut);
            }
            if (event.path.includes(draggingItem)) {
                window.removeEventListener('pointerup', moveOut);
            }

            draggingItem.style.visibility = 'hidden';
            elemBelow = document.elementFromPoint(event.clientX, event.clientY);
            draggingItem.style.visibility = 'visible';


            if (!elemBelow) return;

            // ОБРАБОТКА СОБЫТИЯ НАХОЖДЕНИЯ НАД БЛОКОМ И ВЫЛЕТА ИЗ НЕГО (ПО НЕОБХОДИМИОСТИ)


            let droppableBelow = elemBelow.closest('.dropPlaceElem'); // БЕРЁМ НУЖНЫЙ БЛОК 

            if (currentDroppable != droppableBelow) {
                if (currentDroppable) {
                    // ЛОГИКА ОБРАБОТКИ ПРОЦЕССА "ВЫЛЕТА" ИЗ DROPPABLE
                    leaveDroppable(currentDroppable);
                }
                currentDroppable = droppableBelow;
                // ЛОГИКА ОБРАБОТКИ ПРОЦЕССА, КОГДА МЫ "ВЛЕТАЕМ" В ЭЛЕМЕНТ
                if (currentDroppable) {
                    enterDroppable(currentDroppable);
                }
            }
        }

        // КОГДА НАД ВЫБРАННЫМ БЛОКОМ
        function enterDroppable(currentDroppable) {
            if (!elemBelow.firstElementChild) {
                currentDroppable.classList.add('map_dropScale');
            }

        }
        // КОДА ВЫЛЕТЕЛИ ИЗ БЛОКА
        function leaveDroppable(currentDroppable) {

            currentDroppable.classList.remove('map_dropScale');

        }

        document.addEventListener('pointermove', onMouseMove);

        // КОГДА ВО ВРЕМЯ ПЕРЕТАСКИВАНИЯ КУРСОР ВЫНЕСЛИ ЗА ПРЕДЕЛЫ ОКНА БРАУЗЕРА И ОТПУСТИЛИ ЗАХВАТ ЭЛЕМЕНТА
        function moveOut(e) {
            smoothTransition(draggingItem, elemDraggingStartPlace)
            setTimeout(() => changeStylesAndAppend(elemDraggingStartPlace, draggingItem), 1000);
            window.removeEventListener('pointerup', moveOut);
            document.removeEventListener('pointermove', onMouseMove);
        }

        // КОГДА КУРСОР В ЗОНЕ ДЛЯ ПЕРЕТАСКИВАНИЙ И ПОЛЬЗОВАТЕЛЬ ОТПУСТИЛ ЗАХВАТ ЭЛЕМЕНТА
        draggingItem.addEventListener('pointerup', onpointerup)
        function onpointerup(e) {
            startAction = true;
            if (clickWithoutMove) {
                smoothTransition(draggingItem, elemDraggingStartPlace)
                setTimeout(() => {
                    changeStylesAndAppend(elemDraggingStartPlace, draggingItem);
                }, 1000)
            }

            document.removeEventListener('pointermove', onMouseMove);

            // ЛОГИКА ОБРАБОТКИ ПОПАДАНИЯ НА НУЖНЫЙ БЛОК И НАОБОРОТ
            if (elemBelow.classList.contains('dropPlaceElem') && elemBelow.childNodes.length === 0) {
                // let new_shiftX = (e.clientX - elemBelow.getBoundingClientRect().left) - shiftX + 'px';
                // let new_shiftY = (e.clientY - elemBelow.getBoundingClientRect().top) - shiftY + 'px';
                // draggingItem.style.left = new_shiftX;
                // draggingItem.style.top = new_shiftY;
                currentDroppable.classList.remove('map_dropScale');
                changeStylesAndAppend(elemBelow, draggingItem)

            }
            else {
                smoothTransition(draggingItem, elemDraggingStartPlace);
                setTimeout(() => {
                    changeStylesAndAppend(elemDraggingStartPlace, draggingItem);
                }, 1000);


                // elems.forEach((e) => { e.classList.add('pointerEventsNone'); });
                // setTimeout(() => draggingItem.classList.add("scaleDragPlace"), 500);
                // setTimeout(() => draggingItem.classList.remove("scaleDragPlace"), 1000);
                // setTimeout(() => elems.forEach((e) => {
                //     if (e.parentElement.classList.contains('buildBlockDrop') && winState) {
                //         e.classList.add('pointerEventsNone');
                //     }
                //     else {
                //         e.classList.remove('pointerEventsNone');
                //     }

                // }), 1500);
            }
            draggingItem.removeEventListener('pointerup', onpointerup)
            draggingItem.style.cursor = "grab";
        };

        // function smoothTransition(draggingElem) {
        //     document.body.style.pointerEvents = 'none'
        //     inDokElems.forEach((e) => {
        //         e.removeEventListener('pointerdown', mouseDown);
        //     });
        //     let coordX,
        //         coordY
        //     draggingElem.classList.add('dragTransition')
        //     coordX = elemDraggingStartPlace.getBoundingClientRect().left + elemDraggingStartPlace.getBoundingClientRect().width / 2
        //     coordY = elemDraggingStartPlace.getBoundingClientRect().top + elemDraggingStartPlace.getBoundingClientRect().height / 2
        //     draggingElem.style.left = `${coordX}px`
        //     draggingElem.style.top = `${coordY}px`
        //     setTimeout(() => {
        //         draggingElem.classList.remove('dragTransition')
        //         document.body.style.pointerEvents = 'auto'
        //         inDokElems.forEach((e) => {
        //             e.addEventListener('pointerdown', mouseDown);
        //         });

        //     }, 1000)
        // }
    };



    function smoothTransition(draggingElem, elemDraggingStartPlace) {
        document.body.style.pointerEvents = 'none'
        inDokElems.forEach((e) => {
            e.removeEventListener('pointerdown', mouseDown);
        });
        let coordX,
            coordY
        draggingElem.classList.add('dragTransition');
        coordX = elemDraggingStartPlace.getBoundingClientRect().left + elemDraggingStartPlace.getBoundingClientRect().width / 2;
        coordY = elemDraggingStartPlace.getBoundingClientRect().top + elemDraggingStartPlace.getBoundingClientRect().height / 2;
        draggingElem.style.left = `${coordX}px`
        draggingElem.style.top = `${coordY}px`
        setTimeout(() => {
            draggingElem.classList.remove('dragTransition');
            document.body.style.pointerEvents = 'auto';
            inDokElems.forEach((e) => {
                e.addEventListener('pointerdown', mouseDown);
            });

        }, 1000);


    }





    reloadTaskBtn.addEventListener('click', () => {
        let dropPlace = wrapper.querySelectorAll('.dropPlaceElem');
        dropPlace.forEach((elem) => {
            elem.classList.remove('map_dropScale');
            elem.className = 'dropPlaceElem';
        });

        let dragElem = mapContainer.querySelectorAll('.dragElem');
        dragElem.forEach((elem) => {
            elem.style.position = 'absolute';
            console.log(elem.parentElement.getBoundingClientRect())
            // console.log(coordY)

            elem.style.top = `${elem.parentElement.getBoundingClientRect().top + elem.parentElement.getBoundingClientRect().height}px`;
            elem.style.left = `${elem.parentElement.getBoundingClientRect().left}px`;
            document.body.appendChild(elem);
            smoothTransition(elem, dragElemContainer);
            setTimeout(() => {
                changeStylesAndAppend(dragElemContainer, elem);
            }, 1000);
        });
        checkTask.style.background = 'transparent';
        chek_answerTxt.firstElementChild !== null && chek_answerTxt.removeChild(chek_answerTxt.firstElementChild);
        winVar = 0;

        inDokElems.forEach((elem) => {
            elem.style.pointerEvents = 'auto';
        });
    });

    checkingTaskBtn.addEventListener('click', () => {
        let dropPlace = mapContainer.querySelectorAll('.dropPlaceElem');
        dropPlace.forEach((elem) => {
            if (elem.childElementCount < 1) {
                elem.classList.add('dropWrongColor')
            }
            if (elem.childNodes.length > 0) {
                console.log()
                if (elem.attributes.getNamedItem("drop-set").value === elem.firstElementChild.attributes.getNamedItem("drag-set").value) {
                    elem.classList.add('dropRightColor')
                    winVar++
                }
                else {
                    elem.classList.add('dropWrongColor')
                }
            }

        });

        if (winVar === cities.length) {
            chek_answerTxt.innerHTML = '<p><span>&#128516;</span>&#8195;Молодец!</p>'
            checkTask.style.background = 'lightgreen'
        } else {
            chek_answerTxt.innerHTML = '<p><span>&#128528</span>&#8195;Попробуй еще!</p>'
            checkTask.style.background = 'lightpink'
        }
        winVar = 0;


        inDokElems.forEach((elem) => {
            elem.style.pointerEvents = 'none';
        });

    });



})();












