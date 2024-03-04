// Импорт стилей
import './pages/index.css';

// Импорт коробки с массивом карт
import { initialCards } from './scripts/cards.js';

// Импорт функций открытия и закрытия модального окна
import { openPopup, closePopup, closeEscape, closeOverlay } from './scripts/modal.js';

// Импорт функций создания и удаления карточек
import { createCard, deleteCard, likeCard, cardTemplate } from './scripts/card.js';

//DOM узлы
const placesContainer = document.querySelector('.places__list');


// Профиль
const profile = document.querySelector('.profile');
const profileTitle = profile.querySelector('.profile__title');
const profileSubtitle = profile.querySelector('.profile__description');
const editProfileButton = profile.querySelector('.profile__edit-button');
const profileAddButton = profile.querySelector('.profile__add-button');

// Окно редактирование профиля
const popupEditProfile = document.querySelector('.popup_type_edit');
const closePopupButton = document.querySelector('.popup__close');
const popupEditForm = document.forms['edit-profile'];
const saveEditFormButton = popupEditForm.querySelector('.popup__button');

// Инпуты окна редактирования профиля
const nameInput = popupEditForm.querySelector('.popup__input_type_name');
const jobInput = popupEditForm.querySelector('.popup__input_type_description');

// Окно добавления новой карточки
const popupAdd = document.querySelector('.popup_type_new-card');
const createButton = popupAdd.querySelector('.popup__button');
const popupAddForm = document.forms['new-place'];

// Инпуты окна добавления новой карточки
const popupAddPlaceName = popupAdd.querySelector('.popup__input_type_card-name');
const popupAddPlaceLink = popupAdd.querySelector('.popup__input_type_url');

// Окно просмотра изображения
const popupImage = document.querySelector('.popup_type_image');
const popupImageImg = popupImage.querySelector('.popup__image');
const popupImageTitle = popupImage.querySelector('.popup__caption');


// Обработчик клика по изображению на карточке
function imageOnClick(cardData) {
  openPopup(popupImage);
  popupImageImg.src = cardData.link;
  popupImageImg.alt = cardData.name;
  popupImageTitle.textContent = cardData.name;
  };



// Слушатель для кнопки редактирования профиля 
// При открытии формы редактирования профиля поля «Имя» и «О себе» 
// заполняются текущими значениями, которые отображаются на странице.
editProfileButton.addEventListener('click', () => {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;
    openPopup(popupEditProfile);
  });


// Универсальный обработчик всех кнопок закрытия
// находим все кнопки закрытия проекта по универсальному селектору
const closeButtons = document.querySelectorAll('.popup__close');
// Перебираем все кнопки закрытия
closeButtons.forEach((button) => {
  // и находим 1 раз ближайший к кнопке закрытия попап 
  const popup = button.closest('.popup');
  // устанавливаем обработчик закрытия на кнопку
  button.addEventListener('click', () => closePopup(popup));
});


// Обработчик «отправки» формы: погашение дефолтного поведения
function handleProfileFormSubmit (evt) {
    evt.preventDefault();
    evt.target.reset();
};


// Слушатель для сохранение измененных данных о пользователе 
popupEditForm.addEventListener('submit', (evt) =>{
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value; 
    handleProfileFormSubmit (evt);
    closePopup(popupEditProfile);
  });


// Слушатель на открытие модального окна для добавления карточки пользователем
profileAddButton.addEventListener('click', () => openPopup(popupAdd));


// Добавление всех карточек "из коробки" перебором массива 
initialCards.forEach(function(item) {
  placesContainer.prepend(createCard(item, deleteCard, imageOnClick, likeCard));
});


// Слушатель на добавление карточки через модальное окно
popupAddForm.addEventListener('submit', function(evt) {
  const dataCardNew = {
    name: popupAddPlaceName.value, 
    link: popupAddPlaceLink.value
  };
  placesContainer.prepend(createCard(dataCardNew, deleteCard, imageOnClick, likeCard)); 
  handleProfileFormSubmit(evt);
  closePopup(popupAdd); 
}); 
  
