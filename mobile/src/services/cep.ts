import { fetch } from 'expo/fetch';

type Response = {
  cep: string;
  logradouro: string;
  uf: string;
  complemento: string;
  unidade: string;
  bairro: string;
  localidade: string;
  estado: string;
  regiao: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
};

export async function getDataByCep(cep: string): Promise<Response> {
  cep = cep.replace(/\D/g, '');

  const response = await fetch(`http://viacep.com.br/ws/${cep}/json/`, {
    method: 'GET',
    headers: {
      'User-agent': 'exp-fetch',
      'Content-Type': 'application/json'
    }
  });

  const data = await response.json();

  if (data.erro) throw new Error('cep does not exist');

  return data;
}
