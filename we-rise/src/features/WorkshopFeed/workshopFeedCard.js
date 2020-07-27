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
        display: 'flex',
        flexDirection: 'row'
    },
    header: {
        width: '60%'
    },
    media: {
        height: '100%',
        width: '40%',
        padding: theme.spacing(1),
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

    const date = 'Sep 26 2020'
    const time = '7PM-8PM'
    
    const workshop = {
        facilitator: "Nilber Remon",
        title: "CSS Savvy Forever Bitches",
        category: "Technology, Coding & Programming",
        image: "https://pbs.twimg.com/profile_images/953234447335411712/9PmvG_hz_400x400.jpg"
    }
   

    return (
        <Card className={classes.root}>
            <CardHeader
            className={classes.header}
            avatar={
                <Avatar aria-label="facilitator" className={classes.avatar} src={""} alt={workshop.facilitator}/>
            }
            title= {
                <Typography className={classes.text}>{workshop.title}</Typography>
            }
            subheader = {
                <>
                <Typography className={classes.text}>{workshop.facilitator}</Typography>
                <Typography className={classes.text}>{date}</Typography>
                <Typography className={classes.text}>{time}</Typography>
                </>
            }
            />
            <CardMedia
            className={classes.media}
            image={workshop.image}
            title={workshop.title}
            />
        </Card>
    );
}

export default WorkshopFeedCard;
