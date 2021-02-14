import { useForm } from "react-hook-form";
import {useState} from 'react';
import {Grid} from "@material-ui/core";
import Typogrpahy from "@material-ui/core/Typography";
import { makeStyles } from '@material-ui/core/styles';
import React from 'react'; 
import uuid from 'react-uuid';
import { withStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import '../App';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    item :{
    padding: theme.spacing(2)
    },
  }));

  const style1 ={  
   color: "red",
   
  }

 
function Formm({check,setCheck})
{
    const { register,handleSubmit,errors } = useForm();
    const [name,setName] = useState("");
    const [caption,setCaption] = useState("");
    const [url,setUrl] = useState("")
    
    ;
      
    const handleName =(e)=>{
        setName(e.target.value);
    }

    const handleCaption = (e) =>{
        setCaption(e.target.value);
    }

    const handleUrl = (e) =>{
        setUrl(e.target.value);
    }
    const onSubmit =(data)=>{
        const payload ={
            name:name,
            caption:caption,
            url:url
        };

        
        axios({
            url:'http://localhost:5000/memes',
            method: 'POST',
            data:payload
        })
        .then(()=>{
            console.log("Data has been received");
        })
        .catch(()=>{
            console.log('error in sending data');
        })

        document.getElementById("formID").reset();
        setCheck(!check);
        console.log(" check value is ", check);
    } 

    const classes = useStyles();

    
    return(
       <div >
           
                <form id="formID" onSubmit={handleSubmit(onSubmit)}>
                <Grid  container direction="column" >
                   <Grid item xs={12} >
                    <Grid item xs={6} className={classes.item}>
                                <Typogrpahy 
                                
                                variant="h5">
                                <input  placeholder="Enter Your Name" id="Name" onChange={handleName} style={{width:'100%',fontFamily:'cursive',height:'50px',fontSize:'25px'}}type="text" name="Name" ref={register({required: true})}/>
                                <br></br>
                                {errors.Name && errors.Name.type === "required" && <span style={style1}>This is required !!</span>}
                                </Typogrpahy>                                
                    </Grid>

                    <Grid item xs={6} className={classes.item}>
                    <Typogrpahy 
                     
                     variant="h5">
                    <input  placeholder="Enter Caption"  id="Caption" onChange={handleCaption} style={{width:'100%',height:'50px',fontFamily:'cursive',fontSize:'25px'}} name="Caption" ref={register({required:true,maxLength: 50})} />
                    <br></br>
                    {errors.Caption && errors.Caption.type === "required" && <span style={style1}>This is required !!</span>}
                    {errors.Caption && errors.Caption.type==="maxLength" && <span style={style1}>Max length Excedded !!</span>}
                    </Typogrpahy>
                    </Grid>

                    <Grid item xs={6} className={classes.item}>
                    <Typogrpahy 
                     
                     variant="h5">
                    <input   placeholder="Enter Url" id="url" onChange={handleUrl} style={{width:'100%', height:'50px',fontFamily:'cursive',fontSize:'25px'}} name="url" ref={register({required:true , pattern :/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm})} />
                    <br></br>
                    {errors.url && errors.url.type === "required" && <span style={style1}>This is required !!</span>}
                    {errors.url && errors.url.type==="pattern" && <span style={style1}>Please enter correct Url !! !!</span>}
                    </Typogrpahy>
                    </Grid>

                    <Grid item xs={6} className={classes.item}>
                    <Typogrpahy 
                    
                     variant="h5">
                    <input style={{marginLeft:'2px',width:'100%', height:'50px',fontFamily:'cursive',fontSize:'25px'}} type="submit" />
                    </Typogrpahy>
                    </Grid>
                    </Grid>
                    </Grid>
                </form>
               

                  
           
           
            
           
       </div>
       
    )
}

export default Formm;