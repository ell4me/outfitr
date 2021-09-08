import {RootState} from "../store";

export const getCardsOutfit = (state: RootState) => state.outfitIdeas.cards
export const getCategoriesData = (state: RootState) => state.outfitIdeas.categoriesData
export const getItemsFavourite = (state: RootState) => state.outfitIdeas.itemsFavourite
