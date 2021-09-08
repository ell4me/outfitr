import React, {Dispatch, SetStateAction, useCallback} from 'react';
import {Box} from "../../../utils/theme";
import {ScrollView} from "react-native";
import {Category} from "./Category";
import {useSelector} from "react-redux";
import {getCategoriesData} from "../../../redux/selectors/outfits-selector";

export const Categories = ({setCardsLabel, cardsLabel}: {cardsLabel:string[], setCardsLabel: Dispatch<SetStateAction<string[]>>}) => {
    const categoriesData = useSelector(getCategoriesData)
    const onPress = useCallback(
        (name) => {
            const newName = name.toLowerCase().split(' ').join('')
            const index = cardsLabel.indexOf(newName)
            if(index !== -1) {
                cardsLabel.splice(index, 1)
            } else {
                cardsLabel.unshift(newName)
            }
            setCardsLabel([...cardsLabel])
        }, [cardsLabel]);
    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{paddingHorizontal: 29}}>
            <Box style={{paddingTop: 28}} flexDirection={'row'} alignItems={'center'}>
                {categoriesData.map(({name, color}, i) => {
                    return <Category onPress={() => onPress(name)} {...{name, color}} key={i} />
                })}
            </Box>
        </ScrollView>
    );
};
