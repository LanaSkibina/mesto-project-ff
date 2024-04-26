// параметры для авторизации
const config = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-11',
    headers: {
      authorization: 'ebd75bbf-801c-420f-8eeb-3830e7c3fdac',
      'Content-Type': 'application/json'
    }
  };
 
  
// проверяем, что с ответом всё ok, и берем его в формате json, или выводим ошибку с описанием
function checkResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${(res.status, res.statusText)}`);
  };


// получаем информацию о пользователе с сервера методом GET
export const getUserInfo = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
    .then(checkResponse);
};

  
// получаем набор карточек c сервера методом GET
export const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
    .then(checkResponse);
};
  

// получаем карточки в связке пользователем 
export const getAll = () => {
  return Promise.all([getInitialCards(), getUserInfo()]);
};

  
// добавление новой карточки методом POST
export const addNewCard = (card) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: card.name,
      link: card.link
    })
  })
  .then(checkResponse);
};


// удаление карточки методом DELETE
export const delCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(checkResponse);
};


// постановка лайка методом PUT
export const putLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
  .then(checkResponse);
};
 

// удаление лайка методом DELETE
export const deleteLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
  .then(checkResponse);
};


// pедактирование профиля методом PATCH
export const editProfile = (profile) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: profile.name,
      about: profile.about
    })
  })
  .then(checkResponse);
};
 

// редактирование аватара пользователя методом PATCH
export const editAvatar = (avatarLink) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarLink
    })
  })
  .then(checkResponse);
};

