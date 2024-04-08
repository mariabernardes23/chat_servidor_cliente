const { log } = require('console');
const net = require('net');
const readline = require('readline');

// Criar um cliente de socket
const client = net.createConnection({
  host: 'localhost',
  port: 3001
});

// Configura a interface para leitura do terminal
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Pergunta ao cliente e processa a entrada
function writeMensage() {
  rl.question('Digite sua mensagem: ', (input) => {
    const mensagem = input;

    if(mensagem.trim() == 'stop') {
      // Fecha a conexão com o servidor
      client.end();
    } else {
      pushMensage(mensagem);
    }
  });
}

// Lidar com mensagens do servidor
client.on('data', (mensagem) => {
  console.log('-> Servidor:', mensagem.toString('utf8'));
  writeMensage();
});

// Lidar com a desconexão do servidor
client.on('close', () => {
  console.log('Conexão fechada');
  // Fechar a interface de leitura
  rl.close(); 
});

// Enviar uma mensagem para o servidor
function pushMensage(mensagem) {
  client.write(mensagem);
}