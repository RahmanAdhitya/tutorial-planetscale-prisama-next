import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import SendIcon from '@mui/icons-material/Send';
import { FormControl, Input, InputAdornment, InputLabel, TextField } from '@mui/material';
import moment from 'moment';
import { selectAuth } from '../redux/reducer/authSlice';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useFormik } from 'formik';
import { SliderValueLabelUnstyled } from '@mui/base';
import { Box } from '@mui/system';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function ContentCard({ image_url, username, picture_url, caption, like_count, createdAt, id }) {
  const [expanded, setExpanded] = React.useState(false);
  const [love, setLove] = React.useState(false);
  const [comment, setComment] = React.useState([]);
  const [likeCount, setLikeCount] = React.useState(0);
  const authSelector = useSelector(selectAuth);

  const formik = useFormik({
    initialValues: {
      content: '',
    },
  });

  const inputHandler = (event) => {
    const { value, name } = event.target;
    formik.setFieldValue(name, value);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const createComment = async () => {
    const res = await axios.post(`/api/post/${id}/comment/${authSelector.id}`, formik.values);
    setComment(comment.concat(res.data.data));
    console.log(comment);
  };

  const likeStatus = async () => {
    const res = await axios.get(`/api/post/${id}/likeStatus/${authSelector.id}`);
    setLikeCount(like_count);
    if (res.data.data.length) {
      setLove(true);
    } else {
      setLove(false);
    }
  };

  const fetchComment = async () => {
    const res = await axios.get(`/api/post/${id}/comment`);
    setComment(res.data.data);
    console.log(comment);
  };

  const renderComment = () => {
    if (comment) {
      return comment.map((comment) => {
        return (
          <>
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
              <Typography paragraph>
                <b>{comment.User.username}</b>&nbsp;{comment.content}&nbsp;
              </Typography>
            </Box>
            <Typography mt={-2} mb={1} fontSize={10}>
              {moment(comment.createdAt).startOf().fromNow()}
            </Typography>
          </>
        );
      });
    }
  };

  const likePost = async () => {
    if (!love) {
      const like = await axios.post(`/api/post/${id}/like/${authSelector.id}`);
      setLove(true);
      setLikeCount(likeCount + 1);
    } else {
      const unlike = await axios.delete(`/api/post/${id}/unlike/${authSelector.id}`);
      setLove(false);
      setLikeCount(likeCount - 1);
    }
  };

  React.useEffect(() => {
    likeStatus();
    fetchComment();
  }, []);

  return (
    <Card container="paper" sx={{ maxWidth: 345, mt: 2 }}>
      <CardHeader
        avatar={<Avatar src={picture_url} alt={username} />}
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={username}
        subheader={moment(createdAt).format('MMMM Do YYYY')}
      />
      <CardMedia component="img" image={image_url} alt="Paella dish" />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {likeCount} likes
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {caption}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={() => likePost()}>
          <FavoriteIcon color={!love ? '' : 'error'} />
        </IconButton>
        <IconButton onClick={handleExpandClick}>
          <ChatBubbleOutlineIcon />
        </IconButton>
        <IconButton>
          <ShareIcon />
        </IconButton>
        <ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more">
          {expanded ? (
            <div></div>
          ) : (
            <Typography sx={{ transitionDelay: 2 }} variant="caption">
              more comment
            </Typography>
          )}
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <FormControl fullWidth sx={{ mb: 2, mt: -2 }} variant="standard">
            <InputLabel htmlFor="content">Comment</InputLabel>
            <Input
              id="content"
              name="content"
              onChange={inputHandler}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={() => createComment()}>
                    <SendIcon />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <Box>{renderComment()}</Box>
        </CardContent>
      </Collapse>
    </Card>
  );
}
