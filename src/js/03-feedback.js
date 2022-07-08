import throttle from 'lodash.throttle'
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import '../css/common.css';
import '../css/03-feedback.css';


const STORAGE_KEY = 'feedback-form-state';

const userData = {};

const refs = document.querySelector('.feedback-form');
console.log(refs);
initForm()
const onFormSubmit = (event) => {
    event.preventDefault();
    const { email, message } = event.target;
    console.log(email, message);

    if (email.value === "" || message.value === "") {
        Notify.failure('Заповніть всі поля та спробуйте ще раз!');
        console.log(('Заповніть всі поля та спробуйте ще раз!'));
        return;
    }
    const userData = {
        email: email.value,
        message: message.value,
    };
    console.log(userData);

    const formData = new FormData(refs);
    formData.forEach((value, name) => {
        console.log(value, name);
        userData[name] = value;
    });
    console.log(userData);
    event.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);
    Notify.success("Дякуємо за зворотній зв'язок!");
};

const onFormInput = (event) => {
    const { name, value } = event.target;
    let persistedData = localStorage.getItem(STORAGE_KEY);
    persistedData = persistedData ? JSON.parse(persistedData) : {};
    persistedData[name] = value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(persistedData))
    console.log(persistedData);
};

refs.addEventListener('submit', onFormSubmit);
refs.addEventListener('input', throttle(onFormInput, 500));

function initForm() {
    let persistedData = localStorage.getItem(STORAGE_KEY);
    console.log(persistedData);
    if (persistedData) {
        persistedData = JSON.parse(persistedData);
        console.log(persistedData);
        Object.entries(persistedData).forEach(([name, value]) => {
            refs.elements[name].value = value;
        });

    }
}
