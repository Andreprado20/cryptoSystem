import { NavigationContainer } from "@react-navigation/native"
import { createDrawerNavigator } from "@react-navigation/drawer"
import UsersScreen from "./screens/UsersScreen"
import WalletsScreen from "./screens/WalletsScreen"
import CryptoAssetsScreen from "./screens/CryptoAssetsScreen"
import TransactionHistoryScreen from "./screens/TransactionHistoryScreen"
import TransactionsScreen from "./screens/TransactionsScreen"

const Drawer = createDrawerNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Users">
        <Drawer.Screen name="Users" component={UsersScreen} />
        <Drawer.Screen name="Wallets" component={WalletsScreen} />
        <Drawer.Screen name="Crypto Assets" component={CryptoAssetsScreen} />
        <Drawer.Screen name="Transaction History" component={TransactionHistoryScreen} />
        <Drawer.Screen name="Transactions" component={TransactionsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}

