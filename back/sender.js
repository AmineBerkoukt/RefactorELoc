import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

// User-specific information
const userId = '675f0eb28d24f46ee0b65634'; // Sender's ID
const receiverId = '675f0eb28d24f46ee0b65633'; // Receiver's ID

// Message content
const messageData = {
    senderId: userId,
    receiverId: receiverId,
    content: 'z3ir !',
};

// Register user and send a message
socket.on('connect', () => {
    console.log('Sender connected to server:', socket.id);

    // Register the user on the server
    socket.emit('registerUser', { userId });

    // Send a message to the receiver
    socket.emit('sendMessage', messageData);

    // Listen for acknowledgment or errors
    socket.on('messageSent', (data) => {
        console.log('Message sent confirmation:', data);
    });

    socket.on('error', (error) => {
        console.error('Error from server:', error);
    });
});

socket.on('disconnect', () => {
    console.log('Sender disconnected from server');
});
