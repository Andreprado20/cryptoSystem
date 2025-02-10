import BaseScreen from "../components/BaseScreen"

const UsersScreen = () => {
  return <BaseScreen entity="usuarios" displayFields={["nome", "login"]} formFields={["nome", "login", "senha"]} />
}

export default UsersScreen

