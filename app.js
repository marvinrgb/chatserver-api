import express from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const app = express();
import http from 'http';
const server = http.createServer(app);
import { Server } from 'socket.io';
const io = new Server(server);
const port = 3101;

app.use(express.json());

app.use((req, res, next) => {
  let logtable = {
    "Method" : req.method,
    "IP" : req.ip,
    "Path" : req.path,
  }

  console.table([logtable]);
  next();
})

app.post('/msg', async (req, res) => {
  let data = req.body;
  
  const db_response = await prisma.message.create({
    data: data
  })

  res.json(db_response);
})

app.post('/group', async (req, res) => {
  let data = req.body;
  
  const db_response = await prisma.group.create({
    data: data
  })

  res.json(db_response);
})

app.get('/all', async (req, res) => {
  const username = 'adminmarv';

  const user = await prisma.user.findFirst({
    where: {
      name: username
    }
  })

  const messages = await prisma.message.findMany({
    where: {
      OR: [
        {
          recipient: user.id
        },
        {
          sender: user.id
        }
      ]
    }
  })

  const groups = await prisma.userInGroup.findMany({
    where: {
      userid: user.id
    }
  })

  let chats = {};

  messages.forEach((msg) => {
    let recipient = msg.recipient;
    let sender = msg.sender
    if (recipient == user.id) {
      if (!chats[sender]) {
        chats[sender] = []
      }
      chats[sender].push(msg)
    } else if (sender == user.id) {
      if (!chats[recipient]) {
        chats[recipient] = []
      }
      chats[recipient].push(msg)
    }
    
  })

  const data = {
    chats: chats,
    groups: groups
  }

  res.json(data);
})


app.listen(port, () => {
  console.log(`Running on port ${port}`);
})