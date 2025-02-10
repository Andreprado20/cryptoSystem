import BaseScreen from "../components/BaseScreen"

const WalletsScreen = () => {
  return <BaseScreen entity="carteiras" displayFields={["nome", "id_usuario"]} formFields={["nome", "id_usuario"]} />
}

export default WalletsScreen

