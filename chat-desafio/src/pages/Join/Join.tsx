import { useRef } from "react";
import { Container, Content, LabelText, Text, Title } from "./style";
import { Button, Grid2, TextField } from "@mui/material";
import io, { Socket } from "socket.io-client";

interface JoinProps {
  setChatVisibility: (visible: boolean) => void;
  setSocket: (socket: Socket) => void;
}

export default function Join({ setChatVisibility, setSocket }: JoinProps) {
  const usernameRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = async () => {
    const username = usernameRef.current?.value;
    if (!username?.trim()) return;
    const socket = await io("http://localhost:3001");
    socket.emit("set_username", username);
    setSocket(socket);
    setChatVisibility(true);
  };

  return (

    <Container>
      <Grid2 container
        alignItems={'center'}
        justifyContent={'center'}
        style={{ height: '50vh', }}
      >
        <Content>
          <Title>Welcome 👋</Title>
          <Text>Select your username to get started</Text>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            marginBottom: '2rem'
          }}>
            <LabelText>Username</LabelText>
            <TextField
              sx={{
                width: 370,
                height: 'auto',
                backgroundColor: '#ffffffb2',
                border: 'transparent',
                borderRadius: '6px'

              }}
              inputRef={usernameRef}
              placeholder="Username"
              variant="outlined"
              fullWidth
            />
          </div>

          <Button
            onClick={() => handleSubmit()}
            sx={{ mt: 2, width: 120 }}
            variant="contained"
          >
            Entrar
          </Button>

        </Content>
      </Grid2>
    </Container>
  );
}
