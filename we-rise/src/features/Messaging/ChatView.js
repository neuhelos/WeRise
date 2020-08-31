import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { firestore } from "../../Utilities/firebase";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import ChatInput from "./ChatInput";

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
		height: "100%",
		position: "relative",
		color: "#FFFFFF",
		"& *": {
			fontFamily: "audiowide",
		},
	},
	chatViewContainer: {
		width: "100%",
		height: "80%",
		position: "relative",
	},
	chatView: {
		padding: theme.spacing(1),
		width: "100%",
		height: "100%",
		overflow: "auto",
		position: "absolute",
	},
	currentUserMessageContainer: {
		display: "flex",
		flexDirection: "column",
		alignItems: "flex-start",
	},
	peerMessageContainer: {
		display: "flex",
		flexDirection: "column",
		alignItems: "flex-end",
	},
	currentUserMessage: {
		padding: theme.spacing(2),
		wordWrap: "break-word",
		margin: theme.spacing(1),
		backgroundColor: "#FF0F7B",
		color: "#FFFFFF",
		width: "45%",
		border: "2px solid #F5F5F5",
		borderRadius: "10px",
	},
	peerMessage: {
		padding: theme.spacing(2),
		wordWrap: "break-word",
		margin: theme.spacing(1),
		backgroundColor: "#F89B29",
		color: "#FFFFFF",
		width: "45%",
		border: "2px solid #F5F5F5",
		borderRadius: "10px",
	},
	peerMessageHeader: {
		float: "right",
		fontSize: "1rem",
		textAlign: "right",
		paddingTop: theme.spacing(1),
		paddingLeft: theme.spacing(1),
		paddingRight: theme.spacing(1),
	},
	chatHeader: {
		backgroundColor: "#36386D",
		fontSize: "2rem",
		color: "white",
		width: "100%",
		height: "5%",
	},
	chatInput: {
		width: "100%",
		height: "15%",
	},
}));

const ChatView = ({ selectedChat, submitMessage, messageRead }) => {
	const currentUser = useSelector((state) => state.currentUserSession);

	const classes = useStyles();

	const chatScrollDown = () => {
		const container = document.getElementById("chatview-container");
		if (container) {
			container.scrollTo(0, container.scrollHeight);
		}
	};

	useEffect(() => {
		chatScrollDown();
	}, [selectedChat]);

	const ChatMessages = () => {
		return selectedChat.messages.map((message, index) => {
			return (
				<Container
					className={
						message.sender === currentUser.uid
							? classes.currentUserMessageContainer
							: classes.peerMessageContainer
					}
				>
					{message.sender !== currentUser.uid ? (
						<Typography className={classes.peerMessageHeader} variant="body1">
							{message.firstName}
						</Typography>
					) : null}
					<Container
						key={index}
						className={
							message.sender === currentUser.uid
								? classes.currentUserMessage
								: classes.peerMessage
						}
					>
						{message.message}
					</Container>
				</Container>
			);
		});
	};

	let chatPeers = (selectedChat) => {
		let peers = [];
		for (let key in selectedChat.users) {
			if (selectedChat.users[key].userId !== currentUser.uid)
				peers.push(selectedChat.users[key].firstName);
		}
		return peers.join("&");
	};

	let WeRiseFist =
		"https://firebasestorage.googleapis.com/v0/b/werise-c999a.appspot.com/o/appImages%2FWeRiseFist.png?alt=media&token=1feea915-d2b3-4b6c-8b6c-1faf9b4c594f";

	return (
		<Container disableGutters className={classes.root}>
			{selectedChat === undefined ? (
				<Grid
					container
					display="flex"
					direction="column"
					justify="center"
					alignItems="center"
				>
					<img className={classes.image} src={WeRiseFist} alt={"WeRiseLogo"} />
					<Typography variant="h5">Select or Start a Chat</Typography>
				</Grid>
			) : (
				<>
					<Grid
						className={classes.chatHeader}
						container
						display="flex"
						justify="center"
						alignItems="center"
					>
						<Typography>
							{`Your Conversation with ${chatPeers(selectedChat)}`}
						</Typography>
					</Grid>
					<div className={classes.chatViewContainer}>
						<div className={classes.chatView} id="chatview-container">
							<ChatMessages />
						</div>
					</div>
					<Grid
						className={classes.chatInput}
						display="flex"
						justify="center"
						alignItems="center"
					>
						<ChatInput
							submitMessage={submitMessage}
							messageRead={messageRead}
						/>
					</Grid>
				</>
			)}
		</Container>
	);
};

export default ChatView;
