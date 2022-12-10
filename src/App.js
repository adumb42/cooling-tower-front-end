import React from 'react';
import { BrowserRouter, Routes, Route, Outlet} from 'react-router-dom';
import DataTable from './components/DataTable';
import Navbar from './components/Navbar';
import NewRecord from './components/NewRecord';
import "./index.css";
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

const App = () => {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <React.Fragment>
              <Navbar />
              <Outlet />
            </React.Fragment>
          }>
            <Route index element={<DataTable />} />
            <Route path="newrecord" element={<NewRecord />} />
          </Route>
        </Routes>
      </BrowserRouter>
  )
}

export default App;

    //button onClick={submitReview}>Submit</button>

      //   {movieReviewList.map((val) => {
      //     return (
      //       <div className="card">
      //         <h1>{val.movieName}</h1>
      //         <p>{val.movieReview}</p>

      //         <button onClick={() => {deleteReview(val.movieName)}}>Delete</button>
      //         <input type="text" id="updateInput" onChange={(e) => setNewReview(e.target.value)}></input>
      //         <button onClick={() => updateReview(val.movieName)}>Update</button>

      //       </div>
      //     )
      //   })}