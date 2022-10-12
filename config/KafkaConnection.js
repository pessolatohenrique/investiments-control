const { Kafka } = require("kafkajs");

class KafkaConnection {
  static configure = () => {
    try {
      const kafka = new Kafka({
        clientId: "investiments-control",
        brokers: [process.env.KAFKA_BROKER],
      });

      return kafka;
    } catch (error) {
      console.log(`Failed to initialize Kafka: ${error}`);
    }
  };
}

module.exports = KafkaConnection;
