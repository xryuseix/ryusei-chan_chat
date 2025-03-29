import { assertEquals } from "https://deno.land/std@0.165.0/testing/asserts.ts";
import { describe, it } from "https://deno.land/std@0.167.0/testing/bdd.ts";
import { getChunks } from "./ChatLog.tsx";

describe("getChunks", () => {
  it('should return an array of chunks split by "data: "', () => {
    const input = new TextEncoder().encode("data: chunk1\n\ndata: chunk2\n\n");
    const expectedOutput = ["chunk1", "chunk2"];
    assertEquals(getChunks(input), expectedOutput);
  });

  it('should handle input with no "data: " prefix', () => {
    const input = new TextEncoder().encode("chunk1\nchunk2\n\n");
    const expectedOutput = ["chunk1\nchunk2"];
    assertEquals(getChunks(input), expectedOutput);
  });

  it("should handle empty input", () => {
    const input = new Uint8Array();
    const expectedOutput: string[] = [];
    assertEquals(getChunks(input), expectedOutput);
  });

  it('should handle input with only "data: " prefixes', () => {
    const input = new TextEncoder().encode("data: \n\ndata: \n\n");
    const expectedOutput: string[] = [];
    assertEquals(getChunks(input), expectedOutput);
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
    assertEquals(getChunks(input), expectedOutput);
  });
});
