const token = "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";
const inputTxt = document.getElementById("input");
const image = document.getElementById("image");
const button = document.getElementById("btn");
const downloadBtn = document.getElementById("downloadBtn");

async function query() {
    image.src = "/load.gif"; // Shows loading image
    const response = await fetch(
        "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev",
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({ "inputs": inputTxt.value }),
        }
    );
    const result = await response.blob();
    return result;
}

button.addEventListener('click', async function () {
    query().then((response) => {
        const objectURL = URL.createObjectURL(response);
        image.src = objectURL;

        // Set up download link with text and icon
        downloadBtn.href = objectURL;
        downloadBtn.innerHTML = 'Download <i class="fa-solid fa-download"></i>';
        downloadBtn.style.display = "block"; // Show the download button
    });
});
