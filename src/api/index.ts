import Firebase from "firebase/app";
import 'firebase/auth'
import 'firebase/firestore'
import {SaveConfigureInfoType} from "../redux/reducers/config-reducer";


export const firebase = Firebase.initializeApp({
    apiKey: "AIzaSyBdrc161oVWwZgqoe1Yzjx32F7gbMKDaKQ",
    authDomain: "react-native-fashion-8001d.firebaseapp.com",
    projectId: "react-native-fashion-8001d",
    storageBucket: "react-native-fashion-8001d.appspot.com",
    messagingSenderId: "856576893052",
    appId: "1:856576893052:web:818f02f0fcd30e42d9a9f9"
})


export const authAPI = {
    signUp: ({email, password}: Auth) => {
        return firebase.auth().createUserWithEmailAndPassword(email, password).then(({user}) => user)
    },
    signIn: ({email, password}: Auth) => {
        return firebase.auth().signInWithEmailAndPassword(email, password).then(({user}) => user)
    },
    resetPassword: (email: string) => {
        return firebase.auth().sendPasswordResetEmail(email)
    },
    signOut: () => {
        return firebase.auth().signOut()
    }
}
export const updateAPI = {
    setName: (name: string) => {
        const user = firebase.auth().currentUser;
        return user?.updateProfile({
            displayName: name
        })
    },
    setNewUserInCollection: (data: SaveConfigureInfoType, id: string) => {
        return firebase.firestore().collection('users').doc(id).set({...data})
    },
    getAllUserInfo: (id: string) => {
        return firebase.firestore().collection('users').doc(id).get().then(doc => doc.data())
    },
    updatePersonalInfo: (data: { street?: string, genderType?: string }, id: string) => {
        Object.keys(data).forEach(key => data[key as keyof typeof data] === undefined && delete data[key as keyof typeof data])
        return firebase.firestore().collection('users').doc(id).set({...data}, {merge: true})
    }

}

type Auth = { email: string, password: string }
