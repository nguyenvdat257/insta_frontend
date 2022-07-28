import { createSlice } from '@reduxjs/toolkit';
import { myConfig } from '../config';
import { callApi } from './actions';
import { toastActions } from './toast-slice';

const postAddSlice = createSlice({
    name: 'postAdd',
    initialState: {
        type: '',
        images: [],
        croppedImages: [],
        crops: [],
        zooms: [],
        message: '',
        showMainModal: false,
        showDiscardModal: false,
        sendingData: false,
        submittedData: false,
        currentImgIndex: 0,
        imageLoaded: false,
        page: 0,
        panelWidth: 0,
        panelHeight: 0,
    },
    reducers: {
        setType(state, action) {
            state.type = action.payload;
        },
        setShowMainModal(state, action) {
            state.showMainModal = action.payload;
        },
        setShowDiscardModal(state, action) {
            state.showDiscardModal = action.payload;
        },
        setMessage(state, action) {
            state.message = action.payload;
        },
        setCurrentImgIndex(state, action) {
            state.currentImgIndex = action.payload;
        },
        setCroppedImg(state, action) {
            state.croppedImages[state.currentImgIndex] = action.payload;
        },
        setCrop(state, action) {
            state.crops[state.currentImgIndex] = action.payload;
        },
        setZoom(state, action) {
            state.zooms[state.currentImgIndex] = action.payload;
        },
        setSendingData(state, action) {
            state.sendingData = action.payload;
        },
        setSubmittedData(state, action) {
            state.submittedData = action.payload;
        },
        closeMainModal(state, action) {
            state.type = '';
            state.showMainModal = false;
            state.showDiscardModal = false;
            state.currentImgIndex = 0;
            state.sendingData = false;
            state.submittedData = false;
            state.images = [];
            state.croppedImages = [];
            state.crops = [];
            state.zooms = [];
            state.message = '';
            state.imageLoaded = false;
            state.page = 0;
        },
        addImage(state, action) {
            state.images.push(action.payload.image);
            state.croppedImages.push(null);
            state.crops.push({ x: 0, y: 0 });
            state.zooms.push(1);
            if (action.payload.isLast) {
                state.imageLoaded = true;
            }
        },
        setPage(state, action) {
            state.page = action.payload;
        },
        setImageLoaded(state, action) {
            state.imageLoaded = action.payload;
        },
        setPanelSize(state, action) {
            state.panelHeight = action.payload.height;
            state.panelWidth = action.payload.width;
        }
    }
})


export const postAddActions = postAddSlice.actions;

export const callPostAdd = (formData) => {
    const url = myConfig.hostName + '/posts/';
    const method = 'POST';
    const successHandler = (data) => postAddActions.setSubmittedData(true);
    const failHandler = (data) => toastActions.setIsShow(myConfig.getError);
    const exceptHandler = () => toastActions.setIsShow(myConfig.serverError);
    const before = () => postAddActions.setSendingData(true);
    const afterConnected = () => postAddActions.setSendingData(false);
    const afterUnconnected = () => postAddActions.setSendingData(false);
    return callApi(url, method, formData, successHandler, failHandler, exceptHandler, before, afterConnected, afterUnconnected);
}

export const callStoryAdd = (formData) => {
    const url = myConfig.hostName + '/stories/';
    const method = 'POST';
    const successHandler = (data) => postAddActions.setSubmittedData(true);
    const failHandler = (data) => toastActions.setIsShow(myConfig.getError);
    const exceptHandler = () => toastActions.setIsShow(myConfig.serverError);
    const before = () => postAddActions.setSendingData(true);
    const afterConnected = () => postAddActions.setSendingData(false);
    const afterUnconnected = () => postAddActions.setSendingData(false);
    return callApi(url, method, formData, successHandler, failHandler, exceptHandler, before, afterConnected, afterUnconnected);
}
export default postAddSlice;