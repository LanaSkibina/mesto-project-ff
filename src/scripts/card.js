import { putLike, deleteLike, delCard } from './api.js';

// Темплейт карточки
export const cardTemplate = document.querySelector("#card-template").content;


// Создание карточки
export function createCard (cardData, userId, deleteCard, imageOnClick, likeCard) {
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = card.querySelector('.card__delete-button');
  const likeButton = card.querySelector('.card__like-button');

  // счетчик лайков и его заполнение
  const likeCounter = card.querySelector('.card__likes');
  likeCounter.textContent = cardData.likes.length;
    
  // формируем атрибуты карточки
  const cardImage = card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title');
    
  // заполняем данные по карточке: имя, линк и описание
  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardTitle.alt = cardData.name;

  // отображение значка корзинки для своей карточки
  const isMyCard = cardData._id;
  if (isMyCard != userId) {
    deleteButton.remove();
  } else {
    // Устанавливаем слушатель на корзинку
    deleteButton.addEventListener('click', () => deleteCard(card));
  }

  // проверяем на мой лайк 
  const isMyLike = cardData.likes.some((like) => {
    return like._id = userId;
  });
  if (isMyLike) {
    likeButton.classList.add('card__like-button_is-active');
  }

  //  Устанавливаем слушатель на лайк
  likeButton.addEventListener('click', (event) => {
    likeCard(event, cardData._id)
  });

  // Устанавливаем слушатель на открытие модального окна по клику
  cardImage.addEventListener('click', () => imageOnClick(cardData)); 
  
  return card;
};

// Удаление карточки
export function deleteCard(evt, card) {
  const cardToDelete = evt.target.closest('.card');
  delCard(card._id)
    .then(() => {
      cardToDelete.remove();
    })
    .catch((err) => {
      console.log(`Ошибка ${err.status}`)
    })
};
 
// Лайк карточки
export function likeCard(evt, id) {
  const likeButton = evt.target;
  const likesCount = likeButton.closest('.card__like_container').querySelector('.card__likes');
  if (!likeButton.classList.contains('card__like-button_is-active')) {
    putLike(id)
      .then((card) => {
        likesCount.textContent = card.likes.length;
        likeButton.classList.toggle('card__like-button_is-active');
      });
  } else {
    deleteLike(id)
      .then((card) => {
        likesCount.textContent = card.likes.length;
        likeButton.classList.toggle('card__like-button_is-active');
      });
  }  
};

