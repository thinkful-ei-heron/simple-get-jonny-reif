'use strict';


let doggoBreedImage = document.getElementById('doggo-breed');
let doggoPics = document.getElementById('doggo-pics');


function getDogBreed() {
    let breed = document.getElementById('breed').value;

    if(breed.includes(' ')) {
        breed = (breed.split(' ').reverse().join('/'))
    }

    fetch(`https://dog.ceo/api/breed/${breed}/images/random/1`)
        .then(response => response.json())
        .then(responseJson => renderBreed(displayImage(responseJson.message)))
}

function displayImage(src) {
    return `<span> <img width='auto' height='100px' src="${src}"/> </span>`
}

function getDogImage() {
    let count = document.getElementById('count').value;
    let images = [];
    doggoPics.innerHTML = '';
    validateCount(count);

    fetch(`https://dog.ceo/api/breeds/image/random/${count}`)
        .then(response => response.json())
        .then(responseJson => {
            const parsedJson = responseJson.message;
            console.log(parsedJson);
            parsedJson.forEach(message=> images.push(displayImage(message)))
        })
        .then(() => renderImages(images));
}

function watchForm() {
    document.getElementById('doggo-form').addEventListener('submit', (event => {
        event.preventDefault();
        getDogImage();
    }));
}
function watchBreedForm() {
    document.getElementById('doggo-breed-form').addEventListener('submit', (event => {
        event.preventDefault();
        getDogBreed();
    }));
}

function validateCount(count) {
    if(count <= 0 || count > 50) {
        throw new Error('Not in bounds: only accepts 1-50');
    }
    return count;

}
function renderBreed(image) {
    doggoBreedImage.innerHTML = image;
}
function renderImages(images) {
    images.forEach(image => doggoPics.innerHTML += image)
}

    console.log('App loaded! Waiting for submit!');
    watchForm();
watchBreedForm();
