import React, {useRef, useState} from 'react';
import MenuDesktop from "./MenuDesktop";
import {useNavigate} from "react-router-dom";
import {classNames} from "../../utiles/utiles";

const Navbar = () => {

    const navigate = useNavigate()
    const userData = null;
    const isAdmin = true;
    const loading = false;
    const [open, setOpen] = useState(false)
    const buttonRef = useRef<HTMLButtonElement>(null)
    const logout = () => {
    }
    const onMouseEnter = () => {

    }
    const onMouseLeave = () => {

    }



    return (
        <header className={'border-b '}>
            <MenuDesktop
                classNames={classNames}
                setOpen={setOpen}
                navigate={navigate}
                userData={userData}
                loading={loading}
                logout={logout}
                isAdmin={isAdmin}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                ref={buttonRef}
            />
        </header>
    );
};

export default Navbar;