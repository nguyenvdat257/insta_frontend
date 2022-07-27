import React, { useState, useEffect, useRef } from 'react'
import { Modal, CloseButton } from 'react-bootstrap'
import ProfileListItem from './ProfileListItem'
import { useDispatch} from "react-redux";
import { profileModalActions } from '../../store/profile-modal-slice';
import MySpinner from '../Common/Spinner';
import { callNextProfile } from '../../store/profile-actions';

const ProfileListModal = ({ showModal, setShowModal, getData, profiles }) => {
    const dispatch = useDispatch()
    const listInnerRef = useRef();
    const [gettingData, setGettingData] = useState(false);
    const handleCloseModal = e => {
        setShowModal(false);
        dispatch(profileModalActions.closeModal());
    };
    const onScroll = () => {
        if (listInnerRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
            if (scrollTop + clientHeight > scrollHeight - 0.5 && scrollTop + clientHeight < scrollHeight) {
                // TO SOMETHING HERE
                dispatch(callNextProfile(setGettingData));
            }
        }
    };
    useEffect(() => {
        dispatch(getData(setGettingData));
    }, []);
    return (
        <Modal centered show={showModal} onHide={handleCloseModal} dialogClassName='modal-custom-like' >
            <div className='modal-custom-header'><div>Likes</div><CloseButton className='modal-close-button' onClick={handleCloseModal} /></div>
            <div className='modal-custom-body' onScroll={() => onScroll()} ref={listInnerRef}>
                {!gettingData &&
                    profiles.map((profile, index) => (
                        <ProfileListItem profile={profile} />
                    ))
                }
                {gettingData && <MySpinner />}

            </div>
        </Modal>
    )
}

export default ProfileListModal