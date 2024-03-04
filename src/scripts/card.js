// Темплейт карточки
export const cardTemplate = document.querySelector("#card-template").content;


// Создание карточки
export function createCard (cardData, deleteCard, imageOnClick, likeCard) {
    const card = cardTemplate.querySelector('.card').cloneNode(true);
    const deleteButton = card.querySelector('.card__delete-button');
    const likeButton = card.querySelector('.card__like-button');
    
    const cardImage = card.querySelector('.card__image');
    const cardTitle = card.querySelector('.card__title');
  
    cardTitle.textContent = cardData.name;
    cardImage.src = cardData.link;
    cardTitle.alt = cardData.name;
  
    // Установливаем слушателей для клонированного элемента 
    // Удаление
    deleteButton.addEventListener('click', function() {
      const deleteItem = deleteButton.closest('.card');
      deleteCard(deleteItem);
    });
      
    // Лайк
    likeButton.addEventListener('click', () => likeCard(likeButton));
      
    // Открытие модального окна по клику
    cardImage.addEventListener('click', () => imageOnClick(cardData));
      
    return card;
  };

// Лайк
export function likeCard (button) {
  button.classList.toggle('card__like-button_is-active');
}


// Удаление карточки
export function deleteCard(item) {
  item.remove();
};

