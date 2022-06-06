//Import des modules pour la page de création
import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity, TextInput, View, Alert } from "react-native";
import styles from "../styles/styles";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  Nunito_400Regular,
  Nunito_700Bold
} from "@expo-google-fonts/nunito";

//Import des modules de Firebase
import { setDoc, doc, collection, onSnapshot } from "firebase/firestore";

//Import de la config de la base de données
import { auth, database } from "../firebase/config";

export default function CreateScreen({ navigation }) {
  let [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_700Bold
  });
  const [newname, setName] = useState("");
  const [newtype, setType] = useState("");
  const [newrdv, setRdv] = useState("");

  //Déclaration nb de médicaments
  var nbMed = 0;

  //Recupérer un utilisateur
  const uid = auth.currentUser.uid;

  //On recupère tous les médicaments
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(database, uid),
      (querySnapshot) => {
        querySnapshot.forEach(
          (doc) => {
            nbMed = parseInt(doc.id, 10);
          },
          function (error) {
            console.log(error);
          }
        );
      }
    );
    return () => unsubscribe();
  });

  //Ajout d'un médicament sur firestore
  const addMed = () => {
    if (newname !== "" && newtype !== "" && newrdv !== "") {
      nbMed += 1;
      setDoc(doc(database, uid, nbMed.toString()), {
        name: newname,
        type: newtype,
        rdv: newrdv
      });
      navigation.navigate("Menu");
    } else {
      Alert.alert("Veuillez remplir tous les champs");
    }
  };

  //Affichage des éléments la page
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Ajouter un médicament</Text>
        <TextInput
          style={styles.input}
          name="docName"
          placeholder="Nom du médicament"
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          style={styles.input}
          name="docType"
          placeholder="Type du médicament"
          onChangeText={(text) => setType(text)}
        />
        <TextInput
          style={styles.input}
          name="docRes"
          keyboardType="numeric"
          placeholder="Jour du rdv mensuel du restockage"
          onChangeText={(text) => setRdv(text)}
        />
        <TouchableOpacity style={styles.button} onPress={() => addMed()}>
          <Text style={styles.buttonTitle}>Enregistrer</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
