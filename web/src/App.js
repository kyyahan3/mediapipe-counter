import React, {useState} from 'react';
import { Layout } from 'antd';
import {BrowserRouter, Routes, Route } from 'react-router-dom';

import "./index.css";
import Head from './Head';
import HomeBody from './Home';
import Footer from './Foot';

const App = () => {
//  declare the bodyHeight is equal to window_Height - HeaderHeight -64
    const [bodyHeight]=useState(window.innerHeight -64 -64);

    return (
    <BrowserRouter>
        <Layout>
            <Head/ >

            <Routes>
                <Route path='/' element = {<HomeBody windowHeight={bodyHeight} />} />


            </Routes>


            <Footer/ >
        </Layout>
    </BrowserRouter>

    );
}

export default App;