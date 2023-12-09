"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/');
        setData(response.data);
        console.log("fetching done");
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {data ? <div>{JSON.stringify(data)}</div> : <p>Loading data...</p>}
    </div>
  );
}

export default App;

