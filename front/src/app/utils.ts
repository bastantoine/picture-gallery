export function join(...paths: string[]): string {
    // Based on Python's os.path.join
    let output: string = '';
    paths.forEach(path => {
        if(path.startsWith('/')) {
            output = `${output}${path}`;
        } else {
            output = `${output}/${path}`;
        }
    })
    // We need to remove the first character because that's a '/'
    return output.substring(1);
}