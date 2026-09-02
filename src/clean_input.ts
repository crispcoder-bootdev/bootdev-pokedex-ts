export function cleanInput(input: string): string[] {
    let trimmed = input.trim();
    let arr = trimmed.split(" ");
    let filtered = arr.filter((item) => item.trim() !== "");
    let lowercase = filtered.map((item) => item.toLowerCase());
    return lowercase;
}
