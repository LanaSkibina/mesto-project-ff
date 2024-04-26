// Импорт стилей
import './pages/index.css';

// Импорт функций открытия и закрытия модального окна
import { openPopup, closePopup, closeEscape, closeOverlay } from './scripts/modal.js';

// Импорт функций создания и удаления карточек
import { createCard, deleteCard, likeCard, cardTemplate } from './scripts/card.js';

// Импорт функций, связанных с валидацией
import { enableValidation, clearValidation } from './scripts/validation.js';

// Импорт функций для обмена данных с серверером
import { putLike, deleteLike, delCard, editProfile, addNewCard, editAvatar, getAll } from './scripts/api.js';

//DOM узлы
const placesContainer = document.querySelector('.places__list');

// Валидация
// Настройки валидации
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

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

// Редактирование аватара
const profileImage = document.querySelector('.profile__image');
const popupEditAvatar = document.querySelector('.popup_type_avatar');
const editAvatarLink = popupEditAvatar.querySelector('.popup__input_type_url');
const buttonSubmitEditProfile = popupEditProfile.querySelector(`${validationConfig.submitButtonSelector}`);
const newAvatarSubmitButton = popupEditAvatar.querySelector(`${validationConfig.submitButtonSelector}`);

// Окно добавления новой карточки
const popupAdd = document.querySelector('.popup_type_new-card');
const createButton = popupAdd.querySelector('.popup__button');
const popupAddForm = document.forms['new-place'];
const buttonSubmitAddCard = popupAdd.querySelector('.popup__button-add');
const buttonSubmitNewCard = popupAdd.querySelector(`${validationConfig.submitButtonSelector}`);

// Инпуты окна добавления новой карточки
const popupAddPlaceName = popupAdd.querySelector('.popup__input_type_card-name');
const popupAddPlaceLink = popupAdd.querySelector('.popup__input_type_url');

// Окно просмотра изображения
const popupImage = document.querySelector('.popup_type_image');
const popupImageImg = popupImage.querySelector('.popup__image');
const popupImageTitle = popupImage.querySelector('.popup__caption');


// Запуск валидации форм
enableValidation(validationConfig);


// Подгружаем все данные о пользователе и картинки
const setProfileData = (data) => {
  profileTitle.textContent = data.name;
  profileSubtitle.textContent = data.about;
  profileImage.style = `background-image: url('${data.avatar}')`;
};

getAll()
  .then(([cards, user]) => {
    cards.forEach((card) => {
      addCard(card, user._id, deleteCard, imageOnClick, likeCard); 
    })
    setProfileData(user);
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  })


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


// Обработчик клика по изображению на карточке
function imageOnClick(cardData) {
  openPopup(popupImage);
  popupImageImg.src = cardData.link;
  popupImageImg.alt = cardData.name;
  popupImageTitle.textContent = cardData.name;
};


// Аватар
// Слушатель на открытие окна редактирование аватара профиля
profileImage.addEventListener('click', () => {
  clearValidation(popupEditAvatar, validationConfig);
  openPopup(popupEditAvatar);
});

// Редактирование аватара профиля
function submitEditAvatar(evt) {
  evt.preventDefault();
  const newUrl = editAvatarLink.value;
  renderLoading(true, newAvatarSubmitButton);
  editAvatar(newUrl)
    .then((data) => {
      profileImage.style = `background-image: url(${data.avatar})`;
      closePopup(popupEditAvatar);
      editAvatarLink.value = '';
    })
    .catch((err) => {
      console.log(err.status);
    })
    .finally(() => {
      renderLoading(false, newAvatarSubmitButton);
    })
};

// Слушатель для сохранение измененных данных об аватаре пользователе
popupEditAvatar.addEventListener('submit', submitEditAvatar);


// Профиль
// Слушатель для кнопки редактирования профиля 
// При открытии формы редактирования профиля поля «Имя» и «О себе» 
// заполняются текущими значениями, которые отображаются на странице.
editProfileButton.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  clearValidation(popupEditProfile, validationConfig);
  openPopup(popupEditProfile);
});

// Редактирования профиля
const submitEditProfile = (evt) => {
  evt.preventDefault();
  renderLoading(true, buttonSubmitEditProfile);
  const nameInputValue = nameInput.value;
  const jobInputValue = jobInput.value;
  const profile = {
    name: nameInput.value,
    about: jobInput.value
  }
  editProfile(profile)
    .then((data) => {
      profileTitle.textContent = data.name;
      profileSubtitle.textContent = data.about;
      closePopup(popupEditProfile);
      nameInput.value = '';
      jobInput.value = '';
    })  
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, buttonSubmitEditProfile);
    });
};

// Слушатель для сохранение измененных данных о пользователе 
popupEditForm.addEventListener('submit', submitEditProfile);


// Карточки
// Слушатель на открытие модального окна для добавления карточки пользователем
profileAddButton.addEventListener('click', () => {
  popupAddForm.reset();
  clearValidation(popupAdd, validationConfig);
  openPopup(popupAdd);
});

// Функция добавления карточки в контейнер с карточками
function addCard(card, userId, deleteCard, imageOnClick, likeCard) {
  const cardToAdd = createCard(card, userId, deleteCard, imageOnClick, likeCard); 
  placesContainer.prepend(cardToAdd); 
};

// Добавление карточки через модальное окно
function submitPopupAdd(evt) {
  evt.preventDefault();
  renderLoading(true, buttonSubmitNewCard);
  const card = {
    name: popupAddPlaceName.value,
    link: popupAddPlaceLink.value
  }
  addNewCard(card) // отправляем данные на сервер
    .then((data) => {
      addCard(data, data.owner._id, deleteCard, imageOnClick, likeCard);
      closePopup(popupAdd);
      popupAddPlaceName.value = '';
      popupAddPlaceLink = '';
    })
    .catch((err) => {
      console.log(`Ошибка: ${err.status}`);
    })
    .finally(() => {
      renderLoading(false, buttonSubmitNewCard);
    })
};

// Слушатель на  сохранение добавленной карточки через модальное окно
popupAddForm.addEventListener('submit', submitPopupAdd); 


// наведение красотищи: улучшения UX, пока данные загружаются
const renderLoading = (isLoading, buttonSubmit) => {
  if (isLoading) {
    buttonSubmit.textContent = "Сохранение...";
  } else {
    buttonSubmit.textContent = "Сохранить";
  }
};
