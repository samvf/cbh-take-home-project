const crypto = require("crypto");

// Instantiate outside of the function so it's not recreated on every call
const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

function createPartitionKey(input) {
  return crypto.createHash("sha3-512").update(input).digest("hex");
}

exports.deterministicPartitionKey = (event) => {
  // If no event is provided, return the trivial partition key to fail fast
  if (!event) {
    return TRIVIAL_PARTITION_KEY;
  }

  const { partitionKey } = event;

  // Since we already verified and created a partition key for the event with the desired size, there is no need to continue validating
  if (!partitionKey) {
    const stringifiedEvent = JSON.stringify(event);
    const generatedPartitionKey = createPartitionKey(stringifiedEvent);
    return generatedPartitionKey;
  }

  // Stringify the event to ensure that the partition key is a string
  const stringifiedPartitionKey =
    partitionKey instanceof Object
      ? JSON.stringify(partitionKey)
      : partitionKey;

  const isPartitionKeyTooLong =
    stringifiedPartitionKey.length > MAX_PARTITION_KEY_LENGTH;

  // If the partition key is too long, truncate it
  if (isPartitionKeyTooLong) {
    const generatedPartitionKey = createPartitionKey(stringifiedPartitionKey);
    return generatedPartitionKey;
  }

  return stringifiedPartitionKey;
};
