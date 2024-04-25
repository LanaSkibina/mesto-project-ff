// Настройки валидации
export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
}


// Функция проверки валидности всех инпутов формы (есть ли хоть одно невалидное)
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}


// Функция переключения состояния активности кнопки отправки формы
// в зависимости от результата проверки валидности полей 
const toggleButtonState = (inputList, buttonElement, validationConfig) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(validationConfig.inactiveButtonClass);
      buttonElement.setAttribute("disabled", "");
    } else {
      buttonElement.classList.remove(validationConfig.inactiveButtonClass); 
      buttonElement.removeAttribute("disabled");    
    }
  }

    
// Функция показа сообщения с ошибкой
const showInputError = (formElement, inputElement, errorMessage, validationConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.classList.add(validationConfig.errorClass);
  errorElement.textContent = errorMessage;
}


// Функция очистки сообщения с описанием ошибки
const hideInputError = (formElement, inputElement, validationConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.errorClass);
  errorElement.textContent = '';
}


// Функция проверки валидности полей формы и показа-сокрытия сообщений об ошибках
const isValid = (formElement, inputElement, validationConfig) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      validationConfig,
    );
  } else {
    hideInputError(formElement, inputElement, validationConfig);
  }
}


// Функиця добавления обработчиков на все инпуты формы и переключения кнопки сабмита
const setEventListeners = (formElement, validationConfig) => {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
  
  toggleButtonState(inputList, buttonElement, validationConfig);
  
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, validationConfig);
      toggleButtonState(inputList, buttonElement, validationConfig);
    });
  });
}


// Включение валидации форм
export const enableValidation = (validationConfig) => {
  // собираем массив из форм
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  // перебором массива вешаем обработчики
  formList.forEach((formElement) => {
    setEventListeners(formElement, validationConfig);
  });
}

  
// Функция очистки ошибок валидации и отключения активности кнопки сабмита
export const clearValidation = (formElement, validationConfig) => {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
  
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, validationConfig);
  });

  toggleButtonState(inputList, buttonElement, validationConfig);
}

