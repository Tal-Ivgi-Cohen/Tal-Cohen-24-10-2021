import { useSelector } from "react-redux"

export function Footer() {
  const { darkMod } = useSelector(state => state.weatherModule)
  const setClassName = () => {
    return darkMod ? 'app-footer dark flex align-center justify-center' : 'app-footer flex align-center justify-center'
  }
  return (
    <footer className={setClassName()}>
      <p>Copyrights Weather App By Tal Cohen 2021 &copy; </p>
    </footer>
  )
}
