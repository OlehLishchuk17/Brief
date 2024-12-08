document.getElementById('clientBriefForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Отримуємо дані з форми
    let formData = new FormData(this);

    // Можна обробити або записати їх у базу даних (за допомогою серверної частини)
    console.log('Форма надіслана:', Object.fromEntries(formData));

    // Показуємо підтвердження
    alert('Дякуємо за заповнення брифу! Ми зв’яжемося з вами найближчим часом.');
    this.reset(); // очищаємо форму після надсилання
});