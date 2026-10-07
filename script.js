let total = 0;

let amounts = document.querySelectorAll(".amount");
let times = document.querySelectorAll("input[type='time']");
let place = document.querySelectorAll("input[type='text']");

let button = document.querySelector("#calculateButton");
let deliveryList = document.querySelector("#deliveryList");

let distanceDisplay = document.querySelector("#distance");
let totalDisplay = document.querySelector("#total");

let startodometer = document.querySelector("#startodometer");
let endodometer = document.querySelector("#endodometer");
const allInputs = document.querySelectorAll("input");

allInputs.forEach((input, index) => {

    const savedValue =
        localStorage.getItem("input" + index);
if (savedValue !== null) {
    input.value = savedValue;
}
input.addEventListener("input", function() {
    localStorage.setItem("input" + index, input.value);
});
});


button.addEventListener("click", function() {

    total = 0;

    deliveryList.textContent = "";

    let distance =
        Number(endodometer.value) -
        Number(startodometer.value);

    distanceDisplay.textContent =
        "走行距離：" + distance + "km";


    for (let i = 0; i < amounts.length; i++) {

        total =
            total + Number(amounts[i].value);

    }


    totalDisplay.textContent =
        "合計：" + total + "円";


    for (let i = 0; i < times.length; i++) {

        if (times[i].value !== "") {

            deliveryList.innerHTML +=
                times[i].value + " / " +
                place[i].value + " / " +
                amounts[i].value + "円<br>";

        }

    }

});


let completeButton =
    document.querySelector("#completeButton");

let area =
    document.querySelector("#pdfArea");


completeButton.addEventListener("click", async function() {

    let canvas =
        await html2canvas(area);

    let image =
        canvas.toDataURL("image/png");


     const { jsPDF } = window.jspdf;

     let pdf =
        new jsPDF();
     const pageWidth = 190;
     const pageHeight = 277;

     const imgWidth = canvas.width;
     const imgHeight = canvas.height;

     const ratio = Math.min(
     pageWidth / imgWidth,
     pageHeight / imgHeight
     );

     const pdfWidth = imgWidth * ratio;
     const pdfHeight = imgHeight * ratio;

     pdf.addImage(
      image,
     "PNG",
     10,
     10,
     pdfWidth,
     pdfHeight
      );
      


    let pdfBlob =
        pdf.output("blob");


    let pdfUrl =
        URL.createObjectURL(pdfBlob);

     allInputs.forEach((input, index) => {
     localStorage.removeItem("input" + index);
     }); 



    window.location.href =
        pdfUrl;

});