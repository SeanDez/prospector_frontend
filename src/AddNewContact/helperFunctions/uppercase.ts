export default (input: string) => {
  if (input.length >= 2) {
    return input[0].toUpperCase() + input.substring(1);
  }

  return input;
}