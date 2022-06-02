import * as React from 'react';
import { Box, Drawer, FormLabel, FormInput, FormControl, Input, Button, CardMedia } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { selectAuth } from '../redux/reducer/authSlice';
import axios from 'axios';

export default function UploadContent() {
  const [open, setOpen] = React.useState(false);
  const [imageSrc, setImageSrc] = React.useState();
  const [selectedFile, setSelectedFile] = React.useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const authSelector = useSelector(selectAuth);

  const formik = useFormik({
    initialValues: {
      like_count: 0,
      caption: '',
      userId: '',
      createdAt: '',
      image_url: '',
    },
  });

  function handleOnChange(changeEvent) {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      setImageSrc(onLoadEvent.target.result);
      setSelectedFile(changeEvent.target.files[0]);
    };

    reader.readAsDataURL(changeEvent.target.files[0]);
  }

  const inputHandler = (event) => {
    const { value, name } = event.target;
    formik.setFieldValue(name, value);
  };

  async function handleOnSubmit(event) {
    event.preventDefault();
    const formCloudData = new FormData();

    // section toUpload to cloudinary
    formCloudData.append('file', selectedFile);
    formCloudData.append('upload_preset', 'content');

    const data = await fetch('https://api.cloudinary.com/v1_1/df00qp49i/image/upload', {
      method: 'POST',
      body: formCloudData,
    }).then((r) => r.json());
    setImageSrc(data.secure_url);

    const userId = authSelector.id;
    const dataToDataBase = { ...formik.values, image_url: data.secure_url, userId };

    const res = await axios.post('api/post/uploadContent', dataToDataBase);
    handleClose();
  }

  return (
    <div>
      <AddIcon onClick={handleOpen} />
      <Drawer open={open} anchor="bottom">
        <CardMedia component="img" height="270" width="140" image={imageSrc} />
        <FormControl>
          <FormLabel>Picture</FormLabel>
          <Input accept="image/png, image/jpeg" onChange={handleOnChange} type="file" />
        </FormControl>
        <FormControl>
          <FormLabel>Caption</FormLabel>
          <Input onChange={inputHandler} name="caption" type="text" />
        </FormControl>
        <Button onClick={handleOnSubmit}>submit</Button>
        <Button onClick={handleClose}>Cancel</Button>
      </Drawer>
    </div>
  );
}
