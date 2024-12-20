const service = {
    getData: () => {
        return new Promise((resolve, reject) => {
            resolve({
                count: books.length,
                data: books
            })
        })
    }
}

export default service;