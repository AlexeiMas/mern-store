export const textLengthSlicer = (value: string, to: number = 25, from: number = 0) => {
  return (value.trim().length) < to ? value.trim() : value.trim().slice(from, to + 1).concat(' ... ')
}