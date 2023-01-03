import React from 'react';
import './Header.scss'
import {Link} from 'react-router-dom'

export default function Header(){
    return(
        <div className="header p-2 text-start">
            <Link className="header-phonebook__link" to={'/'}>
            <span className="header-phonebook__logo">PhoneBook</span>
            </Link>
        </div>
    )
}
