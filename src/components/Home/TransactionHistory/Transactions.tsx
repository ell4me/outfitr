import React from 'react';
import {Box, Text} from "../../../utils/theme";
import {ScrollView} from "react-native";
import {BorderlessButton} from 'react-native-gesture-handler'
import moment from "moment";
import {useSelector} from "react-redux";
import {getTransactionsData} from "../../../redux/reducers/transactions-reducer";


export const Transactions = ({pb}: { pb: number }) => {
    const transactionData = useSelector(getTransactionsData)
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <Box flex={1} pt={'l'} style={{paddingBottom: pb}}>
                {transactionData.map(({date, value, color, id}) => {
                    return (
                        <Box key={id} flex={1} style={{marginBottom: 32}} flexDirection={'row'}
                             justifyContent={'space-between'} alignItems={'center'}>
                            <Box>
                                <Box flexDirection={'row'} alignItems={'center'}>
                                    <Box mr={'xs'} width={6} height={6} borderRadius={'s'} backgroundColor={color}/>
                                    <Text variant={'title'} fontSize={16}>#{id}</Text>
                                </Box>
                                <Text variant={'text'} fontSize={13}
                                      color={'registrationText'}>${value} - {moment(new Date(date)).format('DD MMMM, YYYY')}</Text>
                            </Box>
                            <BorderlessButton>
                                <Text variant={'textBtn'} fontSize={14}>See more</Text>
                            </BorderlessButton>
                        </Box>
                    )
                })}
            </Box>
        </ScrollView>
    );
};
