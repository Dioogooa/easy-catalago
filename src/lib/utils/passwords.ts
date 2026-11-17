// Helper function to check if password is within bcrypt limit
export const isWithinBcryptLimit = (password: string) =>
    new TextEncoder().encode(password).length <= 72