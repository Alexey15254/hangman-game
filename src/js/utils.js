export const darkModeHandle = () => {
  const darkModeSwitcher = document.getElementById(`toggleDarkMode`);
  const htmlElement = document.documentElement;

  if (localStorage.getItem(`mode`) === `dark`) {
    htmlElement.classList.add(`dark`);
    darkModeSwitcher.checked = true;
  }

  darkModeSwitcher.addEventListener(`input`, () => {
    //Сложный метод
    //   if (htmlDocument.classList.contains("dark")) {
    //     htmlDocument.classList.remove("dark");
    //   } else {
    //     htmlDocument.classList.add("dark");
    //   }
    //Более удобный метод, который выполняет эту работу
    htmlElement.classList.toggle("dark");

    if (htmlElement.classList.contains("dark")) {
      localStorage.setItem(`mode`, `dark`);
    } else {
      localStorage.setItem(`mode`, `light`);
    }
  });
};
