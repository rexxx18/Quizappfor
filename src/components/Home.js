import React from 'react'
import {Helmet} from 'react-helmet';
import {Link} from 'react-router-dom';


export default function Home() {
    return (
        <>
        <Helmet><title>Quiz App</title></Helmet>
        <div id='home'>
            <section>
                <div>
                    <span className="mdi mdi-cube-outline mdi-48px"></span>
                </div>
                <h1>Quiz App</h1>
                <div className="play-button-container"></div>
                <ul>
                    <li><Link to='/play/instructions'>Play</Link></li>
                   
                </ul>
            </section>
        </div>
        </>
    )
}
