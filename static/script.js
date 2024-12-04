async function buscarPorCpf() {
  const cpf = document.getElementById('cpf').value;

  try {
    const response = await fetch(`http://127.0.0.1:5000/${cpf}`);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.erro || 'Erro desconhecido');
    }

    const data = await response.json();
    document.getElementById('responseCard').style.display = 'block';
    document.getElementById('cardTitle').innerText = 'Cliente Encontrado';
    document.getElementById('cardText').innerText = `Nome: ${data.nome}\nE-mail: ${data.email}\nData de Nascimento: ${data.dataNascimento}`;
  } catch (error) {
    document.getElementById('responseCard').style.display = 'block';
    document.getElementById('cardTitle').innerText = 'Erro';
    document.getElementById('cardText').innerText = error.message;
  }
}

async function adicionarCliente() {
  const novoCliente = {
    cpf: document.getElementById('cpfCadastro').value,
    nome: document.getElementById('nomeCadastro').value,
    dataNascimento: document.getElementById('dataNascimentoCadastro').value,
    email: document.getElementById('emailCadastro').value
  };

  try {
    const response = await fetch('http://127.0.0.1:5000/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(novoCliente)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.erro || 'Erro desconhecido');
    }

    const data = await response.json();
    document.getElementById('responseCardCadastro').style.display = 'block';
    document.getElementById('cardTitleCadastro').innerText = data.mensagem;
    document.getElementById('cardTextCadastro').innerText = `Nome: ${data.cliente.nome}\nCPF: ${data.cliente.cpf}\nData de Nascimento: ${data.cliente.dataNascimento}\nE-mail: ${data.cliente.email}`;
  } catch (error) {
    document.getElementById('responseCardCadastro').style.display = 'block';
    document.getElementById('cardTitleCadastro').innerText = 'Erro';
    document.getElementById('cardTextCadastro').innerText = error.message;
  }
}
