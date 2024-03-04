/// Открытие модального окна
export function openPopup(popup) {
    popup.classList.add('popup_is-opened');
    popup.addEventListener('click', closeOverlay);
    document.addEventListener('keydown', closeEscape);
};


// Закрытие модального окна
export function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
    popup.removeEventListener('click', closeOverlay);
    document.removeEventListener('keydown', closeEscape);
  };


// Закрытие по Escape: крепим на нажатие после открытия
export function closeEscape(evt) {
    if (evt.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_is-opened');
      closePopup(openedPopup);
    }
  };

// Закрытие по оверлею: прикрепим на клик после открытия попапа
export function closeOverlay(evt) {
    // Проверяем, что кликнули по самому оверлею
    if (evt.target.classList.contains('popup')) {
      closePopup(evt.target);
    }
  };
