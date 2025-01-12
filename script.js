document.getElementById('clientBriefForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Отримуємо дані з форми
    let formData = new FormData(this);

    fetch('/submit', {
        method: 'POST', // Тип запиту: POST, PUT, PATCH, DELETE тощо
        headers: {
            'Content-Type': 'application/json', // Вказуємо формат даних
        },
        body: JSON.stringify(
            Object.fromEntries(formData.entries())
        )
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        // return response.json(); // Розбираємо відповідь у форматі JSON
    })
    .then(data => console.log('Success:', data)) // Обробляємо успішну відповідь
    .catch(error => console.error('Error:', error)); // Обробляємо помилку

    // Можна обробити або записати їх у базу даних (за допомогою серверної частини)
    console.log('Форма надіслана:', Object.fromEntries(formData));

    // Показуємо підтвердження
    alert('Дякуємо за заповнення брифу! Ми зв’яжемося з вами найближчим часом.');
    this.reset(); // очищаємо форму після надсилання
});
