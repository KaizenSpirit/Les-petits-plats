const dropdowns = document.querySelectorAll('.dropdown');
const buttonClick = document.querySelectorAll('.btn');
const dropdownArrows = document.querySelectorAll('.dropdownArrow');


buttonClick.forEach((button, index) => {
  button.addEventListener('click', function () {
      dropdownArrows[index].classList.toggle('rotate180');
  });
});






