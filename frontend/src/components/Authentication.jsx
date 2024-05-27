import React from 'react'
import { Link } from 'react-router-dom'

const Authentication = () => {

    const AuthButton = ({ text, link }) => (
        <Link to={link} className="
        h-10
        w-20
        flex
        justify-center
        items-center
        bg-blue-500
        text-white
        text-sm
        rounded
        hover:bg-blue-700
        ">{text}</Link>
    );

    return (
        <>
            <div
                className="
                flex
                gap-5
                "
            >
                <AuthButton text="Sign In" link="/sign-in" />
                <AuthButton text="Sign Up" link="/sign-up" />
            </div>
        </>
    )
}

export default Authentication