

const getFileFormat = (name: string): string | undefined => {
    const parts = name.split('.')
    return parts.length == 1 ? undefined : parts[parts.length - 1]
}

export {getFileFormat}