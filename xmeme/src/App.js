import React from 'react'; 
import { useForm } from "react-hook-form";
import Header from './components/Header';
import Formm from './components/form';
import Memes from './components/memes';
import {useState} from 'react';
import {Grid} from "@material-ui/core";



function App() {

  const [check,setCheck]=useState(false);
  return (
    <div>
      <Header />
       <Formm check={check} setCheck={setCheck}/>
        <Memes check={check} setCheck={setCheck}/>
         
      
    </div>
  );
}

export default App;
