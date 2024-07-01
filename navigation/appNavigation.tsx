import "react-native-gesture-handler";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import MovieScreen from "../screens/MovieScreen";
import SearchScreen from "../screens/SearchScreen";
import { DarkTheme } from "@react-navigation/native";
import FavoriteScreen from "../screens/FavoriteScreen";
import UpComingScreen from "../screens/UpComingScreen";
import PopularScreen from "../screens/PopularScreen";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }}>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Search" component={SearchScreen} />
      <Drawer.Screen name="Favorite" component={FavoriteScreen} />
      <Drawer.Screen name="Upcoming" component={UpComingScreen} />
      <Drawer.Screen name="Popular" component={PopularScreen} />
    </Drawer.Navigator>
  );
};

const AppNavigation = () => {
  return (
    <NavigationContainer theme={DarkTheme}>
      <Stack.Navigator>
        <Stack.Screen
          name="Drawer"
          options={{ headerShown: false }}
          component={DrawerNavigation}
        />
        <Stack.Screen
          name="Home"
          options={{ headerShown: false }}
          component={HomeScreen}
        />
        <Stack.Screen
          name="Movie"
          options={{ headerShown: false }}
          component={MovieScreen}
        />
        <Stack.Screen
          name="Search"
          options={{ headerShown: false }}
          component={SearchScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
