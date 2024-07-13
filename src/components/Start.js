import React, { useContext } from 'react';
import DataContext from '../context/dataContext';

const goToHomepage = () => {
    // Redirect to the main homepage in the script folder
    window.location.href = 'https://strassen-matrixmultiplication.netlify.app/index.html';
};

const Start = () => {
    const {startQuiz, showStart} = useContext(DataContext);
    return (
        <section className='text-white text-center bg-dark' style={{ display: `${showStart ? 'block' : 'none'}` }}>
            <div className="container">
                <div className="row vh-100 align-items-center justify-content-center">
                    <div className="col-lg-8">
                        <h1 className='fw-bold mb-4'>Test your knowledge about Strassen's algorithm!</h1>
                        <button onClick={startQuiz} className="btn px-4 py-2 bg-light text-dark fw-bold">Start Quiz</button>
                        <button onClick={goToHomepage} className='btn py-2 px-4 btn-light fw-bold d-inline ms-2'>Go to Homepage</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Start;