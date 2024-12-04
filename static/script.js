async function getDados() {
    // faz a chamada ao endpoint Flask
    const response = await fetch('http://127.0.0.1:5000/soma')

    // verificar se a resposta foi bem sucedida
    if (response.ok){
        const dados = await response.text()
        console.log(dados)
        document.getElementById('saida').textContent = dados
    }

}

async function buscaCliente() {
    const doc_cpf = document.getElementById ('consultacpf').value;
    if (!doc_cpf){
        alert('por favor, insira um CPF');
        return;
    }
    //devemos tratar erros
    const response = await fetch (`http://127.0.0.1:5000/${doc_cpf}`)

    const dados = await response.json();
    console.log (dados)
    document.getElementById('CPF').textContent = "CPF: "+ dados.cpf; 
    document.getElementById('NOME').textContent = "Nome: "+ dados.nome;
    document.getElementById('DATANASCIMENTO').textContent ="Data de Nascimento:" + dados.dataNascimento;
    document.getElementById('EMAIL').textContent = "Email" + dados.email;


}