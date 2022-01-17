export default function processFile(file) {

    console.log(file)

    const data = new FormData()
    data.append('file', file)

    fetch(`${"http://172.20.120.71:4000"}/upload`, {
        method: 'POST',
        body: data
    })
        .then(response => response.json())
        .then(result => {
            console.log(result)
        })
}