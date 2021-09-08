import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {DispatchType, getStateType} from "../store";
import {updateAPI} from "../../api";
import {DataConfigChange} from "../../components/Home/EditProfile/Config";

const initialState = {
    configInfo: {
        gender: [
            {
                value: 'men',
                name: 'For man'
            },
            {
                value: 'woman',
                name: 'For Women'
            },
            {
                value: 'both',
                name: 'Both'
            }
        ],
        sizes: [{value: 's'}, {value: 'm'}, {value: 'l'}, {value: 'xl'}, {value: 'xxl'}],
        outfitType: [
            {
                name: 'Sport',
                value: 'sport'
            },
            {
                name: 'Smart Casual',
                value: 'smartCasual'
            },
            {
                name: 'Casual',
                value: 'casual'
            }
        ],
        brands: [
            {
                value: 'nike',
                name: 'Nike',
                src: require('../../../assets/brands/nike.png')
            },
            {
                value: 'supreme',
                name: 'Supreme',
                src: require('../../../assets/brands/supreme.png')
            },
            {
                value: 'northFace',
                name: 'The North Face',
                src: require('../../../assets/brands/northFace.png')
            },
            {
                value: 'adidas',
                name: 'Adidas',
                src: require('../../../assets/brands/adidas.png')
            },
            {
                value: 'lacoste',
                name: 'Lacoste',
                src: require('../../../assets/brands/lacoste.png')
            },
            {
                value: 'carhartt',
                name: 'Carhartt',
                src: require('../../../assets/brands/carhartt.png')
            },
            {
                value: 'polo',
                name: 'The Polo Ralph Lauren',
                src: require('../../../assets/brands/polo.png')
            },
        ],
        colors: [{value: '#0C0D34'}, {value: '#FF0058'}, {value: '#50B9DE'}, {value: '#00D99A'}, {value: '#FE5E33'}, {value: '#FF87A2'}, {value: '#FFE4D9'}],
    },
    genders: [{value: 'female', name: 'Female'}, {value: 'male', name: 'Male'}],
    contentOutfitGenerator: [
        {
            title: 'Colors you prefer',
            desc: 'Based on your selections we will generate outfits matching your colors.',
        },
        {
            title: 'Brands you fancy',
            desc: 'Based on your selections we will generate outfits matching your brands.',
        },
        {
            title: 'Like some patterns?',
            desc: 'Based on your selections we will generate outfits matching your patterns.',
        }
    ],
    saveConfigureInfo: {genderType: '', street: ''} as SaveConfigureInfoType,
    infoUser: {
        mail: '',
        name: '',
        id: ''
    },
    isLoading: false
}

const reducer = createSlice({
    name: 'configReducer',
    initialState,
    reducers: {
        saveConfigInfo: (state, action: PayloadAction<DataConfigType>) => { //1 step in configuration after sign up
            state.saveConfigureInfo = {...state.saveConfigureInfo, ...action.payload}
        },
        saveAllConfigData: (state, action: PayloadAction<DataOutfitGenerator>) => { //save all config data after sign up
            state.saveConfigureInfo = {...state.saveConfigureInfo, ...action.payload}
        },
        // EDIT PROFILE --->
        savePersonalInfo: (state, {payload: {street, genderType, name}}: PayloadAction<PersonalInfo>) => { // save personal info
            if (genderType || street) {
                state.saveConfigureInfo = {
                    ...state.saveConfigureInfo,
                    genderType: genderType ? genderType : state.saveConfigureInfo.genderType,
                    street: street ? street : state.saveConfigureInfo.street
                }
            } else {
                state.infoUser = {
                    ...state.infoUser, name: name ? name : state.infoUser.name
                }
            }
        },
        saveChangedConfigData: (state, action: PayloadAction<{}>) => { // save configuration data
            state.saveConfigureInfo = {...state.saveConfigureInfo, ...action.payload}
        },
        saveInfoUserAfterAuth: (state, action) => {
            state.infoUser = action.payload
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload
        }
    }
})

export const {saveConfigInfo, saveAllConfigData, savePersonalInfo, saveChangedConfigData, saveInfoUserAfterAuth, setIsLoading} = reducer.actions
export const configReducer = reducer.reducer

export const setAllUserInfo = (data: DataOutfitGenerator) => async (dispatch: DispatchType, getState: getStateType) => {
    try {
        dispatch(saveAllConfigData(data))
        const id = getState().configuration.infoUser.id
        console.log(id)
        const dataUser = getState().configuration.saveConfigureInfo
        await updateAPI.setNewUserInCollection(dataUser, id)
    } catch (e) {
        console.log(e.message)
    }
}

export const setInitialConfigInfo = (id: string) => async (dispatch: DispatchType) => {
    dispatch(setIsLoading(true))
    const response = await updateAPI.getAllUserInfo(id) as SaveConfigureInfoType
    dispatch(saveAllConfigData(response))
    dispatch(setIsLoading(false))
}

export const updateUserConfigInfo = (data: DataConfigChange) => async (dispatch: DispatchType, getState: getStateType) => {
    dispatch(saveChangedConfigData(data))
    const id = getState().configuration.infoUser.id
    const dataUser = getState().configuration.saveConfigureInfo
    await updateAPI.setNewUserInCollection(dataUser, id)
}

export const updatePersonalInfo = (data: PersonalInfo) => async (dispatch: DispatchType, getState: getStateType) => {
    dispatch(savePersonalInfo(data))
    const id = getState().configuration.infoUser.id
    if(data.name) {
        await updateAPI.setName(data.name)
    } else {
        await updateAPI.updatePersonalInfo({street: data.street, genderType: data.genderType}, id)
    }

}

export type DataConfigType = { [key in 'gender' | 'sizes' | 'outfitType']: string[] }
export type DataOutfitGenerator = { [key in 'colors' | 'brands' | 'patterns']: string[] }
type PersonalInfo = { [key in 'name' | 'street' | 'genderType']?: string }
export type SaveConfigureInfoType = { genderType: string, street: string } & DataOutfitGenerator & DataConfigType
