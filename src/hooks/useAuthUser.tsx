import {useEffect} from "react";
import {firebase} from "../api";
import {useDispatch} from "react-redux";
import {saveInfoUserAfterAuth} from "../redux/reducers/config-reducer";

export const useAuthUser = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        const listener = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                dispatch(saveInfoUserAfterAuth({mail: user.email, name: user.displayName, id: user.uid}))
            } else {
                dispatch(saveInfoUserAfterAuth({mail: '', name: '', id: ''}))
            }
        })
        return () => listener()
    }, [])
}

