const { deterministicPartitionKey } = require("./dpk");

const event = {
  partitionKey:
    "7350d99d1a20435c283070f3613302edb7027fced163086b048bd3ded530c5cb7a8ced83d1c6fda78f8832c61fb02698d14252c6b4ecf6989b81b04ca99a6302",
};

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });
  it("RReturns the literal '0' when given an empty string as an input", () => {
    const trivialKey = deterministicPartitionKey("");
    expect(trivialKey).toBeDefined();
    expect(trivialKey).toBe("0");
  });

  it("Returns a generated partition key when an empty object is passed by", () => {
    const trivialKey = deterministicPartitionKey({});
    expect(trivialKey).toBeDefined();
    expect(trivialKey).toHaveLength(128);
    expect(trivialKey).not.toBe("0");
  });

  it("Returns an different generated partition key when the current one is too long", () => {
    const trivialKey = deterministicPartitionKey(
      {
        partitionKey: "a".repeat(257)
      }
    );
    expect(trivialKey).toBeDefined();
    expect(trivialKey).toHaveLength(128);
    expect(trivialKey).not.toBe("0");
  });

  it("Should return the same partition key when given the same input", () => {
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBeDefined();
    expect(trivialKey).toBe(event.partitionKey);
    expect(trivialKey).not.toBe("0");
  });

  it("Should return a valid partition key when event is an object", () => {
    const trivialKey = deterministicPartitionKey({
      partitionKey: {
        foo: "bar",
      },
    });
    expect(trivialKey).toBeDefined();
    expect(trivialKey).not.toBe("0");
  });
});
