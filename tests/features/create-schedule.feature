# language: pt
Funcionalidade: Criar Agendamento
  Cenário: Criar um agendamento
    Dado que estou simulando as respostas com "success" da solicitação
    E eu clico no botão Agendar consulta
    Quando estou na página de criar agendamento
    E eu seleciono uma data
    E eu seleciono uma hora
    E eu seleciono um usuário
    E eu clico no botão Enviar
    Então eu devo ser direcionado para a página de agendamento
