import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import {
  Subscriptions,
  TotalUsers,
  TasksRevised,
  TotalSubscribes,
  LatestSales,
  UsersByDevice
} from './components';

import api from '../.../../../services/api';
const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Dashboard = () => {
  const classes = useStyles();

  const [ subscriptions, setSubscriptions ] = useState([]);

  useEffect(() => {
    async function valuesData () {
      try {
        const response = await api.get('/subscriptions');
        if (response) {
          setSubscriptions(response.data)

        }
      }
      catch (e) {
        alert(e)
      }
    }
    valuesData()

  }, [])



  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
      >
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <Subscriptions pending={subscriptions.filter(sub => sub.status === 'INCOMPLETE').length} />
        </Grid>
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <TotalUsers total={3000} />
        </Grid>
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <TasksRevised percent={27} />
        </Grid>
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <TotalSubscribes total={subscriptions.length} />
        </Grid>
        <Grid
          item
          lg={8}
          md={12}
          xl={9}
          xs={12}
        >
          <LatestSales />
        </Grid>
        <Grid
          item
          lg={4}
          md={6}
          xl={3}
          xs={12}
        >
          <UsersByDevice
            animation={subscriptions.filter(sub => sub.category_id === 1).length}
            doc={subscriptions.filter(sub => sub.category_id === 2).length}
            fiction={subscriptions.filter(sub => sub.category_id === 3).length}
          />
        </Grid>

      </Grid>
    </div>
  );
};

export default Dashboard;
