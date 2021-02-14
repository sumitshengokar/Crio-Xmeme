import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

function Memes({ check, setCheck }) {
  const [data, setData] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [name, setName] = useState("");
  const [caption, setCaption] = useState("");
  const [url, setUrl] = useState("");
  const [pri, setPri] = useState("");
  const handleClickOpen = (i) => {
    setOpen(true);
    setPri(i);
    console.log(" i is ", i);
  };


  const classes = useStyles();
  useEffect(() => {
    console.log("outside get");
    axios.get('/memes')
      .then((response) => {
        const memes_data = response.data;
        setData(memes_data);
        // console.log("memesdatat", memes_data);
        console.log("Data has been received !!");

      })
      .catch(() => {
        console.log("alert retreiving data");
      })

  }, [check]);

  const handleNameChange = (e) => {
    setName(e.target.value);

  }
  const handleCaptionChange = (e) => {
    setCaption(e.target.value);
  }
  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  }


  const handleClose = () => {
    const payload = {
      id: pri,
      name: name,
      caption: caption,
      url: url
    };


    axios({
      url: 'http://localhost:5000/updateData',
      method: 'POST',
      data: payload
    })
      .then(() => {
        console.log("Data has been received");
      })
      .catch(() => {
        console.log('error in sending data');
      })
    setOpen(false);
  };
  return (
    <div >

      {
        data !== undefined && Object.keys(data).map(function (key, index) {
          return (
          
                  <Card className={classes.root}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="500"
                        width="90"
                        src={data[index].url}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          {data[index].caption}
                          {index}
                          {key}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                          {data[index].name}
                          {index}
                          {key}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <Button size="small" color="primary" onClick={() => handleClickOpen(key.id)}>
                        Update
                 </Button>
                    </CardActions>
                  </Card>
          )
        })


      }
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        {/* <DialogContentText>
           Enter data to edit or update mememmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
          </DialogContentText> */}
        <DialogContent>

          <TextField
            autoFocus
            margin="dense"
            id="nameDialog"
            label="Name"
            type="text"

            onChange={handleNameChange}
            fullWidth
          />
        </DialogContent>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="nameDialog"
            label="Caption"
            type="text"
            onChange={handleCaptionChange}
            fullWidth
          />
        </DialogContent>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="nameDialog"
            label="Url"
            type="text"
            onChange={handleUrlChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      {console.log("data is ", data)}
    </div>
  )
}
export default Memes;