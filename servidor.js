const { WriteStream } = require('fs');
const net = require('net');
const readline = require('readline');
const porta = 3001;

// Criar um servidor de socket
const server = net.createServer((socket) => {
  console.log('Cliente conectado');

  // Configura a interface para a leitura do terminal
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  // Pergunta ao servidor e processa a entrada
  function writeMensage() {
    rl.question('Digite sua mensagem: ', (input) => {
      const mensagem = input;

      if(mensagem.trim() == 'stop') {
        // Fecha a conexão com o cliente
        socket.end()
      } else {
        pushMensage(mensagem)
      }
    })
  }

  // Enviar uma mensagem para o cliente
  function pushMensage(mensagem) {
    socket.write(mensagem)
    pullMensage();
  }

  // Lidar com mensagens do cliente
  function pullMensage() {
    socket.on('data', (mensagem) => {
      console.log('-> Cliente:', mensagem.toString('utf8'));
      writeMensage()
    });
  }

  // Lidar com a desconexão do cliente
  socket.on('close', () => {
    console.log('Conexão fechada');
  });

  writeMensage();
});

// Começar a escutar por novas conexões
server.listen(porta, () => {
  console.log(`Servidor executando na porta ${porta}`)
});
