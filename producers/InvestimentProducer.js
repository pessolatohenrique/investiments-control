const { KafkaConnection } = require("../config");
const { INVESTIMENT_NEW_STORE } = require("../enums/KafkaTopics");

class InvestimentProducer {
  constructor(investiment) {
    this.investiment = investiment;
  }

  sendStore = async () => {
    const kafka = KafkaConnection.configure();
    const producer = kafka.producer();

    await producer.connect();
    await producer.send({
      topic: INVESTIMENT_NEW_STORE,
      messages: [
        {
          key: Math.floor(Math.random() * 100000).toString(),
          value: JSON.stringify({ ...this.investiment }),
        },
      ],
    });

    await producer.disconnect();
  };
}

module.exports = InvestimentProducer;
