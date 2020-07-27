import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    media: {
        height: 200,
        width: '100%',
        padding: theme.spacing(1),
        display: 'flex',
        justifyContent: 'center'
        //paddingTop: '56.25%', // 16:9
    },
    avatar: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    text: {
        fontFamily:'audiowide'
    }
    }));

const WorkshopFeedCard = ( {} ) => {
    
    const classes = useStyles();

    const dateTime = 'July 26 2020 7PM-8PM'
    
    const workshop = {
        facilitator: "Nilber Remon",
        title: "CSS Savvy",
        category: "Technology, Coding & Programming",
        image: ""
    }
   

    return (
        <Card className={classes.root}>
            <CardHeader
            className={classes.root}
            avatar={
                <Avatar aria-label="recipe" className={classes.avatar} src={""} alt={workshop.facilitator}/>
            }
            title= {
                <Typography className={classes.text}>{workshop.title}</Typography>
            }
            subheader = {
                <>
                <Typography className={classes.text}>{workshop.facilitator}</Typography>
                <Typography className={classes.text}>{dateTime}</Typography>
                <Typography className={classes.text}>{workshop.category}</Typography>
                </>
            }
            />
            <CardMedia
            className={classes.media}
            image="https://p14cdn4static.sharpschool.com/UserFiles/Servers/Server_494023/Image/Caulin/workshops.jpg"
            title="Paella dish"
            />
        </Card>
    );
}

export default WorkshopFeedCard;
