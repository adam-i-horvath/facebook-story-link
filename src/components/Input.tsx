import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { ChangeEvent } from 'react';
import Snackbar from '@mui/material/Snackbar';
import helpImg from '../assets/helpimage.png';
import { introduction } from './Introduction';
import { containerStyles, introductionStyles } from './Styles';
import { Alert } from './Alert';
import { isValidUrl } from './ValidUrl';

export default function BasicTextFields() {
  const [inputLink, setInputLink] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const shareLink = `https://facebook.com/sharer.php?u=${inputLink}`;

  const handleClick = () => {
    isValidUrl(inputLink) === false ? setOpen(true) : window.open(shareLink);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputLink(e.target.value);
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const introStyle = introductionStyles();
  const contStyle = containerStyles();

  return (
    <div className={contStyle.root}>
      <Box
        component="form"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          height: '100vh',
          '& .MuiTextField-root': { m: 4, width: '25ch' },
        }}
      >
        <h1>LINK to Facebook Story</h1>
        <div className={introStyle.root}>
          <div className="intro__text">
            <h2>Introduction:</h2>
            {introduction.data.map((item) => (
              <div key={item.id}>
                <span>{item.id + '. ' + item.text}</span>
              </div>
            ))}
            {isValidUrl(inputLink) === true || inputLink === '' ? (
              ''
            ) : (
              <p style={{ maxWidth: '300px', color: 'red' }}>
                <p>Error:</p>
                The url, or the link format is currently invalid. (Start with
                'http(s)://' and end with '.com' or something similar.)
              </p>
            )}
          </div>
          <div className="intro__image">
            <img
              src={helpImg}
              alt="help"
              style={{ aspectRatio: '9 16', width: '300px' }}
            />
          </div>
        </div>
        <TextField
          onChange={handleChange}
          id="outlined-basic"
          label="Paste here your link here"
          variant="outlined"
          type="url"
          style={{ width: '60%' }}
          sx={{ input: { cursor: 'default' } }}
        />
        <Button
          onClick={handleClick}
          style={{ height: '30px' }}
          variant="contained"
        >
          share on facebook story
        </Button>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            The url, or the link format is not correct!
          </Alert>
        </Snackbar>
      </Box>
    </div>
  );
}
