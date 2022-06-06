//Import des modules pour la page astuces
import React, { useLayoutEffect } from "react";
import { Text, TouchableOpacity, TextInput, View } from "react-native";
import styles from "../styles/styles";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  Nunito_400Regular,
  Nunito_700Bold
} from "@expo-google-fonts/nunito";
//Pour faire un lien vers google maps API
import * as Linking from 'expo-linking';

export default function InfoScreen({ navigation }) {
  let [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_700Bold
  });
 
  //Affichage des éléments la page
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Conseils et astuces</Text>
        <View style={styles.item}>
        <Text Text style={styles.itemName}>Voyage</Text>
        <Text Text style={styles.itemText}>Lors d'un voyage, il faut toujours penser à prendre vos médicaments.</Text>
        <Text Text style={styles.itemText}>Aussi, lors d'un long voyage il faut bien faire attention au lieu de conservation des médicaments.</Text>
        </View>
        <View style={styles.item}>
        <Text Text style={styles.itemName}>Médecin</Text>
        <Text Text style={styles.itemText}>Il faut prendre régulièrement rendez-vous chez un Médecin pour vérfier que vos médicament sont toujours adaptés à votre traitement.</Text>
        <TouchableOpacity
          style={styles.itemButtonHelp}
          onPress={() => Linking.openURL("https://www.google.com/maps/search/?api=1&query=médecin")}
        >
          <Text style={styles.itemButtonTitle}>Voir les Médecins du coin</Text>
        </TouchableOpacity>
        </View>
      </View>
    );
  }
}
