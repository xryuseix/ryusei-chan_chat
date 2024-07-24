import { describe, it, expect } from "vitest";
import { getChunks } from "./ChatLog";

describe("getChunks", () => {
  it('should return an array of chunks split by "data: "', () => {
    const input = new TextEncoder().encode("data: chunk1\n\ndata: chunk2\n\n");
    const expectedOutput = ["chunk1", "chunk2"];
    expect(getChunks(input)).toEqual(expectedOutput);
  });

  it('should handle input with no "data: " prefix', () => {
    const input = new TextEncoder().encode("chunk1\nchunk2\n\n");
    const expectedOutput = ["chunk1\nchunk2"];
    expect(getChunks(input)).toEqual(expectedOutput);
  });

  it("should handle empty input", () => {
    const input = new Uint8Array();
    const expectedOutput: string[] = [];
    expect(getChunks(input)).toEqual(expectedOutput);
  });

  it('should handle input with only "data: " prefixes', () => {
    const input = new TextEncoder().encode("data: \n\ndata: \n\n");
    const expectedOutput: string[] = [];
    expect(getChunks(input)).toEqual(expectedOutput);
  });

  it("should handle input with mixed content", () => {
    const input = new TextEncoder().encode(
      "data: chunk1\nchunk2\n\ndata: chunk3\n\nchunk4\n\nchunk5\n\ndata: chunk6\n\n",
    );
    const expectedOutput = [
      "chunk1\nchunk2",
      "chunk3\n\nchunk4\n\nchunk5",
      "chunk6",
    ];
    expect(getChunks(input)).toEqual(expectedOutput);
  });
});
