import Peer from 'peerjs';

const PeerService = {
  peer: null,
  connection: null,
  opponentId: null,
  onOpponentFound: null,
  onOpponentChoice: null,

  async initialize(username) {
    return new Promise((resolve, reject) => {
      this.peer = new Peer('_u' + username);

      this.peer.on('open', (id) => {
        console.log('My peer ID is: ' + id);
        this.findOpponent();
        resolve();
      });

      this.peer.on('connection', (conn) => {
        if (!this.connection) {
          this.connection = conn;
          this.setupConnection();
          if (this.onOpponentFound) this.onOpponentFound();
        }
      });

      this.peer.on('error', (err) => {
        console.error(err);
        alert('Error connecting to PeerJS server.');
        window.location.href = '/';
        reject(err);
      });
    });
  },

  findOpponent() {
    // Simplified matchmaking logic
    // In a real app, you would query the Redis backend
    const possibleOpponentId = '_uOpponent';

    if (possibleOpponentId !== this.peer.id) {
      const conn = this.peer.connect(possibleOpponentId);

      conn.on('open', () => {
        this.connection = conn;
        this.setupConnection();
        if (this.onOpponentFound) this.onOpponentFound();
      });

      conn.on('error', (err) => {
        console.error('Connection error:', err);
      });
    }
  },

  setupConnection() {
    this.connection.on('data', (data) => {
      if (data.type === 'choice' && this.onOpponentChoice) {
        this.onOpponentChoice(data.choice);
      }
    });

    this.connection.on('close', () => {
      alert('Opponent disconnected.');
      window.location.href = '/';
    });
  },

  sendChoice(choice) {
    if (this.connection && this.connection.open) {
      this.connection.send({ type: 'choice', choice });
    }
  },
};

export default PeerService;
