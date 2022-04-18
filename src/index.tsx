import React from 'react';
import ReactDOM from 'react-dom';
import { createServer, Model } from 'miragejs';
import { App } from './App';

createServer({
  models: {
    transaction: Model,

  },


  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Desenvolvimento de website',
          amount:6000,
          type: 'deposit',
          category: 'TI',
          createdAt: new Date('2020-01-05 15:00:00')
        },
        {
          id: 2,
          title: 'Aluguel Empresa',
          amount:10000,
          type: 'withdraw',
          category: 'Imóvel',
          createdAt: new Date('2021-02-14 11:00:00')
        }
      ]
    })
  },
  routes() {
    this.namespace = 'api'; //Determinará o endereço padrão para captar as chamadas ex.: localhost/api/...
    this.get('/transactions', () => {
      return this.schema.all('transaction')
    })

    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody)
      return schema.create('transaction', data);
    })
  }
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

