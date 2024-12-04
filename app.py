from flask import Flask, request, jsonify
from flask_cors import CORS
import json

app = Flask(__name__)

CORS(app)

def ler_json():
    with open('./data/clientes.json', 'r') as file:
        dados = json.load(file)
        dados_ordenados = sorted(dados, key=lambda x: x['nome'])
        return dados_ordenados

def escrever_json(dados):
    with open('./data/clientes.json', 'w') as file:
        json.dump(dados, file, indent=4)

@app.route('/', methods=['GET'])
def listar_todos():
    return jsonify(ler_json())

@app.route('/<string:cpf>', methods=['GET'])
def buscar_por_cpf(cpf):

    for pessoa in ler_json():
        if pessoa['cpf'] == cpf:
            return jsonify(pessoa)
    
    return jsonify({"erro": "Cliente não encontrada!"}), 404

@app.route('/', methods=['POST'])
def adicionar_cliente():

    nova_pessoa = request.get_json()
    
    if not nova_pessoa.get("cpf") or not nova_pessoa.get("nome") or not nova_pessoa.get("dataNascimento") or not nova_pessoa.get("email"):
        return jsonify({"erro": "Todos os campos (CPF, Nome, Data de Nascimento, E-mail) são necessários!"}), 400

    dados_atualizados = ler_json()

    for pessoa in dados_atualizados:
        if pessoa['cpf'] == nova_pessoa.get("cpf"):
            return jsonify({"erro": "CPF já cadastrado!"}), 409
    
    dados_atualizados.append(nova_pessoa)
    
    dados_ordenados = sorted(dados_atualizados, key=lambda x: x['nome'])

    escrever_json(dados_ordenados)

    return jsonify({
        "mensagem": "Pessoa adicionada com sucesso!",
        "cliente": nova_pessoa
    }), 200

if __name__ == '__main__':
    app.run(debug=True)
