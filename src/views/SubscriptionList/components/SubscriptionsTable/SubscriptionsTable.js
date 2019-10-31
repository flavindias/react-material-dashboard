import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TablePagination
} from '@material-ui/core';

import { getInitials } from 'helpers';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 1050
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const SubscriptionsTable = props => {
  const { className, subscriptions, ...rest } = props;

  const classes = useStyles();

  const [ selectedSubscription, setSelectedSubscription ] = useState([]);
  const [ rowsPerPage, setRowsPerPage ] = useState(10);
  const [ page, setPage ] = useState(0);

  const handleSelectAll = event => {
    const { subscriptions } = props;

    let selectedSubscription;

    if (event.target.checked) {
      selectedSubscription = subscriptions.map(subscription => subscription.id);
    } else {
      selectedSubscription = [];
    }

    setSelectedSubscription(selectedSubscription);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedSubscription.indexOf(id);
    let newSelectedSubscription = [];

    if (selectedIndex === -1) {
      newSelectedSubscription = newSelectedSubscription.concat(selectedSubscription, id);
    } else if (selectedIndex === 0) {
      newSelectedSubscription = newSelectedSubscription.concat(selectedSubscription.slice(1));
    } else if (selectedIndex === selectedSubscription.length - 1) {
      newSelectedSubscription = newSelectedSubscription.concat(selectedSubscription.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedSubscription = newSelectedSubscription.concat(
        selectedSubscription.slice(0, selectedIndex),
        selectedSubscription.slice(selectedIndex + 1)
      );
    }

    setSelectedSubscription(newSelectedSubscription);
  };

  const handlePageChange = (event, page) => {
    setPage(page);
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage(event.target.value);
  };

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nome do filme</TableCell>
                  <TableCell>Tipo</TableCell>

                  <TableCell>Status</TableCell>
                  <TableCell>Cadastrado em</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {subscriptions.slice(0, rowsPerPage).map(subscription => (
                  <TableRow
                    className={classes.tableRow}
                    hover
                    key={subscription.id}
                    selected={selectedSubscription.indexOf(subscription.id) !== -1}
                  >

                    <TableCell>
                      <div className={classes.nameContainer}>

                        <Typography variant="body1">{subscription.name}</Typography>
                      </div>
                    </TableCell>
                    <TableCell>{subscription.type == 'SHORT_FILM' ? 'Curta' : 'Longa'}</TableCell>

                    <TableCell>{
                      subscription.status == 'INCOMPLETE' ? ('Incompleta') : (
                        subscription.status == 'SUBSCRIBED' ? ('Inscrito') : (
                          subscription.status == 'AWAITING_PAYMENT' ? ('Aguardando pagamento') : (
                            subscription.status == 'PAYMENT_CONFIRMED' ? ('Pagamento confirmado') : (
                              subscription.status == 'AWAITING_SIGN' ? ('Aguardando assinatura') : (
                                subscription.status == 'IN_REVIEW' ? ('Em revisão') : (
                                  subscription.status == 'APPROVED' ? ('Revisão finalizada') : (
                                    subscription.status == 'REJECTED' ? ('Revisão finalizada') : ('-')
                                  )
                                )
                              )
                            )
                          )
                        )
                      )
                    }</TableCell>
                    <TableCell>
                      {moment(subscription.createdAt).format('DD/MM/YYYY')}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <CardActions className={classes.actions}>
        <TablePagination
          component="div"
          count={subscriptions.length}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[ 5, 10, 25 ]}
        />
      </CardActions>
    </Card>
  );
};

SubscriptionsTable.propTypes = {
  className: PropTypes.string,
  subscriptions: PropTypes.array.isRequired
};

export default SubscriptionsTable;
