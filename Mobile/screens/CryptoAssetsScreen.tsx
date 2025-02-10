import BaseScreen from "../components/BaseScreen"

const CryptoAssetsScreen = () => {
  return (
    <BaseScreen
      entity="criptoativos"
      displayFields={["nome", "codigo", "preco"]}
      formFields={["nome", "codigo", "preco"]}
    />
  )
}

export default CryptoAssetsScreen

