import React, { useContext } from 'react';
import DataContext from '../context/dataContext';

const Result = () => {
    const { showResult, quizs, marks, startOver }  = useContext(DataContext);
    const maxMarks = quizs.length; // Total questions

    const goToHomepage = () => {
        // Redirect to index.html in the script folder
        window.location.href = '/script/index.html';
    };
    
    return (
        <section className="bg-dark text-white" style={{ display: `${showResult ? 'block' : 'none'}` }}>
            <div className="container">
                <div className="row vh-100 align-items-center justify-content-center">
                    <div className="col-lg-6">
                        <div className={`text-light text-center p-5 rounded ${marks >= (maxMarks / 2) ? 'bg-success' : 'bg-danger'}`}>
                            <h1 className='mb-2 fw-bold'>{marks >= (maxMarks / 2) ? 'Awesome!' : 'Oops!'}</h1>
                            <h3 className='mb-3 fw-bold'>Your score is {marks} out of {maxMarks}</h3>

                            <button onClick={startOver} className='btn py-2 px-4 btn-light fw-bold d-inline'>Start Over</button>
                            <button onClick={goToHomepage} className='btn py-2 px-4 btn-light fw-bold d-inline ms-2'>Go to Homepage</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Result;
