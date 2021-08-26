import React from 'react'
import { useProducts } from '../../context'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import DeleteIcon from '@material-ui/icons/Delete'
import Tooltip from '@material-ui/core/Tooltip'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import './product.scss'

const useStyles = makeStyles({
    root: {
        minWidth: 180,
    },
    customToolTipWidth: {
        maxWidth: 150,
    },
    media: {
        marginLeft: '0.5rem',
        marginRight: '0.5rem',
        height: 75,
        backgroundSize: 'contain'
    },
})

const Product = ({ product, setModal }) => {

    const classes = useStyles()

    const { deleteProduct } = useProducts()

    const openUpdateProductWindow = () => {
        setModal({
            state: true,
            product: true,
            value: product
        })
    }

    return <div className='product'>
        <Card className={classes.root}>
            <CardHeader
                action={
                    <Tooltip
                        classes={{ tooltip: classes.customToolTipWidth }}
                        title={`Added By : ${product.add_by_user}, Created at : ${product.created_at}`}
                        aria-label="update">
                        <IconButton aria-label="info">
                            <InfoOutlinedIcon />
                        </IconButton>
                    </Tooltip>
                }
                title={product.name}
                subheader={`₹ ${product.price}`}
            />
            <CardMedia
                className={classes.media}
                image={product.imageLink}
                title={product.name}
            />

            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {product.description}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <Tooltip title="delete" aria-label="delete">
                    <IconButton onClick={() => deleteProduct(product)} aria-label="delete">
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="update" aria-label="update">
                    <IconButton onClick={openUpdateProductWindow} aria-label="share">
                        <AddCircleIcon />
                    </IconButton>
                </Tooltip>
            </CardActions>
        </Card>
    </div>
}

export default Product