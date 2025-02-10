import BaseScreen from "../components/BaseScreen"

const TransactionHistoryScreen = () => {
  return (
    <BaseScreen
      entity="historico_transacao"
      displayFields={["id_carteira", "id_criptoativo", "quantidade"]}
      formFields={["id_carteira", "id_criptoativo", "quantidade"]}
    />
  )
}

export default TransactionHistoryScreen

