import * as React from 'react';
import { Grid } from '@mui/material';
import ContentCard from '../component/ContentCard';
import axios from 'axios';

export default function Home() {
  const [postData, setPostData] = React.useState();

  const fetchPost = async () => {
    try {
      const res = await axios.get('/api/fetch/post', {});
      setPostData(res.data.data);
    } catch (error) {
      console.log('network error', error);
    }
  };

  const renderData = () => {
    if (postData) {
      return postData.map((post) => {
        return (
          <ContentCard
            id={post?.id}
            key={post?.id}
            image_url={post?.image_url}
            createdAt={post?.createdAt}
            caption={post?.caption}
            like_count={post?.like_count}
            username={post?.User.username}
            picture_url={post?.User.picture_url}
            //
          />
        );
      });
    }
  };

  React.useEffect(() => {
    fetchPost();
  }, []);
  return (
    <>
      <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center">
        <Grid item xs={12}>
          {renderData()}
        </Grid>
      </Grid>
    </>
  );
}
