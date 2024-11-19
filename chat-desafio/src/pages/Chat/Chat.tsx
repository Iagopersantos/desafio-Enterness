import { TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Socket } from "socket.io-client";
import { Container, Body, Footer } from "./style";
import SendIcon from '@mui/icons-material/Send';
import '../../App.css'

interface ChatProps {
    socket: Socket;
}

interface Message {
    authorId: string;
    author: string;
    text: string;
}

export default function Chat({ socket }: ChatProps) {
    const bottomRef = useRef<HTMLDivElement | null>(null);
    const messageRef = useRef<HTMLInputElement | null>(null);
    const [messageList, setMessageList] = useState<Message[]>([]);

    useEffect(() => {
        const handleMessage = (data: Message) => {
            setMessageList((current) => [...current, data]);
        };

        socket.on("receive_message", handleMessage);

        return () => {
            socket.off("receive_message", handleMessage);
        };
    }, [socket, setMessageList]);

    setInterval(() => {
        const start = Date.now();

        socket.emit("ping", () => {
            const duration = Date.now() - start;
            console.log(duration);
        });
    }, 1000);


    const scrollDown = () => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    useEffect(() => {
        scrollDown()
    }, [messageList]);

    const clearInput = () => {
        if (messageRef.current) {
            messageRef.current.value = "";
        }
    };

    const focusInput = () => {
        if (messageRef.current) {
            messageRef.current.focus();
        }
    };

    const handleSubmit = () => {
        if (!messageRef.current) return;

        const message = messageRef.current.value;
        if (!message.trim()) return;

        socket.emit("message", message);
        clearInput();
        focusInput();
    };

    const getEnterKey = (e: { key: string; }) => {
        if (e.key === 'Enter')
            handleSubmit()
    }

    return (
        <div>
            <Container>
                <Body>
                    {
                        messageList.map((message, index) => {
                            return (
                                <div
                                    className={`message-container ${message.authorId === socket.id ? 'message-mine' : ""
                                        }`}
                                    key={index}
                                >
                                    <div>
                                        <strong>{message.author}</strong>
                                    </div>
                                    <div>{message.text}</div>
                                </div>
                            );
                        })
                    }
                    <div ref={bottomRef} />
                </Body>
                <Footer>
                    <TextField
                        onKeyDown={(e) => getEnterKey(e)}
                        inputRef={messageRef}
                        placeholder='Mensagem'
                        variant="outlined"
                        fullWidth
                    />
                    <SendIcon sx={{ m: 1, cursor: 'pointer' }} onClick={() => handleSubmit()} color="primary" />
                </Footer>
            </Container>
        </div>
    )


}