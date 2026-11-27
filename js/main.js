// Получаем модальное окно по id.
const orderDialog = document.getElementById('order-dialog');

// Получаем все кнопки заказа в карточках товаров.
const orderButtons = document.querySelectorAll('.product-card__button');

// Получаем кнопку закрытия модального окна.
const closeDialogButton = document.getElementById('close-order-dialog');

// Получаем кнопку-крестик в шапке модального окна.
const closeDialogIconButton = document.getElementById('close-order-dialog-icon');

// Получаем скрытое поле, в которое будет записан выбранный товар.
const selectedProductInput = document.getElementById('selected-product');

// Сводка ошибок формы (role="alert").
const formError = document.getElementById('order-form-error');

// Кнопка, которая открыла окно: вернём на неё фокус после закрытия.
let lastOpenButton = null;

// Перебираем все кнопки «Заказать».
orderButtons.forEach((button) => {
  button.addEventListener('click', () => {
    // Получаем название товара из data-атрибута.
    const productName = button.dataset.product;

    // Записываем название товара в скрытое поле формы.
    selectedProductInput.value = productName;

    // Запоминаем кнопку для возврата фокуса.
    lastOpenButton = button;

    // Открываем модальное окно.
    orderDialog.showModal();
  });
});

// Закрываем модальное окно по кнопке «Закрыть» и по крестику.
[closeDialogButton, closeDialogIconButton].forEach((button) => {
  button.addEventListener('click', () => {
    orderDialog.close();
  });
});

// При любом закрытии (кнопка, Esc) прячем ошибки и возвращаем фокус.
orderDialog.addEventListener('close', () => {
  formError.hidden = true;

  if (lastOpenButton) {
    lastOpenButton.focus();
  }
});
// Получаем форму заявки.
const orderForm = document.getElementById('order-form');

// Получаем сообщение об успешной отправке.
const successMessage = document.getElementById('success-message');

// Обрабатываем отправку формы.
orderForm.addEventListener('submit', (event) => {
  // Отменяем стандартную отправку формы,
  // потому что backend пока не подключён.
  event.preventDefault();

  // Сбрасываем предыдущие признаки ошибок.
  const formElements = Array.from(orderForm.elements);

  formElements.forEach((element) => {
    if (element.willValidate) {
      element.removeAttribute('aria-invalid');
    }
  });

  // Проверяем встроенные HTML-ограничения формы.
  if (!orderForm.checkValidity()) {
    formElements.forEach((element) => {
      if (element.willValidate && !element.checkValidity()) {
        element.setAttribute('aria-invalid', 'true');
      }
    });

    // Показываем текстовую сводку ошибок (озвучивается диктором).
    formError.hidden = false;

    // Показываем стандартные сообщения браузера
    // и переводим фокус на первое ошибочное поле.
    orderForm.reportValidity();
    return;
  }

  formError.hidden = true;

  // Показываем сообщение об успешной отправке.
  successMessage.hidden = false;

  // Очищаем форму.
  orderForm.reset();

  // Закрываем модальное окно.
  orderDialog.close();
});
