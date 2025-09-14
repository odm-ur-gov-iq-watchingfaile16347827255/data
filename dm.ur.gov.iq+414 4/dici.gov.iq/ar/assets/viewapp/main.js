//? ==== main navbar effect/ burger btn
// ?----------
const burgerBtn = document.getElementById('burger-btn');

const header = document.querySelector('header');
const main = document.querySelector('main');

let flag = false;

burgerBtn.addEventListener('click', ()=> {
  if(!flag) {
    header.classList.add('open');
    main.classList.add('off');
    // Burger to Times(X) effect
    burgerBtn.classList.add('open');
    flag = true;
  } else {
    header.classList.remove('open');
    main.classList.remove('off');
    // Burger to Times(X) effect
    burgerBtn.classList.remove('open');
    flag = false;
  }
})

main.addEventListener('click', ()=> {
  if(flag) {
    header.classList.remove('open');
    main.classList.remove('off');
    // Burger
    burgerBtn.classList.remove('open');
    flag = false;
  } 
})


// ? Dropdown menu X1
const dropdownX1Btn = document. querySelectorAll('.btnX1');

dropdownX1Btn.forEach(BtnX1 => {
  
  BtnX1.addEventListener('click', () => {
    BtnX1.parentElement.classList.toggle('open');
  })
});

// ? Dropdown menu X2
// const dropdownX2Btn = document. querySelectorAll('.btnX2');

// dropdownX2Btn.forEach(BtnX2 => {
  
//   BtnX2.addEventListener('click', () => {
//     BtnX2.parentElement.classList.toggle('open');
//   })

// });


let dropdownX2Btn = $('.btnX2');

$(document).on('click','.btnX2', function(){

  // console.log($(this).parent());
  $(this).parent().toggleClass('open');
})



// ? Desktop search notch
let searchOpen = false;
const desktopSearch = document.querySelector('.desktop-search');

const searchNotch = document.querySelector('.search-slide');

desktopSearch.addEventListener('click', () => {
  // console.log('click');
  // if searchOpen = false
  if(!searchOpen) {
    searchNotch.classList.add('open');
    searchOpen = true;
  } else { 
    // if searchOpen = true
    searchNotch.classList.remove('open');
      searchOpen = false;
  }
});

main.addEventListener('click', () => {
  if (searchOpen) {
    searchNotch.classList.remove('open');
      searchOpen = false;
  }
})








