import {useState, useEffect} from 'react'

function useDarkModeGridColors() {
  const [darkMode, setDarkMode] = useState(["#9c36b5", "#868e96"]);

  useEffect(() => {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setDarkMode(["#862e9c", "#495057"]);
    }
  }, []);
  return { darkMode, setDarkMode };
}



export { useDarkModeGridColors}