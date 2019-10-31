import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import { SubscriptionsToolbar, SubscriptionsTable } from './components';
import api from '../.../../../services/api';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const SubscriptionList = () => {
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
      <SubscriptionsToolbar />
      <div className={classes.content}>
        <SubscriptionsTable subscriptions={subscriptions} />
      </div>
    </div>
  );
};

export default SubscriptionList;
