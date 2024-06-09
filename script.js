document.addEventListener('DOMContentLoaded', () => {
    fetchImages();

    const uploadForm = document.getElementById('upload-form');
    uploadForm.addEventListener('submit', event => {
        event.preventDefault();
        uploadImage();
    });
});

async function fetchImages() {
    try {
        const response = await fetch('/images');
        const images = await response.json();
        const imageGallery = document.getElementById('image-gallery');
        imageGallery.innerHTML = '';
        images.forEach(image => {
            const imgElement = document.createElement('img');
            imgElement.src = image.url;
            imgElement.alt = image.title;
            imageGallery.appendChild(imgElement);
        });
    } catch (error) {
        console.error('Error fetching images:', error);
    }
}

async function uploadImage() {
    const title = document.getElementById('title').value;
    const imageFile = document.getElementById('image').files[0];

    const formData = new FormData();
    formData.append('title', title);
    formData.append('image', imageFile);

    try {
        const response = await fetch('/upload', {
            method: 'POST',
            body: formData
        });
        if (response.ok) {
            alert('Image uploaded successfully');
            fetchImages();
        } else {
            alert('Error uploading image');
        }
    } catch (error) {
        console.error('Error uploading image:', error);
    }
}
