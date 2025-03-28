// document.getElementById("uploadForm").addEventListener("submit", function(e) {
//     e.preventDefault();
//     const fileInput = document.getElementById("imageInput");
//     const file = fileInput.files[0];
//
//     if (file) {
//         const reader = new FileReader();
//         reader.onloadend = function() {
//             const imgBase64 = reader.result;
//
//             // Send image data to the backend for prediction
//             fetch('/predict', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({ image: imgBase64 })
//             })
//             .then(response => response.json())
//             .then(data => {
//                 if (data.result) {
//                     document.getElementById('resultContainer').innerHTML = `<h2>Result: ${data.result}</h2>`;
//                 } else {
//                     document.getElementById('resultContainer').innerHTML = `<h2>Error during image prediction!</h2>`;
//                 }
//             })
//             .catch(error => {
//                 console.error('Error during prediction:', error);
//                 document.getElementById('resultContainer').innerHTML = `<h2>Error during image prediction!</h2>`;
//             });
//         };
//
//         reader.readAsDataURL(file); // Convert the image to base64
//     }
// });

document.getElementById("uploadForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const fileInput = document.getElementById("imageInput");
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onloadend = function() {
            const imgBase64 = reader.result;

            // Send image data to the backend for prediction
            fetch('/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ image: imgBase64 })
            })
            .then(response => response.json())
            .then(data => {
                if (data.result) {
                    document.getElementById('resultContainer').innerHTML = `<h2>Result: ${data.result}</h2>`;
                } else {
                    document.getElementById('resultContainer').innerHTML = `<h2>Error during image prediction!</h2>`;
                }
            })
            .catch(error => {
                console.error('Error during prediction:', error);
                document.getElementById('resultContainer').innerHTML = `<h2>Error during image prediction!</h2>`;
            });
        };

        reader.readAsDataURL(file); // Convert the image to base64
    }
});
