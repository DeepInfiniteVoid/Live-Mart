import React from 'react'
import onion from './images/items/onion.jpg'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket'
import Divider from '@material-ui/core/Divider'
import ReactStars from 'react-rating-stars-component'
import Avatar from '@material-ui/core/Avatar'
import Chip from '@material-ui/core/Chip'
import CheckIcon from '@material-ui/icons/Check'
import { green, red, orange, deepPurple, blue } from '@material-ui/core/colors'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Button from '@material-ui/core/Button'
import ListSubheader from '@material-ui/core/ListSubheader'
import PeopleIcon from '@material-ui/icons/People'
import { Paper } from '@material-ui/core'
import RemoveIcon from '@material-ui/icons/Remove'

const useStyles = makeStyles(theme => ({
  root: {
    justifyContent: 'center',
    margin: theme.spacing(2)
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  },
  itemData: {
    padding: theme.spacing(4),
    marginLeft: theme.spacing(2)
  },
  floatButtons: {
    '& > *': {
      margin: theme.spacing(1)
    }
  },
  inStock: {
    backgroundColor: green[800],
    color: theme.palette.common.white
  },
  outStock: {
    color: '#fff',
    backgroundColor: red[500]
  },
  status: {
    backgroundColor: theme.palette.common.white,
    width: 400,
    padding: theme.spacing(3)
  },
  sellerButton: {
    borderRadius: 15,
    margin: theme.spacing(2, 0, 2),
    width: 400
  },
  about: {
    margin: theme.spacing(2, 0, 2)
  },
  quantity : {
    backgroundColor : theme.palette.common.white,
    color : theme.palette.common.black
  }
}))

export default function ItemDetails (props) {
  const classes = useStyles()

  const [showRetailers, setShowRetailers] = React.useState(false)

  const [itemQuantity, setItemQuantity] = React.useState(1)

  const handleRetailers = () => {
    setShowRetailers(!showRetailers)
  }

  const handleAdd = () => {
    setItemQuantity(itemQuantity+1)
  }

  const handleRemove = () => {
    if(itemQuantity>=2){
      setItemQuantity(itemQuantity-1)
    }
    else setItemQuantity(1)
  }

  return (
    <Paper elevation={3} className={classes.root}>
      <Grid container direction='row'>
        <Grid container xs={12} justify='center'>
          <img width={300} src={props.img} alt='wow! Onion is Missing :P' />
        </Grid>
        <Grid item xs={12}>
          <div className={classes.itemData}>
            <Typography variant='h4'>
              {props.name}
              <ReactStars count={5} size={40} activeColor='#ffd700' />
            </Typography>
            <Divider />
            <Typography color='textSecondary'>MRP : {'₹' + props.price + '.00'}</Typography>
            <Grid container justify='center'>
              <Chip
                className={classes.status}
                avatar={
                  <Avatar>
                    <CheckIcon className={classes.inStock} />
                  </Avatar>
                }
                label='Currently in Stock'
              />
            <Grid item>
              <Typography className={classes.about}>About</Typography>
              <Typography variant='subtitle2' color='textSecondary'>
                {props.desc}
              </Typography>
            </Grid>
            <Button
                startIcon={<PeopleIcon />}
                variant='contained'
                color='primary'
                className={classes.sellerButton}
                onClick={handleRetailers}
              >
                View Sellers
              </Button>
            </Grid>
            {showRetailers && (
              <React.Fragment>
                <List component='nav' aria-label='main mailbox folders'>
                  <ListItem button>
                    <ListItemText primary='Big Basket' />
                  </ListItem>
                  <ListItem button>
                    <ListItemText primary='Amazon' />
                  </ListItem>
                </List>
                <Divider />
              </React.Fragment>
            )}
            <Grid container className={classes.floatButtons} justify='center'>
                <Fab color='primary' aria-label='remove' size='small' onClick={handleRemove} >
                  <RemoveIcon />
                </Fab>
                <Avatar className={classes.quantity}>{itemQuantity}</Avatar>
                <Fab color='primary' aria-label='add' size='small' onClick={handleAdd}>
                  <AddIcon />
                </Fab>
              <Fab color='secondary' aria-label='edit' size='small'>
                <ShoppingBasketIcon />
              </Fab>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </Paper>
  )
}
