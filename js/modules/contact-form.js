const form = document.getElementById('contactForm');
const phoneInput = document.getElementById('phone');
const success = document.querySelector('.contacts__success');

// Маска телефона
phoneInput.addEventListener('input', (e) => {
  let value = e.target.value.replace(/\D/g, '');

  if (value.startsWith('8')) value = '7' + value.slice(1);
  if (!value.startsWith('7')) value = '7' + value;

  let result = '+7';

  if (value.length > 1) {
    result += ' (' + value.substring(1, 4);
  }

  if (value.length >= 5) {
    result += ') ' + value.substring(4, 7);
  }

  if (value.length >= 8) {
    result += '-' + value.substring(7, 9);
  }

  if (value.length >= 10) {
    result += '-' + value.substring(9, 11);
  }

  e.target.value = result;
});

// Валидация и отправка
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = form.name;
  const phone = form.phone;
  const email = form.email;

  // Сброс ошибок
  [name, phone, email].forEach((field) => field.classList.remove('error'));

  let hasError = false;

  if (name.value.trim().length < 2) {
    name.classList.add('error');
    hasError = true;
  }

  if (phone.value.replace(/\D/g, '').length < 11) {
    phone.classList.add('error');
    hasError = true;
  }

  if (email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    email.classList.add('error');
    hasError = true;
  }

  if (hasError) return;

  const formData = new FormData(form);

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      form.reset();
      // Обновить CSRF токен без перезагрузки пока не будем // При необходимости можно сделать отдельный endpoint
      success.classList.add('show');

      gsap.fromTo(
        success,
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' },
      );

      setTimeout(() => {
        success.classList.remove('show');
      }, 5000);
    } else {
      alert(data.message || 'Ошибка отправки');
    }
  } catch (error) {
    alert('Не удалось отправить форму');
  }
});
