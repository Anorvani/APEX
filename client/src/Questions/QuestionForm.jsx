import React, { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';


const QuestionForm = ({product, productName}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => { setOpen(true) };
  const handleClose = () => { setOpen(false) };

  let [body, setBody] = useState('');
  let [name, setName] = useState('');
  let [email, setEmail] = useState('');


  const handleChange = (event) => {
    let ename = event.target.name;
    let value = event.target.value;

    if(ename === "body") {
      setBody(value)
    }
    if(ename === "username") {
      setName(value)
    }
    if(ename === "email") {
      setEmail(value)
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let message = {body, name, email, product_id: Number(product) }

    axios.post(`/api/products/${product}/qa/questions`, message)
      .then(() => {
        setBody('');
        setName('');
        setEmail('');
      })
      .then(() => handleClose())
  }

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        Add Question +
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Ask Your Question</DialogTitle>
        <DialogContent>
          <DialogContentText>
            About the {productName}
          </DialogContentText>
          <TextField
            required
            id="outline-required"
            label="Your Question"
            name="body"
            value={body}
            autoFocus
            margin="dense"
            fullWidth
            multiline={true}
            rows={4}
            onChange={handleChange}
            />
           <TextField
            required
            helperText="“For privacy reasons, do not use your full name or email address"
            id="outlined-required"
            label="Your Nickname"
            name="username"
            placeholder="Example:Jack123 "
            value={name}
            fullWidth
            onChange={handleChange}
          />
          <TextField
            required
            helperText="For authentication reasons, you will not be emailed"
            id="outlined-required"
            label="Email"
            type="email"
            name="email"
            value={email}
            placeholder="Example: jack@email.com"
            fullWidth
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default QuestionForm;