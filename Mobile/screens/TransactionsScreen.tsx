import BaseScreen from "../components/BaseScreen"

const TransactionsScreen = () => {
  return (
    <BaseScreen
      entity="transacao"
      displayFields={["id_carteira_origem", "id_carteira_destino", "id_criptoativo", "quantidade", "tipo"]}
      formFields={["id_carteira_origem", "id_carteira_destino", "id_criptoativo", "quantidade", "tipo"]}
    />
  )
}

export default TransactionsScreen

