import {RootState} from "../store";

export const getConfigInfo = ({configuration: {configInfo}}: RootState) => configInfo
export const getSavedConfigInfo = ({configuration: {saveConfigureInfo}}: RootState) => saveConfigureInfo
export const getContentOutfitGenerator = ({configuration: {contentOutfitGenerator}}: RootState) => contentOutfitGenerator
export const getInfoUser = ({configuration: {infoUser}}: RootState) => infoUser
export const getGenders = ({configuration: {genders}}: RootState) => genders
export const getIsLoading = ({configuration: {isLoading}}: RootState) => isLoading
