import {createSelector, createSlice} from "@reduxjs/toolkit";
import {Theme} from "../../utils/theme";
import {RootState} from "../store";

const initialState = {
    transactionData: [
        {
            date: '2020/11/15',
            value: 139.42,
            color: 'primary',
            id: '245673'
        },
        {
            date: '2021/04/20',
            value: 281.23,
            color: 'orange',
            id: '245672'
        },
        {
            date: '2021/02/25',
            value: 198.54,
            color: 'yellow',
            id: '245671'
        },
        {
            date: '2021/07/25',
            value: 131.54,
            color: 'blue',
            id: '245670'
        }
    ] as TransactionType[]
}

const reducer = createSlice({
    name: 'transactionsReducer',
    initialState,
    reducers: {
        setTransactionsData: (_state, _action) => {

        }
    }
})

export const {setTransactionsData} = reducer.actions
export const transactionsReducer = reducer.reducer

const selectorTransactionsData = (state: RootState) => state.transactions.transactionData
export let getTransactionsData = createSelector(selectorTransactionsData, ((res) => {
    return res.slice().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}))
type TransactionType = { date: string, value: number, id: string, color?: keyof Theme['colors'] }
