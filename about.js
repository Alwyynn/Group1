document.addEventListener('DOMContentLoaded', function() {
    const names = document.querySelectorAll('.developer-name');
    const popup = document.getElementById('popup');
    const popupText = document.getElementById('popupText');
    const popupImage = document.getElementById('popupImage');
    const closeButton = document.getElementById('closeButton');

    // Convert NodeList to Array
    const namesArray = Array.from(names);

    // Array of image URLs corresponding to each developer
    const imageUrls = [
        'john_alwyn_decena.jpg',  // Replace with actual image URLs
        'jehoshaphat_ranola.jpg',
        'diechel_ann_arisgado.jpg',
        'mark_vincent_fernandez.jpg',
        'roque_jerico_turingan.jpg'
    ];

    namesArray.forEach((name, index) => {
        name.addEventListener('click', () => {
            // Check if the popup is already displayed
            if (popup.style.display === 'block') {
                return; // Do nothing if the popup is already displayed
            }
            // Change the text of the pop-up
            popupText.textContent = name.textContent;
            // Change the image source
            popupImage.src = imageUrls[index];
            popup.style.display = 'block';
        });
    });

    // Close the pop-up when clicking the close button
    closeButton.addEventListener('click', () => {
        popup.style.display = 'none';
    });

    // Remove this part to prevent the popup from closing when clicking outside of it
    /*
    document.addEventListener('click', function(event) {
        if (!popup.contains(event.target) && !namesArray.includes(event.target)) {
            popup.style.display = 'none';
        }
    });
    */
});