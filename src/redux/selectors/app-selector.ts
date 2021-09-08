import {RootState} from "../store";

export const getSlides = (state: RootState) => state.app.slides
export const getAssetWelcome = (state: RootState) => state.app.assetWelcome
export const getContainerAssets = (state: RootState) => state.app.containerAssets
export const getMenuItems = (state: RootState) => state.app.menuItems
export const getDataNotifications = (state: RootState) => state.app.dataNotifications
export const getAppError = (state: RootState) => state.app.errorApp
