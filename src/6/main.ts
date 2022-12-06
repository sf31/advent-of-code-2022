import { readFileByLine } from "../utils";

const file = readFileByLine(`${__dirname}/input.txt`)[0];

const startOfPacketIndex = getMarkerIndexIndex(file, 4);
console.log(
  startOfPacketIndex === -1
    ? "Start-of-packet not found"
    : `Start-of-packet found at: ${startOfPacketIndex}`
);

const startOfMessagetIndex = getMarkerIndexIndex(file, 14);
console.log(
  startOfMessagetIndex === -1
    ? "Start-of-message not found"
    : `Start-of-message found at: ${startOfMessagetIndex}`
);

/**
 * Pass 4 for start-of-packet, 14 for start-of-message
 */
function getMarkerIndexIndex(buffer: string, windowSize: number): number {
  for (let i = windowSize - 1; i < buffer.length; i++) {
    const subset = buffer.slice(i - windowSize, i);
    const distinctCharCount = new Set(Array.from(subset)).size;
    if (distinctCharCount === windowSize) return i;
  }
  return -1;
}
