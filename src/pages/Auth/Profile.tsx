import React, {useEffect, useState} from 'react';
import axios from "axios";
import {LazyLoadImage} from "react-lazy-load-image-component";

interface profileType {
    username: string;
    id: string;
    profileImg: string;
    email: string;
}

const Profile = () => {
    // 프로파일정보
    const [profileInfo, setProfileInfo] = useState<profileType | null>(null)
    const getProfileData = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }
            const result = await axios.get('http://localhost:8000/api/auth', config)
            setProfileInfo(result.data.body)
            console.log('result', result.data.body)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getProfileData()
    }, [])

    return (
        <div className={'w-full h-full py-10 grid grid-cols-5 lg:grid-cols-11'}>
            <div className={'col-span-1'}/>

            {/*왼쪽박스*/}
            <div className={'border-2 border-gray-400 p-8 rounded-lg col-span-3 m-6'}>
                <div className={'flex justify-center '}>
                    <LazyLoadImage
                        // src={profileInfo?.profileImg ? profileInfo.profileImg : '/images/default_image.webp'}
                        src={'/images/default_image.webp'}
                        alt="Profile Image"
                        className={'h-full w-full rounded-lg border border-gray-600 '}
                    />
                </div>

                <div className={'flex flex-col items-center justify-center mt-4'}>
                    <button
                        className={"text-lg bg-violet-400 text-gray-200 w-full border border-gray-600 rounded-lg p-2"}>
                        Edit Personal Information
                    </button>

                    <button
                        className={"text-lg bg-violet-400 text-gray-200 w-full border border-gray-600 rounded-lg p-2 my-2"}>
                        Change Password
                    </button>

                    {/*<button>*/}
                    {/*    Cancel Membership*/}
                    {/*</button>*/}
                </div>
            </div>

            {/*오른쪽박스*/}
            <div className={'border-2 border-gray-400 px-16 py-8 rounded-lg col-span-6 m-6'}>
                <div className={'flex justify-start items-center bg-red-500'}>
                    <div className={'text-2xl w-48 text-gray-700 font-normal bg-yellow-500'}>
                        Username :
                    </div>
                    <input
                        type="text"
                        value={profileInfo?.username}
                        disabled
                        className="bg-white border-none p-2 rounded text-3xl text-gray-700 font-medium"
                    />
                </div>
                <div className={'text-2xl text-gray-700 font-medium'}>
                    email : {profileInfo?.email}
                </div>

            </div>

            <div className={'col-span-1'}/>
        </div>
    );
};

export default Profile;