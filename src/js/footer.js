document.addEventListener('DOMContentLoaded', function () {

    const form = document.querySelector('.feedback-form');
    const emailInput = document.querySelector('.email');
    const submitButton = document.querySelector('.submit-button');

    submitButton.addEventListener('click', function (e) {
        e.preventDefault();

        if (emailInput.checkValidity()) {
            const email = emailInput.value;

            fetch('/your-backend-endpoint', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: email })
            })
                .then(response => {
                    if (response.status === 200) {
                        alert('Ви успішно підписалися на розсилку нових вправ!');
                        emailInput.value = '';
                    } else {
                        alert('Помилка під час відправки запиту. Будь ласка, спробуйте ще раз.');
                    }
                })
                .catch(error => {
                    alert('Помилка під час відправки запиту. Будь ласка, спробуйте ще раз.');
                });
        } else {
            alert('Будь ласка, введіть дійсну адресу електронної пошти.');
        }
    });
});

const socialIcons = document.querySelectorAll('.footer-soc-li');

socialIcons.forEach(icon => {
    icon.addEventListener('mouseenter', () => {
        icon.style.transform = 'scale(1.2)';
    });
    icon.addEventListener('mouseleave', () => {
        icon.style.transform = 'scale(1)';
    });

    
});
