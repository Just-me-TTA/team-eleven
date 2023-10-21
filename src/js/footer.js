document.addEventListener("DOMContentLoaded", function () {
    const emailInput = document.getElementById("emailInput");
    const feedbackForm = document.querySelector(".feedback-form");

    feedbackForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const email = emailInput.value;
        if (!validateEmail(email)) {
            alert("Введіть правильну адресу електронної пошти!");
            return;
        }

        alert("Дякуємо за підписку!");
        emailInput.value = "";
    });

    function validateEmail(email) {
        const pattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
        return pattern.test(email);
    }
});
