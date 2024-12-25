function generateRandomString(jobTitles: string[]): string {
    const randomIndex = Math.floor(Math.random() * jobTitles.length);
    return jobTitles[randomIndex];
}

export { generateRandomString };

function generatePayGradeName():string {
    return "Pay Grace Name " + Math.floor(Math.random() * 999)
}
export {generatePayGradeName}